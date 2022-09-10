Array.from(document.querySelectorAll('.mdEdit')).forEach((el) => {

    el.setAttribute('title', 'Click to change Markdown content')
    el.setAttribute('tabindex', '0')

    const displayEl = el.querySelector('div');
    const editEl = el.querySelector('input') ? el.querySelector('input') : el.querySelector('textarea');

    if (editEl.tagName == 'TEXTAREA') {
        el.style.height = '300px';
    }

    editEl.addEventListener('change', applyRegex)
    applyRegex()
    
    document.addEventListener('keydown', (ev) => {
        if (ev.key == 'Enter' && document.activeElement == el) {
            editEl.focus()
        } else if (ev.key == 'Escape' && document.activeElement == editEl) {
            console.log('faslkdfj');
            document.activeElement.blur()
        }
    })
    
    el.addEventListener('click', () => {
        editEl.focus();
    })

    function applyRegex() {
        let parsed = editEl.value

        if (editEl.tagName == 'TEXTAREA') {
            parsed = parsed.replace(/^###### (.*)/gm, '<h6>$1</h6>')
            parsed = parsed.replace(/^##### (.*)/gm, '<h5>$1</h5>')
            parsed = parsed.replace(/^#### (.*)/gm, '<h4>$1</h4>')
            parsed = parsed.replace(/^### (.*)/gm, '<h3>$1</h3>')
            parsed = parsed.replace(/^## (.*)/gm, '<h2>$1</h2>')
            parsed = parsed.replace(/^# (.*)/gm, '<h1>$1</h1>')

            parsed = parsed.replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2">$1</a>')

            parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
        }

        parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        parsed = parsed.replace(/\*(.*?)\*/g, '<i>$1</i>')
        parsed = parsed.replace(/_(.*?)_/g, '<sub>$1</sub>')
        parsed = parsed.replace(/~(.*?)~/g, '<del>$1</del>')
        parsed = parsed.replace(/\^(.*?)\^/g, '<sup>$1</sup>')
        parsed = parsed.replace(/`(.*?)`/g, '<code>$1</code>')

        displayEl.innerHTML = parsed
    }
})