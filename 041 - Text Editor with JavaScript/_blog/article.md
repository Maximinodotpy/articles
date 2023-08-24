---
name: Text Editor with JavaScript
slug: text-editor-with-javascript
description: Let's create a text file editor with JavaScript that can open and
  save files to the local file system using the File system access API.
tags: ""
category: general
status: publish
---

In today's tutorial we will utilize the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) to create a web based text file editor that can open and even write/save files back to the local file system.

By this point I feel like a broken record because I have already built multiple Text Editors: [Highlighted Fake Code Editor](), [Text File Editor with Godot 4](https://maximmaeder.com/text-file-editor-with-godot-4/), [Python Code Editor with Python](https://www.thepythoncode.com/article/python-code-editor-using-tkinter-python), [Rich Text Editor with Python](https://www.thepythoncode.com/article/create-rich-text-editor-with-tkinter-python), [Markdown Editor with Python](https://www.thepythoncode.com/article/markdown-editor-with-tkinter-in-python), [Text Editor with Python](https://www.thepythoncode.com/article/text-editor-using-tkinter-python). But that doesnt matter 100th time's the charm.

So let's not waste any more time and get right into it.

## Text Editor Markup

Let's first go over the Markup for the Text Editor which fortunately is rather simple.

We have three buttons for opening, saving and saving as and we have a empty div that will hold file name.

Lastly we also have the textarea which holds the content of the text file.

```html
<div>
    <button>Open</button>
    <button>Save</button>
    <button>Save As</button>

    <div id="current_file-label"></div>
</div>

<textarea name="" id="editor-textarea"></textarea>
```

## Text Editor JavaScript

Now we'll continue with the JavaScript of the Text Editor.

We start by getting references to all the important elements.

```js
const open_button = document.getElementById('open-button')
const save_button = document.getElementById('save-button')
const save_as_button = document.getElementById('save_as-button')
const editor_textarea = document.getElementById('editor-textarea')
const current_file_label = document.getElementById('current_file-label')
```

Next up we define the name of our editor which will be used in the current file label. Then we also create an empty variable which will hold the file handle used to interact with the current file. Lastly we specify file options that we can use later when we prompt the user to chose a file.

```js
const APPLICATION_NAME = 'Editor'
let file_handle = null

const fileTypeOptions = {
    types: [
        {
            description: 'Text Files',
            accept: {
                'text/plain': ['.txt', '.md', '.py'],
            },
        },
    ],
    multiple: false,
}
```

Then we connect certain functions to our buttons and their respective pointerdown events. Also if the user changes the content of the text editor and there is a file we add an asterisk at the start to indicate that there unsaved changes.

```js
open_button.addEventListener('pointerdown', openFileCallback)
save_button.addEventListener('pointerdown', saveFileCallback)
save_as_button.addEventListener('pointerdown', saveAsFileCallback)

editor_textarea.addEventListener('input', () => {
    file_handle ? setCurrentFileLabel('*' + file_handle.name) : setCurrentFileLabel('*Untitled')
})

setCurrentFileLabel('Untitled')
```

Now let's look at these four functions.

### Opening a File

To open a file we first have to ask to user to select a file. We do this by calling the `showOpenFilePicker` function and passing in the file options we defined earlier. This function returns an array of file handles which we destructure into a single variable. Then we set the current file label to the name of the file and we get the file object from the file handle. Lastly we set the content of the text editor to the content of the file.

```js
async function openFileCallback() {
    [file_handle] = await window.showOpenFilePicker(fileTypeOptions)

    setCurrentFileLabel(file_handle.name)
    
    const file = await file_handle.getFile()
    
    editor_textarea.value = await file.text()
}
```

### Saving a File

Saving a file is very similar to opening a file. We first check if there is a file handle and if there is we get the file object from it. Then we write the content of the text editor to the file and we set the current file label to the name of the file. In case there is no file handle we save the file as a new file.

```js
async function saveFileCallback() {
    if (file_handle) {
        const stream = await file_handle.createWritable()
        await stream.write(editor_textarea.value)
        stream.close()
        setCurrentFileLabel(file_handle.name)
    } else {
        saveAsFileCallback()
    }
}
```

### Saving a new File

Saving a new file is very similar to saving a file. We first ask the user to select a file and then we get the file object from the file handle. Then we write the content of the text editor to the file and we set the current file label to the name of the file.

```js
async function saveAsFileCallback() {
    file_handle = await window.showSaveFilePicker(fileTypeOptions)

    setCurrentFileLabel(file_handle.name)

    const writable = await file_handle.createWritable()
    await writable.write(editor_textarea.value)
    await writable.close()
}
```

### Setting the label

Lastly we also have a function that sets the current file label. This function takes a string as an argument and sets the inner text of the current file label and the title of the document.

```js
async function setCurrentFileLabel(text) {
    const labelText = `${APPLICATION_NAME} - ${text}`
    current_file_label.innerText = labelText
    document.querySelector('title').innerText = labelText
}
```

## Conclusion

[Demo](https://demos.maximmaeder.com/d/text-editor-with-javascript/)

As you see it is rather simple to create a text file editor with this API. I hope that you learned something new today. You could now build something awesome with this newly ganied knowledge. If you have any questions or suggestions feel free to contact me.