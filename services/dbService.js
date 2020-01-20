"USE STRICT";
app.factory("dbService", function($http){
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: '0.0.0.0',
        port: '3306',
        user: 'root',
        password: 'Info@1234',
        database: 'Projeto_AutoScheduler'
    });
    conn.query("SELECT * FROM usuario", function(err, rows){
        if(err) throw err;
        console.log(rows);
    });
    return conn;  
});
