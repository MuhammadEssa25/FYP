"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Sun,
  Moon,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  ShoppingCart,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  BarChart,
  Package,
  Settings,
  LogOut,
  Users
} from "lucide-react";

const CustomersPage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const itemsPerPage = 8;
  const totalItems = 32;

  // Sidebar menu items with their paths
  const menuItems = [
    { name: "Dashboard", path: "/Home", icon: BarChart },
    { name: "Orders", path: "/Order", icon: ShoppingCart },
    { name: "Products", path: "/Product", icon: Package },
    { name: "Customers", path: "/Customers", icon: Users },
    { name: "Settings", path: "/Setting", icon: Settings },
   { name: "Logout", path: "/auth/Login", icon: LogOut }
  ];

  // Navigation function
  const navigateTo = (path: string) => {
    router.push(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  // Dummy customer data
  const customers = [
    {
      id: "CUST001",
      name: "Alex Smith",
      email: "alex.smith@example.com",
      phone: "+1 234 567 8901",
      location: "New York, USA",
      orders: 12,
      spent: "$1,890.50",
      lastOrder: "15 Oct, 2023",
      status: "Active",
      joinDate: "12 Jan, 2021",
      shippingAddress: "123 Main St, Apt 4B, New York, NY 10001",
      paymentMethod: "Credit Card (VISA ****4242)"
    },
    {
      id: "CUST002",
      name: "Jansh Brown",
      email: "jansh.brown@example.com",
      phone: "+1 345 678 9012",
      location: "Los Angeles, USA",
      orders: 8,
      spent: "$980.25",
      lastOrder: "14 Oct, 2023",
      status: "Active",
      joinDate: "05 Mar, 2022",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
      paymentMethod: "PayPal (j.brown@example.com)"
    },
    {
      id: "CUST003",
      name: "Ayaan Bowen",
      email: "ayaan.bowen@example.com",
      phone: "+1 456 789 0123",
      location: "Chicago, USA",
      orders: 5,
      spent: "$745.80",
      lastOrder: "13 Oct, 2023",
      status: "Active",
      joinDate: "22 Aug, 2022",
      shippingAddress: "789 Pine Rd, Chicago, IL 60601",
      paymentMethod: "Credit Card (MC ****5555)"
    },
    {
      id: "CUST004",
      name: "Prezy Mark",
      email: "prezy.mark@example.com",
      phone: "+1 567 890 1234",
      location: "Houston, USA",
      orders: 3,
      spent: "$420.75",
      lastOrder: "12 Oct, 2023",
      status: "Inactive",
      joinDate: "30 Nov, 2021",
      shippingAddress: "321 Elm St, Houston, TX 77001",
      paymentMethod: "Credit Card (AMEX ****9999)"
    },
    {
      id: "CUST005",
      name: "Vihan Hudda",
      email: "vihan.hudda@example.com",
      phone: "+1 678 901 2345",
      location: "Phoenix, USA",
      orders: 18,
      spent: "$2,845.30",
      lastOrder: "11 Oct, 2023",
      status: "Active",
      joinDate: "15 Feb, 2020",
      shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
      paymentMethod: "Apple Pay (vihan@icloud.com)"
    },
    {
      id: "CUST006",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 789 012 3456",
      location: "Philadelphia, USA",
      orders: 7,
      spent: "$1,120.90",
      lastOrder: "10 Oct, 2023",
      status: "Active",
      joinDate: "08 May, 2022",
      shippingAddress: "987 Cedar Ln, Philadelphia, PA 19101",
      paymentMethod: "Credit Card (VISA ****1212)"
    },
    {
      id: "CUST007",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 890 123 4567",
      location: "San Antonio, USA",
      orders: 4,
      spent: "$675.40",
      lastOrder: "09 Oct, 2023",
      status: "Inactive",
      joinDate: "19 Jul, 2021",
      shippingAddress: "147 Walnut St, San Antonio, TX 78201",
      paymentMethod: "PayPal (j.smith@example.com)"
    },
    {
      id: "CUST008",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 901 234 5678",
      location: "San Diego, USA",
      orders: 15,
      spent: "$3,210.65",
      lastOrder: "08 Oct, 2023",
      status: "Active",
      joinDate: "03 Apr, 2020",
      shippingAddress: "258 Birch Blvd, San Diego, CA 92101",
      paymentMethod: "Credit Card (MC ****7777)"
    }
  ];
    // ... (keep all your existing customer data)

  // Status options for filtering
  const statusOptions = ["all", "Active", "Inactive"];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFilter = (filterName: string) => {
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

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
  };

  const handleBackToList = () => {
    setSelectedCustomer(null);
  };

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800";
      case "Inactive":
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
            placeholder="Search customers..."
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
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`ml-2 bg-transparent outline-none text-sm flex-1 ${darkMode ? 'placeholder-gray-400 text-white' : 'placeholder-gray-500 text-gray-900'}`}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 ${darkMode ? 'bg-[#2c3e50]' : 'bg-gray-800'} text-white w-64 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative`}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-700">
            <h2 className="text-xl font-bold">VELZON</h2>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
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
                    className={`flex items-center space-x-2 hover:text-blue-400 cursor-pointer ${
                      router.pathname === item.path ? 'text-blue-400 font-medium' : ''
                    }`}
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

        {/* Customer Content */}
        <main className="flex-1 p-4 sm:p-6">
          {selectedCustomer ? (
            // Customer Detail View
            <div className={`rounded-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} shadow-md overflow-hidden`}>
              {/* Customer Header */}
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
                <button 
                  onClick={handleBackToList}
                  className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Customers
                </button>
                <div className="flex space-x-2">
                  <button className={`px-3 py-1 rounded flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <Edit className="h-4 w-4 mr-1" />
                    <span>Edit</span>
                  </button>
                  <button className={`px-3 py-1 rounded flex items-center ${darkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-100 hover:bg-red-200 text-red-800'}`}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Customer Summary */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} text-2xl font-bold mr-4`}>
                      {selectedCustomer.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.name}</h2>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCustomer.status)}`}>
                        {selectedCustomer.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customer ID</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.id}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Orders</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.orders}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Spent</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.spent}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Order</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.lastOrder}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Member Since</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                {/* Contact Information */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Mail className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.email}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email Address</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.phone}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone Number</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.location}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping & Payment */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Shipping & Payment</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.shippingAddress}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Shipping Address</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CreditCard className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.paymentMethod}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Default Payment Method</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} lg:col-span-2`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Orders</h3>
                    <button 
                      className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-sm`}
                      onClick={() => navigateTo('/orders')}
                    >
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Order ID</th>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date</th>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount</th>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                          <th className={`text-left p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map((_, index) => (
                          <tr key={index} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                            <td className="p-3">
                              <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>#VZ210{index + 1}</span>
                            </td>
                            <td className="p-3">{selectedCustomer.lastOrder}</td>
                            <td className="p-3">${
                              index === 0 ? selectedCustomer.spent.replace('$', '') : 
                              index === 1 ? "89.99" : "149.99"
                            }</td>
                            <td className="p-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                index === 0 ? getStatusColor("Delivered") : 
                                index === 1 ? getStatusColor("Shipped") : getStatusColor("Processing")
                              }`}>
                                {index === 0 ? "Delivered" : index === 1 ? "Shipped" : "Processing"}
                              </span>
                            </td>
                            <td className="p-3">
                              <button
                                className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                                onClick={() => navigateTo(`/orders/${index + 1}`)}
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
              </div>
            </div>
          ) : (
            // Customer List View
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {statusFilter === "all" ? "All Customers" : `${statusFilter} Customers`}
                </h2>
                
                <div className="flex items-center space-x-3">
                  <button 
                    className={`px-3 py-1 rounded flex items-center ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    onClick={() => navigateTo('/customers/new')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Add Customer</span>
                  </button>
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
              </div>

              {filteredCustomers.length === 0 ? (
                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p className="text-lg">No customers found matching your criteria.</p>
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
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Customer</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Phone</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Orders</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Spent</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                            <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedCustomers.map(customer => (
                            <tr key={customer.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                              <td className="p-4">
                                <div className="flex items-center">
                                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} text-lg font-bold mr-3`}>
                                    {customer.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{customer.name}</p>
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{customer.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">{customer.email}</td>
                              <td className="p-4">{customer.phone}</td>
                              <td className="p-4">{customer.orders}</td>
                              <td className="p-4">{customer.spent}</td>
                              <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                                  {customer.status}
                                </span>
                              </td>
                              <td className="p-4">
                                <button
                                  onClick={() => handleViewCustomer(customer)}
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
                      Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
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
                        className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${currentPage * itemsPerPage >= filteredCustomers.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNextPage}
                        disabled={currentPage * itemsPerPage >= filteredCustomers.length}
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

export default CustomersPage;