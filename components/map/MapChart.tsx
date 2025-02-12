// components/map/MapChart.tsx
'use client'

import React, { useState, MouseEvent } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { MapChartProps } from './types';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart: React.FC<MapChartProps> = ({ onStateSelect }) => {
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
            {({ geographies }) =>
              geographies.map(geo => {
                const stateName = geo.properties.name;
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
                      onStateSelect({
                        name: stateName
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
                );
              })
            }
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

export default MapChart;