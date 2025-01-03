// src/app/layout.js
'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import RootLayoutServer from './layout-server';
import Navigation from '@/components/Navigation';


export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
         if (typeof window !== 'undefined') { //this conditional ensures this logic only runs in the browser
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }
    }, []);

    useEffect(() => {
       // Update the class on the html element
        if (typeof document !== 'undefined') {
            if (isDarkMode) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
       }, [isDarkMode]);

    return (
    <RootLayoutServer>
         <Navigation/>
            {children}
   </RootLayoutServer>
    )
}