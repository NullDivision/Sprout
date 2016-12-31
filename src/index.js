/**
 * Main page file
 *
 * @flow
 */

const fs = require('fs');
const path = require('path');

const baseURL = '/';
const config = require('../config/server.json');

console.log('Starting HTTPS/2.0 server on port ' + config.port + '...');
console.log('Access server locally at https://localhost:' + config.port);
require('spdy')
  .createServer({key: fs.readFileSync('./sprout-key.pem'), cert: fs.readFileSync('./sprout-cert.pem')}, (req, res) => {
    // last state returns first option
    var file = '../index.html';
    var data;
    var filePath;

    if (req.url !== baseURL) {
      file = '../libjs/' + req.url;
    }

    filePath = path.join(__dirname, file);

    try {
      data = fs.readFileSync(filePath);

      res.writeHead(200);
    } catch(e) {
      console.error(`Could not resolve path ${filePath}`);
      res.writeHead(404);
    }

    res.end(data);
  })
  .listen(config.port);
