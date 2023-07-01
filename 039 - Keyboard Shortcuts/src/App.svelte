<script lang="ts">
    import type { Shortcut } from "./types";
    import { shuffle } from "./helpers";

    // This will be inserted by the Python Script
    let searchParams = new URLSearchParams(document.location.search);
    const target_application = searchParams.get("app") ?? "general";

    // Named Import
    import blacklist from "../shortcut-data/quiz-blacklist.json";

    import { applications } from "../shortcut-data/shortcuts.json";
    let shortcut_pool: Shortcut[] = [];

    let current_shortcut_index = 0;
    $: current_shortcut = shortcut_pool[current_shortcut_index];
    let lastPressed = "";
    let show_shortcut = false;

    for (const [key, value] of Object.entries(applications)) {
        if (key != target_application && Object.keys(applications).includes(target_application)) continue;

        for (const shortcut of value.shortcuts) {
            if (blacklist.shortcuts.includes(shortcut.keys)) continue;
            if (shortcut.keys.includes("[ARROWS]")) continue;
            if (shortcut.keys.includes("UP")) continue;
            if (shortcut.keys.includes("DOWN")) continue;
            if (shortcut.keys.includes("LEFT")) continue;
            if (shortcut.keys.includes("RIGHT")) continue;

            shortcut_pool.push({
                keys: shortcut.keys,
                description: shortcut.description,
                applicaton: value.name,
            });
        }
    }
    shortcut_pool = shuffle(shortcut_pool);
    
    countUpIndex();

    function countUpIndex() {
        show_shortcut = false;
        current_shortcut_index++;
        if (current_shortcut_index >= shortcut_pool.length) {
            current_shortcut_index = 0;
        }
    }

    document.addEventListener("keydown", (event) => {
        console.log(event);

        const key = event.key == " " ? "space" : event.key.toLowerCase();
        const ctrl = event.ctrlKey;
        const alt = event.altKey;
        const shift = event.shiftKey;

        event.preventDefault();

        if (["alt", "control", "shift"].includes(key)) return;

        lastPressed = `${ctrl ? "ctrl + " : ""}${alt ? "alt + " : ""}${
            shift ? "shift + " : ""
        }${key}`;

        if (lastPressed.toLowerCase() == current_shortcut.keys.toLowerCase()) {
            /* points++; */
            countUpIndex();

            lastPressed = "";

            console.log('Right');
            
        } else if (lastPressed == 'ctrl + alt + shift + enter') {
            skipButton();
            lastPressed = "";
        }
    });

    function skipButton() {
        if (show_shortcut) countUpIndex();
        else show_shortcut = true;
    }
</script>

<div class="flex flex-col h-screen text-2xl bg-neutral-800 text-neutral-400">
    <div class="flex flex-col justify-center divide-y-[1px] grow divide-neutral-700 text-center">
        <div class="py-5" id="shortcut-description">
            "{ current_shortcut?.description }"
        </div>
        <div class="py-5 font-mono">
            <span class="font-bold">
                {#if lastPressed}
                    { lastPressed }
                {:else}
                    Press any key ...
                {/if}
            </span>
            
            {#if show_shortcut}
                = { current_shortcut?.keys }
            {/if}
            
            <!-- { target_application } -->
        </div>
    </div>

    <div class="p-4 m-8 bg-neutral-700 border-[1px] border-neutral-500 shadow-md shadow-neutral-900 rounded-2xl flex justify-between items-center">
        { shortcut_pool.length } { applications[target_application].name } Shortcuts

        <button 
            class="px-3 py-1 border-[1px] border-neutral-500 rounded-xl"
            on:click={skipButton}>
            {#if show_shortcut}
                Next
            {:else}
                Show
            {/if}
        </button>
    </div>
</div>