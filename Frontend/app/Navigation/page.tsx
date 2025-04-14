"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function JyscodeNavigation() {
  const currentPath = usePathname();

  const menuItems = [
    { name: 'Home', path: '/Home', icon: '🏠' },
    { name: 'Products', path: '/Product', icon: '📦' },
    { name: 'Orders', path: '/Order', icon: '📝' },
    { name: 'Customers', path: '/Customers', icon: '👥' },
    { name: 'Analytics', path: '/Analytics', icon: '📊' },
    { name: 'Contact Us', path: '/Contactus', icon: '✉️' },
    { name: 'About Us', path: '/Aboutus', icon: 'ℹ️' },
    { name: 'Profile', path: '/Profile', icon: '👤' },
    { name: 'Settings', path: '/Setting', icon: '⚙️' },
  ];

  const authItems = [
    { name: 'Login', path: '/auth/Login', icon: '🔑', updates: 1 },
    { name: 'Signup', path: '/auth/Signup', icon: '📝', updates: 9 },
  ];

  // Check authentication status (replace with your actual auth check)
  const isAuthenticated = false;

  return (
    <div className="bg-white h-full w-64 border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">JYSCODE</h1>
      </div>
      
      <nav className="flex-1">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</h2>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    currentPath === item.path
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Authentication</h2>
          <ul className="space-y-1">
            {authItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    currentPath === item.path
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </div>
                  {item.updates > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.updates}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {isAuthenticated && (
        <div className="mt-auto pt-4 border-t border-gray-200">
          <Link
            href="/logout"
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('userData');
            }}
            className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="mr-3 text-lg">🚪</span>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}