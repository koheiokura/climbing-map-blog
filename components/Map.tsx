"use client";

import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer center={[35.0, 135.0]} zoom={5} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}