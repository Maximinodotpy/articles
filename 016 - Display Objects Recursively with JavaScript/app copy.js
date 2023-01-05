



function renderJson({root = '', data, depth = 0} = {}) {

    if (depth == 0 && root == '') {
        const pre = document.createElement('pre')
        const ul = document.createElement('ul')

        pre.appendChild(ul)
        root = ul
        document.body.appendChild(pre)
    }
    else {
        root.innerHTML = ''
    }

    for (d in data) {
        if (typeof data[d] == 'object' && data[d] != null) {
            let el = document.createElement('details')

            let appendedString = Array.isArray(data[d]) ? `Array, ${data[d].length}` : 'Object'

            el.innerHTML = `<summary class="titleStyle">${d} <span class="titleStyleDescription">(${appendedString})<span></summary>`

            let summaryEl = el.querySelector('summary')

            const newRoot = document.createElement('ul')

            let laterData = data[d]
            let clicked = false

            el.appendChild(newRoot)

            summaryEl.addEventListener('click', () => {
                if ( !el.hasAttribute('open') ) {
                    renderJson({
                            root: newRoot,
                            data: laterData,
                            depth: depth + 1
                        }) 
                    clicked = true
                }
                else {
                    newRoot.innerHTML = ''
                }
            })

            root.appendChild(el)
        }
        else {
            let currentType = typeof data[d]
            let el = document.createElement('li')
            let display = null
            
            switch (currentType) {
                case 'object':
                    display = 'null'
                    break;
                default:
                    display = data[d]
                    break;
            }

            let titleSpan = document.createElement('span')
            let contentSpan = document.createElement('span')
            let detailsContentSpan = document.createElement('span')

            titleSpan.innerText = `${d}: `
            titleSpan.classList.add('titleStyle')

            contentSpan.innerText = display
            contentSpan.classList.add(currentType)

            detailsContentSpan.innerText = `   Type: ${currentType}; Length: ${display?.length}; Boolean: ${Boolean(display)}`
            detailsContentSpan.classList.add('moreDetails')

            el.appendChild(titleSpan)
            el.appendChild(contentSpan)
            el.appendChild(detailsContentSpan)

            root.appendChild(el)
        }
    }
}


const testData = {
    'Name': 'Maxim',
    'Pablo': 'Maxim ist <b>cool</b>',
    'Age': 19,
    'Ageee': true,
    'Ageefasdfe': null,
    'fasdAgeee': undefined,
    'hobbies': ['Programming', 'Pizza'],
    'hobbi': ['Programming', 'Pizza'],
    'ddd': {
        'Name': 'Maxim',
        'Pablo': 'Maxim',
        'Age': 19,
        'hobbies': ['Programming', 'Pizza'],
        'hobbi': ['Programming', 'Pizza'],
        'ddd': {
            'fas': `flaskdjfölaskjdf`
        }   
    }
}

renderJson({data: window, root: document.querySelector('.uu')})
console.log(window);