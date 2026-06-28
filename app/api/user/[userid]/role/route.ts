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

        if (userid === user.id) {
            return NextResponse.json({
                error:"You are not autherized to change your own team assignment, Please contact another admin for this action"
            });
        }

        const role = await request.json();

        const validateRole = [Role.MANAGER, Role.USER];

        if (!validateRole.includes(role)) {
            return NextResponse.json({ error: "Can not have more than one Admin Role user, OR Invalid role." }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userid },
            data: {
                role: role
            },
            include: {
                team: true
            }
        });
        return NextResponse.json({ user: updatedUser, message: `User role updated to ${role} succesfully` });
    }catch(error){
        console.error("Error updating user Role:", error);
        if(error instanceof Error && error.message.includes("Record to update not found")){
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }
        else{
            return NextResponse.json({ error: "Internal server error, Something whent wrong" }, { status: 500 });
        }

    }

}