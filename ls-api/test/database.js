var database = require('../src/lib/database')
var mysql = require('mysql')

// var sql = 'select * from ??'
// var inserts = ['user']
// database.queryHasRelease(sql, inserts, function(err, results) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(results)
//   }
// })

let start = '2018-5-31 12:18:01'
let end = '2018-5-31 12:18:15'
let userType = 'user'
let sql = ''
let inserts = []

sql = 'SELECT * FROM user WHERE ?; SELECT * FROM user WHERE ? AND ?;'
inserts = [{ userId: 'admi' }, { userId: 'admin' }, { code: '123456' }]

database.queryHasDestory(sql, inserts, function(err, results) {
  if (err) {
    console.log('errjson=' + JSON.stringify(err))
  } else {
    console.log(JSON.stringify(results))
    console.log(JSON.stringify(results[0][0]))
  }
})
