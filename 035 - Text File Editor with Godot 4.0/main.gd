extends Control

@onready var menu_button := $vbox/menu/file_menu_button
@onready var text_edit := $vbox/text_edit

var current_dialog : FileDialog
var current_path := ''

const MENU_ITEMS := [
	['Save', 'save_file', KEY_S],
	['Save as', 'menu_save_file', KEY_Y],
	['Open', 'menu_open_file', KEY_O],
]

# Dialog Options
const FILE_FILTERS = [
	['*.md, *.txt, *.py', 'Text Files'],
	['*.*', 'All'],
]
const FILE_ACCESS = FileDialog.ACCESS_USERDATA

const APPLICATION_NAME = 'Maxim`s File Editor'
const WINDOW_TITLE = '%s - %s'
const WINDOW_TITLE_EDITED = '%s - [Unsaved Changes] %s'
const UNSAVED_FILE_NAME = 'new.txt'

func _ready():
	current_path = UNSAVED_FILE_NAME
	
	get_window().title = WINDOW_TITLE % [APPLICATION_NAME, current_path]
	
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
	
	get_viewport().connect("size_changed", on_viewport_resize)
	
	text_edit.connect('text_changed', on_text_change)


func _process(delta):
	for menu_item in MENU_ITEMS:
		if '':
			pass


func on_file_menu_clicked(id):
	print('Pressed "%s"' % MENU_ITEMS[id][0])
	self.call(MENU_ITEMS[id][1])

func on_viewport_resize():
	if current_dialog:
		current_dialog.size = get_viewport().size

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


func menu_open_file():
	print('Open File Dialog ...')
	
	var dialog = create_default_dialog()
	dialog.file_mode = FileDialog.FILE_MODE_OPEN_FILE
	dialog.connect('file_selected', open_file_selected)
	

func open_file_selected(path):
	var file = FileAccess.open(path, FileAccess.READ)
	text_edit.text = file.get_as_text()

	get_window().title = WINDOW_TITLE % [APPLICATION_NAME, path]
	current_path = path

func menu_save_file():
	print('Saving File ...')

	var dialog = create_default_dialog()
	dialog.file_mode = FileDialog.FILE_MODE_SAVE_FILE
	dialog.connect('file_selected', save_file)

func save_file(path = current_path):
	if path == UNSAVED_FILE_NAME:
		menu_save_file()
		return
	
	get_window().title = WINDOW_TITLE % [APPLICATION_NAME, path]
	current_path = path
	
	print('Saving to "%s"' % path)
	var file = FileAccess.open(path, FileAccess.WRITE)
	file.store_string(text_edit.text)

func on_text_change():
	get_window().title = WINDOW_TITLE_EDITED % [APPLICATION_NAME, current_path]
