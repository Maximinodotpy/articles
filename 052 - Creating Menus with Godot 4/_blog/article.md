---
name: Creating Menus with Godot 4
slug: creating-menus-with-godot-4
category: Godot Game Engine
status: draft
description: 
---

In this tutorial I want to teach you how to make menus in Godot 4. I will do this by building a dynamic system where we can add menu items to a structured dictionary and a function will build the menu accordingly. This structured Dictionary will support the following features: Name, Tooltip, Shortcut, Condition, Callback, Children. The menu will be built using the `PopupMenu` node and the `createSubmenu` function will be the heart of this whole program.

## Menu dictionary structure

Let's first go over the structure of the dictionary defining the menu.

As you see each key is the name of the menu and its value is another dictionary with the configuration for the given menu item. Actually every config key is optional. We could even add a `children` key in order to create a submenu.

```gdscript
var menuItems = {
	'File': {
		'New Scene': {
			'shortcut': createShortcut(KEY_N, true),
			'callback': func(args = {}): print('New Scene'),
		},
		'New Inherited Scene': {
			'shortcut': createShortcut(KEY_N, true, true),
			'callback': func(args = {}): print('New Inherited Scene'),
		},
		'Open Scene': {
			'shortcut': createShortcut(KEY_O, true),
			'callback': func(args = {}): print('Open Scene'),
		},
		'Reopen Closed Scene': {
			'shortcut': createShortcut(KEY_O, true, true),
			'callback': func(args = {}): print('Reopen Scene'),
			'condition': func(): return false,
		},
        'Recent': {
            'children': {
                'File 1': {},
                'File 2': {},
                'File 3': {},
            }
        }
    },
    'More Top Level Keys ...': {
		'Align': {
			'children': {
				'Left': {
					'children': {
						'AH': {},
						'falösdk': {},
						'falösdkj': {},
					}
				},
			}
		}
	}
}
```

Let's go over the different keys and their purpose.

- `name`: The name of the menu item, (The Key of the dictionary)
- `tooltip`: The tooltip of the menu item
- `shortcut`: The shortcut of the menu item
- `condition`: A function that returns a boolean, if the function returns false the menu item will be disabled
- `depends_on`: A function that receives the condition function in order to connect it to events that should retrigger the condition function
- `callback`: A function that will be called when the menu item is clicked
- `children`: A dictionary of menu items that will be added as a submenu
- `separator`: A boolean that will add a separator after the menu item
- `check_state`: A boolean that will make the menu item checkable and set its state
- `icon`: A texture that will be used as the icon for the menu item

<!-- ADD GITHUB LINK -->
Take a look at the full example in the [Showcase](#showcase) section and in the Github Repository.


## `createSubmenu` function

The `createSubmenu` function is the heart of this whole program. This function will take in the name and the data for a submenu and create the items accordingly.


<!-- END: Top Level Loop -->

## `createShortcut` helper function

Let's also quickly go over the `createShortcut` helper function which can be used in the the menuItems variable to assign Keyboard Shortcuts to the menu items. Normally we would have to go through several hoops to create a shortcut and this function simplifies that. It take a mandatory key variable and optionally booleans for the `ctrl`, `shift` and `alt` modifiers, by default these are set to false so if we want to assign a single letter as a shortcut we dont have to do as much.

`Shortcuts` consist of a list of `InputEvent`'s

```gdscript
func createShortcut(letter: Key, ctrl: bool = false, shift: bool = false, alt: bool = false)-> Shortcut:
	var shortcut = Shortcut.new()

	var input_event = InputEventKey.new()

	input_event.keycode = letter
	input_event.ctrl_pressed = ctrl
	input_event.shift_pressed = shift
	input_event.alt_pressed = alt

	shortcut.events = [ input_event ]

	return shortcut
```

## Showcase