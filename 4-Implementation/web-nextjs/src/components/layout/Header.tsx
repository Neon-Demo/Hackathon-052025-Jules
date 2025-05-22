"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { MenuIcon, UserCircleIcon, CogIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Using Heroicons for placeholders
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo and Menu Toggle (for mobile) */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="md:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Open sidebar"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <Link href="/" className="text-xl font-bold text-green-600 dark:text-green-400">
              Greenhouse
            </Link>
          </div>

          {/* Middle section: Search bar */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <form onSubmit={handleSearchSubmit} className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Right section: User and Settings icons */}
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:text-gray-400 dark:hover:text-gray-200">
              <span className="sr-only">Settings</span>
              <CogIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" />
                </button>
              </div>
              {/* Dropdown menu, show/hide based on menu state. (Functionality not fully implemented here) */}
              {/* 
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex={-1}
              >
                {session && (
                  <a
                    href="#"
                    onClick={() => signOut()}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                )}
              </div>
              */}
            </div>
            {status === "authenticated" && session?.user && (
              <div className="ml-3">
                <span className="text-sm text-gray-700 dark:text-gray-200 hidden sm:inline">
                  {session.user.name || session.user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-700 dark:text-white dark:hover:bg-green-600"
                >
                  Sign out
                </button>
              </div>
            )}
            {status === "unauthenticated" && (
                <Link href="/login" className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-700 dark:text-white dark:hover:bg-green-600">
                  Sign In
                </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
