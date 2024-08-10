import os

# Get all direct subfolders
subfolders = [f.path for f in os.scandir('.') if f.is_dir()]

# Loop over all subfolders if there is a file called "create-article.py" then cwd into it and run the file then return
for subfolder in subfolders:
    if os.path.exists(subfolder + "/create-article.py"):
        print("Running create-article.py in " + subfolder)
        os.chdir(subfolder)
        os.system("python create-article.py")
        os.chdir("..")