var util = require('util');
var fs = require('fs');

var Markov = require('markov-respond');
var m = new Markov();

var s = fs.readFileSync(__dirname + '/frank.txt');
m.train(s);

var stdin = process.openStdin();
util.print('> ');

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

stdin.on('data', function (line) {
  var res = m.respond(line.toString(), getRandomArbitrary(10, 30));
  console.log(res);
  util.print('> ');
});
