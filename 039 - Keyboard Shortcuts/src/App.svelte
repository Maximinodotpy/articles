<script lang="ts">
    import Game from "./Game.svelte";
    import Print from "./Print.svelte";

    let isPDF = false;

    let searchParams = new URLSearchParams(document.location.search);

    // Check if the search param pdf is given
    if (searchParams.get("pdf")) {
        isPDF = true;
    }
</script>

<div>
    {#if isPDF}
        <Print />
    {:else}
        <Game />
    {/if}
</div>
