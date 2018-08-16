var database = require('./database')
var auto = require('async').auto

/**
 * @description check result of user
 * @param {object} manage
 * @param {object} results
 * @returns {object} err,results
 * @private
 */
function checkUser(manage, results) {
  let existCode = []
  let err = null
  try {
    let user = results[0]
    if (!user[0].id) {
      err = {
        code: 'userIdOrCodeError',
        codeNo: 923,
        type: 'warn',
        sysCall: 'manage.checkUser.user',
        message: manage.user
      }
    } else if (user[0].privilege != 'admin') {
      err = {
        code: 'privilegeError',
        codeNo: 929,
        type: 'warn',
        sysCall: 'manage.checkUser.user',
        message: user[0].privilege
      }
    }
    let registCode = results[1]
    if (registCode[0]) {
      registCode.forEach(element => {
        existCode.push(element.regist_code)
      })
    }
  } catch (error) {
    err = {
      code: 'unkownData',
      codeNo: 907,
      type: 'warn',
      sysCall: 'manage.checkUser',
      message: error.message
    }
  }
  return { err, existCode }
}
/**
 * @description get insert sql and inserts for database
 * @param {object} manage
 * @param {object} existCode
 * @returns {object} err,sql,inserts
 * @private
 */
function getInsertSql(manage, existCode) {
  let err = null
  let sql = ''
  let inserts = []
  try {
    manage.insert.forEach(element => {
      if (!existCode.includes(element.regist_code)) {
        sql += 'INSERT INTO regist_code VALUES(?,NOW());'
        inserts = inserts.concat([[manage.user.id, element.regist_code]])
        existCode.push(element.regist_code)
      }
      switch (element.type) {
        case 'beacon':
          sql += 'INSERT INTO ?? VALUES(?,NOW());'
          inserts = inserts.concat([
            element.type,
            [
              element.id,
              element.lati,
              element.longi,
              element.accuracy,
              element.alti,
              element.alti_accuracy,
              element.calibration,
              element.soc,
              element.location,
              element.type,
              element.company,
              element.info,
              element.regist_code
            ]
          ])
          break
        case 'user':
          sql += 'INSERT INTO ?? VALUES(?,NOW());'
          inserts = inserts.concat([
            element.type,
            [
              element.id,
              element.code,
              element.type,
              element.phone,
              element.email,
              element.privilege,
              element.regist_code,
              element.info
            ]
          ])
          break
        default:
          break
      }
    })
  } catch (error) {
    err = {
      code: 'unkownData',
      codeNo: 907,
      type: 'warn',
      sysCall: 'manage.getInsertSql',
      message: error.message
    }
  }
  return { err, sql, inserts }
}

/**
 * @description insert user or device
 * @param {object} data
 * @param {object} callback
 * @public
 */
exports.insert = function(data, callback) {
  let manage = data
  if (
    manage.user.id &&
    manage.user.code &&
    manage.insert &&
    manage.insert[0].type
  ) {
    auto(
      {
        user: function(callback) {
          let sql =
            'SELECT * FROM user WHERE ? AND ?;SELECT * FROM regist_code WHERE ?;'
          let inserts = [
            { id: manage.user.id },
            { code: manage.user.code },
            { id: manage.user.id }
          ]
          database.queryHasDestory(sql, inserts, function(err, results) {
            if (!err) {
              let ret = checkUser(manage, results)
              err = ret.err
              results = ret.existCode
            }
            callback(err, results)
          })
        },
        dataProcess: [
          'user',
          function(results, callback) {
            let ret = getInsertSql(manage, results.user)
            callback(ret.err, {
              sql: ret.sql,
              inserts: ret.inserts
            })
          }
        ],
        dbProcess: [
          'dataProcess',
          function(results, callback) {
            database.queryHasDestory(
              results.dataProcess.sql,
              results.dataProcess.inserts,
              function(err, results) {
                if (err) {
                  err = {
                    code: 'idExisted',
                    codeNo: 926,
                    type: 'warn',
                    sysCall: 'manage.insert.dbProcess',
                    message: err.message
                  }
                }
                callback(err, results)
              }
            )
          }
        ]
      },
      function(err, results) {
        if (err) process.emit('log', err)
        else results = 'success'
        callback(err, results)
      }
    )
  } else {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'manage.insert',
      message: null
    }
    process.emit('log', err)
    callback(err, null)
  }
}
/**
 * @description get update sql and inserts for database
 * @param {object} manage
 * @param {object} existCode
 * @returns {object} err,sql,inserts
 * @private
 */
function getUpdateSql(manage, existCode) {
  let err = null
  let sql = ''
  let inserts = []
  let newExistCode = existCode
  try {
    manage.update.forEach(element => {
      if (!newExistCode.includes(element.regist_code)) {
        sql += 'INSERT INTO regist_code VALUES(?,NOW());'
        inserts = inserts.concat([[manage.user.id, element.regist_code]])
        newExistCode.push(element.regist_code)
      }
      sql += 'UPDATE ?? SET ? WHERE ? AND regist_code IN (?);'
      inserts = inserts.concat([
        element.type,
        element,
        { id: element.id },
        existCode
      ])
    })
  } catch (error) {
    err = {
      code: 'unkownData',
      codeNo: 907,
      type: 'warn',
      sysCall: 'manage.getUpdateSql',
      message: error.message
    }
  }
  return { err, sql, inserts }
}
/**
 * @description update user or device
 * @param {object} data
 * @param {object} callback
 * @public
 */
exports.update = function(data, callback) {
  let manage = data
  if (
    manage.user.id &&
    manage.user.code &&
    manage.update &&
    manage.update[0].type
  ) {
    auto(
      {
        user: function(callback) {
          let sql =
            'SELECT * FROM user WHERE ? AND ?;SELECT * FROM regist_code WHERE ? '
          let inserts = [
            { id: manage.user.id },
            { code: manage.user.code },
            { id: manage.user.id }
          ]
          database.queryHasDestory(sql, inserts, function(err, results) {
            if (!err) {
              let ret = checkUser(manage, results)
              err = ret.err
              results = ret.existCode
            }
            callback(err, results)
          })
        },
        dataProcess: [
          'user',
          function(results, callback) {
            let ret = getUpdateSql(manage, results.user)
            callback(ret.err, {
              sql: ret.sql,
              inserts: ret.inserts
            })
          }
        ],
        dbProcess: [
          'dataProcess',
          function(results, callback) {
            database.queryHasDestory(
              results.dataProcess.sql,
              results.dataProcess.inserts,
              function(err, results) {
                callback(err, results)
              }
            )
          }
        ]
      },
      function(err, results) {
        if (err) process.emit('log', err)
        else results = 'success'
        callback(err, results)
      }
    )
  } else {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'manage.update',
      message: null
    }
    process.emit('log', err)
    callback(err, null)
  }
}
/**
 * @description delete user or device
 * @param {object} data
 * @param {object} callback
 * @public
 */
exports.delete = function(data, callback) {
  let manage = data
  if (
    manage.user.id &&
    manage.user.code &&
    manage.delete &&
    manage.delete.type
  ) {
    auto(
      {
        user: function(callback) {
          let sql =
            'SELECT * FROM ?? WHERE ? AND ?;SELECT * FROM regist_code WHERE ?;SELECT column_name FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE ? AND ? AND ?;'
          let inserts = [
            manage.user.type,
            { id: manage.user.id },
            { code: manage.user.code },
            { id: manage.user.id },
            { table_name: manage.delete.type },
            { constraint_name: 'PRIMARY' },
            { TABLE_SCHEMA: 'smartspace' }
          ]
          database.queryHasDestory(sql, inserts, function(err, results) {
            if (!err) {
              let idName = results[2][0].column_name
              let ret = checkUser(manage, results)
              err = ret.err
              results = {}
              results.existCode = ret.existCode
              results.idName = idName
            }
            callback(err, results)
          })
        },
        dataProcess: [
          'user',
          function(results, callback) {
            let err = null
            let sql
            let inserts
            if (manage.delete.id[0] == '__all') {
              sql = 'DELETE FROM ?? WHERE regist_code IN (?);'
              inserts = [manage.delete.type, results.user.existCode]
            } else if (manage.delete.id[0]) {
              sql = 'DELETE FROM ?? WHERE ?? IN (?) AND regist_code IN (?);'
              inserts = [
                manage.delete.type,
                results.user.idName,
                manage.delete.id,
                results.user.existCode
              ]
            } else {
              err = {
                code: 'nullValue',
                codeNo: 905,
                type: 'warn',
                sysCall: 'manage.delete.dataProcess',
                message: manage.delete.id
              }
            }
            callback(err, { sql: sql, inserts: inserts })
          }
        ],
        dbProcess: [
          'dataProcess',
          function(results, callback) {
            database.queryHasDestory(
              results.dataProcess.sql,
              results.dataProcess.inserts,
              function(err, results) {
                if (!err && manage.delete.id[0] != '__all') {
                  if (results.affectedRows == 0) {
                    err = {
                      code: 'queryNull',
                      codeNo: 927,
                      type: 'warn',
                      sysCall: 'manage.delete.dbProcess',
                      message: 'affectedRows:0'
                    }
                  } else if (results.affectedRows < manage.delete.id.length) {
                    err = {
                      code: 'privilegeError',
                      codeNo: 929,
                      type: 'warn',
                      sysCall: 'manage.delete.dbProcess',
                      message: 'affectedRows:' + results.affectedRows
                    }
                  }
                }
                callback(err, results)
              }
            )
          }
        ]
      },
      function(err, results) {
        if (err) process.emit('log', err)
        else results = 'success'
        callback(err, results)
      }
    )
  } else {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'manage.delete',
      message: null
    }
    process.emit('log', err)
    callback(err, null)
  }
}
/**
 * @description select user or device
 * @param {object} data
 * @param {object} callback
 * @public
 */
exports.select = function(data, callback) {
  let manage = data
  if (
    manage.user.id &&
    manage.user.code &&
    manage.select &&
    manage.select.type
  ) {
    auto(
      {
        user: function(callback) {
          let sql =
            'SELECT * FROM user WHERE ? AND ?;SELECT * FROM regist_code WHERE ?;SELECT column_name FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE ? AND ? AND ?;'
          let inserts = [
            { id: manage.user.id },
            { code: manage.user.code },
            { id: manage.user.id },
            { table_name: manage.select.type },
            { constraint_name: 'PRIMARY' },
            { TABLE_SCHEMA: 'smartspace' }
          ]
          database.queryHasDestory(sql, inserts, function(err, results) {
            if (!err) {
              let idName = results[2][0].column_name
              let ret = checkUser(manage, results)
              err = ret.err
              results = {}
              results.existCode = ret.existCode
              results.idName = idName
            }
            callback(err, results)
          })
        },
        dataProcess: [
          'user',
          function(results, callback) {
            let err = null
            let sql
            let inserts
            if (manage.select.id[0] == '__all') {
              sql = 'SELECT * FROM ?? WHERE regist_code IN (?);'
              inserts = [manage.select.type, results.user.existCode]
            } else if (manage.select.id[0]) {
              sql = 'SELECT * FROM ?? WHERE ?? IN (?) AND regist_code IN (?);'
              inserts = [
                manage.select.type,
                results.user.idName,
                manage.select.id,
                results.user.existCode
              ]
            } else {
              err = {
                code: 'nullValue',
                codeNo: 905,
                type: 'warn',
                sysCall: 'manage.select.dataProcess',
                message: manage.select.id
              }
            }
            callback(err, { sql: sql, inserts: inserts })
          }
        ],
        dbProcess: [
          'dataProcess',
          function(results, callback) {
            database.queryHasDestory(
              results.dataProcess.sql,
              results.dataProcess.inserts,
              function(err, results) {
                if (!err && results.length < 1)
                  err = {
                    code: 'queryNull',
                    codeNo: 927,
                    type: 'warn',
                    sysCall: 'manage.select.dbProcess',
                    message: null
                  }
                callback(err, results)
              }
            )
          }
        ]
      },
      function(err, results) {
        if (err) process.emit('log', err)
        callback(err, results.dbProcess)
      }
    )
  } else {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'manage.select',
      message: null
    }
    process.emit('log', err)
    callback(err, null)
  }
}

/**
 * @description configure user or device
 * @param {object} data
 * @param {object} callback
 * @public
 */
exports.config = function(data, callback) {
  let manage = data
  if (
    manage.user.id &&
    manage.user.code &&
    manage.config &&
    manage.config[0].type
  ) {
    auto(
      {
        user: function(callback) {
          let sql =
            'SELECT * FROM user WHERE ? AND ?;SELECT * FROM regist_code WHERE ? '
          let inserts = [
            { id: manage.user.id },
            { code: manage.user.code },
            { id: manage.user.id }
          ]
          database.queryHasDestory(sql, inserts, function(err, results) {
            if (!err) {
              let ret = checkUser(manage, results)
              err = ret.err
              results = ret.existCode
            }
            callback(err, results)
          })
        },
        dataProcess: [
          'user',
          function(results, callback) {
            let err
            let sql
            let inserts
            callback(err, {
              sql: sql,
              inserts: inserts
            })
          }
        ],
        dbProcess: [
          'dataProcess',
          function(results, callback) {
            database.queryHasDestory(
              results.dataProcess.sql,
              results.dataProcess.inserts,
              function(err, results) {
                callback(err, results)
              }
            )
          }
        ]
      },
      function(err, results) {
        if (err) process.emit('log', err)
        else results = 'success'
        callback(err, results)
      }
    )
  } else {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'manage.config',
      message: null
    }
    process.emit('log', err)
    callback(err, null)
  }
}
