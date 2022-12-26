// Drum Arrays
let kicks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let snares = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let hiHats = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let rideCymbals = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

const stringToPad = (str) => {
    switch (str){
    case 'kicks':
        return kicks;
    case 'snares':
        return snares;
    case 'hiHats':
        return hiHats;
    case 'rideCymbals':
        return rideCymbals;
    default:
        return false;
    }
}

const toggleDrum = (pad, index) => {
    if (!pad) { return; }
    drumPad = stringToPad(pad);
    if (index < 0 || index >= drumPad.length) { return; }
    drumPad[index] = !drumPad[index];
}

const clear = pad => {
    drumPad = stringToPad(pad);
    if (!drumPad) { return; }
    for (let i = 0; i < 16; i++) {
        drumPad[i] = false;
    };
}

const invert = pad => {
    drumPad = stringToPad(pad);
    if (!drumPad) { return; }
    for (let i = 0; i < 16; i++) {
        drumPad[i] = !drumPad[i];
    }
}

const getNeighborPads = (x, y, size) => {
    if (x < 0 || x >= size || y < 0 || y >= size || size < 0) {
        return [];
    }
    if (x === 0 && y === 0) {
        return [[x + 1, y],[x, y + 1]];
    } else if (x === 0) {
        return [[x + 1, y], [x, y + 1], [x, y - 1]];
    } else if (y === 0) {
        return [[x - 1, y], [x, y + 1], [x + 1, y]];
    } else if (x === size - 1 && y === size - 1) {
        return [[x - 1, y], [x, y - 1]];
    } else if (x === size - 1) {
        return [[x - 1, y], [x, y - 1], [x, y + 1]];
    } else if (y === size - 1) {
        return [[x + 1, y], [x, y - 1], [x - 1, y]];
    }
    else {
        return [[x - 1, y], [x, y + 1], [x + 1, y], [x, y - 1]];
    }
}