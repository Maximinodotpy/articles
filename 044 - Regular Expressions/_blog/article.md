---
name: 'Regular Expressions'
slug: 'regular-expressions'
tags: []
category: 'General'
status: 'publish'
description: "Regular Expressions one of programmings most dreaded topics, let us learn about them."
---

Regular Expressions are probably one of the most dreaded topics in programming, when you need you copy it off Stack Overflow or ChatGPT does the Job. For me it seems like most or a lot of programmers don't know regex despite it being such an important topic and useful skill. 

So today I want to take you on a tour of Regular Expressions by showing you [Modifiers](#modifiers), [Literals](#literals), [Metacharacters](#metacharacters), [Groups](#groups), [Lookarounds](#lookarounds).

I will try to include as many Examples as possible but I also encourage you to try it out yourself. I highly recommend [Regex101](https://regex101.com/) for learning and debugging Regular Expressions.

## What are Regular Expressions?

Regular Expressions or *regex* are a way of searching for patterns in Texts. These come in useful in Search and Replace scenarios, Input Validation, Glob Patterns and many other occasions.

You could for example examine a text for all Phone Numbers which aren't all the same but they adhere to somewhat of a pattern.

There are several so called flavors, in this Document I will refer to the JavaScript implementation which isn't to different to all the other versions.

## Basic Examples

Before diving into Regex Features lets first take a look at a few examples.

Lets say you want to find out how many times the word `color` but this text was written by American- and British speaking people so sometimes its also written with an additional `u`. The regex for this could look like this `colou?r`, where the question mark indicates that the preceding character (u) can appear zero to one times, so its optional.

Or let's say you want to find out if the user wrote the word `serialize` right but it could also be `serialise` so you could use the following regex `seriali[sz]e` which indicates that it could be `s` **or**  `z`.

Most Regular expressions can be described in a human readable way (plain english) so I will try to do that.

## Regex Features

### Literals

The easiest Regular Expressions are simple Literals which as their name suggests are literally these letters.

For example if you are search for the name `alice` you would type `alice`, this would be no different from regular text searching and we would not utilize the many awesome features of regex.

Some characters like `?`, `(`, `\` have special meaning in regex so they have to be escaped with a `\` before them, but we programmers are used to this.

### Metacharacters

Now what if you know there a some Swiss Zip codes in a text and you want to find them. We know that these Zip Codes are always simply four numbers so for example `8546`.

To search for something like this we could use Metacharacters which are like placeholders or stand-ins for a group of character. This regex looks like this: `\d\d\d\d`, where each `\d` means any digit from 0 to 9 and we want four of them after one another.

there are several built-in metacharacters.

| Metacharacter | Description              |
| ------------- | ------------------------ |
| \\\d           | Digits                   |
| \\\w           | Word Characters          |
| .             | Any Character            |
| \\\s           | Any Whitespace Character | 

All the metacharacters with a slash (`\\`) in front of them can be "reversed" by capitalizing the given letter for example `\\D` matches all characters but digits.
#### Character Classes

Let's say you want to make your own "Placeholder" character, here Character Classes come in Handy. In one of the [Basic Examples](#basic-examples) we saw these in action in the regex pattern `seriali[sz]e` which use a character class with the contents `s` and `z` meaning it could be any of the characters within the brackets.

There is also a shorthand for the abc: `a-zA-Z`
And the digits: `0-9` or you could event set any end range like `0-6`

Last but not least you can also negate such a character class by adding a `^` right after the opening bracket.

#### Alternating / OR

If we want to make such Character Classes but for whole words we could use [Groups](#groups) and the alternate symbol `|`. But this also works for single characters.

For example maybe we want to match either `hello` or `bye` we could do it like this `(hello|bye)`. We can add as many Pipes/Or Possibilites as we want.

### Quantifiers

With quantifiers we can as their suggests tell how many times a certain character should appear, we always do this by adding any of these patterns after the character we want to quantify.

| Quantifier | Description                               |
| ---------- | ----------------------------------------- |
| `?`          | Zero or one                               |
| `*`          | Zero or more                              |
| `+`          | One or more                               |
| `{n}`        | n times                                   |
| `{n,}`       | Atleast n times                           |
| `{,n}`       | Zero or at max n times                    |
| `{n,m}`      | Atleast n times but not more than m times | 

For Example `colou?r` will match `color` and `colour` since the `?` indicates that the u could appear zero or one time.

We could also simplify our example from the [Metacharacters](#metacharacters) by using quantifiers: `\d{4}` which also means four digits after each other.

#### Lazy and Greedy Quantifiers

by default the `*` ,  `+`, `{n}`, `{n, m}` are greedy, which means that they want to match as many characters as possible.

The example below shows a dummy text consisting mainly of a's with capital P's as the beginning middle and end. Our Pattern wants a P at the beginning any number of a's or P's in between and a P at the end.

![](https://i.imgur.com/H1v8RHI.png)
[Link](https://regex101.com/r/jZwLlZ/1)

Let's look at the lazy version of this pattern. For this we simply add a `?` after the plus and this time it will only match until the middle P because this pattern would on its already be valid since the characters in between could also be only a's.

![](https://i.imgur.com/VzMmJag.png)
[Link](https://regex101.com/r/1hmNBz/1)

### Groups

Next up let us go over Groups which can be used for several things.

1. Recognizing matched content more precisely (for example with JavaScript).
2. Reinserting matched content when replacing.
3. Quantifying whole words / expressions.

In Regular Expressions we create groups with round brackets `(content)` for example this would be a regex consisting only of one group alternating between two words: `(Markus|Emily)`.

When substituting we can reference groups by their index and therefore reinsert them.

![](https://i.imgur.com/S9Q7fIB.png)
[Link](https://regex101.com/r/kJfWf4/1)

This sometimes comes in useful when you want to replacing some text and your search it by certain pattern but this pattern is actually something you want to keep and only replace certain parts, this could also be done with [Lookarounds](#lookarounds)

### Anchors

Anchors are a way of "snapping" your pattern to certain points in your test string, notably the start and end.

| Anchor | Description         |
| ------ | ------------------- |
| ^      | Start of the String |
| $      | End of the String   |
| \\\b    | Word Boundary       |
| \\\B    | Non Word Boundary   | 

The end and start anchors are useful when you want to whole test string to match the pattern.

The word Boundaries can be used to as their name suggests to snap to a word, see the following example where we simply want to find all words without the whitespace and punctuation.

![](https://i.imgur.com/r5LXG1T.png)
[Link](https://regex101.com/r/XBOhEF/1)

### Lookarounds

With lookarounds we can tell our pattern to match if something does or does not appear in front or behind the current position.

So there are four Lookarounds.

| Pattern Template | Description          |
| ---------------- | -------------------- |
| `(?=...)`          | Positive Lookahead   |
| `(?!...)`          | Negative Lookahead   |
| `(?<=...)`         | Positive Lookbehind  |
| `(?<!...)`         | Negative Lookbehinde |

The important thing is that a lookaround wont be part of the Match. 

As you see below we first search for three A's and then check if after it there will be three B's and then we also match these B's this makes the Lookaround obsolete but it shows that it is not matched but simply looked for.

![](https://i.imgur.com/U1e7zHE.png)
[Link](https://regex101.com/r/9BYbIf/1)

### Modifiers

Lastly let's look at modifiers, which are like flags to set some of the general behavior, for example we can choose whether the pattern should ignore case.

| Modifier        | Description                         |
| --------------- | ----------------------------------- |
| **g**lobal      | Don't return after the first match  |
| **m**ulti line  | $ and ^ match start and end of line |
| **i**nsensitive | Case insensitive Match              |
| **s**ingle line | Dot matches new line                | 

<!-- ## Use Cases

- Link Finding
- Search and Replace
- (Very simple) Markdown to HTML Rendering
- Glob (File and Directory Regex)
- Input Validation (email lol)
- VS Code Search and Replace

-->

