'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { MapPin, Navigation, Footprints, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const nearbyPets = [
  { id: 'np-1', name: '小白', type: '🐶', breed: '萨摩耶', distance: 32, owner: '小李', x: 20, y: 30, mood: '开心' },
  { id: 'np-2', name: '花花', type: '🐰', breed: '垂耳兔', distance: 58, owner: '阿花', x: 65, y: 25, mood: '好奇' },
  { id: 'np-3', name: '皮皮', type: '🐦', breed: '鹦鹉', distance: 89, owner: '老王', x: 45, y: 60, mood: '活泼' },
  { id: 'np-4', name: '球球', type: '🐹', breed: '仓鼠', distance: 45, owner: '小美', x: 75, y: 45, mood: '困倦' },
  { id: 'np-5', name: '大黄', type: '🐕', breed: '柴犬', distance: 120, owner: '老张', x: 30, y: 70, mood: '兴奋' },
  { id: 'np-6', name: '咪咪', type: '🐱', breed: '英短', distance: 15, owner: '小陈', x: 55, y: 35, mood: '高冷' },
];

export default function MapPage() {
  const { state, greetFriend } = useAppStore();
  const [selectedPet, setSelectedPet] = useState<typeof nearbyPets[0] | null>(null);
  const [greetedIds, setGreetedIds] = useState<string[]>([]);

  const handleGreet = (petId: string) => {
    if (greetedIds.includes(petId)) return;
    greetFriend();
    setGreetedIds(prev => [...prev, petId]);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#FFF8F0]/90 backdrop-blur-sm px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-[#4A3B32]">附近的小伙伴</h1>
          <div className="flex items-center gap-1 text-sm text-[#9E8E82] bg-white px-3 py-1.5 rounded-full pixel-border-sm">
            <MapPin size={14} className="text-[#FF8FA3]" />
            <span>方圆 200m</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#9E8E82]">
          <Navigation size={12} className="text-[#7FD8BE]" />
          <span>当前位置：朝阳区公园路 · 发现 {nearbyPets.length} 只宠物</span>
        </div>
      </div>

      {/* Map Area */}
      <div className="px-4 py-4">
        <div className="relative w-full aspect-square bg-[#E8F5E9] rounded-2xl pixel-border overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(#4A3B32 1px, transparent 1px), linear-gradient(90deg, #4A3B32 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* My location */}
          <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="relative">
              <div className="w-12 h-12 bg-[#FF8FA3] rounded-full flex items-center justify-center text-2xl pixel-border-sm animate-pulse">
                {state.pet.type}
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#4A3B32] text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                我 ({state.pet.name})
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[#FF8FA3] animate-ping opacity-30" />
            </div>
          </div>

          {/* Nearby pets */}
          {nearbyPets.map((pet, i) => (
            <motion.button
              key={pet.id}
              className="absolute"
              style={{ left: `${pet.x}%`, top: `${pet.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              onClick={() => setSelectedPet(pet)}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl pixel-border-sm transition-transform ${selectedPet?.id === pet.id ? 'scale-125 bg-[#C9A0DC]' : 'bg-white hover:scale-110'}`}>
                  {pet.type}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#4A3B32] text-white text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  {pet.name}
                </div>
                <div className="absolute -top-2 -right-2 bg-[#7FD8BE] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center">
                  {pet.distance}m
                </div>
              </div>
            </motion.button>
          ))}

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-2xl opacity-30">🌳</div>
          <div className="absolute top-8 right-8 text-2xl opacity-30">🌲</div>
          <div className="absolute bottom-6 left-8 text-2xl opacity-30">🏠</div>
          <div className="absolute bottom-4 right-6 text-2xl opacity-30">⛲</div>
        </div>
      </div>

      {/* Selected Pet Detail */}
      <AnimatePresence>
        {selectedPet && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="px-4 pb-4"
          >
            <div className="bg-white rounded-2xl p-4 pixel-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-[#FFF0E4] rounded-xl flex items-center justify-center text-3xl pixel-border-sm">
                  {selectedPet.type}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#4A3B32]">{selectedPet.name}</h3>
                  <p className="text-sm text-[#9E8E82]">{selectedPet.breed} · {selectedPet.mood}</p>
                  <div className="flex items-center gap-1 text-xs text-[#9E8E82] mt-0.5">
                    <Footprints size={12} />
                    <span>主人：{selectedPet.owner}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#FF8FA3]">{selectedPet.distance}m</div>
                  <div className="text-xs text-[#9E8E82]">距离</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleGreet(selectedPet.id)}
                  disabled={greetedIds.includes(selectedPet.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    greetedIds.includes(selectedPet.id)
                      ? 'bg-[#E8D5C4] text-[#9E8E82]'
                      : 'bg-[#FF8FA3] text-white hover:opacity-90 active:scale-95'
                  }`}
                >
                  <MessageCircle size={16} />
                  {greetedIds.includes(selectedPet.id) ? '已打招呼' : '打招呼'}
                </button>
                <button
                  onClick={() => setSelectedPet(null)}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold bg-[#FFF0E4] text-[#4A3B32] hover:bg-[#E8D5C4] transition-all"
                >
                  关闭
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pet List */}
      <div className="px-4 pb-6">
        <h2 className="text-sm font-bold text-[#4A3B32] mb-3">附近列表</h2>
        <div className="space-y-2">
          {nearbyPets.map((pet, i) => (
            <motion.div
              key={pet.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-3 flex items-center gap-3 pixel-border-sm"
              onClick={() => setSelectedPet(pet)}
            >
              <div className="w-10 h-10 bg-[#FFF0E4] rounded-lg flex items-center justify-center text-xl">
                {pet.type}
              </div>
              <div className="flex-1">
                <div className="font-bold text-[#4A3B32] text-sm">{pet.name}</div>
                <div className="text-xs text-[#9E8E82]">{pet.breed} · 主人{pet.owner}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#7FD8BE]">
                <MapPin size={12} />
                <span className="font-bold">{pet.distance}m</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
