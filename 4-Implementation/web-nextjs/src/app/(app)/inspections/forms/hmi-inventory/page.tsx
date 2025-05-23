"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CameraIcon, ArrowLeftIcon, PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface HmiItem {
  materialDescription: string;
  location: string;
  quantity: string;
  condition: string;
  risk: string;
  // photo: File | null; // For actual file upload
}

export default function HMIInventoryPage() {
  const router = useRouter();
  const [item, setItem] = useState<HmiItem>({
    materialDescription: '',
    location: '',
    quantity: '',
    condition: 'Good',
    risk: 'Low',
    // photo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPhoto = () => {
    // Placeholder for photo upload logic
    console.log("Add photo clicked");
    alert("Photo functionality not yet implemented.");
  };

  const handleAddToInventory = () => {
    console.log("Item to add:", item);
    alert("Item added to inventory (simulated). Form will be cleared.");
    // Clear form for next item - in a real app, this would likely add to a list
    setItem({
      materialDescription: '',
      location: '',
      quantity: '',
      condition: 'Good',
      risk: 'Low',
    });
  };

  const handleSaveAndFinish = () => {
    console.log("Final HMI Inventory (current item):", item);
    alert("HMI Inventory saved (simulated). Navigating to Inspections page.");
    router.push('/inspections');
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HMI Inventory</h1>
        <Link href="/inspections/new" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Inspection Setup
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Add New Material to Inventory</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Material Description */}
          <div>
            <label htmlFor="materialDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Material Description
            </label>
            <input
              type="text"
              name="materialDescription"
              id="materialDescription"
              value={item.materialDescription}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Asbestos Pipe Lagging"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={item.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Boiler Room, Section A"
            />
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              value={item.quantity}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., 10 linear feet, 5 sq meters"
            />
          </div>

          {/* Condition */}
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={item.condition}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
              <option>Damaged</option>
            </select>
          </div>

          {/* Risk Evaluation */}
          <div>
            <label htmlFor="risk" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Risk Evaluation
            </label>
            <select
              id="risk"
              name="risk"
              value={item.risk}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          
          {/* Photo Attachment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Photo
            </label>
            <button
              type="button"
              onClick={handleAddPhoto}
              className="mt-1 w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              Add Photo
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleAddToInventory}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add to Inventory
            </button>
            <button
              type="button"
              onClick={handleSaveAndFinish}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Save and Finish HMI
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```
