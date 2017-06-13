const fs = require('fs');


let readDir = function(dir) {
  let files = fs.readdirSync(dir);
  files.forEach(function (f) {
    let path = `${dir}/${f}`;
    if (fs.lstatSync(path).isDirectory()) {
      console.log(`DIR: ${path}`)
      readDir(path);
    } else {
      console.log(`FILE: ${path}`);
    }
  });
}

readDir(__dirname);


