<script>
// @ts-nocheck

  import { colorScheme } from "./store";

  // Set the color scheme each time it changes.
  // Doing it this way could be useful if you use Tailwind with the class strategy.
  $: {
      document.firstElementChild.setAttribute("class", $colorScheme);
      document.firstElementChild.style.colorScheme = $colorScheme;
  };
</script>

<!-- Toggle Button -->
<button on:click={colorScheme.toggle}>{$colorScheme == "light" ? "🌑" : "🌕"}</button>

<h1>Current Theme: { $colorScheme }</h1>