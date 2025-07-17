import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount and on storage changes
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('bottleCart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(Array.isArray(parsedCart) ? parsedCart : []);
        } catch (e) {
          console.error('Error parsing cart data:', e);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };

    // Load cart initially
    loadCart();

    // Listen for storage changes to update cart
    const handleStorageChange = () => {
      loadCart();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('bottleCart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    localStorage.setItem('bottleCart', JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cart.reduce((sum, item) => sum + (item.shipping * item.quantity), 0);
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4 text-gray-300">🛒</div>
          <h3 className="text-xl font-medium text-gray-700">Your cart is empty</h3>
          <p className="mt-2 text-gray-500">Browse our collection to add items</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y">
                {cart.map(item => (
                  <div key={item.id} className="p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-5 flex items-center">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 object-contain mr-4"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center text-red-500 text-sm mt-1"
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-center">
                        <span className="md:hidden text-gray-500 mr-2">Price:</span>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-3">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                          >
                            <FaMinus className="text-gray-600" />
                          </button>

                          <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                          >
                            <FaPlus className="text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 text-right">
                        <span className="md:hidden text-gray-500 mr-2">Total:</span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;