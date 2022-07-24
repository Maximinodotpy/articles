const { createApp } = Vue

var startingString = `from argparse import ArgumentParser
from random import shuffle, choice
import string

# Setting up the Argument Parser
    parser = ArgumentParser(
    prog='Password Generator.',
    description='Generate any number of passwords with this tool.'
)

# Adding the arguments to the parser
parser.add_argument('-numNumbers', default=2, type=int)
parser.add_argument('-numLowercaseLetters', default=2, type=int)
parser.add_argument('-numCapitalLetters', default=2, type=int)
parser.add_argument('-numSpecialChars', default=2, type=int)

# This dummy Code Editor was made by Maxim Maeder
# https://maximmaeder.com`

createApp({
    data() {
        return {
            content: startingString
        }
    },
    methods: {
        convert() {
            var parsed = this.content

            /* Patterns */
            var stringPattern1 = new RegExp(/"(.*?)"/g)
            var stringPattern2 = new RegExp(/'(.*?)'/g)
            var keyWordPattern = new RegExp(/\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g)
            var commentWordPattern = new RegExp(/(#.*)/g)
            var functionWordPattern = new RegExp(/([a-zA-Z_]*)(\(.*\))/g)
            var numberWordPattern = new RegExp(/(\d)/g)

            parsed = parsed.replace(stringPattern1, '<span str>"$1"</span>')
            parsed = parsed.replace(stringPattern2, '<span str>\'$1\'</span>')
            parsed = parsed.replace(keyWordPattern, '<span kw>$1</span>')
            parsed = parsed.replace(commentWordPattern, '<span com>$1</span>')
            parsed = parsed.replace(functionWordPattern, '<span func>$1</span>$2')
            parsed = parsed.replace(numberWordPattern, '<span num>$1</span>')

            return parsed
        }
    }
}).mount('#app')