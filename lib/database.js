import Database from "better-sqlite3";
import path from "path";

// Next.js menyediakan folder public di process.cwd()/public
export function getConnection() {
  // Langsung ke public/riyadus.db
  const dbPath = path.join(process.cwd(), "public", "cihuy.db");

  console.log("DB PATH:", dbPath); // debug di log Vercel
  const db = new Database(dbPath, {
    readonly: true,
    fileMustExist: true,
  });

  return db;
}
