const { gulp,task,src,dest ,cb } = require('gulp');


function copy(){
     src(['dist/bundle.js','src/*.css'])
    .pipe(dest('../../dist/tc-browser-recorder/chrome/'));
    return src(['background.js','manifest.json','sitest16.png','sitest48.png',
        'sitest128.png','network-background.jpg'])
    .pipe(dest('../../dist/tc-browser-recorder/'));
}
exports.copy = task(copy);