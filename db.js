// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, avatar TEXT)");
    db.run("CREATE TABLE favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, articleId TEXT)");
    db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, articleId TEXT, comment TEXT)");

    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    stmt.run("admin", "admin123");
    stmt.finalize();
});

module.exports = db;