---
name: "Conway's Game of Life with JavaScript"
slug: 'conways-game-of-life-with-javascript'
tags: []
category: 'Project'
description: "Let's implement Conway's Game of Life as an interactive Website using JavaScript, HTML and CSS."
---

In this Tutorial we will implement Conway's Game of Life as an interactive website using JavaScript, HTML and CSS. If you don't know what the game of life is you can read about it on [wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). In a nut shell, Conway's Game of Life is a Zero Player game where the player can set the state of tiles in a 2D grid plane to either dead or alive and then start a simulation. Every tick/frame each tiles survival or state will be set according to its neighbors, if it has 2 or less alive neighbors it will die of loneliness, if it has four or more it will die of overpopulation, lastly tiles will stay alive or even be born if they have three or two alive neighbors.

Below you see some examples on wikipedia of special formations that can be created with the rules of the game of life. There are even some crazy things like glider guns that create infinite gliders.

**Block**

![Block](https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Game_of_life_block_with_border.svg/99px-Game_of_life_block_with_border.svg.png)

**Blinker**

![Blinker](https://upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif)

**Glider**

![Glider](https://upload.wikimedia.org/wikipedia/commons/f/f2/Game_of_life_animated_glider.gif)

You'll find the Demo for the finished code [here](https://demos.maximmaeder.com/d/conways-game-of-life/).

So let's get started.

## Markup for the User Interface

Before we get into the difficult JavaScript of this program lets cover the HTML for this website. Keep in mind that I wont go over everything, I will simply explain the important bits.

In the head of our page we add the link to the CSS file and we also link to the JavaScript via a `script` tag that has the `defer` attribute that will make it so the script is executed after the HTML content has been parsed.

```html
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>
```

Continuing we add two `div`'s to the page: The first one holds the controls for the Website which mainly consists of buttons for running, stopping and resetting the simulation. We add Id's to all of these so we can get them easily later in the JS code. The second one holds the actual grid and we give it the class `playground`.

```html
<div class="controls">
    <div>
        <button id="run">Run</button>
        <button id="stop">Stop</button>
        <button id="reset">Reset</button>

        <input type="text" placeholder="FrameTime (250ms)" id="frametime">
    </div>

</div>
<div class="playground"></div>
```

## JavaScript for the Game of Life

Lets continue with the JavaScript for the Game of Life.

We simply start by defining a bunch of variables that will come in handy later. Some of them are needed to keep track of the state of the programme like `isRunning`.

```js
const playground = document.querySelector('.playground');
const runButton = document.querySelector('#run')
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')
const frametimeInput = document.querySelector('#frametime')
const controlsContainer = document.querySelector('.controls')

let isRunning = false;
let intervalId;

const rows = 50
const columns = 70

let gridData = []
let savedData;
```

After that we populate the `gridData` array with objects each representing a cell in our grid. For each cell we store `row`, `column` and `live`. Then we also set the `grid-template-columns` CSS property on the playground cell container so it will show the the cell positioned correctly.

```js
for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
        gridData.push({
            row: row,
            column: column,
            live: false,
        })
    }
}

playground.style.gridTemplateColumns = `repeat(${columns}, var(--size))`
```

### `renderCells` Function

Continuing we call the `renderCells` function that will as its name implies rerender all the reflecting their state according to the `gridData` Array. This function will be used often so lets go over it right now.

```js
renderCells(gridData)
```

The function starts by emptying the playground cell container via its `innerHTML` property. We then loop over the `gridData` Array and create a new div for each one. Depending on its `live` property we add a class with the same name. In case the simulation is not running we also add an event listener to this div. This listener enables the user to toggle the live property of the given cell.

```js
function renderCells() {
    playground.innerHTML = ''

    gridData.forEach(cellData => {
        const cellNode = document.createElement('div')

        cellNode.classList.add('cell')
        cellNode.classList.toggle('live', cellData.live)

        playground.appendChild(cellNode)

        if ( isRunning ) return
        cellNode.addEventListener('pointerdown', () => {
            cellData.live = !cellData.live;
            renderCells()
        })
    });
}
```

### Simulating the Game Of Life

Now lets get to the center of this whole programme. For this we add an event listener to the run button. It will set the `isRunning` variable to true so the user cant interact with the grid and we add the `is_running` class to the controls so we can apply some styling to them when the simulation is running. Now comes something important; In the Game of Life each tiles state is determined at the same time, so we have to keep that in mind in our code. Later we will cover the `simulateGeneration` function that does what is says. In JavaScript objects are passed by references and the only way to get fully rid of any and all connection we have to serialize the object and deserialize it with `JSON`.

```js
runButton.addEventListener('pointerdown', () => {
    isRunning = true;
    controlsContainer.classList.add('is_running')
    savedData = JSON.stringify(gridData)

    const simulateGeneration = () => {
        ...
    }
    simulateGeneration()

    const time = parseInt(frametimeInput.value) || 250

    intervalId = setInterval(simulateGeneration, time)
})
```

We then also run a `setInterval` with our function and we save its returned Id for later so we can also finish it.

Now let's go over the function that simulates a generation. Inside this function we need to use the JSON serialization trick to make an exact copy of the gridData variable. We then loop over each cell and find all its neighbors. Depending on that we set the state of this cell.

```js
const copiedGridData = JSON.parse(JSON.stringify(gridData))

/* Make a copy so the state is the same for all cells */
copiedGridData.forEach((copiedCell, index) => {

    cell = gridData.find(o => o.row == copiedCell.row && o.column == copiedCell.column)

    const adjacentCells = [
        /* Top and Bottom */
        copiedGridData.find(o => o.row == cell.row + 1 && o.column == cell.column)?.live ?? false,
        copiedGridData.find(o => o.row == cell.row - 1 && o.column == cell.column)?.live ?? false,

        /* Left and Right */
        copiedGridData.find(o => o.column == cell.column + 1 && o.row == cell.row)?.live ?? false,
        copiedGridData.find(o => o.column == cell.column - 1 && o.row == cell.row)?.live ?? false,

        /* Bottom Left and Right */
        copiedGridData.find(o => o.column == cell.column - 1 && o.row == cell.row + 1)?.live ?? false,
        copiedGridData.find(o => o.column == cell.column + 1 && o.row == cell.row + 1)?.live ?? false,

        /* Top Left and Right */
        copiedGridData.find(o => o.column == cell.column - 1 && o.row == cell.row - 1)?.live ?? false,
        copiedGridData.find(o => o.column == cell.column + 1 && o.row == cell.row - 1)?.live ?? false,
    ].filter(Boolean).length;


    if (adjacentCells == 3) {
        cell.live = true;
    }
    if (adjacentCells <= 1) {
        cell.live = false;
    }
    if (adjacentCells >= 4) {
        cell.live = false;
    }
})
```

### Other Control Code

Lastly we add two more event listeners that will handle stopping and resetting the simulation and grid data.

```js
stopButton.addEventListener('pointerdown', () => {
    console.log('Stopping Simulation ...');
    controlsContainer.classList.remove('is_running')

    clearInterval(intervalId);
    isRunning = false;

    gridData = JSON.parse(savedData)

    renderCells();
})

resetButton.addEventListener('pointerdown', () => {
    gridData.map(o => o.live = false);
    renderCells()
})
```

## Styling it with CSS

Lastly lets also go over the CSS of our little Website. We start by importing a custom font with the `@font-face` media rule. We can now use the name `pixel` for the font-family property of any element.

```css
@font-face {
    font-family: pixel;
    src: url(font/pixel.ttf);
}
```

Next up we set the `color-scheme` property of the root element to `dark` which will make it so the default styling of element like scrollbar's or input is dark instead of light.

```css
:root {
    color-scheme: dark;
}
```

Lastly we style the playground and the cells for the playground we make use of css variables so we can avoid having to change code at different places when we want to change one thing. Also mind that we use hsl for color values since its mor obvious what color will render and we can easier make shades of colors.

```css
.playground {
    overflow: auto;
    padding: 1rem;
    flex-grow: 1;
    --size: 20px;
    display: grid;
    grid-template-columns: repeat(15, var(--size));
    grid-auto-rows: var(--size);
    gap: calc(var(--size) / 10);
}

.cell {
    background-color: hsl(0, 0%, 23%);
    color: hsl(0, 0%, 30%);
    text-align: center;
    font-size: 0.3rem;
    padding:0.1rem;
}

.cell.live {
    background-color: hsl(0, 0%, 50%);
}
```

## Conclusion

So thats it, I know its a lot and you may have some things that you don't understand. I just hope that now have another Idea for a cool program that you can make. Always keep in mind that I am no pro myself just a programming enthusiast 😁.