---
name: 'Animations with JavaScript'
slug: 'animations-with-javascript '
tags: ['JavaScript', 'Typescript', 'Animations']
category: 'Utility'
description: "Let's"
status: 'draft'
---

<!--
- Anime JS Library
- Animation API
- && that returns the first falsy value or last value
- || that returns the first truthy value or last value
- `requestAnimationFrame` and Layout Shift -> https://blog.openreplay.com/how-browser-rendering-works-and-why-you-should-care/
- static Methods / Properties
- Typescript Callback Types
-->

In this relatively short Tutorial, we will make a JavaScript Function / Class that helps us to animate our Website! We'll use Typescript and JavaScript Classes with static properties.

We will not only Learn about Animations but also a little bit about Browser Rendering and Typescript Callback Typing.

Let's get into it!

## Animate Function

To make our function(s) look fancy we'll encapsulate them in a class called `Animations`, Below you see the rough outline of our class. It simply consist of four static Methods. Static just means we dont have to make an instance of this class and we can just call `Animations.animate()` in our code.

```typescript
class Animations {
    static linear() { /* ... */ }
    static quad() { /* ... */ }
    static circ() { /* ... */ }

    static animate() { /* ... */ }
}
```

These first three Methods are simply used for timing. In [CSS Transisions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) there are several functions that determine how the Animation Progress is calculated, and these are essentially the same. For new only go over the `animate` function, you can view the full code on [Github](https://github.com/Maximinodotpy/articles).

The Animate Function takes four Arguments: the animation duration, the progress callback, the timing function, and lastly the end/after callback.

The callback will receive the progress of the animation as a float, where `0` means no progress and `1` one means finished. As you see with typescript we can type a callback like this `(arguments with their types) => return type`. We do something similar for the after calllback but we dont need arguments there. Lastly the timing function is by default `linear`.

```typescript
static animate(
    duration: number,
    callback: (progress: number) => void,
    timingFunction = Animations.linear,
    after_callback?: () => void
) {
    /* Magic */
}
```

Within the function we start by getting the current time with `Date.now()` that returns the current time in Milliseconds since January 1, 1970 UTC. After that we also find out the time that the animation should end by adding the start to the duration.

```typescript
const start = Date.now()
const end = start + duration
```

Continuing we create a function called cb that will be called multiple times during the animation. Skipping the function for now we call the `requestAnimationFrame` function with `cb` as a callback. Later we will learn why we use this instead of something like `setInterval`. 

```typescript
function cb() {
    /* Magic */
}

requestAnimationFrame(cb)
```

Within this callback we start by once again getting the current time and with this information we calculate the progress of the animation. We also put this value throught the given timing function so more intresting progress values can be returned. then we call the given callback with this value so other programmers can do their thing.

```ts
const timePassed = end - Date.now()
let timeFraction = 1 - (timePassed / duration)
timeFraction = timingFunction(timeFraction)
timeFraction = timeFraction || 1
timeFraction = Math.min(timeFraction, 1)

callback(timeFraction)

if (Date.now() < end) {
    requestAnimationFrame(cb)
} else {
    after_callback && after_callback()
}
```

Lastly we check if the animation is finished according to the current time and the end time and if thats the case we once again call the `requestAnimationFrame` function and if not we simply call the after callback function if its defined.

### Why do we use `requestAnimationFrame`?

Now I have talked a lot about the `requestAnimationFrame` function but what does it actually do. For this we have to learn how Browser (re)render web pages.

[This](https://blog.openreplay.com/how-browser-rendering-works-and-why-you-should-care/) article goes into detail but the gist is that when we make changes via JavaScript the Browser goes through several steps to rerender the webpage. Depending on what we did it has to go through more or less steps.

When we for example change the `left` css property on an element a layout change has to be recalculated and this can take a rather long time. If we put the code that triggers this in a callback called by `requestAnimationFrame` it's changes will be part of the next Frame either way so we dont trigger unnessecary recalculations.

## Using the `animate` function

## Conclusion

