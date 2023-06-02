import os
import glob
import pathlib as pl
""" import cairo """
import re

print("Creating placeholder images...")

foundMarkdownFiles = glob.glob('**/_blog/article.md', recursive=True)

for file in foundMarkdownFiles:
    articleDirectory = pl.Path(file).parent
    potentialThumbnailPath = articleDirectory / pl.Path('preview.png')

    if (not os.path.exists(potentialThumbnailPath)):
        print("No thumbnail found for " + str(articleDirectory))
        continue

        txt = open(file).read()
        x = re.findall("name: ?'?([a-zA-Z ]*)'?", txt)
        name = x[0]

        surface = cairo.SVGSurface('bin/example.svg', 1000, 500)

        # creating a cairo context object for SVG surface
        # using Context method
        context = cairo.Context(surface)
    


        # Creating a liner gradient object.
        lg1 = cairo.LinearGradient(0.0, 0.0, 0, 500)
        lg1.add_color_stop_rgba(0, 0, 0, 0, 1)
        lg1.add_color_stop_rgba(1, 0.5, 0.5, 1, 1)
    
        # Creating Shape
        context.rectangle(0, 0, 1000, 500)
        context.set_source(lg1)
        # Fill the color inside the rectangle
        context.fill()

        # ölkafsdj
        context.set_font_size(25)
        context.set_source_rgb(1, 1, 1)
      
        # Font Style
        context.select_font_face("Arial", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        
        # position for the text
        context.move_to(50, 200)
        
        # displays the text
        context.show_text(name)
        
        # stroke out the color and width property
        context.stroke()

        surface.write_to_png('bin/example.png')