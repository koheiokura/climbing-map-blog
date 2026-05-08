"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer
      center={[34.7, 135.5] as const} // 大阪付近
      zoom={8}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}