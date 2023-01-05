class splitContainer extends HTMLElement {
    connectedCallback() {

        this.config = {
            min: this.getAttribute('min') || 20,
            max: this.getAttribute('max') || 80,
            preserve: this.getAttribute('preserve') || null,
            start: this.getAttribute('start') || 50,
            draggerwidth: this.getAttribute('draggerwidth') || 50,
        }

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
        <style>
            :host * {
                box-sizing: border-box;
            }

            :host {
                background-color: rgb(255, 255, 255);
                font-family: 'Segoe UI', sans-serif;
                display: flex;
                position: relative;
            }

            ::slotted(div) {
                box-sizing: border-box;
            }

            ::slotted(div:last-child) {
                position: absolute;
                right: 0
            }


            #dragger-container {
                height: 100%;
                width: 100px;
                display: flex;
                align-content: center;
                justify-content: center;
                opacity: 0.1;
                left: calc(50% - 1em - 2.5px);
                transition: opacity 0.2s ease;
                position: absolute;
                touch-action: none;
            }

            #dragger-container:hover {
                opacity: 0.3;
                cursor: ew-resize;
            }

            #dragger-container:active {
                opacity: 1;
                cursor: ew-resize;
            }
            
            
            #dragger-container div {
                background-color: rgb(0, 149, 255);
                width: 5px;
                height: 100%;
                border-radius: 99px;
                transition: width 0.2s ease
            }
            
            #dragger-container:active div {
                width: 10px;
            }
        </style>
        <slot name="first"></slot>
        <div id="dragger-container">
            <div></div>
        </div>
        <slot name="second"></slot>
        `

        // Getting the Dragger
        this.dragger = shadow.querySelector('#dragger-container')
        this.dragger.style.width = this.config.draggerwidth + 'px'

        this.config.draggerwidth = this.dragger.getBoundingClientRect().width
        this.draggerClicked = false

        // Get the two children
        this.firstEl = this.children[0]
        this.lastEl = this.children[1]

        // the Slot Attribute for both Elements
        this.firstEl.setAttribute('slot', 'first')
        this.lastEl.setAttribute('slot', 'second')


        // Set the State with the saved infos if desired or set them at the desired start position.
        if (this.config.preserve) {
            this.dragger.style.left = localStorage.getItem(`${this.config.preserve}_dPos`) || null;
            this.firstEl.style.width = localStorage.getItem(`${this.config.preserve}_fPos`) || null;
            this.lastEl.style.width = localStorage.getItem(`${this.config.preserve}_lPos`) || null;

            this.draggerClicked = true
            let coordinateOfMiddle = this.dragger.getBoundingClientRect().x + (this.dragger.getBoundingClientRect().width / 2)
            this.moveCallback({ x: coordinateOfMiddle })
            this.draggerClicked = false

        } else {
            this.draggerClicked = true
            let coordinateOfMiddle = this.getBoundingClientRect().x + (this.getBoundingClientRect().width * (this.config.start / 100))
            this.moveCallback({ x: coordinateOfMiddle })
            this.draggerClicked = false
        }

        this.dragger.addEventListener('pointerdown', (ev) => { this.draggerClicked = true; })
        document.addEventListener('pointerup', () => { this.draggerClicked = false; })
        document.addEventListener('pointermove', (ev) => { this.moveCallback(ev) })
    }

    moveCallback(ev) {
        if (!this.draggerClicked) return

        const x = this.getBoundingClientRect().x
        const width = this.getBoundingClientRect().width

        // Calcualate
        const perc = ((ev.x - x) / width) * 100
        const percClamped = this.clamp(perc, this.config.min, this.config.max)

        this.dragger.style.left = `calc(${percClamped}% - ${this.config.draggerwidth / 2}px)`
        this.firstEl.style.width = `calc(${percClamped}% - ${this.config.draggerwidth / 2}px)`
        this.lastEl.style.width = `calc(${100 - percClamped}%  - ${this.config.draggerwidth / 2}px)`

        // Save these Positions in case we need them for the reload
        if (this.config.preserve) {
            localStorage.setItem(`${this.config.preserve}_dPos`, this.dragger.style.left)
            localStorage.setItem(`${this.config.preserve}_fPos`, this.firstEl.style.width)
            localStorage.setItem(`${this.config.preserve}_lPos`, this.lastEl.style.width)
        }
    }

    clamp(val, min, max) {
        if (val > max) return max
        if (val < min) return min
        return val
    }


}

customElements.define('hsplit-container', splitContainer)