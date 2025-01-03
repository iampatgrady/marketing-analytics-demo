// src/app/durable-measurement/page.js
'use client'; // this is a client component

import Link from "next/link";
import { useState, useEffect } from 'react';

export default function DurableMeasurement() {
    const [tagManagementEnabled, setTagManagementEnabled] = useState(true);
    const [dataLayerEnabled, setDataLayerEnabled] = useState(false);
    const [rawData, setRawData] = useState({});
    const [formattedData, setFormattedData] = useState({});

    // Function to generate some simulated raw tracking data.
    // note that, in production, this might come from an external source like an API.
    const generateRawData = () => {
        const now = new Date();
        const raw = {
            event: 'product_view',
            product_id: Math.floor(Math.random() * 1000),
            timestamp: now.toISOString(),
            user_id: 'user-' + Math.floor(Math.random() * 10000),
            page_url: '/product/123'
        };
        setRawData(raw);
    };


  // Function to simulate processing, and transforming, of the data
    const processData = () => {
        // In a real app, this is where complex data logic is applied
         let processed = {...rawData};
        if (tagManagementEnabled) {
            processed.tag_management_applied = true;
          } else {
            processed.tag_management_applied = false;
        }
        if (dataLayerEnabled) {
            processed.data_layer_applied = true;
        } else {
            processed.data_layer_applied = false
        }
         setFormattedData(processed);
    }


    // generate some data on initial render
    useEffect(()=> {
        generateRawData();
    }, []);

     // transform data every time the configuration or the raw data changes
    useEffect(() => {
        processData();
     }, [tagManagementEnabled, dataLayerEnabled, rawData]);

  // this updates the generated raw data every time the button is pressed
   const handleUpdateData = () => {
        generateRawData();
   }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-zinc-900">
            <div>
                <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Durable Measurement</h1>
               <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">See how data consistency is maintained with different tracking configurations.</p>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Configurations</h3>
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                        <input
                            type="checkbox"
                            checked={tagManagementEnabled}
                            onChange={(e) => setTagManagementEnabled(e.target.checked)}
                            className="mr-2"
                        />
                        Tag Management
                    </label>
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                        <input
                            type="checkbox"
                            checked={dataLayerEnabled}
                            onChange={(e) => setDataLayerEnabled(e.target.checked)}
                            className="mr-2"
                        />
                        Data Layer
                    </label>
                </div>
               <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Raw Data</h3>
                    <pre className="bg-gray-100 dark:bg-zinc-700/50 p-4 rounded-md text-sm overflow-x-auto text-gray-700 dark:text-gray-300">{JSON.stringify(rawData, null, 2)}</pre>
                     <button onClick={handleUpdateData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Update Raw Data</button>
               </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Formatted Data</h3>
                    <pre className="bg-gray-100 dark:bg-zinc-700/50 p-4 rounded-md text-sm overflow-x-auto text-gray-700 dark:text-gray-300">{JSON.stringify(formattedData, null, 2)}</pre>
               </div>
            </div>
        </main>
    );
}