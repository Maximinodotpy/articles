---
name: 'Advanced Form Modal with JavaScript'
slug: 'advanced-form-modal-with-javascript'
tags: []
category: 'Utility'
description: 'Build a function that spawns an Advanced Modal with a form that will return a promise and the Data in the form.'
---

Today we will make something hard to explain: A Modal with a (somewhat) custom form that a programmer or we could use to ask the user something quickly and get the inputted data. Look at the [demo](https://articles.maximmaeder.com/a/advancedModal/) to see what I mean. It's going to be a function that will take in some config parameters for the form and the looks of the modal, and it will return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will resolve once the user has successfully submitted the form. This way, the function will be a little like `prompt()` but on steroids, if you get where I'm going.

To keep this Tutorial a little bit shorter, I won't go over the CSS used for this Modal as it is purely cosmetic.

So let's get into it.

## JavaScript of the Advanced Form Modal

So the whole program will be housed inside a function that we can call multiple times to generate new modals with a form. This function will take in a parameters argument that we will destructure inside the function.

```js
function advancedPrompt(parameters) {
	...
}
```

### Destructuring the Arguments

When we destructure the object to single constant variables, we essentially define the option the programmer can supply to the modal. Most importantly, we need the field data, which will tell the modal what fields/inputs there are and some other things about them. You will see where the other options are used shortly.

```js
// Destructure Arguments
const {
    fieldData: _fieldData = [],
    title: _title = 'Modal',
    submitNodeText: _submitNodeText = 'Submit',
    panelHeight: _panelHeight = 500,
    canBeCancelled: _canBeCancelled = true,
    text: _text = ''
} = parameters
```

### Creating the Elements

We then continue by creating the necessary elements for this modal. We create a wrapper that will make it so we can darken the background with CSS, and we add a form to it, which will be the panel of the modal itself. Here we use the `_panelHeight` option from before. After that, we add a node representing the title of the modal where use `_title`. We also add a node representing the describing text of the modal, and lastly, we have a wrapper/container for the fields that will be generated next.

```js
// Create Elements
// Modal Wrapper which will take up the entire Screen
const modalWrapper = document.createElement('div');
modalWrapper.className = 'modalWrapper';

// The Modal itself which is also a form
const modalPanel = document.createElement('form');
modalPanel.className = 'modalPanel'
modalPanel.style.height = _panelHeight + 'px'
modalWrapper.appendChild(modalPanel);

// The Title showing what this modal is for
const titleNode = document.createElement('div');
titleNode.className = 'modalTitle';
titleNode.innerHTML = _title;
modalPanel.appendChild(titleNode);

// The Text which further describes the modal.
const textNode = document.createElement('div');
textNode.innerHTML = _text;
modalPanel.appendChild(textNode);

// Fields
// we add a wrapper / container that will hold all the fields
const fieldsWrapper = document.createElement('div');
fieldsWrapper.className = 'fieldsWrapper'
modalPanel.appendChild(fieldsWrapper);
```

We then loop over each object of the `_fieldData` option. Firstly we get the attributes property, or we default to an empty array. This enables the user to add attributes to the inputs in any way they like to.m Then we make a div that will hold a label and an input. We set the input value according to the field value, if there is one, and the type to the corresponding property of the field object. Then we also add the custom attributes via a `for ... of` loop.

```js
// For each given field we add a Row Element with a label and an Input
for (const field of _fieldData) {
    const attributes = field.attributes || []

    const inputRow = document.createElement('div');
    inputRow.className = 'inputRow';

    const label = document.createElement('label')
    label.innerHTML = field.title

    const input = document.createElement('input')
    input.value = field.value || ''
    input.type = field.type

    for (const attribute of attributes) {
        input.setAttribute(attribute.name, attribute.value)
    }

    field.element = input;

    inputRow.appendChild(label)
    inputRow.appendChild(input)

    fieldsWrapper.appendChild(inputRow)
}
```

Then we also need to create the submit and cancel buttons. The user can omit the cancel button if they wish to.

```js
// Actions Panel with submit and cancel button
const actionsWrapper = document.createElement('div');
actionsWrapper.className = 'actionBar'
modalPanel.appendChild(actionsWrapper);

const cancelNode = document.createElement('button');
cancelNode.className = 'cancelButton'
cancelNode.innerHTML = 'Cancel'

if (_canBeCancelled) actionsWrapper.appendChild(cancelNode);

const submitNode = document.createElement('input');
submitNode.type = 'submit'
submitNode.className = 'submitButton'
submitNode.value = _submitNodeText;
actionsWrapper.appendChild(submitNode);

document.body.appendChild(modalWrapper);
```

### Promise and Return Value

Now that we have all the elements out of the way, we can get to the Promise that is returned from the function. Promises need a callback function that accepts a `resolve` and `reject` function. The `resolve` function can be called with any arguments we want to be available in the `then` function. In this Program, we call this function once the submit event of the form is dispatched. But before that, we also get all fields and their values, and we save them in `returnObject` variable. We also set up some event listeners in case the user has pressed `escape` or pressed the cancel button, and we reject the promise.

```js
// Return Promise
return new Promise((resolve, reject) => {

    modalPanel.addEventListener('submit', (event) => {
        event.preventDefault();


        // Gather all values from the Form and store with the 
        // Specified name
        let returnObject = {}

        for (const field of _fieldData) {
            returnObject[field.name] = field.element.files || field.element.value || field.element.checked
        }

        // Resolve the promise with the Data
        resolve(returnObject)
        modalWrapper.remove()
    })

    cancelNode.addEventListener('pointerdown', rejectPromise)

    window.addEventListener('keydown', (event) => {
        if (event.key == 'Escape' && _canBeCancelled) rejectPromise()
    })

    function rejectPromise() {
        modalWrapper.remove()
        reject('User Cancelled')
    }
})
```

### Cancel Reaction

## Usage Example

Ok, so how do we use this thing? We first need to import the script and if we have styles we also get those too.

```html
<link  rel="stylesheet"  href="advancedPrompt/advancedPrompt.css">
<script  src="advancedPrompt/advancedPrompt.js"></script>
```

Then in another script that comes after the import, we call the `advancedPrompt()` function with some parameters. Below we set a title and one field/input of type `text`, and we also add a `then` callback, so we can react to the user hitting the submit button.

```js
advancedPrompt({
    title: 'My Cool Modal',
    fieldData: [
        {
            title: 'Username',
            name: 'username',
            type: 'text',
            attributes: [
                {name: 'required', value: 'true'},
            ]
    ]
}).then(result => {
    ...
});
```

## Showcase

Below you see the showcase that you also can visit yourself. I used one of my [previous programs](https://maximmaeder.com/display-json-with-html-css-and-javascript/) to display the returned data.

![Advanced Form Modal Showcase Gif](https://maximmaeder.com/wp-content/uploads/2022/12/modal.gif)

[Visit the Demonstration](https://articles.maximmaeder.com/a/advancedModal/)
[Look at the Code](https://github.com/Maximinodotpy/articles/tree/main/article%2026%20-%20Advanced%20Form%20Modal%20with%20JavaScript%20and%20SCSS)

## Conclusion

That's it, an Advanced Form Modal ready to be used in JavaScript; you could now add a cancel Button or make it a little bit better looking with your own CSS code.

Keep in mind that I am also just a beginner, so imaximt could be that my way of solving these problems is not the best or that I use functions or features that aren't advised to use. Always ask questions and try to solve problems your way!