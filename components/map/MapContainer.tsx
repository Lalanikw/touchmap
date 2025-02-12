// components/map/MapContainer.tsx
'use client'

import React, { useState, useEffect } from 'react';
//import MapChart from './MapChart';
//import MapChartWithLabels from './MapChartWithLabels';
import MapChartWithColorsAndLabels from './MapChartWithColorAndLabels';
import SidePanel from './SidePanel';
import { fetchStateDetails } from './services/stateService';
import { StateProperties, StateDetails } from './types';
import MapInstructions from './MapInstructions';

const MapContainer: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<StateProperties | null>(null);
  const [stateDetails, setStateDetails] = useState<StateDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedState?.name) {
       console.log("Selected state in effect:", selectedState); // Debug log
      setIsPanelOpen(true);
      setStateDetails(null); // Reset while loading
      setError(null);

      fetchStateDetails(selectedState.name)
        .then(details => {
           console.log("Selected state in effect:", selectedState); // Debug log
          setStateDetails(details);
        })
        .catch(error => {
          console.error('Error loading state details:', error);
          // Handle error state here
        });
    }
  }, [selectedState]);

  const handleStateSelect = (stateProps: StateProperties) => {
    console.log("State selected:", stateProps); // Debug log
    setSelectedState(stateProps);
    setIsPanelOpen(true); // Explicitly set panel to open
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setSelectedState(null);
    setStateDetails(null);
    setError(null);
  };

  // Debug log for render
  console.log("Rendering MapContainer with:", {
    isPanelOpen,
    selectedState,
    stateDetails
  });

  return (
    <div className="relative min-h-screen">
      <MapChartWithColorsAndLabels onStateSelect={handleStateSelect} />
      <SidePanel
        isOpen={isPanelOpen}
        stateInfo={selectedState}
        stateDetails={stateDetails}
        onClose={handlePanelClose}
      />
      <MapInstructions/>
    </div>
  );
};

export default MapContainer;