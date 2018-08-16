var addon = require('C:/node/ble.node')
/**
 *@description compute the user's location
 * @param data database and user ble data
 * @param callback  {err,results}
 */
exports.ble = function(data, callback) {
  try {
    data.bi.forEach(element => {
      let id = toHex(element.id)
      if (id) element.id = id
    })
    data.si.forEach(element => {
      let id = toHex(element.id)
      if (id) element.id = id
      element.rssi = Number(element.rssi)
      if (isNaN(element.rssi)) element.rssi = -200
      element.scanTime = Number(element.scanTime)
      if (isNaN(element.scanTime)) element.scanTime = -100000
    })
    data.userId = toHex(data.userId)
    data.biSize = data.bi.length
    data.siSize = data.si.length
  } catch (err) {
    callback(
      {
        code: 'unkownData',
        codeNo: 907,
        type: 'warn',
        sysCall: 'compute.ble',
        message: err.message
      },
      null
    )
  }

  let ret = addon.ble(data, 'C:\\node\\smartpos_x64.dll')
  let err = null
  let pos = {}
  if (ret.code == 960) {
    pos.lati = Number(ret.lati.toFixed(8))
    pos.longi = Number(ret.longi.toFixed(8))
    pos.alti = Number(ret.alti.toFixed(4))
  } else err = ret
  callback(err, pos)
}

function toHex(data) {
  if (!data) return -1
  let temp = Number('0x' + data)
  if (!temp) {
    temp = 0
    for (let index = 0; index < data.length; index++) {
      let element = data.charCodeAt(index)
      temp += element ** 3 * (10 * index + (data.length - index) ** 2)
    }
    temp = Number('0x' + temp)
  }
  return temp
}
