---
name: 'My Godot 4 Impressions'
slug: 'my-godot-4-impressions'
tags: []
category: 'General'
status: 'draft'
description: "In this Article I want to go over my Impressions of Godot 4"
---

I have be honest, Until just this weekend I did not really dive into Godot 4. I did make a [text editor](https://maximmaeder.com/text-file-editor-with-godot-4/) with Godot  but that was as far as it went. But now I really got into it by making another Platformer based on my last one: [Tile Jumper Exodus](https://maximino.itch.io/tile-jumper-exodus). So now I want to share my Experiences with you, going over the Major and Minor things I learned / remembered about the Engine. I hope this will be useful for you.

## Learnings

- [**Pixel Art Project Settings**](https://ask.godotengine.org/122518/how-to-import-pixel-art-in-godot-4): Configuring your Project for crisp pixel art is as easy as going into your Project Settings  `Canvas Item > Texture > Filter` and set that to `Nearest`.
- **Quality Of Life For Me**:
	- **Flex Box Inspired Player Movement**: If you have played my game you will notice that there is a gravity inversion Block which as its name suggest flips the whole world around, To make my life a bit easier I made a system in a sense similar to CSS Flex Box which allows me to target the Main Axis (Left and Right) and Cross Axis (Up and Down) without worrying about the directions all the time. [Code](https://github.com/Maximinodotpy/Tile-Jumper-Exodus/blob/master/Scenes/Player/player.gd)
	- **EventBus**: Godot's Event system is good but for me sometimes I don't want to know which node emitted an event, so I made a global Event Bus where every Script can listen to and emit events. This code is made available to all script via the AutoLoad feature. [Code](https://github.com/Maximinodotpy/Tile-Jumper-Exodus/blob/master/Global%20Scripts/EventBus.gd)
	- **Inherited Scenes**: Are basically the opposite of Child Scenes. There base scene acts as a template. Changes to the base will then be reflected in all "child" scene. You create these by going to `Scene > New Inherited Scene` or by pressing `ctrl + shift + n`.
- **Quality Of Life For Players**: 
	- **Next Level Button**: This next Level Button appear at the Passed Menu of every level but the last and it speeds up going through the game considerably.
	- **Coyote Jump**: The so called Coyote Jump is a small time frame after the player has left the platform he was standing on where he can still jump.
	- **Escape To Pause / Unpause the Game**: This ones obviouse and really easy to implement since `escape_ui` is a built in Input Event we can simply look for that and then toggle `get_tree().paused`.
- **Static Variables**: Are a little bit like the Module Script Blocks in Svelte as the allow us to save data that is shared for all instances of a scene. To create such a variable simply add the `static` keyword before it.
- **Deployment**:
	- **SharedArrayBuffer**: This features makes it so Our Godot Games won't work by default on Itch.io but fortunately we can simply enable it in the Game Settings on Itch.io.
	- **CD**: For Deploying my Project Automatically I used GitHub Actions and the following two Third Party Actions: [Godot Export](https://github.com/firebelley/godot-export), [Itch.io Butler Upload](https://github.com/marketplace/actions/itch-io-butler-upload).
- **Falling Effect with Noise**: I thought it would be cool if the Player entered a "Falling Animation" once he would reached terminal velocity where the sprite would slowly wiggle around and move around to make this movement smooth I used [Noise](https://docs.godotengine.org/en/stable/classes/class_noise.html).
- **[Tilemap Patterns](https://docs.godotengine.org/en/stable/tutorials/2d/using_tilemaps.html#saving-and-loading-premade-tile-placements-using-patterns)**: Patterns are a way of storing Tile Formations for later use.
- **[Tween](https://docs.godotengine.org/en/stable/classes/class_tween.html)**: Godot 4 Also massively simplified Tweens as the can now be created by simply calling `create_tween`

## Annoying / Bad Things

Here also some things I think are not that Good or atleast that I misunderstood, so if that's the case don't hesitate to contact me and I will correct this part. Also Mind that I am using version 4.1.1. Later we could also look at this Part as a snapshot of all the things that changed / were fixed.

- **[Tilemaps](https://docs.godotengine.org/en/stable/classes/class_tilemap.html)**
	- You can't rotate Tiles in the Tilemap Editor, which is rather bad for my game since it can be flipped in all directions.
	- I wanted to disable collisions for my Background Layers in the Tilemap but you can't set collisions on Layers.
- **ctrl + s**: Often Times results in switching to the resize tool which is rather annoying.
- **Shadows**: On Light Sources there is a shadow Property which allows us to set the color of the shadowy parts but for this option did do nothing, I had to use the [CanvasModulation](https://docs.godotengine.org/en/stable/classes/class_canvasmodulate.html) for this.
- **Live Reloading**: One thing I really miss about Godot 3.x is the live Reloading of Scenes and Script. Maybe It just seemed that way because I was excessively using Built in scripts which I think are very cool.
- **Caching?**: Sometimes it felt like Godot was loading my Game from a Cache and it did not load the changes I just made.


These things are probably subject to change and that's why the [Interactive Changelog](https://godotengine.github.io/godot-interactive-changelog/) is really cool.
