// components/map/MapInstructions.tsx
import React from 'react';

const MapInstructions = () => {
  return (
    <div className="w-full mx-7">
      <section className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-3 mb-3">
          <svg 
            className="w-5 h-5 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800">How to Use This Map</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <span className="text-lg font-bold text-blue-500 mb-1">1</span>
            <p className="text-sm text-gray-600">
              Hover over any state to see its name
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-lg font-bold text-blue-500 mb-1">2</span>
            <p className="text-sm text-gray-600">
              Click on a state to view detailed information about its specific requirements
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-lg font-bold text-blue-500 mb-1">3</span>
            <p className="text-sm text-gray-600">
              Review the keys in the right side panel. 
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapInstructions;