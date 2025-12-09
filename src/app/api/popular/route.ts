
import ddb from "@/utils/db/mysql";
import { NextResponse , NextRequest} from "next/server";

export async function GET() {
    try {
        const [rows] = await ddb.query("SELECT * FROM popular");

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "No trendingtools found" },
                { status: 404 }
            );
        }

        // ✅ Return the users
        return NextResponse.json(
            { success: true, data: rows },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: "Database error", details: process.env.DB_HOST },
            { status: 500 }
        );
    }
}