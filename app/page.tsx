import dynamic from "next/dynamic";
import Map from "../components/Map";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false
});

export default function Home() {
  return (
    <main>
      <h1>クライミングエリア図鑑</h1>
      <Map />
    </main>
  );
}