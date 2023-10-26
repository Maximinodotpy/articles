---
name: Calculating Gravity
slug: calculating-gravity
tags:
  - Component
  - Concept
  - GD Script
category: General
status: draft
description: Learn how to Calculate Gravity between two objects, apply it the said objects and how to use it in Godot.
---

Recently I worked on a [Planet / Gravity Simulator](https://maximino.itch.io/planet-simulator) and because of that I had to study how Gravity works. Because I had a little bit of trouble figuring out the correct formula and how to apply it to my gravity objects, I decided to make a short article describing how I did it.

## Calculating Gravitational Force

To calculate the Gravity between two objects we need to know three things.

- Both masses
- The distance between the objects (centers).

We then multiply both masses with each other and we multiply this result with [big G](https://en.wikipedia.org/wiki/Gravitational_constant) better known as the gravitational constant. Which is about `6.674e-11`, so a really big number.

Lastly we need to divide all this by the square of the distance, so if they are 2 meters apart we divide by 4.

Let's go over an example with real numbers. Imagine two spheres two meters apart, one weighs (masses?) 10kg and the other 30kg. The formula for this scenario would look like this.

```
F = 6.674e-11 * 10 * 30 / (2^2)
```

Which results in `0.00000000500573` Newtons, so very little force.

In my Gravity Simulator I made it so every object is atleast 10 Million Kg. heavy.

You can calculate gravitational force with this [neat website](https://www.omnicalculator.com/physics/gravitational-force?c=CHF&v=g:6.674!x10em11,m1:10!kg,m2:30!kg,r:2!m).


## Calculating Acceleration

Now we know the force acting between two objects but we dont know how they'll react to said force. We need to take into accoutn that heavier or more massive objects react less to force and smaller objects react more.

Within my Simulator I had then to divide the mass of each object by the number that resulted from the previous calculation to get their respective acceleration. Which I can then add to the motion of the Objects to achieve gravity like movement.

In code this whole process looks like this.

```
var accel = Mass / gravity_force
```


## Realizations about Gravity

There are three things we can take away from this Formula and how we apply it to our planets.

- Distance is a large factor (Orbit)
  The fact that we square the distance says a lot about the Behavior of Planets, because of this it is possible that the moon revolves around the earth while the earth circles the sun and so fourth.
- Mass
  Planets or Objects with higher masses affect other Objects more and they are less effected themselves.
- Everything Effects Everything
  Every object no matter how small affects every other object. This means also we as humans with our tiny masses affect other things like the Earth, Moon and Sun.


![[orbit.gif]]