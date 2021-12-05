const mysql = require('mysql');

function newConn()
{
    let conn = mysql.createConnection({
        host:'localhost',
        user: 'root',
        password:'MySQL3309@uwo',
        database:'team12'
    });
    return conn;
}
module.exports = newConn;