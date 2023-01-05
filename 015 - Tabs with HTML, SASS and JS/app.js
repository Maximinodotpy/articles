


const repls = [
    [/(sass)/gi, 'https://sass-lang.com/'],
    [/(css)/gi, 'https://www.w3schools.com/Css/'],
]

for (let repl of repls) {
    document.body.innerHTML = document.body.innerHTML.replace(repl[0], `<a href="${repl[1]}">$1</a>`)
}





Array.from(document.querySelectorAll('.tabs')).forEach((tab_container, TabID) => {
    const registers = tab_container.querySelector('.tab-registers');
    const bodies = tab_container.querySelector('.tab-bodies');

    let activeRegister = registers.querySelector('.active-tab');
    activeRegister = activeRegister ? activeRegister : registers.children[0]
    activeRegister.classList.add('active-tab')

    changeBody()

    Array.from(registers.children).forEach((el, i) => {

        el.setAttribute('aria-controls', `${TabID}_${i}`)


        bodies.children[i]?.setAttribute('id', `${TabID}_${i}`)

        el.addEventListener('click', (ev) => {

            activeRegister.classList.remove('active-tab')

            activeRegister = el;

            activeRegister.classList.add('active-tab')

            changeBody()
        })
    })


    function changeBody() {
        Array.from(registers.children).forEach((el, i) => {
            if (bodies.children[i]) {
                bodies.children[i].style.display = el == activeRegister ? 'block' : 'none'
            }

            el.setAttribute('aria-expanded', el == activeRegister ? 'true' : 'false')
        })
    }

})