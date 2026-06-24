'use client';

import { mockAdminPets } from '@/mocks/data';
import { motion } from 'framer-motion';
import { Search, Heart, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function AdminPetsPage() {
  const [search, setSearch] = useState('');
  const filtered = mockAdminPets.filter(p =>
    p.name.includes(search) || p.breed.includes(search) || p.owner.includes(search)
  );

  return (
    <div>
      <h1 className="text-xl font-bold text-[#4A3B32] mb-4">宠物管理</h1>

      {/* Search */}
      <div className="bg-white rounded-xl p-3 pixel-border-sm mb-4 flex items-center gap-2">
        <Search size={16} className="text-[#9E8E82]" />
        <input
          type="text"
          placeholder="搜索宠物、品种或主人..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 text-sm outline-none bg-transparent text-[#4A3B32] placeholder:text-[#9E8E82]"
        />
      </div>

      {/* Pet Cards */}
      <div className="grid grid-cols-1 gap-3">
        {filtered.map((pet, i) => (
          <motion.div
            key={pet.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-4 pixel-border-sm flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-[#FFF0E4] rounded-xl flex items-center justify-center text-2xl pixel-border-sm">
              {pet.type}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#4A3B32]">{pet.name}</span>
                <span className="text-xs bg-[#FF8FA3]/10 text-[#FF8FA3] px-2 py-0.5 rounded-full">{pet.breed}</span>
              </div>
              <div className="text-xs text-[#9E8E82] mt-0.5">主人：{pet.owner}</div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs text-[#FF8FA3]">
                  <TrendingUp size={12} />
                  <span>Lv.{pet.level}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#FF8FA3]">
                  <Heart size={12} />
                  <span>{pet.intimacy}%</span>
                </div>
                <div className="text-xs text-[#9E8E82]">创建于 {pet.createdAt}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
