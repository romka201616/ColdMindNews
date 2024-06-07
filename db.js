// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    stmt.run("admin", "admin123");
    stmt.finalize();
});

module.exports = db;