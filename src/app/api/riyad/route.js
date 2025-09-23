import { NextResponse } from "next/server";
import { D1Database } from '@cloudflare/d1';

export const runtime = 'edge';

export async function GET() {
try {
  const db = env.DB;
  const { results } = await db.prepare('SELECT * FROM riyadhus_shalihin').all();
  return Response.json(results);
} catch (error) {
    console.error("D1 Query Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error', detail: String(error) },
      { status: 500 }
    );
  }
}
