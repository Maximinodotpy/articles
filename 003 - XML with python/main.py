# Making New Elements and adding attributes
# ...

# Saving the XMl
# ... doc.toxml()
with open('file.xml', 'w') as f:
    f.write(doc.toxml())

# Other Useful stuff
# ...

# Getting the root element of the document (if there is any)
root = doc.documentElement
print(root)