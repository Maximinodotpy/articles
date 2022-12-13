function e(tagName, children = '', attributes = []) {
    
    const AttrTypes = Object.freeze({
        Event: Symbol('Event'),
        Id: Symbol('Id'),
        Idx: Symbol('Idx'),
        Class: Symbol('Class'),
        Classx: Symbol('Classx'),
        Normal: Symbol('Normal'),
    })
    
    const AttrTypesRegularExpressions = {
        Event: /on[^:]*(:.*)?/g,
        Id: /^id$/g,
        Idx: /^idx$/g,
        Class: /^class$/g,
        Classx: /^classx$/g,
        Normal: /.*/g,
    }

    const returnObject = {
        element: null,
    };

    const tagNameParts = tagName.split('.')

    const element = document.createElement(tagNameParts[0])
    returnObject.element = element;

    let extraClasses = tagNameParts.slice(1)
    if (extraClasses.length != 0) element.classList.add(...extraClasses)
    
    // Add Attributes
    addAttributes(attributes)

    // Add Children, depending on their type
    addChildren(children)

    return returnObject

    // Functions
    function camelCaseToHyphens(string) {
        return string.replace(/([A-Z])/gm, '-$1').toLowerCase();
    }

    function addChildren(children) {
        switch (typeof children) {
            case 'string':
                element.innerHTML = children;
                break;
            case 'object':
                for (const child of children) {
                    element.appendChild(child.element);

                    // Search For References and add them to the returnObject
                    for (const attrKey of Object.keys(child)) {
                        if (attrKey == 'element') continue

                        returnObject[attrKey] = child[attrKey];
                    }
                }
                break;
        }
    }

    function getAttributeType(attributeName) {
        for (const attrTypeName of Object.keys(AttrTypesRegularExpressions)) {
            const expression = AttrTypesRegularExpressions[attrTypeName]

            if (!!attributeName.match(expression)) return AttrTypes[attrTypeName]
        }        
    }

    function addAttributes(attributes) {

        for (const attrName of Object.keys(attributes)) {
            const attrValue = attributes[attrName];

            const attrType = getAttributeType(attrName);
   
            switch (attrType) {
                case AttrTypes.Normal:
                    element.setAttribute(camelCaseToHyphens(attrName), attrValue);
                    break;

                case AttrTypes.Id:
                    element.setAttribute(camelCaseToHyphens(attrName), attrValue);
                case AttrTypes.Idx:
                    returnObject[attrValue] = element
                    break;
                
                case AttrTypes.Classx:
                    returnObject[attrValue] = element

                case AttrTypes.Class:
                    const classes = typeof attrValue == 'string' ? [attrValue, ] : attrValue
                    element.classList.add(...classes);
                    break

                case AttrTypes.Event:
                    const eventNameParts = attrName.split(':')
        
                    const eventName = eventNameParts[0].slice(2, attrName.length).toLowerCase()
                    const eventModifier = eventNameParts[1] || ''
        
                    element.addEventListener(eventName, (event) => {
                        if (eventModifier) {
                            if (event[eventModifier]) attrValue(event, element)
                        } else attrValue(event, element)
                    })
                    break
            }
        }
    }
}