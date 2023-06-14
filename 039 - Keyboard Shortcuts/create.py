import json
import base64
import os

print('Compiling Shortcuts to Markdown Article ...')

shortcutData = json.load(open('shortcuts.json', 'r'))['applications']
shortcutBlacklist = json.load(open('quiz-blacklist.json', 'r'))

result = """---
name: 'Keyboard Shortcuts'
slug: 'keyboard-shortcuts'
description: 'A list of Shortcuts I use in my Work with Computers, feel free to skim through it and maybe learn about new things in your favourite applications.'
tags: ['shortcuts']
category: 'general'
status: 'publish'
---

This is a list of many Shortcuts I encountered / Use now in my work with Computers. I will try to keep this list up to date. If you have any suggestions, please let me know by opening an [issue](https://github.com/Maximinodotpy/articles/issues) on Github.

The `.json` file for all the Keyboard Shortcuts is [here](https://github.com/Maximinodotpy/articles/blob/main/039%20-%20Keyboard%20Shortcuts/shortcuts.json).

I also defined a json schema for the file, which you can find [here](https://github.com/Maximinodotpy/articles/blob/main/039%20-%20Keyboard%20Shortcuts/shortcuts-schema.json). It's a lot of fun and it really streamlines the process of adding new shortcuts, because they have to adhere to the schema. It really pays of to learn about [json schema](https://json-schema.org/).

**Applications / Places**\n
"""

for application_slug in shortcutData:
    name = shortcutData[application_slug]['name']
    shortcutCount = len(shortcutData[application_slug]['shortcuts'])
    result += f'- [{name}](#content-{application_slug}) *({shortcutCount} Shortcuts)*\n'

result += "\n\n"

for application_slug in shortcutData:
    application = shortcutData[application_slug]

    result += f"## {application['name']}\n\n"
    result += f"{application['description']}\n\n"

    result += f"| Shortcut | Description |\n"
    result += f"| --- | --- |\n"
    for shortcut in application['shortcuts']:
        result += f"| `{shortcut['keys']}` | {shortcut['description']} |\n"

    result += f'\n[Edit this Article in the Repository](https://github.com/Maximinodotpy/articles/blob/main/039%20-%20Keyboard%20Shortcuts/shortcuts.json)\n'

    result += "\n\n"

with open('_blog/article.md', 'w') as f:
    f.write(result)