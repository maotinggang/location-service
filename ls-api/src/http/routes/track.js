var express = require('express')
var router = express.Router()
var track = require('../../lib/track')

/* GET track page. */
router.post('/:type', function(req, res, next) {
  let sendData = {
    general: { type: req.params.type, state: false, message: 'unkownType' }
  }
  if (req.params.type == 'latest') {
    track.latest(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.end(sendData)
      process.emit('log', {
        code: 'trackLatest',
        codeNo: 971,
        type: 'info',
        sysCall: 'track.router.post.latest',
        message: sendData + req.ip
      })
    })
  } else if (req.params.type == 'history') {
    track.history(req.body, function(err, results) {
      if (err) sendData.general.message = err.code
      else {
        sendData.general.state = true
        sendData.general.message = results
      }
      res.end(sendData)
      process.emit('log', {
        code: 'trackHistory',
        codeNo: 972,
        type: 'info',
        sysCall: 'track.router.post.history',
        message: sendData + req.ip
      })
    })
  } else {
    res.end(sendData)
    process.emit('log', {
      code: 'unkownType',
      codeNo: 931,
      type: 'info',
      sysCall: 'track.router.post',
      message: req.ip
    })
  }
  process.emit('log', {
    code: 'track',
    codeNo: 970,
    type: 'access',
    sysCall: 'track.router.post',
    message: req.body + req.ip
  })
})

module.exports = router
