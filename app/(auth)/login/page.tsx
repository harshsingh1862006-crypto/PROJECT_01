"use client";

import { apiClient } from "@/app/lib/apiClient";
import Link from "next/link";
import { useActionState, useState } from "react";

export type LoginState= {
    error?:string;
    success?: boolean;
};

const page = () => {
    const[state, loginAction, isPending] = useActionState(
        async(prevState:LoginState,
            formData:FormData,
        ):Promise<LoginState> =>{
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            try {
                await apiClient.login(
                    email,
                    password,
                )
                window.location.href = "/dashboard";
                return{success: true};
            } catch (error) {
                return{error: error instanceof Error? error.message : "login failed"};
            }
        },
        { error: undefined, success: false }
    );
    return (
    <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 w-full max-w-md">
        <form action={loginAction}>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Login</h2>
                <p className="mt-2 text-sm text-slate-400">
                    New here?{" "}
                    <Link href = "/register" className="font-medium text-blue-400 hover:text-blue-300">Create Account</Link>
                </p>
            </div>
            {state?.error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounder mb-4">\
                    {state.error}
                </div>
            )}
            <div className="space-y-4 mt-2">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                    <input type="email" id = "email" name="email" autoComplete="email" required
                     className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                     placeholder="Enter E-mail"/>
                </div>
            </div>
            <div className="space-y-4 mt-2">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                    <input type="password" id = "password" name="password" autoComplete="new-password" required
                     className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                     placeholder="Enter Password"/>
                </div>
            </div>
            <button type = "submit" disabled = {isPending} className="bg-blue-700 border border-blue-500 rounded-lg text-white px-4 py-2 w-full mt-3">
                {isPending? "Logging in..." : "Login"}
            </button>
        </form>
    </div>
  )
}

export default page
