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
    const pushables = ['/jspm_packages/system.js', '/jspm_packages/system.js.map', '/config.js'];

    // do not push files served through push again
    if (pushables.includes(req.url)) {
      console.error('Trying to resolve pushable...');
      return;
    }

    if (req.url.startsWith('/jspm_packages')) {
      let properFile = req.url.replace('jsx.js', 'jsx');

      // console.log(`Delivering JSPM file '${properFile}'`);
      res.writeHead(200);
      res.end(fs.readFileSync('./libjs' + properFile));
      return;
    }

    res.push('/jspm_packages/system.js', {response: {}}).end(fs.readFileSync('./libjs/jspm_packages/system.js'));
    res.push('/jspm_packages/system.js.map', {response: {}}).end(fs.readFileSync('./libjs/jspm_packages/system.js.map'));
    res.push('/main.js', {response: {}}).end(fs.readFileSync('./libjs/main.js'));
    res.push('/main.js.map', {response: {}}).end(fs.readFileSync('./libjs/main.js.map'));
    res.push('/config.js', {response: {}}).end(fs.readFileSync('./libjs/config.js'));

    res.writeHead(200);
    res.end(
      `
        <head>
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css" />
          <link href="/main.css" rel="stylesheet" type="text/css" />

          <script src="jspm_packages/system.js"></script>
          <script src="config.js"></script>
          <script src="main.js"></script>
        </head>

        <div id="root"></div>
        <script>SystemJS.import('stem/main.js')</script>
      `
    );
  })
  .listen(config.port);
