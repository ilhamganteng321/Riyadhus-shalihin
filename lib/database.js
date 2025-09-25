const Database = require('better-sqlite3');
const path = require('path');

function getConnection() {
    // Path ke file database
    const dbPath = path.join(process.cwd(), 'public', 'riyadus.db');
    console.log('Database path:', dbPath);

    // Opsi { readonly: true } untuk Vercel agar tidak menulis file
    const db = new Database(dbPath, { readonly: true });

    return db;
}

module.exports = { getConnection };
