function runTour(tourList) {
    let currentIndex = 0
    const panelMargin = 10
    const indicatorPadding = 5

    // Create Elements
    const wrapperNode = document.createElement('div')
    wrapperNode.classList.add('tourElementWrapper')

    const indicatorNode = document.createElement('div')
    indicatorNode.classList.add('indicator')
    wrapperNode.appendChild(indicatorNode)

    const panelNode = document.createElement('div')
    panelNode.classList.add('panel')
    wrapperNode.appendChild(panelNode)

    const titleNode = document.createElement('h2')
    panelNode.appendChild(titleNode)

    const textNode = document.createElement('p')
    panelNode.appendChild(textNode)

    // Bottom Button Bar
    let buttonBar = document.createElement('div')
    buttonBar.classList.add('buttonBar')
    panelNode.appendChild(buttonBar)

    const previousButtonNode = document.createElement('button')
    previousButtonNode.innerHTML = 'Previous'
    buttonBar.appendChild(previousButtonNode)
    
    const counterNode = document.createElement('div')
    buttonBar.appendChild(counterNode)
    
    const nextButtonNode = document.createElement('button')
    nextButtonNode.innerHTML = 'Next'
    buttonBar.appendChild(nextButtonNode)

    document.body.appendChild(wrapperNode)


    // Place the Panel for the First time
    placePanelAt()

    // Connect Events with Actions
    nextButtonNode.addEventListener('pointerdown', nextSpot)
    previousButtonNode.addEventListener('pointerdown', previousSpot)
    
    window.addEventListener('keydown', (event) => {
        if (['ArrowLeft', 'Backspace'].includes(event.key)) previousSpot()
        if (['ArrowRight', 'Enter'].includes(event.key)) nextSpot()
    })

    window.addEventListener('resize', placePanelAt)

    // Functions
    function nextSpot() {
        if (currentIndex + 1 == tourList.length) {
            panelNode.style.display = 'none';
            indicatorNode.style.display = 'none';
            return
        }
        currentIndex += 1;
        placePanelAt()
    }

    function previousSpot() {
        if (currentIndex - 1 == -1) return
        currentIndex -= 1;
        placePanelAt()
    }

    function placePanelAt() {
        let currentData = tourList[currentIndex];

        const elementGiven = currentData.element != undefined
        
        let { x, y, width, height } = elementGiven ? 
            document.querySelector(currentData.element).getBoundingClientRect()
            :
            {x: 0, y: 0, width: 0, height: 0}

        const left = x - indicatorPadding
        const top = y - indicatorPadding
        const right = x + width + indicatorPadding
        const bottom = y + height + indicatorPadding

        indicatorNode.style.clipPath = `polygon(
            0 0,
            100% 0,
            100% 100%,
            0 100%,
            0px ${bottom}px,
            ${right}px ${bottom}px,
            ${right}px ${top}px,
            ${left}px ${top}px,
            ${left}px ${bottom}px,
            0px ${bottom}px
        )`

        // Change text content of panel
        titleNode.innerHTML = currentData.title
        textNode.innerHTML = currentData.text

        counterNode.innerHTML = `${currentIndex + 1} / ${tourList.length}`

        // Place Info Panel

        let { width: panelWidth, height: panelHeight } = panelNode.getBoundingClientRect()

        if (elementGiven) {
            panelNode.style.top = window.innerHeight / 2 > y ? 
            y + height + panelMargin + 'px'
            :
            y - panelMargin - panelHeight + 'px'
            
            panelNode.style.left = window.innerWidth / 2 > x ?
            x + width + panelMargin + 'px'
            :
            x - panelMargin - panelWidth + 'px'
        } else {
            panelNode.style.top = window.innerHeight / 2 - panelHeight / 2 + 'px'
            panelNode.style.left = window.innerWidth / 2 - panelWidth / 2 + 'px'
        }
    }
}