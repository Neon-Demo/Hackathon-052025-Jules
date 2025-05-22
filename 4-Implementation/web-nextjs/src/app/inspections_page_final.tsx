```tsx
"use client";

import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function InspectionsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inspections</h1>
        <Link href="/inspections/new" passHref>
          <button className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-150">
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Set up New Inspection
          </button>
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-gray-700 dark:text-gray-300">
          This is the main inspections page. Future content will list existing inspections.
        </p>
        {/* Placeholder for listing inspections */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">No inspections to display yet.</p>
        </div>
      </div>
    </div>
  );
}
```
