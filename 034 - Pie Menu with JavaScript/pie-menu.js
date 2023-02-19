'use strict';

class PieMenu {
    constructor(menuPoints, coords = [100, 100], container = document.body, cancelledCallback = () => {}) {
        this.menuPoints = menuPoints;
        this.cancelledCallback = cancelledCallback;
        this.indicatorSize = 50
        this.indicatorRadius = 20
        this.currentlyFocusedMenuPoint;

        // creating the Elements
        this.pieMenuRoot = document.createElement('div')
        this.pieMenuRoot.style.position = 'fixed'
        this.pieMenuRoot.style.left = `${coords[0] - this.indicatorRadius}px`
        this.pieMenuRoot.style.top = `${coords[1] - this.indicatorRadius}px`

        this.pieMenuSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.pieMenuSvg.setAttribute('width', this.indicatorRadius * 2)
        this.pieMenuSvg.setAttribute('height', this.indicatorRadius * 2)
        this.pieMenuSvg.setAttribute('viewbox', `0 0 ${this.indicatorRadius * 2} ${this.indicatorRadius * 2}`)
        this.pieMenuSvg.style.overflow = 'visible'
        this.pieMenuRoot.appendChild(this.pieMenuSvg)

        this.pieMenuSvgBackground = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        this.pieMenuSvgBackground.setAttribute('cx', this.indicatorRadius)
        this.pieMenuSvgBackground.setAttribute('cy', this.indicatorRadius)
        this.pieMenuSvgBackground.setAttribute('r', this.indicatorRadius)
        this.pieMenuSvgBackground.classList.add(
            'drop-shadow-md',
            'fill-neutral-500',
        )
        this.pieMenuSvg.appendChild(this.pieMenuSvgBackground)

        this.pieMenuSvgIndicator = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        this.pieMenuSvgIndicator.setAttribute('cx', this.indicatorRadius)
        this.pieMenuSvgIndicator.setAttribute('cy', this.indicatorRadius)
        this.pieMenuSvgIndicator.setAttribute('r', this.indicatorRadius)
        this.pieMenuSvgIndicator.setAttribute('fill', 'transparent')
        this.pieMenuSvgIndicator.setAttribute('stroke-width', '10')
        this.pieMenuSvgIndicator.setAttribute('stroke', 'hsl(200, 100%, 50%)')
        this.pieMenuSvgIndicator.setAttribute('stroke-dasharray', `${this.indicatorSize},${125 - this.indicatorSize}`)
        this.pieMenuSvg.appendChild(this.pieMenuSvgIndicator)


        // Creating the Menu Points themselves
        const distribution = 360 / (this.menuPoints.length)

        for (let i = 0; i < this.menuPoints.length; i++) {
            const currentPoint = this.menuPoints[i]

            const menuButton = document.createElement('button')
            menuButton.classList.add(
                'bg-neutral-700',
                'text-neutral-300',
                'px-2',
                'py-1',
                'font-mono',
                'shadow-md',
                'transition-all',
            )
            menuButton.innerHTML = currentPoint.name

            menuButton.style.setProperty('--scale', 1)
            menuButton.style.position = 'absolute'
            menuButton.style.transform = `
                    translateX(0px)
                    translateY(0px)
                    scale(var(--scale))`


            setTimeout(() => {
                const buttonWidth = menuButton.getBoundingClientRect().width
                const buttonHeight = menuButton.getBoundingClientRect().height

                const position = new Victor(100, 0)
                    .rotateDeg(i * distribution)

                const complexPosition = new Victor(
                    position.x + ((this.circleBox.width - buttonWidth) / 2),
                    position.y - this.circleBox.height / 2 - buttonHeight / 2,
                )

                menuButton.style.transformOrigin = 'center'
                menuButton.style.transform = `
                    translateX(${complexPosition.x}px)
                    translateY(${complexPosition.y}px)
                    scale(var(--scale))`

            }, 1);

            this.menuPoints[i].angle = i * distribution
            this.menuPoints[i].element = menuButton

            this.pieMenuRoot.appendChild(menuButton)
        }

        container.appendChild(this.pieMenuRoot)

        this.circleBox = this.pieMenuSvg.getBoundingClientRect()

        this.createEventListeners()
    }

    createEventListeners() {
        
        const destroyEventListeners = () => {
            document.removeEventListener('pointermove', pointermoveCallback)
            document.removeEventListener('pointerdown', pointerdownCallback)
            window.removeEventListener('pointerdown', resizeCallback)

            this.pieMenuRoot.remove()
        }

        const pointermoveCallback = (event) => {
            const cx = this.circleBox.x + this.circleBox.width / 2;
            const cy = this.circleBox.y + this.circleBox.height / 2;
    
            const angle = this.calc_angle(cx, cy, event.x, event.y);
            const complex_angle = angle - 360 / (125 / this.indicatorSize * 2);
    
            this.pieMenuSvgIndicator.style.transformOrigin = `center`
            this.pieMenuSvgIndicator.style.transform = `rotate(${complex_angle}deg)`
    
            let currentLowestDifference = 360
            this.menuPoints.forEach(point => {
                const difference = this.calc_angle_difference(angle, point.angle)
    
                if (difference < currentLowestDifference) {
                    this.currentlyFocusedMenuPoint = point
                    currentLowestDifference = difference
                }
    
                point.element.style.setProperty('--scale', 1)
            });
    
            this.currentlyFocusedMenuPoint.element.style.setProperty('--scale', 1.3)
        }

        const pointerdownCallback = (ev) => {
            if (ev.buttons != 1) return;
            destroyEventListeners()
            this.currentlyFocusedMenuPoint?.callback()
        }

        const resizeCallback = (event) => {
            this.circleBox = this.pieMenuSvg.getBoundingClientRect()
        }

        const keydownCallback = (ev) => {
            if (ev.key == 'Escape') destroyEventListeners()
            this.cancelledCallback()
        }

        document.addEventListener('pointermove', pointermoveCallback)
        document.addEventListener('pointerdown', pointerdownCallback)
        document.addEventListener('keydown', keydownCallback)
        window.addEventListener('resize', resizeCallback)
    }

    calc_angle(cx, cy, ex, ey) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (theta < 0) theta = 360 + theta;
        return theta;
    }

    calc_angle_difference(r1, r2) {
        return 180 - Math.abs(Math.abs(r1 - r2) - 180);
    }
}