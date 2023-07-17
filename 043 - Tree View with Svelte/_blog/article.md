---
name: 'Tree View With Svelte'
slug: 'tree-view-with-svelte'
tags: []
category: 'General'
status: 'draft'
description: "Let's create a Tree View Component with Svelte."
---

Welcome to another Svelte Tutorial, this time around we will build an interactive Tree View with Svelte. Tree Views are most often used in File Explorers or UI elements of similar nature and therefore they are very good at showing that one item is "part" of another.

We'll make the Component as flexible as possible, actually it will on its own only render a json tree object with a bunch of `detail` elements and nothing more, but we make it so we can pass a slot into this component which will take over rendering the Items themselves. 

For this to work we will need to learn about slots, slot props and recursive components. Don't be afraid like everything else in svelte this is easy and intuitive.

![Image of Tree View Component in Action](https://github.com/Maximinodotpy/articles/blob/main/043%20-%20Tree%20View%20with%20Svelte/_blog/screenshot.png?raw=true)

Visit the [Demo](https://demos.maximmaeder.com/d/tree-view-with-svelte/index.html).

## Tree View Component

Let's dive straight into creating the Component Code.

Right at the start we have a bit of code that may be new for some folks. In Svelte there actually two types of Script Blocks that can be added to a file, and here we use the `module` type which we indicate by setting the context attribute to module. Within this block we define the types and interfaces that Component needs, in this case its a tree item and a list of tree data. Items must have a `name` attribute and can optionally have a `children` attribute which has more items as a list and further optionally it can have any key it wants. Now other files can import these types.

```svelte
<script context="module" lang="ts">
    export interface TreeItem {
        name: string;
        children?: TreeItem[];

        // To allow custom keys
        [key: string]: any;
    }

    export type TreeData = TreeItem[];
</script>
```

Next up we reach the actual and normal script block. Thankfully it is not too complicated we just have to export a variable so it can be passed in as a prop that represents the tree data. We also create a function that will be called on the `keyup` event that checks whether the space key was pressed in an element within the summary tag. We need to do this because we will later add inputs to the view and when the user presses spaces it will toggle the folding of the details element and we don't want that.

```svelte
<script lang="ts">
    export let tree_data: TreeData = [];

    function summaryKeyup(event: KeyboardEvent) {
        if (event.key ==  ' ' && document.activeElement.tagName != 'SUMMARY') {
            event.preventDefault();
        }
    }
</script>
```

Now we'll come around to the Markup which consist of an `ul` that will be filled with each element of the tree data list within `li` elements. We also get the index by appending `, i`  after the iterator name. As you see we check whether the current item has children which will determine whether it gets a details element or not. In case it doesn't we insert a slot pass in the item a `list` and `id` attribute. Later when we use the component we see how we can receive these slot props.

```svelte
<ul>
    {#each tree_data as item, i}
        <li>
            {#if item.children}
                <!-- Code For "Folder" Element -->
            {:else}
                <slot {item} list={tree_data} id={i}>
                    {item.name}
                </slot>
            {/if}
        </li>
    {/each}
</ul>
```

Next up lets also look at how an element with Children is handled. We use the `details` html element which is basically an accordion for free. We put the text that is always visible within the `summary` element, here we once again use a slot element. After that we add the special `svelte:self` element which enables us to recursively use this element within itself. Here we need to pass in the data we also have to pass in from the outside and we also connect the slot props.

```svelte
<details>
	<summary class="flex" on:keyup={summaryKeyup} role="button" tabindex="0">
		<slot {item} list={tree_data} id={i}>
			{item.name}
		</slot>
	</summary>

	{#if item.children}
		<div class="pl-8">
			<svelte:self tree_data={item.children} let:item let:list={tree_data} let:id={i}>
				<slot {item} list={tree_data} id={i}>{ item.name }</slot>
			</svelte:self>
		</div>
	{/if}
</details>
```

## Using the Component

Well that was a lot but I hope you somewhat understood how to create a recursive Tree Component with Svelte. Let's also go over some ways of using this component.

### Raw Tree View

The Raw view is pretty easy to use you simply have to pass an object the tree_data property that conforms with `TreeData` type.

```svelte
<TreeView tree_data={tree_data} />
```

This is alright but we can do this better by styling the items ourselves.

![Raw Tree View without any Modifications](https://i.imgur.com/4KENp7l.png)


### Styled Tree View

To style our Tree View we simply pass an HTML Element to the Tree View which will be rendered for every element no matter how nested it is. We also need to get the item variable/prop so we can use it our markup. As you see I use a little bit of tailwind to enhance our Tree View.

```svelte
<TreeView tree_data={tree_data} let:item>
	<div class="flex w-full group border-b border-b-blue-700 py-2">
		{#if item.children}
			<div class="grow">
				📁 {item.name}
			</div>
		{:else}
			<div class="grow">
				📝 {item.name}
			</div>
		{/if}
	</div>
</TreeView>
```

![Styled Tree View with Cosmetic changes like emojis](https://i.imgur.com/B8EFFGu.png)

### Editable Tree View

Lastly we can also make our Tree View editable to this we have to make use of the list and id slot props that we pass. Below you see some rather complex code with buttons for each element.

```svelte
<TreeView {tree_data} let:item={item} let:list={list} let:id={id}>
	<div class="flex w-full group border-b border-b-green-900 py-2">
		<div class="grow flex gap-2">
		{#if item.children && item.children.length > 0}
			📁 <div class="text-neutral-500">{ item.children.length }</div>
		{:else}
			📄
		{/if}
		<input
			type="text"
			value={item.name}
			class="grow shrink w-full bg-transparent px-1 focus:outline-none focus:ring-0"
			style="width: fit-content;"
			on:input={(ev) => { renameItem(list, id, ev.target.value) }}>
		<div class="flex rounded-md overflow-hidden text-xs bg-neutral-900 opacity-0 group-hover:opacity-100 transition-all border border-neutral-700 text-neutral-500">
			<button on:click={() => { addItem(list, id) }} class="transition-all hover:text-green-100/50 hover:bg-green-800/50 px-2 py-1">Add File</button>
			<button on:click={() => { duplicateItem(list, id) }} class="transition-all hover:text-blue-100/50 hover:bg-blue-800/50 px-2 py-1">Duplicate</button>
			<button on:click={() => { deleteItem(list, id) }} class="transition-all hover:text-red-100/50 hover:bg-red-800/50 px-2 py-1">Delete</button>
		</div>
	</div>
</TreeView>
```

The Callback functions for these buttons look like this. They work with the list and id to change something about our data and we always to remember to trigger a reaction by assigning the tree data to itself because svelte does not recognize function changes.

```js
function duplicateItem(list: any[], id: number) {
    list.splice(id + 1, 0, JSON.parse(JSON.stringify(list[id])));

	tree_data = tree_data;
}

function deleteItem(list: any[], id: number) {
	list.splice(id, 1);

	tree_data = tree_data;
}
```

![Fully Editable Tree View with Buttons for each item](https://i.imgur.com/RYiljjc.png)


