import { generateToken, hashPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "../../types";

export async function POST(request: NextRequest) {
    try{
        const { name, email, password , teamCode} = await request.json();
        // Validate required fields
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
        }
        //Find exising user
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return NextResponse.json({ error: "User with this email already exists." }, { status: 409 });
        }
        let teamId: string | undefined;
        if (teamCode) {
            const team = await prisma.team.findUnique({
                where: { code: teamCode },
            });
            if (!team) {
                return NextResponse.json({ error: "Invalid team code." }, { status: 400 });
            }
            teamId = team.id;
        }

        const hashedPassword = await hashPassword(password);
        const userCount = await prisma.user.count();
        const role = userCount === 0 ? Role.ADMIN : Role.USER;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                teamId,
            },
            include: { team: true }
        })
        const token = generateToken(user.id);
        const response = NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                teamId: user.teamId,
                team: user.team,
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
        console.error("Error during registration, Something went wrong: ");
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}