import { generateToken, hashPassword, verifyPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "../../types";

export async function POST(request: NextRequest) {
    try{
        const { email, password} = await request.json();
        // Validate required fields
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }
        //Find exising user
        const userFromDb = await prisma.user.findUnique({
            where: { email },
            include: { team: true },
        });

        if (!userFromDb) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        const isValidPassword = await verifyPassword(password, userFromDb.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        const token = generateToken(userFromDb.id);
        const response = NextResponse.json({
            user: {
                id: userFromDb.id,
                email: userFromDb.email,
                name: userFromDb.name,
                role: userFromDb.role,
                teamId: userFromDb.teamId,
                team: userFromDb.team,
                token,
            },
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });
        return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
        console.error("Error during login, Something went wrong: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}