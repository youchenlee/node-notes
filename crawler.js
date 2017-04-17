const request = require('request');
const baseurl = 'http://example.com';
const log = console.log;

request.get(baseurl, (err, resp) => {
  let regex = /<a href="([^"]+)"/gi;
  let match;
  while (match = regex.exec(resp.body)) {
    let link = match[1];

    if (link === '#') continue;

    if (!link.match(/^http/)) {
      link = baseurl + link;
    }

    log (link);
  }
});
