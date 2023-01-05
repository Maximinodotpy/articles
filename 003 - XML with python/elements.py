from xml.dom import minidom

# the parse function returns the Document Objects
doc = minidom.parse('file.xml')


# Get elements with getElementsByTagName function
# Return list of elements
employees = doc.getElementsByTagName('employees')[0]


# Loop through the employee tags which are within the emplyees tag
for i in employees.getElementsByTagName('employee'):

    # Get the value of their id and name attributes
    id = i.getAttribute('id')
    name = i.getAttribute('name')

    # Print them
    print(f'{id} : {name}')