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


## Rect2

The [Rect2](https://docs.godotengine.org/en/stable/classes/class_rect2.html) Class is very useful for 2D Area Code, for example you could use this class to find out if a point is within an Area.

```gdscript
var rect = Rect2(0, 0, 100, 100)

print(rect.has_point(50, 50)) # Yes
print(rect.has_point(-10, -10)) # No
```

## Stepify Numbers

You probably know `clamp` but there is also `snapped` which takes in a number and a snapping amount and it will snap it to that range.

```gdscript
var number = snapped(55, 20)

# Will be 60
```


## Setting SpinBox value without signal.

The [SpinBox](https://docs.godotengine.org/en/stable/classes/class_spinbox.html) class will emit the `value_changed` signal even if the Value was changed via code, you can avoid this by calling `set_value_no_signal` on the SpinBox.


## Class Names

You can create globally available classes/types by using the [`class_name`](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#doc-gdscript-basics-class-name) keyword within your scripts.

These Scripts will be available everywhere by their name, keep in mind that this does not load scenes but scripts.


## Dragging Dropping Node References

You can quickly drag and drop node references into the code editor to get the Path of the Node, By holding CTRL it will even create an onready variable for you.

![](https://i.imgur.com/2uMq5XI.gif)


## Adding Submenus

If you want add a submenu you will have as you probably already thought to create another [`PopupMenu`](https://docs.godotengine.org/en/stable/classes/class_popupmenu.html) and assign it to another Menu.

```
var alignMenu = PopupMenu.new()
alignMenu.name = 'align'
add_child(alignMenu)

...

add_submenu_item('Align Option', 'align', 2)
```

It is important to add a name to the submenu as this info will be used internally by the Engine.


## Global Scripts / Singletons

You can add Scripts as [Singletons](https://docs.godotengine.org/en/stable/tutorials/scripting/singletons_autoload.html) so they're globally available.

Do this by going into `Settings > Autoload`

![](https://i.imgur.com/CWOFZNX.png)

Access them by their given name.

![](https://i.imgur.com/g1N5Yzl.png)

## Anti Aliasing Settings

![](https://i.imgur.com/B7r0NqX.png)

## is_instance_valid()

Check if a reference to a node has been freed with `is_instance_valid(node)`

![](https://i.imgur.com/E6JjmGa.png)

## Adding Shortcuts to Menus

Adding shortcuts to Menus involves just like with buttons first creating a shortcut and then setting it to a certain item in the menu.

```gdscript
add_item('Toggle', 0)
set_item_shortcut(0, toggle_shortcut)
```

## Typed Arrays

You can type arrays.

```gdscript
var node_array: Array[Node] = []
```

## Moving Children

You can move child nodes within their parent with `move_child`. To find the index (position) of a child within a parent use `get_index` on the child. This for example useful when dealing with Split Container where you want to flip the order of panels.

## Typing Signal Arguments

You can add types to signal arguments.

```gdscript
signal on_object_added(node: Node2D)
signal on_object_removed(node: Node2D)
signal on_object_renamed(node: Node2D)
```

## [Pausing and Not Pausing](https://docs.godotengine.org/en/stable/tutorials/scripting/pausing_games.html)

You can use `get_tree().paused` to pause and continue your game. This will make it so the `_process` functions wont be called.

For more fine grained control on how Nodes behave we can set their Process Mode.

![](https://i.imgur.com/u5kC7PM.png)


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