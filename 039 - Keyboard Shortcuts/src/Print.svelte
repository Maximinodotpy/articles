<script context="module" lang="ts">

    export function pdfURL(apps: String[]) {
        return `?pdf=true&apps=${apps.join(',')}`;
    }
    
</script>

<script lang="ts">
    // @ts-ignore
    import { applications } from "../shortcut-data/shortcuts.json";
    import App from "./App.svelte";

    let searchParams = new URLSearchParams(document.location.search);

    // Check if the search param app is given
    let target_applications: String[] = (searchParams.get("apps") ?? Object.keys(applications).join(',')).split(',');

    // Print automatticalf the the auto print param is given
    if (searchParams.get("auto-print")) {
        window.print();
    }

    function getOnlyPrintThisAppURL(slug: string) {
        return `?pdf=true&apps=${slug}`;
    }

    function printCurrent() {
        window.print();
    }
</script>

<!-- Loop over each App and print out the Shortcuts as a table -->
{#each Object.entries(applications) as [key, value]}

    <!-- Only print table if the app is in the target list -->
    {#if target_applications.includes(key)}

        

        <div class="{target_applications.length > 1 ? 'break-after-page': ''} stuff">
            <div class="flex items-center justify-between">
                <h1 class="mb-3 text-3xl">{value.name}</h1>

                <div>
                    {#if target_applications.length > 1}
                        <!-- Print a link to only print this app -->
                        <a href="{ getOnlyPrintThisAppURL(key) }" class="text-red-100 bg-red-500 print:hidden">ONLY PRINT THIS APP</a>
                    {:else}
                        <!-- Print a link to print all apps -->
                        <a href="?pdf=true" class="text-red-100 bg-red-500 print:hidden">PRINT ALL APPS</a>
                    {/if}
                </div>

                <!-- URL of blog with this slug -->
                <div class="text-sm">
                    https://maximmaeder.com/keyboard-shortcuts/#{key}
                </div>
            </div>

            <p class="mb-3">{value.description}</p>

            <table class="w-full">
                <thead>
                    <tr>
                        <th class="w-[30%] text-left">Shortcut</th>
                        <th class="text-left">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {#each value.shortcuts as shortcut}
                        <tr>
                            <td class="font-mono">{shortcut.keys}</td>
                            <td>{shortcut.description}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

    {/if}
{/each}

<!-- Create a notice saying press ctrl + p to print which is always at the bottom -->
<button class="fixed bottom-0 left-0 right-0 flex items-center justify-center p-3 font-bold text-red-100 bg-red-500 print:hidden" on:click={printCurrent}>
    <div class="flex items-center gap-2 text-2xl">
        <span>Press <kbd>ctrl + p</kbd> to print or click me</span>
    </div>
</button>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;500;600;700;800;900&display=swap');
    
    table {
        table-layout: fixed;
    }

    /* Add some borders around the cell and darken the headers and color every second */
    table, th, td {
        border: 1px solid rgb(200, 200, 200);
        border-collapse: collapse;
        padding: 5px;
    }

    th {
        background-color: #dadada;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    .stuff {
        font-family: 'Inter', sans-serif;
    }
</style>