---
name: 'Simple spreadsheet app with vue'
slug: 'simple-spreadsheet-app-with-vue'
tags: []
category: 'Project'
description: 'Learn how to make a simple spreadsheet app with the javascript framework vue. We will create it so you can reference other cells.'
---

In this tutorial, we will make a simple spreadsheet app consisting of a large empty table that we can fill with values. We can also use this syntax `=expression` to allow for more complex interactions, and we all make it so these fields can refer to other fields' values so that it will be a little bit like excl. I split this Tutorial into four parts; HTML, Javascript & CSS codes, and the program showcase, where you can try it out in an Iframe. We use the `js` framework [`vue.js`](https://vuejs.org/).

Let us get into making something extraordinary!

## HTML Code

So let us start with the HTML of the site. You can copy the Framework below.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

</body>

</html>
```

Now for vue.js to work, we have to integrate it somehow. We could create a project with it, but for now, we load it through a *Content Delivery Network (CDN)*. So we add the code below to our page's head.

```html
<!-- Add vue via cdn -->
<script  src="https://unpkg.com/vue@3"></script>
```

Our spreadsheet app will be bare, so we don't have any fancy UI, just the table. So we create a `div` and then in it the table. We give the `div` an id so we can later mount the vue app on it.

```html
<div  id="app">
	<table>
```

In the table, we start with the head, which will be the letters of the columns. We insert an empty header cell because the first column will consist of the row numbers. After that, we can use the `v-for="item in list"` directive to copy this element and all its children. Inside the element, we can also use the item or how ever we called it with curly brackets like this `{{ item }}`.

```html
   <thead class="sticky-top">
       <th></th>
       <th v-for="char in chars">{{char}}</th>
   </thead>
```

After setting up the top row, we start making the rows. We use the `v-for` directive again, but we do it this way `v-for="(item, index) in list"`. We do this to get the item's index and the item itself. This is like doing this in python. `for I, item in enumerate(list):`. Then we use this index for the first column of this row, which will also be a head because it will show the row number.

```html
<tr v-for="(layer, index) in cellsLayered">
    <!-- First cell, which is the index / row number -->
    <th class="sticky-left">{{index}}</th>
```

Continuing, we start another loop for the cells in this row, called layer in this example. We then make an `input` bound to the cell's value at `cell+index`. Later in the JS part, we learn why we do it this way.

```html
<!-- Display the cells -->
<td v-for="cell in layer">

	<!-- Insert input with v-model for binding -->
	<input v-model="cells[cell+index]" type="text">
```

Then we either show the value of the cell here, or we call the `evaluation()` function we make later to evaluate whatever is in the cell. We check with the `v-if` and `v-else` directives.

```html
	<!-- Insert either a div that shows the value or a div that evalates the value -->
    <div>
        <div v-if="!cells[cell+index].startsWith('=')">
            {{ cells[cell+index] }}
        </div>
        <div v-else class="eval">
            {{ evaluation(cells[cell+index]) }}
        </div>
    </div>
   </td>
  </tr>
 </table>
</div>
```

Now we have the HTML. Let us go over the JavaScript.

## JavaScript Code

Let us now add some functionality to our code with the js framework `vue.js`. We have already imported it in the head tag using a CDN.

So lets start by getting the `createApp` function from vue.
```javascript
const { createApp } = Vue
```

We continue by defining the letters the table has at the top row. In excl, after the `z`, it begins with `aa`, but we are just sticking with the alphabet.

```js
/* Define The list */
var chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
```

After that we define two variables. The cells Object will hold all the cells; the keys will look like this. `a0`, `b6` and `x10`. We also see this in excl. We also make a list called `cellsLayered` which will hold one list/array for each layer, so it is easier to draw as you saw in the HTML part.

```js
/* We are making this variables outside, but we will insert it into vue */
var cells = {}
var cellsLayered = []
```

Now we need to populate these variables with values. So we start a loop which happens 30 times. Inside it, we define a layer variable, which, as it says, will hold the current layer of cells. Then we also loop through the character we specified earlier. We fill the `cells` object with empty strings, which will be inserted into the HTML. Then we also push the character to the layer. After the character loop, we push the layer to the `cellLayered` list.

```js
for (let number = 0; number < 30; number++) {
    var layer = []

    chars.forEach(character => {
        cells[character + number] = ''
        layer.push(character)
    });

    cellsLayered.push(layer)
}
```

We insert some starting values at some positions.

```js
/* Some Starting Values */
cells['a0'] = '10'
cells['a1'] = '20'
cells['b2'] = '=30'
cells['b3'] = '=a0'
```

Now we can finally create the app. In its data function, we return some of the lists and objects we made, so they are available in the HTML.

```js
createApp({
    data() {
        return {
            chars: chars,
            cells: cells,
            cellsLayered: cellsLayered
        }
    },
```

Now we also define a custom method, the `evaluation()` we have used in the HTML. This will insert the values from other cells into this cell and evaluate the expression. We first remove the `=` from the string by slicing it. Then we loop over the keys of the cell's object and check if the key string appears in the cell string.

If that is the case, we replace this appearance with the evaluated value of the respective cell by splitting and joining the string. Calling the function recursively allows us to have references to cells that already have connections. After that, we try to evaluate the string, or we return the error code, so this appears in the cell.

```js
methods: {
   evaluation(string) {

       if (string.startsWith('=')) {	
			string = string.slice(1, string.length)	
		}


       Object.keys(cells).forEach(coord => {
           if (string.includes(coord)) {
               string = string.split(coord).join(this.evaluation(cells[coord]))
           }
       })

       try {
           return eval(string)
       } catch (error) {
           return error
       }
   }
}
}).mount('#app')
```

Don't forget to call the `mount(id)` function to assign the vue app to our div at the specified id.

Let us look at our app in action.

![enter image description here](https://maximmaeder.com/wp-content/uploads/2022/07/spreadsheet-1.gif)

It works! But it does not look nice. Let us style it with CSS!

## CSS Code

We insert the CSS code into the head of the file.

We simply start by removing the margin around the body, setting the font to any monospace type and setting everythings box sizing to `border-box`
```css
/* CSS Setup */
body {
	margin: 0
}

* {
    font-family: monospace !important;
    box-sizing: border-box;
}
```

After that, we remove the spacing between the table cells by setting `border-spacing`  to 0.

```css
/* Remove Spacing between cells */
table {
    border-spacing: 0;
}
```

We continue by giving the cells some styling. First, we select both types `td` and `th` but then apply some individual styling.

```css
/* Styling the Cells */
td,
th {
    min-width: 70px;
    min-height: 40px;
    padding: 0.2em;
    border-right: 1px solid rgb(209, 209, 209);
    border-bottom: 1px solid rgb(209, 209, 209);
}

th {
    background-color: rgb(229, 229, 229);
}

td {
    background-color: whitesmoke;
    padding: 1em;
    text-align: center;
    position: relative;
}
```

Now to the hard part. We want the input only visible when the user hovers over it or when he is writing and vice versa for the label, which shows the evaluated value of the cell. So we select both cases and ad `+div` add the end, which means *the first div after an input*. So this will hide the label in these cases.

```css
/* Toggle Input and Display */

/* Hide Label if input is focused or hovered */
td:hover input+div,
td input:focus+div {
    display: none
}
```

Styling the input and labels, setting them to full width and height, so they fill the cell.

```css
/* Expand input and label to full size of container */
td>input,
td div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 0px;
}
```

For the input to receive the hover from the mouse, we need to set `pointer-events` to none for the divs/labels which show the value.

```css
/* Make Label see through for mouse */
td>div {
    pointer-events: none;
}
```

Let us finish up the complicated part by setting the input to hidden by default and showing it as soon as its parent cell is hovered over or when it is in focus.

```css
/* Hide Input by default */
td input {
    visibility: hidden;
}

/* Show Input if focus or hover is true */
td:hover input,
td input:focus {
    visibility: visible;
}
```

Now for some custom classes. The eval class is just used for cells that are evaluated. The sticky-top and sticky-left do what they say. They stick to the top and left sides of the screen. We apply these to the headers of our tables so they are always visible.

```css
/* Classes */

/* Cells that are evaluated */
.eval {
    background-color: rgb(207, 255, 221)
}

/* Top Row */
.sticky-top {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
    box-shadow: 0 1px 3px rgb(180, 180, 180)
}

/* Left Column */
.sticky-left {
    position: sticky;
    left: 0;
    z-index: 98;
}
```

## Showcase

So that's it. Let us look at our little app.

![](https://maximmaeder.com/wp-content/uploads/2022/07/spreadsheet-2.gif)


embed
[simple spreadsheet app with vue (quuli.ch)](https://ai.quuli.ch/examples/)

## Conclusion

Excellent! You have successfully created a Simple spreadsheet app using HTML / CSS / Javascript and Vue.js! See how you can add more features to this program, such as functions like `sum` or saving and opening.

## Full Code

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>simple spreadsheet app with vue</title>

    <!-- Add vue via cdn -->
    <script src="https://unpkg.com/vue@3"></script>

    <style>
/* CSS Setup */
body {
    margin: 0
}

* {
    font-family: monospace !important;
    box-sizing: border-box;
}

/* Remove Spacing between cells */
table {
    border-spacing: 0;
}

/* Styling the Cells */
td,
th {
    min-width: 70px;
    min-height: 40px;
    padding: 0.2em;
    border-right: 1px solid rgb(209, 209, 209);
    border-bottom: 1px solid rgb(209, 209, 209);
}

th {
    background-color: rgb(229, 229, 229);
}

td {
    background-color: whitesmoke;
    padding: 1em;
    text-align: center;
    position: relative;
}


/* Toggle Input and Display */

/* Hide Label if input is focused or hovered */
td:hover input+div,
td input:focus+div {
    display: none
}

/* Expand input and label to full size of container */
td>input,
td div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 0px;
}

/* Make Label see through for mouse */
td>div {
    pointer-events: none;
}

/* Hide Input by default */
td input {
    visibility: hidden;
}

/* Show Input if focus or hover is true */
td:hover input,
td input:focus {
    visibility: visible;
    outline: none;
}


/* Classes */

/* Cells that are evaluated */
.eval {
    background-color: rgb(207, 255, 221)
}

/* Top Row */
.sticky-top {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
    box-shadow: 0 1px 3px rgb(180, 180, 180)
}

/* Left Column */
.sticky-left {
    position: sticky;
    left: 0;
    z-index: 98;
}
    </style>

</head>

<body>

    <div id="app">
        
        <table>
            <thead class="sticky-top">
                <th></th>
                <th v-for="char in chars">{{char}}</th>
            </thead>
            <tr v-for="(layer, index) in cellsLayered">

                <!-- First cell, which is the index / row number -->
                <th class="sticky-left">{{index}}</th>

                <!-- Display the cells -->
                <td v-for="cell in layer">

                    <!-- Insert input with v-model for binding -->
                    <input v-model="cells[cell+index]" type="text">

                    <!-- Insert either a div that shows the value or a div that evalates the value -->
                    <div>
                        <div v-if="!cells[cell+index].startsWith('=')">
                            {{ cells[cell+index] }}
                        </div>
                        <div v-else class="eval">
                            {{ evaluation(cells[cell+index]) }}
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <script>
        console.log(eval("1"))

        const { createApp } = Vue

        /* Define The list */
        var chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

        /* We are making this variables outside, but we will insert it into vue */
        var cells = {}
        var cellsLayered = []

        for (let number = 0; number < 30; number++) {
            var layer = []

            chars.forEach(character => {
                cells[character + number] = ''
                layer.push(character)
            });

            cellsLayered.push(layer)
        }

        /* Some Starting Values */
        cells['a0'] = '10'
        cells['a1'] = '20'
        cells['b2'] = '=30'
        cells['b3'] = '=a0'

        createApp({
            data() {
                return {
                    chars: chars,
                    cells: cells,
                    cellsLayered: cellsLayered
                }
            },
            methods: {
                evaluation(string) {

                    if (string.startsWith('=')) {
                        string = string.slice(1, string.length)
                    }


                    Object.keys(cells).forEach(coord => {
                        if (string.includes(coord)) {

                            string = string.split(coord).join(this.evaluation(cells[coord]))
                        }
                    })

                    try {
                        return eval(string)
                    } catch (error) {
                        return error
                    }
                }
            }
        }).mount('#app')
    </script>
</body>

</html>
```