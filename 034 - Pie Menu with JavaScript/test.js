let active = false;


document.body.addEventListener('contextmenu', (event) => {
    event.preventDefault()

    if (active) return;

    active = true;

    let piemenu = new PieMenu([
        { 
            name: 'Cut',
            callback: () => {
                console.log('Cut');
                piemenu = ''
                active = false;
            }
        },
        { 
            name: 'Copy',
            callback: () => {
                console.log('Copy');
                active = false;
            }
        },
        { 
            name: 'Copy',
            callback: () => {
                console.log('Copy');
                active = false;
            }
        },
        { 
            name: 'Copy',
            callback: () => {
                console.log('Copy');
                active = false;
            }
        },
        { 
            name: 'Copy',
            callback: () => {
                console.log('Copy');
                active = false;
            }
        },
        { 
            name: 'Copy',
            callback: () => {
                console.log('Copy');
                active = false;
            }
        },
        { 
            name: 'Copy',
            callback: () => {
                console.log('Copy');
                active = false;
            }
        },
        { 
            name: 'Copy',
            callback: () => {
                console.log('Copy');
                active = false;
            }
        },
    ], [event.x, event.y], document.body, () => {
        active = false;
    })
});