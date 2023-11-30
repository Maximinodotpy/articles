import json

def json_table_format(json_data):
    # Format a json document recursively in this way:
    # {
    #   "key": "value",
    #   "key": "value"
    # }
    # should be:
    # {
    #   "key": "value",               "key": "value",
    #   "key": "value"      =>        "key": "value",
    #   "key": "value"                "key": "value"
    # }

    # Get the keys and values
    keys = []
    values = []
    for key, value in json_data.items():
        keys.append(key)
        values.append(value)

    # Get the max length of the keys
    max_length = 0
    for key in keys:
        if len(key) > max_length:
            max_length = len(key)

    # Format the keys
    for i in range(len(keys)):
        keys[i] = keys[i].ljust(max_length)

    # Format the values
    for i in range(len(values)):
        if type(values[i]) == dict:
            values[i] = json_table_format(values[i])
        else:
            values[i] = str(values[i])

    # Format the json
    json_data = {}
    for i in range(len(keys)):
        json_data[keys[i]] = values[i]

    return json_data


# Test this function above with dummy data

# Dummy data
dummy_data = {
    "key": "value",
    "key": "value",
    "key": {
        "key": "value",
        "key": "value"
    },
    "key": "value"
}

# Format the dummy data
formatted_data = json_table_format(dummy_data)

# Print the formatted data
print(formatted_data)
