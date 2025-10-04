import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Function to create custom icons based on data type
const customIcon = (type: string) => {
  let iconUrl: string;
  const shadowUrl: string = "https://unpkg.com/leaflet-color-markers/img/marker-shadow.png";

  if (type === "Blooms") {
    iconUrl = "https://unpkg.com/leaflet-color-markers/img/marker-icon-2x-green.png";
  } else {
    iconUrl = "https://unpkg.com/leaflet-color-markers/img/marker-icon-2x-blue.png";
  }

  return new L.Icon({
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Define an interface for MapComponent props for better type safety
interface MapProps {
  blooms: { id: number; lat: number; lng: number; name: string; date: string; type: string; }[];
  isDarkMode: boolean;
  onMarkerClick: (bloom: { id: number; lat: number; lng: number; name: string; date: string; type: string; }) => void;
  mapCenter: [number, number] | null;
}

// Component to handle map view changes
function ChangeView({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 10, {
        animate: true,
        duration: 1
      });
    }
  }, [center, map]);
  return null;
}

export default function MapComponent({ blooms, isDarkMode, onMarkerClick, mapCenter }: MapProps) {
  // Fix for the default icon issue, runs only on the client
  if (typeof window !== "undefined") {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }

  // Choose the map style based on dark mode state
  const tileUrl = isDarkMode
    ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
    : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer
      center={[25.75, 43.89]}
      zoom={2}
      minZoom={2} // Prevents horizontal repetition
      maxBounds={[[90, -180], [-90, 180]]} // Keeps the map within a single world view
      scrollWheelZoom
      className="w-full h-full"
    >
      <ChangeView center={mapCenter} />
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={tileUrl}
      />
      {blooms.map((bloom) => (
        <Marker
          key={bloom.id}
          position={[bloom.lat, bloom.lng]}
          icon={customIcon(bloom.type)}
          eventHandlers={{
            click: () => {
              onMarkerClick(bloom);
            },
          }}
        />
      ))}
    </MapContainer>
  );
}