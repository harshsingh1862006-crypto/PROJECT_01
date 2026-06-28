import { getCurrentUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/dist/server/web/exports";
import { Role } from "../types";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/db";

export async function GET(request: NextRequest ) {
    try{
        const user = await getCurrentUser();
        if(!user){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const searchParams = new URL(request.url).searchParams;
        const teamId = searchParams.get("teamId");
        const role = searchParams.get("role");
        const where: Prisma.UserWhereInput = {};

        if(user.role === Role.ADMIN){

        }
        
        else if(user.role === Role.MANAGER){
            where.OR = [{teamId : user.teamId}, {role : Role.USER}];
        }
        
        else{
            where.teamId = user.teamId;
            where.role = {not: Role.ADMIN};
        }

        if(teamId){
            where.teamId = teamId;
        }
        if(role){
            where.role = role as Role;
        }

        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                team: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                createdAt: true,

            },
            orderBy: {
                createdAt: "desc",
            }
        });
        return NextResponse.json({ users })
    }catch(error){
        console.error("Get user error: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}