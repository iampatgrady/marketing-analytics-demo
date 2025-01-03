// src/app/mta-mmm-attribution/page.js
'use client';

import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);


export default function MtaMmmAttribution() {
    const [attributionType, setAttributionType] = useState('mta');

    const channels = [
        { id: 1, name: 'Facebook Ads', conversions: 150 },
        { id: 2, name: 'Google Ads', conversions: 200 },
        { id: 3, name: 'Email Marketing', conversions: 120 },
        { id: 4, name: 'Organic Search', conversions: 80 },
    ];

    // Simulate attribution based on type
     const attributedConversions = channels.map(channel => {
        let attributed = channel.conversions;
        if (attributionType === 'mta') {
             // Simulate a last-touch model, only attribution to last channel
              attributed = Math.floor(channel.conversions * Math.random()*.5) + (channel.conversions/2)

        } else {
             // Simulate a balanced distribution
             attributed = Math.floor(channel.conversions * .6)
         }
        return { ...channel, attributedConversions: attributed };
    });

    const chartData = {
        labels: attributedConversions.map(channel => channel.name),
        datasets: [{
            label: 'Attributed Conversions',
            data: attributedConversions.map(channel => channel.attributedConversions),
             backgroundColor: ['#FF00CE', '#653D62', '#EEE707', '#353535'],
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
                text: 'Channel Attribution'
             }
         }
    };

    return (
        <main className="flex min-h-screen flex-col items-start justify-between p-24 bg-white dark:bg-zinc-900">
            <div>
                  <h1 className="mb-4 text-4xl font-bold text-smart-plum dark:text-sunny-yellow">MTA & MMM Attribution</h1>
                  <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">Understand how we attribute conversions to different marketing channels.</p>


                <div className="mb-4">
                    <label htmlFor="attributionType" className="block text-deep-graphite dark:text-gray-300 mb-2">Attribution Type:</label>
                    <select id="attributionType" value={attributionType} onChange={(e) => setAttributionType(e.target.value)} className="border p-2 rounded text-gray-800 dark:text-gray-200 dark:bg-zinc-700/50">
                        <option value="mta">MTA</option>
                        <option value="mmm">MMM</option>
                    </select>
                </div>

                 <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 text-deep-graphite dark:text-gray-200">Attributed Conversions</h3>
                    <div style={{ width: "400px", height: "300px" }}>
                       <Pie data={chartData} options={chartOptions} />
                   </div>
                </div>
            </div>
        </main>
    );
}