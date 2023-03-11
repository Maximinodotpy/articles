---
name: 'Text File Editor with Godot 4'
slug: 'text-file-editor-with-godot-4'
tags: ['gdscript', 'godot', 'editor', 'ui']
category: 'Godot Game Engine'
status: 'draft'
description: "Let's celebrate the Release of Godot 4.0 by making a Text File Editor with this awesome Game Engine."
---

Its finally here: [Godot 4.0](https://godotengine.org/article/godot-4-0-sets-sail/) just released and I want to celebrate that by diving back into this awesome game engine and making a text file editor with it.

![Godot Logo](https://maximmaeder.com/wp-content/uploads/2023/03/logo_large_color_dark.png)

Bear in mind that I wont go over everything that this project includes, I will only go over the scene tree and the code. If you want you can head over to my [articles repository](https://github.com/Maximinodotpy/articles) and download the project to see for yourself.

<!-- [How to get to user data folder]

```gdscript
extends Control
``` -->

## Scene Tree for the Text Editor

Let's start with the scene tree! As you see it  is made by control nodes. We use a `ColorRect` to change the background color and use a `VBoxContainer` to place the menu at the top and the text area below. For the menu we use a `HBoxContainer` with one menu button that can spawn a popup menu.

![](https://maximmaeder.com/wp-content/uploads/2023/03/scene-tree.png)

For the Text edit we need to go into its `Layout/Container Sizing` Properties to change expand to true. This is a little bit like `flex-grow: 1` in css where this element will try to take up as much space as possible.

![](https://maximmaeder.com/wp-content/uploads/2023/03/layout.png)

## GDScript for the Text Editor

Now lets get to the Hard Part: the Code.

Luckily we only need one script file that is added to the root element of the scene. So all the code you see below is in this single file.

### Setup

As with any script we need to say which node it extends. After that what I like to do is get reference to all the nodes this script will interact with. Because the nodes arent actually available at this stage we need to add the `@onready` annotation to it.

```gdscript
extends Control

@onready var menu_button := $vbox/menu/file_menu_button
@onready var text_edit := $vbox/text_edit
```

Also mind the ` := ` which means we set the type of these to variables to what ever is on the right so in this case Nodes.

Next up we define another two variables that will change as the program goes on.

```gdscript
var current_dialog : FileDialog
var current_path := ''
```

Next up we define a bunch of constant variables. The first one holds our menu buttons. This is a list of lists where the first item is the name, the second the function name to call and the last one is the key that can also trigger this button.

```gdscript
const MENU_ITEMS := [
	['Save', 'save_file', KEY_S],
	['Save as', 'menu_save_file', KEY_Y],
	['Open', 'menu_open_file', KEY_O],
]
```

Then we specify some File Filters because we dont want that the use gets overwhelmed with options that actually dont work.

And we specify what kind of acces the user has. For now this is the User Data Folder, which is a special folder where you could store save files for your games. You can find the location of it by clicking on `Project` and then `Open User Data Folder`.

```gdscript
# Dialog Options
const FILE_FILTERS = [
	['*.md, *.txt, *.py', 'Text Files'],
	['*.*', 'All'],
]
const FILE_ACCESS = FileDialog.ACCESS_USERDATA
```

Then we also set the Application name and we define string patterns for when the current file is saved and unsaved. We can later insert our Info into these strings via [string formatting](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_format_string.html).

```gdscript
const APPLICATION_NAME = 'Maxim`s File Editor'
const WINDOW_TITLE = '%s - %s'
const WINDOW_TITLE_EDITED = '%s - [Unsaved Changes] %s'
const UNSAVED_FILE_NAME = 'new.txt'
```

Then in the ready function set the window title with `get_window().title`.

```gdscript
func _ready():
	current_path = UNSAVED_FILE_NAME
	
	get_window().title = WINDOW_TITLE % [APPLICATION_NAME, current_path]
```

After that we create the menu items in a for loop. We also add the a shortcut to each one so it can be quickly called. We also connect click event of the popup to a function called `on_file_menu_clicked`.

```gdscript
    var i = 0
	for menu_item in MENU_ITEMS:
		var popup : PopupMenu = menu_button.get_popup()
		
		popup.add_item(menu_item[0], i)

		var new_input = InputEventKey.new()
		new_input.keycode = menu_item[2]
		new_input.ctrl_pressed = true
		var shortcut = Shortcut.new()
		shortcut.events = Array([new_input])
		popup.add_shortcut(shortcut, i)
		i += 1

	menu_button.get_popup().connect("id_pressed", on_file_menu_clicked)
```

Lastly we connect the `sized_changed` signal and `text_changed` to some function that we later go over.

```gdscript
	get_viewport().connect("size_changed", on_viewport_resize)
	
	text_edit.connect('text_changed', on_text_change)
```

## Showing the Text Editor

[ GIF of the Text Editor ]

## Conclusion

By the way, you can add a file called [`.gdignore`](https://github.com/godotengine/godot/issues/8461#issuecomment-481863362) to any folder that should be ignored by the Godot Editor. So images in such a folder wont be importet which may be useful for a folder containing the exports of your game of media for the itch.io page.