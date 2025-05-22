import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ElementType; // Optional icon component
  colorClass?: string; // Optional Tailwind CSS color class for accents
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon, colorClass = 'bg-green-500' }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex items-center">
        {Icon && (
          <div className={`p-3 rounded-full ${colorClass} text-white mr-4`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
