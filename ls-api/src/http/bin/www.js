/**
 * Module dependencies.
 */
var app = require('../app')
var debug = require('debug')('http:server')
var http = require('http')
var database = require('../../lib/database')
var log4js = require('../../lib/log')
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000')

app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

process.emit('log', {
  code: 'success',
  codeNo: 960,
  type: 'info',
  sysCall: 'www',
  message:
    'Location Server listening on port ' + port + ' with pid ' + process.pid
})
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

/**
 * @description:Capture all errors
 */
process.on('error', function(err) {
  process.emit('log', {
    code: 'uncaughtError',
    codeNo: 901,
    type: 'error',
    sysCall: 'www.error',
    message: err.message
  })
})

/**
 * @description:Capture all exceptions
 */
process.on('uncaughtException', function(err) {
  process.emit('log', {
    code: 'uncaughtException',
    codeNo: 902,
    type: 'error',
    sysCall: 'www.uncaughtException',
    message: err.message
  })
})
