const { gulp,task,src,dest ,cb } = require('gulp');


function copy(){
     src(['src/*.js','src/*.css'])
    .pipe(dest('../../dist/tc-browser-recorder/chrome/'));
    return src(['background.js','manifest.json'])
    .pipe(dest('../../dist/tc-browser-recorder/'));
}
exports.copy =task(copy);