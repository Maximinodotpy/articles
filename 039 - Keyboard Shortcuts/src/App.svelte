<script lang="ts">
    let currentPrompt = { keys: "", description: "", software: "" };
    let lastPressed = "";
    let points = 0;
    
    // This will be inserted by the Python Script
    let searchParams = new URLSearchParams(document.location.search);
    const target_application = searchParams.get("app") ?? 'general';
    
    
    // Named Import
    import blacklist from '../shortcut-data/quiz-blacklist.json';
    
    import { applications } from '../shortcut-data/shortcuts.json';
    let filtered_shortcuts = [];

    for (const [key, value] of Object.entries(applications)) {
        if (key != target_application) continue;

        for (const shortcut of value.shortcuts) {
            if (blacklist.shortcuts.includes(shortcut.keys)) continue;
            if (shortcut.keys.includes("[ARROWS]")) continue;
            if (shortcut.keys.includes("UP")) continue;
            if (shortcut.keys.includes("DOWN")) continue;
            if (shortcut.keys.includes("LEFT")) continue;
            if (shortcut.keys.includes("RIGHT")) continue;

            filtered_shortcuts.push({
                keys: shortcut.keys,
                description: shortcut.description,
                software: value.name,
            });
        }
    }
    newPrompt();

    function newPrompt() {
        const randomIndex = Math.floor(Math.random() * filtered_shortcuts.length);
        currentPrompt = filtered_shortcuts[randomIndex];
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

        if (lastPressed.toLowerCase() == currentPrompt.keys.toLowerCase()) {
            points++;
            newPrompt();

            lastPressed = "Press any key ...";
        }
    });
</script>

<div class="flex flex-col h-screen text-center bg-slate-700 text-slate-200">
    <div class="flex items-center justify-center font-mono text-3xl grow">
        {lastPressed}
    </div>
    <div class="p-6 text-3xl italic font-semibold bg-slate-800">
        "{currentPrompt.description}" [{currentPrompt.software}]
        <div>
            {points} Point{points != 1 ? "s" : ""}
        </div>
    </div>

    <button class="p-5 font-mono font-bold bg-slate-900" on:click={newPrompt}>Skip</button>
</div>
