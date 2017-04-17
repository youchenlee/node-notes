const axios = require('axios');

axios.get('http://exmaple.com')
  .then( resp => {
    for (var c of resp.headers['set-cookie']) {
      console.log(c);
    }
  });
