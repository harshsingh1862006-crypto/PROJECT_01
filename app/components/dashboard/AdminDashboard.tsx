"use client"

import { Role, Team, User } from "@/app/api/types";


interface adminDashboardProps {
    users: User[],
    teams: Team[],
    currentUser: User
}

const AdminDashboard = ({users,teams,currentUser}: adminDashboardProps) => {
  return (
    <div className="space-y-6 mx-10 my-4">
        <div>
            <h1 className="text-2xl font-bold mb-2 text-white">
                Admin Dashboard
            </h1>
            <p className="text-slate-300">User and Team Management</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg">
                <div className="p-4 border-b border-slate-700">
                    <h3 className="fornt-semibold text-white"> Users ({users.length})</h3>
                    <p className="text-slate-400 text-sm">Manage Role and Team assighnment</p>
                </div>
                <div className="p-4">
                    <table className = "w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-2 text-slate-300">Name</th>
                                <th className="text-left py-2 text-slate-300">Role</th>
                                <th className="text-left py-2 text-slate-300">ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) =>(
                                <tr className="border-b border-slate-700" key ={user.id}>
                                    <td className="py-2 text-slate-300">
                                        <div className="flex item-center space-x-2">
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div>{user.name}</div>
                                                <div className="text-slate-500 text-xs">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2">
                                        <div>
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="py-2">
                                        <div>
                                            {user.id}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard
