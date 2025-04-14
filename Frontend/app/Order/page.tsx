"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  ShoppingCart,
  Check,
  X as XIcon,
  Clock,
  Truck,
  Package,
  CreditCard,
  User,
  MapPin,
  Phone,
  Mail,
  MoreVertical,
  Printer,
  Download,
  Share2,
  ArrowLeft,
  BarChart,
  Home,
  Users as UsersIcon,
  Settings,
  LogOut,
  Users
} from "lucide-react";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");


  const menuItems = [
    { name: "Dashboard", path: "/Home", icon: BarChart },
    { name: "Orders", path: "/Order", icon: ShoppingCart },
    { name: "Products", path: "/Product", icon: Package },
    { name: "Customers", path: "/Customers", icon: Users },
    { name: "Settings", path: "/Setting", icon: Settings },
   { name: "Logout", path: "/auth/Login", icon: LogOut }
  ];

  const itemsPerPage = 8;
  const totalItems = 32;

  // Dummy order data (same as before)
  const orders = [
    {
      id: "#VZ2101",
      customer: "Alex Smith",
      date: "15 Oct, 2021",
      amount: "$109.00",
      payment: "Paid",
      status: "Delivered",
      products: [
        { name: "Wireless Headphones", quantity: 1, price: "$109.00" }
      ],
      shipping: {
        address: "123 Main St, Apt 4B, New York, NY 10001",
        carrier: "FedEx",
        tracking: "FX123456789"
      },
      customerInfo: {
        name: "Alex Smith",
        email: "alex.smith@example.com",
        phone: "+1 234 567 8901"
      }
    },
    {
      id: "#VZ2102",
      customer: "Jansh Brown",
      date: "14 Oct, 2021",
      amount: "$149.00",
      payment: "Pending",
      status: "Shipped",
      products: [
        { name: "Smart Watch", quantity: 1, price: "$149.00" }
      ],
      shipping: {
        address: "456 Oak Ave, Los Angeles, CA 90001",
        carrier: "UPS",
        tracking: "UP987654321"
      },
      customerInfo: {
        name: "Jansh Brown",
        email: "jansh.brown@example.com",
        phone: "+1 345 678 9012"
      }
    },
    {
      id: "#VZ2103",
      customer: "Ayaan Bowen",
      date: "13 Oct, 2021",
      amount: "$215.00",
      payment: "Paid",
      status: "Processing",
      products: [
        { name: "Running Shoes", quantity: 1, price: "$99.00" },
        { name: "Yoga Mat", quantity: 1, price: "$34.00" },
        { name: "Water Bottle", quantity: 2, price: "$82.00" }
      ],
      shipping: {
        address: "789 Pine Rd, Chicago, IL 60601",
        carrier: "USPS",
        tracking: "US123987456"
      },
      customerInfo: {
        name: "Ayaan Bowen",
        email: "ayaan.bowen@example.com",
        phone: "+1 456 789 0123"
      }
    },
    {
      id: "#VZ2104",
      customer: "Prezy Mark",
      date: "12 Oct, 2021",
      amount: "$199.00",
      payment: "Unpaid",
      status: "Cancelled",
      products: [
        { name: "Leather Wallet", quantity: 1, price: "$49.00" },
        { name: "Backpack", quantity: 1, price: "$59.00" },
        { name: "Desk Lamp", quantity: 1, price: "$45.00" },
        { name: "Coffee Mug", quantity: 2, price: "$46.00" }
      ],
      shipping: {
        address: "321 Elm St, Houston, TX 77001",
        carrier: "DHL",
        tracking: "DH456123789"
      },
      customerInfo: {
        name: "Prezy Mark",
        email: "prezy.mark@example.com",
        phone: "+1 567 890 1234"
      }
    },
    {
      id: "#VZ2105",
      customer: "Vihan Hudda",
      date: "11 Oct, 2021",
      amount: "$330.00",
      payment: "Paid",
      status: "Delivered",
      products: [
        { name: "Bluetooth Speaker", quantity: 1, price: "$89.00" },
        { name: "Wireless Charger", quantity: 2, price: "$80.00" },
        { name: "T-Shirt", quantity: 3, price: "$87.00" },
        { name: "Stainless Steel Bottle", quantity: 2, price: "$50.00" },
        { name: "Notebook", quantity: 1, price: "$24.00" }
      ],
      shipping: {
        address: "654 Maple Dr, Phoenix, AZ 85001",
        carrier: "FedEx",
        tracking: "FX987123654"
      },
      customerInfo: {
        name: "Vihan Hudda",
        email: "vihan.hudda@example.com",
        phone: "+1 678 901 2345"
      }
    },
    {
      id: "#VZ2106",
      customer: "John Doe",
      date: "10 Oct, 2021",
      amount: "$75.00",
      payment: "Paid",
      status: "Shipped",
      products: [
        { name: "Coffee Mug", quantity: 1, price: "$19.00" },
        { name: "Notebook", quantity: 2, price: "$48.00" },
        { name: "Pen Set", quantity: 1, price: "$8.00" }
      ],
      shipping: {
        address: "987 Cedar Ln, Philadelphia, PA 19101",
        carrier: "USPS",
        tracking: "US456789123"
      },
      customerInfo: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 789 012 3456"
      }
    },
    {
      id: "#VZ2107",
      customer: "Jane Smith",
      date: "09 Oct, 2021",
      amount: "$245.00",
      payment: "Pending",
      status: "Processing",
      products: [
        { name: "Smart Watch", quantity: 1, price: "$149.00" },
        { name: "Fitness Band", quantity: 1, price: "$59.00" },
        { name: "Wireless Earbuds", quantity: 1, price: "$37.00" }
      ],
      shipping: {
        address: "147 Walnut St, San Antonio, TX 78201",
        carrier: "UPS",
        tracking: "UP123789456"
      },
      customerInfo: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 890 123 4567"
      }
    },
    {
      id: "#VZ2108",
      customer: "Robert Johnson",
      date: "08 Oct, 2021",
      amount: "$189.00",
      payment: "Paid",
      status: "Delivered",
      products: [
        { name: "Backpack", quantity: 1, price: "$59.00" },
        { name: "Laptop Sleeve", quantity: 1, price: "$29.00" },
        { name: "Mouse Pad", quantity: 1, price: "$12.00" },
        { name: "USB Hub", quantity: 1, price: "$25.00" },
        { name: "HDMI Cable", quantity: 2, price: "$64.00" }
      ],
      shipping: {
        address: "258 Birch Blvd, San Diego, CA 92101",
        carrier: "FedEx",
        tracking: "FX456789123"
      },
      customerInfo: {
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
        phone: "+1 901 234 5678"
      }
    }
  ];
  // Status options for filtering
  const statusOptions = [
    "all",
    "Delivered",
    "Shipped",
    "Processing",
    "Cancelled"
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFilter = (filterName) => {
    if (expandedFilter === filterName) {
      setExpandedFilter(null);
    } else {
      setExpandedFilter(filterName);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800";
      case "Shipped":
        return darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800";
      case "Processing":
        return darkMode ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800";
      default:
        return darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "Paid":
        return darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800";
      case "Pending":
        return darkMode ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-800";
      case "Unpaid":
        return darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800";
      default:
        return darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800";
    }
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
        
        {/* Search Bar */}
        <div className={`hidden md:flex items-center rounded-lg px-3 py-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Search className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search orders..."
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

          {/* User Profile */}
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white font-bold`}>
              AA
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className={`md:hidden p-4 ${darkMode ? 'bg-[#1f2937]' : 'bg-white'}`}>
        <div className={`flex items-center rounded-lg px-3 py-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Search className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`ml-2 bg-transparent outline-none text-sm flex-1 ${darkMode ? 'placeholder-gray-400 text-white' : 'placeholder-gray-500 text-gray-900'}`}
          />
        </div>
      </div>

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
            <div className="p-4 overflow-y-auto h-full">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => navigateTo(item.path)}
                      className={`w-full text-left p-3 rounded flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-700'}`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-4 mt-4 border-t border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 px-3 mb-2">FILTERS</h3>
                <div className="mb-6">
                  <button 
                    className="flex items-center justify-between w-full py-2"
                    onClick={() => toggleFilter('status-mobile')}
                  >
                    <span className="font-medium">Order Status</span>
                    {expandedFilter === 'status-mobile' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  {expandedFilter === 'status-mobile' && (
                    <div className="mt-2 space-y-2 pl-2">
                      {statusOptions.map(status => (
                        <div key={status} className="flex items-center">
                          <input
                            type="radio"
                            id={`status-mobile-${status}`}
                            name="status-mobile"
                            checked={statusFilter === status}
                            onChange={() => setStatusFilter(status)}
                            className="mr-2"
                          />
                          <label htmlFor={`status-mobile-${status}`} className="capitalize">{status}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
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
                    className={`w-full text-left p-3 rounded flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-4 mt-4 border-t border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 px-3 mb-2">FILTERS</h3>
              <div className="mb-6">
                <button 
                  className="flex items-center justify-between w-full py-2"
                  onClick={() => toggleFilter('status')}
                >
                  <span className="font-medium">Order Status</span>
                  {expandedFilter === 'status' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedFilter === 'status' && (
                  <div className="mt-2 space-y-2 pl-2">
                    {statusOptions.map(status => (
                      <div key={status} className="flex items-center">
                        <input
                          type="radio"
                          id={`status-${status}`}
                          name="status"
                          checked={statusFilter === status}
                          onChange={() => setStatusFilter(status)}
                          className="mr-2"
                        />
                        <label htmlFor={`status-${status}`} className="capitalize">{status}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </aside>

        {/* Order Content */}
        <main className="flex-1 p-4 sm:p-6">
          {selectedOrder ? (
            // Order Detail View (same as before)
            <div className={`rounded-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} shadow-md overflow-hidden`}>
              {/* ... (same order detail view content as before) */}
            </div>
          ) : (
            // Order List View (same as before)
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {statusFilter === "all" ? "All Orders" : `${statusFilter} Orders`}
                </h2>
                
                <div className="flex items-center">
                  <span className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border border-gray-300'}`}
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option} className="capitalize">{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p className="text-lg">No orders found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}
                    className={`mt-4 px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className={`rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-[#1f2937]' : 'bg-white'}`}>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Order ID</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Customer</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Payment</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedOrders.map(order => (
                            <tr key={order.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                              <td className="p-4">
                                <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{order.id}</span>
                              </td>
                              <td className="p-4">{order.customer}</td>
                              <td className="p-4">{order.date}</td>
                              <td className="p-4">{order.amount}</td>
                              <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentColor(order.payment)}`}>
                                  {order.payment}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="p-4">
                                <button
                                  onClick={() => handleViewOrder(order)}
                                  className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                                >
                                  View <ChevronRight className="h-4 w-4 ml-1" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Pagination */}
                  <div className={`flex justify-between items-center mt-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="text-sm">
                      Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button 
                        className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${currentPage * itemsPerPage >= filteredOrders.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNextPage}
                        disabled={currentPage * itemsPerPage >= filteredOrders.length}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;