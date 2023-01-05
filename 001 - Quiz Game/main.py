# Import json
import json

# Import os to clear the console
import os

# Import shuffle from random to shuffle the lists.
from random import shuffle

# Import colored so we can color text in the console.
# Must be installed with pip install colored
import colored

# Opening the questions file
with open('questions.json', 'r') as f:
    data = json.load(f)

# Amount of right answers.
rightAnswers = 0

# Amount of questions.
amountQuestions = len(data['questions'])

# Shuffle the list of questions.
shuffle(data['questions'])

def colorText(text, color):
    return f'{colored.fg(color)}{text}{colored.fg(15)}' # Reset color to white

# Do all this for each question.
for question, answers in data['questions']:

    # Clear Console
    os.system('cls')

    # get the right answer, which is the first item in list.
    rightAnswer = answers[0]
    rightIndex = 0

    # Shuffle the list of answers
    shuffle(answers)

    print('\n\n'+question+'\n')
    for index, answer in enumerate(answers):
        print(f'{index + 1}. {answer}')

        if answer == rightAnswer:
            rightIndex = index

    answerIndex = int(input('\nType in the Number in front of the correct answer: '))

    # Check if the correct answer was selected.
    if answerIndex == (rightIndex + 1):
        print(colorText('Right', 2))
        rightAnswers += 1
    else:
        print(colorText('Wrong!', 1))
        print(colorText(f'Right Answer -> {rightAnswer}', 1))

    input('\nEnter to Continue ...')

# Clear Console
os.system('cls')

# Showing the user how he did
print('\n\n'+f'You have {rightAnswers} out of {amountQuestions} questions right!')

