<script lang="ts">
  let currentPrompt = { keys: '', description: '' };
  let lastPressed = 'Ctrl + j';
  let shortcutData = []
  let points = 0

  const blackListShortcuts = [
    'ctrl + tab',
    'ctrl + shift + tab',
    'ctrl + w',
    'ctrl + shift + w',
  ]
  const blackListSoftware = ['windows', 'browser-microsoft-edge']
  const url = 'https://raw.githubusercontent.com/Maximinodotpy/articles/main/039%20-%20Keyboard%20Shortcuts/shortcuts.json'

  fetch(url)
    .then(response => response.json())
    .then(data => {
      for (const [key, value] of Object.entries(data)) {
        if (blackListSoftware.includes(key)) continue;

        for (const shortcut of value.shortcuts) {
          shortcutData.push({
            keys: shortcut.keys,
            description: shortcut.description,
            software: value.name
          })
        }
      }
      console.log(shortcutData);

      currentPrompt = getRandomPrompt()
    })

  function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * shortcutData.length);
    return shortcutData[randomIndex];
  }

  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey;
    const alt = event.altKey;
    const shift = event.shiftKey;

    event.preventDefault();

    if (['alt', 'control', 'shift'].includes(key)) return;

    lastPressed = `${ctrl ? 'ctrl + ' : ''}${alt ? 'alt + ' : ''}${shift ? 'shift + ' : ''}${key}`;
  });
</script>

<div class="h-screen bg-slate-700 text-slate-200 flex flex-col text-center">
  <div class="grow text-3xl flex items-center justify-center font-mono">
    {lastPressed} - {currentPrompt.keys}
  </div>
  <div class="bg-slate-800 p-6 text-3xl italic font-semibold">
    "{currentPrompt.description}" [{currentPrompt.software}]
    <div>
      fölaksjdöflakjsds
    </div>
  </div>
</div>