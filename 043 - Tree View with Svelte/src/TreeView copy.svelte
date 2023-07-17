<script context="module" lang="ts">
    interface TreeItem {
        name: string,
        children?: TreeItem[],
    };

    export type TreeData = TreeItem[];
</script>

<script lang="ts">
    export let tree_data = [];
</script>

<div>
    <ul class="pl-4 select-none">
        {#each tree_data as item}
            <li>
                {#if item.children}
                    <details class="">
                        <summary class="flex items-center group">
                            <slot name="folder-before"></slot>
                            <div class="px-2 py-1 grow">
                                {item.name}
                            </div>
                            <div class="group-hover:opacity-100 opacity-0 transition-all">
                                <slot name="folder-behind"></slot>
                            </div>
                        </summary>

                        <svelte:self tree_data={item.children}>
                            <slot name="item-before">f</slot>
                            <slot name="item-behind">f</slot>
                            <slot name="folder-before">f</slot>
                            <slot name="folder-behind">f</slot>
                        </svelte:self>
                    </details>
                {:else}
                    <div class="flex items-center">
                        <slot name="item-before"></slot>
                        <div class="px-2 py-1 grow">
                            {item.name}
                        </div>
                        <slot name="item-behind"></slot>
                    </div>
                {/if}
            </li>
        {/each}
    </ul>
</div>