<script lang="ts">
  import TreeView from "./TreeView.svelte";
  import type { TreeData } from "./TreeView.svelte";

  let tree_data: TreeData = [
    {
      name: "Group",
      selected: true,
      children: [
        {
          name: "Sub Group",
          children: [
            {
              name: "Item 1.1.1",
            },
            {
              name: "Item 1.1.2",
            },
          ],
        },
        {
          name: "Group",
        },
      ],
    },
    {
      name: "Item 2",
      children: [
        {
          name: "Item 2.1",
        },
        {
          name: "Item 2.2",
        },
      ],
    },
    {
      name: "Item 3",
    }
  ];

  function duplicateItem(list: any[], id: number) {
    list.splice(id + 1, 0, JSON.parse(JSON.stringify(list[id])));

    tree_data = tree_data;
  }

  function deleteItem(list: any[], id: number) {
    list.splice(id, 1);

    tree_data = tree_data;
  }

  function addItem(list: any[], id: number) {

    // Ensure that the children array exists
    if (!list[id].children) {
      list[id].children = [];
    }

    list[id].children.splice(id + 1, 0, JSON.parse(JSON.stringify({
      name: "New Item",
    })));

    tree_data = tree_data;
  }

  function addItemAtRoot() {
    tree_data.splice(tree_data.length, 0, JSON.parse(JSON.stringify({
      name: "New Item",
    })));

    tree_data = tree_data;
  }

  function renameItem(list: any[], id: number, name: string) {
    list[id].name = name;

    tree_data = tree_data;
  }
</script>

<div class="bg-neutral-800 text-neutral-200 min-h-screen">
  <div class="max-w-6xl mx-auto flex flex-col h-full p-5">
    <h1 class="text-3xl mb-9">Tree View with Svelte</h1>
    
    <div class="grid grid-cols-2 gap-5 grow">
      <div class="border border-green-500 bg-green-950/50 p-6 rounded-md">
        <div class="flex rounded-md overflow-hidden bg-neutral-900 border border-neutral-700 text-neutral-500 mb-5">
          <button on:click={() => { addItemAtRoot() }} class="transition-all hover:text-green-100/50 hover:bg-green-800/50 px-2 py-1">Add File</button>
        </div>
        <div>
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
        </div>
      </div>
      <div class="border border-blue-500 bg-blue-950/50 divide-x divide-blue-500 rounded-md grid grid-cols-2">
        <div class="p-6">
          <div class="text-xl font-bold mb-2">Raw</div>
          <TreeView bind:tree_data={tree_data} />
        </div>
      
        <div class="p-6">
          <div class="text-xl font-bold mb-2">Styled</div>
          <TreeView bind:tree_data={tree_data} let:item>
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
        </div>
      </div>
      <div>
        <pre class="p-5 bg-neutral-900 border border-neutral-600 rounded-md mt-5">{ JSON.stringify(tree_data, null, 2) }</pre>
      </div>
    </div>

  </div>
</div>
