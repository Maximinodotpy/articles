---
name: How to Automate Publishing Godot Games to Itch.io
slug: how-to-automate-publishing-godot-games-to-itch-io
tags:
  - CI and CD
  - Game
category: Godot Game Engine
status: publish
description: Let's learn together how we can use the Power of Github Action to automate our Games Deployment to Itch.io
---
I'm a programmer so I like to automate tasks for 6 hours that I could have just done in 5 Minutes manually.

![](https://i.redd.it/6fg3aicn6if41.png)

And that is why I really like GitHub Actions which is a Automation offered by who would have thought GitHub. I would really encourage you to read up on the topic because it is a rather easy tool that can lead to huge time saves.

Today we are going to automate Deploying Godot Games to the Indie Game Platform [Itch.io](https://Itch.io). Recently i worked on a little 2D Platformer called [Tile Jumper Exodus](https://maximino.itch.io/tile-jumper-exodus), and I wanted to automate deployment because I am rather lazy. But searching for a solution proved rather difficult and this is why want to show how I managed to deploy my Godot 4 Game to itch.io.

Keep in mind that this is just viable for my Game and that you will have to tweak these settings for you and maybe you don't need all these things.


HERE YOU FIND THE FULL FILE IF YOU WANT TO SIMPLY COPY IT
[https://github.com/Maximinodotpy/Tile-Jumper-Exodus/blob/master/.github/workflows/deploy.yml](https://github.com/Maximinodotpy/Tile-Jumper-Exodus/blob/master/.github/workflows/deploy.yml)
## General Setup

So these Automation are basically Yaml file that will hold the Infos about your Action like how its called when it runs and what it runs. These files reside in the  `.github/workflows` subfolder of your project. You see the Yaml file we work on [here](https://github.com/Maximinodotpy/Tile-Jumper-Exodus/blob/master/.github/workflows/deploy.yml).

We start by setting a name for this Action and telling it when to run in this case on every push (on every branch). Next up we create a job called `export-web` that runs on Ubuntu.

```yml
name: "Godot Export and Upload"
on: push
jobs:
  export-web:
    name: Web Export
    runs-on: ubuntu-20.04
    steps:
	    ... More Magic ...
```


## Checking for the Version Number in the Commit Message

Continuing we do something that is somewhat specific to my applications, here we check if the commit message matches a certain [regular expressions](https://maximmaeder.com/regular-expressions/). In this case we simply check if the message is a number. If it does not match it will stop the execution of the Action.

```yml
    - id: commit-type
        name: Check Commit Type
        uses: gsactions/commit-message-checker@v2
        with:
          pattern: '^\d*$'
          error: 'The commit message does not look like a version number. Please use semantic versioning (https://semver.org/).'
```

## Finding and Replacing the Version Number in the Code

Related to the last section we now get the code of the Repository and we then replace a certain text string in our source code with the commit message which should be at this point just a number.

```yml
  - name: Checkout
	uses: actions/checkout@v2

  - name: Find and Replace Version
	uses: jacobtomlinson/gha-find-replace@v3
	id: find-replace
	with:
	  find: "__TJE_VERSION__"
	  replace: ${{ github.event.head_commit.message }}
	  regex: false

```

## Exporting the Game

Now we export our game and it took me really long to find the correct action to use. Here we have to specify which Godot Version we use and where we want our game code to be placed. Keep in mind that you must have an export template file in your project so you have to export the project manually once.

```yml
  - name: export game
	id: export
	# Use latest version (see releases for all versions)
	uses: firebelley/godot-export@v5.2.0
	with:
		# Defining all the required inputs
		godot_executable_download_url: https://downloads.tuxfamily.org/godotengine/4.1.1/Godot_v4.1.1-stable_linux.x86_64.zip
		godot_export_templates_download_url: https://downloads.tuxfamily.org/godotengine/4.1.1/Godot_v4.1.1-stable_export_templates.tpz
		relative_project_path: ./
		relative_export_path: ./build # move export output to this directory relative to git root
		archive_output: false
```

## Uploading to Itch.io

Lastly we need to push this export to Itch.io in this case it is the HTML Export. Here you will have to fill in your Information and you should replace "Tile Jumper Exodus" with the name of your game.

```yml
  - name: Upload to itch.io
	uses: dulvui/itchio-butler-upload@v0.0.1
	with:
		working-directory: '"build/Tile Jumper Exodus"'
		#working-directory: ${{ steps.export.outputs.archive_directory }}
		api-key: ${{ secrets.BUTLER_CREDENTIALS }}
		user: maximino
		game: tile-jumper-exodus
		channel: html5
```

We also need to set the `BUTLER_CREDENTIALS` secret in our Repository.

### Getting the API Key

Go to `Settings > API Keys > Generate new API Key`. Then copy this key and go over to your project Repository.

![](https://i.imgur.com/uyLVk6c.png)

Here go to `Settings > Secrets and Veriables > Actions > New repository secret`. Name this secret `BUTLER_CREDENTIALS` and add your API Key as the Value.

## Conclusion

So now your Game should be exported every time you push changes to the repo, I hope this works for you and that you had a good time reading. If I made a mistake please don't refrain from contacting me.
