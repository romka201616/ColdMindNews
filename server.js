// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (row) {
            res.status(200).send({ message: 'Login successful', user: row });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send({ message: 'User registered successfully', userId: this.lastID });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});