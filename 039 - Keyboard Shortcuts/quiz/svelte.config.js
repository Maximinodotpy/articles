import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
/* import { vitePreprocess } from '@sveltejs/kit/vite'; */

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess()
}
