// app/api/riyad/route.js
import { NextResponse } from 'next/server';
import { getConnection } from '../../../../lib/database';

export async function GET() {
  try {
    const db = getConnection();
    // Jalankan query langsung (sinkron)
    const rows = db.prepare('SELECT * FROM riyadhus_shalihin').all();
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error('DB Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
