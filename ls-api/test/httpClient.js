var axios = require('axios')

const sendData = {
  user: {
    type: 'user',
    userId: 'admin',
    code: '123456'
  },
  update: [
    {
      type: 'ble',
      beaconId: 'B9407F30F5F8',
      soc: 10,
      location: 'baidu大厦'
    },
    {
      type: 'ble',
      beaconId: 'B9407F30F5F7',
      soc: 10,
      location: 'baidu大厦'
    }
  ]
}

// setInterval(function() {
axios({
  // eslint-disable-line
  method: 'post',
  url: 'http://127.0.0.1:3000/api/manage/update',
  // url: 'http://114.115.159.146:8766/api/pos/compute',
  data: sendData
})
  .then(result => {
    console.log(Date() + JSON.stringify(result.data))
  })
  .catch(err => {
    console.log('err:' + err)
  })
// }, 1000)
