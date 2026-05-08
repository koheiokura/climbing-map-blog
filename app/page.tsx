"use client";
import dynamic from 'next/dynamic';

// SSR（サーバー側での描画）を完全にオフにして読み込む
const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div style={{ height: "100vh", backgroundColor: "#e5e7eb" }}>地図を起動中...</div>
});

export default function Page() {
  return (
    <main>
      <Map />
    </main>
  );
}
