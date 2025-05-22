"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CameraIcon, MapPinIcon, ArrowLeftIcon, PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface SampleData {
  sampleId: string;
  material: string;
  location: string;
  notes: string;
  // photo and gps would be handled differently in a real app
}

export default function BulkSampleCollectionPage() {
  const router = useRouter();
  const [sampleId, setSampleId] = useState('');
  const [material, setMaterial] = useState('Asbestos');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveSample = () => {
    const sampleData: SampleData = {
      sampleId,
      material,
      location,
      notes,
    };
    console.log("Sample Data:", sampleData);
    alert("Sample data logged to console. In a real app, this would be saved.");
    // Optionally, reset form or navigate
  };

  const handleAddAnotherSample = () => {
    console.log("Add another sample clicked.");
    // Reset form fields for a new entry
    setSampleId('');
    setMaterial('Asbestos');
    setLocation('');
    setNotes('');
    alert("Form cleared for new sample entry.");
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bulk Sample Collection</h1>
        <Link href="/inspections/new" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Inspection Setup
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Sample ID */}
          <div>
            <label htmlFor="sampleId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sample ID
            </label>
            <input
              type="text"
              name="sampleId"
              id="sampleId"
              value={sampleId}
              onChange={(e) => setSampleId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="[Auto-generated or Manual ID]"
            />
          </div>

          {/* Material */}
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Material
            </label>
            <select
              id="material"
              name="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Asbestos">Asbestos</option>
              <option value="Lead">Lead</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location Details */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Kitchen Ceiling Tile, Pipe lagging in basement"
            />
          </div>

          {/* Photo Attachment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Photo
            </label>
            <button
              type="button"
              className="mt-1 w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              Add Photo
            </button>
          </div>

          {/* GPS Coordinates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              GPS Coordinates
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <MapPinIcon className="h-5 w-5 mr-2" />
                Get GPS Coordinates
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">Lat: --.--, Lng: --.--</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Additional details about the sample..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleSaveSample}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Save Sample
            </button>
            <button
              type="button"
              onClick={handleAddAnotherSample}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add Another Sample
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```
