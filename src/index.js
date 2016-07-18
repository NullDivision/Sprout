/**
 * Main page file
 *
 * @flow
 */

const fs = require('fs');
const config = require('../config/server.json');

console.log('Starting HTTPS/2.0 server on port ' + config.port + '...');
console.log('Access server locally at https://localhost:' + config.port);
require('spdy')
  .createServer({key: fs.readFileSync('./sprout-key.pem'), cert: fs.readFileSync('./sprout-cert.pem')}, (req, res) => {
    res.push('/main.css.map', {response: {}}).end(fs.readFileSync('./stem/main.css.map'));
    res.push('/main.css', {response: {}}).end(fs.readFileSync('./stem/main.css'));
    res.push('/main.js', {response: {}}).end(fs.readFileSync('./stem/main.js'));
    res.push('/main.js.map', {response: {}}).end(fs.readFileSync('./stem/main.js.map'));

    res.writeHead(200);
    res.end(
      `
        <head>
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css" />
          <link href="/main.css" rel="stylesheet" type="text/css" />
        </head>

        <div id="root"></div>
        <script src="/main.js"></script>
      `
    );
  })
  .listen(config.port);
