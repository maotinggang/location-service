var express = require('express')
var router = express.Router()
var locate = require('../../lib/locate')
/* GET locate page. */
router.post('/:type', function(req, res, next) {
  let sendData = {
    general: { type: req.params.type, state: false, message: 'unkownType' }
  }
  if (req.params.type == 'save') {
    locate.location(req.body, function(err, results) {
      if (!err) {
        process.emit('log', {
          code: 'locateSave',
          codeNo: 974,
          type: 'info',
          sysCall: 'locate.save',
          message: { results: results, ip: req.ip }
        })
      }
    })
  } else if (req.params.type == 'compute') {
    locate.location(req.body, function(err, results) {
      if (err) {
        sendData.general.message = err.code
        sendData.timestamp = req.body.timestamp
      } else {
        sendData = {
          pos: results,
          timestamp: req.body.timestamp
        }
      }
      res.json(sendData)
      process.emit('log', {
        code: 'locateCompute',
        codeNo: 975,
        type: 'info',
        sysCall: 'locate.compute',
        message: { sendData: sendData, ip: req.ip }
      })
    })
  } else {
    res.json(sendData)
    process.emit('log', {
      code: 'unkownType',
      codeNo: 931,
      type: 'info',
      sysCall: 'locate.router.post',
      message: { ip: req.ip }
    })
  }
  process.emit('log', {
    code: 'locate',
    codeNo: 973,
    type: 'access',
    sysCall: 'locate.router.post',
    message: { body: req.body, ip: req.ip }
  })
})

module.exports = router
