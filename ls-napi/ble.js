var path = require('path')
var addon = require('./build/Release/ble.node')
let data = {
  userId: 0x111111111111,
  biSize: 4,
  bi: [
    {
      id: 'A0E6F86A8DD0',
      lati: 333,
      longi: 222,
      alti: 1,
      calibration: -61
    },
    {
      id: 'A0E6F86A8DA9',
      lati: 333 + 8,
      longi: 222,
      alti: 1,
      calibration: -61
    },
    {
      id: 'ABCDEF123456',
      lati: 333,
      longi: 222 + 8,
      alti: 1,
      calibration: -61
    },
    {
      id: '567856785678',
      lati: 333 + 8,
      longi: 222 + 8,
      alti: 1,
      calibration: -61
    }
  ],
  siSize: 6,
  si: [
    { id: 'A0E6F86A8DD0', rssi: -70, scanTime: 0 },
    { id: 'A0E6F86A8DA9', rssi: -80, scanTime: 0 },
    { id: 'ABCDEF123456', rssi: -90, scanTime: 0 },
    { id: 'ABCDEF123456', rssi: -92, scanTime: 0 },
    { id: 'ABCDEF123456', rssi: -94, scanTime: 0 },
    { id: 'DEF412341234', rssi: -94, scanTime: 0 }
  ]
}

data.bi.forEach(element => {
  element.id = Number('0x' + element.id)
})

data.si.forEach(element => {
  element.id = Number('0x' + element.id)
})

data.si[0].rssi = -70
data.si[1].rssi = -80
data.userId = 0x111111111111
console.log(
  'ret:',
  addon.ble(data, path.resolve(__dirname, 'smartpos_x64.dll'))
)
data.si[0].rssi = -80
data.si[1].rssi = -70
console.log('ret:', addon.ble(data))
data.si[0].rssi = -70
data.si[1].rssi = -80
console.log('ret:', addon.ble(data))
data.si[0].rssi = -70
data.si[1].rssi = -80
console.log('ret:', addon.ble(data))

setTimeout(() => {
  data.si[0].rssi = -70
  data.si[1].rssi = -80
  data.userId = 0x111111111111
  console.log('ret:', addon.ble(data))
  data.si[0].rssi = -80
  data.si[1].rssi = -70
  data.userId = 0x222222222222
  console.log('ret:', addon.ble(data))
  data.si[0].rssi = -70
  data.si[1].rssi = -80
  data.userId = 0x111111111111
  console.log('ret:', addon.ble(data))
  data.si[0].rssi = -70
  data.si[1].rssi = -80
  data.userId = 0x222222222222
  console.log('ret:', addon.ble(data))
}, 5100)
