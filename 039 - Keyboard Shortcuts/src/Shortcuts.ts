const keyboard_shortcut_regex = /^((?:ctrl \+ )?(?:Windows \+ )?(?:alt \+ )?(?:shift \+ )?(?:(?:F\\d{1,2})|\\d|home|return|enter|tab|end|escape|delete|backspace|arrows|left|right|down|up|left\/right|up\/down|arrows\/mouse|click|dblclick|scroll|mouse|number|space|print|pagedown|pageup|[a-zäüö]|,|\.|\^|\(|\)|'|\?)(?:((?<=\S) (?=\S))|((?=$)))){1,}$/

/* console.log('ölfasdjf'); */

/* const keyboard_shortcut = 'ctrl + alt + shift + F1 a ctrl + b' */

interface KeyboardShortcutStroke {
    ctrl: boolean;
    windows: boolean;
    alt: boolean;
    shift: boolean;
    key: string;
}

interface KeyboardShortcut {
    name: string;
    description: string;
    strokes: KeyboardShortcutStroke[];
}

function is_valid_keyboard_shortcut_string(keyboard_shortcut: string) {
    return keyboard_shortcut_regex.test(keyboard_shortcut);
}

function parse_keyboard_shortcut_string(keyboard_shortcut: string) {
    const matches = keyboard_shortcut.matchAll(keyboard_shortcut_regex);

    const strokes: KeyboardShortcutStroke[] = [];

    console.log(matches);

    for (const match of matches) {
        /* const stroke_string = match[0]; */
        /* strokes.push(stroke); */
    }
}

function keyboard_shortcut_to_string(shortcut: KeyboardShortcut) {
    return shortcut.strokes.map(stroke => {
        let stroke_string = '';
        if (stroke.ctrl) stroke_string += 'ctrl + ';
        if (stroke.windows) stroke_string += 'Windows + ';
        if (stroke.alt) stroke_string += 'alt + ';
        if (stroke.shift) stroke_string += 'shift + ';
        stroke_string += stroke.key;
        return stroke_string;
    }).join(' ');
}