var mysql = require('mysql')
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'smartspace',
  database: 'smartspace',
  connectionLimit: 100,
  multipleStatements: true
})

exports.query = function(sql, inserts, callback) {
  pool.query({ sql: mysql.format(sql, inserts), timeout: 1000 }, function(
    err,
    results,
    fields
  ) {
    if (err) {
      console.log('')
    }
    callback(err, results)
  })
}

exports.end = function() {
  pool.end()
}
