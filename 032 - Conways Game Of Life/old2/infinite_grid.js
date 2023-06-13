function addInfiniteGrid(root) {
    const size = 30;
    const margin = 5;
    const observer = new IntersectionObserver(observeCallback, { threshold: 0.5 })
    const rootDimensions = root.getBoundingClientRect()
    /* root.style.position = 'absolute' */
    /* root.style.overflow = 'hidden' */
    /* root.style.width = '100vh'
    root.style.height = '100vw' */
    
    rootOffset = {
        x: 0,
        y: 0,
    }
    /* root.style.left = `${rootOffset.x}px`
    root.style.top = `${rootOffset.y}px` */

    currentWidth = 2
    currentHeight = 2
    currentLowest = 0

    root.addEventListener('pointermove', (event) => {
        /* if (event.buttons == 1) {
            rootOffset.x += event.movementX
            rootOffset.y += event.movementY

            root.style.left = `${rootOffset.x}px`
            root.style.top = `${rootOffset.y}px`
        } */
    })

    /* const boundingTiles = {
        top: null,
        bottom: null,
        left: null,
        right: null,
    } */

    for (let x = 0; x <= 2; x++) {
        for (let y = 0; y <= 2; y++) {
            createTile(x, y)
        }
    }

    /* boundingTiles.top = root.querySelector('[data-pos="1,0"]')
    boundingTiles.bottom = root.querySelector('[data-pos="1,2"]') */
    
    /* console.log(boundingTiles); */
    
    function observeCallback(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            
                const tileY = parseInt(entry.target.getAttribute('data-pos-y'))

                if (tileY == currentHeight) {
                    /* console.log('Bottom Row Visible'); */
                    
                    currentHeight += 1
                    
                    for (let x = 0; x <= currentWidth; x++) {
                        createTile(x, tileY + 1)
                    }
                }

                /* console.log(currentYOffset); */
                console.log(tileY == currentLowest, entry.target);
                if (tileY == currentLowest) {
                    console.log('Top Row Visible');
                    
                    /* currentHeight -= 1 */
                    
                    for (let x = 0; x <= currentWidth; x++) {
                        createTile(x, tileY - 1)
                    }
                }
            }
        })
    }

    function createTile(x, y) {
        const tileNode = document.createElement('div')

        tileNode.style.backgroundColor = 'grey'
        tileNode.style.width = size + 'px'
        tileNode.style.height = size + 'px'
        tileNode.style.position = 'absolute'
        tileNode.style.top = (y * size + margin * y) + 'px'
        tileNode.style.left = (x * size + margin * x) + 'px'

        tileNode.setAttribute('data-pos', `${x},${y}`)
        tileNode.setAttribute('data-pos-x', x)
        tileNode.setAttribute('data-pos-y', y)

        root.appendChild(tileNode)

        observer.observe(tileNode)
    }
}


class InfiniteGrid extends HTMLElement {
    connectedCallback() {
        this.size = this.getAttribute('size') ?? 50
        this.margin = this.getAttribute('margin') ?? 5

        this.style.paddingTop = '100px'

        this.lowest = 2
        this.highest = 0

        // Pass the Callback as an Arrow function in order to preserve this.
        this.observer = new IntersectionObserver((entries) => { this.observerCallback(entries) })

        for (let x = 0; x <= 2; x++) {
            for (let y = 0; y <= 2; y++) {
                this.createTile(x, y);
            }
        }

        /* this.addEventListener('pointermove', event => {
            
            if (!event.buttons == 1) return
            console.log(event);

            for (const child of this.children) {
                let [x, y] = [
                    child.getAttribute('data-pos-x'),
                    child.getAttribute('data-pos-y'),
                ]

                child.style.left = (x * this.size + this.margin * x) + event.movementX + 'px'                
                child.style.top = (y * this.size + this.margin * y) + event.movementY + 'px'
            }
        }) */
    }

    observerCallback(entries) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            const tileX = entry.target.getAttribute('data-pos-x')
            const tileY = entry.target.getAttribute('data-pos-y')

            if (tileY == this.lowest) {
                console.log('Lowest Reached');
                this.createRow(this.lowest + 1);
                this.lowest++
            }
            if (tileY == this.highest) {
                console.log('Highest Reached');
                this.createRow(this.highest - 1);
                this.highest--
            }

        })
    }

    createTile(x, y) {
        const tileNode = document.createElement('div')

        tileNode.style.backgroundColor = 'hsl(0, 0%, 15%)'
        tileNode.style.width = this.size + 'px'
        tileNode.style.height = this.size + 'px'
        tileNode.style.position = 'absolute'
        tileNode.style.fontSize = '0.5rem'
        tileNode.style.padding = '0.3rem'
        tileNode.style.boxSizing = 'border-box'
        tileNode.style.userSelect = 'none'
        tileNode.style.top = (y * this.size + this.margin * y) + 'px'
        tileNode.style.left = (x * this.size + this.margin * x) + 'px'

        tileNode.setAttribute('data-pos', `${x},${y}`)
        tileNode.setAttribute('data-pos-x', x)
        tileNode.setAttribute('data-pos-y', y)

        tileNode.innerHTML = `${x}.${y}`

        this.appendChild(tileNode)

        this.observer.observe(tileNode)
    }

    createRow(y) {
        for (let x = 0; x <= 2; x++) {
            this.createTile(x, y);
        }
    }
}

customElements.define('infinite-grid', InfiniteGrid)