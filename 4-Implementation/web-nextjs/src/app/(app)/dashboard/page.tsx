"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard"; // Corrected import path
import { BriefcaseIcon, ClipboardCheckIcon, DocumentMagnifyingGlassIcon, BeakerIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  if (session) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          DASHBOARD OVERVIEW
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Active Projects" value="12" icon={BriefcaseIcon} colorClass="bg-blue-500" />
          <DashboardCard title="Pending Tasks" value="5" icon={ClipboardCheckIcon} colorClass="bg-yellow-500" />
          <DashboardCard title="New Inspections" value="3" icon={DocumentMagnifyingGlassIcon} colorClass="bg-green-500" />
          <DashboardCard title="Lab Results" value="7" icon={BeakerIcon} colorClass="bg-purple-500" />
        </div>

        {/* Recent Activity Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">RECENT ACTIVITY</h2>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <span className="bg-green-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">NEW</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">Project #123 - Report Generated</p>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">2 hours ago</span>
              </li>
              <li className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <span className="bg-blue-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">UPDATE</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">New Sample Results Available for Project #456</p>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">5 hours ago</span>
              </li>
              <li className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <span className="bg-yellow-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">ALERT</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">Inspection #789 Completed</p>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">Yesterday</span>
              </li>
              <li className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <span className="bg-red-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">URGENT</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">Equipment Maintenance Due for Sensor X</p>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
              </li>
              <li className="flex items-center py-2">
                <span className="bg-gray-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">INFO</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">User John Doe updated profile information.</p>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">3 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // This part should ideally not be reached if redirection works correctly,
  // but it's a fallback or for the brief moment before redirection.
  return null; 
}
