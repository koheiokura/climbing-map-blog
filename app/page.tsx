"use client";

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import DetailDrawer from '@/components/DetailDrawer'; // 今作った部品を読み込む
import areasData from '@/data/areas.json';

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 flex items-center justify-center">地図をロード中...</div>
});

const CLIMBING_AREAS = areasData;

export default function Page() {
  const [selectedArea, setSelectedArea] = useState(CLIMBING_AREAS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden bg-white relative">
      {/* 
         地図の高さ設定: 
         ドロワーが閉まっている時は60%、開いている時は全画面（100%）にすることで
         ドロワーの隙間から地図が見えるようにします。
      */}
      <div className={`transition-all duration-500 ${isDrawerOpen ? 'h-screen' : 'h-[65vh]'} w-full relative`}>
        <Map center={[selectedArea.lat, selectedArea.lng]} areas={CLIMBING_AREAS} />
      </div>

      {/* 
         カードリスト（条件付き表示）:
         !isDrawerOpen && (...) という書き方で、ドロワーが開いている時は消去します。
      */}
      {!isDrawerOpen && (
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-black/20 to-transparent p-4 overflow-x-auto flex items-center gap-4 snap-x px-6">
          {CLIMBING_AREAS.map((area) => (
            <div 
              key={area.id}
              onClick={() => setSelectedArea(area)}
              /* 
                 w-[calc(100vw-48px)]: 画面幅から左右の余白を引いたサイズに固定 
                 snap-center: スクロールした時にピタッと真ん中に止まる
              */
              className={`min-w-[calc(100vw-48px)] md:min-w-[350px] h-44 rounded-2xl p-5 shadow-2xl transition-all snap-center flex flex-col justify-between cursor-pointer ${
                selectedArea.id === area.id ? 'bg-blue-600 text-white ring-4 ring-white' : 'bg-white text-gray-800'
              }`}
            >
              <div>
                <h2 className="text-xl font-bold">{area.name}</h2>
                <div className="flex gap-1 mt-2">
                  {area.tags.map(tag => (
                    <span key={tag} className="text-[10px] border border-current px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className={`text-sm mt-3 line-clamp-2 ${selectedArea.id === area.id ? 'text-blue-100' : 'text-gray-500'}`}>
                  {area.desc}
                </p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDrawerOpen(true);
                }}
                className={`w-full py-3 rounded-xl font-bold text-sm ${
                  selectedArea.id === area.id ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                }`}
              >
                詳細データを見る
              </button>
            </div>
          ))}
          {/* 最後のカードの右側に余白を作るための空要素 */}
          <div className="min-w-[1px] h-full" />
        </div>
      )}

      <DetailDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        area={selectedArea} 
      />
    </main>
  );
}