
/* Loop through all elements with the accordion class */
Array.from(document.querySelectorAll('.accordion')).forEach(el => {

    /* Save important Element References */
    let accordionTitle = el.querySelector('.accordion-title');
    let accordionBody = el.querySelector('.accordion-body');


    /* Reinsert the Title with an Icon */
    accordionTitle.innerHTML = `
    <div>`+ accordionTitle.innerHTML + `</div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="accordion-title-icon">
        <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/>
    </svg>
    `

    let accordionTitleIcon = el.querySelector('.accordion-title-icon');

    /* Call this function when clicking on the title */
    let toggle = function () {

        /* Use el.classList.toggle(name) to toggle the class in the Element */
        accordionBody.classList.toggle('collapsed')

        /* Set the Rotation of the Icon depending on wether the collapsed Class has been set. */
        accordionTitleIcon.style.transform = accordionBody.classList.contains('collapsed') ? 'rotate(0deg)' : 'rotate(180deg)'
    }

    /* Connect onclick event of title to our function (just the refernce to it) */
    accordionTitle.addEventListener('click', toggle);

    /* Call the function two times so the arrow looks in the right direction */
    toggle();
    toggle();
})


let list = []

let string = `<div class="wp-container-11 wp-block-group"><div class="wp-container-10 entry-content wp-block-post-content">
<div class="wp-container-9 wp-block-query"><ul class="wp-container-7 is-flex-container columns-3 alignwide bg-custom wp-block-post-template"><li class="wp-block-post post-496 post type-post status-publish format-standard has-post-thumbnail hentry category-allgemein tag-css tag-programming tag-sass tag-web-developement">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/accordion-with-html-css-sass-and-javascript/"><img loading="lazy" width="1785" height="936" src="https://maximmaeder.com/wp-content/uploads/2022/08/accordion.gif" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Accordion with HTML, CSS (SASS) and JavaScript." /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/accordion-with-html-css-sass-and-javascript/" target="_blank" rel="">Accordion with HTML, CSS (SASS) and JavaScript.</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">Learn how to make an Accordion with HTML, CSS (Sass), and a little bit of Javascript. </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/accordion-with-html-css-sass-and-javascript/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-482 post type-post status-publish format-standard has-post-thumbnail hentry category-webdevelopment tag-html tag-programming tag-sass tag-vue tag-web-developement">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/highlighted-dummy-code-editor-with-html-css-javascript-vue-js/"><img width="12000" height="7500" src="https://maximmaeder.com/wp-content/uploads/2022/07/preview-2.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Highlighted Dummy Code Editor with HTML CSS JavaScript (vue.js)" loading="lazy" srcset="https://maximmaeder.com/wp-content/uploads/2022/07/preview-2.png 12000w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-2-300x188.png 300w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-2-1024x640.png 1024w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-2-768x480.png 768w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-2-1536x960.png 1536w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-2-2048x1280.png 2048w" sizes="(max-width: 12000px) 100vw, 12000px" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/highlighted-dummy-code-editor-with-html-css-javascript-vue-js/" target="_blank" rel="">Highlighted Dummy Code Editor with HTML CSS JavaScript (vue.js)</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">Learn about HTML, CSS, JavaScript (vue.js), and Regular Expressions by creating a dummy code editor that looks like VS-Code </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/highlighted-dummy-code-editor-with-html-css-javascript-vue-js/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-473 post type-post status-publish format-standard has-post-thumbnail hentry category-webdevelopment tag-html tag-programming tag-pwa tag-simple">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/how-to-make-a-progressive-web-app/"><img width="12000" height="7500" src="https://maximmaeder.com/wp-content/uploads/2022/07/preview-1.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="How to make a Progressive Web App." loading="lazy" srcset="https://maximmaeder.com/wp-content/uploads/2022/07/preview-1.png 12000w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-1-300x188.png 300w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-1-1024x640.png 1024w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-1-768x480.png 768w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-1-1536x960.png 1536w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-1-2048x1280.png 2048w" sizes="(max-width: 12000px) 100vw, 12000px" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/how-to-make-a-progressive-web-app/" target="_blank" rel="">How to make a Progressive Web App.</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">Learn how to setup up a progressive web app in its simplest form. Use it to build more complex Apps that run independently. </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/how-to-make-a-progressive-web-app/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-457 post type-post status-publish format-standard has-post-thumbnail hentry category-sass tag-css tag-html tag-sass tag-web-developement">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/dropdown-with-sass-css/"><img width="1785" height="936" src="https://maximmaeder.com/wp-content/uploads/2022/07/dropdown.gif" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Dropdown with SASS/CSS" loading="lazy" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/dropdown-with-sass-css/" target="_blank" rel="">Dropdown with SASS/CSS</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">Learn how to make a dropdown class to be used in HTML with the CSS preprocessor SASS. </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/dropdown-with-sass-css/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-451 post type-post status-publish format-standard has-post-thumbnail hentry category-webdevelopment tag-css tag-html tag-js tag-vue">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/simple-spreadsheet-app-with-vue/"><img width="12000" height="7500" src="https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-1.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Simple spreadsheet app with vue" loading="lazy" srcset="https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-1.png 12000w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-1-300x188.png 300w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-1-1024x640.png 1024w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-1-768x480.png 768w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-1-1536x960.png 1536w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-1-2048x1280.png 2048w" sizes="(max-width: 12000px) 100vw, 12000px" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/simple-spreadsheet-app-with-vue/" target="_blank" rel="">Simple spreadsheet app with vue</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">Learn how to make a simple spreadsheet app with the javascript framework vue. We will create it so you can reference other cells. </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/simple-spreadsheet-app-with-vue/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-374 post type-post status-publish format-standard has-post-thumbnail hentry category-sass tag-grid tag-responsive tag-sass tag-web-developement">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/grid-classes-with-sass/"><img width="12000" height="7500" src="https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="grid classes with Sass." loading="lazy" srcset="https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1.png 12000w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-300x188.png 300w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-1024x640.png 1024w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-768x480.png 768w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-1536x960.png 1536w, https://maximmaeder.com/wp-content/uploads/2022/07/preview_Zeichenflache-1-2048x1280.png 2048w" sizes="(max-width: 12000px) 100vw, 12000px" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/grid-classes-with-sass/" target="_blank" rel="">grid classes with Sass.</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">Learn how to make Responsive Grid Classes with the CSS preprocessor SASS. Learn about SASS Loops, CSS Grid and SASS variables insertion. </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/grid-classes-with-sass/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-350 post type-post status-publish format-standard has-post-thumbnail hentry category-python tag-file tag-programming tag-python tag-steganography">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/how-to-hide-text-in-images-with-python/"><img width="12000" height="7500" src="https://maximmaeder.com/wp-content/uploads/2022/07/preview.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="How to hide text in images with python." loading="lazy" srcset="https://maximmaeder.com/wp-content/uploads/2022/07/preview.png 12000w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-300x188.png 300w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-1024x640.png 1024w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-768x480.png 768w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-1536x960.png 1536w, https://maximmaeder.com/wp-content/uploads/2022/07/preview-2048x1280.png 2048w" sizes="(max-width: 12000px) 100vw, 12000px" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/how-to-hide-text-in-images-with-python/" target="_blank" rel="">How to hide text in images with python.</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">Hiding and Reading Text that is hidden in uncompressed images with PIL a python library for image editing. This is called Steganography. </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/how-to-hide-text-in-images-with-python/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-235 post type-post status-publish format-standard has-post-thumbnail hentry category-general tag-general">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/what-is-programming/"><img width="5471" height="4500" src="https://maximmaeder.com/wp-content/uploads/2022/06/preview_Zeichenflache-1.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="What is Programming?" loading="lazy" srcset="https://maximmaeder.com/wp-content/uploads/2022/06/preview_Zeichenflache-1.png 5471w, https://maximmaeder.com/wp-content/uploads/2022/06/preview_Zeichenflache-1-300x247.png 300w, https://maximmaeder.com/wp-content/uploads/2022/06/preview_Zeichenflache-1-1024x842.png 1024w, https://maximmaeder.com/wp-content/uploads/2022/06/preview_Zeichenflache-1-768x632.png 768w, https://maximmaeder.com/wp-content/uploads/2022/06/preview_Zeichenflache-1-1536x1263.png 1536w, https://maximmaeder.com/wp-content/uploads/2022/06/preview_Zeichenflache-1-2048x1685.png 2048w" sizes="(max-width: 5471px) 100vw, 5471px" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/what-is-programming/" target="_blank" rel="">What is Programming?</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">What is Programming: read about the answer or an attempt at it &#8230; </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/what-is-programming/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-204 post type-post status-publish format-standard has-post-thumbnail hentry category-python tag-file tag-programming tag-python tag-xml">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/edit-xml-with-python/"><img width="1280" height="808" src="https://maximmaeder.com/wp-content/uploads/2022/06/image.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Edit XML with python" loading="lazy" srcset="https://maximmaeder.com/wp-content/uploads/2022/06/image.png 1280w, https://maximmaeder.com/wp-content/uploads/2022/06/image-300x189.png 300w, https://maximmaeder.com/wp-content/uploads/2022/06/image-1024x646.png 1024w, https://maximmaeder.com/wp-content/uploads/2022/06/image-768x485.png 768w" sizes="(max-width: 1280px) 100vw, 1280px" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/edit-xml-with-python/" target="_blank" rel="">Edit XML with python</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">How to edit XML files with python using the dom class </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/edit-xml-with-python/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-187 post type-post status-publish format-standard has-post-thumbnail hentry category-sass tag-css tag-programming tag-sass tag-web-developement">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/padding-and-margin-classes-with-sass/"><img width="1280" height="808" src="https://maximmaeder.com/wp-content/uploads/2022/06/image_Zeichenflache-1.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Padding and Margin Classes with Sass" loading="lazy" srcset="https://maximmaeder.com/wp-content/uploads/2022/06/image_Zeichenflache-1.png 1280w, https://maximmaeder.com/wp-content/uploads/2022/06/image_Zeichenflache-1-300x189.png 300w, https://maximmaeder.com/wp-content/uploads/2022/06/image_Zeichenflache-1-1024x646.png 1024w, https://maximmaeder.com/wp-content/uploads/2022/06/image_Zeichenflache-1-768x485.png 768w" sizes="(max-width: 1280px) 100vw, 1280px" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/padding-and-margin-classes-with-sass/" target="_blank" rel="">Padding and Margin Classes with Sass</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">How to quickly make padding and margin classes utilizing sass and its looping possibilities. </p></div>

<a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" class="has-text-color has-black-color has-background has-primary-background-color articleButton rounded wp-block-read-more" href="https://maximmaeder.com/padding-and-margin-classes-with-sass/" target="_self">Read<a role="document" aria-label="Block: Read More" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-read-more rich-text" id="block-f95d5d48-9a3c-4876-b298-95146d920bec" data-block="f95d5d48-9a3c-4876-b298-95146d920bec" data-type="core/read-more" data-title="Read More" style="background-color: initial;font-family: var(--wp--preset--font-family--dm-sans);font-size: var(--wp--preset--font-size--medium);min-width: 1px"></a></a>
</li><li class="wp-block-post post-146 post type-post status-publish format-standard has-post-thumbnail hentry category-python tag-game tag-programming tag-python tag-quiz">
<figure style="width:100%;" class="rounded wp-block-post-featured-image"><a href="https://maximmaeder.com/simple-quiz-in-the-console-with-python/"><img width="1881" height="950" src="https://maximmaeder.com/wp-content/uploads/2022/06/quiz.gif" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Simple quiz in the console with python." loading="lazy" /></a></figure>

<h2 style="font-style:normal; font-weight:700; text-transform:capitalize;" class="wp-block-post-title has-medium-font-size"><a href="https://maximmaeder.com/simple-quiz-in-the-console-with-python/" target="_blank" rel="">Simple quiz in the console with python.</a></h2>

<div class="wp-block-post-excerpt"><p class="wp-block-post-excerpt__excerpt">In this tutorial, we will make a simple quiz program with python and some excellent modules like json, colored and random. </p></div>
`

list = string.match(/<a.*?href="(.*?)".*?>/g)
console.log(list);

let list2 = []


list.forEach(el => {
    list2.push(el.match(/https:\/\/maximmaeder.com\/.*?"/g)[0])
})

list2 = [...new Set(list2)]

console.log(list2);