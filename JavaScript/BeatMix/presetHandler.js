// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const presetHandler = (type, index, newPresetArray) => {
    let returnArray = [];
    if (index < 0 || index > presets.length) {
        returnArray.push(404);
    } else if (type != 'GET' && type != 'PUT') {
        returnArray.push(400);
    } else {
        returnArray.push(200);
    }
    switch(type){
        case 'GET':
            returnArray.push(presets[index]);
            break;
        case 'PUT':
            presets[index] = newPresetArray;
            returnArray.push(newPresetArray);
            break;
    }
    return returnArray;
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
