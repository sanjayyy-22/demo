
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sanjaysanthosh@2003",
    database: "db"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database");
});


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.get('/read', (req, res) => {
    con.query('SELECT * FROM demo', (err, result) => {
        if (err) throw err;
        res.render('read', { data: result });
    });
});

app.get('/update', (req, res) => {
    res.render('update');
});

app.get('/delete', (req, res) => {
    res.render('delete');
});

app.post('/delete', (req, res) => {
    const idToDelete = req.body.id; 
    con.query('DELETE FROM demo WHERE id = ?', [idToDelete], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.post('/create', (req, res) => {
    const idToUpdate = req.body.id; 
    const newName = req.body.name; 
    const newClass = req.body.class; 
    const newAge = req.body.age; 
    
    con.query('INSERT INTO demo (id,name, class, age) VALUES (?,?, ?, ?)', [idToUpdate,newName, newClass, newAge], (err, result) => {
        if (err) throw err;
        res.redirect('/'); 
    });
});


app.post('/update', (req, res) => {
    const idToUpdate = req.body.id; 
    const newName = req.body.name; 
    const newClass = req.body.class; 
    const newAge = req.body.age; 
    
    con.query('UPDATE demo SET name = ?, class = ?, age = ? WHERE id = ?', [newName, newClass, newAge, idToUpdate], (err, result) => {
        if (err) throw err;
        res.redirect('/'); 
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
