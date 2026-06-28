import React from 'react'
import Link from 'next/link'
import { getCurrentUser } from '../lib/auth'

const Home = async() => {
  const user = await getCurrentUser();
  return (
    <div className = "max-w-4xl mx-auto my-8 px-4 py-8">

      <h1 className = "text-3xl font-bold mb-6 text-white">Employee Management System</h1>

      <p className = "mb-8 text-gray-300">Welcome to the Employee Management System! This is the Task-02 Project Employee Management System. It has a user-friendly interface and provides efficient management of employee information. With a access level system to protect the data of the users and sensitive information.</p>
      
      <div className='grid md:grid-cols-2 gap-6 mb-8'>
        <div className="bg-slate-800 p-6 border border-slate-700 rounded-l-lg">

          <h3 className="font-semibold mb-3 text-white">Features Demonstrated</h3>

          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Role-base Access</li>
            <li>Access Level System</li>
            <li>Database Integration</li>
            <li>Responsive Design</li>
          </ul>

        </div>

        <div className="bg-slate-800 p-6 border border-slate-700 rounded-l-lg">

          <h3 className="font-semibold mb-3 text-white">User Roles</h3>

          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Admin</li>
            <li>User</li>
          </ul>

        </div>

      </div>
      {user ? <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
        <p className="font-bold">
          Welcome back, <strong>{user.name}</strong>! You have successfully logged in.
        </p>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          View Dashboard
        </Link>
      </div>
      :
      <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
        <Link href="/register" className="text-slate-300 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-2 mt-2">
          Register
        </Link>
        <Link href="/login" className="text-slate-300 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-2 mt-2">
          Login
        </Link>
      </div>
      }
    </div>
  )
}

export default Home
