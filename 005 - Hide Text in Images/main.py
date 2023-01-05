# Imports
from PIL import Image
from argparse import ArgumentParser
import string

# Command Line Arguments
parser = ArgumentParser()

# Keep in mind this will only work with uncompressed images (png)
parser.add_argument('path')
parser.add_argument('-mode', default="read")
parser.add_argument('-text')
    
arguments = parser.parse_args()

# Open the image.
image = Image.open(arguments.path)

# Get the image size and save it.
width, height = image.size

startingPixel = (10, 10, 255)
endingPixel = (255, 20, 20)

# Dictionary which hold the relations between pixels and characters
lettersToPixels = {}
pixelsToLetters = {}

# Making the relations using the string library
for i, letter in enumerate(string.ascii_letters + string.digits + ' '):
    lettersToPixels[letter] = i
    pixelsToLetters[i] = letter


if arguments.mode == "write":
    if arguments.text != None:

        # check if the string would exceed the maximum ( width )
        assert len(arguments.text) < width

        # Draw the starting Pixel
        image.putpixel((0, 0), startingPixel)

        # Draw a pixel for each letter in the test
        for index, letter in enumerate(arguments.text):

            # The Middle value (g = green) is the number in the dictionary
            image.putpixel((index+1, 0), (11, lettersToPixels[letter], 11))

        # Draw the ending Pixel
        image.putpixel((index+2, 0), endingPixel)

        # Save the image to the same place
        image.save(arguments.path)

elif arguments.mode == "read":
    text = ''

    index = 1
    while True:

        # Loop throug each pixel in the top row
        pixel = image.getpixel((index, 0))

        # if the pixel is the ending pixel we break the loop
        if pixel == endingPixel:
            break

        try:
            # Get the letter from the dictionary with the g (green) value.
            text += pixelsToLetters[pixel[1]]
        except:
            pass

        index += 1

    # Print out the text
    print(text)