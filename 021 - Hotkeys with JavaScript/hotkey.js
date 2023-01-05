function hotKey(hotkey, callback, preventDefault=false) {
    const key = hotkey.match(/[a-z0-9]*$/i)[0];

    const args = {
        key,
        ctrlKey: hotkey.match(/CTRL/i) != null ? true : null,
        shiftKey: hotkey.match(/shift/i) != null ? true : null,
        altKey: hotkey.match(/alt/i) != null ? true : null,
        callback,
        preventDefault
    }

    hotkeyHandler(args);
}

function hotkeyHandler({key, ctrlKey=null, altKey=null, shiftKey=null, preventDefault=false, callback=() => {}, element=document}) {
    element.addEventListener('keydown', ev => {

        if (ev.key.toLowerCase() != key.toLowerCase()) return
        if (ctrlKey != null && ev.ctrlKey != ctrlKey) return
        if (altKey != null && ev.altKey != altKey) return
        if (shiftKey != null && ev.shiftKey != shiftKey) return

        if (preventDefault) ev.preventDefault()

        callback()
    })
}