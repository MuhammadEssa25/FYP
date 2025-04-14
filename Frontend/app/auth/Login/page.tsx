"use client";

import React, { useState } from "react";
import { Sun, Moon, Lock, User, Eye, EyeOff } from "lucide-react"; // Changed Mail to User
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/Redux/authApi";

const LoginPage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await login({
        username,
        password,
      }).unwrap();
      
      // Store tokens
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      
      router.push('/Home');
    } catch (err) {
      console.error('Login failed with details:', {
        error: err,
        status: err?.status,
        data: err?.data,
        originalStatus: err?.originalStatus,
      });
  
      // Display more detailed error to user
      if (err?.data) {
        // If the error contains data from the server
        alert(`Login failed: ${err.data.detail || JSON.stringify(err.data)}`);
      } else if (err?.status) {
        // If it's an HTTP error
        alert(`Login failed with status ${err.status}`);
      } else {
        // Generic error
        alert('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#131722]' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header with theme toggle */}
      <header className={`p-4 flex justify-end ${darkMode ? 'bg-[#131722]' : 'bg-white'}`}>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className={`w-full max-w-md ${darkMode ? 'bg-[#1f2937]' : 'bg-white'} rounded-lg shadow-md p-8`}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Please enter your credentials to login</p>
          </div>

          {/* Error message display */}
          {error && (
            <div className={`mb-4 p-3 rounded-md ${darkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`}>
              {'data' in error ? (
                <p>{(error.data as { detail?: string }).detail || 'Login failed'}</p>
              ) : (
                <p>Login failed. Please try again.</p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Username
              </label>
              <div className={`relative rounded-md shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} /> {/* Changed Mail to User */}
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border-0 ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 rounded-md`}
                  placeholder="your_username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className={`relative rounded-md shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-10 py-2 border-0 ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 rounded-md`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-blue-500`}
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
          </form>

          <div className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Don't have an account?{' '}
            <Link href="/auth/Signup" className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
              Sign up
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`p-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        © {new Date().getFullYear()} VELZONE. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;