function runTour(tourList) {
    let currentIndex = 0
    let panelElement
    let panelElementTitle
    let panelElementText
    let panelElementNextButton
    let panelElementPrevButton
    let panelElementTourListCounter

    const panelMargin = 10

    let panelHTML = /* html */`
        <div class="blackener"></div>

        <div id="tourPanel">
            <style>
                #tourPanel {
                    position: fixed;
                    top: 100px;
                    left: 100px;
                    background-color: white;
                    box-shadow: 0 0 3px black;
                    border-radius: 4px;
                    padding: 1rem;
                    width: 200px;
                    font-family: 'Segoe Ui';

                    transition-property: top left;
                    transition-duration: 0.5s;
                    transition-timing-function: ease;
                }

                h2 {
                    margin-top: 0;
                }

                .buttons {
                    display: flex;
                    justify-content: space-between;
                }

                .next, .prev {
                    font: inherit;
                }

                .blackener {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100px;
                    height: 100px;
                    border: 2px solid hsla(0, 50%, 50%, 0.5);
                    box-shadow: 0 0 3px black;

                    transform: scale(1.1);

                    transition-property: top left width weight;
                    transition-duration: 0.5s;
                    transition-timing-function: ease;
                }

            </style>


            <h2 class="title">title</h2>
            <p class="text">text</p>
            <div class="buttons">
                <button class="prevButton">Previous</button>
                <div class="tourListCounter">
                    0 / tourList.lengtt
                </div>
                <button class="nextButton">Next</button>
            </div>

        </div>
    `

    document.body.innerHTML += panelHTML
    panelElement = document.getElementById('tourPanel')
    panelElementTitle = panelElement.querySelector('.title')
    panelElementText = panelElement.querySelector('.text')
    panelElementNextButton = panelElement.querySelector('.nextButton')
    panelElementPrevButton = panelElement.querySelector('.prevButton')
    panelElementTourListCounter = panelElement.querySelector('.tourListCounter')
    blackenerElement = document.querySelector('.blackener')

    placePanelAt()

    // Connect Events with Actions
    panelElementNextButton.addEventListener('pointerdown', nextSpot)
    panelElementPrevButton.addEventListener('pointerdown', previousSpot)
    
    window.addEventListener('keydown', (event) => {
        if (['ArrowLeft', 'Backspace'].includes(event.key)) previousSpot()
        if (['ArrowRight', 'Enter'].includes(event.key)) nextSpot()
    })

    window.addEventListener('resize', () => { placePanelAt(currentIndex) })


    // Functions
    function nextSpot() {
        if (currentIndex + 1 == tourList.length) {
            panelElement.style.display = 'none';
            blackenerElement.style.display = 'none';
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

        let { x, y, width, height } = document.querySelector(currentData.element).getBoundingClientRect()

        // Place Red Indicator Box
        blackenerElement.style.left = x + 'px'
        blackenerElement.style.width = width + 'px'
        blackenerElement.style.top = y + 'px'
        blackenerElement.style.height = height + 'px'

        // Change text content of panel
        panelElementTitle.innerHTML = currentData.title
        panelElementText.innerHTML = currentData.text

        panelElementTourListCounter.innerHTML = `${currentIndex + 1} / ${tourList.length}`

        // Place Info Panel
        let { width: panelWidth, height: panelHeight } = panelElement.getBoundingClientRect()

        panelElement.style.top = window.innerHeight / 2 > y ? 
            y + height + panelMargin + 'px'
            :
            y - panelMargin - panelHeight + 'px'

        panelElement.style.left = window.innerWidth / 2 > x ?
            x + width + panelMargin + 'px'
            :
            x - panelMargin - panelWidth + 'px'
    }
}