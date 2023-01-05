let currentData = {}

const paddingLeftGraph = 60
const height_exxagaration = 7
const LabelStepsY = 5

const dataContainer = document.querySelector('.data')
const lableContainer = document.querySelector('.lables')
const citySelect = document.querySelector('.countrySelect')
const svgElement = document.getElementById('graph-svg')

let container_width = svgElement.getBoundingClientRect().width - paddingLeftGraph
let container_height = svgElement.getBoundingClientRect().height
let step_multiplier = container_width / 168


async function request(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function DrawData() {
    let poly = `<polygon fill="url(#gradient)" points="${paddingLeftGraph},${container_height} INSERT_POINTS ${container_width + paddingLeftGraph},${container_height}"></polygon>`
    let positions = ''

    const temps = currentData.hourly.temperature_2m

    let index = 0
    temps.forEach(temperature => {
        positions = positions + ` ${index * step_multiplier + paddingLeftGraph},${container_height - temperature * height_exxagaration}`

        index++
    })

    poly = poly.replace('INSERT_POINTS', positions)

    dataContainer.innerHTML = poly
}

function drawLables() {

    let verticalLinesString = ''
    for (let index = 0; index < 50; index += LabelStepsY) {
        let height = container_height - index * height_exxagaration
        verticalLinesString = verticalLinesString + `<line x1="0" y1="${height}" x2="1000" y2="${height}" class="line" /><text x="0" y="${height}">${index} °C</text>`
    }

    let dayIndex = 0
    for (let index = 0; index < 169; index += 24) {

        let daytext
        if (dayIndex == 0) {
            daytext = 'Today'
        }
        else if (dayIndex == 1) {
            daytext = 'Tomorrow'
        }
        else {
            var date = new Date();
            date.setDate(date.getDate() + dayIndex);

            daytext = getWeekDay(date)
        }

        let width = index * step_multiplier + paddingLeftGraph
        verticalLinesString = verticalLinesString + `<line x1="${width}" y1="50" x2="${width}" y2="1000" class="line"/><text x="${width}" y="${container_height - 5}">${daytext}</text>`

        dayIndex++
    }

    lableContainer.innerHTML = verticalLinesString
}

function getWeekDay(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}

function changeLocation() {    
    console.log(citySelect.value);

    let currentCityEl = citySelect.querySelector(`[value="${citySelect.value}"]`)
    
    let lat = currentCityEl.getAttribute('data-lat')
    let lon = currentCityEl.getAttribute('data-lon')

    let requestString = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
    
    request(requestString).then((data) => {
        currentData = data
        DrawData(currentData)
    })

}

function setSize() {
    let size = svgElement.getBoundingClientRect()
    
    container_width = size.width - paddingLeftGraph
    step_multiplier = container_width / 168
    
    DrawData()
    drawLables()
}


citySelect.addEventListener('change', changeLocation)
window.addEventListener('resize', setSize, false);

changeLocation()
drawLables()