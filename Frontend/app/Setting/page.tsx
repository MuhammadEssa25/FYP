"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Bell,
  Sun,
  Moon,
  CreditCard,
  Globe,
  Shield,
  Database,
  LogOut,
  ChevronRight,
  Check,
  X,
  Menu,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Key,
  Plus,
  BarChart,
  ShoppingCart,
  Package,
  Users,
  Settings
} from "lucide-react";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  
  // Account state
  const [user, setUser] = useState({
    name: "Anna Adams",
    email: "anna.adams@example.com",
    role: "Admin",
    joinDate: "15 Jan, 2022",
    lastLogin: "2 hours ago"
  });
  
  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Notification state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [newsletters, setNewsletters] = useState(false);
  
  // Preferences state
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("UTC");
  const [currency, setCurrency] = useState("USD");
  
  // Privacy state
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const [thirdPartySharing, setThirdPartySharing] = useState(false);
  const [publicProfile, setPublicProfile] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/Home", icon: BarChart },
    { name: "Orders", path: "/Order", icon: ShoppingCart },
    { name: "Products", path: "/Product", icon: Package },
    { name: "Customers", path: "/Customers", icon: Users },
    { name: "Settings", path: "/Setting", icon: Settings },
   { name: "Logout", path: "/auth/Login", icon: LogOut }
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAccountUpdate = (e) => {
    e.preventDefault();
    alert("Account information updated!");
  };

  const handlePreferencesSave = (e) => {
    e.preventDefault();
    alert("Preferences saved!");
  };

  const handleNameChange = (e) => {
    setUser({...user, name: e.target.value});
  };

  const handleEmailChange = (e) => {
    setUser({...user, email: e.target.value});
  };

  const handleNotificationsToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    if (!newValue) {
      setEmailNotifications(false);
      setPushNotifications(false);
    }
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-[#131722]' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Header */}
      <header className={`p-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700 bg-[#131722]' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="md:hidden mr-4">
            <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          </button>
          <h1 className="text-xl font-bold">VELZON</h1>
        </div>
        
        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* User Profile */}
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white font-bold`}>
              AA
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div className={`fixed inset-y-0 left-0 z-50 ${darkMode ? 'bg-[#2c3e50]' : 'bg-gray-800'} text-white w-64 transform transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={toggleSidebar}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <nav className="p-4 overflow-y-auto h-full">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => navigateTo(item.path)}
                      className={`w-full text-left p-3 rounded flex items-center ${activeTab === item.name.toLowerCase() ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
                
                <li className="pt-4 mt-4 border-t border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-400 px-3 mb-2">SETTINGS</h3>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => setActiveTab("account")}
                        className={`w-full text-left p-3 rounded flex items-center ${activeTab === "account" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                      >
                        <User className="h-5 w-5 mr-3" />
                        <span>Account</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab("preferences")}
                        className={`w-full text-left p-3 rounded flex items-center ${activeTab === "preferences" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                      >
                        <Sun className="h-5 w-5 mr-3" />
                        <span>Preferences</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab("security")}
                        className={`w-full text-left p-3 rounded flex items-center ${activeTab === "security" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                      >
                        <Shield className="h-5 w-5 mr-3" />
                        <span>Security</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab("notifications")}
                        className={`w-full text-left p-3 rounded flex items-center ${activeTab === "notifications" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                      >
                        <Bell className="h-5 w-5 mr-3" />
                        <span>Notifications</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab("billing")}
                        className={`w-full text-left p-3 rounded flex items-center ${activeTab === "billing" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                      >
                        <CreditCard className="h-5 w-5 mr-3" />
                        <span>Billing</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab("privacy")}
                        className={`w-full text-left p-3 rounded flex items-center ${activeTab === "privacy" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                      >
                        <Lock className="h-5 w-5 mr-3" />
                        <span>Privacy</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab("data")}
                        className={`w-full text-left p-3 rounded flex items-center ${activeTab === "data" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                      >
                        <Database className="h-5 w-5 mr-3" />
                        <span>Data</span>
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <aside className={`hidden md:block w-64 p-4 border-r ${darkMode ? 'border-gray-700 bg-[#1f2937]' : 'border-gray-200 bg-white'}`}>
          <h2 className="text-lg font-bold mb-6">Menu</h2>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => navigateTo(item.path)}
                    className={`w-full text-left p-3 rounded flex items-center ${activeTab === item.name.toLowerCase() ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
              
              <li className="pt-4 mt-4 border-t border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 px-3 mb-2">SETTINGS</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setActiveTab("account")}
                      className={`w-full text-left p-3 rounded flex items-center ${activeTab === "account" ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                    >
                      <User className="h-5 w-5 mr-3" />
                      <span>Account</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab("preferences")}
                      className={`w-full text-left p-3 rounded flex items-center ${activeTab === "preferences" ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                    >
                      <Sun className="h-5 w-5 mr-3" />
                      <span>Preferences</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab("security")}
                      className={`w-full text-left p-3 rounded flex items-center ${activeTab === "security" ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                    >
                      <Shield className="h-5 w-5 mr-3" />
                      <span>Security</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab("notifications")}
                      className={`w-full text-left p-3 rounded flex items-center ${activeTab === "notifications" ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                    >
                      <Bell className="h-5 w-5 mr-3" />
                      <span>Notifications</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab("billing")}
                      className={`w-full text-left p-3 rounded flex items-center ${activeTab === "billing" ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                    >
                      <CreditCard className="h-5 w-5 mr-3" />
                      <span>Billing</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab("privacy")}
                      className={`w-full text-left p-3 rounded flex items-center ${activeTab === "privacy" ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                    >
                      <Lock className="h-5 w-5 mr-3" />
                      <span>Privacy</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab("data")}
                      className={`w-full text-left p-3 rounded flex items-center ${activeTab === "data" ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                    >
                      <Database className="h-5 w-5 mr-3" />
                      <span>Data</span>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Settings Content */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Account Settings */}
          {activeTab === "account" && (
            <div className={`rounded-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} shadow-md overflow-hidden`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold">Account Settings</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your account information</p>
              </div>
              
              <div className="p-4">
                <form onSubmit={handleAccountUpdate}>
                  <div className="flex flex-col md:flex-row mb-6">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Picture</h3>
                      <div className="flex items-center">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} text-2xl font-bold mr-4`}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <button 
                            type="button"
                            className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} text-sm`}
                          >
                            Change
                          </button>
                          <button 
                            type="button"
                            className={`px-3 py-1 rounded ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} text-sm ml-2`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                          <input
                            type="text"
                            value={user.name}
                            onChange={handleNameChange}
                            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                          <input
                            type="email"
                            value={user.email}
                            onChange={handleEmailChange}
                            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-6`}>
                    <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Role</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.role}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Joined</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.joinDate}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Login</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.lastLogin}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      <Save className="h-5 w-5 mr-2 inline" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className={`rounded-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} shadow-md overflow-hidden`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold">Security Settings</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your account security</p>
              </div>
              
              <div className="p-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-6`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Change Password</h3>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-4">
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className={`absolute right-2 top-2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className={`absolute right-2 top-2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={`absolute right-2 top-2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        type="submit"
                        className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                      >
                        <Key className="h-5 w-5 mr-2 inline" />
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Two-Factor Authentication</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>SMS Authentication</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Add an extra layer of security to your account</p>
                    </div>
                    <button 
                      type="button"
                      className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className={`rounded-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} shadow-md overflow-hidden`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold">Notification Settings</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your notification preferences</p>
              </div>
              
              <div className="p-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-6`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationsEnabled}
                        onChange={handleNotificationsToggle}
                        className="sr-only peer" 
                      />
                      <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                    </label>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email Notifications</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={emailNotifications}
                          onChange={() => setEmailNotifications(!emailNotifications)}
                          disabled={!notificationsEnabled}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${!notificationsEnabled ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Push Notifications</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive notifications on your device</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={pushNotifications}
                          onChange={() => setPushNotifications(!pushNotifications)}
                          disabled={!notificationsEnabled}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${!notificationsEnabled ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Order Updates</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Notifications about your orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={orderUpdates}
                          onChange={() => setOrderUpdates(!orderUpdates)}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Promotions</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Special offers and discounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={promotions}
                          onChange={() => setPromotions(!promotions)}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Newsletters</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Company news and updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={newsletters}
                          onChange={() => setNewsletters(!newsletters)}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Settings */}
          {activeTab === "preferences" && (
            <div className={`rounded-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} shadow-md overflow-hidden`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold">Preferences</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customize your experience</p>
              </div>
              
              <div className="p-4">
                <form onSubmit={handlePreferencesSave}>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-6`}>
                    <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h3>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Theme</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customize the look and feel</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => setDarkMode(false)}
                          className={`p-2 rounded ${!darkMode ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                        >
                          <Sun className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDarkMode(true)}
                          className={`p-2 rounded ${darkMode ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                        >
                          <Moon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-6`}>
                    <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Language & Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Language</label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}
                        >
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                          <option value="german">German</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Timezone</label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}
                        >
                          <option value="UTC">UTC</option>
                          <option value="EST">Eastern Time (EST)</option>
                          <option value="PST">Pacific Time (PST)</option>
                          <option value="CET">Central European Time (CET)</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Currency</label>
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}
                        >
                          <option value="USD">US Dollar (USD)</option>
                          <option value="EUR">Euro (EUR)</option>
                          <option value="GBP">British Pound (GBP)</option>
                          <option value="JPY">Japanese Yen (JPY)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      <Save className="h-5 w-5 mr-2 inline" />
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === "billing" && (
            <div className={`rounded-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} shadow-md overflow-hidden`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold">Billing & Payments</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your payment methods and billing</p>
              </div>
              
              <div className="p-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-6`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Payment Methods</h3>
                  <div className="space-y-4">
                    <div className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CreditCard className={`h-5 w-5 mr-3 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>VISA **** 4242</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Expires 04/2025</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          className={`px-2 py-1 rounded ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} text-sm`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CreditCard className={`h-5 w-5 mr-3 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mastercard **** 5555</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Expires 12/2024</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          className={`px-2 py-1 rounded ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} text-sm`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    type="button"
                    className={`mt-4 px-3 py-1 rounded flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Add Payment Method</span>
                  </button>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Billing History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date</th>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Description</th>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount</th>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <td className="p-3">15 Oct, 2023</td>
                          <td className="p-3">Premium Subscription</td>
                          <td className="p-3">$29.99</td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                              Paid
                            </span>
                          </td>
                          <td className="p-3">
                            <button 
                              type="button"
                              className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                        <tr className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <td className="p-3">15 Sep, 2023</td>
                          <td className="p-3">Premium Subscription</td>
                          <td className="p-3">$29.99</td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                              Paid
                            </span>
                          </td>
                          <td className="p-3">
                            <button 
                              type="button"
                              className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                        <tr className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <td className="p-3">15 Aug, 2023</td>
                          <td className="p-3">Premium Subscription</td>
                          <td className="p-3">$29.99</td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                              Paid
                            </span>
                          </td>
                          <td className="p-3">
                            <button 
                              type="button"
                              className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === "privacy" && (
            <div className={`rounded-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} shadow-md overflow-hidden`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold">Privacy Settings</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your privacy preferences</p>
              </div>
              
              <div className="p-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-6`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data Sharing</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Share usage data to help improve our services</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={analyticsEnabled}
                          onChange={() => setAnalyticsEnabled(!analyticsEnabled)}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Personalized Ads</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Show ads based on your activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={personalizedAds}
                          onChange={() => setPersonalizedAds(!personalizedAds)}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Third-party Sharing</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Allow sharing data with trusted partners</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={thirdPartySharing}
                          onChange={() => setThirdPartySharing(!thirdPartySharing)}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account Privacy</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Public Profile</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Make your profile visible to others</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={publicProfile}
                          onChange={() => setPublicProfile(!publicProfile)}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Activity Status</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Show when you're active</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={activityStatus}
                          onChange={() => setActivityStatus(!activityStatus)}
                          className="sr-only peer" 
                        />
                        <div className={`w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700 peer-checked:bg-blue-600' : 'bg-gray-200 peer-checked:bg-blue-500'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Settings */}
          {activeTab === "data" && (
            <div className={`rounded-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} shadow-md overflow-hidden`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold">Data Management</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your account data</p>
              </div>
              
              <div className="p-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-6`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Export Data</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Download your data</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get a copy of all your data in a portable format</p>
                    </div>
                    <button 
                      type="button"
                      className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      Export Data
                    </button>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Delete Account</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Permanently delete your account</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>This action cannot be undone</p>
                    </div>
                    <button 
                      type="button"
                      className={`px-4 py-2 rounded ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;