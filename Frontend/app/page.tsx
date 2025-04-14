"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  ShoppingBag,
  TrendingUp,
  Flame,
  Sparkles,
  BarChart2,
  Star,
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Clock,
  Wallet,
  Award,
  RotateCcw,
  MessageSquare,
} from "lucide-react"

export default function WelcomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const profileRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <ShoppingBag className="h-8 w-8 text-indigo-600" />
              </Link>
              <div className="ml-4 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                ShopEase
              </div>
            </div>
            <div className="hidden md:block flex-grow mx-8">
              <SearchBar />
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <NavLink href="/trending" icon={<TrendingUp className="h-4 w-4" />} text="Trending" />
              <NavLink href="/new-arrivals" icon={<Sparkles className="h-4 w-4" />} text="New" />
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center text-gray-700 hover:text-indigo-600 focus:outline-none transition duration-150 ease-in-out"
                >
                  <User className="h-6 w-6" />
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {isProfileOpen && <ProfileDropdown />}
              </div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 mr-4"
              >
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full z-10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <SearchBar />
            <NavLink href="/trending" icon={<TrendingUp className="h-4 w-4" />} text="Trending" />
            <NavLink href="/hot-selling" icon={<Flame className="h-4 w-4" />} text="Hot Selling" />
            <NavLink href="/new-arrivals" icon={<Sparkles className="h-4 w-4" />} text="New Arrivals" />
            <NavLink href="/analytics" icon={<BarChart2 className="h-4 w-4" />} text="Analytics" />
            <NavLink href="/best-rated" icon={<Star className="h-4 w-4" />} text="Best Rated" />
            <hr className="my-2 border-gray-200" />
            <ProfileDropdown isMobile />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to ShopEase</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Your one-stop shop for all things extraordinary.
          </p>
          <Link
            href="/products"
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-100 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeaturedCategory title="Electronics" image="/placeholder.svg" />
            <FeaturedCategory title="Fashion" image="/placeholder.svg" />
            <FeaturedCategory title="Home & Living" image="/placeholder.svg" />
            <FeaturedCategory title="Beauty & Personal Care" image="/placeholder.svg" />
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Trending Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard
              title="Wireless Earbuds"
              price="$59.99"
              image="/placeholder.svg"
              rating={4.5}
              onAddToCart={() => setIsCartOpen(true)}
            />
            <ProductCard
              title="Smart Watch"
              price="$129.99"
              image="/placeholder.svg"
              rating={4.2}
              onAddToCart={() => setIsCartOpen(true)}
            />
            <ProductCard
              title="Portable Charger"
              price="$39.99"
              image="/placeholder.svg"
              rating={4.7}
              onAddToCart={() => setIsCartOpen(true)}
            />
            <ProductCard
              title="Bluetooth Speaker"
              price="$79.99"
              image="/placeholder.svg"
              rating={4.4}
              onAddToCart={() => setIsCartOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About ShopEase</h3>
              <p className="text-gray-400">
                ShopEase is your ultimate destination for all your shopping needs. We provide a seamless and enjoyable
                shopping experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <i className="fab fa-facebook text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; VELZONE. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

function NavLink({ href, icon, text }) {
  return (
    <Link
      href={href}
      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  )
}

function SearchBar() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  )
}

function FeaturedCategory({ title, image }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <Link
          href={`/category/${title.toLowerCase().replace(" ", "-")}`}
          className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center"
        >
          Shop Now
          <ChevronDown className="h-4 w-4 ml-1 transform rotate-270" />
        </Link>
      </div>
    </div>
  )
}

function ProductCard({ title, price, image, rating, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-indigo-600 font-bold text-xl">{price}</span>
          <div className="flex items-center bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
        </div>
        <button
          onClick={onAddToCart}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function ProfileDropdown({ isMobile = false }) {
  const linkClass = `block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 ${isMobile ? "py-3" : ""}`

  return (
    <div
      className={`${isMobile ? "" : "absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"}`}
    >
      <Link href="/profile" className={linkClass}>
        <User className="inline-block w-4 h-4 mr-2" />
        Profile Settings
      </Link>
      <Link href="/purchase-history" className={linkClass}>
        <Clock className="inline-block w-4 h-4 mr-2" />
        Purchase History
      </Link>
      <Link href="/wallet" className={linkClass}>
        <Wallet className="inline-block w-4 h-4 mr-2" />
        Wallet
      </Link>
      <Link href="/rewards" className={linkClass}>
        <Award className="inline-block w-4 h-4 mr-2" />
        Rewards
      </Link>
      <Link href="/returns" className={linkClass}>
        <RotateCcw className="inline-block w-4 h-4 mr-2" />
        Returns & Claims
      </Link>
      <Link href="/complaints" className={linkClass}>
        <MessageSquare className="inline-block w-4 h-4 mr-2" />
        Complaints
      </Link>
    </div>
  )
}

function CartSidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {/* Cart items would go here */}
          <p className="text-gray-500">Your cart is empty</p>
        </div>
        <div className="mt-6">
          <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

