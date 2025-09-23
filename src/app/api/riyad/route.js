import { NextResponse } from "next/server";

// 🔑 Penting: Edge runtime
export const runtime = 'edge';

export async function GET(request) {
  try {
    // Ambil binding D1 dari environment
    const db = process.env.DB;   // ✅ tanpa "as any"

    // Jalankan query
    const { results } = await db.prepare(
      'SELECT * FROM riyadhus_shalihin'
    ).all();

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("D1 Query Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error', detail: String(error) },
      { status: 500 }
    );
  }
}
