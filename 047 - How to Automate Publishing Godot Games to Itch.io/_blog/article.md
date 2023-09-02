---
name: How to Automate Publishing Godot Games to Itch.io
slug: how-to-automate-publishing-godot-games-to-itch-io
tags:
  - CI and CD
category: Godot Game Engine
status: draft
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



## Finding and Replacing the Version Number in the Code



## Exporting the Game



## Uploading to Itch.io



### Getting the API Key



[deploy.yml](https://github.com/Maximinodotpy/Tile-Jumper-Exodus/blob/master/.github/workflows/deploy.yml)
[Maximinodotpy/Tile-Jumper-Exodus (github.com)](https://github.com/Maximinodotpy/Tile-Jumper-Exodus)

## Conclusion

