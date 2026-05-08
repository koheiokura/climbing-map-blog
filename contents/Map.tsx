"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import areas from "../data/areas.json";
import { useRouter } from "next/navigation";

export default function Map() {
  const router = useRouter();

  return (
    <MapContainer center={[34.8, 133.5]} zoom={6} style={{ height: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {areas.map((area) => (
        <Marker
          key={area.id}
          position={[area.lat, area.lng]}
          eventHandlers={{
            click: () => router.push(`/area/${area.id}`)
          }}
        >
          <Popup>{area.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}