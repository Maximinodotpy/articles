

for (const table of document.querySelectorAll('[data-sortable]')) {
    const tbody = table.querySelector('tbody');
    let columnNames = Array.from(table.querySelectorAll('thead tr th, thead tr td'))


    columnNames.forEach((el, i) => {

        el.addEventListener('click', () => {

            const state = el.getAttribute('data-sortable-state')

            const rows = Array.from(table.querySelectorAll('tbody tr'));
            let organisedData = rows.map((ele) => {
                let value = ele.querySelectorAll('td')[i].innerHTML

                if (!isNaN(value)) value = parseFloat(value)

                return {
                    element: ele,
                    'value': value
                }
            })

            if (state === 'asc') {
                el.setAttribute('data-sortable-state', 'desc')

                organisedData = organisedData.sort((a, b) => (a.value < b.value) ? 1 : -1)
            } else {
                el.setAttribute('data-sortable-state', 'asc')

                organisedData = organisedData.sort((a, b) => (a.value > b.value) ? 1 : -1)
            }

            tbody.innerHTML = '';
            for (const row of organisedData) {
                tbody.appendChild(row.element);
            }

            // Set all other 
            columnNames.forEach(i => {
                if (i != el) {
                    i.setAttribute('data-sortable-state', '')
                }
            })

        })
    })
}