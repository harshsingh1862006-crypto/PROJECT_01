import { Role } from '@/app/api/types';
import UserDashboard from '@/app/components/dashboard/UserDashboard';
import { checkUserPermissions, getCurrentUser } from '@/app/lib/auth'
import { prisma } from '@/app/lib/db';
import { transformUsers } from '@/app/lib/util';
import { redirect } from 'next/navigation';
import React from 'react'

const UserPage = async () => {
    const user = await getCurrentUser();
    if(!user ){
        redirect("/login")
    }
    const teamMembers = user.teamId ? prisma.user.findMany({
            where: {
                teamId: user.teamId,
                role: {not : Role.ADMIN}
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        }): [];

    const members = transformUsers(teamMembers);
    return(
        <UserDashboard teamMembers = {members} user={user}></UserDashboard>
    )
    
};

export default UserPage
