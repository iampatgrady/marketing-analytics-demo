// src/app/page.js
import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-start justify-between p-24 bg-white dark:bg-zinc-900">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <span className='font-bold text-xl'>
                        Marketing Analytics Demo
                    </span>
                </p>
            </div>

            <div className="flex-grow text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Explore Our Analytics Services</h1>
                <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">Choose a project to see our technology in action.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/durable-measurement" className="bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700/50 dark:hover:bg-zinc-800/50 p-6 rounded-lg shadow-md">
                        <h2 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">Durable Measurement</h2>
                        <p className="text-gray-600 dark:text-gray-300">Learn how we ensure consistent data tracking.</p>
                    </Link>
                    <Link href="/machine-learning-modeling" className="bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700/50 dark:hover:bg-zinc-800/50 p-6 rounded-lg shadow-md">
                        <h2 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">Machine Learning Modeling</h2>
                        <p className="text-gray-600 dark:text-gray-300">Explore our advanced predictive models.</p>
                    </Link>
                    <Link href="/value-based-bidding" className="bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700/50 dark:hover:bg-zinc-800/50 p-6 rounded-lg shadow-md">
                        <h2 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">Value-Based Bidding</h2>
                        <p className="text-gray-600 dark:text-gray-300">Discover how we maximize ROI with smart bidding strategies.</p>
                    </Link>
                    <Link href="/mta-mmm-attribution" className="bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700/50 dark:hover:bg-zinc-800/50 p-6 rounded-lg shadow-md">
                        <h2 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">MTA & MMM Attribution</h2>
                        <p className="text-gray-600 dark:text-gray-300">Understand the impact of your marketing channels.</p>
                    </Link>
                    <Link href="/geo-lift-studies" className="bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700/50 dark:hover:bg-zinc-800/50 p-6 rounded-lg shadow-md">
                        <h2 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">Geo & Pre/Post Lift Studies</h2>
                        <p className="text-gray-600 dark:text-gray-300">See how we measure the effectiveness of your campaigns.</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}