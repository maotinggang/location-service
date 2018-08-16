var database = require('./database')
var auto = require('async').auto
var privilege = require('../../config/privilege.json')
/**
 * @description get latest location
 * @param data  user and track
 * @param callback err,results
 */
exports.latest = function(data, callback) {
  let track = data
  if (track.user.name && track.user.password && track.track.deviceType) {
    auto(
      {
        user: function(callback) {
          let sql = 'SELECT * FROM ?? WHERE ? AND ?;'
          let inserts = [
            track.track.deviceType,
            { name: track.user.name },
            { password: track.user.password }
          ]
          database.queryHasDestory(sql, inserts, function(err, results) {
            if (!err) {
              if (!results[0]) {
                err = {
                  code: 'usernameOrpasswordError',
                  codeNo: 923,
                  type: 'warn',
                  sysCall: 'track.latest.user',
                  message: track.user
                }
                process.emit('log', err)
              }
            }
            callback(err, results[0])
          })
        },
        getName: [
          'user',
          function(results, callback) {
            if (
              results.user.privilege == 'tracker' ||
              results.user.privilege == 'admin'
            ) {
              let sql = ''
              let inserts = []
              if (track.track.name[0] == '__all') {
                sql = 'SELECT name FROM user_code WHERE ?;'
                inserts = [{ code: results.user.code }]
              } else if (track.track.name[0]) {
                sql += 'SELECT name FROM user_code WHERE ? AND name IN (?);'
                inserts.concat([
                  { code: results.user.code },
                  track.track.name.toString()
                ])
              } else {
                callback(null, null)
              }
              database.queryHasDestory(sql, inserts, function(err, results) {
                let name = []
                results.forEach(element => {
                  name.push(element.name)
                })
                callback(err, name)
              })
            } else {
              callback(null, null)
            }
          }
        ],
        configure: [
          'user',
          function(results, callback) {
            let limitTime = new Date()
            let endTime = limitTime
            if (results.user.privilege == 'tracker') {
              limitTime.setMonth(
                limitTime.getMonth() - privilege.tracker.queryTime
              )
            } else if (results.user.privilege == 'admin') {
              limitTime.setMonth(
                limitTime.getMonth() - privilege.admin.queryTime
              )
            } else {
              limitTime.setMonth(
                limitTime.getMonth() - privilege.user.queryTime
              )
            }
            let startTime = limitTime
            callback(err, {
              time: {
                startMonth: startTime.getMonth(),
                startTime: startTime.toLocaleString(),
                endMonth: endTime.getMonth(),
                endTime: endTime.toLocaleString()
              }
            })
          }
        ],
        location: [
          'getName',
          'configure',
          function(results, callback) {
            let sql = ''
            let inserts = []
            if (results.getName && results.getName[0]) {
              sql = 'CREATE TEMPORARY TABLE ?? LIKE ??;'
              inserts = [
                results.user.name,
                track.track.deviceType + '_location_1'
              ]
              for (
                let i = results.configure.time.startMonth;
                i <= results.configure.time.endMonth;
                i++
              ) {
                sql +=
                  'INSERT INTO ?? SELECT * FROM ?? WHERE  timestamp IN\
                (SELECT MAX(timestamp) FROM ?? GROUP BY name HAVING name IN (?)) AND name IN (?);'
                inserts = inserts.concat([
                  results.user.name,
                  track.track.deviceType + '_location_' + i,
                  track.track.deviceType + '_location_' + i,
                  results.getName.toString(),
                  results.getName.toString()
                ])
              }
              sql +=
                'SELECT * FROM ?? WHERE timestamp BETWEEN ? AND ? AND timestamp IN \
                  (SELECT MAX(timestamp) FROM ?? GROUP BY name) ;\
                  DROP TEMPORARY TABLE IF EXISTS ??'
              inserts = inserts.concat([
                results.user.name,
                results.configure.time.startTime,
                results.configure.time.endTime,
                results.user.name,
                results.user.name
              ])
            } else {
              sql = 'CREATE TEMPORARY TABLE ?? LIKE ??;'
              inserts = [
                results.user.name,
                track.track.deviceType + '_location_1'
              ]
              for (
                let i = results.configure.time.startMonth;
                i <= results.configure.time.endMonth;
                i++
              ) {
                sql +=
                  'INSERT INTO ?? SELECT * FROM ?? WHERE timestamp =\
                  (SELECT MAX(timestamp) FROM ?? WHERE timestamp BETWEEN ? AND ? AND ?) AND ?;'
                inserts = inserts.concat([
                  results.user.name,
                  track.track.deviceType + '_location_' + i,
                  track.track.deviceType + '_location_' + i,
                  results.configure.time.startTime,
                  results.configure.time.endTime,
                  { name: track.user.name },
                  { name: track.user.name }
                ])
              }
              sql +=
                'SELECT * FROM ?? WHERE timestamp =(SELECT MAX(timestamp) FROM ??);\
                DROP TEMPORARY TABLE IF EXISTS ??'
              inserts = inserts.concat([
                results.user.name,
                results.user.name,
                results.user.name
              ])
            }
            database.queryHasDestory(sql, inserts, function(err, results) {
              if (!err) {
                let temp = getLocationData(err, results)
                err = temp.err
                results = temp.results
              }
              callback(err, results)
            })
          }
        ]
      },
      function(err, results) {
        callback(err, results.locations)
      }
    )
  } else {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'track.latest',
      message: track
    }
    process.emit('log', err)
    callback(err, null)
  }
}
/**
 *@description get history location
 * @param data  user and track
 * @param callback err,results
 */

exports.history = function(data, callback) {
  let track = data
  if (
    track.user.name &&
    track.user.password &&
    track.track.deviceType &&
    track.track.timestamp
  ) {
    auto(
      {
        user: function(callback) {
          let sql = 'SELECT * FROM ?? WHERE ? AND ?;'
          let inserts = [
            track.track.deviceType,
            { name: track.user.name },
            { password: track.user.password }
          ]
          database.queryHasDestory(sql, inserts, function(err, results) {
            if (!err) {
              if (!results[0]) {
                err = {
                  code: 'usernameOrpasswordError',
                  codeNo: 923,
                  type: 'warn',
                  sysCall: 'track.latest.user',
                  message: track.user
                }
                process.emit('log', err)
              }
            }
            callback(err, results[0])
          })
        },
        getName: [
          'user',
          function(results, callback) {
            if (
              results.user.privilege == 'tracker' ||
              results.user.privilege == 'admin'
            ) {
              let sql = ''
              let inserts = []
              if (track.track.name[0] == '__all') {
                sql = 'SELECT name FROM user_code WHERE ?;'
                inserts = [{ code: results.user.code }]
              } else if (track.track.name[0]) {
                sql += 'SELECT name FROM user_code WHERE ? AND name IN (?);'
                inserts.concat([
                  { code: results.user.code },
                  track.track.name.toString()
                ])
              } else {
                callback(null, null)
              }
              database.queryHasDestory(sql, inserts, function(err, results) {
                let name = []
                results.forEach(element => {
                  name.push(element.name)
                })
                callback(err, name)
              })
            } else {
              callback(null, null)
            }
          }
        ],
        configure: [
          'user',
          function(results, callback) {
            let limitTime = new Date()
            let endTime = limitTime
            if (results.user.privilege == 'tracker') {
              limitTime.setMonth(
                limitTime.getMonth() - privilege.tracker.queryTime
              )
            } else if (results.user.privilege == 'admin') {
              limitTime.setMonth(
                limitTime.getMonth() - privilege.admin.queryTime
              )
            } else {
              limitTime.setMonth(
                limitTime.getMonth() - privilege.user.queryTime
              )
            }
            let startTime
            try {
              let timestamp = track.track.timestamp.split('@', 2)
              startTime = new Date(timestamp[0])
              if (limitTime > startTime) startTime = limitTime
              endTime = new Date(timestamp[1])
              if (startTime > endTime) endTime = limitTime
            } catch (error) {
              err = {
                code: 'dataParseError',
                codeNo: 908,
                type: 'error',
                sysCall: 'track.history.configure',
                message: track.track.timestamp
              }
              process.emit('log', err)
            }
            callback(err, {
              time: {
                startMonth: startTime.getMonth(),
                startTime: startTime.toLocaleString(),
                endMonth: endTime.getMonth(),
                endTime: endTime.toLocaleString()
              }
            })
          }
        ],
        location: [
          'getName',
          'configure',
          function(results, callback) {
            let sql = ''
            let inserts = []
            if (results.getName && results.getName[0]) {
              for (
                let i = results.configure.time.startMonth;
                i <= results.configure.time.endMonth;
                i++
              ) {
                sql +=
                  'SELECT * FROM ?? WHERE timestamp BETWEEN ? AND ? AND name IN (?);'
                inserts = inserts.concat([
                  track.track.deviceType + '_location_' + i,
                  results.configure.time.startTime,
                  results.configure.time.endTime,
                  results.getName.toString()
                ])
              }
            } else {
              for (
                let i = results.configure.time.startMonth;
                i <= results.configure.time.endMonth;
                i++
              ) {
                sql += 'SELECT * FROM ?? WHERE timestamp BETWEEN ? AND ? AND ?;'
                inserts = inserts.concat([
                  track.track.deviceType + '_location_' + i,
                  results.configure.time.startTime,
                  results.configure.time.endTime,
                  { name: track.user.name }
                ])
              }
            }
            database.queryHasDestory(sql, inserts, function(err, results) {
              if (!err) {
                let temp = getLocationData(err, results)
                err = temp.err
                results = temp.results
              }
              callback(err, results)
            })
          }
        ]
      },
      function(err, results) {
        callback(err, results.locations)
      }
    )
  } else {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'track.history',
      message: track
    }
    process.emit('log', err)
    callback(err, null)
  }
}
/**
 * @description transfor the database data to send data
 * @param err database query error
 * @param results database query results
 */
function getLocationData(err, results) {
  let allData = []
  results.forEach(table => {
    if (Array.isArray(table)) {
      table.forEach(row => {
        row.timestamp = row.timestamp.toLocaleString()
        let oneRow = {}
        for (const i in row) {
          if (row.hasOwnProperty(i)) {
            const element = row[i]
            if (element) oneRow[i] = element
          }
        }
        allData.push(oneRow)
      })
    } else {
      table.timestamp = table.timestamp.toLocaleString()
      let oneRow = {}
      for (const i in table) {
        if (table.hasOwnProperty(i)) {
          const element = table[i]
          if (element) oneRow[i] = element
        }
      }
      allData.push(oneRow)
    }
  })
  if (allData.length) {
    results = { location: allData }
  } else {
    err = {
      code: 'locationNull',
      codeNo: 926,
      type: 'warn',
      sysCall: 'track.latest.locations',
      message: track
    }
  }
  return { err: err, results: results }
}
