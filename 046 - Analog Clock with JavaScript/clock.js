const clockNode = document.getElementById('clock')
const svgNode = document.querySelector('svg')
const handsContainer = document.getElementById('hands')

const numTimes = 60
for (i = 0; i < numTimes; i++) {
    const handRotationOffset = 360 / numTimes

    if ((i % 15 == 0 || i == 0) && numTimes != i + 1) {
        console.log('15er');
        addHand({ rotation: i * handRotationOffset, color: 'hsl(0, 0%, 80%)', width: 15 })
    } else if (i % 5 == 0 && numTimes != i + 1) {
        console.log('5er');
        addHand({ rotation: i * handRotationOffset, color: 'hsl(0, 0%, 40%)', width: 12 })
    }
    else {
        addHand({ rotation: i * handRotationOffset, color: 'hsl(0, 0%, 30%)' })
    }
}

const secondHand = addHand({ color: 'hsl(0, 0%, 90%)', width: 40, x: 0, height: 1 })
const minuteHand = addHand({ color: 'hsl(0, 0%, 90%)', width: 25, x: 0, height: 1.5 })
const hourHand = addHand({ color: 'hsl(0, 0%, 90%)', width: 15, x: 0, height: 2 })

render()
function render() {
    const time = new Date()

    const secondsDegrees = (time.getSeconds() * 6) + 90;
    const minutesDegrees = (time.getMinutes() * 6) - 90;
    const hoursDegrees = (time.getHours() * 30) - 90;
    
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`

    requestAnimationFrame(render)
}


function addHand({ width = 10, height = 1.5, x = 35, rotation = 0, color = 'black' } = {}) {
    const handNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    const handNodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')

    handNode.setAttribute('width', width)
    handNode.setAttribute('height', height)
    handNode.setAttribute('x', x)
    handNode.setAttribute('fill', color)

    handNodeGroup.style.transform = `rotate(${rotation - 90}deg)`
    handNodeGroup.style.transformOrigin = `0px ${height / 2}px`
    handNodeGroup.style.translate = `0px -${height / 2}px`

    handNodeGroup.appendChild(handNode)

    svgNode.appendChild(handNodeGroup)

    return handNodeGroup
}