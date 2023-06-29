---
name: 'Carousel Component with Svelte'
slug: 'carousel-component-with-svelte'
tags: []
category: 'General'
status: 'publish'
description: "Let's create a Carousel Component with Svelte."
---

I'm in love! There I said it, and I'm not embarrassed whatsoever. Svelte is incredible, it's intuitive and fast, and it has all the things I want. That's why today we will build a carousel component with it. We'll look at CSS's `scroll-snap` property and how to make our component themeable via CSS variables.

[Demo](https://demos.maximmaeder.com/d/carousel-component-with-svelte/index.html).

Let's get right into it.

## Carousel Component Markup

Let us first go over the Markup of the Carousel Component.

The Markup consists of a div with a class called `container`, which we'll later use to align the left and right buttons and the actual content on one horizontal axis via flexbox. Inside the container, we have two buttons, one for scrolling left and one for scrolling right. We also have a div with a class called items-container which will hold all the items we want to scroll through. We have a slot with no name inside the things container, so all passed elements with no slot property will be put there. Within the button, we have named slots so another developer can easily change the buttons without editing the component itself.

```svelte
<div class="container">
    <button on:pointerdown={left} style="opacity: {scroll_left == 0 ? '0' : '1'}">
        <slot name="left_button">&lt;</slot>
    </button>
    <div
        class="items-container"
        bind:clientWidth={current_width}
        bind:this={container}
        on:scroll={scroll}>
        <slot></slot>
    </div>
    <button on:pointerdown={right} style="opacity: { (Math.abs((scroll_left + current_width) - scroll_width) < 3) ? '0' : '1' }">
        <slot name="right_button">&gt;</slot>
    </button>
</div>
```

As you see, we also set the opacity of the buttons depending on whether the scroll container has been scrolled all to the left or right. For this, we need to get the `scroll_left` property of the element and its width and scroll width (The total width of the element that may be hidden with a scroll bar).

Sadly we can't bind the `scroll_left` and `scroll_width` properties to the container element, so we have to create a function that will get that for us via a dom binding that is done with the `bind:this` attribute.

## Carousel Component JavaScript

Next up in the JavaScript or, better said, the TypeScript of our program, we only do a little. We create the necessary variables and the functions to scroll left and right. We also made a function to get the scroll left and scroll width of the container element.

These values and functions are set and called within the Markup of the component.

Mind the `scrolBy` function that, as its name suggests, allows us to scroll an overflowing element however we want.

```svelte
<script lang="ts">
    let current_width = 0;
    let container : HTMLElement;

    let scroll_left = 0
    let scroll_width = 0

    function left() {
        container.scrollBy(-current_width, 0)
    }
    function right() {
        container.scrollBy(current_width, 0)
    }
    function scroll() {
        scroll_left = container.scrollLeft; 
        scroll_width = container.scrollWidth;
    }
</script>
```

## Carousel Component CSS

I also have another mistress. Her name is a Tailwind, often when I spend time with my girlfriend CSS, I say stuff like `flex-col` instead of `flex-direction: column`. No, but really, I have used so much tailwind. Going back to regular CSS is almost painful, but let's try it anyway 😀. Also, it's always good to know and deeply understand the basics / underlying features.

So let's also look at the CSS.

As you see, we use CSS variables for the buttons and some other properties. This allows us to theme the component without editing the component itself. We can change the CSS variables, and the component will look different. It's also possible to pass a css variable as a prop in Svelte.

```svelte
<style>
    .container {
        display: flex;
        overflow: hidden;
        gap: var(--cr-container-gap, 0.5rem);
        justify-content: space-between;
        width: 100%;
    }

    button {
        color: var(--cr-button-color, #000);
        background-color: var(--cr-button-bg-color, white);
        border-color: var(--cr-button-border-color, white);
        border-width: var(--cr-button-border-width, 1px);
        border-radius: var(--cr-button-border-radius, 0.25rem);
        border-style: var(--cr-button-border-style, none);
        padding: var(--cr-button-padding, 1rem);
    }

    .items-container {
        display: flex;
        flex-grow: 1;
        overflow: auto;

        overflow-x: auto;
        scroll-snap-type: x mandatory;

        scroll-behavior: var(--cr-scroll-behavior, smooth);
        -webkit-overflow-scrolling: touch;
    }

    :global(.items-container > *) {
        scroll-snap-align: start;
        flex-shrink: 0;
    } 
    
    .items-container::-webkit-scrollbar {
        display: none;
    }
</style>
```

Also mind the `scroll-snap-type: x mandatory;` property. This property allows us to snap to the next element when scrolling. This is the property that makes the carousel work.

Since Svelte styles are scoped to just this component, we have to use the `:global()` selector to select the children of the items container.

## Carousel in action

Now let's see how we can use the carousel component. For this example, I have used [fakerjs](https://fakerjs.dev/guide/).

```svelte
<Carousel>
  {#each Array(10) as _, i}
    <div style="width: 100%">
      <img src={faker.image.avatar() } alt="" width="50">
      <h2>{ faker.person.fullName() }</h2>
      <p>{faker.lorem.paragraph()}</p>
      <p>@{ faker.company.name() }</p>
    </div>
  {/each}
</Carousel>
```

We can also apply our own styles to the component.

```svelte
<div class="custom_carousel">
  <Carousel --cr-button-bg-color="hsl(0 0% 95%)">
    {#each Array(10) as _, i}
      <div style="" class="item">
        <img src={faker.image.avatar() } alt="" width="100" style="flex-shrink: 0">
        <div>
          <h2>{ faker.person.fullName() }</h2>
          <p>{faker.lorem.paragraph()}</p>
          <p>@{ faker.company.name() }</p>
        </div>
      </div>
    {/each}
  </Carousel>
</div>

<style>

  * {
    box-sizing: border-box;
  }

  .item {
    font-family: monospace;
    width: 100%;
    display: flex;
    gap: 2rem;
    align-items: center;
    padding-inline: 4rem;
  }

  .custom_carousel {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
```

So that's it; I hope you had a good time and learned something new! Svelte is worth checking out, and I hope you will try it. If you have any questions or suggestions, feel free to [contact](https://maximmaeder.com/contact/) me.