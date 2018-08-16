var mysql = require('mysql')
var configDefault = require('../../config/database.json')
var pool = mysql.createPool(configDefault)

/**
 * @description establish pool
 * @param config database configrue, use default config if null
 */
exports.pool = function(config) {
  pool.end()
  if (config) {
    pool = mysql.createPool(config)
  } else {
    pool = mysql.createPool(configDefault.mysql)
  }
}
/**
 * @description database pool end
 */
exports.end = function() {
  pool.end()
}
/**
 * @description database query with release()
 * @param sql sql statements without keys and values
 * @param inserts keys and values in an array
 * @param callback err,results
 */
exports.queryHasRelease = function(sql, inserts, callback) {
  pool.query({ sql: mysql.format(sql, inserts), timeout: 1000 }, function(
    err,
    results,
    fields
  ) {
    if (err) {
      err = {
        code: 'dbQueryError',
        codeNo: 922,
        type: 'error',
        sysCall: 'queryHasRelease.query',
        message: err
      }
      process.emit('log', err)
    }
    callback(err, results)
  })
}
/**
 * @description database query with return a connection in callback
 * @param sql sql statements without keys and values
 * @param inserts keys and values in an array
 * @param callback err, results, connection
 */
exports.queryHasConnection = function(sql, inserts, callback) {
  pool.getConnection(function(err, conn) {
    if (err) {
      err = {
        code: 'dbConnectError',
        codeNo: 921,
        type: 'error',
        sysCall: 'queryHasConnection.getConnection',
        message: err
      }
      process.emit('log', err)
      callback(err, null, null)
    } else {
      let connection = conn
      connection.query(
        { sql: mysql.format(sql, inserts), timeout: 1000 },
        function(err, results, fields) {
          if (err) {
            err = {
              code: 'dbQueryError',
              codeNo: 922,
              type: 'error',
              sysCall: 'queryHasConnection.query',
              message: err
            }
            process.emit('log', err)
          }
          callback(err, results, connection)
        }
      )
    }
  })
}
/**
 * @description database query with destory()
 * @param sql sql statements without keys and values
 * @param inserts keys and values in an array
 * @param callback err, results
 */
exports.queryHasDestory = function(sql, inserts, callback) {
  pool.getConnection(function(err, conn) {
    if (err) {
      err = {
        code: 'dbConnectError',
        codeNo: 921,
        type: 'error',
        sysCall: 'queryHasDestory.getConnection',
        message: err
      }
      process.emit('log', err)
      callback(err, null)
    } else {
      conn.query({ sql: mysql.format(sql, inserts), timeout: 1000 }, function(
        err,
        results,
        fields
      ) {
        if (err) {
          err = {
            code: 'dbQueryError',
            codeNo: 922,
            type: 'error',
            sysCall: 'queryHasDestory.query',
            message: err
          }
          process.emit('log', err)
        }
        conn.destroy()
        callback(err, results)
      })
    }
  })
}
