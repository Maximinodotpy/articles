const open_button = document.getElementById('open-button')
const save_button = document.getElementById('save-button')
const save_as_button = document.getElementById('save_as-button')
const editor_textarea = document.getElementById('editor-textarea')
const current_file_label = document.getElementById('current_file-label')


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


async function openFileCallback() {
    [file_handle] = await window.showOpenFilePicker(fileTypeOptions)

    setCurrentFileLabel(file_handle.name)
    
    const file = await file_handle.getFile()
    
    editor_textarea.value = await file.text()
}

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

async function saveAsFileCallback() {
    file_handle = await window.showSaveFilePicker(fileTypeOptions)

    setCurrentFileLabel(file_handle.name)

    const writable = await file_handle.createWritable()
    await writable.write(editor_textarea.value)
    await writable.close()
}

async function setCurrentFileLabel(text) {
    const labelText = `${APPLICATION_NAME} - ${text}`
    current_file_label.innerText = labelText
    document.querySelector('title').innerText = labelText
}

open_button.addEventListener('pointerdown', openFileCallback)
save_button.addEventListener('pointerdown', saveFileCallback)
save_as_button.addEventListener('pointerdown', saveAsFileCallback)

editor_textarea.addEventListener('input', () => {
    file_handle ? setCurrentFileLabel('*' + file_handle.name) : setCurrentFileLabel('*Untitled')
})

setCurrentFileLabel('Untitled')
