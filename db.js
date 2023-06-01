let mysql = require('mysql2');
let db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0000',
    database: 'test'
});
db.connect();

module.exports = db;