// src/app/machine-learning-modeling/page.js
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MachineLearningModeling() {
    const [modelType, setModelType] = useState('regression');
    const [modelWeights, setModelWeights] = useState(null);
    const [inputData, setInputData] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [trainingStatus, setTrainingStatus] = useState('');


    const handleTrainModel = () => {
        setTrainingStatus('Training...');
      // Simulate model training by generating random weights
         setTimeout(() => {
          const newWeights = modelType === 'regression'
             ? Math.random()
             : [Math.random(), Math.random()];
            setInputData(Math.random());
            setModelWeights(newWeights);
            const newPrediction = makePrediction(newWeights, modelType, inputData);
            setPrediction(newPrediction);
            setTrainingStatus('Training Complete!');
        }, 1000); // Simulate 1 second of training
    };

    const makePrediction = (weights, type, input) => {
      if(type === 'regression') {
        return `Predicted Value: ${ (input * weights).toFixed(2) }`;
      } else {
         if(input > .5) {
           return "Predicted Class: Positive"
         }
        return "Predicted Class: Negative"
      }
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-zinc-900">
            <div>
                <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Machine Learning Modeling</h1>
                <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">Explore how our machine learning models work.</p>

               <div className="mb-4">
                   <label htmlFor="modelType" className="block text-gray-700 dark:text-gray-300 mb-2">Model Type:</label>
                    <select id="modelType" value={modelType} onChange={(e) => setModelType(e.target.value)} className="border p-2 rounded text-gray-800 dark:text-gray-200 dark:bg-zinc-700/50">
                       <option value="regression">Regression</option>
                        <option value="classification">Classification</option>
                   </select>
                </div>

                <button onClick={handleTrainModel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Train Model</button>

               {trainingStatus && <p className="mb-4 text-gray-700 dark:text-gray-300">{trainingStatus}</p> }

                {modelWeights && (
                    <div className="mb-4">
                       <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Model Output</h3>
                         <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Model Weights:</span> {JSON.stringify(modelWeights)}
                        </p>
                         {inputData && <p className="text-gray-700 dark:text-gray-300"> <span className="font-semibold">Input Data:</span> {JSON.stringify(inputData)} </p> }
                    </div>
               )}


                {prediction && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Prediction</h3>
                    <p className="text-gray-700 dark:text-gray-300">{prediction}</p>
                  </div>
               )}

           </div>
        </main>
    );
}