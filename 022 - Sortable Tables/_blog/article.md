# Sortable Table with JavaScript
**Learn how to make sortable tables with JavaScript. We utilize the map and filter methods of Arrays.**

## Idea
In this Tutorial, we will make a sortable table with JavaScript. We will make it so we can have any number of tables on our page and set them to be sortable and we will differentiate between numbers and strings. We will also make it that so when the user clicks the head once it sorts ascending and if they click again it will sort in descending order. We will make use of functions like `map` and `filter`.

## JavaScript

Before we get into the JavaScript part of this Tutorial I want to explain the crude structure of the program. Also, keep in mind that I am no pro whatsoever so there might be easier ways to do this.

In essence, we will add an event listener for each table head column for each table and in the click callback, we get the data rows as a list of objects and then we sort them by the column values. Lastly, we reinsert the rows in this ordered fashion.

Let's look at how this looks in practice. So this trick works for multiple tables we start by looping over every table that has the `data-sortable` attribute. Then we save the table body and column head elements to two variables respectively. We then loop over each column head and we add an event listener for the `pointerdown` event to them. In each loop, we supply a second parameter `i` which will be the index of the current element.

```js
for (const table of document.querySelectorAll('[data-sortable]')) {
    const tbody = table.querySelector('tbody');
    let columnHeads = Array.from(table.querySelectorAll('thead tr th, thead tr td'))


    columnHeads.forEach((columnHead, i) => {

        columnHead.addEventListener('pointerdown', () => {
            ...
        })
    })
}
```

The rest of the Code will happen inside the callback of the event listener. So inside there we start by getting the value of the `data-sortable-state` attribute of the column header. Then we do something a little bit complicated but bear with me. We get each row of the table and then we loop over this array with the `map` method that creates a new array. We then get the cell value at the given index so below the column header. We then transform this value to a float in case it could be one. Lastly, we return an object with the element itself and the value. This new list is stored in the `organisedData` variable.

```js
// Get current state (asc, desc or none)
const state = columnHead.getAttribute('data-sortable-state')

// Loop over each row and save value of cell with corresponding column name
const rows = Array.from(table.querySelectorAll('tbody tr'));
let organisedData = rows.map((ele) => {
    let value = ele.querySelectorAll('td')[i].innerHTML

    // If the value is a valid number it should save the float value
    if (!isNaN(value)) value = parseFloat(value)

    return {
        element: ele,
        'value': value
    }
})
```

Then we check if the state is ascending if that's the case we toggle the attribute to `desc` and we sort the `organisedData` list with a customized key. We do the opposite if the state was `desc` or `undefined`.

```js
// Set the new state essentialy toggling ascending / descending
// sort organised data either ascending or descending by the value key
if (state === 'asc') {
    columnHead.setAttribute('data-sortable-state', 'desc')

    organisedData = organisedData.sort((a, b) => (a.value < b.value) ? 1 : -1)
} else {
    columnHead.setAttribute('data-sortable-state', 'asc')

    organisedData = organisedData.sort((a, b) => (a.value > b.value) ? 1 : -1)
}
```

Lastly, we reset the rows of the body according to this new sorted list and we set the `data-sortable-state` to an empty string.

```js
// Update the content of the Table Body with the sorted Array
tbody.innerHTML = '';
for (const row of organisedData) {
    tbody.appendChild(row.element);
}

// Reset the Attributes for the other Heads
columnHeads.forEach(otherColumnHead => {
    if (otherColumnHead != columnHead) {
        otherColumnHead.setAttribute('data-sortable-state', '')
    }
})
```

## HTML Mockup of a sortable table

Now that we have the JavaScript part out of the way we can look at how such a table must look like so it works. We simply have to give the table element itself the `data-sortable` attribute and we have to define a `thead` and `tbody`. Because of the way we made the code we can add as many tables as we want to our site and each one should work as intended.

```html
<table data-sortable>
	<thead>
	    <tr>
	        <th>Id</th>
	        <th>Name</th>
	    </tr>
	</thead>
	<tbody>
	    <tr>
	        <td>1</td>
	        <td>Maxim</td>
	    </tr>
	    <tr>
	        <td>2</td>
	        <td>Alex</td>
	    </tr>
	</tbody>
</table>
```

## Links

[Visit the Demonstration](https://articles.maximmaeder.com/a/Sortable%20Table/)
[Look at the Code](https://articles.maximmaeder.com/a/Sortable%20Table/)

## Conclusion

Excellent! You have successfully created sortable tables using JavaScript code! See how you§ can add more features to this program such as resetting to the initial state or links that sort the table.

Keep in mind that I am also just a beginner, so it could be that my way of solving these problems is not the best or that I use functions or features that aren't advised to use. Always ask questions and try to solve problems your way! 😎😋 ( Did you know you can open an Emoji Picker using `windows + .` on windows )