import json

print('lfaksjd')

shortcutData = json.load(open('shortcuts.json', 'r'))

result = """---
name: 'Shortcuts'
description: 'fasdafsd'
tag: 'shortcuts'
category: 'general'
status: 'draft'
---

This is a list of many Shortcuts I encountered / Use now in my daily life. I will try to keep this list up to date. If you have any suggestions, please let me know by opening an [issue](https://github.com/Maximinodotpy/articles/issues) on Github.

"""

for slug in shortcutData:

    application = shortcutData[slug]

    result += f"## {application['name']}\n\n"

    result += f"| Shortcut | Description |\n"
    result += f"| --- | --- |\n"
    for shortcut in application['shortcuts']:
        result += f"| `{shortcut['keys']}` | {shortcut['description']} |\n"

    result += "\n\n"

with open('_blog/article.md', 'w') as f:
    f.write(result)