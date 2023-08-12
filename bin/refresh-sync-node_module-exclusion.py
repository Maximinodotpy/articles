# Find all Folder with name node_modules
# Exclude them from sync
# This script is used to exclude node_modules from sync

import os
import shutil
import sys
import glob
import json

# Get current working directory
cwd = os.getcwd()

print("Current working directory: " + cwd)

# Get all node_modules folders with a glob
node_modules = "./*/node_modules"

print("Glob Searching: " + node_modules)

# Get all node_modules folders
node_modules_folders = glob.glob(node_modules, recursive=True)

print("Found node_modules folders: " + str(len(node_modules_folders)))

# Write to file as json list
""" with open("node_modules_folders.json", "w") as f:
    json.dump(node_modules_folders, f) """

# Try to delete all node_modules folders
for folder in node_modules_folders:
    try:
        print("Deleting folder: " + folder)
        shutil.rmtree(folder)
    except Exception as e:
        print("Error deleting folder: " + folder)
        print(e)
        pass