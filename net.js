const net = require('net');
const client = net.connect({
  'host': 'example.com',
  'port': 80
}, () => {
  console.log('connected');
  client.write('hello');
});

client.on('data', data => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected');
});


