import json

print('Compiling Shortcuts to Markdown Article ...')

shortcutData = json.load(open('shortcut-data/shortcuts.json', 'r'))['applications']
shortcutBlacklist = json.load(open('shortcut-data/quiz-blacklist.json', 'r'))
shortcutSchema = json.load(open('shortcut-data/shortcuts-schema.json', 'r', encoding='utf-8'))

# Print out the Schema regex for the keys
print('Schema:')
print(shortcutSchema['$defs']['application']['properties']['shortcuts']['items']['properties']['keys']['pattern'])

result = """---
name: 'Keyboard Shortcuts'
slug: 'keyboard-shortcuts'
description: 'A list of Keyboard Shortcuts I use in my Work with Computers, feel free to skim through it and maybe learn about new things in your applications.'
tags: []
category: 'General'
status: 'publish'
---

This is a list of many Keyboard Shortcuts I encountered / Use now in my work with Computers. I will try to keep this list up to date. If you have any suggestions, please let me know by opening an [issue](https://github.com/Maximinodotpy/articles/issues) on Github.

The `.json` file for all the Keyboard Shortcuts is [here](https://github.com/Maximinodotpy/articles/blob/main/039%20-%20Keyboard%20Shortcuts/shortcut-data/shortcuts.json).

I also defined a json schema for the file, which you can find [here](https://github.com/Maximinodotpy/articles/blob/main/039%20-%20Keyboard%20Shortcuts/shortcut-data/shortcuts-schema.json). It's a lot of fun and it really streamlines the process of adding new shortcuts, because they have to adhere to the schema. It really pays of to learn about [json schema](https://json-schema.org/).

**Applications / Places**\n
"""

for application_slug in shortcutData:
    name = shortcutData[application_slug]['name']
    shortcutCount = len(shortcutData[application_slug]['shortcuts'])
    result += f'- [{name}](#{application_slug}) *({shortcutCount} Shortcuts)*\n'

result += "\n\n"

for application_slug in shortcutData:
    application = shortcutData[application_slug]

    result += f"## {application['name']}\n\n"
    result += f"{application['description']}\n\n"

    if not application_slug in shortcutBlacklist['applications']:
        result += f"[Practise these Shortcuts](https://demos.maximmaeder.com/d/keyboard-shortcuts/index.html?app={application_slug})\n\n"

    result += f"[Get PDF](https://demos.maximmaeder.com/d/keyboard-shortcuts/index.html?pdf=1&auto-print=1&apps={application_slug})\n\n"

    result += f"| Shortcut | Description |\n"
    result += f"| --- | --- |\n"
    for shortcut in application['shortcuts']:
        result += f"| `{shortcut['keys']}` | {shortcut['description']} |\n"

    result += f'\n[Edit this Article in the Repository](https://github.com/Maximinodotpy/articles)\n'

    result += "\n\n"

    # Check for duplicate shortcuts
    shortcutKeys = []
    for shortcut in application['shortcuts']:
        if shortcut['keys'] in shortcutKeys:
            print(f"Duplicate Shortcut in {application['name']}: {shortcut['keys']}")
        else:
            shortcutKeys.append(shortcut['keys'])
    
# Count all Shortcuts
shortcutCount = 0
for application_slug in shortcutData:
    shortcutCount += len(shortcutData[application_slug]['shortcuts'])

result += f"## Summary\n\n"
result += f"Total Shortcuts: {shortcutCount}\n\n"

# Programm with most Shortcuts
mostShortcuts = 0
mostShortcutsName = ''
for application_slug in shortcutData:
    if len(shortcutData[application_slug]['shortcuts']) > mostShortcuts:
        mostShortcuts = len(shortcutData[application_slug]['shortcuts'])
        mostShortcutsName = shortcutData[application_slug]['name']

result +=   f"Application with most Shortcuts: {mostShortcutsName} ({mostShortcuts})\n\n"

# Programm with least Shortcuts
leastShortcuts = 1000
leastShortcutsName = ''
for application_slug in shortcutData:
    if len(shortcutData[application_slug]['shortcuts']) < leastShortcuts:
        leastShortcuts = len(shortcutData[application_slug]['shortcuts'])
        leastShortcutsName = shortcutData[application_slug]['name']

result +=   f"Application with least Shortcuts: {leastShortcutsName} ({leastShortcuts})\n\n"

# Average Shortcuts
result += f"Average Shortcuts per Application: {round(shortcutCount / len(shortcutData), 2)}\n\n"

with open('_blog/article.md', 'w') as f:
    f.write(result)