---
name: 'DOM Creation Function with JavaScript'
slug: 'dom-creation-function-with-javascript'
tags: []
category: 'Utility'
description: "Let's make a function that makes it easy for us to create DOM and get references to certain elements."
---



In this Tutorial, we will make a function that will make it easy for us to create nested elements in JavaScript. It also receives attributes we want to add to the element, some of which have a special meaning. We also make it so the function returns all elements created inside it with `id`, `idx`, or `classx` inside an object so we can edit them later. We also make it, so events are added as an event listener rather than an attribute and enable boolean event property checking; we later see what this means exactly.

## JavaScript for Creating DOM

This whole program is housed inside a function called `e`. This function will use three arguments: `tagName`, `children`, and `attributes`. The first is mandatory, and the second can either be a string or a list of `e` return values. The last one is an object which will be added to the element as an element attribute; some of these attributes do something special.

```js
function e(tagName, children = '', attributes = {}) {
	...
}
```

### Setup: Attribute Types

Inside the function, we start by defining an *enums* that holds all the possible Attribute Types; we do this with an object that is frozen via `Object.freeze` and the `Symbol` Function. The Symbol function returns a unique object, so when compared to anything, it will only evaluate to true when compared to itself. The second variable holds an object with duplicate keys from the enum, but the values are regular expressions that can be used to determine the type of a given attribute. 

Lastly, we also make an object that will hold the eventual return value. It will at least hold an `element` property, but it may also contain any reference made deeper down the DOM.

```js
const AttrTypes = Object.freeze({
    Event: Symbol('Event'),
    Id: Symbol('Id'),
    Idx: Symbol('Idx'),
    Class: Symbol('Class'),
    Classx: Symbol('Classx'),
    Normal: Symbol('Normal'),
})

const AttrTypesRegularExpressions = {
    Event: /on[^:]*(:.*)?/g,
    Id: /^id$/g,
    Idx: /^idx$/g,
    Class: /^class$/g,
    Classx: /^classx$/g,
    Normal: /.*/g,
}

const returnObject = {
    element: null,
};
```

### Creating the Current Element

We then continue by creating the element itself. For that, we need the first argument that was passed, and we first split it by dots `.` because we want to make it so the user can specify a class right after the tag name, we have to look out for that here. The resulting array should at least contain one element, the actual tag name and an unrestricted amount of class names that should be added.

```js
const tagNameParts = tagName.split('.')

const element = document.createElement(tagNameParts[0])
returnObject.element = element;

let extraClasses = tagNameParts.slice(1)
if (extraClasses.length != 0) element.classList.add(...extraClasses)
```

### Adding attributes to the Element

After that, we need to add the attributes to the element. The code for this is housed inside another function.

```js
// Add Attributes
addAttributes(attributes)
```

Inside the function we loop over all the attributes, which is as we recall an object so we have to use `Object.keys(o)` to loop over the keys of the attributes which are in our case the attribute names. Inside the Loop we immediately save the value of the given key to a variable and we use another function to get the attribute type of the given attribute name, this function will return one of those symbols that we have defined in the begining.

```js
function addAttributes(attributes) {
	for (const attrName of Object.keys(attributes)) {
	    const attrValue = attributes[attrName]
	    
        const attrType = getAttributeType(attrName);
	}
}
```

With this information we can then use a switch to react to each attribute in the right way. For  *Normal* attributes we simply add them to the element with `setAttribute`,  but we first transform the attribute name from Camel Case to Hyphens. We do the same thing for attributes of type *Id* but we dont add break after its case code, this way the next case is also executed,  which is *Idx*. Inside there we add the element to the Return Object where the key is the *Id* / *Idx* value. We do this so this element is also returned in the end so we have a reference to it.

For *Classx* we also add it to the Return Object, but once again we dont add an break so the next case is also evaluated, which is *Class* where we check if the given value is a string or a list, so we add the classes in the right way. 

So this means *Id* , *Idx* and *Classx* are being added to the return values.

```js
switch (attrType) {
	case AttrTypes.Normal:
	    element.setAttribute(camelCaseToHyphens(attrName), attrValue);
	    break;

	case AttrTypes.Id:
	    element.setAttribute(camelCaseToHyphens(attrName), attrValue);
	case AttrTypes.Idx:
	    returnObject[attrValue] = element
	    break;

	case AttrTypes.Classx:
	    returnObject[attrValue] = element

	case AttrTypes.Class:
	    const classes = typeof attrValue == 'string' ? [attrValue, ] : attrValue
	    element.classList.add(...classes);
	    break

	...
}
```

Lastly for the events we first want the programmer to be able to do something like this: `onclick:ctrlKey`, where the callback function is only called if the control key property on the event object was true. To do this we first split the attribute name by `:`, then we need to further dissect the event name so it can be used in `addEventListener()`. Inside the event listener callback we check if there is an event modifier and if there is we only call the function if its true on the event object. If there is no event modifier we simply want to call the callback function. In both cases we also pass it the element as a second argument.

```js
	case AttrTypes.Event:
	    const eventNameParts = attrName.split(':')

	    const eventName = eventNameParts[0].slice(2, attrName.length).toLowerCase()
	    const eventModifier = eventNameParts[1] || ''

	    element.addEventListener(eventName, (event) => {
	        if (eventModifier) {
	            if (event[eventModifier]) attrValue(event, element)
	        } else attrValue(event, element)
	    })
	    break;
```

### Adding Children to the Element

Lets also go over the function that add children to the element. Here we also do something import with the return object of potential children. Also dont forget to return the returnObject after that function call.

```js
// Add Children, depending on their type
addChildren(children)

return returnObject
```

So the function will first check if the type of the children argument is `string` or `object` ( Array ). In case it is a string we simply set it as the `innerHTML` of the element, but if it is an Object / Array we loop over its items and we add the `element` attribute of each to the current element. This means we use the `e` inside the children list. We then also check the return object of the child for any other reference that should be passed up the chain of elements so we can add them to the current returnObject.

```js
function addChildren(children) {
    switch (typeof children) {
        case 'string':
            element.innerHTML = children;
            break;
        case 'object':
            for (const child of children) {
                element.appendChild(child.element);

                // Search For References and add them to the returnObject
                for (const attrKey of Object.keys(child)) {
                    if (attrKey == 'element') continue

                    returnObject[attrKey] = child[attrKey];
                }
            }
            break;
    }
}
```

### `getAttributeType()` Function

Let's quickly go over the `getAttributeType()` function that is used to determine how an attribute is handled. Here we loop over the keys of the Object that holds the regular expressions for the different types. If the attribute name matches the expression, we return the symbol at the given location.

```js
function getAttributeType(attributeName) {
    for (const attrTypeName of Object.keys(AttrTypesRegularExpressions)) {
        const expression = AttrTypesRegularExpressions[attrTypeName]

        if (!!attributeName.match(expression)) return AttrTypes[attrTypeName]
    }        
}
```

### `camelCaseToHyphens()` Function

The `camelCaseToHyphens()` function uses a Regular Expression, the `replace()` function, and the `toLowerCase()` method to transform something like this: `attributeName` to this: `attribute-name`

```js
function camelCaseToHyphens(string) {
    return string.replace(/([A-Z])/gm, '-$1').toLowerCase();
}
```

## Usage

Ok, now that we have the function, how do we use it exactly? It's as easy as calling the `e` function and passing it the right arguments. as you see, the first argument is always a tag name and optionally a class(es). They are nested inside each other, and the elements inside will be available on the `r` variable if they have the `id`, `idx`, or `classx` attributes.

```js
const r = e('div', [
    e('h1', 'Title'),
    e('button.mainBtn', 'Cool Button', { id: 'buttonNode', 'onclick:ctrlKey': runSomething }),
    e('button', 'Cool Button CTRL', { idx: 'buttonNodeCtrl', class: ['coolButton', 'fasdölk']}),
]);

document.body.appendChild(r.element);
```

[Look at the Code](https://github.com/Maximinodotpy/articles/tree/main/article%2027%20-%20JavaScript%20Markup%20Function)

## Conclusion

Excellent! You have successfully programmed a Function to create DOM Elements easily!

Keep in mind that I am also just a beginner, so it could be that my way of solving these problems is not the best or that I use functions or features that aren't advised to use. Always ask questions and try to solve problems your way!