

for (const table of document.querySelectorAll('[data-sortable]')) {
    const tbody = table.querySelector('tbody');
    let columnHeads = Array.from(table.querySelectorAll('thead tr th, thead tr td'))


    columnHeads.forEach((columnHead, i) => {

        columnHead.addEventListener('pointerdown', () => {

            // Get current state (asc, desc or none)
            const state = columnHead.getAttribute('data-sortable-state')

            // Loop over each row and save value of cell with corresponding column name
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            let organisedData = rows.map((ele) => {
                let value = ele.querySelectorAll('td')[i].innerHTML

                // If the value is a valid number it should save the float value
                if (!isNaN(value)) value = parseFloat(value)

                return {
                    element: ele,
                    'value': value
                }
            })

            // Set the new state essentialy toggling ascending / descending
            // sort organised data either ascending or descending by the value key
            if (state === 'asc') {
                columnHead.setAttribute('data-sortable-state', 'desc')

                organisedData = organisedData.sort((a, b) => (a.value < b.value) ? 1 : -1)
            } else {
                columnHead.setAttribute('data-sortable-state', 'asc')

                organisedData = organisedData.sort((a, b) => (a.value > b.value) ? 1 : -1)
            }

            // Update the content of the Table Body with the sorted Array
            tbody.innerHTML = '';
            for (const row of organisedData) {
                tbody.appendChild(row.element);
            }

            // Reset the Attributes for the other Heads
            columnHeads.forEach(otherColumnHead => {
                if (otherColumnHead != columnHead) {
                    otherColumnHead.setAttribute('data-sortable-state', '')
                }
            })
            
        })
    })
}