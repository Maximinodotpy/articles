---
name: 'Autocomplete Input with JavaScript/Typescript'
slug: 'autocomplete-input-with-javascript'
tags: ['JavaScript', 'Typescript']
category: 'Utility'
description: 'Let\' make an autocompletion feature for input elements our Website using Typescript and the Datamuse API.'
status: 'draft'
---

In todays Tutorial we will replicate the text suggestion featured that is built in many Websites and Apps like YouTube, Google and basically every place where a text field gives you suggestion based on your current input.

To do this we will  use the Datamuse API and for a better Developer Experience we use Typescript. Behinde the scenes we use Vite but I wont go over that as it does not really matter.

We make it so a panel appears whenever the user is focused on the text input, that contains suggestions based on the word that the cursor is currently. These suggestions can be chosen via the keyboard.

Lastly we make it so this panel appears for every text input that has the `data-suggestions` attribute.

<!-- [Enums, Autocompletion, Keyboard Navigaition, Suggestions API] -->

## Setup

We start by query selecting all elements with the `data-suggestions` attribute and we save the resulting array in a variable that we will later loop over so we can add the logic to each input field.

```ts
const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll('[data-suggestions]'))

for (const input_element of inputs) {
    // All other code is located in here
}
```

As you see we indicate that `inputs` holds a list of `HTMLInputElement`'s with `HTMLInputElement[]`.

### Variable and Creating Elements

Next up we define variables for later.

- `current_suggestion_index` will be used to chose suggestion from the current list.
- `current_suggestions` will, as its name suggests (Pun somewhat intended), hold the current list of suggestions. For now it is empty but we can define its shape before hand.
- `current_word_info` will be the word that is currently selected by the cursor.

```ts
let current_suggestion_index = 0
let current_suggestions: { word: string, score: number }[] = []
let current_word_info = get_currently_selected_word()
```

After that we create the element that holds the current list of suggestions. We can add this element after the input element with the `after` method.

```js
const suggestion_container = document.createElement('div');
suggestion_container.style.maxHeight = '300px'
suggestion_container.style.overflowY = 'auto'
input_element.after(suggestion_container);
```

### Event Listeners

Continuing we add Event Listeners to our input element.

These next three elements simply handle hidding and showing the suggestion container and the last one re fetches suggestions.

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

```js
input_element.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key == 'ArrowUp' && event.ctrlKey) event.preventDefault()
    if (event.key == 'ArrowDown' && event.ctrlKey) event.preventDefault()
})
```

## Functions


### Accepting the current Suggestion


### Getting Suggestions from the API


### Rendering the Suggestions


### Getting the Current Word


## HTML Usage

```html
<input type="text" data-suggestions/>
```

## Conclusion