// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3001;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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

    if (username.length < 4 || password.length < 8) {
        res.status(400).send({ message: 'Имя пользователя должно быть не менее 4 символов, а пароль не менее 8 символов.' });
        return;
    }

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (row) {
            res.status(400).send({ message: 'Пользователь с таким именем уже существует.' });
        } else {
            db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function(err) {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(201).send({ message: 'User registered successfully', userId: this.lastID });
                }
            });
        }
    });
});

app.post('/avatar/:userId', upload.single('avatar'), (req, res) => {
    const userId = req.params.userId;
    const avatar = req.file.path;
    db.run("UPDATE users SET avatar = ? WHERE id = ?", [avatar, userId], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send({ message: 'Avatar updated successfully', avatar: avatar });
        }
    });
});

app.get('/favorites/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all("SELECT * FROM favorites WHERE userId = ?", [userId], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/favorites', (req, res) => {
    const { userId, articleId } = req.body;
    db.run("INSERT INTO favorites (userId, articleId) VALUES (?, ?)", [userId, articleId], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send({ message: 'Article added to favorites', favoriteId: this.lastID });
        }
    });
});

app.delete('/favorites', (req, res) => {
    const { userId, articleId } = req.body;
    db.run("DELETE FROM favorites WHERE userId = ? AND articleId = ?", [userId, articleId], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send({ message: 'Article removed from favorites' });
        }
    });
});

app.post('/comments', (req, res) => {
    const { userId, articleId, comment } = req.body;
    db.run("INSERT INTO comments (userId, articleId, comment) VALUES (?, ?, ?)", [userId, articleId, comment], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send({ message: 'Comment added', commentId: this.lastID });
        }
    });
});

app.get('/comments/:articleId', (req, res) => {
    const articleId = req.params.articleId;
    db.all("SELECT * FROM comments WHERE articleId = ?", [articleId], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(rows);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});