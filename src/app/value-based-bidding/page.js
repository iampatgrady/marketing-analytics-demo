// src/app/value-based-bidding/page.js
'use client';

import { useState } from 'react';

export default function ValueBasedBidding() {
    const [userValue, setUserValue] = useState(50);
    const [currentBid, setCurrentBid] = useState(1.00);
    const [recommendedBid, setRecommendedBid] = useState(null);
    const [bidHistory, setBidHistory] = useState([]);


     const handleUpdateBid = () => {
        // This is a simplified formula, you can do a more complex calculation here.
        const newBid = (userValue / 100 * 2.5).toFixed(2);
        setCurrentBid(newBid);

        // This is a simplified recommendation calculation
        const recommended = (userValue / 100 * 3).toFixed(2);
        setRecommendedBid(recommended);

        // Add to bid history
         setBidHistory(prevHistory => [...prevHistory, { value: userValue, bid: newBid, recommendedBid: recommended }])
    };


    return (
        <main className="flex min-h-screen flex-col items-start justify-between p-24 bg-white dark:bg-zinc-900">
            <div>
                 <h1 className="mb-4 text-4xl font-bold text-smart-plum dark:text-sunny-yellow">Value-Based Bidding</h1>
                <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">See how our bidding strategies adjust based on user value.</p>

                <div className="mb-4">
                    <label htmlFor="userValue" className="block text-deep-graphite dark:text-gray-300 mb-2">User Value (0-100):</label>
                    <input
                        type="range"
                        id="userValue"
                        min="0"
                        max="100"
                        value={userValue}
                        onChange={(e) => setUserValue(parseInt(e.target.value, 10))}
                        className="w-full"
                    />
                    <p className="text-gray-700 dark:text-gray-300">Selected value: {userValue}</p>
                </div>

                 <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Current Bid:</span> ${currentBid}</p>
                 </div>

                <button onClick={handleUpdateBid} className="bg-fearless-pink hover:bg-smart-plum text-white font-bold py-2 px-4 rounded mb-4">Update Bid</button>

                 {recommendedBid && (
                   <div className="mb-4">
                       <h3 className="text-xl font-semibold mb-2 text-deep-graphite dark:text-gray-200">Recommended Bid</h3>
                       <p className="text-gray-700 dark:text-gray-300">
                            ${recommendedBid}
                         </p>
                  </div>
                  )}

                 {bidHistory.length > 0 && (
                   <div>
                      <h3 className="text-xl font-semibold mb-2 text-deep-graphite dark:text-gray-200">Bid History</h3>
                      <ul>
                         {bidHistory.map((entry, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">
                           <span className="font-semibold">Value:</span> {entry.value} -  <span className="font-semibold">Bid:</span> ${entry.bid}  -  <span className="font-semibold">Recommended Bid:</span> ${entry.recommendedBid}
                           </li>
                         ))}
                       </ul>
                   </div>
                )}

            </div>
        </main>
    );
}