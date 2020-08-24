
// NPM dependencies
const browserSync = require('browser-sync')
const fs = require('fs')
const path = require('path')
const https = require('https');
var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};
// Local dependencies
const server = require('./server.js')
const config = require('./app/config.js')
const utils = require('./lib/utils.js')

// Set up configuration variables
var useBrowserSync = config.useBrowserSync.toLowerCase()
var env = (process.env.NODE_ENV || 'development').toLowerCase()

utils.findAvailablePort(server, function (port) {
  console.log('Listening on port ' + port + '   url: http://localhost:' + port)
  if (env === 'production' || useBrowserSync === 'false') {
    server.listen(port)
    var ser = https.createServer(options, server);
  } else {
    var ser = https.createServer(options, server);
    ser.listen(port, () => {
      console.log("server starting on port : " + port)
    });
    server.listen(port - 50, function () {
      browserSync({
        proxy: 'localhost:' + (port - 50),
        port: port,
        ui: false,
        files: ['public/**/*.*', 'app/views/**/*.*'],
        ghostmode: false,
        open: false,
        notify: false,
        logLevel: 'error'
      })
    })
  }
})

