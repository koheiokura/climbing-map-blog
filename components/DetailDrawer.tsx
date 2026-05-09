"use client";

import { motion, AnimatePresence } from "framer-motion";
// import PanoramaViewer from "./PanoramaViewer"; // 追加

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  area: any;
}

export default function DetailDrawer({ isOpen, onClose, area }: DetailDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景の暗み（ここをタップしても閉じれるようにする） */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[1000]"
          />

          {/* ドロワー本体 */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-3xl z-[1001] shadow-2xl overflow-y-auto"
          >
            {/* 引き出しの「ツマミ」部分 */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-4" />
            
            <div className="px-6 pb-20">
              <h2 className="text-3xl font-bold text-gray-900">{area.name}</h2>
              <p className="text-gray-500 mt-2">{area.desc}</p>

              {/* 駐車場セクション */}
              <section className="mt-8">
                <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-1">駐車場情報</h3>
                <div className="mt-4 bg-gray-50 p-4 rounded-xl">
                  <p className="font-bold">{area.details?.parking.name}</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>台数: {area.details?.parking.capacity}</li>
                    <li>料金: {area.details?.parking.price}</li>
                    <li className="text-red-500 font-medium">ルール: {area.details?.parking.rules}</li>
                  </ul>
                </div>
              </section>

              {/* アプローチセクション（将来的に360度写真をここに） */}
              <section className="mt-8">
                <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-1">アプローチ</h3>
                <div className="mt-4 space-y-6">
                  {area.details?.approach.map((step: any) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-bold">{step.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{step.instruction}</p>
                        {/* ここに「360度ビューを見る」ボタンを後で置く */}
                        <div className="mt-2 w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          360度パノラマ準備中...
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 閉じるボタン */}
              <button 
                onClick={onClose}
                className="mt-10 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold"
              >
                地図に戻る
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}