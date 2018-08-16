var crypto = require('crypto')
let password = '123454sfafds5'
let hash = crypto.createHmac('md5', 'SmartSpace')
let cryptoPassword = hash.update(password).digest('base64')
console.log(cryptoPassword)
