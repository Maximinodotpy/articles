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
	- Overflow
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

Let's start by going over the Markup for our little Website, as you see we mostly have the HTML Boilerplate, we just add a script and link tag to your JavaScript and CSS files. We also create an SVG with a view box of `-50 -50 100 100` which means elements placed at 0 0 will be in the middle, like the two circle we add within our SVG.

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

Next lets go over the 


## JavaScript for the Analog Clock


## ___ in Action



## Conclusion



Visit the [Demo]().