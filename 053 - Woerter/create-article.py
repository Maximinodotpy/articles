# Imports
import json

final_string = """---
name: Wörter
slug: woerter
status: publish
description: Einige sehr eloquente Wörter
---

*Normally my articles are english but this one is in german*

Hier ist eine Liste von Wörtern, die ich sehr eloquent finde. Ich hoffe, dass Sie sie auch mögen.

"""

# Read the woerter.json file
with open('woerter.json', 'r', encoding='utf-8') as file:
    woerter = json.load(file)

    print(woerter)

    final_string += '# Woerter\n\n'

    final_string += '|Wort|Bedeutung|\n'
    final_string += '|---|---|\n'

    # Loop over all keys and values
    for key, value in woerter.items():
        final_string += f'| {key} | {value} |\n'


# Save the content to the file "_blog/article.md"
with open('_blog/article.md', 'w', encoding='utf-8') as file:
    file.write(final_string)