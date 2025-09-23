import Database from 'better-sqlite3';
import path from 'path';

let db = null;

export function getDatabase() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'public', 'db', 'riyadus.db');

    db = new Database(dbPath, {
      readonly: true,        // ✅ Hanya baca
      fileMustExist: true    // ✅ Lempar error kalau file tidak ada
    });
  }
  return db;
}
