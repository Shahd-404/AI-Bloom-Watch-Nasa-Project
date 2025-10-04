'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

export default function LeafletMap() {
  useEffect(() => {
    const map = L.map('map', {
      center: [30.0444, 31.2357], // Cairo default
      zoom: 5,
    });

    // Base layer
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Satellite layer
    const satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: '© Esri, Maxar, Earthstar Geographics' }
    );

    // Dummy heatmap
    const heat = (L as any).heatLayer(
      [
        [30.05, 31.23, 0.8],
        [29.97, 31.25, 0.5],
        [30.1, 31.21, 0.9],
      ],
      { radius: 25 }
    );

    // Layers control
    const overlays = {
      'Satellite Imagery': satellite,
      'Bloom Hotspots': heat,
    };
    L.control.layers({ OpenStreetMap: osm }, overlays).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{ width: '100%', height: '400px', borderRadius: '12px', marginTop: '1rem' }}
    />
  );
}
