import { Role } from '@/app/api/types';
import AdminDashboard from '@/app/components/dashboard/AdminDashboard';
import { checkUserPermissions, getCurrentUser } from '@/app/lib/auth'
import { prisma } from '@/app/lib/db';
import { transformTeams, transformUsers } from '@/app/lib/util';
import { redirect } from 'next/navigation';

const AdminPage = async () => {
    const user = await getCurrentUser();
    if(!user || !checkUserPermissions(user,Role.ADMIN)){
        redirect("/unauthorized")
    }
    const [prismaUsers,prismaTeams] = await Promise.all([
        prisma.user.findMany({
            include: {
                team: true,
            },
            orderBy: { createdAt: "desc"}
        }),
        prisma.team.findMany({
            include: {
                members: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        email: true
                    },
                },
            },
        }),
    ]);
    const users = transformUsers(prismaUsers);
    const teams = transformTeams(prismaTeams);
    return(
        <AdminDashboard users = {users} teams = {teams} currentUser={user}></AdminDashboard>
    )
    
};

export default AdminPage
