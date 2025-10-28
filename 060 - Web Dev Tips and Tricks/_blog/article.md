---
name: Web Dev Tips and Tricks
slug: web-dev-tips-and-tricks
category: General
status: draft
description: 
---

## Using CSS Mix-Blend-Mode to remove white backgrounds from images

When working with images on the web, you might encounter situations where you want to remove a white background without using image editing software. One effective way to achieve this is by using the CSS `mix-blend-mode` property.

For this to work you will have to set a background color on the immediate parent container of the image. Then you can apply the `mix-blend-mode` property to the image itself. Multiply will make it so the lightness level of the image is multiplied by the lightness level of the background color, effectively removing white areas. Here is an example:

```html
<div class="imageContainer">
    <img src="https://placehold.co/1080x720/FFFFFF/000000?text=TEST&font=lato" alt="Image with white background">
</div>
```

```css
.imageContainer {
    background-color: pink;
}

img {
    mix-blend-mode: multiply;
}
```

[JSFiddle Example](https://jsfiddle.net/jrmq0bsg/)


## Making <br/> optional

When the text content comes from a CMS or other external source, you may not have control over where line breaks are placed. In these cases, you can use CSS to make `<br/>` tags optional based on the screen size. For example, you might want to hide line breaks on smaller screens to improve readability, while keeping them on larger screens.

```css
br {
    display: none;
}

@media (min-width: 768px) {
    br {
        display: block;
    }
}
```


## Obscure CSS Properties

- [`hyphens: auto;`](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens) - This property allows text to be hyphenated automatically based on the language and available hyphenation points. It can improve readability in justified text blocks. It can be combined with [`hyphenate-limit-chars`](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphenate-limit-chars) to control the minimum number of characters before and after a hyphenation point.