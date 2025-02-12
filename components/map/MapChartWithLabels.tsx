// components/map/MapChartWithLabels.tsx
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

const MapChartWithLabels: React.FC<MapChartProps> = ({ onStateSelect }) => {
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<SVGElement>) => {
    setTooltipPosition({
      x: event.clientX - 300,
      y: event.clientY - 2
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <ComposableMap projection="geoAlbersUsa">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <>
                {/* First render all geography elements */}
                {geographies.map((geo: GeographyType) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(geo.properties.name);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onMouseMove={handleMouseMove}
                    onClick={() => {
                      onStateSelect({
                        name: geo.properties.name
                      });
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none",
                        stroke: "#666666",
                        strokeWidth: 0.5
                      },
                      hover: {
                        fill: "#99C1F1",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#3182CE",
                        outline: "none"
                      }
                    }}
                  />
                ))}

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
                          fill: "#333",
                          fontSize: 14,
                          fontWeight: "bold",
                          pointerEvents: "none"  // Make sure labels don't interfere with map interactions
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
          className="absolute bg-white px-2 py-1 rounded shadow-lg pointer-events-none"
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

export default MapChartWithLabels;