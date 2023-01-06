# Edit XML with python
**How to edit XML files with python using the dom class**

Today we learn how to edit XML files with python. To do this we use the `xml.dom.minidom` class from python. We don't have to install it because it comes with python. We will learn how to parse, get and set elements and attributes and how to save XML in this article.

## XML File

In the following code block, you see the content of the XML file. We will use this in the other code blocks of this little tutorial so keep it in mind.

```xml
<?xml version="1.0"?>
<company>
	<info  name="maximmaeder.com"></info>
	<employees>
		<employee  id="1"  name="John"></employee>
		<employee  id="2"  name="Marc"></employee>
		<employee  id="3"  name="Seth"></employee>
	</employees>
</company>
```

## Parsing XML with `xml.dom.minidom`

To parse an XML file or XML string we import `minidom` from `xml.dom`.

```python
from xml.dom import minidom
```

This module then has a `parse()` function which gets a file path and it will return document objects which we will use from now on.

```python
# the parse function returns the Document Objects
# parseString is also possible
doc = minidom.parse('file.xml')
```

## Get elements and attributes

Let us start by getting elements and attribute values from them. To get an element or there I say a list of the element we need the `getElementsByTagName()` function which returns as the function says a list of all elements with the specified tag name.

In our case, this is the `employees` tag which has all the `employee` tags as children. We get the first item of the list with `[0]` because it will always return a list even if it has only one item.

```python
# Get elements with getElementsByTagName function
# Return list of elements
employees = doc.getElementsByTagName('employees')[0]
```

After that, we use this variable which contains a so-called node which is just one tag. We can also use the `getElementByTagName()` function on this object to get nodes with the tag name which are children of this node.

We loop through these.

```python
# Loop through the employee tags which are within the emplyees tag
for i in employees.getElementsByTagName('employee'):
```

In the loop, we continue by getting the value of the `id` and `name` attributes with the `getAttribute()` method of the node class. If the attribute does not exist it will simply return `""`.

```python
    # Get the value of their id and name attributes
    id = i.getAttribute('id')
    name = i.getAttribute('name')
```

Last but not least we print out these two pieces of information in a nicely formatted string.

```python
    # Print them
    print(f'{id} : {name}')
```

running the code will result in this.

```
1 : John
2 : Marc
3 : Seth
```

Now you know how to get elements and attributes. In the next part, we see how to create elements and set their attributes.

## Set elements and attributes

Now we will look at how to make elements and set/add attributes. We insert this code in the loop we have created above.

We start with the attributes because it is really easy, we just call the `setAttribute()` method on the node and we give it the attribute name and the value. You see below we set the password for each employee to `000000`. If the attribute does not exist it will simply add it.

```python
	i.setAttribute('password', '000000')
```

To make a new element we need to do two things. First, we create a new element with the `createElement()` method on the document object.

```python
    # Make a new element / node
    newNode = doc.createElement('salary')
```

And then we append the resulting element to the node of our choice with the `appendChild()` method.

```python
    # append it to this element / node
    i.appendChild(newNode)
```

After the loop, we also add a print statement with `doc.toxml()` so we see what the new structure looks like.

```python
print(doc.toxml())
```

running the code will result in something like this. As you see each employee now has a password and an empty salary tag as a child. But this will not be saved.

```xml
<?xml version="1.0" ?><company>
        <info name="maximmaeder.com"/>
        <employees>
                <employee id="1" name="John" password="000000"><salary/></employee>
                <employee id="2" name="Marc" password="000000"><salary/></employee>
                <employee id="3" name="Seth" password="000000"><salary/></employee>
        </employees>
</company>
```

## Saving XML

Saving XML is nothing special we do it like with every other text-based file. We open it with the context manager and then we write the XML from the document to it.

```python
with open('file.xml', 'w') as f:
	f.write(doc.toxml())
```

## Conclusion

Excellent! Now you know how to parse XML with python. This is a very useful skill because XML is useful everywhere.