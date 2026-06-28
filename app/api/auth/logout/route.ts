import { NextResponse } from "next/dist/server/web/exports";


export async function POST() {
    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    response.cookies.delete({
        name: "token",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",  
        maxAge: 0,    
    });
    return response;
}