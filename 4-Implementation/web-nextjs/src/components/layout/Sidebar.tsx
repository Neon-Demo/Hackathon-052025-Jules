"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, FolderIcon, DocumentChartBarIcon, CogIcon, ClipboardDocumentListIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'; // Example icons

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { href: '/projects', label: 'Projects', icon: FolderIcon },
  { href: '/inspections', label: 'Inspections', icon: ClipboardDocumentListIcon },
  { href: '/reports', label: 'Reports', icon: DocumentChartBarIcon },
  { href: '/calendar', label: 'Calendar', icon: CalendarDaysIcon },
  { href: '/settings', label: 'Settings', icon: CogIcon },
];

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-gray-800 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-y-0 md:flex md:flex-col`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          {/* Placeholder for Logo if needed in sidebar, or just app name */}
          <Link href="/" className="text-xl font-semibold text-white">
            Greenhouse
          </Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white
                ${pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'}`}
              onClick={isOpen && window.innerWidth < 768 ? toggleSidebar : undefined} // Close sidebar on mobile nav click
            >
              <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
