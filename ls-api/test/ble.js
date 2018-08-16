var axios = require('axios')

const sendData = {
  user: {
    type: 'user',
    id: 'maogang',
    code: '7OF3c4f81zHePe4QSnKMsfd6HfU='
  },
  beacon: [
    { id: 'A0E6F86A8DA9', rssi: -80, scanTime: 0 },
    { id: 'A0E6F86A8DD0', rssi: -70, scanTime: 0 },
    { id: 'ABCDEF123456', rssi: -90, scanTime: 0 },
    { id: 'ABCDEF123456', rssi: -92, scanTime: 0 },
    { id: 'ABCDEF123456', rssi: -94, scanTime: 0 },
    { id: 'DEF412341234', rssi: -94, scanTime: 0 }
  ]
}

setInterval(function() {
  axios({
    // eslint-disable-line
    method: 'post',
    // url: 'http://127.0.0.1:3000/api/pos/compute',
    url: 'http://114.115.159.146:8766/api/pos/compute',
    data: sendData
  })
    .then(result => {
      console.log(Date() + JSON.stringify(result.data))
    })
    .catch(err => {
      console.log('err:' + err)
    })
}, 100)
