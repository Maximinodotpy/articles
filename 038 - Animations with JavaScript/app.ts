const canvas = document.createElement('canvas')

canvas.width = 300
canvas.height = 300

document.body.appendChild(canvas)

canvas.style.boxShadow = '0 0 5px 2px hsl(0, 0%, 60%)'

const ctx = canvas.getContext('2d')

if (ctx) {
    ctx.fillStyle = 'hsl(0, 0%, 50%)'
    ctx?.lineTo(100, 100)
    ctx.fillRect(10, 10, 50, 50);

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
}

// Callback Type
type Handler = (progress: number) => void

// Animation Class with Static Functions
class Animations {
    static linear(timeFraction: number): number {
        return timeFraction;
    }
    static quad(timeFraction: number): number {
        return Math.pow(timeFraction, 2)
    }
    static circ(timeFraction: number): number {
        return 1 - Math.sin(Math.acos(timeFraction));
    }

    static animate(duration: number, callback: Handler, timingFunction = Animations.linear, after_callback?: Handler) {
        const start = Date.now()
        const end = start + duration

        function cb() {
            const timePassed = end - Date.now()
            let timeFraction = 1 - (timePassed / duration)
            timeFraction = timingFunction(timeFraction)
            timeFraction = timeFraction || 1
            timeFraction = Math.min(timeFraction, 1)

            callback(timeFraction)

            if (Date.now() < end) {
                requestAnimationFrame(cb)
            } else {
                after_callback && after_callback(1)
            }
        }

        requestAnimationFrame(cb)
    }
}


canvas.style.width = '100%'
canvas.style.height = '100%'
document.body.style.overflow = 'hidden'


function comeIn() {
    Animations.animate(
        5000,
        (pr) => canvas.style.scale = `${ .1 + 0.9 * pr }`,
        Animations.linear,
        goOut
    )
}

function goOut() {
    Animations.animate(
        5000,
        (pr) => canvas.style.scale = `${ .1 + 0.9 * (1 - pr) }`,
        Animations.linear,
        comeIn
    )
}

comeIn()