var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit: 10,
    host           : 'classmysql.engr.oregonstate.edu',
    user           : 'cs340_ojimar',
    password       : '6166',
    database       : 'cs340_ojimar'
})

module.exports.pool = pool;