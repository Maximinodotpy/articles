---
name: 'How to set up and configure the Tailwindcss Framework.'
slug: 'how-to-set-up-and-configure-the-tailwind-framework'
tags: []
category: 'General'
description: 'Tailwind is pretty awesome; with this CSS Framework, one can write utility classes like `p-4` or `cursor-pointer`, and thanks to its bundler, it will only give you the classes you have used'
---

Tailwind is pretty awesome; with this CSS Framework, one can write utility classes like `p-4` or `cursor-pointer`, and thanks to its bundler, it will only give you the classes you have used. So today, we will go over how to set up and configure tailwind for your project.

## Installation and Setup of Tailwind

**Install Tailwind with `NPM`**
`npm install -D tailwindcss`

**Create `tailwind.config.js`**
`npx tailwindcss init`
This file is used for all configurations that have to do with tailwind.

**Set Glob Pattern**
Set the [glob pattern](https://en.wikipedia.org/wiki/Glob_%28programming%29) for files that should be searched for utility classes. If you open the tailwind config file that we have just created, this would be the `content` property,  that we can set to a list of glob pattern strings. For now, say it should search for any files within the `src` folder and its subfolders that end with `.html` or `.js`.
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
    },
  },
  plugins: [],
}
```

**Add  Tailwind Directives to CSS file**
Next, we need to add the following three lines of code to our main CSS file.
```sass
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Run CLI Tool**
Next, we need to run the following command so the tailwindcss CLI tool will parse the HTML and js files and put the minified CSS into the `output.css` file. As you see here, we define an input file that is the same as the one where we added the tailwind directives and an output path.
```
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

If we are especially lazy ( yes, we are ), we can add this command to the scripts object of our `package.json` so we can run it by saying `npm run tailwind`.

```json
{
  "scripts": {
    "tailwind": "npx tailwindcss -i ./src/style.css -o ./src/output.css --watch"
  },
  "devDependencies": {
    "tailwindcss": "^3.2.4"
  }
}
```

**Add the output file to the HTML and start writing.**
Lastly, we add the CSS output file to the HTML where we use utility classes, and we can start writing some tailwind code!
```html
<link  rel="stylesheet"  href="output.css">
```



## Configuration  ( Extending Tailwinds Default Theme )

By default, tailwind provides us with colors, spacing, font sizes, and other values, but we can do more. Tailwind allows us to set new theme variables or extend the existing ones, which is done in the config file. Below you see how one would add colors to the framework within the `extend` object. You can directly supply a color value or give it another object representing suffixes so that we can make shades for our colors.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'myColor': 'hsl(200, 100%, 50%)',
        'myColorWithShades': {
          100: 'hsl(0, 100%, 50%)',
          200: 'hsl(0, 50%, 50%)',
        },
      },
    },
  },
  plugins: [],
}
```

These values will then be available anywhere colors are used; if you use VS Code and can't keep track of these colors, you can install the [Tailwind extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) which will help us with the utility classes and even show us the colors we added.

![f](https://maximmaeder.com/wp-content/uploads/2022/12/Screenshot-2022-12-22-135416-jpg.webp)

## But why?

Why not just write regular CSS? There are three reasons to use something like tailwind and not plain CSS or a component bases framework like Bootstrap.

1. **Enforcing a Design System**: Tailwind helps you maintain a consistent look without restricting you too strongly in your choices, as it will only give you a limited palette of colors, spacings, and so on.
2. **Less CSS:** With tailwindcss, you have to write way less CSS, which is good since CSS can get unmaintainable rather quickly.
3. The Tailwind CLI Tool will only put classes into the output file that was used, so you ship the least amount of CSS. 


If you are not convinced, I advise you to install tailwind for yourself and try it out ... it is fantastic!
