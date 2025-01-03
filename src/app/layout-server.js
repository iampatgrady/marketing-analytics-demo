// src/app/layout-server.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Marketing Analytics Demo',
    description: 'An interactive demo of marketing analytics technologies',
};

export default function RootLayoutServer({ children }) {
    return (
       <html lang="en">
            <body className={inter.className}>{children}</body>
       </html>
    );
}