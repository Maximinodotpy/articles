---
name: Godot Tips and Tricks
slug: godot-tips-and-tricks
tags:
  - Game
  - GD
  - Script
category: Godot Game Engine
status: publish
description: A bunch of Tips and Tricks for the Open Source Game Engine Godot.
---

Hey what's up Friends, This time around I simply want to shower you with Tips and Tricks for the Godot Game Engine. Enjoy.

Contact me if you have some Tips and Tricks you are missing from this page.

## Run Multiple Instances

Useful when testing Multiplayer Games, where one instance acts as the Server and the other as a Client.

![](https://i.imgur.com/SK9KeNC.png)


## Color Picker in Code Editor

You can get a Color Picker for `Color` Objects by Right Clicking it.

![](https://i.imgur.com/yHgEqJl.png)

![](https://i.imgur.com/WpMIjBY.png)


## Set Custom Asset Library Sources

Got to `Editor Settings > Asset Library > Available URLs`.

![](https://i.imgur.com/XL9WSrS.png)


## "Speed up" your Code Editor

When Indexing your Code Files Godot will wait for 2 Seconds after you made the last change. You can lower this time in `Editor Settings > Text Editor > Completion > Idle Parse Delay`.

![](https://i.imgur.com/Pe99522.png)


## Custom Doc Comments (##)

If you did not know, Godot will create custom Documentation for your Script Files

![](https://i.imgur.com/eRCG9ie.png)


![](https://i.imgur.com/3hAvJkS.png)

## Button Groups

You can add Buttons to groups so that only one of them can be pressed at a time, which radio button behavior.

```gdscript
var buttonGroup = ButtonGroup.new()

...

button.toggle_mode = true
button.button_group = buttonGroup
```

Can also be added via the Properties Panel.
## Button Shortcuts

You can add Shortcuts to Buttons either via the Properties Panel,

![](https://i.imgur.com/diNMT5h.png)


or through code.

```gdscript
var shortcut = Shortcut.new()
var key = InputEventKey.new()
key.set_keycode(KEY_V)
shortcut.events = [ key ]
button.shortcut = shortcut
```


## Rects UNFINI

## Stepify Numbers

You probably know `clamp` but there is also `snapped` which takes in a number and a snapping amount and it will snap it to that range.

```gdscript
var number = snapped(55, 20)

# Will be 60
```

## Shortcuts

Everything is better with Shortcuts -> [Godot Keyboard Shortcuts (maximmaeder.com)](https://maximmaeder.com/keyboard-shortcuts/#godot)

## Commonly Needed Functions

### Root Element

```gdscript
get_tree().root.get_child(-1)
```

### Viewport Size

```gdscript
get_viewport().get_visible_rect().size
```

### Active Viewport Control Element

```gdscript
get_viewport()
```

### Current Mouse Position

```gdscript
get_viewport().get_mouse_position()
```

### More Helpers

For more Helpers you take a look at my [Godot Plugin](https://godotengine.org/asset-library/asset/2165).

## Other Articles

- [13 Godot Engine Tricks You’ll WISH You Knew Sooner – StayAtHomeDev](https://stayathomedev.com/tutorials/13-godot-engine-tricks-youll-wish-you-knew-sooner/)
- [General optimization tips — Godot Engine (stable) documentation in English](https://docs.godotengine.org/en/stable/tutorials/performance/general_optimization.html)
- [Godot Tips 'n Tricks 'n Gotchas (pythonforengineers.com)](https://new.pythonforengineers.com/blog/godot-tips-n-tricks-n-gotchas/)
- [Godot Tips and Tricks (gdscript.com)](https://gdscript.com/articles/godot-tips-and-tricks/)
- [Godot 3 Tips - GoTut: Godot Tutorials & Tips](https://www.gotut.net/godot-3-tips/)
- [me2beats/godot-tips-and-tricks: Tips and tricks you should know when using Godot Engine! (github.com)](https://github.com/me2beats/godot-tips-and-tricks)