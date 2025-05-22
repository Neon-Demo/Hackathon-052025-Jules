"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session && pathname !== "/login" && pathname !== "/password-reset") { // Allow access to login and password-reset
      router.push("/login");
    }
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading session...</div>;
  }
  
  // If not authenticated and not on a public page, don't render the layout
  // This check is mostly for scenarios where redirection hasn't happened yet.
  if (!session && pathname !== "/login" && pathname !== "/password-reset") {
    return null; // Or a loading/redirecting indicator
  }
  
  // For login and password reset pages, we don't want the app layout
  if (pathname === "/login" || pathname === "/password-reset") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
