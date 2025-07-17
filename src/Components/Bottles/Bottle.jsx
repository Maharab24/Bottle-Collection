import React, { useState, useRef, useEffect } from 'react';

function Bottle({ product }) {
  const [quantity, setQuantity] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const alertTimeoutRef = useRef(null);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      // Get existing cart or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem('bottleCart') || '[]');

      // Check if this product is already in the cart
      const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        existingCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          quantity: quantity,
          shipping: product.shipping
        });
      }

      // Save updated cart to localStorage
      localStorage.setItem('bottleCart', JSON.stringify(existingCart));

      // Dispatch custom event to notify Header
      const cartUpdatedEvent = new Event('cartUpdated');
      window.dispatchEvent(cartUpdatedEvent);

      // Reset quantity
      setQuantity(0);

      // Show custom alert
      setShowAlert(true);

      // Hide alert after 3 seconds
      alertTimeoutRef.current = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans relative">
      {/* Success Alert */}
      {showAlert && (
        <div
          className="fixed top-4 right-4 z-50 animate-fadeInOut"
          style={{ animation: 'fadeInOut 3s ease-in-out' }}
        >
          <div role="alert" className="alert alert-success shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Product add to your wish list successfully !</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-2/5 p-6 flex items-center justify-center bg-gray-50">
          <img
            src={product.img}
            alt={product.name}
            className="object-contain h-64 w-full"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-gray-500">{product.category}</span>
                <h2 className="text-xl font-bold text-gray-800 mt-1">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-1">by {product.seller}</p>
              </div>

              <div className="bg-blue-50 px-3 py-1 rounded-full">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-bold">{product.ratings}</span>
                  <span className="text-gray-500 text-xs ml-1">({product.ratingsCount})</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="ml-3 text-gray-500 text-sm">Shipping: ${product.shipping.toFixed(2)}</span>
            </div>

            <p className={`text-sm mt-2 ${product.stock > 5 ? 'text-green-600' : 'text-orange-600'}`}>
              {product.stock > 5 ? 'In Stock' : `Only ${product.stock} left`}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-700 mr-3">Quantity:</span>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity === 0}
                  className={`px-3 py-1 ${quantity === 0 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity === product.stock}
                  className={`px-3 py-1 ${quantity === product.stock ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <button
                onClick={handleAddToCart}
                className={`px-6 py-2 rounded-md font-medium ${
                  quantity > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={quantity === 0}
              >
                {quantity > 0 ? 'Add to Cart' : 'Select Quantity'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation to your CSS */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Bottle;