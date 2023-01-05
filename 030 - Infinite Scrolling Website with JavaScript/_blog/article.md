# Infinite Scrolling Website with JavaScript

Learn how to make an infinitely scrolling website with JavaScript, HTML, and CSS.

## Idea

In this Tutorial, I will teach you how to make an infinite-scrolling website via the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) in JavaScript. Our website will show random pictures of cats, so we will also learn how to fetch JSON from an [API](https://thecatapi.com/). Lastly, we add a little loading animation that plays while the image is being loaded to indicate to the user that more content is coming.

Visit the [Demo](https://demos.maximmaeder.com/demo/catstragam/) to understand better what we are about to do. Below you also see it.

![Showcase Video of Catstagram](showcase.gif)

## Markup

Let's start with the Markup of our little website. In the head, we need to add our script and link tag to the corresponding files. Mind the [defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer) attribute added to the script tag, as its content should only be evaluated when the HTML has fully loaded. This way, we don't have to add scripts to the bottom of the page.

```html
<script src="script.js" defer></script>
<link rel="stylesheet" href="style.css">
```

Next up, we need to add a div to our body to hold the Images / Items of our Timeline. It will be 4 column grid. We will also make it so some of the pictures span two rows in case they are really high.

```html
<div class="pictures"></div>
```

## JavaScript

Let's get to the script part of this Tutorial. We start by defining some variables that will aid us later. To ensure that there are no duplicate images, we will also keep track of their ID's.

```js
const url = 'https://api.thecatapi.com/v1/images/search'
const container = document.querySelector('.pictures')

const ids = [];
```

Continuing we setup our Intersection Observer. Its constructor receives a callback function and an Options Object.

```js
const observer = new IntersectionObserver(observerCallback, {
    threshold: 1,
    rootMargin: '500px'
})
```

Later we go over the callback and what it does, now lets talk about the two keys in the options object.

- `threshold`: The Callback is invoked everytime an observed element enters or exits the container, and with this attribute we tell it how much of it has to be visible to be triggered. 1 means it has to be fully visible.
- `rootMargin`: Define an invisible margin outside (or inside) the container that is also considered as *inside*, eventhough it is not actually visible. ( This also means the `threshold` attribute does not really show any effect in this case, I just added it so you see it. )

Now the observer wont to anything because have to define elements that are observed and for this we create the first image in the container with `addPicture()`. We later look at this function. Then we add the last child of the container to the observe via its `observe(element)` method.

```js
addPicture()
observer.observe(container.lastChild)
```

### Observer Callback

Lets go over the Callback function for the Observer. It will always receive a list of elements that either exited or entered the container. We get the first element of that list and we check if its `isIntersecting` property is true. If thats the case we add another picture. After that we unobserve this element via the `unobserve(element)` method. Lastly we once again add the last element in the container to the observed elements.

```js
function observerCallback(entries) {
    if (entries[0].isIntersecting) {
        addPicture()
    }
    observer.unobserve(entries[0].target)
    observer.observe(container.lastChild)
}
```

Now what this does is essentially only ever watch the last picture and if it is visible we know the user has scrolled too far down, and we have to add another picture. This new picture will be the next observed element since it is the last. Convinently newly created elements also trigger the observer eventhough they were never outside the container.
    
### `addPicture` Function

Now how does this `addPicture` function work? Firstly the function is created with the `async` keyword so it can await results from the fetch request and we dont have to use `.then()`. Then inside the function we start by creating a wrapper link element that will hold the image and the image itself. We also add the wrapper to the container now rather than later because the image may take longer to load.

```js
async function addPicture() {

    const wrapper = document.createElement('a')
    wrapper.target = '_blank'
    
    const imgNode = document.createElement('img')
    
    wrapper.appendChild(imgNode)
    container.appendChild(wrapper)

    ...
}
```

Continuing we get an image and some metadata about it with the `getPicture` function, that I will explain in a few moments. And we set the wrapper link and img source to the url of the returned object.

```js
let cat = await getPicture()
    
wrapper.href = cat.url
imgNode.src = cat.url
```

Lastly we also check the height and width of the image, and in case their ratio is lower than 0.8 we set the `style.gridRow` attribute to `span 2` which will make it take up two rows of the grid.

```js
const ratio = cat.width / cat.height
if (ratio < 0.8) {
    wrapper.style.gridRow = 'span 2'
}
```

### `getPicture` Function

Now for getting the picture we use the `fetch` function and the url we defined above. You can go to the url manually in your browser to see what it returns is json. We then also need to parse this json with the `json` method. Now in case the id in the json object is already in the list of ids we throw an error. If not we push the current id to the id list and we return the json for the cat image. In case any error happened it will go to the catch block and return the `getPicture` function, which means that it will try to get a picture everytime it does not succed. This may not be the best approach but it works for now.

```js
async function getPicture() {
    try {
        let r = await fetch(url)
        let j = (await r.json())[0]
        if (ids.includes(j.id)) {
            throw new Error('Image Already Loaded')
        }
        ids.push(j.id)
        return j


    } catch (error) {
        return getPicture()
    }
}
```

## Styling

Lets also style our website a bit. I will only go over the grid and the animation.

For the container we set its display to grid, and importantly we also set the grid-auto-rows property to 200px this means we dont define how many rows there we rather say every row regardless of how many there are should be this high.

```css
.pictures {
    display: grid;
    height: 100%;
    grid-template-columns: repeat( 2, 1fr );
    grid-auto-rows: 200px;
    gap: 20px;
}
```

Now for the individual images, we set object-fit to cover so the image will fill its whole container but dont overflow. For the animation we then give it a gradient background and we resize its background so it is 6 times wider than normally. lastly we add an animation to it.

```css
.pictures img {
    transition: all 0.2s ease-in-out;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 0 2px hsl(0, 0%, 70%);

    background: linear-gradient(90deg, hsl(0, 0%, 30%), hsl(0, 0%, 50%), hsl(0, 0%, 30%));
    background-size: 600% 100%;
    animation: gradient 1s ease infinite;
    animation-direction: alternate;
}
```

This is animation is then defined with the `@keyframes` rule. where we simply edit the background-position property.

```css
@keyframes gradient {
    0% {background-position: 0%}
    100% {background-position: 100%}
}
```

## Conclusion

We made it, website that shows a bunch of cats that get more if you scroll down. I hope that my explaination is of some use for you. Also keep in mind that I am a beginner too, so always look for better ways to solve these problems.

Look at the [Source Code](https://github.com/Maximinodotpy/articles).

Visit the [Demo](https://demos.maximmaeder.com/demo/catstragam/).