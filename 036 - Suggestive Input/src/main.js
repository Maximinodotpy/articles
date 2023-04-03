"use strict";
const inputs = Array.from(document.querySelectorAll('[data-suggestions]'));
for (const input_element of inputs) {
    let current_suggestion_index = 0;
    let current_suggestions = [];
    let current_word_info = get_currently_selected_word();
    const suggestion_container = document.createElement('div');
    suggestion_container.style.maxHeight = '300px';
    suggestion_container.style.overflowY = 'auto';
    input_element.after(suggestion_container);
    input_element.addEventListener('focus', () => {
        suggestion_container.style.display = 'block';
        get_suggestions();
    });
    input_element.addEventListener('blur', () => { suggestion_container.style.display = 'none'; });
    input_element.addEventListener('pointerdown', () => {
        get_suggestions();
    });
    input_element.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowUp' && event.ctrlKey) {
            event.preventDefault();
        }
        else if (event.key == 'ArrowDown' && event.ctrlKey) {
            event.preventDefault();
        }
    });
    input_element.addEventListener('keyup', (event) => {
        console.log('Keydown ... ', event.key);
        if (event.key == 'ArrowUp' && event.ctrlKey) {
            if (current_suggestion_index > 0)
                current_suggestion_index--;
            render_suggestions();
            return;
        }
        else if (event.key == 'ArrowDown' && event.ctrlKey) {
            if (current_suggestion_index < current_suggestions.length - 1)
                current_suggestion_index++;
            render_suggestions();
            return;
        }
        if (event.key == 'Enter' && event.ctrlKey) {
            event.preventDefault();
            accept_current_suggestion();
            return;
        }
        if (event.key == 'Control') {
            console.log('fasd');
            return;
        }
        if (input_element.selectionStart != input_element.selectionEnd) {
            suggestion_container.innerHTML = '';
            return;
        }
        ;
        get_suggestions();
    });
    function accept_current_suggestion() {
        const suggestion_word = current_suggestions[current_suggestion_index].word;
        input_element.setRangeText(suggestion_word, current_word_info.start, current_word_info.end, 'end');
        get_suggestions();
    }
    function get_suggestions() {
        current_word_info = get_currently_selected_word();
        /* const url = `https://api.datamuse.com/sug?s=${current_word_info.word}` */
        const url = `https://api.datamuse.com/words?rel_rhy=${current_word_info.word}`;
        fetch(url)
            .then(response => response.json())
            .then(suggestions => {
            suggestion_container.innerHTML = '';
            current_suggestions = suggestions;
            current_suggestion_index = 0;
            render_suggestions();
        });
    }
    function render_suggestions() {
        suggestion_container.innerHTML = ``;
        let i = 0;
        for (const suggestion of current_suggestions) {
            const suggestion_element = document.createElement('button');
            suggestion_element.style.display = 'block';
            // Treat the current suggestion differently
            if (i == current_suggestion_index) {
                suggestion_element.style.fontWeight = '900';
            }
            else {
                suggestion_element.style.opacity = '0.7';
            }
            suggestion_element.innerHTML = suggestion.word;
            suggestion_container.appendChild(suggestion_element);
            i++;
        }
        // Scroll to the Element
        suggestion_container.children[current_suggestion_index].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
    function get_currently_selected_word() {
        let current_word = '';
        // this will also be the end
        let i = 0;
        let start = 0;
        // This will be set to true if the position is met
        let surely_the_word = false;
        while (i < input_element.value.length) {
            let letter = input_element.value[i];
            if (i == input_element.selectionStart)
                surely_the_word = true;
            if (letter == ' ' && surely_the_word)
                break;
            if (letter == ' ') {
                current_word = '';
                start = i + 1;
            }
            else
                current_word += letter;
            i++;
        }
        return { word: current_word, start: start, end: i };
    }
}
