"use client"

import { User } from "@/app/api/types";
import { apiClient } from "@/app/lib/apiClient";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  user: User | null;
}
  
const Header =  ({ user }: HeaderProps) => {
  const pathname = usePathname();
  const navigation = [
    { name: "Home", href: "/", show: true },
    { name: "Dashboard", href: "/dashboard", show: true },
  ].filter((item) => item.show);

  const getNavItemClass = (href: string) => {
    let isActive = true;
    if (href === "/") {
      isActive = pathname === "/";
    }else if (href === "/dashboard") {
      isActive = pathname.startsWith(href);
    }
    return isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white";
  }

  const LogOut = async() =>{
    try {
      await apiClient.logout();
        window.location.href = "/";
        return{success: true};
    } catch (error) {
        return{error: error instanceof Error? error.message : "logout failed"};
    }
  }

  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-white text-xl font-bold">
            My App
          </Link>
          <nav className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={getNavItemClass(item.href)}>
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
              <button onClick={LogOut} className="text-slate-400 hover:text-white">
                Logout
              </button>
              <Link href="/login" className="text-slate-400 hover:text-white">
                Login
              </Link>
          </div>
        </div> 
      </div>
    </header>
  )
}

export default Header

