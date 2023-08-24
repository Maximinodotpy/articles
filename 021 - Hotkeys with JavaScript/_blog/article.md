---
name: Keyboard Shortcuts with JavaScript
slug: shortcuts-with-javascript
tags:
  - Component
  - JavaScript
category: Utility
description: Learn how to make functions to set up keyboard shortcuts easily in JavaScript
---

In this short Tutorial, we will make two functions that will make it easy to set up keyboard shortcuts. one function will accept an object as a parameter, and another will receive a string in the likes of `ctrl+a` or `shift-alt-for and a callback function. The second one will call the first one because it is essentially the same, just easier for programming. Let's get started!

## Function with Object Parameter

We start with the object parameter function. It sounds more complex than it is. For the parameter, we can destructure objects, as you see below. Here we can also set default values. So we want to know the key, and the programmer can specify if the `ctrl`, `alt`, or `shift` keys should be pressed for this shortcut. We also give the option to prevent the default action of the shortcut so, for example, `ctrl+s` won't trigger a page safe. We also want a callback and the option to specify which element the event listener is in. Since this is an object, the programmer can give the arguments in any order. Inside the function, we immediately get to an event listener.

```js
function hotkeyHandler({key, ctrlKey=null, altKey=null, shiftKey=null, preventDefault=false, callback=() => {}, element=document}) {
    element.addEventListener('keydown', ev => {
		...
    })
}
```

Now inside the event listener, we check a few things starting with the key. If the key in the event and the arguments don't match, nothing should happen, so we return. We then do something very similar for the three modifier keys. We check if the argument is not set to null and if the argument value and event value match up. We do it this way so the user can specify that, for example, alt should not be pressed, the shift should be pressed, or it does not matter if ctrl was pressed. By doing it this way, we say we don't care whether the modifier was pressed by default.

We then call the `ev.preventDefault()` function if the programmer says it should be called. This function will tell the browser not to do the default thing for this keyboard shortcut. Lastly, we call the callback given as an argument.

```js
if (ev.key.toLowerCase() != key.toLowerCase()) return
if (ctrlKey != null && ev.ctrlKey != ctrlKey) return
if (altKey != null && ev.altKey != altKey) return
if (shiftKey != null && ev.shiftKey != shiftKey) return

if (preventDefault) ev.preventDefault()

callback()
```

### Setting up a shortcut

The code below shows how one would set up `ctrl+s` to work with our function. Of course, since this will trigger a page save, we need to prevent the default action.

```js
hotkeyHandler({
    key: 's',
    ctrlKey: true,
    callback: () => {
        console.log('Ctrl+S pressed');
    },
    preventDefault: true,
})
```

This is alright, but maybe we can make a shorter version ...

## Function with string Parameter

Let's also look at how to make a wrapper function for more straightforward but less detailed usage. This function will ask for a hotkey string, a callback, and whether to prevent the default or not. The hotkey string should look like this: `ctrl+a` or `shift-alt-o`, `ctrl+Backspace`. The key must come last in this order.

In the function, we search for the key with regex. We use the string end anchor for this. We then build the argument object with the key, callback, and preventDefault option. We then see if the respective modifier keys have been mentioned in the hotkey string and set this argument according to that. Doing it this way means we can not say *only if shift was not pressed*, but that's alright for simple use cases. Lastly, we also call the other function with these arguments.

```js
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
```

### Setting up a shortcut

Setting up the same keyboard shortcut as above looks like this. You see, it's much shorter, but it does the same.

```js
hotKey(
	'ctrl+s',
	() => { console.log('Ctrl+S pressed') },
	true
)
```

## Conclusion

[Look at the Code](https://github.com/Maximinodotpy/articles/tree/main/article%2021%20-%20Hotkeys%20with%20JavaScript)

Excellent! You have successfully created functions for setting up Keyboard shortcuts using JavaScript code!

Keep in mind that I am also just a beginner, so it could be that my way of solving these problems is not the best or that I use functions or features that aren't advised. Always ask questions and try to solve problems your way!