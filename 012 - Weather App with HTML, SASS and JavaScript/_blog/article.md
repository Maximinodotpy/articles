---
name: 'Weather App with HTML, SASS, and JavaScript'
slug: 'weather-app-with-html-sass-and-javascript'
tags: []
category: 'Project'
description: 'Learn how to make a Simple App showing Temperatures for the next seven days. We learn about SVG and API fetching.'
---

Before we get into it, I want to stress that I am no JavaScript Pro; therefore, it may be that my practices are not the best or even the worst. Feel free to contact me in any way and tell me better ways to do things!

Today we will make a little Website that shows us the hourly temperatures in the next seven days for a certain choosable city. We will make the graph ourselves using the power of SVG. We get the data from the [Open Meteo API](https://open-meteo.com) ([Licence](https://creativecommons.org/licenses/by-nc/4.0/)). Before we get into coding, we look at how SVG will help us and what kind of data the API returns.

[Live Demo](%5BWeather%20App%20%28maximmaeder.com%29%5D%28http://weather-app.maximmaeder.com/)

### SVG

Scalable Vector Graphics are fantastic. They look good in all sizes and can easily be made programmatically because they are HTML tags. Below you see a simple SVG tag that will show a polygon. We will use this tag for our graph and `line` and `text`. In the program, we add the points.

```SVG
<svg height="210"  width="500">
	<polygon points="200,10 250,190 160,210"/>
</svg>
```

### API

We will request the hourly temperatures in the next seven days from the weather temperatures. We request an URL that looks something like this. The coordinates will be inserted.

```
https://api.open-meteo.com/v1/forecast?latitude=30.0&longitude=30.0&hourly=temperature_2m
```

Such a request will return a JSON string with the information we need.

```json
{
    "latitude": 30.0,
    "longitude": 30.0,
    "generationtime_ms": 1.3890266418457031,
    "utc_offset_seconds": 0,
    "elevation": 137.0,
    "hourly_units": {
        "time": "iso8601",
        "temperature_2m": "°C"
    },
    "hourly": {
        "time": [
            "2022-08-03T00:00",
            "2022-08-03T01:00",
            "2022-08-03T02:00",
            ...
        ],
        "temperature_2m": [
            24.7,
            24.3,
            23.9,
            ...
        ]
    }
}
```

Let's get into coding!

## HTML

Let us start with the HTML of our website. As always, we use the default scaffolding that can be expanded in VS-code with the [emmet abbreviation](https://code.visualstudio.com/docs/editor/emmet) `!`.

In the head, we import our stylesheet.

```css
<link  rel="stylesheet"  href="style.css">
```

In our body, we have two `div` elements and the script tag for the js of the website. The first div holds the header and the `select` element for the choosable cities, and the other contains the SVG and the link to the API.

```html
<div class="header-container">
     <div class="header">
         ...
     </div>
 </div>

 <div class="container graph-container">
     <svg height="400" id="graph-svg">
		...
     </svg>

     <div>
         <a href="https://open-meteo.com" target="_blank">Weather Data Provided By Open-Meteo</a>
     </div>
 </div>

 <script src="app.js"></script>
```

Inside the header, we set an `h1` and a `select` element. Each option represents a location; therefore, we give each of them a custom `data-lon` and `data-lat` attribute, which are the coordinates of the given area. We later access these attributes in the JS code.

```html
	<h1>Weather App</h1>

    <div>
        <span>Choose Location: </span>
        <select name="" class="countrySelect">
            <option value="Berlin" selected data-lat="52.5235" data-lon="13.4115">Berlin</option>
            <option value="Paris" data-lat="48.8567" data-lon="2.3510">Paris</option>
            <option value="London" data-lat="51.5002" data-lon="-0.1262">London</option>
            <option value="Madrid" data-lat="40.4167" data-lon="-3.7033">Madrid</option>
			...
        </select>
     </div>
```

Inside the `svg` element, we first make a gradient texture that can be later used in visible SVG elements. Then we add two SVG groups with the element `g`. The first one holds all the labels and the second one the graph itself. We will insert the other SVG that's through the JS code.

```html
<defs>
  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#5591c2  ;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#5591c2  ;stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:rgba(44, 44, 44, 0);stop-opacity:0" />
  </linearGradient>
</defs>

<g class="lables"></g>
<g class="data"></g>
```

Now we add the functionalities with JavaScript!

## JavaScript

Let's get to the JS of the Program. We must remember that we must redraw the graph every time the window resizes or when the user changes the location.

### Setup

Let's setup up some variables. The first one `currentData` acts just as a cache, so we don't have to get the data each time the window resizes. The following three constants are used for the styling of the graph and the labels. We need to add a little padding to the left inside the SVG element because our temperature scale will be there. We also exaggerate the temperatures, so they have a more apparent difference. And we also define how far apart each step on the temperature scale is.

```js
let currentData = {}

const paddingLeftGraph = 60
const height_exxagaration = 7
const LabelStepsY = 5
```

After that, we save some of the needed elements in variables. For this we use `querySelector` and `getElementById`. continuing, we get the dimensions of the SVG element minus the padding; this is important so the graph will span the full width of the container. Last but not least, we define a step multiplier. This value will be used in tandem with the width.

The API will always return `168` Datapoints, but it may be that the SVG is 500 Pixels wide, and we want each of the Datapoints evenly spread out in these 500 Pixels. These last three variables will always be overwritten when the window size changes.

```js
const dataContainer = document.querySelector('.data')
const lableContainer = document.querySelector('.lables')
const citySelect = document.querySelector('.countrySelect')
const svgElement = document.getElementById('graph-svg')

let container_width = svgElement.getBoundingClientRect().width - paddingLeftGraph
let container_height = svgElement.getBoundingClientRect().height
let step_multiplier = container_width / 168
```

### Functions

Let us go over the function used on our website.

The first one is pretty simple. It will just fetch a provided URL and return the parsed json.

```js
async function request(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
```

The next one is also simple as it will just set the new width and step multiplier and redraw the data and labels as soon as the window size changes.

```js
function setSize() {
    let size = svgElement.getBoundingClientRect()

    container_width = size.width - paddingLeftGraph
    step_multiplier = container_width / 168

    DrawData()
    drawLables()
}
```

The `getWeekDay` function will return the name of the weekday from a given date.

```js
function getWeekDay(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}
```

The `changeLocation` function will first get the option element where the value is the same as the select itself. This returned element has the `data-lon` and `data-lat` attributes which we will get from it using `getAttribute()`. After that we build the request string where insert these coordinates and we call the `request()` function. As soon as the request is finished we set the `currentData` variable to the returned data and we redraw the graph with `DrawData()`

```js
function changeLocation() {

    let currentCityEl = citySelect.querySelector(`[value="${citySelect.value}"]`)

    let lat = currentCityEl.getAttribute('data-lat')
    let lon = currentCityEl.getAttribute('data-lon')

    let requestString = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`

    request(requestString).then((data) => {
        currentData = data
        DrawData(currentData)
    })

}
```

Now let us get to the `DrawData()` function. We start by making a string in which we build a `polygon` element. The thing about SVG polygons is that they always have to be closed, that is why we insert the positions of the start and end. We also add a placeholder `INSERT_POINTS` which will later be replaced with the points of the temperatures. When making the start and end point we take the padding into account.

Then we define three variables one will hold the concatenated string of all the points and the other hold the hourly temperatures we got from the request. The last one will be the x index position.

Then we loop over the hourly temperatures and we add the temperature and index to the points. We have to keep in mind the step multiplier and that the coordinates in a polygon start at the top left of the SVG element. Last but not least we insert the points string we just made into the string we made in the first place and we set it to be the inner HTML of the `dataContainer` which is a group in our SVG.

```js
function DrawData() {
    let poly = `<polygon fill="url(#gradient)" points="${paddingLeftGraph},${container_height} INSERT_POINTS ${container_width + paddingLeftGraph},${container_height}"></polygon>`
    let positions = ''

    const temps = currentData.hourly.temperature_2m

    let index = 0
    temps.forEach(temperature => {
        positions = positions + ` ${index * step_multiplier + paddingLeftGraph},${container_height - temperature * height_exxagaration}`

        index++
    })

    poly = poly.replace('INSERT_POINTS', positions)

    dataContainer.innerHTML = poly
}
```

Let's all so go over the `drawLables` function. We do it pretty similar here, we build a string of `text` and `line` elements and we set them to be the inner HTML of the `lableContainer`. We make a loop where we count by our `LabelStepsY` variable. We do this for the X and Y axis. For the horizontal axis, we insert the weekdays but we set today and tomorrow.

```js
function drawLables() {

    let verticalLinesString = ''
    for (let index = 0; index < 50; index += LabelStepsY) {
        let height = container_height - index * height_exxagaration
        verticalLinesString = verticalLinesString + `<line x1="0" y1="${height}" x2="1000" y2="${height}" class="line" /><text x="0" y="${height}">${index} °C</text>`
    }

    let dayIndex = 0
    for (let index = 0; index < 169; index += 24) {

        let daytext
        if (dayIndex == 0) {
            daytext = 'Today'
        }
        else if (dayIndex == 1) {
            daytext = 'Tomorrow'
        }
        else {
            var date = new Date();
            date.setDate(date.getDate() + dayIndex);

            daytext = getWeekDay(date)
        }

        let width = index * step_multiplier + paddingLeftGraph
        verticalLinesString = verticalLinesString + `<line x1="${width}" y1="50" x2="${width}" y2="1000" class="line"/><text x="${width}" y="${container_height - 5}">${daytext}</text>`

        dayIndex++
    }

    lableContainer.innerHTML = verticalLinesString
}
```

### Connecting Events

After making the functions we connect the change event from the selection to the `changeLocation` function and the resize event from the document to `setSize`. Last but not least we call `changeLocation` and `drawLables` so the graph is drawn for the firs time after the page loads.

```js
citySelect.addEventListener('change', changeLocation)
window.addEventListener('resize', setSize, false);

changeLocation()
drawLables()
```

## CSS / SASS

Our Web App will now work but it won't look good, so let's add some styling to it!

In the sass file, we first add four variables that hold the color palette and we define a `mixin` which is a reusable component that we can later include anywhere with `@include container`.

```sass
$color: #3e6b8f
$bg: rgb(65, 65, 65)
$lines: rgb(90, 90, 90)
$text: #f3f3f3

@mixin container()
    max-width: 900px
    margin: 0 auto
    padding: 1em
```

After that, we style the body by setting the font and color. We also make a class `container` that solely consists of the mixin.

```sass
body
    box-sizing: border-box
    font-family: 'Segoe UI', sans-serif
    margin: 0
    background-color: $bg
    color: $text


.container
    @include container
```

Then we make the header, where we also use the mixin

```sass
.header-container

    background-color: $color
    border-bottom: 6px solid darken($color, 5)

    .header
        @include container
        padding: 1em
        display: flex
        justify-content: space-between
        align-items: center

    h1
        margin: 0
```

continuing we style the SVG to be full width and we set the outline color of the lines with the `stroke` property and the color of the text with `fill`. Last but not least we style the link and we use the lighten function that will as its name suggests lighten the color by the amount given as a second argument.

```sass
.graph-container
    margin-top: 1em

    svg
        width: 100%

        .line
            stroke: $lines

        text
            fill: $text

a
    color: lighten($color, 20)
    text-decoration: none
    padding: 0.5em
    display: block
    text-align: center
```

## Showcase

Below you see the Website in action.

![Waether App in action](https://maximmaeder.com/wp-content/uploads/2022/08/weatherheihg.gif)

[Weather App (maximmaeder.com)](http://weather-app.maximmaeder.com/)
[GitHub](https://github.com/Maximinodotpy/articles/tree/main/article%2012%20-%20Weather%20App%20with%20HTML%2C%20SASS%20and%20JavaScript)


## Conclusion

Excellent! You have successfully created a Weather using Web Technologies! See how you can add more features to this program, such as rain prediction or custom locations.

Keep in mind that I am also just a beginner, so it could be that my way of solving these problems is not the best or that I use functions or features that aren't advised. Always ask questions and try to solve problems your way!

## Attribution
[Open Meteo](https://open-meteo.com)
[Licence](https://creativecommons.org/licenses/by-nc/4.0/)