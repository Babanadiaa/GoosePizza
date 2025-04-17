import React, { useEffect } from 'react';
import logo from '../assets/Logo.png';
import { MdMenu } from "react-icons/md";

export default function Navbar({ isMenuOpen, setIsMenuOpen, isCartOpen, setIsCartOpen, cart, animateCart }) {
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }, [isMenuOpen]);

    return (
        <nav className='fixed top-0 w-full z-40 bg[rgba(10,10,10, 0.8)]
         backdrop-blur-lg px-1 border-b border-white/10 shadow-lg '>
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center font-mono h-16">
                    <img src={logo} alt="Logo" />

                    {!isMenuOpen &&
                        <div onClick={() => setIsMenuOpen(prev => !prev)} className="text-2xl absolute 
                    right-7 z-40 md:hidden cursor-pointer font-mono">
                            <MdMenu className='text-red-500' />
                        </div>}

                    <div className="flex md:flex items-center space-x-8">
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#home" className="text-red-500 text-lg hover:text-xl
                             hover:text-red-600 transition-all">Home</a>

                            <a href="#menu" className="text-red-500 text-lg hover:text-xl
                             hover:text-red-600 transition-all">Order</a>

                            <a href="#contact" className="text-red-500 text-lg hover:text-xl
                             hover:text-red-600 transition-all">Contact</a>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="text-red-500 text-lg hover:text-xl hover:text-red-600 transition-all relative"
                            >
                                Корзина 🛒
                                {cart.length > 0 && (
                                    <span
                                        className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full ${animateCart ? 'animate-bounce' : ''
                                            }`}
                                    >
                                        {cart.reduce((total, item) => total + item.quantity, 0)}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
