---
name: Analog Clock with JavaScript
slug: analog-clock-with-javascript
tags:
  - SVG
  - JavaScript
  - CSS
  - Web API's
category: Webdevelopment
status: draft
description: Let's create a Analog Clock by utilizing the Power of Scalable
  Vector Graphics and JavaScript.
---

<!--
Notes:
- HTML Structure
- CSS Styling
	- Fill
	- Stroke
	- Max -Width and Height
- JavaScript
	- Setup 
	- Add Hand Function
	- Render Function 
		- Animation Callback: https://maximmaeder.com/animations-with-javascript/#why-do-we-use-requestanimationframe
- Add Other Articles where i used SVG -> New SVG Tag
-->

Today we are going to once again use the Power of Scalable Vector Graphics (SVG) to build something awesome: A analog clock. By analog I simply mean Watch with hands if that makes sense.

The clock will look like this.

![](https://i.imgur.com/S9g2hvb.png)


## HTML for the Analog Clock

Let's start by going over the Markup for our little Website, as you see we mostly have the HTML Boilerplate, we just add a script and link tag to your JavaScript and CSS files. We also create an SVG with a view box of `-50 -50 100 100` which means elements placed at 0 0 will be in the middle, like the two circles we add within our SVG.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clock</title>

    <script defer src="clock.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <svg viewBox="-50 -50 100 100">
        <circle cx="0" cy="0" r="49.5" class="clock" id="clock"></circle>
        <circle cx="0" cy="0" r="2" class="clock-joint" id="clock"></circle>
    </svg>
</body>
</html>
```

## CSS for the Analog Clock

Next lets go over the CSS. We start by simply settings `box-sizing` to `border-box` to every element,  this makes working with padding and margin a lot easier.

```css
* {
    box-sizing: border-box;
}
```


Then we make it so the Body has no margin, a little bit of padding and that it is as as the Viewport.

```css
body {
    height: 100vh;
    margin: 0;
    padding: 2rem;
    background-color: hsl(0, 0%, 13%);
}
```

After that we make it so the SVG which will be the clock cant be wider or higher than the Screen but we want it to grow as much as possible. To also center it we can add `margin: auto`.

```css
.clock {
    box-shadow: 0 0 5px hsl(0, 0%, 0%);
    stroke: hsl(0, 0%, 30%);
    fill: hsl(0, 0%, 20%);
}
```

Lastly we set the Fill and stroke colors for the circles. Stroke is like the Border and Fill is the Background Color.

```css
.clock {
    stroke: hsl(0, 0%, 30%);
    fill: hsl(0, 0%, 20%);
}

.clock-joint {
    fill: hsl(0, 0%, 90%);
}
```

## JavaScript for the Analog Clock

In the JavaScript file we start by getting References for several DOM Nodes that we will need later.

```js
const clockNode = document.getElementById('clock')
const svgNode = document.querySelector('svg')
const handsContainer = document.getElementById('hands')
```

Continuing we create the lines that run along the edge of the clock that are the seconds, minutes and hours. To do this we use the `addHand` function that we go over later.

```js
const numTimes = 60
for (i = 0; i < numTimes; i++) {
    const handRotationOffset = 360 / numTimes

    if ((i % 15 == 0 || i == 0) && numTimes != i + 1) {
        console.log('15er');
	        addHand({ rotation: i * handRotationOffset, color: 'hsl(0, 0%, 80%)', width: 15 })
    } else if (i % 5 == 0 && numTimes != i + 1) {
        console.log('5er');
        addHand({ rotation: i * handRotationOffset, color: 'hsl(0, 0%, 40%)', width: 12 })
    }
    else {
        addHand({ rotation: i * handRotationOffset, color: 'hsl(0, 0%, 30%)' })
    }
}
```


After that we also create the actual hands that indicate the seconds, minutes and hours. We save these for later.

```js
const secondHand = addHand({ color: 'hsl(0, 0%, 90%)', width: 40, x: 0, height: 1 })
const minuteHand = addHand({ color: 'hsl(0, 0%, 90%)', width: 25, x: 0, height: 1.5 })
const hourHand = addHand({ color: 'hsl(0, 0%, 90%)', width: 15, x: 0, height: 2 })
```

Lastly we create a function called render which will check the time and adjust the hands appropriately. We use the `requestAnimationFrame` function for rerendering the clock automatically but also for [Performance](https://maximmaeder.com/animations-with-javascript/#why-do-we-use-requestanimationframe).

```js
render()
function render() {
    const time = new Date()

    const secondsDegrees = (time.getSeconds() * 6) + 90;
    const minutesDegrees = (time.getMinutes() * 6) - 90;
    const hoursDegrees = (time.getHours() * 30) - 90;
    
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`

    requestAnimationFrame(render)
}
```
## `addHand` Function

Below you also see the Implementation of the Add Hand. As you see we use the `g` as a pivot to rotate the rect to the correct Position.

```js
function addHand({ width = 10, height = 1.5, x = 35, rotation = 0, color = 'black' } = {}) {
    const handNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    const handNodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')

    handNode.setAttribute('width', width)
    handNode.setAttribute('height', height)
    handNode.setAttribute('x', x)
    handNode.setAttribute('fill', color)

    handNodeGroup.style.transform = `rotate(${rotation - 90}deg)`
    handNodeGroup.style.transformOrigin = `0px ${height / 2}px`
    handNodeGroup.style.translate = `0px -${height / 2}px`

    handNodeGroup.appendChild(handNode)

    svgNode.appendChild(handNodeGroup)

    return handNodeGroup
}
```

## Conclusion

So that's it I hope you had a good time and that you learned something!

Visit the [Demo](https://demos.maximmaeder.com/d/analog-clock-with-javascript).