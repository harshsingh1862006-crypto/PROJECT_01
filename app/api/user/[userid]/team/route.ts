import { Role } from "@/app/api/types";
import { checkUserPermissions, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, context: { params: Promise<{ userid: string }> }) {
    try{
        const { userid } = await context.params;
        const user = await getCurrentUser();
        if(!user || !checkUserPermissions(user, Role.ADMIN)){
            return NextResponse.json({
                error:"You are not autherized to perform this action"
            });
        }
        const teamId = await request.json();
        if (teamId) {
            const team = await prisma.team.findUnique({
                where: { id: teamId },
            });
            if (!team) {
                return NextResponse.json({ error: "Invalid team ID." }, { status: 400 });
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userid },
            data: {
                teamId: teamId
            },
            include: {
                team: true
            }
        });
        return NextResponse.json({ user: updatedUser, message: teamId ? "user is succesfully assigned to the team" : "user is succesfully unassigned from the team" });
    }catch(error){
        console.error("Error updating user team:", error);
        if(error instanceof Error && error.message.includes("Record to update not found")){
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }
        else{
            return NextResponse.json({ error: "Internal server error, Something whent wrong" }, { status: 500 });
        }

    }

}