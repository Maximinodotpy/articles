<script context="module" lang="ts">
    export interface TreeItem {
        name: string;
        children?: TreeItem[];

        // To allow custom keys
        [key: string]: any;
    }

    export type TreeData = TreeItem[];
</script>

<script lang="ts">
    export let tree_data: TreeData = [];

    function summaryKeyup(event: KeyboardEvent) {
        if (event.key ==  ' ' && document.activeElement.tagName != 'SUMMARY') {
            event.preventDefault();
        }
    }
</script>

<ul>
    {#each tree_data as item, i}
        <li>
            {#if item.children}
                <details>
                    <!-- svelte-ignore a11y-no-redundant-roles -->
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
            {:else}
                <slot {item} list={tree_data} id={i}>
                    {item.name}
                </slot>
            {/if}
        </li>
    {/each}
</ul>
