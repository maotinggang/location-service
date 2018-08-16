var database = require('./database')
var auto = require('async').auto
var compute = require('./compute')
var privilege = require('../../config/privilege.json')
/**
 * @description get latest location
 * @param data  user and list and data
 * @param callback err,results
 */
exports.location = function(data, callback) {
  let locate = data
  if (locate.user.id && locate.user.code && locate.user.type) {
    auto(
      {
        // dataCheck: function(callback) {
        //   let ret = checkData(locate)
        //   callback(ret.err, ret.list)
        // },
        configure: function(callback) {
          let ret = getConfig(locate.user)
          callback(ret.err, ret.results)
        },
        ble: [
          'configure',
          // 'dataCheck',
          function(results, callback) {
            // if (results.dataCheck.includes('ble')) {
            let id = []
            locate.beacon.forEach(element => {
              id.push(element.id)
            })
            let sql =
              'SELECT * FROM ?? WHERE ? AND ?;SELECT * FROM beacon WHERE id IN (?);'

            let inserts = [
              results.configure.type,
              { id: locate.user.id },
              { code: locate.user.code },
              id
            ]

            database.queryHasDestory(sql, inserts, function(err, results) {
              if (!err) {
                let user = results[0]
                let bi = results[1]
                if (!user[0]) {
                  err = {
                    code: 'usernameOrpasswordError',
                    codeNo: 923,
                    type: 'warn',
                    sysCall: 'locate.location.ble',
                    message: locate.user
                  }
                  callback(err, null)
                } else if (!bi[0]) {
                  err = {
                    code: 'deviceUnkown',
                    codeNo: 928,
                    type: 'warn',
                    sysCall: 'locate.location.ble',
                    message: id
                  }
                  callback(err, null)
                } else {
                  compute.ble(
                    {
                      userId: locate.user.id,
                      bi: bi,
                      si: locate.beacon
                    },
                    function(err, results) {
                      if (!err) {
                        results = [
                          {
                            id: locate.user.id,
                            lati: results.lati,
                            longi: results.longi,
                            alti: results.alti
                          }
                        ]
                      }
                      callback(err, results)
                    }
                  )
                }
              } else callback(err, null)
            })
            // } else callback(null, null)
          }
        ],
        mixture: [
          'ble',
          function(results, callback) {
            results = results.ble
            callback(null, results)
          }
        ],
        save: [
          'mixture',
          function(results, callback) {
            if (locate.user.subType == 'save') {
              let sql = ''
              let inserts = [locate.user.type]
              results.mixture.forEach(element => {
                sql += 'INSERT INTO ?? VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);'
                inserts = inserts.concat(element)
              })
              database.queryHasDestory(sql, inserts, function(err, results) {
                callback(err, results)
              })
            } else callback(null, null)
          }
        ]
      },
      function(err, results) {
        if (err) process.emit('log', err)
        callback(err, results.mixture)
      }
    )
  } else {
    let err = {
      code: 'nullValue',
      codeNo: 905,
      type: 'warn',
      sysCall: 'locate.latest',
      message: locate
    }
    process.emit('log', err)
    callback(err, null)
  }
}
/**
 *@description get user's configure and privilege
 * @param user object user
 */
function getConfig(user) {
  let results = {}
  let err = null
  switch (user.type) {
    case 'user':
      results.type = 'user'
      results.isDataBase = privilege.user.isDataBase
      results.compute = privilege.user.compute
      break
    case 'tracker':
      results.type = 'user'
      results.isDataBase = privilege.tracker.isDataBase
      results.compute = privilege.tracker.compute
      break
    case 'admin':
      results.type = 'user'
      results.isDataBase = privilege.admin.isDataBase
      results.compute = privilege.admin.compute
      break
    case 'aircraft':
      results.type = 'aircraft'
      results.isDataBase = privilege.aircraft.isDataBase
      results.compute = privilege.aircraft.compute
      break
    case 'truck':
      results.type = 'truck'
      results.isDataBase = privilege.truck.isDataBase
      results.compute = privilege.truck.compute
      break
    case 'car':
      results.type = 'car'
      results.isDataBase = privilege.car.isDataBase
      results.compute = privilege.car.compute
      break
    case 'bike':
      results.type = 'bike'
      results.isDataBase = privilege.bike.isDataBase
      results.compute = privilege.bike.compute
      break
    case 'cart':
      results.type = 'cart'
      results.isDataBase = privilege.cart.isDataBase
      results.compute = privilege.cart.compute
      break
    default:
      err = {
        code: 'unkownType',
        codeNo: 931,
        type: 'error',
        sysCall: 'locate.auto.configure',
        message: user.type
      }
      break
  }
  return { err, results }
}

/**
 * @description check data and return a list
 * @param locate all data
 */
function checkData(locate) {
  let results = { err: null, list: [] }
  if (Array.isArray(locate.list) && locate.list.length > 1) {
    locate.list.forEach(element => {
      let isRight = true
      switch (element) {
        case 'beacon':
          isRight = ble(locate.beacon)
          break
        case 'wifi':
          isRight = wifi(locate.wifi)
          break
        case 'lbs':
          isRight = lbs(locate.lbs)
          break
        case 'location':
          isRight = location(locate.location)
          break
        case 'raw':
          isRight = raw(locate.raw)
          break
        default:
          break
      }
      if (isRight) results.list.push(element)
    })
    if (results.list.length < 1) {
      results.err = {
        code: 'unkownData',
        codeNo: 907,
        type: 'error',
        sysCall: 'locate.checkData',
        message: tempList
      }
    }
  } else {
    results.err = {
      code: 'unkownData',
      codeNo: 907,
      type: 'error',
      sysCall: 'locate.auto.dataProcess',
      message: locate.list
    }
  }
  return results
}

function ble(beacon) {
  let isRight = true
  if (beacon && Array.isArray(beacon)) {
    beacon.forEach(element => {
      if (!element.name || !element.rssi) isRight = false
    })
  }
  return isRight
}
function wifi(wifi) {
  let isRight = true
  if (wifi && Array.isArray(wifi)) {
    wifi.forEach(element => {
      if (!element.name || !element.rssi) isRight = false
    })
  }
  return isRight
}
function lbs(lbs) {
  let isRight = true
  if (lbs && Array.isArray(lbs)) {
    lbs.forEach(element => {
      if (!element.mnc || !element.lac || !element.cell) isRight = false
    })
  }
  return isRight
}
function location(location) {
  let isRight = true
  if (location && Array.isArray(location)) {
    location.forEach(element => {
      if (!element.name || !element.latitude_X || !element.longitude_Y)
        isRight = false
    })
  }
  return isRight
}
function raw(raw) {
  let isRight = true
  if (raw && Array.isArray(raw)) {
    raw.forEach(element => {
      if (!element.type || !Array.isArray(element.data) || !element.data[0])
        isRight = false
    })
  }
  return isRight
}
