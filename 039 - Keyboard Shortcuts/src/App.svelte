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
            if (blacklist.illegal_strings.some(el => { return shortcut.keys.includes(el) })) continue;

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

            fireConfetti()
        } else if (lastPressed == 'ctrl + alt + shift + enter') {
            skipButton();
            lastPressed = "";
        }
    });

    function fireConfetti () {
        const particleCount = 50
        const rotation = 70
        const spread = 5

        // @ts-ignore
        confetti({
            particleCount: particleCount,
            spread: spread,
            angle: rotation,
            origin: { y: 1.0, x: 0 },
        });
        
        // @ts-ignore
        confetti({
            particleCount: particleCount,
            spread: spread,
            angle: 180 - rotation,
            origin: { y: 1.0, x: 1 },
        });
    }

    function skipButton() {
        if (show_shortcut) countUpIndex();
        else show_shortcut = true;
    }
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.10.1/tsparticles.confetti.bundle.min.js"></script>
</svelte:head>

<div class="flex flex-col h-screen text-2xl bg-zinc-800 text-zinc-400">
    <div class="flex flex-col justify-center divide-y-[1px] grow divide-zinc-700 text-center">
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
        </div>
    </div>

    <div class="p-4 m-8 bg-zinc-800 border-[1px] border-zinc-700 shadow-md shadow-zinc-900 rounded-2xl flex justify-between items-center">
        { shortcut_pool.length } { applications[target_application].name } Shortcuts

        <button class="border-[1px] border-zinc-700 rounded-xl flex items-stretch"
            on:click={skipButton}>
            <div class="px-3 py-1 bg-zinc-900 rounded-l-xl">
                {#if show_shortcut}
                    Next
                {:else}
                    Show
                {/if}
            </div>

            <div class="flex items-center px-3 py-1 text-sm bg-zinc-800 rounded-r-xl">ctrl + alt + shift + enter</div>
        </button>
    </div>
</div>