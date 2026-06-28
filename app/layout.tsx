import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./provider/AuthProvider";



export const metadata: Metadata = {
  title: "Employee Management System",
  description: "Task-2 for Full Stack Developer Internship at Prodigy Infotech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className = "min-h-screen bg-slate-950 text-slate">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
