<script lang="ts">
    let currentPrompt = { keys: "", description: "" };
    let lastPressed = "Ctrl + j";
    let shortcutData = [];
    let allSoftware = [];
    let points = 0;

    const blackListShortcuts = [
        "ctrl + tab",
        "ctrl + shift + tab",
        "ctrl + w",
        "ctrl + shift + w",
        "alt",
        "ARROWS",
        "ctrl + [ARROWS]",
        "ctrl + [DOWN]",
        "alt + up",
        "alt + left",
        "alt + right",
        "ctrl + shift + n",
        "shift + [MOUSE]",
        "ctrl + alt + [UP/DOWN]",
        "alt + [DOWN]",
        "ctrl + n",
        "alt + [UP/DOWN]",
    ];
    const blackListSoftware = [
        "windows",
        "browser-microsoft-edge",
        "vimium",
        "godot",
    ];
    const url =
        "https://raw.githubusercontent.com/Maximinodotpy/articles/main/039%20-%20Keyboard%20Shortcuts/shortcuts.json";

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data = data.applications;
            console.log(data);

            for (const [key, value] of Object.entries(data)) {
                if (blackListSoftware.includes(key)) continue;

                allSoftware.push(key);

                for (const shortcut of value.shortcuts) {
                    if (blackListShortcuts.includes(shortcut.keys)) continue;
                    if (shortcut.keys.includes("[ARROWS]")) continue;

                    shortcutData.push({
                        keys: shortcut.keys,
                        description: shortcut.description,
                        software: value.name,
                    });
                }
            }

            console.log(allSoftware);
            

            getRandomPrompt();
        });

    function getRandomPrompt() {
        const randomIndex = Math.floor(Math.random() * shortcutData.length);
        currentPrompt = shortcutData[randomIndex];
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
            getRandomPrompt();

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


    <button class="p-5 font-mono font-bold bg-slate-900" on:click={getRandomPrompt}>Skip</button>
</div>
