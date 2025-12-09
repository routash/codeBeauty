import ddb from "@/utils/db/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [categories] = await ddb.query("SELECT * FROM categories");
        const [subcategories] = await ddb.query("SELECT * FROM subcategories");

        if (categories.length === 0 && subcategories.length === 0) {
            return NextResponse.json(
                { error: "No categories or subcategories found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                success: true, 
                data: {
                    categories,
                    subcategories
                }
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { 
                error: "Database error",
                details: error.message
            },
            { status: 500 }
        );
    }
}
