"use client";

import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

// A component to read and display search params, needs to be a client component
function SearchResultsDisplay() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Search Results</h1>
      {query ? (
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Showing results for: <span className="font-semibold">{query}</span>
        </p>
      ) : (
        <p className="text-lg text-gray-700 dark:text-gray-300">Please enter a search term in the header.</p>
      )}
      {/* Placeholder for actual search results listing. 
          This area would typically be populated with data fetched based on the query.
      */}
      <div className="mt-8">
        <p className="text-gray-500 dark:text-gray-400">
          (Search result items will appear here in a future update.)
        </p>
      </div>
    </div>
  );
}

// The Page component itself, wrapping SearchResultsDisplay in Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4 md:p-6 text-lg">Loading search results...</div>}>
      <SearchResultsDisplay />
    </Suspense>
  );
}
