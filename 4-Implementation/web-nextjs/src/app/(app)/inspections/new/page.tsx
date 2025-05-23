"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const equipmentList = [
  { id: 'xrf', label: 'XRF Gun' },
  { id: 'ladder', label: 'Ladder (10ft)' },
  { id: 'respirator', label: 'Respirator (P100)' },
  { id: 'sampleBags', label: 'Sample Bags (x50)' },
  { id: 'camera', label: 'Digital Camera' },
  { id: 'measuringTape', label: 'Measuring Tape' },
];

const requiredFormsList = [
  "Bulk Sample Collection Log",
  "Site Hazard Assessment Form",
  "Chain of Custody",
  "Daily Field Report",
];

export default function NewInspectionPage() {
  const router = useRouter();
  const [inspectionType, setInspectionType] = useState('Asbestos-only');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [siteName, setSiteName] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  const handleEquipmentChange = (itemId: string) => {
    setSelectedEquipment(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const handleStartInspection = () => {
    console.log({
      project: "Project: #12345 - ACME Corp Site", // Static for now
      inspectionType,
      selectedEquipment,
      siteName,
      address,
      contactPerson,
    });
    // In a real application, this would navigate to an active inspection page or trigger a process
    alert("Inspection setup complete. Starting inspection (simulated).");
    // router.push('/inspections/active/new-id'); // Example of next step
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">New Inspection Setup</h1>

      {/* Project Selection (Static for now) */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Project Information</h2>
        <p className="text-gray-700 dark:text-gray-300">Project: #12345 - ACME Corp Site</p>
      </div>

      {/* Inspection Type */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Inspection Type</h2>
        <label htmlFor="inspectionType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Type</label>
        <select
          id="inspectionType"
          name="inspectionType"
          value={inspectionType}
          onChange={(e) => setInspectionType(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="Asbestos-only">Asbestos-only</option>
          <option value="Full hazmat">Full hazmat</option>
          <option value="Spot survey">Spot survey</option>
        </select>
      </div>

      {/* Equipment Checklist */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Equipment Checklist</h2>
        <div className="space-y-2">
          {equipmentList.map((item) => (
            <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                checked={selectedEquipment.includes(item.id)}
                onChange={() => handleEquipmentChange(item.id)}
              />
              <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Required Forms List */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Required Forms</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          {requiredFormsList.map((formName) => (
            <li key={formName}>{formName}</li>
          ))}
        </ul>
      </div>

      {/* Site Information */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Site Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Name</label>
            <input
              type="text"
              name="siteName"
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Main Street Building"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="123 Main St, Anytown, USA"
            />
          </div>
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              id="contactPerson"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="John Doe"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={() => router.push('/inspections')} // Changed to /inspections
          className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <Link href="/inspections/forms/bulk-sample" passHref>
          <button
            type="button"
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Bulk Sample Form
          </button>
        </Link>
        <Link href="/inspections/forms/hmi-inventory" passHref>
          <button
            type="button"
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to HMI Inventory Form
          </button>
        </Link>
        <button
          type="button"
          onClick={handleStartInspection}
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Start Inspection
        </button>
      </div>
    </div>
  );
}
