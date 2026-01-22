import { FloodData } from '../App';
import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

type GeospatialMappingProps = {
  data: FloodData[] | null;
};

export function GeospatialMapping({ data }: GeospatialMappingProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!data || !mapRef.current) return;

    // Initialize Leaflet
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
    };

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, [data]);

  useEffect(() => {
    if (!mapLoaded || !data || !mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Clear previous map
    mapRef.current.innerHTML = '';

    // Create map
    const map = L.map(mapRef.current).setView([14.6, 121.0], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add markers
    data.slice(0, 100).forEach((row) => {
      const lat = row.Latitude || 14.6;
      const lng = row.Longitude || 121.0;
      const isFlooded = row.FloodOccurrence === 1;

      L.circleMarker([lat, lng], {
        radius: 5,
        fillColor: isFlooded ? '#ef4444' : '#3b82f6',
        color: isFlooded ? '#dc2626' : '#2563eb',
        fillOpacity: 0.7,
        weight: 2,
      })
        .bindPopup(
          `<div style="font-family: sans-serif;">
            <strong>${isFlooded ? '🌊 Flood Occurrence' : '✓ Normal'}</strong><br/>
            Rainfall: ${row.Rainfall_mm} mm<br/>
            ${row.WaterLevel_m ? `Water Level: ${row.WaterLevel_m} m` : ''}
          </div>`
        )
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [mapLoaded, data]);

  if (!data) {
    return (
      <div className="card bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
        <p className="text-yellow-800">⚠️ Upload dataset first.</p>
      </div>
    );
  }

  const floodCount = data.filter(row => row.FloodOccurrence === 1).length;
  const normalCount = data.length - floodCount;

  return (
    <div className="animate-fadeIn">
      <div className="card bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">🗺️ Flood Risk Map</h2>
        <p className="text-gray-600 mb-6">
          Geospatial visualization of flood-prone areas (showing first 100 data points)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-800">{floodCount}</p>
              <p className="text-sm text-red-700">Flood Occurrences</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-800">{normalCount}</p>
              <p className="text-sm text-blue-700">Normal Conditions</p>
            </div>
          </div>
        </div>

        <div
          ref={mapRef}
          className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg border-4 border-blue-100"
        />

        <div className="mt-6 flex gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-700"></div>
            <span className="text-sm text-gray-700">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-red-700"></div>
            <span className="text-sm text-gray-700">Flood Occurrence</span>
          </div>
        </div>
      </div>
    </div>
  );
}
