import { getCurrentUser } from "@/app/lib/auth";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function GET(request: NextRequest) {
    try{
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(userAgent);
    }catch(error){
        console.error("Error fetching current user: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}