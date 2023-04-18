<script>
    import { colorScheme } from "./store";

    // Set the color scheme each time it changes.
    // Doing it this way could be useful if you use Tailwind with the class strategy.
    $: {
        document.firstElementChild.setAttribute("class", $colorScheme);
        if ($colorScheme == "light") {
            document.firstElementChild.style.colorScheme = "light";
        } else {
            document.firstElementChild.style.colorScheme = "dark";
        }
    };
</script>

<!-- Toggle Button -->
<button on:click={colorScheme.toggle}>{$colorScheme == "light" ? "🌑" : "🌕"}</button>