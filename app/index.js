const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db-mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

function getConnection() {
    const mysql = require('mysql')
    return mysql.createConnection(config)
}

function insert() {
    const mysqlConnection = getConnection()
    const sql = `INSERT INTO people(name) VALUES('WILLER')`
    mysqlConnection.query(sql)
    mysqlConnection.end()
}

function search(res) {
    const mysqlConnection = getConnection()
    const sql = `SELECT * FROM people`
    
    return new Promise((success, failure) => {
        mysqlConnection.query(sql, function(err, result, fields) {
            if (err) {
                failure(err)
            } else {
                var rows = '<table>'
                console.log(result)
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    console.log(row.id + '\t' + row.name);
                    rows += '<tr><td>' + row.id + '</td><td>' + row.name + '</td></tr>';
                });
                rows += '</table>'
                success(rows)
            }
        })
        mysqlConnection.end()
    })
}

app.get('/', async (req, res) => {
    insert();
    const rows = await search()
    res.send('<h1>Full Cycle</h1><br/>' + rows)
})

app.listen(port, () => {
    console.log('Running at port ' + port)
})

insert();