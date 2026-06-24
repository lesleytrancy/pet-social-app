'use client';

import { mockAdminStats } from '@/mocks/data';
import { motion } from 'framer-motion';
import { MessageSquare, CalendarCheck, Heart, Zap } from 'lucide-react';

const detailStats = [
  { label: '总消息数', value: mockAdminStats.totalMessages, icon: MessageSquare, color: '#FF8FA3' },
  { label: '总打卡数', value: mockAdminStats.totalCheckIns, icon: CalendarCheck, color: '#7FD8BE' },
  { label: '平均亲密度', value: '78%', icon: Heart, color: '#C9A0DC' },
  { label: '平均等级', value: 'Lv.3.2', icon: Zap, color: '#FFB347' },
];

const petTypeDistribution = [
  { type: '🐱', name: '猫咪', count: 68, percent: 44 },
  { type: '🐶', name: '狗狗', count: 52, percent: 33 },
  { type: '🐰', name: '兔子', count: 18, percent: 12 },
  { type: '🐦', name: '小鸟', count: 12, percent: 8 },
  { type: '🐹', name: '其他', count: 6, percent: 4 },
];

export default function AdminStatsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-[#4A3B32] mb-4">数据统计</h1>

      {/* Detail Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {detailStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 pixel-border-sm text-center"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: s.color + '20' }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <div className="text-xl font-bold text-[#4A3B32]">{s.value}</div>
            <div className="text-xs text-[#9E8E82]">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Pet Type Distribution */}
      <div className="bg-white rounded-xl p-4 pixel-border-sm mb-6">
        <h2 className="text-sm font-bold text-[#4A3B32] mb-3">宠物类型分布</h2>
        <div className="space-y-3">
          {petTypeDistribution.map((item, i) => (
            <motion.div
              key={item.type}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{item.type}</span>
                <span className="text-sm text-[#4A3B32]">{item.name}</span>
                <span className="text-xs text-[#9E8E82] ml-auto">{item.count}只 ({item.percent}%)</span>
              </div>
              <div className="h-2 bg-[#FFF0E4] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percent}%` }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: ['#FF8FA3', '#7FD8BE', '#C9A0DC', '#FFB347', '#9E8E82'][i] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-xl p-4 pixel-border-sm">
        <h2 className="text-sm font-bold text-[#4A3B32] mb-3">本周活跃度</h2>
        <div className="flex items-end gap-2 h-28">
          {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, i) => {
            const heights = [60, 80, 45, 90, 70, 55, 85];
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heights[i]}%` }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="w-full bg-[#7FD8BE] rounded-t-sm opacity-80"
                />
                <span className="text-[10px] text-[#9E8E82]">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
