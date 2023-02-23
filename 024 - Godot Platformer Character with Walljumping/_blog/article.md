---
name: 'Godot Platformer Character with Wall jumping'
slug: 'godot-platformer-character-with-wall-jumping'
tags: []
category: 'Utility'
description: 'Learn how to make a platformer character in Godot that also has wall jumping.'
---

In this short Tutorial, we will go over how to make a platformer character in the [Godot Game Engine](https://godotengine.org/) that also has wall jumping. We will use the raycast and timer nodes for the wall jumping. I will show you the Node Setup and the script needed for this program.

Of course, this Tutorial may be outdated as soon as Godot 4 Releases, but you can still learn about the General Concept, so let's get into it.

## Node Setup

Below you see the node Structure of the program. For the Player itself, we use a [KinematicBody2D](https://docs.godotengine.org/en/stable/classes/class_kinematicbody2d.html), which can be controlled through Code and is not affected by physics. We also need to add a [CollisionShape2D](https://docs.godotengine.org/en/stable/classes/class_collisionshape2d.html?highlight=collisionshape2d). We then a Sprite and a Camera. Both [Raycast](https://docs.godotengine.org/en/stable/classes/class_raycast2d.html) nodes are vital as they tell us whether the Player is aligned to the wall at the moment and whether the timer is needed for the wall jump timing. Later we will go over the script attached to the root node.

![enter image description here](https://maximmaeder.com/wp-content/uploads/2022/11/walljump-Charakter-jpg.webp)

Keep in Mind to add collision shape data to the collisionshape2. Below you see the Player in the 2D Viewport.

![enter image description here](https://maximmaeder.com/wp-content/uploads/2022/11/Screenshot-2022-11-25-182804-jpg.webp)

Enable both raycast Nodes and point them in the correct direction with their `cast to` property.

![enter image description here](https://maximmaeder.com/wp-content/uploads/2022/11/Screenshot-2022-11-25-182827-jpg.webp)

## Script

Let's also look at the Code of the program, which will consist of one script attached to the root node of the player scene. We start by extending KinematicBody2D with the `extends` keyword. We then also define a bunch of constants that will influence how the Player moves. Change these according to your game.

```
extends KinematicBody2D

# Constants
const SIDE_ACCEL = 120
const JUMP_POWER = 300
const GRAVITY = 10
const MAX_DOWN_VEL = 500
const WALL_JUMP_POWER = 500
const WALLJUMP_TIME = 0.2
```

We then continue by setting to variables that will constantly be changing: the motion and whether the play has just wall jumped. Lastly, we also get some references to essential nodes that are used later. We need to use the `onready` keyword as these nodes will not be available in this part of the Code, but they have to be so the variables are globally available.

```
# Movement Variables
var motion = Vector2(0, 0)
var justWallJumped = false

# Node References
onready var rayCastLeftNode = $RayCastLeft
onready var rayCastRightNode = $RayCastRight
onready var timerNode = $timer
```

We then connect the timer node's timeout signal to a function in the current script called *walljumpTimeout*. This other function will set the `justWallJumped` to false.

```
func _ready():
	timerNode.connect('timeout', self, 'walljumpTimeout')

func walljumpTimeout():
	justWallJumped = false
```

Now let's go over the central part of the program, which is hosted inside the `_process` function, which will be called once every frame. Inside the function, we start by checking if the Player has pressed the space input mapping, which must be defined in the project settings. If that's the case, we also see if the play is on the floor and if that's the case, we set motion.y to the negative jump power, which will result in jumping.

If the Player is not on the floor, we first check if either raycast collides. If that is the case, we first set the motion.y accordingly, we set justWallJumped to true and start the timer node with the specified time. We then also set the x-axis of the motion variable depending on whether the right or left raycast is colliding.

```
func _process(delta):
	
	# (Wall) Jumping
	if Input.is_action_just_pressed("space"):
		if is_on_floor():
			motion.y = -JUMP_POWER
		else:
			if rayCastLeftNode.is_colliding() or rayCastRightNode.is_colliding():
				motion.y = -JUMP_POWER * 0.8
				justWallJumped = true
				timerNode.start(WALLJUMP_TIME)
			
			if rayCastLeftNode.is_colliding():
				motion.x = WALL_JUMP_POWER
			if rayCastRightNode.is_colliding():
				motion.x = -WALL_JUMP_POWER
```

After that, we check if `justWallJumped` is false. If that is the case, we enable the Player to add or subtract horizontal speed to the character's motion. We then also put motion.x through the lerp function, which will move it towards 0 smoothly. Continuing, we add Gravity to the motion.y. We then constrain the downward motion, and lastly, we use the `move_and_slide` function, which will effectively move the character,  it will return the actual motion, so we update that variable according to that. we also need to set the second argument to Vector.UP so it knows where up is.

```
	if not justWallJumped:
		if Input.is_action_pressed("a"):
			motion.x -= SIDE_ACCEL
		elif Input.is_action_pressed("d"):
			motion.x += SIDE_ACCEL
			
		motion.x = lerp(motion.x, 0, 0.3)
	
	motion.y += GRAVITY
	
	if MAX_DOWN_VEL < motion.y:
		motion.y = MAX_DOWN_VEL
	
	motion = move_and_slide(motion, Vector2.UP)
```

## Showcase

[Visit the Demonstration](https://articles.maximmaeder.com/a/platformer-character/)
[Look at the Code](https://github.com/Maximinodotpy/articles/tree/main/article%2024%20-%20Godot%20Platformer%20Character%20with%20Walljumping)

I have also used something very similar to this in my Little Game: [Tile Jumper 2088](https://maximino.itch.io/tile-jumper-2088)

## Conclusion

Excellent! You have successfully created a Platformer Character using the Godot Game Engine!

Keep in mind that I am also just a beginner, so it could be that my way of solving these problems is not the best or that I use functions or features that aren't advised to use. Always ask questions and try to solve problems your way!