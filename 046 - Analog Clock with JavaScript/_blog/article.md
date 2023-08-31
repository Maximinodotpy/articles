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

```js
const clockNode = document.getElementById('clock')
const svgNode = document.querySelector('svg')
const handsContainer = document.getElementById('hands')
```

## `addHand` Function

g as a Pivot


## ___ in Action



## Conclusion



Visit the [Demo]().