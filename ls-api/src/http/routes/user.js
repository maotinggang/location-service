var express = require('express')
var router = express.Router()
var user = require('../../lib/user')
/* POST users */
router.post('/:type', function(req, res) {
  let sendData = {
    general: { type: req.params.type, state: false, message: 'unkownType' }
  }
  if (req.params.type == 'login') {
    user.login(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.json(sendData)
      process.emit('log', {
        code: 'login',
        codeNo: 962,
        type: 'info',
        sysCall: 'user.login',
        message: { sendData: sendData, ip: req.ip }
      })
    })
  } else if (req.params.type == 'regist') {
    user.regist(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.json(sendData)
      res.end(sendData)
      process.emit('log', {
        code: 'regist',
        codeNo: 963,
        type: 'info',
        sysCall: 'user.regist',
        message: { sendData: sendData, ip: req.ip }
      })
    })
  } else if (req.params.type == 'unregist') {
    user.unregist(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.json(sendData)
      process.emit('log', {
        code: 'unregist',
        codeNo: 964,
        type: 'info',
        sysCall: 'user.unregist',
        message: { sendData: sendData, ip: req.ip }
      })
    })
  } else if (req.params.type == 'userSet') {
    user.userSet(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.json(sendData)
      process.emit('log', {
        code: 'userSet',
        codeNo: 965,
        type: 'info',
        sysCall: 'user.userSet',
        message: { sendData: sendData, ip: req.ip }
      })
    })
  } else {
    res.json(sendData)
    process.emit('log', {
      code: 'unkownType',
      codeNo: 971,
      type: 'info',
      sysCall: 'user.router.post',
      message: { sendData: sendData, ip: req.ip }
    })
  }
  process.emit('log', {
    code: 'userAccess',
    codeNo: 981,
    type: 'access',
    sysCall: 'user.router.post',
    message: { body: req.body, ip: req.ip }
  })
})

module.exports = router
