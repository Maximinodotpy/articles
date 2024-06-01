# Imports
import json

def read_and_write_word_list(file_name, title):
    global final_string

    with open(file_name, 'r', encoding='utf-8') as file:
        words = json.load(file)

        words = dict(sorted(words.items(), key=lambda item: item[1]))

        final_string += f'\n\n# {title}\n\n'

        final_string += '|Wort|Bedeutung|\n'
        final_string += '|---|---|\n'

        for key, value in words.items():
            final_string += f'| {key} | {value} |\n'


final_string = """---
name: Wörter
slug: woerter
status: publish
description: Einige sehr eloquente Wörter
---

*Normally my articles are english but this one is in german*

Hier ist eine Liste von Wörtern, die ich sehr eloquent finde. Ich hoffe, dass Sie sie auch mögen.

Sie sind nach wortart sortiert (A/N/V).

[Vorschläge](mailto:info@maximmaeder.com) sind willkommen.

"""

# Read the woerter.json file
read_and_write_word_list('woerter.json', 'Wörter')

# Read the woerter_fuer_woerter.json file
read_and_write_word_list('woerter_fuer_woerter.json', 'Wörter für Wörter')


# Save the content to the file "_blog/article.md"
with open('_blog/article.md', 'w', encoding='utf-8') as file:
    file.write(final_string)