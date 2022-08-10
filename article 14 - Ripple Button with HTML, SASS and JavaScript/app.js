Array.from(document.querySelectorAll('.ripple-button')).forEach((el) => {
    console.log(el);

    el.addEventListener('click', (event) => {
        let width = 10

        let span = document.createElement('span');
        span.classList.toggle('ripple')

        span.style.left = event.layerX - width / 2 + 'px';
        span.style.top = event.layerY - width / 2 + 'px';

        el.appendChild(span);

        window.setTimeout(() => {
            span.remove()
        }, 700)
    })
})