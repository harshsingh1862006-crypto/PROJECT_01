"use client"
import { User } from '@/app/api/types'
import React from 'react'

interface userDashboardProps {
  teamMembers: User[]
  user: User
}

const UserDashboard = ({teamMembers,user}:userDashboardProps) => {
  return (
    <main className="h-[calc(100vh-4rem)] bg-slate-900 p-8">
      <div className="mx-auto max-w-5xl h-full">
        <div className="h-full rounded-2xl border border-slate-500 bg-slate-900 shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-500 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              User Dashboard
            </h1>
            <p className="mt-1 text-slate-400">
              View your account information.
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* User ID */}
              <div className="rounded-xl border border-slate-500 bg-slate-800/40 p-6">
                <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                  User ID
                </p>
                <p className="mt-3 text-lg font-medium text-slate-300">
                  {user.id}
                </p>
              </div>

              {/* Name */}
              <div className="rounded-xl border border-slate-500 bg-slate-800/40 p-6">
                <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                  Name
                </p>
                <p className="mt-3 text-lg font-medium text-slate-300">
                  {user.name}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-slate-500 bg-slate-800/40 p-6 md:col-span-2">
                <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                  Email
                </p>
                <p className="mt-3 text-lg font-medium text-slate-300 break-all">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserDashboard
