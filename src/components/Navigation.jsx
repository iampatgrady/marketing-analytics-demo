// /src/app/components/Navigation.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // Create a ref for the menu

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
      setIsOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
         // add listener on mount and clean up on unmount
        if (isOpen) {
           document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
           document.removeEventListener('mousedown', handleClickOutside);
       };
      }, [isOpen]);

    return (
        <nav className="relative font-work-sans">
            <div className="flex items-center justify-between p-4">
                <Link href="/" className="font-bold text-xl text-grey-800 dark:text-grey-200">
                    Marketing Analytics Demo
                </Link>
                <button onClick={toggleMenu} className="lg:hidden text-grey-800 dark:text-grey-200 focus:outline-none">
                    <svg
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L12 12.586l5.293-5.293a1 1 0 111.414 1.414L13.414 14l5.293 5.293a1 1 0 01-1.414 1.414L12 15.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 14 5.293 8.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        ) : (
                            <path
                                fillRule="evenodd"
                                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2z"
                                clipRule="evenodd"
                            />
                        )}
                    </svg>
                </button>
            </div>
           <div ref={menuRef} className={`lg:flex lg:items-center absolute top-16 left-0 w-full bg-grey-100 dark:bg-grey-800/50 shadow-md rounded-b-md transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px]' : 'max-h-0'} lg:max-h-[500px] lg:static lg:shadow-none lg:bg-transparent lg:rounded-none`}>
                <div className="lg:flex-grow p-4 lg:p-0">
                   <Link href="/durable-measurement" onClick={closeMenu} className="block lg:inline-block px-4 py-2 text-grey-700 hover:text-grey-900 dark:text-grey-300 dark:hover:text-grey-100 hover:bg-grey-200 dark:hover:bg-grey-700/50">
                        Durable Measurement
                    </Link>
                    <Link href="/machine-learning-modeling" onClick={closeMenu} className="block lg:inline-block px-4 py-2 text-grey-700 hover:text-grey-900 dark:text-grey-300 dark:hover:text-grey-100 hover:bg-grey-200 dark:hover:bg-grey-700/50">
                        Machine Learning Modeling
                    </Link>
                    <Link href="/value-based-bidding" onClick={closeMenu} className="block lg:inline-block px-4 py-2 text-grey-700 hover:text-grey-900 dark:text-grey-300 dark:hover:text-grey-100 hover:bg-grey-200 dark:hover:bg-grey-700/50">
                        Value Based Bidding
                    </Link>
                    <Link href="/mta-mmm-attribution" onClick={closeMenu} className="block lg:inline-block px-4 py-2 text-grey-700 hover:text-grey-900 dark:text-grey-300 dark:hover:text-grey-100 hover:bg-grey-200 dark:hover:bg-grey-700/50">
                        MTA & MMM Attribution
                    </Link>
                    <Link href="/geo-lift-studies" onClick={closeMenu} className="block lg:inline-block px-4 py-2 text-grey-700 hover:text-grey-900 dark:text-grey-300 dark:hover:text-grey-100 hover:bg-grey-200 dark:hover:bg-grey-700/50">
                        Geo & Pre/Post Lift Studies
                    </Link>
                </div>
            </div>
        </nav>
    );
}