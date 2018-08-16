var express = require('express')
var router = express.Router()
var manage = require('../../lib/manage')
/* POST manage page. */
router.post('/:type', function(req, res, next) {
  let sendData = {
    general: { type: req.params.type, state: false, message: 'unkownType' }
  }
  if (req.params.type == 'insert') {
    manage.insert(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.json(sendData)
      process.emit('log', {
        code: 'insert',
        codeNo: 977,
        type: 'info',
        sysCall: 'manage.insert',
        message: { sendData: sendData, ip: req.ip }
      })
    })
  } else if (req.params.type == 'update') {
    manage.update(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.json(sendData)
      process.emit('log', {
        code: 'update',
        codeNo: 978,
        type: 'info',
        sysCall: 'manage.update',
        message: {
          sendData: sendData,
          ip: req.ip
        }
      })
    })
  } else if (req.params.type == 'delete') {
    manage.delete(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.json(sendData)
      process.emit('log', {
        code: 'delete',
        codeNo: 979,
        type: 'info',
        sysCall: 'manage.delete',
        message: { sendData: sendData, ip: req.ip }
      })
    })
  } else if (req.params.type == 'select') {
    manage.select(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.json(sendData)
      process.emit('log', {
        code: 'select',
        codeNo: 980,
        type: 'info',
        sysCall: 'manage.select',
        message: {
          sendData: sendData,
          ip: req.ip
        }
      })
    })
  } else if (req.params.type == 'config') {
    manage.config(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.json(sendData)
      process.emit('log', {
        code: 'config',
        codeNo: 981,
        type: 'info',
        sysCall: 'manage.config',
        message: {
          sendData: sendData,
          ip: req.ip
        }
      })
    })
  } else {
    res.json(sendData)
    process.emit('log', {
      code: 'unkownType',
      codeNo: 931,
      type: 'info',
      sysCall: 'manage.router.post',
      message: { ip: req.ip }
    })
  }
  process.emit('log', {
    code: 'manage',
    codeNo: 976,
    type: 'access',
    sysCall: 'manage.router.post',
    message: { body: req.body, ip: req.ip }
  })
})

module.exports = router
