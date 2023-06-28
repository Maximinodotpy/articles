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
</script>

<div class="container">
    <button on:pointerdown={left} style="opacity: {scroll_left == 0 ? '0' : '1'}">
        <slot name="left_button">&lt;</slot>
    </button>
    <div
        class="items-container"
        bind:clientWidth={current_width}
        bind:this={container}
        on:scroll={() => { scroll_left = container.scrollLeft; scroll_width = container.scrollWidth;}}>
        <slot></slot>
    </div>
    <button on:pointerdown={right} style="opacity: { (Math.abs((scroll_left + current_width) - scroll_width) < 3) ? '0' : '1' }">
        <slot name="right_button">&gt;</slot>
    </button>
</div>

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
