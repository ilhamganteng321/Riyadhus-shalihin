import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db = null;

export function getDatabase() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'tmp', 'db', 'riyadus.db');

    // 🔎 LOG: cek path
    console.log('[DB] Trying to open:', dbPath);

    // 🔎 LOG: cek apakah file ada
    console.log('[DB] Exists?', fs.existsSync(dbPath));

    try {
      db = new Database(dbPath, {
        readonly: true,         // ✅ HARUS true di Vercel/Cloudflare
        fileMustExist: true
      });
      console.log('[DB] Connection success');
    } catch (err) {
      console.error('[DB] Connection failed:', err);
      throw err;
    }
  }
  return db;
}
