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

### File Menu Actions

Let's go over the three different actions that can be called via the menu at the top left and how the system behinde it works.

In the ready function we connected this function below to be called whenever the user clicks any of the menu buttons and it will simply call the function that was specified in the array at the top.

```gdscript
func on_file_menu_clicked(id):
	self.call(MENU_ITEMS[id][1])
```

The functions that are subsequntly called to almost the same thing. They use the `create_default_dialog` function to create a dialog set its file mode and they connect its `file_selected` signal to their respective functions.

```gdscript
func menu_open_file():
	var dialog = create_default_dialog()
	dialog.file_mode = FileDialog.FILE_MODE_OPEN_FILE
	dialog.connect('file_selected', open_file_selected)

...

func menu_save_file():
	var dialog = create_default_dialog()
	dialog.file_mode = FileDialog.FILE_MODE_SAVE_FILE
	dialog.connect('file_selected', save_file)
```

Now when opening a file we use the `FileAcces` Singleton to get the content of the given path and insert it into the text_edit. We also set the new window title and current_path variable.

```gdscript
func open_file_selected(path):
	var file = FileAccess.open(path, FileAccess.READ)
	text_edit.text = file.get_as_text()

	get_window().title = WINDOW_TITLE % [APPLICATION_NAME, path]
	current_path = path
```

And when we save a file we first check if the path is the equal to the unsaved file name which means this is a new file. So we simply call the `menu_save_file` function and return.

If thats not the case we simple set the window title, current_path variable and we once again use FileAccess to put the content into the file.

```gdscript
func save_file(path = current_path):
	if path == UNSAVED_FILE_NAME:
		menu_save_file()
		return
	
	get_window().title = WINDOW_TITLE % [APPLICATION_NAME, path]
	current_path = path
	
	print('Saving to "%s"' % path)
	var file = FileAccess.open(path, FileAccess.WRITE)
	file.store_string(text_edit.text)
```

### `on_viewport_resize`, `create_default_dialog` and `on_text_change`

Let's also quickly go over the three minor function that round of this little project.

`on_viewport_resize` will simply change the current_dialog size to the viewport size every time it is changed so the dialog takes up all of the space.

```gdscript
func on_viewport_resize():
	if current_dialog:
		current_dialog.size = get_viewport().size
```

The `create_default_dialog` function will as its name implies create and return a dialog Node that conforms to the settings that we made above. It will have the correct filter and access.

```gdscript
func create_default_dialog() -> FileDialog:
	var dialog := FileDialog.new()
	
	for file_filter in FILE_FILTERS:
		dialog.add_filter(file_filter[0], file_filter[1])

	dialog.access = FILE_ACCESS
	dialog.unresizable = true
	
	current_dialog = dialog
	
	on_viewport_resize()
	
	dialog.show()

	self.add_child(dialog)
	
	return dialog
```

Last but not least we need to change the window title everytime the use makes changes that arent saved.

```gdscript
func on_text_change():
	get_window().title = WINDOW_TITLE_EDITED % [APPLICATION_NAME, current_path]	
```

## Conclusion

![The Text File Editor in Action](https://maximmaeder.com/wp-content/uploads/2023/03/showcase.gif)

I know its a lot and maybe you have some better ideas than me so feel free to try it out yourself and build a program with Godot!

By the way, you can add a file called [`.gdignore`](https://github.com/godotengine/godot/issues/8461#issuecomment-481863362) to any folder that should be ignored by the Godot Editor. So images in such a folder wont be importet which may be useful for a folder containing the exports of your game of media for the itch.io page.