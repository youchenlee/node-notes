const fs = require('fs');

var d = fs.readdirSync(__dirname + '/');
d.forEach(function (f) {
  console.log(f);
});
