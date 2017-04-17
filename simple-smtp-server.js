const simplesmtp = require('simplesmtp');
const fs = require('fs');
const port = 25;
const express = require('express');
const expressApp = express();

var smtp = simplesmtp.createServer();
smtp.listen(25);


smtp.on("startData", function(connection){
    console.log("Message from:", connection.from);
    console.log("Message to:", connection.to);
    connection.saveStream = fs.createWriteStream("/tmp/mail/" + connection.to);
});

smtp.on("data", function(connection, chunk){
    connection.saveStream.write(chunk);
});

smtp.on("dataReady", function(connection, callback){
    connection.saveStream.end();
    console.log("Incoming message saved to /tmp/mail/");
    callback(null, "ABC1"); // ABC1 is the queue id to be advertised to the client
    // callback(new Error("Rejected as spam!")); // reported back to the client
});


expressApp.get('/inbox/:user', (req, res) => {
  let user = req.params.user;
   fs.readFile(`/tmp/mail/${user}@frank.cafe`, 'utf8', function (err,data) {
     if (err) {
       return res.status(404).send('not found');
     }
     res.set('Content-Type', 'text/plain');
     return res.send(data);
  });
});
expressApp.listen(80, () => {
  console.log('Frank listen on port 80!');
});
