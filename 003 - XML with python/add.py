from xml.dom import minidom

# the parse function returns the Document Objects
doc = minidom.parse('file.xml')


employees = doc.getElementsByTagName('employees')[0]

for i in employees.getElementsByTagName('employee'):
    i.setAttribute('password', '000000')

    # Make a new element / node
    newNode = doc.createElement('salary')

    # append it to this element / node
    i.appendChild(newNode)

# Get the xml of the document with the toxml function
# We can use this to save the document
print(doc.toxml())