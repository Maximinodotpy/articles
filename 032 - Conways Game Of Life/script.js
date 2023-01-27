const playground = document.querySelector('.playground');
const runButton = document.querySelector('#run')
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')
const frametimeInput = document.querySelector('#frametime')
const controlsContainer = document.querySelector('.controls')

let isRunning = false;
let intervalId;

const rows = 50
const columns = 70

let gridData = []
let savedData;

for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
        gridData.push({
            row: row,
            column: column,
            live: false,
        })
    }
}

playground.style.gridTemplateColumns = `repeat(${columns}, var(--size))`

renderCells(gridData)

runButton.addEventListener('pointerdown', () => {
    isRunning = true;
    controlsContainer.classList.add('is_running')
    savedData = JSON.stringify(gridData)

    const simulateGeneration = () => {

        const copiedGridData = JSON.parse(JSON.stringify(gridData))

        /* Make a copy so the state is the same for all cells */
        copiedGridData.forEach((copiedCell, index) => {

            cell = gridData.find(o => o.row == copiedCell.row && o.column == copiedCell.column)
            
            const adjacentCells = [
                /* Top and Bottom */
                copiedGridData.find(o => o.row == cell.row + 1 && o.column == cell.column)?.live ?? false,
                copiedGridData.find(o => o.row == cell.row - 1 && o.column == cell.column)?.live ?? false,

                /* Left and Right */
                copiedGridData.find(o => o.column == cell.column + 1 && o.row == cell.row)?.live ?? false,
                copiedGridData.find(o => o.column == cell.column - 1 && o.row == cell.row)?.live ?? false,
                
                /* Bottom Left and Right */
                copiedGridData.find(o => o.column == cell.column - 1 && o.row == cell.row + 1)?.live ?? false,
                copiedGridData.find(o => o.column == cell.column + 1 && o.row == cell.row + 1)?.live ?? false,

                /* Top Left and Right */
                copiedGridData.find(o => o.column == cell.column - 1 && o.row == cell.row - 1)?.live ?? false,
                copiedGridData.find(o => o.column == cell.column + 1 && o.row == cell.row - 1)?.live ?? false,
            ].filter(Boolean).length;


            if (adjacentCells == 3) {
                cell.live = true;
            }
            if (adjacentCells <= 1) {
                cell.live = false;
            }
            if (adjacentCells >= 4) {
                cell.live = false;
            }
        });

        renderCells()
    }
    simulateGeneration()

    const time = parseInt(frametimeInput.value) || 250
    console.log(time);

    intervalId = setInterval(simulateGeneration, time)
})

stopButton.addEventListener('pointerdown', () => {
    console.log('Stopping Simulation ...');
    controlsContainer.classList.remove('is_running')

    clearInterval(intervalId);
    isRunning = false;

    gridData = JSON.parse(savedData)

    renderCells();
})

resetButton.addEventListener('pointerdown', () => {
    gridData.map(o => o.live = false);
    renderCells()
})

function renderCells() {
    playground.innerHTML = ''
    console.log(gridData);

    gridData.forEach(cellData => {
        const cellNode = document.createElement('div')

        cellNode.classList.add('cell')
        cellNode.classList.toggle('live', cellData.live)

        playground.appendChild(cellNode)
        
        if ( isRunning ) return
        cellNode.addEventListener('pointerdown', () => {
            cellData.live = !cellData.live;
            renderCells()
        })
    });
}



