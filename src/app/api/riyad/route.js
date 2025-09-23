import { NextResponse } from "next/server";
import { getDatabase } from "../../../../lib/database";

export async function GET(request) {
    const db = getDatabase();
    try {
        const stmt = db.prepare('SELECT * FROM riyadhus_shalihin');
        const data = stmt.all();
        return new NextResponse(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error',error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}