extends KinematicBody2D

# Naming Conventions and Code Order
# https://www.reddit.com/r/godot/comments/yngda3/gdstyle_naming_convention_and_code_order_cheat/

# Constants
const SIDE_ACCEL = 120
const JUMP_POWER = 300
const GRAVITY = 10
const MAX_DOWN_VEL = 500
const WALL_JUMP_POWER = 500
const WALLJUMP_TIME = 0.2

# Movement Variables
var motion = Vector2(0, 0)
var justWallJumped = false

# Node References
onready var rayCastLeftNode = $RayCastLeft
onready var rayCastRightNode = $RayCastRight
onready var timerNode = $timer

func _ready():
	timerNode.connect('timeout', self, 'walljumpTimeout')

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

func walljumpTimeout():
	justWallJumped = false
