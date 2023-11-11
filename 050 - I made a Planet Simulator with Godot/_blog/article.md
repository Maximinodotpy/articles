---
name: I made a Planet Simulator with Godot
slug: i-made-a-planet-simulator-with-godot
tags:
  - Game
  - GD
  - Script
category: Godot Game Engine
status: publish
description: Just a few thought on working with the Godot Game Engine while creating my Planet Simulator.
---

Recently I programmed a [Planet/Gravity Simulator](https://maximino.itch.io/planet-simulator) and now I want to share my thought on the process and the things I learned on the way. I will also share some [tips and tricks](https://maximmaeder.com/godot-tips-and-tricks/) I learned while working with the Godot Game Engine.

## Gravity Simulation

So let's start with center piece of a Planet Simulator: The Calculations. In my last [article](https://maximmaeder.com/calculating-gravity/) I went into detail on how to calculate the gravitational force acting between two objects and how this will affect their acceleration. In essence we need their masses and their distance. More massive objects will be less effected but effect others more.

Now in the Simulator we can also set the speed of the Simulation and it took me a long to figure out how to pair this feature with the calculations. 

As you could imagine I have a global variable defined on a Singleton that store the current time modifier. We then need to multiply two numbers with this modifier: The Delta Acceleration and the Linear Motion.

In Code it looks like this.

**Delta Acceleration**

```gdscript
motion -= (direction * acceleration * delta) * EditorGlobal.simulationSpeed
```

**Linear Motion**

```gdscript
position += (motion * delta) * EditorGlobal.simulationSpeed
```

We do this because we want the Planets to accelerate faster and slower depending on the simulation speed but we also want that their linear motion is slow and faster. 

For example if there is one Planet moving at a certain speed the Simulation Speed modifier should effect how fast it moves without any other objects.

Lastly I had to put the code shown in the second code block in a separate function and call it deferred so all planets would first calculate their new motion in this frame and then add it.

```gdscript
call_deferred("apply_motion", delta)
```

## User Interface

Making UI's with Godot is a lot of fun, more so if you figure out a extensible and working system of all the components working with each other.


### Signals and Singletons

Godots built-in Signal System does wonders to split your code into smaller more manageable pieces. I find their best when used in tandem with Singletons.

For example there is a singleton called `Selection` which as it's name suggests handles all things related to the selection of planets: Which Planets are selected, When something happens to a selected planet, Adding and Removing items to the Selection, Swapping the selection. This way other parts of the UI can simply connect to one of the many signals and functions and get its data and reacting appropriately to any changes.

### Built-in UI Elements

The built-in UI Elements are awesome. The V and H-Split containers instantly give your game or app a more professional feel.

I also tried to stay away from the Viewport Container and the SubViewport class for a long time but now I think their the best. For a long time I thought how I could make it so clicks on the UI don't effect the Canvas where the Planets reside and the simple and effective Solution where SubViewport's. Now this doesn't. mean that I didn't into my fair share of traps when using multiple viewports. I had to keep in mind that for example the mouse position has the be found out from an element within the SubViewport and the main one.

Singletons and Signals also came in useful for the UI Layout: I made a Singleton called `UserInterface` which handled toggling the bottom and side panel the grid in the background and the origin marker and also the position of the side panel. Furthermore this whole setup allowed me to easily make it so the Layout of the App would be saved and reapplied by using the [ConfigFile](https://docs.godotengine.org/en/stable/classes/class_configfile.html) Class.

Theming the UI also was a lot of fun even though I was too lazy to switch out the default checkbox images.

Lastly I had a blast adding Keyboard Shortcuts to my App on the Menu Buttons. I just had to find out how to do it correctly and I instantly made my app more accessible. Also these Menu Buttons were disabled conditionally depending on the selection by once again using signals.


## Conclusion

So thats my finding and and thoughts when working with the Godot Editor on my Planet Simulator.

<!--

- User Interface Singleton
- V-Split Container and reversing the order of the children
  - How does the VSPLIT in the Editor itself work?
- Themeing
  - Images for Checkboxes?
- Keyboard Shortcuts for Buttons and Menus
- Making a menu button conditionally disabled
- Config Class

-->
