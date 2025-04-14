"use client";

import React from 'react';
import { ShoppingCart, X, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import { useGetMyCartQuery, useAddCartItemMutation, useUpdateCartItemMutation, useRemoveCartItemMutation, useClearCartMutation } from '../Redux/productsApi ';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, darkMode }) => {
  const { 
    data: cartData, 
    isLoading, 
    isError,
    error // Add error object from the query
  } = useGetMyCartQuery();
  
  const [removeItem] = useRemoveCartItemMutation();
  const [updateItem] = useUpdateCartItemMutation();
  const [clearCart] = useClearCartMutation();

  // Log the error for debugging
  if (isError) {
    console.error('Error fetching cart:', error);
  }

  const cartItems = cartData?.items || [];
  const subtotal = cartData?.subtotal || 0;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItem({ product: productId, quantity: newQuantity });
  };

  const handleRemoveItem = (productId: number) => {
    removeItem({ product: productId });
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className={`w-screen max-w-md ${darkMode ? 'bg-[#1f2937]' : 'bg-white'}`}>
            <div className={`h-full flex flex-col shadow-xl ${darkMode ? 'bg-[#1f2937]' : 'bg-white'}`}>
              <div className={`flex-1 py-6 overflow-y-auto px-4 sm:px-6 ${darkMode ? 'bg-[#1f2937]' : 'bg-white'}`}>
                <div className="flex items-start justify-between">
                  <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Shopping cart
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-400'} focus:outline-none`}
                      onClick={onClose}
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="mt-2">Loading cart...</p>
                  </div>
                ) : isError ? (
                  <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <AlertCircle className="mx-auto h-8 w-8 text-red-500" />
                    <h3 className="mt-2 text-lg font-medium">Failed to load cart items</h3>
                    <p className="mt-1 text-sm">Please try again later</p>
                    <button
                      onClick={() => window.location.reload()}
                      className={`mt-4 px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      Retry
                    </button>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <ShoppingCart className="mx-auto h-12 w-12" />
                    <h3 className="mt-2 text-lg font-medium">Your cart is empty</h3>
                    <p className="mt-1">Start adding some products!</p>
                  </div>
                ) : (
                  <>
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className={`-my-6 divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                          {cartItems.map((item) => (
                            <li key={item.id} className="py-6 flex">
                              <div className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                                {item.product?.images?.length > 0 ? (
                                  <img
                                    src={item.product.images[0].image}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ShoppingCart className="h-8 w-8 text-gray-400" />
                                  </div>
                                )}
                              </div>

                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base">
                                    <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                      {item.product?.name || 'Unknown Product'}
                                    </h3>
                                    <p className={`ml-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                      ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                  <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {item.product?.brand || 'No brand'}
                                  </p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                      className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className={`mx-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                      className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                                      onClick={() => handleRemoveItem(item.product.id)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-4 py-6 sm:px-6`}>
                  <div className={`flex justify-between text-base font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <p className={`mt-0.5 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <button
                      className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center">
                    <button
                      type="button"
                      className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;