---
name: 'Autocomplete Input with JavaScript/Typescript'
slug: 'autocomplete-input-with-javascript'
tags: ['JavaScript', 'Typescript']
category: 'Utility'
description: "Let's make an autocompletion feature for input elements our Website using Typescript and the Datamuse API, similar to Youtubes and Googles search bars."
status: 'publish'
---

In today's Tutorial, we will replicate the text autocompletion feature built in many Websites and Apps like YouTube, Google, and every place where a text field gives you suggestions based on your current input.

To do this, we will use the [Datamuse API](https://www.datamuse.com/), and for a better Developer Experience, we use Typescript. Behind the scenes, we use Vite, but I won't go over that as it does not matter.

We make it so a panel appears whenever the user focuses on the text input, which contains suggestions based on the word that the cursor is currently. Users can then choose a suggestion with the keyboard.

Lastly, we make this panel appear for every text input with the `data-suggestions` attribute.

## Setup

We start by query selecting all elements with the `data-suggestions` attribute, and we save the resulting array in a variable that we will later loop over so we can add the logic to each input field.

```ts
const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll('[data-suggestions]'))

for (const input_element of inputs) {
    // All other code is located here
}
```

We indicate that `inputs` holds a list of `HTMLInputElement`'s with `HTMLInputElement[]`.

### Variable and Creating Elements

Next up, we define variables for later.

- `current_suggestion_index` will be used to choose a suggestion from the current list.
- `current_suggestions` will, as its name suggests (Pun somewhat intended), hold the current list of suggestions. It is empty now, but we can define its shape beforehand.
- `current_word_info` will be the word currently selected by the cursor.

```ts
let current_suggestion_index = 0
let current_suggestions: { word: string, score: number }[] = []
let current_word_info = get_currently_selected_word()
```

After that, we create the element that holds the current list of suggestions. We can add this element after the input element with the `after` method.

```js
const suggestion_container = document.createElement('div');
suggestion_container.style.maxHeight = '300px'
suggestion_container.style.overflowY = 'auto'
input_element.after(suggestion_container);
```

### Event Listeners

Continuing, we add Event Listeners to our input element.

The following three elements handle hiding and showing the suggestion container, and the last one re-fetches suggestions when the user clicks on the input.

```js
input_element.addEventListener('focus', () => {
    suggestion_container.style.display = 'block'
    get_suggestions()
});
input_element.addEventListener('blur', () => { suggestion_container.style.display = 'none' });
input_element.addEventListener('pointerdown', () => {
    get_suggestions()
})
```

After that, we add an event listener for the `keydown` event to prevent the default events for the left and right arrows if control is pressed. We do this because this Shortcut will be used to select a suggestion.

```js
input_element.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key == 'ArrowUp' && event.ctrlKey) event.preventDefault()
    if (event.key == 'ArrowDown' && event.ctrlKey) event.preventDefault()
})
```

Lastly, we add a keyup event listener so we can react to new content in the input field. Here we handle the arrow navigation among other things.

```ts
input_element.addEventListener('keyup', (event: KeyboardEvent) => {
    if ( event.ctrlKey ) {
        if ( event.key == 'ArrowUp' ) {
            if ( current_suggestion_index > 0 ) current_suggestion_index--
            render_suggestions()
            return
        } else if ( event.key == 'ArrowDown' ) {
            if ( current_suggestion_index < current_suggestions.length - 1 ) current_suggestion_index++
            render_suggestions()
            return
        } else if ( event.key == 'Enter' ) {
            event.preventDefault()
            accept_current_suggestion()
            return;
        }
    }

    // Clear Suggestion Container in case the selection is not collapsed
    if (input_element.selectionStart != input_element.selectionEnd) {
        suggestion_container.innerHTML = ''
        return
    };

    // Refetch the Suggestions for the current word
    get_suggestions()
})
```

## Functions

This is not all. As you saw before, some functions have yet to be explained, but they have been used, so let's go over them here.

### Accepting the current suggestion

This function is called when the user hits `Ctrl + Enter`. It will replace the current word with the current suggestion. The `setRangeText` method of a text input element comes in handy here.

```ts
function accept_current_suggestion() {
    const suggestion_word: string = current_suggestions[current_suggestion_index].word

    input_element.setRangeText(suggestion_word, current_word_info.start, current_word_info.end, 'end')

    get_suggestions()
}
```

### Getting Suggestions from the API

With this function, we get suggestions from the Datamuse API.

```ts
function get_suggestions() {
    current_word_info = get_currently_selected_word()
    const url = `https://api.datamuse.com/sug?s=${current_word_info.word}`

    fetch(url)
        .then(response => response.json())
        .then(suggestions => {
            current_suggestions = suggestions
            current_suggestion_index = 0;

            render_suggestions()
        })
}
```

### Rendering the Suggestions

This function will, as its name suggests, rerender the suggestions. As you see, we treat the currently chosen element differently by changing its font weight to be more prominent. Lastly, we also ensure that the current element is visible in a scrolled container by using the [`scrollIntoView`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) method.

```ts
function render_suggestions() {
    suggestion_container.innerHTML = ``

    let i = 0;
    for (const suggestion of current_suggestions) {
        const suggestion_element = document.createElement('button')

        suggestion_element.style.display = 'block'

        // Treat the current suggestion differently
        if (i == current_suggestion_index) {
            suggestion_element.style.fontWeight = '900'
        } else {
            suggestion_element.style.opacity = '0.7'
        }

        suggestion_element.innerHTML = suggestion.word

        suggestion_container.appendChild(suggestion_element)
        i++
    }

    // Scroll to the Element
    suggestion_container.children[current_suggestion_index].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
}
```

### Getting the Current Word

Lastly, we need a function that finds the word the cursor is currently in and returns it along its start and end indices.

```ts
function get_currently_selected_word(): {word: string, start: number, end: number } {
    let current_word = ''

    // this will also be the end
    let i = 0
    let start = 0

    // This will be set to true if the position is met
    let surely_the_word = false

    while (i < input_element.value.length) {

        let letter = input_element.value[i];

        if (i == input_element.selectionStart) surely_the_word = true

        // Break out entirely if the Current word is finished
        // and it is the searched word
        if (letter == ' ' && surely_the_word) break

        // Restart the counters in case the word is finished
        if (letter == ' ') {
            current_word = ''
            start = i + 1
        }
        else current_word += letter

        i++
    }

    return {word: current_word, start: start, end: i }
}
```

## HTML Usage

Using our code is simple; we have to add the `data-suggestions` attribute to an input we want to equip with text suggestions.

```html
<input type="text" data-suggestions/>
```

[Showcase for the Autocompletting Input](showcase.gif)

## Conclusion

Well, that's it! I hope you had a good time reading this and that you learned something new!