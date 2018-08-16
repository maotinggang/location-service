var database = require('./database')
var auto = require('async').auto
/**
 * @description user login
 * @param {object} data id,code
 * @param {object} callback err,results
 * @returns {object} err,results
 * @public
 */
exports.login = function(data, callback) {
  let user = data.user
  if (!user || !user.id || !user.code || !user.type) {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'user.login',
      message: user
    }
    process.emit('log', err)
    callback(err, null)
  }
  auto(
    {
      user: function(callback) {
        let sql = 'SELECT * FROM ?? WHERE ?;SELECT * FROM ?? WHERE ? AND ?;'
        let inserts = [
          user.type,
          { id: user.id },
          user.type,
          { id: user.id },
          { code: user.code }
        ]
        database.queryHasDestory(sql, inserts, function(err, results) {
          if (!err) {
            if (!results[0][0]) {
              err = {
                code: 'userIdUnkown',
                codeNo: 923,
                type: 'error',
                sysCall: 'login.user',
                message: user.id
              }
            } else if (!results[1][0]) {
              err = {
                code: 'codeError',
                codeNo: 924,
                type: 'error',
                sysCall: 'login.user',
                message: user.code
              }
            }
          }
          callback(err, results[0][0])
        })
      },
      userConfig: [
        'user',
        function(results, callback) {
          let sql = 'SELECT * FROM ?? WHERE ?;'
          let inserts = ['user_config', { id: user.id }]
          database.queryHasDestory(sql, inserts, function(err, results) {
            callback(err, results[0])
          })
        }
      ]
    },
    function(err, results) {
      if (err) process.emit('log', err)
      callback(err, results.userConfig)
    }
  )
}
/**
 * @description user regist
 * @param {object} data regist info
 * @param {object} callback err,results
 * @returns {object} err,results
 * @public
 */
exports.regist = function(data, callback) {
  let regist = data.regist
  if (!regist || !regist.type || !regist.code || !regist.id) {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'user.regist',
      message: regist
    }
    process.emit('log', err)
    callback(err, null)
  }
  auto(
    {
      insert: function(callback) {
        let sql =
          'INSERT INTO ?? VALUES(?,NOW(),NOW());\
          INSERT INTO ?? (??) VALUES(?);\
          SELECT * FROM ?? WHERE ?;'
        let inserts = [
          regist.type,
          [
            regist.id,
            regist.code,
            regist.type,
            regist.phone,
            regist.email,
            regist.privilege,
            regist.regist_code
          ],
          'user_config',
          'id',
          regist.id,
          'user_config',
          { id: regist.id }
        ]
        database.queryHasDestory(sql, inserts, function(err, results) {
          if (err) {
            err = {
              code: 'idExisted',
              codeNo: 926,
              type: 'error',
              sysCall: 'user.regist.insert',
              message: err.message
            }
          } else results = results[2][0]
          callback(err, results)
        })
      }
    },
    function(err, results) {
      if (err) process.emit('log', err)
      callback(err, results.insert)
    }
  )
}

exports.unregister = function(data, callback) {}

exports.userSet = function(data, callback) {}
