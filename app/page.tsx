"use client";

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">地図をロード中...</div>
});

const CLIMBING_AREAS = [
  { id: 'fudoiwa', name: "不動岩", lat: 34.852, lng: 135.221, tags: ["初心者", "展望"], desc: "道場駅から徒歩圏内の人気エリア。見晴らしが良い。" },
  { id: 'komoridani', name: "蝙蝠谷", lat: 34.885, lng: 135.255, tags: ["中上級", "石灰岩"], desc: "静かな森の中にあるエリア。夏場でも比較的涼しい。" },
];

export default function Page() {
  const [selectedArea, setSelectedArea] = useState(CLIMBING_AREAS[0]);

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden bg-white">
      {/* 上部：地図エリア（高さを60%に固定） */}
      <div className="h-[60vh] w-full relative bg-gray-100">
        <Map center={[selectedArea.lat, selectedArea.lng]} areas={CLIMBING_AREAS} />
      </div>

      {/* 下部：カードエリア（残りの40%を使用） */}
      <div className="flex-1 bg-gray-50 border-t border-gray-200 p-4 overflow-x-auto flex items-center gap-4 snap-x">
        {CLIMBING_AREAS.map((area) => (
          <div 
            key={area.id}
            onClick={() => setSelectedArea(area)}
            className={`min-w-[85%] md:min-w-[320px] h-40 rounded-2xl p-4 shadow-lg transition-all snap-center flex flex-col justify-between cursor-pointer ${
              selectedArea.id === area.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-100'
            }`}
          >
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">{area.name}</h2>
                <span className="text-xs px-2 py-1 bg-black/5 rounded-full">★ 4.5</span>
              </div>
              <div className="flex gap-1 mt-1">
                {area.tags.map(tag => (
                  <span key={tag} className="text-[10px] border border-current px-2 py-0.5 rounded-full opacity-80">{tag}</span>
                ))}
              </div>
              <p className={`text-xs mt-2 line-clamp-2 ${selectedArea.id === area.id ? 'text-blue-50' : 'text-gray-500'}`}>
                {area.desc}
              </p>
            </div>
            <button className={`w-full py-2 rounded-lg font-bold text-xs ${
              selectedArea.id === area.id ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
            }`}>
              詳細データを見る
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}