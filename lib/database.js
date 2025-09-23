import Database from 'better-sqlite3';
import path from 'path';

let db = null;

function getDatabase() {
  if (!db) {
    // ✅ path benar ke folder db/quran.db
    const dbPath = path.join(process.cwd(), 'public', 'db', 'riyadus.db');
    db = new Database(dbPath, { readonly: false }); // opsional readonly
    // db.pragma('journal_mode = WAL');
  }
  return db;
}

export { getDatabase };
