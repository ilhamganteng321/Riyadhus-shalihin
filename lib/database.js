const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function getConnection() {

    // Naik 1 folder dari /lib ke root, lalu masuk ke /database/p.db
    const dbPath = path.join(process.cwd(), 'public', 'db', 'riyadus.db');
    console.log('Database path:', dbPath); // untuk debug

    return new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error('Failed to connect to database:', err.message);
        } else {
            console.log('Connected to the database.');
        }
    });
}

module.exports = { getConnection }; // pakai module.exports kalau CommonJS
