"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Menu,
  X,
  Sun,
  Moon,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Package,
  Users,
  Settings,
  LogOut,
  Home
} from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  useGetProductsQuery, 
  useGetCategoriesQuery,
  useGetMyCartQuery,
  useAddCartItemMutation
} from "../Redux/productsApi ";
import Cart from '../components/cart';


const ProductsPage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addCartItem] = useAddCartItemMutation();

  // Fetch products and categories from API
  const { data: productsData, isLoading, isError } = useGetProductsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: cartData } = useGetMyCartQuery();

  const menuItems = [
    { name: "Dashboard", path: "/Home", icon: BarChart },
    { name: "Orders", path: "/Order", icon: ShoppingCart },
    { name: "Products", path: "/Product", icon: Package },
    { name: "Customers", path: "/Customers", icon: Users },
    { name: "Settings", path: "/Setting", icon: Settings },
    { name: "Logout", path: "/auth/Login", icon: LogOut }
  ];

  const itemsPerPage = 8;

  // Extract products and categories from API response
  const products = productsData || [];
  const categories = ["All", ...new Set(products.map(product => product.category_name))].filter(Boolean);

  // Brands and colors can be extracted from products if needed
  const brands = [...new Set(products.map(product => product.brand))].filter(Boolean);
  const colors = [...new Set(products.flatMap(product => product.colors || []))].filter(Boolean);

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

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await addCartItem({ product: productId, quantity: 1 });
      setCartOpen(true); // Open cart when item is added
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const handleAddToWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  // Filter products based on search, category, price range
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || product.category_name === selectedCategory;
    const matchesPrice = Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return Number(a.price) - Number(b.price);
      case "price-high":
        return Number(b.price) - Number(a.price);
      case "rating":
        return (b.average_rating || 0) - (a.average_rating || 0);
      case "reviews":
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
      default:
        return 0; // featured (original order)
    }
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalItems = filteredProducts.length;

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-[#131722]' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-[#131722] text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center p-6">
          <h2 className="text-xl font-bold mb-4">Error loading products</h2>
          <p className="mb-4">Failed to fetch products from the server.</p>
          <button
            onClick={() => window.location.reload()}
            className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-[#131722]" : "bg-gray-50"
      } ${darkMode ? "text-white" : "text-gray-900"}`}
    >
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Header */}
      <header
        className={`p-4 flex justify-between items-center border-b ${
          darkMode ? "border-gray-700 bg-[#131722]" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="md:hidden mr-4">
            <Menu
              className={`w-6 h-6 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            />
          </button>
          <h1 className="text-xl font-bold">VELZON</h1>
        </div>

        {/* Search Bar */}
        <div
          className={`hidden md:flex items-center rounded-lg px-3 py-2 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <Search
            className={`h-4 w-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`ml-2 bg-transparent outline-none text-sm w-64 ${
              darkMode
                ? "placeholder-gray-400 text-white"
                : "placeholder-gray-500 text-gray-900"
            }`}
          />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Shopping Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className={`p-2 rounded-full relative ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartData?.items?.length > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {cartData.items.length}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                darkMode ? "bg-blue-600" : "bg-blue-500"
              } text-white font-bold`}
            >
              AA
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div
        className={`md:hidden p-4 ${darkMode ? "bg-[#1f2937]" : "bg-white"}`}
      >
        <div
          className={`flex items-center rounded-lg px-3 py-2 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <Search
            className={`h-4 w-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`ml-2 bg-transparent outline-none text-sm flex-1 ${
              darkMode
                ? "placeholder-gray-400 text-white"
                : "placeholder-gray-500 text-gray-900"
            }`}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div
            className={`fixed inset-y-0 left-0 z-50 ${
              darkMode ? "bg-[#2c3e50]" : "bg-gray-800"
            } text-white w-64 transform transition-transform duration-300 ease-in-out md:hidden`}
          >
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
                      className={`w-full text-left p-3 rounded flex items-center ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-700"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-4 mt-4 border-t border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 px-3 mb-2">
                  FILTERS
                </h3>
                <div className="mb-6">
                  <button
                    className="flex items-center justify-between w-full py-2"
                    onClick={() => toggleFilter("category-mobile")}
                  >
                    <span className="font-medium">Categories</span>
                    {expandedFilter === "category-mobile" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {expandedFilter === "category-mobile" && (
                    <div className="mt-2 space-y-2 pl-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="radio"
                            id={`category-mobile-${category}`}
                            name="category-mobile"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="mr-2"
                          />
                          <label htmlFor={`category-mobile-${category}`}>
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <button
                    className="flex items-center justify-between w-full py-2"
                    onClick={() => toggleFilter("price-mobile")}
                  >
                    <span className="font-medium">Price Range</span>
                    {expandedFilter === "price-mobile" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {expandedFilter === "price-mobile" && (
                    <div className="mt-2 pl-2">
                      <div className="flex justify-between mb-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <div className="flex space-x-4 mb-4">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          className="w-full"
                        />
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {brands.length > 0 && (
                  <div className="mb-6">
                    <button
                      className="flex items-center justify-between w-full py-2"
                      onClick={() => toggleFilter("brand-mobile")}
                    >
                      <span className="font-medium">Brands</span>
                      {expandedFilter === "brand-mobile" ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {expandedFilter === "brand-mobile" && (
                      <div className="mt-2 space-y-2 pl-2 max-h-40 overflow-y-auto">
                        {brands.map((brand) => (
                          <div key={brand} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`brand-mobile-${brand}`}
                              className="mr-2"
                            />
                            <label htmlFor={`brand-mobile-${brand}`}>
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {colors.length > 0 && (
                  <div className="mb-6">
                    <button
                      className="flex items-center justify-between w-full py-2"
                      onClick={() => toggleFilter("color-mobile")}
                    >
                      <span className="font-medium">Colors</span>
                      {expandedFilter === "color-mobile" ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {expandedFilter === "color-mobile" && (
                      <div className="mt-2 pl-2">
                        <div className="flex flex-wrap gap-2">
                          {colors.map((color) => (
                            <button
                              key={color}
                              className="h-6 w-6 rounded-full border"
                              style={{
                                backgroundColor:
                                  color === "rose gold" ? "#e0bfb8" : color,
                              }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <aside
          className={`hidden md:block w-64 p-4 border-r ${
            darkMode
              ? "border-gray-700 bg-[#1f2937]"
              : "border-gray-200 bg-white"
          }`}
        >
          <h2 className="text-lg font-bold mb-6">Menu</h2>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigateTo(item.path)}
                    className={`w-full text-left p-3 rounded flex items-center ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-4 mt-4 border-t border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 px-3 mb-2">
                FILTERS
              </h3>
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full py-2"
                  onClick={() => toggleFilter("category")}
                >
                  <span className="font-medium">Categories</span>
                  {expandedFilter === "category" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedFilter === "category" && (
                  <div className="mt-2 space-y-2 pl-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="mr-2"
                        />
                        <label htmlFor={`category-${category}`}>
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full py-2"
                  onClick={() => toggleFilter("price")}
                >
                  <span className="font-medium">Price Range</span>
                  {expandedFilter === "price" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedFilter === "price" && (
                  <div className="mt-2 pl-2">
                    <div className="flex justify-between mb-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <div className="flex space-x-4 mb-4">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {brands.length > 0 && (
                <div className="mb-6">
                  <button
                    className="flex items-center justify-between w-full py-2"
                    onClick={() => toggleFilter("brand")}
                  >
                    <span className="font-medium">Brands</span>
                    {expandedFilter === "brand" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {expandedFilter === "brand" && (
                    <div className="mt-2 space-y-2 pl-2 max-h-40 overflow-y-auto">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`brand-${brand}`}
                            className="mr-2"
                          />
                          <label htmlFor={`brand-${brand}`}>{brand}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {colors.length > 0 && (
                <div className="mb-6">
                  <button
                    className="flex items-center justify-between w-full py-2"
                    onClick={() => toggleFilter("color")}
                  >
                    <span className="font-medium">Colors</span>
                    {expandedFilter === "color" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {expandedFilter === "color" && (
                    <div className="mt-2 pl-2">
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            className="h-6 w-6 rounded-full border"
                            style={{
                              backgroundColor:
                                color === "rose gold" ? "#e0bfb8" : color,
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2
              className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-0 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>

            <div className="flex items-center">
              <span
                className={`mr-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Sort by:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={`p-2 rounded ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900 border border-gray-300"
                }`}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="reviews">Reviews</option>
              </select>
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div
              className={`text-center py-12 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <p className="text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setPriceRange([0, 1000]);
                }}
                className={`mt-4 px-4 py-2 rounded ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-lg ${
                      darkMode
                        ? "bg-[#1f2937] hover:shadow-[#3b82f680]"
                        : "bg-white hover:shadow-gray-300"
                    }`}
                  >
                    <div className="relative">
                      {/* Product Image */}
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        {product.images?.length > 0 ? (
                          <img
                            src={product.images[0].image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span
                            className={`${
                              darkMode ? "text-gray-600" : "text-gray-400"
                            }`}
                          >
                            No Image
                          </span>
                        )}
                      </div>

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex space-x-2">
                        {product.discount_price && (
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              darkMode
                                ? "bg-red-600 text-white"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {Math.round(
                              ((Number(product.discount_price) -
                                Number(product.price)) /
                                Number(product.discount_price)) *
                                100
                            )}
                            % OFF
                          </span>
                        )}
                        {product.stock === 0 && (
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              darkMode
                                ? "bg-gray-600 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex flex-col space-y-2">
                        <button
                          onClick={() => handleAddToWishlist(product.id)}
                          className={`p-2 rounded-full ${
                            wishlist.includes(product.id)
                              ? "bg-red-500 text-white"
                              : darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <Heart
                            className="h-4 w-4"
                            fill={
                              wishlist.includes(product.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                        <button
                          className={`p-2 rounded-full ${
                            darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {product.name}
                        </h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-sm">
                            {product.average_rating || 0}
                          </span>
                          <span
                            className={`mx-1 ${
                              darkMode ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            |
                          </span>
                          <span
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {product.reviews?.length || 0}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-sm mb-3 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {product.brand}
                      </p>

                      <div className="flex items-center mb-3">
                        <span
                          className={`font-bold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          ${product.price}
                        </span>
                        {product.discount_price && (
                          <span
                            className={`ml-2 text-sm line-through ${
                              darkMode ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            ${product.discount_price}
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1">
                          {product.colors?.slice(0, 3).map((color, index) => (
                            <span
                              key={index}
                              className="h-4 w-4 rounded-full border"
                              style={{
                                backgroundColor:
                                  color === "rose gold" ? "#e0bfb8" : color,
                              }}
                              title={color}
                            />
                          ))}
                          {product.colors?.length > 3 && (
                            <span
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              +{product.colors.length - 3} more
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(product.id)}
                          disabled={product.stock === 0}
                          className={`px-3 py-1 rounded flex items-center ${
                            product.stock === 0
                              ? `${
                                  darkMode
                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                }`
                              : `${
                                  darkMode
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-blue-500 hover:bg-blue-600 text-white"
                                }`
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          <span className="text-sm">Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div
                className={`flex justify-between items-center mt-8 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span className="text-sm">
                  Showing {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, filteredProducts.length)}{" "}
                  of {filteredProducts.length} products
                </span>
                <div className="flex space-x-2">
                  <button
                    className={`p-2 rounded-md ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    } ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    className={`p-2 rounded-md ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    } ${
                      currentPage * itemsPerPage >= filteredProducts.length
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={handleNextPage}
                    disabled={
                      currentPage * itemsPerPage >= filteredProducts.length
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} darkMode={darkMode} />
    </div>
  );
};

export default ProductsPage;