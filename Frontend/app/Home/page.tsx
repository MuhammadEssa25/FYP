"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  BarChart,
  Users,
  Package,
  Menu,
  X,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  Sun,
  Moon,
  Search,
  Shirt as ShirtIcon,
  Armchair as ChairIcon,
  CupSoda as CupIcon,
  Sofa as SofaIcon,
  ShoppingBag as BagIcon,
  Watch as WatchIcon,
  Bike as BikeIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Circle
} from "lucide-react";
import { Line, Bar, ComposedChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState({
    products: 1,
    sellers: 1,
    orders: 1
  });
  
  const itemsPerPage = 5;
  const totalItems = 25;

  // Navigation functions
  const navigateTo = (path: string) => {
    router.push(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  // Sidebar menu items with their paths
  const menuItems = [
    { name: "Dashboard", path: "/Home", icon: BarChart },
    { name: "Orders", path: "/Order", icon: ShoppingCart },
    { name: "Products", path: "/Product", icon: Package },
    { name: "Customers", path: "/Customers", icon: Users },
    { name: "Settings", path: "/Setting", icon: Settings },
    { name: "Logout", path: "/auth/Login", icon: LogOut }
  ];

  // Store visits data
  const storeVisitsData = [
    { name: "Direct", value: 44, percentage: "32.0%", change: "+8.7%", color: "#3b82f6" },
    { name: "Social", value: 25, percentage: "23.8%", change: "+9.9%", color: "#10b981" },
    { name: "Email", value: 19, percentage: "15.2%", change: "-2.4%", color: "#f59e0b" },
    { name: "Other", value: 18, percentage: "14.3%", change: "-1.7%", color: "#ef4444" },
    { name: "Referrals", value: 22, percentage: "14.7%", change: "+1.2%", color: "#8b5cf6" }
  ];

  // Recent Orders data
  const recentOrders = [
    {
      id: "#VZ2112",
      customer: "Alex Smith",
      product: "Clothes",
      amount: "$109.00",
      vendor: "Zoetic Fashion",
      status: "Paid",
      rating: "5.0 (61 votes)"
    },
    {
      id: "#VZ2111",
      customer: "Jansh Brown",
      product: "Kitchen Storage",
      amount: "$149.00",
      vendor: "Micro Design",
      status: "Pending",
      rating: "4.5 (61 votes)"
    },
    {
      id: "#VZ2109",
      customer: "Ayaan Bowen",
      product: "Bike Accessories",
      amount: "$215.00",
      vendor: "Nesta Technologies",
      status: "Paid",
      rating: "4.9 (89 votes)"
    },
    {
      id: "#VZ2108",
      customer: "Prezy Mark",
      product: "Furniture",
      amount: "$199.00",
      vendor: "Syntyce Solutions",
      status: "Unpaid",
      rating: "4.3 (47 votes)"
    },
    {
      id: "#VZ2107",
      customer: "Vihan Hudda",
      product: "Bags and Wallets",
      amount: "$330.00",
      vendor: "iTest Factory",
      status: "Paid",
      rating: "4.7 (161 votes)"
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Chart data
  const data = [
    { name: "Jan", orders: 80, earnings: 20, refunds: 10 },
    { name: "Feb", orders: 100, earnings: 40, refunds: 15 },
    { name: "Mar", orders: 60, earnings: 30, refunds: 8 },
    { name: "Apr", orders: 110, earnings: 50, refunds: 20 },
    { name: "May", orders: 75, earnings: 35, refunds: 12 },
    { name: "Jun", orders: 90, earnings: 45, refunds: 10 },
    { name: "Jul", orders: 50, earnings: 25, refunds: 5 },
    { name: "Aug", orders: 100, earnings: 55, refunds: 18 },
    { name: "Sep", orders: 85, earnings: 40, refunds: 10 },
    { name: "Oct", orders: 52, earnings: 42.36, refunds: 29 },
    { name: "Nov", orders: 95, earnings: 50, refunds: 15 },
    { name: "Dec", orders: 70, earnings: 38, refunds: 12 },
  ];

  // Card data
  const cardData = [
    { title: "TOTAL EARNINGS", value: "$559.25k", change: "+16.24%", Icon: BarChart, color: "bg-green-500" },
    { title: "ORDERS", value: "36,894", change: "-3.57%", Icon: ShoppingCart, color: "bg-blue-500" },
    { title: "CUSTOMERS", value: "183.35M", change: "+29.08%", Icon: Users, color: "bg-yellow-500" },
    { title: "MY BALANCE", value: "$165.89k", change: "+0.00%", Icon: Package, color: "bg-red-500" }
  ];

  // Best Selling Products data
  const bestSellingProducts = [
    {
      name: "Branded T-Shirts",
      Icon: ShirtIcon,
      date: "24 Apr 2021",
      price: "$29.00",
      orders: 62,
      stock: 10,
      amount: "$1,798"
    },
    {
      name: "Dartwood Chair",
      Icon: ChairIcon,
      date: "19 Mar 2021",
      price: "$85.20",
      orders: 35,
      stock: 0,
      amount: "$2,982"
    },
    {
      name: "Borosil Paper Cup",
      Icon: CupIcon,
      date: "01 Mar 2021",
      price: "$14.00",
      orders: 80,
      stock: 749,
      amount: "$1,120"
    },
    {
      name: "One Seater Sofa",
      Icon: SofaIcon,
      date: "11 Feb 2021",
      price: "$127.50",
      orders: 56,
      stock: 0,
      amount: "$7,140"
    },
  ];

  // Top Sellers data
  const topSellers = [
    {
      name: "Rest Factory",
      category: "Bags and Wallets",
      Icon: BagIcon,
      seller: "Oliver Tyler",
      price: "$547",
      amount: "$547,200",
      percentage: "22%"
    },
    {
      name: "Digitech Galaxy",
      category: "Watches",
      Icon: WatchIcon,
      seller: "John Roberts",
      price: "$95",
      amount: "$75,030",
      percentage: "79%"
    },
    {
      name: "Nesta Technologies",
      category: "Bike Accessories",
      Icon: BikeIcon,
      seller: "Harley Fuller",
      price: "$470",
      amount: "$48,600",
      percentage: "90%"
    },
    {
      name: "Zoetic Fashion",
      category: "Clothes",
      Icon: ShirtIcon,
      seller: "James Bowen",
      price: "$488",
      amount: "$29,456",
      percentage: "40%"
    },
    {
      name: "Meta4Systems",
      category: "Furniture",
      Icon: SofaIcon,
      seller: "Zoe Dennis",
      price: "$100",
      amount: "$11,260",
      percentage: "57%"
    }
  ];

  // Pagination functions
  const handlePrevPage = (type: string) => {
    setCurrentPage(prev => ({
      ...prev,
      [type]: Math.max(1, prev[type as keyof typeof prev] - 1)
    }));
  };

  const handleNextPage = (type: string) => {
    setCurrentPage(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev] + 1
    }));
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${darkMode ? 'bg-[#131722]' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 ${darkMode ? 'bg-[#2c3e50]' : 'bg-gray-800'} text-white w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold">VELZON</h2>
          <button onClick={toggleSidebar} className="md:hidden">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li 
                  key={index}
                  className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"
                  onClick={() => navigateTo(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`p-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700 bg-[#131722]' : 'border-gray-200 bg-white'}`}>
          <button onClick={toggleSidebar} className="md:hidden">
            <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          </button>
          
          {/* Search Bar */}
          <div className={`flex items-center rounded-lg px-3 py-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <Search className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`ml-2 bg-transparent outline-none text-sm w-64 ${darkMode ? 'placeholder-gray-400 text-white' : 'placeholder-gray-500 text-gray-900'}`}
            />
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

            {/* Notification Bell */}
            <button className={`p-2 rounded-full relative ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white font-bold`}>
                AA
              </div>
              <div className="ml-2 text-left">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Anna Adams</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Founder</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Good Morning, Anna!</h2>
          <p className={`text-sm sm:text-base mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Here's what's happening with your store today.</p>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cardData.map((item, index) => {
              const CardIcon = item.Icon;
              return (
                <div 
                  key={index} 
                  className={`${darkMode ? 'bg-[#1f2937]' : 'bg-white'} p-4 rounded-lg shadow-md flex justify-between items-center
                  transition-all duration-300 ease-in-out
                  hover:scale-105 hover:shadow-lg hover:z-10 ${darkMode ? 'hover:shadow-[#3b82f680]' : 'hover:shadow-gray-300'}
                  active:scale-95 active:shadow-md`}
                >
                  <div>
                    <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.title}</p>
                    <h3 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</h3>
                    <p className={`text-xs sm:text-sm ${item.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                      {item.change}
                    </p>
                  </div>
                  <div className={`p-2 rounded ${item.color}`}>
                    <CardIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Revenue Graph */}
          <div className={`${darkMode ? 'bg-[#1f2937]' : 'bg-white'} rounded-lg shadow-md p-4 mb-6`}>
            <h2 className={`text-lg sm:text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Revenue</h2>
            <div className="w-full h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                  <XAxis dataKey="name" stroke={darkMode ? "#bbb" : "#666"} />
                  <YAxis stroke={darkMode ? "#bbb" : "#666"} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" barSize={20} fill="#6366f1" name="Orders" />
                  <Line type="monotone" dataKey="earnings" stroke="#22c55e" name="Earnings" />
                  <Line type="monotone" dataKey="refunds" stroke="#ef4444" strokeDasharray="5 5" name="Refunds" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Store Visits by Source */}
          <div className={`${darkMode ? 'bg-[#1f2937]' : 'bg-white'} rounded-lg shadow-md p-4 mb-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Store Visits by Source</h2>
              <button className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-500'} text-sm`}>
                Report <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Visits</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>44</p>
                <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>+8.7%</p>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Visit Duration</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>9.9%</p>
                <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>+25%</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storeVisitsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {storeVisitsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full sm:w-1/2">
                <div className="space-y-3">
                  {storeVisitsData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2`} style={{ backgroundColor: item.color }} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                        <p className={`text-xs ${item.change.startsWith("+") ? darkMode ? "text-green-400" : "text-green-600" : darkMode ? "text-red-400" : "text-red-600"}`}>
                          {item.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products and Sellers Row */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Best Selling Products */}
            <div className={`flex-1 ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} rounded-lg shadow-md p-4`}>
              <h2 className={`text-lg sm:text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Best Selling Products</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {bestSellingProducts.map((product, index) => {
                      const ProductIcon = product.Icon;
                      return (
                        <React.Fragment key={index}>
                          <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <td className="py-3 flex items-center">
                              <div className={`p-2 rounded mr-3 ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                <ProductIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{product.date}</p>
                              </div>
                            </td>
                            <td className="py-3">
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</p>
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.price}</p>
                            </td>
                            <td className="py-3">
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Orders</p>
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.orders}</p>
                            </td>
                            <td className="py-3">
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock</p>
                              <p className={`font-medium ${product.stock === 0 ? 'text-red-500' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {product.stock === 0 ? 'Out of stock' : product.stock}
                              </p>
                            </td>
                            <td className="py-3">
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amount</p>
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.amount}</p>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className={`flex justify-between items-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="text-sm">Showing 5 of {totalItems} Results</span>
                <div className="flex space-x-2">
                  <button 
                    className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${currentPage.products === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePrevPage('products')}
                    disabled={currentPage.products === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${currentPage.products * itemsPerPage >= totalItems ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleNextPage('products')}
                    disabled={currentPage.products * itemsPerPage >= totalItems}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Top Sellers */}
            <div className={`flex-1 ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} rounded-lg shadow-md p-4`}>
              <h2 className={`text-lg sm:text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Top Sellers</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {topSellers.map((seller, index) => {
                      const SellerIcon = seller.Icon;
                      return (
                        <React.Fragment key={index}>
                          <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <td className="py-3 flex items-center">
                              <div className={`p-2 rounded mr-3 ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                <SellerIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{seller.name}</p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{seller.seller}</p>
                              </div>
                            </td>
                            <td className="py-3">
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{seller.category}</p>
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock</p>
                            </td>
                            <td className="py-3">
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</p>
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{seller.price}</p>
                            </td>
                            <td className="py-3">
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amount</p>
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{seller.amount}</p>
                            </td>
                            <td className="py-3">
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Percentage</p>
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{seller.percentage}</p>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className={`flex justify-between items-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="text-sm">Showing 5 of {totalItems} Results</span>
                <div className="flex space-x-2">
                  <button 
                    className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${currentPage.sellers === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePrevPage('sellers')}
                    disabled={currentPage.sellers === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${currentPage.sellers * itemsPerPage >= totalItems ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleNextPage('sellers')}
                    disabled={currentPage.sellers * itemsPerPage >= totalItems}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className={`${darkMode ? 'bg-[#1f2937]' : 'bg-white'} rounded-lg shadow-md p-4 mt-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Orders</h2>
              <button 
                className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-500'} text-sm`}
                onClick={() => navigateTo('/orders')}
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left pb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Order ID</th>
                    <th className={`text-left pb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Customer</th>
                    <th className={`text-left pb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Product</th>
                    <th className={`text-left pb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount</th>
                    <th className={`text-left pb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Vendor</th>
                    <th className={`text-left pb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                    <th className={`text-left pb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr 
                      key={index} 
                      className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:${darkMode ? 'bg-gray-800' : 'bg-gray-50'} cursor-pointer`}
                      onClick={() => navigateTo(`/orders/${order.id.replace('#', '')}`)}
                    >
                      <td className={`py-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.product}</td>
                      <td className="py-3">{order.amount}</td>
                      <td className="py-3">{order.vendor}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Paid' ? 
                            (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                          order.status === 'Pending' ? 
                            (darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') :
                          (darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">{order.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className={`flex justify-between items-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className="text-sm">Showing 5 of {totalItems} Results</span>
              <div className="flex space-x-2">
                <button 
                  className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${currentPage.orders === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handlePrevPage('orders')}
                  disabled={currentPage.orders === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${currentPage.orders * itemsPerPage >= totalItems ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleNextPage('orders')}
                  disabled={currentPage.orders * itemsPerPage >= totalItems}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;