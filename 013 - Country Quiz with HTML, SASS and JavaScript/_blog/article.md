---
name: 'Country Quiz with HTML, SASS, and JavaScript.'
slug: 'country-quiz-with-html-sass-and-javascript'
description: 'Learn how to make a country quiz with HTML javascript and the CSS Pre-Processor SASS'
---

## Idea

In this Tutorial, we will make a Country Quiz  Website with HTML, SASS, and JavaScript. We will make it so the user sees a country silhouette and they have to choose from 4 Countries, where one is the right one. You can download the SVG images of the Countries from the [Repository](https://github.com/Maximinodotpy/articles/tree/main/article%2013%20-%20Country%20Quiz%20with%20HTML,%20SASS%20and%20JavaScript), you find them in the `output` folder.

[Demo](https://country-quiz.maximmaeder.com/)
[Github Repo](https://github.com/Maximinodotpy/articles/tree/main/article%2013%20-%20Country%20Quiz%20with%20HTML,%20SASS%20and%20JavaScript)

Let us get coding.

## HTML

Let us start with the HTML of the Page. In the Head of the HTML, we simply set a title and we include the style sheet.

```html
<title>Country Quiz</title>

<link rel="stylesheet" href="style.css">
```

Then in the Body, we wrap all our content inside a div with the `container` class. Inside it, we have one div with the class `country` that will hold the picture of the current country and another div with the class `UI` that will hold the buttons for the quiz. In the end, we also link the JavaScript File to our Page.

```html
<div class="container">

    <div class="country">
        <img src="output/Argentina.svg">
    </div>

    <div class="ui">
	    ...
    </div>
</div>

<script src="app.js"></script>
```

Inside the div with the `ui` class  we simply add a Header and some buttons in a group that will be the possible countries. We will make it dynamic so you can add any amount of buttons in this group and our program will still work. We also add a button that skips to the next question and we provide a link to the source of the images, namely [GADM](https://gadm.org/).

```html
<div>
    <h1>What Country Is It?</h1>

    <div class="btn-group">
        <button class="button">A</button>
        <button class="button">B</button>
        <button class="button">C</button>
        <button class="button">D</button>
    </div>
    
    <div>
        <br>
        <button class="continue">Continue</button>
    </div>
</div>

<div>
    <br>
    Data Provided By 
    <a href="https://gadm.org/">GADM</a>.
</div>
```

That is it for the HTML of the Page.

## JavaScript

### Setup

Now let us come to the JS of the Page. We first define an Array that holds the names of all countries that could occur. It is important that each string is also the name of an image in our collection of countries. In my case, I stored them in a folder called `outputs`.

This is just a small part of all the countries.

```js
const countries = ['Afghanistan', 'Angola', ...]
```

After that, we define some more variables. We start by copying the list we just made into another variable. We do this because every time a country from the array is used we delete it but as soon as this list dries out we refill it with the starting list. We also define a variable that reflects the current right country and a variable that holds the current selectable countries.

```js
/* Shallow copy */
let countryPool = [...countries]

let currentCountry = '';
let currentPool
```

Continuing we find out how many buttons are in the button group and we also save that information for later usage. We also define a temporary variable that is not of much importance as it also could be defined later.

```js
const amountButtons = document.querySelector('.btn-group').children.length

/* The Random Index will be stored here so that, only temporary*/
let randomCountryIndex
```

### `Next()` Function

Now let us get to the main function of our Quiz, which will skip on to the next question. In it, we start by defining the `currentPool` to an empty array, because here we store the countries that are currently selectable. Then we use a function called `randomChoiceIndex(list)` to get a random index inside a given array, we later go over its functionality. We save this random index so we can then get the item located at this index and delete it. Lastly, we push this randomly chosen country into our current Pool.

```js
function next() {
    currentPool = []

    /* Get random element from the countries list and remove it*/
    randomCountryIndex = randomChoiceIndex(countryPool)
    currentCountry = countryPool[randomCountryIndex]
    countryPool.splice(randomCountryIndex, 1)
    currentPool.push(currentCountry)

	...
}
```

Then we set the attribute of the image to be the path to our current country. We use `querySelector` and `setAttribute`.

```js
    /* Show the searched country in the img tag, by setting the source attribute*/
    document.querySelector('img').setAttribute('src', `output/${currentCountry}.svg`)
```

Then we start a loop that will from on to the number of buttons and it will add another country from the array and add to the pool.

```js
    /* Add three random and distinct countries to the current pool */
    for (let i = 0; i < amountButtons - 1; i++) {
        let randomCountryIndex = randomChoiceIndex(countryPool)

        let tempcountry = countryPool[randomCountryIndex]
        countryPool.splice(randomCountryIndex, 1)
        currentPool.push(tempcountry)
    }
```

Then we use another self-made function to shuffle the current pool in place.

```js
    /* Shuffle List in Place */
    shuffleArray(currentPool)
```

Continuing we loop over each of the buttons, we set the inner HTML and the background color. After that, we remove the event listener for the click event from this element and we add it immediately back again, essentially resetting the event listener.

```js
    let i = 0
    document.querySelectorAll('.button').forEach(el => {

        el.innerHTML = currentPool[i]
        el.style.backgroundColor = '#e0e0e0'

        /* Reset Event Listeners */
        el.removeEventListener('click', clicked)
        el.addEventListener('click', clicked)

        i++
    })
```

Last but not least we check if the country Pool length does not succeed  10. If that is the case we fill the Array once again.

```js
    /* Fill the Country Pool as soon it does not meet a certain threshold */
    if (countryPool.length < 10) {
        countryPool = [...countries]
    }
```

### Other Helper functions

Let us go over some helper functions, starting with the function that returns a random index from a given list. Keep in mind that `Math.random()` will return a random number between 0 and 1. `Math.floor()` will snap the given number to the lower integer so 5.2 will turn to 5. 

```js
function randomChoiceIndex(list) {
    return Math.floor(Math.random() * list.length)
}
```

The `shuffleArray()` function will also utilize this same algorithm and it will then reassign the item at the given index.

```js
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
```

Then we also make a function that is connected to the buttons. In it, we first save the clicked element. Then we color the background to be red. After that, we loop over the buttons and if the inner HTML is the same as the current country, we color it to be green. We also remove the event listener from the object.

```js
function clicked(el) {

    /* Get the clicked element */
    let clickedEl = el.path[0];
    
    /* Color the pressed Button with Red */
    /* If the right button was pressed this will be overwritten*/
    clickedEl.style.backgroundColor = '#ffcea4'
    
    /* Color the right Button with Green */
    document.querySelectorAll('.button').forEach(ele => {
        if (ele.innerHTML == currentCountry) {
            ele.style.backgroundColor = '#a4ffaa'
        };

        /* Remove event listener for each Button */
        ele.removeEventListener('click', clicked)
    })
}
```

### Wrapping Up

In the end, we connect the continue button to the next function and we call it for the first time.

```js
/* Connect Continue Button */
document.querySelector('.continue').addEventListener('click', next)

/* Start the Quiz */
next()
```

## SASS / CSS

Below you also see the SASS of the page.

variables.

```sass
$color: #53a2e2
$uiBG: rgb(85, 85, 85)
$uiCountry: rgb(71, 71, 71)

$paddingSmall: 0.5em
$paddingLarge: 2em

$breakpoint: 800px
```

style declarations.

```sass
body
    margin: 0
    font-family: Georgia, 'Times New Roman', Times, serif


.container
    display: flex
    flex-direction: column
    height: 100vh

    @media screen and (min-width: $breakpoint)
        flex-direction: row-reverse


    .country
        flex-grow: 1
        overflow: auto
        padding: $paddingSmall
        background-color: $uiCountry

        display: flex
        align-content: center

        img
            filter: invert(1)
            width: 100%
            margin: auto

    .ui
        padding: $paddingSmall
        background-color: $uiBG
        color: $color
        text-align: center

        display: flex
        flex-direction: column
        justify-content: space-between

        h1
            margin-top: 0

        .btn-group
            display: grid
            grid-template-columns: 1fr 1fr
            gap: 10px

            @media screen and (min-width: $breakpoint)
                grid-template-columns: 1fr
                

        button
            border: none
            padding: 1em

            &:hover
                background-color: lighten($color, 10)
                cursor: pointer

        @media screen and (min-width: $breakpoint)
            width: clamp(200px, 20%, 350px)
            padding: $paddingLarge
    
        a
            color: $color
```

## Conclusion

Excellent! You have successfully created a Country Quiz using JavaScript code! See how you can add more features to this program such as a points system.

Keep in mind that I am also just a beginner, so it could be that my way of solving these problems is not the best or that I use functions or features that aren't advised to use. Always ask questions and try to solve problems your way!