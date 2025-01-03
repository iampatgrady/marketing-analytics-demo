//src/app/layout-server.js
import { Work_Sans} from 'next/font/google';

const work_sans = Work_Sans({ subsets: ['latin'] });

export const metadata = {
    title: 'Marketing Analytics Demo',
    description: 'An interactive demo of marketing analytics technologies',
};

export default function RootLayoutServer({ children }) {
    return (
       <html lang="en">
            <body className={work_sans.className}>{children}</body>
       </html>
    );
}