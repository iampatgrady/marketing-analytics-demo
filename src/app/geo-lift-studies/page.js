// src/app/geo-lift-studies/page.js
'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function GeoLiftStudies() {
    const [campaignStatus, setCampaignStatus] = useState('before');

    // Some example simulated data
    const campaignInfo = {
        region: "North America",
        type: "Search Ads",
    };

    // Function to determine "lift" based on campaign phase
    const calculateLift = () => {
        switch (campaignStatus) {
            case 'during':
                return Math.floor(Math.random() * 20 + 80); // Simulate Lift between 80 and 100
            case 'after':
                return Math.floor(Math.random() * 50 + 10); // Simulate Lift between 10 and 50.
            default:
                return 0; // No Lift before campaign
        }
    };

    const lift = calculateLift();

    // Chart data
    const chartData = {
        labels: ['Lift'],
        datasets: [{
            label: 'Lift Percentage',
            data: [lift],
            backgroundColor: ['#FF00CE'],
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
             title: {
                display: true,
                text: 'Campaign Lift'
             }
         }
    };


    return (
        <main className="flex min-h-screen flex-col items-start justify-between p-24 bg-white dark:bg-zinc-900">
            <div>
                 <h1 className="mb-4 text-4xl font-bold text-smart-plum dark:text-sunny-yellow">Geo & Pre/Post Lift Studies</h1>
                <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">See how we measure the impact of marketing campaigns.</p>


                <div className="mb-4">
                    <label htmlFor="campaignStatus" className="block text-deep-graphite dark:text-gray-300 mb-2">Campaign Status:</label>
                    <select
                        id="campaignStatus"
                        value={campaignStatus}
                        onChange={(e) => setCampaignStatus(e.target.value)}
                        className="border p-2 rounded text-gray-800 dark:text-gray-200 dark:bg-zinc-700/50"
                    >
                        <option value="before">Before</option>
                        <option value="during">During</option>
                        <option value="after">After</option>
                    </select>
                </div>

               <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 text-deep-graphite dark:text-gray-200">Campaign Results</h3>
                   <div style={{ width: "400px", height: "300px" }}>
                       <Bar data={chartData} options={chartOptions} />
                   </div>
                    <p className="text-gray-700 dark:text-gray-300">Region: {campaignInfo.region} </p>
                    <p className="text-gray-700 dark:text-gray-300">Type: {campaignInfo.type} </p>
                </div>
            </div>
        </main>
    );
}