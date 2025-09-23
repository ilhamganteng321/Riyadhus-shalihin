import { NextResponse } from "next/server";
// ✅ Import env dari modul cloudflare
import { env } from "cloudflare:workers";

export const runtime = "edge";

export async function GET() {
  try {
    // Binding D1 database dari Cloudflare Pages
    const db = env.DB;

    // Jalankan query
    const { results } = await db.prepare(
      "SELECT * FROM riyadhus_shalihin"
    ).all();

    // Return data sebagai JSON
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("D1 Query Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", detail: String(error) },
      { status: 500 }
    );
  }
}
