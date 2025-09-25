import Database from "better-sqlite3";
import path from "path";

export function getConnection() {
  const dbPath = path.join(process.cwd(), "public", "riyadus.db");
  const db = new Database(dbPath, {
    readonly: true,
    fileMustExist: true,
  });
  // Optional: paksa non-WAL di runtime
  
  return db;

}
