import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(request, env) {
  try {
    const { results } = await env.DB
      .prepare('SELECT * FROM riyadhus_shalihin')
      .all();

    return NextResponse.json(results);
  } catch (error) {
    console.error("D1 Query Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error', detail: String(error) },
      { status: 500 }
    );
  }
}
