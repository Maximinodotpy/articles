import json

content = json.load(open('old.json'))
result = {}

for shortcut in content:
    slug = shortcut[2].lower().replace(' ', '-').replace('/', '-').replace('(', '').replace(')', '')

    if slug not in result.keys():
        result[slug] = {
            "name": shortcut[2],
            "description": "",
            "shortcuts": []
        }

    result[slug]["shortcuts"].append({
        'keys': shortcut[0],
        'description': shortcut[1],
    })

json.dump(result, open('new.json', 'w'), indent=4)