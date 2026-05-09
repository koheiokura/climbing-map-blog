"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from "react";
import L from 'leaflet';

// 修正：タイミングのズレを解消するコンポーネント
function ChangeView({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !center) return;

    // 地図が準備完了（Ready）になってから実行する
    map.whenReady(() => {
      try {
        // centerが有効な値かチェックして移動
        map.setView(center, 13, { animate: true });
        
        // 少し遅らせてサイズ再計算を実行（白画面防止）
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      } catch (e) {
        console.error("Map movement error:", e);
      }
    });
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
    if (typeof window !== "undefined") {
      const defaultIcon = L.icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      setIcon(defaultIcon);
    }
  }, []);

  return (
    <div className="h-full w-full bg-gray-200">
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeView center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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