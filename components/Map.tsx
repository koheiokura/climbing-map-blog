"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from "react";
// L を直接 import するのではなく、動的に扱うための工夫
import L from 'leaflet';

function ChangeView({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
    // 地図が真っ白になるのを防ぐため、サイズを再計算させる
    map.invalidateSize();
  }, [center, map]);
  return null;
}

interface MapProps {
  center: LatLngExpression;
  areas: any[];
}

export default function Map({ center, areas }: MapProps) {
  const [icon, setIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // アイコンの設定をブラウザ実行時に限定する
    const defaultIcon = L.icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    setIcon(defaultIcon);
  }, []);

  return (
    <div style={{ height: "100%", width: "100%", backgroundColor: "#e5e7eb" }}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeView center={center} />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {icon && areas.map((area) => (
          <Marker key={area.id} position={[area.lat, area.lng]} icon={icon}>
            <Popup>{area.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}