var path = require('path')
var config = require('../../config/log.json')
var configLog4js = require('../../config/log4js.json')
// var log4js = require('log4js').configure(
//   path.resolve(__dirname, './config/log4js.json')
// )

var log4js = require('log4js')

log4js.configure(configLog4js)

var logAccess = require('log4js').getLogger('access')
var logInfo = require('log4js').getLogger('info')
var logError = require('log4js').getLogger('error')
var logDebug = require('log4js').getLogger('debug')
/**
 * Log event
 */

process.on('log', function(data) {
  if (!config.isLog) return
  var code = data.code
  var codeNo = data.codeNo
  var type = data.type
  var sysCall = data.sysCall
  var message = data.message
  if (!code || !config.code || config.level > 2) {
    code = ''
  }
  if (!codeNo || !config.codeNo) {
    codeNo = ''
  }
  if (!type || !config.type) {
    type = ''
  }
  if (!sysCall || !config.sysCall || config.level > 2) {
    sysCall = ''
  }
  if (!message || !config.message || config.level > 1) {
    message = ''
  } else if (message instanceof Object) {
    message = JSON.stringify(message)
  }

  if (type) {
    switch (type) {
      case 'access':
        if (config.isAccess) {
          console.info('[access]', code, codeNo, sysCall, message)
          logAccess.info(code, codeNo, sysCall, message)
        }
        break
      case 'info':
        if (config.isInfo) {
          console.info('[info]', code, codeNo, sysCall, message)
          logInfo.info(code, codeNo, sysCall, message)
        }
        break
      case 'warn':
        if (config.isWarn) {
          console.warn('[warn]', code, codeNo, sysCall, message)
          logInfo.warn(code, codeNo, sysCall, message)
        }
        break
      case 'error':
        if (config.isError) {
          console.error('[error]', code, codeNo, sysCall, message)
          logError.error(code, codeNo, sysCall, message)
        }
        break
      case 'debug':
        if (config.isDebug) {
          console.debug('[debug]', code, codeNo, sysCall, message)
          logDebug.debug(code, codeNo, sysCall, message)
        }
        break
      default:
        if (config.isDebug) {
          console.debug('[debug]', code, codeNo, sysCall, message)
          logDebug.debug(code, codeNo, sysCall, message)
        }
        break
    }
  } else {
    if (config.isDebug) {
      console.debug('[error]', data)
      logDebug.debug(data)
    }
  }
})
