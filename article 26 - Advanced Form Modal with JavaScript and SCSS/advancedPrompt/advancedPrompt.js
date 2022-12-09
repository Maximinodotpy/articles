
function advancedPrompt(parameters) {

    // Destructure Arguments
    const {
        fieldData: _fieldData = [],
        title: _title = 'Modal',
        submitNodeText: _submitNodeText = 'Submit',
        panelHeight: _panelHeight = 500,
        canBeCancelled: _canBeCancelled = true,
        text: _text = ''
    } = parameters

    // Create Elements
    // Modal Wrapper which will take up the entire Screen
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'modalWrapper';

    // The Modal itself which is also a form
    const modalPanel = document.createElement('form');
    modalPanel.className = 'modalPanel'
    modalPanel.style.height = _panelHeight + 'px'
    modalWrapper.appendChild(modalPanel);

    // The Title showing what this modal is for
    const titleNode = document.createElement('div');
    titleNode.className = 'modalTitle';
    titleNode.innerHTML = _title;
    modalPanel.appendChild(titleNode);

    // The Text which further describes the modal.
    const textNode = document.createElement('div');
    textNode.innerHTML = _text;
    modalPanel.appendChild(textNode);

    // Fields
    // we add a wrapper / container that will hold all the fields
    const fieldsWrapper = document.createElement('div');
    fieldsWrapper.className = 'fieldsWrapper'
    modalPanel.appendChild(fieldsWrapper);

    // For each given field we add a Row Element with a label and an Input
    for (const field of _fieldData) {
        const attributes = field.attributes || []

        const inputRow = document.createElement('div');
        inputRow.className = 'inputRow';

        const label = document.createElement('label')
        label.innerHTML = field.title

        const input = document.createElement('input')
        input.value = field.value || ''
        input.type = field.type

        for (const attribute of attributes) {
            input.setAttribute(attribute.name, attribute.value)
        }

        field.element = input;

        inputRow.appendChild(label)
        inputRow.appendChild(input)

        fieldsWrapper.appendChild(inputRow)
    }

    // Actions Panel with submit and cancel button
    const actionsWrapper = document.createElement('div');
    actionsWrapper.className = 'actionBar'
    modalPanel.appendChild(actionsWrapper);

    const cancelNode = document.createElement('button');
    cancelNode.className = 'cancelButton'
    cancelNode.innerHTML = 'Cancel'

    if (_canBeCancelled) actionsWrapper.appendChild(cancelNode);

    const submitNode = document.createElement('input');
    submitNode.type = 'submit'
    submitNode.className = 'submitButton'
    submitNode.value = _submitNodeText;
    actionsWrapper.appendChild(submitNode);

    document.body.appendChild(modalWrapper);

    // Return Promise
    return new Promise((resolve, reject) => {

        modalPanel.addEventListener('submit', (event) => {
            event.preventDefault();


            // Gather all values from the Form and store with the 
            // Specified name
            let returnObject = {}

            for (const field of _fieldData) {
                returnObject[field.name] = field.element.files || field.element.value
            }

            // Resolve the promise with the Data
            resolve(returnObject)
            modalWrapper.remove()
        })

        cancelNode.addEventListener('pointerdown', rejectPromise)

        window.addEventListener('keydown', (event) => {
            if (event.key == 'Escape' && _canBeCancelled) rejectPromise()
        })

        function rejectPromise() {
            modalWrapper.remove()
            reject('User Cancelled')
        }
    })
}