// components/map/MapLegend.tsx
import React from 'react';

const MapLegend = () => {
  return (
    <div className="fixed top-10 left-0 w-80 h-screen overflow-y-auto pb-40">
      <div className="p-6 space-y-6">
        {/* Color Code Section */}
        <section className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Color Code</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-[#94f599] rounded"></div>
              <span className="text-sm text-gray-600">Security Exceptions Available</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-[#f7b489] rounded"></div>
              <span className="text-sm text-gray-600">Security Exceptions not Available</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-[#FF0000] rounded"></div>
              <span className="text-sm text-gray-600">High Litigation Risk</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-[#d1d5d7] rounded"></div>
              <span className="text-sm text-gray-600">No Current Laws</span>
            </div>
          </div>
        </section>

        {/* Abbreviations Section */}
        <section className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3"></h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-700">DPIA</h4>
              <p className="text-sm text-gray-600">Data Protection Impact Assessment</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">PRA</h4>
              <p className="text-sm text-gray-600">Private Right of Action</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Data Security</h4>
              <p className="text-sm text-gray-600">Processor should establish, implement, and maintain reasonable administrative, technical, and physical data security practices appropriate to the volume and nature of the personal data at issue.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">General Exception</h4>
              <p className="text-sm text-gray-600">The obligations imposed on controllers/processors under this act do not restrict their ability to…prevent, detect, protect against, or respond to security incidents, identity theft, fraud, harassment, or malicious, deceptive, or illegal activity; preserve the integrity of security systems; or investigate, report, or prosecute those responsible for any such action. </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MapLegend;