// src/app/machine-learning-modeling/page.js
'use client';

import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MachineLearningModeling() {
    const [modelType, setModelType] = useState('regression');
    const [modelWeights, setModelWeights] = useState(null);
    const [inputData, setInputData] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [trainingStatus, setTrainingStatus] = useState('');
    const [progress, setProgress] = useState(0);


    const handleTrainModel = () => {
         setTrainingStatus('Training...');
        setProgress(0);
         // Simulate model training by generating random weights
          const interval = setInterval(() => {
              setProgress((prevProgress) => {
               const newProgress = Math.min(prevProgress + 10, 100)
                if (newProgress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        const newWeights = modelType === 'regression'
                            ? Math.random()
                            : [Math.random(), Math.random()];
                        setInputData(Math.random());
                        setModelWeights(newWeights);
                        const newPrediction = makePrediction(newWeights, modelType, inputData);
                        setPrediction(newPrediction);
                        setTrainingStatus('Training Complete!');
                   }, 100);
                }
              return newProgress;
             });
        }, 100);
    };

    const makePrediction = (weights, type, input) => {
        if (type === 'regression') {
            return `Predicted Value: ${ (input * weights).toFixed(2) }`;
        } else {
            if (input > .5) {
                return "Predicted Class: Positive"
            }
            return "Predicted Class: Negative"
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-zinc-900">
            <div>
                 <h1 className="mb-4 text-4xl font-bold text-smart-plum dark:text-sunny-yellow">Machine Learning Modeling</h1>
                <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">Explore how our machine learning models work.</p>

               <div className="mb-4">
                   <label htmlFor="modelType" className="block text-deep-graphite dark:text-gray-300 mb-2">Model Type:</label>
                    <select id="modelType" value={modelType} onChange={(e) => setModelType(e.target.value)} className="border p-2 rounded text-gray-800 dark:text-gray-200 dark:bg-zinc-700/50">
                       <option value="regression">Regression</option>
                        <option value="classification">Classification</option>
                   </select>
                </div>

                <button onClick={handleTrainModel} className="bg-fearless-pink hover:bg-smart-plum text-white font-bold py-2 px-4 rounded mb-4">Train Model</button>

              {trainingStatus &&
                  <div className="mb-4">
                      <p className="mb-2 text-gray-700 dark:text-gray-300">{trainingStatus}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                           <div className="bg-fearless-pink h-2.5 rounded-full" style={{ width: `${progress}%`}}></div>
                      </div>
                  </div>
              }

                {modelWeights && (
                    <div className="mb-4">
                       <h3 className="text-xl font-semibold mb-2 text-deep-graphite dark:text-gray-200">Model Output</h3>
                        <p className="text-gray-700 dark:text-gray-300"> <span className="font-semibold">Model Weights:</span></p>
                        <SyntaxHighlighter language="json" style={dracula}>
                            {JSON.stringify(modelWeights, null, 2)}
                        </SyntaxHighlighter>
                        {inputData &&
                           <p className="text-gray-700 dark:text-gray-300">
                               <span className="font-semibold">Input Data:</span>
                             <SyntaxHighlighter language="json" style={dracula}>
                                 {JSON.stringify(inputData, null, 2)}
                            </SyntaxHighlighter>
                            </p>
                        }
                    </div>
               )}
                {prediction && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-deep-graphite dark:text-gray-200">Prediction</h3>
                    <p className="text-gray-700 dark:text-gray-300">{prediction}</p>
                  </div>
               )}
           </div>
        </main>
    );
}