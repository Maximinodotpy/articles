---
name: Simple quiz in the console with python.
tags: ""
category: Project
slug: simple-quiz-in-the-console-with-python
description: How to make a simple quiz with python and some modules like os,
  colored, and json.
---

In this tutorial, we will make a simple quiz program with python and some excellent modules like json, colored and random.

We will implement a point system and colorful feedback for the user. We also make it so the questions and answers are shuffled randomly.

Let us get into it!

## Imports
We start by importing several modules.

We need the `json` module to open the file where our quiz is located and parse it to a valid python list/dictionary. Next, we also get the builtin-in `os` so we can clear the console later. To shuffle the answers and questions we get the `shuffle()` function from `random`. Last but not least we import colored which allows to color text in the console easily, this is the only module that we have to download with `pip install colored`.

```python
# Import json
import json

# Import os to clear the console
import os

# Import shuffle from random to shuffle the lists.
from random import shuffle

# Import colored so we can color text in the console.
# Must be installed with pip install colored
import colored
```

## Setup

Now we continue with the setup which includes all the stuff we do before the question loop.

We start by getting the contents of our `questions.json` file and we parse the json content to the data variable.

```python
# Opening the questions file
with open('questions.json', 'r') as f:
    data = json.load(f)
```

The file looks like this. As you see the questions lists contain the question as to the first item and an infinite amount of answers in another list as a second item. The first item in the answer list is always the right answer.

```json
{
	"name": "Geography Quiz",
	"questions": [
		["What is the Capital of France?", ["Paris", "Montpellier", "Toulouse"]],
		["Which country shares a border with the US to to the South?", ["Mexico", "Canada"]],
		["How is the desert in northern Africa called?", ["Sahara", "Gobi", "Urals"]]
	]
}
```

After opening the file we define some variables which will later use to tell the user how he did.

```python
# Amount of right answers.
rightAnswers = 0

# Amount of questions.
amountQuestions = len(data['questions'])
```

Now we also shuffle the list of questions in place.

```python
# Shuffle the list of questions.
shuffle(data['questions'])
```

## `colorText` function

To make it even easier to use the `colored` module we make a little function to help us. This function simply returns a colored string. We do this because it would be tedious to reset the color on every string manually.

```python
def colorText(text, color):
    return f'{colored.fg(color)}{text}{colored.fg(15)}' # Reset color to white`
```

## Question Loop

Now let's get into the main part of the program: The Question Loop. We loop over the previously shuffled list of questions and unpack it into two variables. We then clear the console.

```python
# Do all this for each question.
for question, answers in data['questions']:

    # Clear Console
    os.system('cls')
```

Next, we save the right answer to a variable we can do this because the first item in every answer list is the correct one. We also make the right index variable.

```python
    # get the right answer, which is the first item in list.
    rightAnswer = answers[0]
    rightIndex = 0
```

After that, we shuffle the answers and loop / enumerate over them so we get the index. Then we nicely format a string and if the current answer is the right one we set the right index variable to the current index.

```python
# Shuffle the list of answers
    shuffle(answers)

    print('\n\n'+question+'\n')
    for index, answer in enumerate(answers):
        print(f'{index + 1}. {answer}')

        if answer == rightAnswer:
            rightIndex = index
```

We continue by asking the user what his answer is, we want him or her to give us the index of the answer.

```python
answerIndex = int(input('\nType in the Number in front of the correct answer: '))
```

After we have the answer from the user we check if it was the right one, for this, we use the `rightIndex` variable. We then give the user a nice colored message and add one to the `rightAnswers` variable. If the answer was wrong we tell the user that and what the right answer would have been.

```python
    # Check if the correct answer was selected.
    if answerIndex == (rightIndex + 1):
        print(colorText('Right', 2))
        rightAnswers += 1
    else:
        print(colorText('Wrong!', 1))
        print(colorText(f'Right Answer -> {rightAnswer}', 1))

	input('\nEnter to Continue ...')
```

## Result

After the question loop, we clear the console once again and we tell the user how he or she did.

```python
# Clear Console
os.system('cls')

# Showing the user how he did
print('\n\n'+f'You have {rightAnswers} out of {amountQuestions} questions right!')
```

That's it!

## Conclusion

Excellent! You have successfully created a quiz using Python code! See how you can add more features to this program such as more colors or multiple right answers.