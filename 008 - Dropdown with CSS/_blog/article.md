---
name: 'Dropdown with SASS/CSS'
description: 'Learn how to make a dropdown class to be used in HTML with the CSS preprocessor SASS.'
---

This tutorial will make dropdown classes for us to use in our code. We use the CSS preprocessor SASS. SASS allows us to extend our CSS, which will be more organized easily, but this is also a CSS Tutorial because we will not use many of the complex SASS features.

## Base Class

So let us start the base class for the dropdowns. We start by defining a color variable that will hold the background color.

```scss
$color: rgb(214,  238,  255)
```

After that, we select all the elements where the string `dropdown` appears in the class attribute. Later we will see why we do this way.

```scss
[class*="dropdown"]
```

We then set the position of these items to relative. This is important because the dropdown panel will be placed using `absolute`. We also give it some padding, and we set its placement to `inline-block`. We also set the font family, but this is just, so it looks nicer.

```scss
	position: relative
	padding: 1em
	display: inline-block

	font-family: 'Segoe UI', sans-serif
```

Continuing, we select the first immediate child of the dropdown class, make it bold with `font-weight: 600`, and set a transition for the transform. This element should be the header of the dropdown, which is the text you hover over for the dropdown panel to appear.

```scss
    /* The Header of the Dropdown */
    > *:first-child
        transition: transform 0.25s ease
        font-weight: 600
```

Then if we hover over the dropdown class, we set the background color as the value of the variable we defined at the beginning. We also add some rounded corners at the top. Then we also translate the first immediate child up by seven pixels, which will make a nice little animation in conjunction with the transition.

```scss
    &:hover
        background: $color
        border-radius: 10px 10px 0 0

        > *:first-child
            transform: translateY(-7px)
```

After that, we finally style the dropdown panel, which will be, in our case, just a `ul` element, but it could be any. We will set its display property to none, so it does not appear by default. Then we also set its minimum width to 100%, so it does not look bad. We also add a background color and padding.

```scss
	/* The Dropdownpanel that appears */
    ul
        display: none
        min-width: 100%
        background-color: $color
        padding: 1em
```

We remove the dots before the list items by setting the `list-style-type` property to `none`. We remove any margin, and we set the position to absolute. This will cause the element to break from the flow, enabling us to place it with `top`, `bottom`, `left`, and `right`, we have to. That is what we do, we set top to 100%, so the panel appears at the bottom of the parent element and left to 0, so it sticks to the left side of the parent. We also round the panel at the bottom and top right and set the `z-index` to 99 to ensure that the panel appears in front of any other elements.

```scss
        list-style-type: none
        margin: 0
        position: absolute
        top: 100%
        left: 0
        border-radius: 0px 10px 10px 10px
        z-index: 99
```

We also remove the list item indentation by setting `padding-block-start` to zero.

```scss
        li
            padding-block-start: 0
```

Last but not least, we reset the display property of the list in case we hover over the dropdown class, which will show it.

```scss
    &:hover ul
        display: unset
```

## Right dropdown

The class above will make a dropdown panel sticking to the container's left, but maybe we want the dropdown to stick to the right. So for the right panel, we unset the `left` property and set `right` to zero. Because of how we selected the classes above, we can now make a small class called `dropdown-right` which will have all the properties of the other CSS but overwrite some of them.

```scss
/* If the dropdown should start on the right side */
.dropdown-right ul
    border-radius: 10px 0px 10px 10px
    left: unset
    right: 0 !important
    text-align: right
```

## Different panel widths

Maybe you would also want the panel to be large for some dropdowns, so we now make a small loop. We first define two lists. One holds the values of the widths, and the other holds their respective names.

```scss
/* Three Different widths for the dropdown panel */
$dropdown-width-values: 100px, 200px, 300px
$dropdown-width-names: 'slim', 'normal', 'wide'
```

After that, we zip the two lists to make one.

```scss
$dropdown-widths: zip($dropdown-width-names, $dropdown-width-values)
```

Then we loop over the list and do some insertions.

```scss
@each $name, $width in $dropdown-widths
    .dropdown-#{$name} ul
        min-width: $width
```

## showcase

Now lets look at our classes in action. Keep in mind we looked at SASS compiling in this [article](https://maximmaeder.com/padding-and-margin-classes-with-sass/).

![enter image description here](https://maximmaeder.com/wp-content/uploads/2022/07/dropdown.gif)

## Conclusion

Excellent! You have successfully created a dropdown class using SASS/CSS code!

## Full Code

```scss
$color: rgb(214, 238, 255)

[class*="dropdown"]
    position: relative
    padding: 1em
    display: inline-block

    font-family: 'Segoe UI', sans-serif

    /* The Header of the Dropdown */
    > *:first-child
        transition: transform 0.25s ease
        font-weight: 600

    &:hover
        background: $color
        border-radius: 10px 10px 0 0

        > *:first-child
            transform: translateY(-7px)

    /* The Dropdownpanel that appears */
    ul
        display: none
        min-width: 100%
        background-color: $color
        padding: 1em
        list-style-type: none
        margin: 0
        position: absolute
        top: 100%
        left: 0
        border-radius: 0px 10px 10px 10px
        z-index: 99

        li
            padding-block-start: 0

    &:hover ul
        display: unset

/* If the dropdown should start on the right side */
.dropdown-right ul
    border-radius: 10px 0px 10px 10px
    left: unset
    right: 0 !important
    text-align: right

/* Three Different widths for the dropdown panel */
$dropdown-width-values: 100px, 200px, 300px
$dropdown-width-names: 'slim', 'normal', 'wide'

$dropdown-widths: zip($dropdown-width-names, $dropdown-width-values)

@each $name, $width in $dropdown-widths
    .dropdown-#{$name} ul
        min-width: $width
```