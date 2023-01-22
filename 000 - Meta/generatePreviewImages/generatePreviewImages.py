import configparser
import glob, os
from pathlib import Path
from PIL import Image


config = configparser.RawConfigParser()
config.read('../config.cfg')


config = dict(config['Preview Images'])

preview_image_heigth = int(config['preview_image_heigth'])
preview_image_width = int(config['preview_image_width'])

os.chdir(Path('../../').absolute())

for infile in glob.glob("**/_blog/preview.png"):
    print(infile)

    print()
    

    im = Image.open(infile)
    im = im.resize([preview_image_width, preview_image_heigth])

    """ im.show() """

    """ im.save('test.png', 'png') """

    break