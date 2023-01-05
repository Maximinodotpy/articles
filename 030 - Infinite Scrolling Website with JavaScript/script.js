const url = 'https://api.thecatapi.com/v1/images/search'
const container = document.querySelector('.pictures')

const ids = [];

const observer = new IntersectionObserver(observerCallback, {
    threshold: 1,
    rootMargin: '500px'
})


addPicture()
observer.observe(container.lastChild)


function observerCallback(entries) {
    if (entries[0].isIntersecting) {
        addPicture()
    }
    observer.unobserve(entries[0].target)
    observer.observe(container.lastChild)
}


async function getPicture() {

    try {
        let r = await fetch(url)
        let j = (await r.json())[0]
        if (ids.includes(j.id)) {
            throw new Error('Image Already Loaded')
        }
        ids.push(j.id)
        return j


    } catch (error) {
        return getPicture()
    }
}


async function addPicture() {

    const wrapper = document.createElement('a')
    wrapper.target = '_blank'
    
    const imgNode = document.createElement('img')
    
    wrapper.appendChild(imgNode)
    container.appendChild(wrapper)

    let cat = await getPicture()
    
    wrapper.href = cat.url
    imgNode.src = cat.url
    
    const ratio = cat.width / cat.height
    if (ratio < 0.8) {
        wrapper.style.gridRow = 'span 2'
    }
}