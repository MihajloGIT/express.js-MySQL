var mysql = require('mysql2');
var ejs = require('ejs');
var https = require('https');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // So secure way to do this
    password: 'root',
    database: 'frizeraj'
});

var express = require('express');
const { getMaxListeners } = require('process');
var app = express();

app.use(express.static('views'));
app.set('view engine', 'ejs');
connection.connect();

app.get('/', (req, res) => {

    connection.query('SELECT * from frizeraj.termin', function (err, rows, fields) {
        if (err) throw err;
        res.render('index', { REZULTAT: rows });
    });
    
});
app.get('/utorak', (req, res) => {

    connection.query("SELECT sat FROM frizeraj.termin where dan='utorak' ", function (err, rows, fields) {
        if (err) throw err;
        res.render('index', { REZULTAT: rows });
    });
    
});

app.get('/termini', (req, res) => {
    connection.query('SELECT sat FROM frizeraj.termin', function (err, result, fields) {
        if (err) throw err;
        let status = { created: "no", deployed: "no" };

        result.forEach((element) => {
            check_kids_status(element, status);
        });
        res.render('main', { termini: result });
    });
});

app.listen(3000);
//connection.end();