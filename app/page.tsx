
import MapContainer from "@/components/map/MapContainer";
import MapInstructions from "@/components/map/MapInstructions";
import MapLegend from "@/components/map/MapLegand";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Left side legend panel */}
      <MapLegend />
      
      {/* Main content area */}
      <div className="pl-80 pr-96">
        <div className="flex flex-col items-center py-10">
          {/* Map */}
          <div className="w-full">
            <MapContainer />
          </div>
        
        </div>
      </div>
    </div>
  );
}