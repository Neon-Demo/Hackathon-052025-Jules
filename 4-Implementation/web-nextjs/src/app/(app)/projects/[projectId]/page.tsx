"use client";

import { useParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { DocumentTextIcon, BeakerIcon, ClipboardDocumentCheckIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'; // Example icons
import Link from 'next/link';

type TabName = "Details" | "Inspections" | "Samples" | "Documents";

const ProjectDetailsContent = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const [activeTab, setActiveTab] = useState<TabName>("Details");

  const tabs: { name: TabName; icon?: React.ElementType }[] = [
    { name: "Details" },
    { name: "Inspections" },
    { name: "Samples" },
    { name: "Documents" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Details":
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">PROJECT TIMELINE</h3>
            <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6 mb-6">
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="bg-blue-500 w-2 h-2 rounded-full mr-3"></span>
                  May 8 - Created
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-500 w-2 h-2 rounded-full mr-3"></span>
                  May 9 - Assigned to John Doe
                </li>
                <li className="flex items-center">
                  <span className="bg-yellow-500 w-2 h-2 rounded-full mr-3"></span>
                  May 10 - Inspection Scheduled
                </li>
                <li className="flex items-center">
                  <span className="bg-yellow-500 w-2 h-2 rounded-full mr-3"></span>
                  May 11 - Equipment Reserved
                </li>
                <li className="flex items-center">
                  <span className="bg-green-500 w-2 h-2 rounded-full mr-3"></span>
                  May 12 - Inspection Completed
                </li>
                <li className="flex items-center">
                  <span className="bg-green-500 w-2 h-2 rounded-full mr-3"></span>
                  May 12 - 15 Samples Collected
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">QUICK ACTIONS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-150">
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" /> New Inspection
              </button>
              <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-150">
                <DocumentTextIcon className="h-5 w-5 mr-2" /> Generate Report
              </button>
              <button className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-150">
                <BeakerIcon className="h-5 w-5 mr-2" /> Send to Lab
              </button>
              <button className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-150">
                <DevicePhoneMobileIcon className="h-5 w-5 mr-2" /> Mobile View
              </button>
            </div>
          </div>
        );
      case "Inspections":
        return <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow"><p className="text-gray-700 dark:text-gray-300">Inspections content for project {projectId} will be displayed here.</p></div>;
      case "Samples":
        return <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow"><p className="text-gray-700 dark:text-gray-300">Samples content for project {projectId} will be displayed here.</p></div>;
      case "Documents":
        return <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow"><p className="text-gray-700 dark:text-gray-300">Documents content for project {projectId} will be displayed here.</p></div>;
      default:
        return null;
    }
  };

  if (!projectId) {
    return <div className="p-4 md:p-6 text-center text-gray-500">Loading project details...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PROJECT #{projectId}</h1>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>STATUS: <span className="font-semibold text-green-500">Active</span></span>
          <span className="ml-4">CLIENT: <span className="font-semibold">ACME Corp</span></span>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors duration-150
                  ${
                    activeTab === tab.name
                      ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
              >
                {tab.icon && <tab.icon className="inline-block h-5 w-5 mr-2" />}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default function ProjectDetailsPage() {
  // useSearchParams needs to be wrapped in Suspense if used directly in a page component
  // that isn't already a child of a Suspense boundary.
  // Since useParams is used in ProjectDetailsContent, and page.tsx is the entry,
  // we wrap ProjectDetailsContent in Suspense here.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectDetailsContent />
    </Suspense>
  );
}
