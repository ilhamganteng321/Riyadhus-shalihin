import { NextResponse } from "next/server";
import { getConnection } from "../../../../lib/database";

export async function GET() {
  const db = getConnection();

  return new Promise((resolve) => {
    db.all("SELECT * FROM riyadhus_shalihin", [], (err, rows) => {
      if (err) {
        console.error("DB Error:", err);
        resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
      } else {
        // rows sudah berupa plain JS object -> bisa langsung
        resolve(NextResponse.json(rows, { status: 200 }));
      }
    });
  });
}
