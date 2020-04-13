import mysql from 'mysql';

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2525',
    database: 'booknote'
})

connection.connect();

export default connection;