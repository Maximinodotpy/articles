---
name: 'File Explorer with Vue.js'
description: "let's make a small JSON-based File Explorer with vue.js, Learn about methods, computed properties, and other awesome things you can do with vue."
---

## Idea

In this Tutorial, we will utilize the JavaScript Framework [Vue.js](https://vuejs.org/) to make a small dummy file explorer, where we can add, rename and delete files and folders via buttons. We will make it so we can enter folders via their content and for the files, we make their text content editable. This program served the purpose of learning Vue for me and it could very well be that I do something not the best way so keep that in mind. To keep it simple we won't use components and we will not use a build step.

We first go over the HTML of the page and then we will cover the JavaScript and CSS. Below you see a GIF showcasing the Explorer. you can also visit the Live Demo.

![enter image description here](https://maximmaeder.com/wp-content/uploads/2022/10/explorer.gif)
[Visit the Demonstration](https://articles.maximmaeder.com/a/File%20Explorer/)

## HTML

Below you can see the scaffolding of the HTML Page. We need to import the style sheet and the JavaScript of Vue.js via a Content Delivery System. We also include our `index.js` file at the end of the body with the *type* attribute set to *"module"*. The `div` with `id="vueapp"` will host our vue application.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Explorer</title>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="vueapp" class="container">
		<!-- Here Goes the App Code -->
    </div>
    <script src="index.js" type="module"></script>
</body>

</html>
```

Let's also go over all the HTML code inside the App. The first element will be the header where the buttons are. The *"Back"* button will as its name suggests, go one folder up so it should be disabled if we are in the root directory. We can set the `disabled` property dynamically in vue by prefixing it with a colon (`:`), in the value, we can insert any expression, in this case, we disable the button in case the path variable is `''`. We also add and click event handler that will call a function called `goUp`, we also do this for the *"Add Folder"*, *"Add File"*, and *"Delete"* buttons. These functions will be later defined in the JavaScript file. For the Delete button, we also disable it in case there is no item selected, we do this with computed property, which will also be defined later.

```html
<header>
    <button @click="goUp()" :disabled="path == ''">Back</button>
    <input type="text" v-model="path" placeholder="Path">


    <button class="btn-flat" @click="addFolder()">Add Folder</button>
    <button class="btn-flat" @click="addFile()">Add File</button>
    <button class="btn-flat" @click="deleteItem()" :disabled="focusedItemExists">Delete</button>
</header>
```

Then we also need to show the current file tree layer and we do this in a table. Inside the `tbody` we add a `v-for` loop that duplicates the row element for each item in the current tree. The `getTree()` function will be used often, it simply returns a list representing the current file Tree according to the path. Anyway, in vue for loop, we can get the key if we do it this way `(item, key) in list` so we do that. In the same element, we toggle a class depending on its key and the current state. The `current` variable will hold the key to the currently focused element. We add a click handler that sets `current` to `key` and we also add a double click handler with a function that receives the `key` and `item` from the loop. 

In the first cell Insert the value of the type attribute of the item and in the second cell, we insert an input that receives the key as the value. We connect this input element with a change event where we call the `nameChangeRequest` with the event and key as arguments. We cant use `v-model` here because the key is actually a key in a dictionary so we can't simply connect it, we later see what this entails exactly.

```html
<main>
    <table>
        <thead>
            <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Size</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, key) in getTree()" :class="{current: key == current}" @click="current=key"
                @dblclick="openAction(key, item)">

                <td>{{ item.type }}</td>
                <td>
                    <input type="text" :value="key" @change="ev => nameChangeRequest(ev, key)">
                </td>
                <td>
                    {{JSON.stringify(item.content).length}} Bytes
                </td>
            </tr>
        </tbody>
    </table>
</main>
```

Lastly, we add a div at the end that will be only rendered if the type of the current item is file. If that's the case it will show the file name and a textarea that shows the content of the file and makes it editable.

```html
<div v-if="getTree()[current]?.type == 'file'">
    <h2>Edit File <i>{{ current }}</i></h2>
    <textarea v-model="getTree()[current].content"></textarea>
</div>
```

## JavaScript ( Vue.js )

Let's get to the JavaScript of the Program. I have split this Part into three parts. Below you see the scaffolding for the App. We use the `createApp()` function of the the Vue global object. We supply all the options of our app as an object. Let us go over the different keys of this object.

The Data function should return all the globally available data (also an object). The Methods object holds all custom functions that are also globally available. Computed is similar in the sense that its caching is better. Watch is used to watch keys of the global data attribute. Lastly, with the Mounted hook, we can do things as soon as the app is started.

```js
const app = Vue.createApp({
    data() {
        ...
    },
    methods: {
	    ...
    },
    computed: {
        ...
    },
    watch: {
        ...
    },
    mounted() {
        ...
    }
})


// We also need to mount the app on an HTML Element.

app.mount('#vueapp')
```

### Data

Let's also quickly go over the global data. That path key holds a path like this `this/is/a/path`. `current` holds the key of the current file. Lastly `tree` will hold the actual file structure, Each file/folder is another key with a type and content. For folders, the content is another object and for files, it's simply a string.

```js
{
	path: '',
	current: 'Hello.txt',
	tree: {
	    'Hello.txt': {
	        type: 'file',
	        content: 'Hello How Are You'
	    },
	    'Folder': {
	        type: 'folder',
	        content: {}
    },
}
```

### Methods

Let's quickly go over all the custom Methods.


`getTree()` will be used often it simply returns the object of the current path by reducing the path variable.

```js
getTree() {
    if (this.path == '') return this.tree

    try {
        return this.path.split('/').reduce((pre, current) => {
            return pre[current].content
        }, this.tree)
    } catch (err) {
        return undefined
    }
},
```

`addFolder` and `addFile` are pretty similar. They add a file or folder in the current tree.

```js
addFolder() {
    const currentTree = this.getTree()
    
    currentTree['New Folder'] = {
        type: 'folder',
        content: {}
    }
},

addFile() {
    const currentTree = this.getTree()
    
    currentTree['New File'] = {
        type: 'file',
        content: ''
    }
},
```

`openAction` will open a folder by adding its name to the path variable.

```js
openAction: function (name, item) {

    if (item.type === 'folder') {
        this.path += this.path == '' ? name : '/' + name
    }
},
```

`deleteItem` is pretty obvious, and `nameChangeRequest` will handle the change of a file name. This is a little complicated because its a key not a value.

```js
deleteItem() {
    const currentTree = this.getTree()

    delete currentTree[this.current]

    this.current = ''
},

nameChangeRequest(ev, ogKey) {            
    this.getTree()[ev.target.value] = this.getTree()[ogKey]

    delete this.getTree()[ogKey]

    this.current = ev.target.value

    ev.target.blur();
}
```

### Computed, Watch, and Mounted

Inside Computed we have a function that simply checks if the focused item is in the current directory.

```js
focusedItemExists() {
    return !Object.keys(this.getTree()).includes(this.current)
}
```

Then we also watch the tree variable for any changes and we handle them by storing the tree in the localstorage.

```js
tree: {
    handler(newValue, oldValue) {
        localStorage.setItem('vue-explorer', JSON.stringify(this.tree))
    },
    deep: true,
}
```

Lastly, inside the mounted function, we check if there is any data in the local storage and if there is we set the tree to this value so the tree survives page reloads.

```js
const cachedTree = localStorage.getItem('vue-explorer')

if (cachedTree) {
    this.tree = JSON.parse(cachedTree)
}
```

That's it for the JavaScript of the program.

## CSS

Below you can also see the CSS, which I won't explain further right now.

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    background-color: hsl(200, 50%, 3%);
    color: hsl(200, 50%, 80%);
}

* {
    box-sizing: border-box;
}

.current {
    background-color: hsla(221, 100%, 84%, 0.2);
}

table {
    border-collapse: collapse;
    width: 100%;
}

thead th {
    text-align: left;
}

td,
th {
    padding: 0.5rem;
    user-select: none;
}

input,
button,
textarea {
    font: inherit;
    color: inherit;
    background-color: inherit;
    border: none;
    height: 100%;
}

button:disabled {
    opacity: 0.5;
}

button:hover {
    cursor: pointer;
}

.btn:hover {
    background-color: hsl(200, 50%, 23%);
}

table input {
    border: none;
    background-color: transparent;
}

textarea {
    width: 100%;
    height: 200px;
    resize: none;
}

#vueapp {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

main {
    flex-grow: 1;
    overflow-y: auto;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
}

header {
    height: 40px;
    display: flex;
    margin-top: 3rem;
    margin-bottom: 2rem;
}

header input {
    flex-grow: 1;
    font-style: italic;
}
```

## Showcase

![Showcase of the Vue File Explorer](https://maximmaeder.com/wp-content/uploads/2022/10/explorer.gif)

[Visit the Demonstration](https://articles.maximmaeder.com/a/File%20Explorer/)
[Look at the Code](https://github.com/Maximinodotpy/articles/tree/main/article%2023%20-%20File%20Explorer%20with%20Vue.js)

## Conclusion

Excellent! You have successfully created a File Explorer using Vue.js code! See how you can add more features to this program such as different file types or drag and drop.

Keep in mind that I am also just a beginner, so it could be that my way of solving these problems is not the best or that I use functions or features that aren't advised to use. Always ask questions and try to solve problems your way!