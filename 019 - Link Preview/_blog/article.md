---
name: 'Link Previews with JavaScript and PHP'
slug: 'link-previews-with-javascript-and-php'
tags: []
category: 'Utility'
description: 'In this short Tutorial we will make it so the links of our page show a little preview window panel that shows the title and description of the linked page.'
---

On Wikipedia, its links are a little bit different than on other Pages, if you hover over one it displays a short description and an image of the page that this link leads to and today we will try to do this ourselves with JavaScript and a little bit of PHP. Just keep in mind this will be a quick and dirty solution to the problem you could work it out work consistently. The PHP part will be just one file with one function so we simply go over it in the JavaScript part.

Let us get into it.

## JavaScript

Let's start with the JavaScript of the program. We start by looping over all link elements by using `document.querySelectorAll`, `Array.from`, and `forEach`. inside the callback, the rest of the program happens. It's important that the callback is an async function because later we will use `fetch` to get the data.

```js
Array.from(document.querySelectorAll('a')).forEach(async el => {
	...
})
```

Firstly we call a PHP file with the fetch function called `script.php` with a query called `url`.

```js
let response = await fetch(`script.php?url=${el.href}`);
```

The PHP file simply gets the contents of the URL as you see below and it echos them so JavaScript can read them later.

```php
<?php
echo file_get_contents($_GET['url']);
```

Continuing we get the response text with the `text` method and we use regex to find the title and description content of the returned HTML. If this info is not available we simply set `No Title` or for a empty string.

```js
let html = await response.text();

title = html.match(/<title.*?>(?<t>.*?)<\/title>/s)?.groups.t ?? 'No Title';
description = html.match(/<meta name="description" content="(?<d>.*?)".*?>/s)?.groups.d ?? '';
```

Then we finally create a div that will hold this information, we set a class for the link element and we insert the content we just got. Lastly, we add this element to the link.

```js
panel = document.createElement('div');

el.className = 'linkPreviewWrapper';

panel.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
`

el.appendChild(panel);
```

## CSS

Below you find the CSS code where it is important that we set the position attributes correctly so the panel will show below the link. We also add a little gradient so i look better.

```css
.linkPreviewWrapper {
    position: relative;
}

.linkPreviewWrapper > div {
    width: 250px;
    max-height: 200px;
    box-shadow: 0 0 10px rgb(0,0,0,0.3);
    position: absolute;
    color: black;
    padding: 1em;
    overflow-y: hidden;
    left: 0;
    top: 100%;
    display: none;
    background: linear-gradient(0deg, rgb(228, 228, 228) 0%, rgba(0,0,0,0) 100%);
    background-color: white;
    z-index: 999;
}

.linkPreviewWrapper:hover h3 {
    margin-top: 0;
    font-weight: normal;
}

.linkPreviewWrapper:hover > * {
    display: block;
}
```


## Showcase

In the Links below you can find a live demo of the Project and the source code on GitHub.

[Visit the Demonstration](https://articles.maximmaeder.com/a/Link%20Previews/)
[Look at the Code](https://github.com/Maximinodotpy/articles/tree/main/article%2019%20-%20Link%20Preview)

## Conclusion

Keep in mind that I am also just a beginner, so it could be that my way of solving these problems is not the best or that I use functions or features that aren't advised to use. Always ask questions and try to solve problems your way!