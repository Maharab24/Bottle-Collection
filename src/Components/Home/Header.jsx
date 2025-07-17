import React, { useEffect, useState } from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaWineBottle, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [localCount, setLocalCount] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Function to update cart count
    const updateCartCount = () => {
        const bottleData = localStorage.getItem('bottleCart');
        if (bottleData) {
            try {
                const bottleArray = JSON.parse(bottleData);
                setLocalCount(bottleArray.length);
            } catch (e) {
                console.error('Error parsing cart data:', e);
                setLocalCount(0);
            }
        } else {
            setLocalCount(0);
        }
    };

    useEffect(() => {
        // Initial load
        updateCartCount();

        // Create event listener for custom cart updates
        const handleCartUpdate = () => {
            updateCartCount();
        };

        // Listen for custom event and storage changes
        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('storage', handleCartUpdate);

        // Scroll event listener for navbar effect
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('storage', handleCartUpdate);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-white text-gray-800 shadow-md py-2'
                    : 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg py-3'
            }`}
        >
            {/* Main Navigation Bar */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <FaWineBottle className={`${
                            isScrolled ? 'text-indigo-700' : 'text-amber-400'
                        } text-3xl transition-colors duration-500`} />
                        <span className="text-2xl font-bold font-serif">
                            <span className={`${
                                isScrolled ? 'text-indigo-700' : 'text-amber-400'
                            } transition-colors duration-500`}>
                                Bottle
                            </span>Collection
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8 font-medium">
                            {['Home', 'Collection', 'Categories', 'About', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="/"
                                        className="relative py-2 group"
                                    >
                                        <span className={`group-hover:text-amber-300 transition-colors duration-300 ${
                                            isScrolled ? 'text-gray-700 hover:text-indigo-600' : ''
                                        }`}>
                                            {item}
                                        </span>
                                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                            isScrolled ? 'bg-indigo-600' : 'bg-amber-400'
                                        }`}></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <button className={`btn btn-circle btn-ghost relative ${
                            isScrolled ? 'hover:bg-gray-100' : 'hover:bg-indigo-800'
                        }`}>
                            <FaUser className="text-xl" />
                        </button>
                        <Link to="/cart">
                            <button className={`btn btn-circle btn-ghost relative ${
                                isScrolled ? 'hover:bg-gray-100' : 'hover:bg-indigo-800'
                            }`}>
                                <FaShoppingCart className="text-xl" />
                                <span className={`absolute -top-1 -right-1 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ${
                                    isScrolled ? 'bg-indigo-600' : 'bg-amber-500'
                                }`}>
                                    {localCount}
                                </span>
                            </button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-2xl"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FaBars className={isScrolled ? 'text-gray-700' : 'text-white'} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className={`md:hidden py-3 transition-colors duration-500 ${
                    isScrolled ? 'bg-white' : 'bg-indigo-800'
                }`}>
                    <ul className="container mx-auto px-4 space-y-3">
                        {['Home', 'Collection', 'Categories', 'About', 'Contact'].map((item) => (
                            <li key={item}>
                                <a
                                    href="\"
                                    className={`block py-2 pl-2 border-l-2 transition-all duration-200 hover:pl-3 ${
                                        isScrolled
                                            ? 'border-indigo-600 text-gray-700 hover:border-indigo-800'
                                            : 'border-amber-400 text-white hover:border-amber-300'
                                    }`}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;