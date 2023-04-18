import { writable } from "svelte/store";

// Get the OS default color scheme
const media_query = matchMedia("(prefers-color-scheme: dark)")
const os_default = media_query.matches ? "dark" : "light";

// Get the current color scheme from local storage, or default to light
const { subscribe, update } = writable(localStorage.getItem("colorScheme") ?? os_default);

// Create a channel so we can communicate with other tabs/windows/iframes
const channel = new BroadcastChannel("colorScheme");

// Listen for messages from other tabs/windows/iframes
channel.addEventListener("message", event => {
    update(() => event.data);
});

const toggle = () => update(n => {
    const newColorScheme = n === "light" ? "dark" : "light"

    // Save the new color scheme to local storage
    localStorage.setItem("colorScheme", newColorScheme);

    // Send the new color scheme to other tabs/windows/iframes
    channel.postMessage(newColorScheme);

    return newColorScheme;
});

// A store object must return a subscribe function, all other properties are optional.
export const colorScheme = { subscribe, toggle };