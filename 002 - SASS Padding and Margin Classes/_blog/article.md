---
name: 'Padding and Margin Classes with Sass'
slug: 'padding-and-margin-classes-with-sass'
tags: []
category: 'Utility'
description: 'How to quickly make padding and margin classes utilizing sass and its looping possibilities.'
---

Sometimes one just needs margin and padding classes for left, right, top and bottom and we could make these ourselves but that would be tedious and take a long time. We can however use SASS to quickly make this CSS. SASS is a CSS Pre-Processor, which means it is not valid CSS but will generate it. SASS just others other useful features such as string functions, variables, and loops.

Let us take a look at a simple example to make margin and padding class in all directions from 0ems to 7ems.

Let us start by defining two lists, one holds the em range and one the direction strings.

```scss
$ems: 0, 1, 2, 3, 4, 5, 6, 7
$directions: "", "-bottom", "-top", "-left", "-right"
```

In SASS lists and the variables are defined in this manner. `$variableName: itemOne, itemTwo, ... ` . No need to terminate with a `;`

Next, we loop over the two lists in a nested manner. So for every `em` we also go through every direction.

```scss
@each $em in $ems

    @each $dir in $directions
```

After that we get the second letter from the direction so for `-top` that means `t`, we do this so the class name does not include the whole word. We can do this with the `str-slice()` function which takes the string to slice, the starting point, and the ending point. SASS Lists and Strings start at `1` and not `0` as most programming languages do, so keep that in mind.

```scss
		$dir-in-rule: str-slice($dir, 2, 2)
```

Now let us start with making classes. Here comes the powerful part about SASS because we can insert the variables into the selectors, rules, and values. So we add the shortened `$dir-in-rule` to `.m` and after it, we add the `em` amount. So this will result in classes that are called this. `mt-1` or `mb-5` which should mean a margin-top of one em and margin-bottom of 5 em. Because we have also defined the direction `""` we will also get something like `m-3` which means margin in all directions.

To insert variables in selector and rules we have to do it this way: `#{$variableName}`. For the value, we simply write down the variable name with the `$` sign. We can also concatenate normal strings like the `em` with `+`

We also do this for padding which is done in a similar manner.

```scss
        .m#{$dir-in-rule}-#{$em}
            margin#{$dir}: $em + em

        .p#{$dir-in-rule}-#{$em}
            padding#{$dir}: $em + em
```



Now this code won't work by itself, we have to convert it to valid CSS first this is done by transpilling or converting. [This](https://codebeautify.org/sass-to-css-converter) converter is really good. After putting in the code there it should result in something like this.

```scss
.m-0 {
  margin: 0em; }

.p-0 {
  padding: 0em; }

.mb-0 {
  margin-bottom: 0em; }

.pb-0 {
  padding-bottom: 0em; }

.mt-0 {
  margin-top: 0em; }

... /* There should be 80 Classes like this */
```

## Conclusion

Excellent! You have successfully created margin and padding classes using SASS code! See how you can make more with this knowledge!