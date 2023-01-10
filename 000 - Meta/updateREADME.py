import requests


defaultText = """
![Maximmaeder.com Logo](https://maximmaeder.com/wp-content/uploads/2022/06/blog-logo_v1-150x150.png)

# Articles
This repository holds the code for my Tutorials; feel free to copy folders or the whole storage to test and look at the code. Each Article has its folder; optionally, there is also a *_blog* folder that contains the article's markdown, preview images, and so on.

[maximmaeder.com](https://maximmaeder.com/)

## Demos

The demos of articles revolving around Web technologies can be found [here](https://demos.maximmaeder.com/). This page shows subdirectories in this folder, each representing an article's demo page.

## Article Links

"""


response = requests.get('https://maximmaeder.com/feed/json')

content = response.json()

finalString = defaultText

for item in content['items']:
    # print(item['content_text'])
    title = item['title']
    url = item['url']
    content_text = item['summary']
    image = item['image']


    finalString += f'### [{title}]({url})\n'
    finalString+= f'{content_text}\n'
    finalString+= f'![{title}]({image})\n\n'

with open('../README.md', 'w') as f:
    f.write(finalString)