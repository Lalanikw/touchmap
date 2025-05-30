// components/map/MapChartWithGroupedColors.tsx
'use client'

import React, { useState, MouseEvent } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { MapChartProps } from './types';

// Define the Geography type
interface GeographyType {
  rsmKey: string;
  properties: {
    name: string;
    [key: string]: any;
  };
}

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Color constants
const COLOR_GROUPS = {
  GRAY: "#d1d5d7",
  ORANGE: "#f7b489",
  GREEN: "#94f599",
  RED: "#FF0000",
  DARK_GREEN: "#2a8835" // Added dark green color
};

// States grouped by color
const stateGroups = {
  gray: [
    "Alabama", "Alaska", "Arizona", "Arkansas",
    "Georgia", "Hawaii", "Idaho", "Kansas",
    "Louisiana", "Maine", "Maryland", "Michigan",
    "Mississippi", "Missouri", "Nevada", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Pennsylvania", "South Carolina", "South Dakota",
    "Vermont", "West Virginia", "Wisconsin", "Wyoming"
  ],
  orange: [
    "California", "Massachusetts", "Minnesota"
  ],
  red: [
    "Illinois"
  ],
  green: [
    "Colorado", "Connecticut", "Delaware", "Florida",
    "Indiana", "Iowa", "Kentucky", "Montana",
    "Nebraska", "New Hampshire", "New Jersey", "Oregon",
    "Rhode Island", "Tennessee", "Texas", "Utah",
    "Virginia"
  ],
  darkGreen: [
    "Washington" // Added Washington to dark green group
  ]
};

// Generate the stateColors object
const stateColors = Object.fromEntries([
  ...stateGroups.gray.map(state => [state, COLOR_GROUPS.GRAY]),
  ...stateGroups.orange.map(state => [state, COLOR_GROUPS.ORANGE]),
  ...stateGroups.green.map(state => [state, COLOR_GROUPS.GREEN]),
  ...stateGroups.red.map(state => [state, COLOR_GROUPS.RED]),
  ...stateGroups.darkGreen.map(state => [state, COLOR_GROUPS.DARK_GREEN])
]);

// State code mapping
const stateAbbreviations: { [key: string]: string } = {
  "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
  "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE",
  "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
  "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
  "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
  "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
  "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
  "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT",
  "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV",
  "Wisconsin": "WI", "Wyoming": "WY"
};

// Manual coordinates for state labels
const stateCoordinates: { [key: string]: [number, number] } = {
  "Alabama": [550, 400], "Alaska": [90, 460], "Arizona": [180, 360],
  "Arkansas": [470, 370], "California": [60, 290], "Colorado": [260, 300],
  "Connecticut": [740, 230], "Delaware": [720, 270], "Florida": [630, 460],
  "Georgia": [600, 400], "Hawaii": [280, 540], "Idaho": [170, 200],
  "Illinois": [500, 280], "Indiana": [550, 280], "Iowa": [450, 250],
  "Kansas": [350, 300], "Kentucky": [550, 320], "Louisiana": [460, 450],
  "Maine": [750, 120], "Maryland": [725, 290], "Massachusetts": [780, 200],
  "Michigan": [560, 220], "Minnesota": [430, 180], "Mississippi": [510, 400],
  "Missouri": [460, 320], "Montana": [250, 150], "Nebraska": [350, 250],
  "Nevada": [100, 260], "New Hampshire": [765, 180], "New Jersey": [730, 250],
  "New Mexico": [260, 360], "New York": [690, 200], "North Carolina": [650, 340],
  "North Dakota": [340, 140], "Ohio": [590, 260], "Oklahoma": [400, 350],
  "Oregon": [70, 150], "Pennsylvania": [660, 240], "Rhode Island": [760, 220],
  "South Carolina": [640, 375], "South Dakota": [350, 190], "Tennessee": [550, 350],
  "Texas": [340, 430], "Utah": [190, 290], "Vermont": [700, 140],
  "Virginia": [670, 300], "Washington": [100, 100], "West Virginia": [620, 300],
  "Wisconsin": [480, 190], "Wyoming": [260, 220]
};

const MapChartWithGroupedColors: React.FC<MapChartProps> = ({ onStateSelect }) => {
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleMouseMove = (event: MouseEvent<SVGElement>) => {
    setTooltipPosition({
      x: event.clientX - 300,
      y: event.clientY - 2
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <ComposableMap projection="geoAlbersUsa">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <>
                {/* First render all geography elements */}
                {geographies.map((geo: GeographyType) => {
                  const stateName = geo.properties.name;
                  const isSelected = selectedState === stateName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(stateName);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      onMouseMove={handleMouseMove}
                      onClick={() => {
                        setSelectedState(stateName);
                        onStateSelect({
                          name: stateName
                        });
                      }}
                      style={{
                        default: {
                          fill: stateColors[stateName] || "#D6D6DA",
                          outline: "none",
                          stroke: "#FFFFFF",
                          strokeWidth: 1.0
                        },
                        hover: {
                          fill: isSelected ? stateColors[stateName] : "#99C1F1",
                          outline: "none",
                          stroke: "#FFFFFF",
                          strokeWidth: 1
                        },
                        pressed: {
                          fill: stateColors[stateName],
                          outline: "none",
                          stroke: "#FFFFFF",
                          strokeWidth: 1
                        }
                      }}
                    />
                  );
                })}

                {/* Then render all labels in a separate group */}
                <g className="labels">
                  {geographies.map((geo: GeographyType) => {
                    const stateName = geo.properties.name;
                    const stateCode = stateAbbreviations[stateName];
                    const coordinates = stateCoordinates[stateName];

                    if (!stateCode || !coordinates) return null;

                    return (
                      <text
                        key={`label-${geo.rsmKey}`}
                        x={coordinates[0]}
                        y={coordinates[1]}
                        textAnchor="middle"
                        style={{
                          fontFamily: "system-ui",
                          fill: "#333333",
                          fontSize: 14,
                          fontWeight: "bold",
                          pointerEvents: "none"
                        }}
                      >
                        {stateCode}
                      </text>
                    );
                  })}
                </g>
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      {tooltipContent && (
        <div 
          className="absolute bg-white px-5 py-1 rounded shadow-lg pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)',
            marginTop: '-8px',
            zIndex: 1000
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default MapChartWithGroupedColors;