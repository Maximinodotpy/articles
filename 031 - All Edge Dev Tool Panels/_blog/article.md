---
name: 'All Edge Dev Tool Panels'
description: 'Let's take a quick look at every Dev Tool Panel / Tool in Microsoft Edge.'
---

I am one of those few people that use Microsoft Edge for development and everything else, but I have yet to look at the Dev Tools in detail. So until now, I only used/knew about *Elements*, *Console* and maybe *Sources*. But for the sake of learning and this article, I want to explain every Panel of the [dev tools](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/about-tools) in my own words. Keep in mind that there also is official documentation so please interpret this article as an inspirational source rather than a container of knowledge, if you get what I mean. So let's go ahead.


### Animations

With the *Animations* Panel, one can view all current website animations that were made with either a transition, an animation made with `@keyframes`, or an animation made with the [Web Animations JS API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). We can even edit the animation's timing properties by dragging some handlers, and we can set the animation speed of the web page to either 100%, 25%, or 10%.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/inspect-styles/animations)

### Application

The *Application* Panel is helpful when you want to make a fully fletched [Web App](https://maximmaeder.com/how-to-make-a-progressive-web-app/) with a Manifest File, Cookies, Local Storage, Service Workers, or even Indexed DB as this Panel shows you some exciting information about all of this.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/storage/application-tool)

### Changes

This Panel shows you all files you changed from within the Dev Tools and their differences from the original, so if you made many changes in the browser, you could now apply them to the source in your IDE. Today these features are probably useless as most Websites aren't made statically but rather transpiled or rendered or built together in another way that is different from what we edit, for example, PHP, which itself never arrives in the browser.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/changes/changes-tool)

### Coverage

The *Coverage* Panel shows us how much of the loaded resources `.js` and `.css` is used by the Website and how much is not. It has a little table showing used and unused bytes. Like *Changes* it can be useless because we may use some bundler or something of that nature that minifies our code to its best ability, and we need to edit the shipped code ourselves. But it's cool nonetheless.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/coverage/)

### CSS Overview

The *CSS Overview* is similar to the *Coverage* as they help us find unused resources. But this Tool is only for CSS and shows a detailed report of fonts, colors, and sizes used on the size. It will also show you unused declarations and media queries.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/css/css-overview-tool)

### Detached Elements

This Tool is helpful for performance as it shows you memory leaks in the form of elements that are no longer in the DOM but still saved somewhere in the JavaScript Code of the Website.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/memory-problems/dom-leaks)

### Developer Resources

This Tool shows you links to the source maps of your Website that are used when you transpile/compile, for example, SASS to CSS or TypeScript to JavaScript. SASS will add a line like this to your compiled CSS: ` /*# sourceMappingURL=/path/to/thefile.css.map */`. This will tell your browser where this file comes from. In this example, the browser will show the original SCSS / SASS file in the sources panel and make it editable.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/developer-resources/developer-resources)

### Issues

This Panel analyzes your webpage and shows you issues related to accessibility, Compatibility across Browsers, Performance, Progressive Web Apps, Security, and other settings on your site.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/issues/)

### Lighthouse

This Tool also helps you identify problems with your Website. It is often used when making PWAs or SEO-visible Websites. It does not run automatically; you can choose what the Tool should look out for.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/lighthouse/lighthouse-tool)

### Media

This Panel shows you the Media Players ( Video and Audio ) of your Website and some helpful information about them and some associated events.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/media-panel/)

### Memory

With this Tool, you can analyze the memory usage of your Website and optimize it according to this info.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/experimental-features/share-traces)4

### Network

With this Tool, you can see all network requests made after the initial page load. For example, on my little Website [Catstagram](https://demos.maximmaeder.com/demo/catstragam/) you can see the fetch requests and images loaded in as the user scrolls down. You can also simulate a slower bandwidth or even offline to see how your Website behaves in case there is no connection.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/network/)

### Network Request Blocking

It simply allows us to block specific requests on a URL pattern basis, so we can also simulate how our Website behaves in case another Website / API is down, but the rest works.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/network-request-blocking/network-request-blocking-tool)

### Network conditions

This Tool also allows us to simulate network bandwidths, but here we can also simulate another user agent for example, chrome or firefox.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/network-conditions/network-conditions-tool)

### Quick Source & Sources

With sources, you can see all the files sent to you and where they are on the web server. This is useful if you want to download a picture from a page, but it was added via `background` in CSS. Here you will find all images that were sent.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/sources/)

### Rendering

Rendering is pretty awesome as it allows us developers to see which regions of our Website are being repainted or where ther layout shifts. Here we can also simulate Media User Preferences like: `forced-colors`, `prefers-reduced-motion` or even `prefers-color-scheme`. Lastly, you can also see how your Website looks to people with vision deficiencies.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/rendering-tools/rendering-tool)

### Search

Does what it says on the Box, It will help you search for any text or even Regular Expression within the shipped files and even the folder that is added in the Filestystem Tab of *Sources*.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/search/search-tool)

### Security

This Panel simply shows you your certificate and connection and the certificates and connections with all external websites.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/security/)

### Sensors

With the *Sensors* Panel you can emulate a fake position and fake device orientation so you can test the scripts on your Website that handler events and the such relating to this.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/device-mode/orientation)

### Elements

This is the classic Tool, that everybody knows, here, you can look at the HTMl and CSS of your page and edit it easily.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/elements-tool/elements-tool)

### Console

The console is your best friend when you want to debug JavaScript Code, as it will show your `console.log()` messages. You can also type in JS Commands here as it also acts as a REPL.

[Official Documentation](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/console/)

### Welcome

Shows updates of the Dev Tools and other lovely messages.