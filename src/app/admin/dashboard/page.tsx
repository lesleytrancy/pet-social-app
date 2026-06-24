'use client';

import { mockAdminStats } from '@/mocks/data';
import { motion } from 'framer-motion';
import { Users, PawPrint, MessageSquare, CalendarCheck, TrendingUp, Activity } from 'lucide-react';

const stats = [
  { label: '总用户', value: mockAdminStats.totalUsers, icon: Users, color: '#FF8FA3', change: '+12%' },
  { label: '总宠物', value: mockAdminStats.totalPets, icon: PawPrint, color: '#7FD8BE', change: '+8%' },
  { label: '今日活跃', value: mockAdminStats.activeToday, icon: Activity, color: '#C9A0DC', change: '+5%' },
  { label: '今日新增', value: mockAdminStats.newUsersToday, icon: TrendingUp, color: '#FFB347', change: '+3%' },
];

const recentActivity = [
  { action: '新用户注册', detail: '用户「小明」注册了账号', time: '2分钟前', icon: Users },
  { action: '宠物创建', detail: '创建了宠物「咪咪」', time: '5分钟前', icon: PawPrint },
  { action: '消息发送', detail: '宠物发送了 12 条消息', time: '10分钟前', icon: MessageSquare },
  { action: '打卡记录', detail: '用户完成今日打卡', time: '15分钟前', icon: CalendarCheck },
  { action: '新用户注册', detail: '用户「小红」注册了账号', time: '30分钟前', icon: Users },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-[#4A3B32] mb-4">数据概览</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 pixel-border-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + '20' }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <span className="text-xs font-bold text-[#7FD8BE]">{s.change}</span>
            </div>
            <div className="text-2xl font-bold text-[#4A3B32]">{s.value}</div>
            <div className="text-xs text-[#9E8E82]">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 pixel-border-sm">
          <h2 className="text-sm font-bold text-[#4A3B32] mb-3">用户增长趋势</h2>
          <div className="h-32 flex items-end gap-2">
            {[40, 55, 45, 70, 60, 85, 75, 90, 80, 100, 95, 110].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex-1 bg-[#FF8FA3] rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                style={{ minHeight: 4 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[#9E8E82]">
            <span>1月</span><span>2月</span><span>3月</span><span>4月</span><span>5月</span><span>6月</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-4 pixel-border-sm">
        <h2 className="text-sm font-bold text-[#4A3B32] mb-3">最近动态</h2>
        <div className="space-y-3">
          {recentActivity.map((act, i) => (
            <motion.div
              key={i}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-[#FFF0E4] rounded-lg flex items-center justify-center">
                <act.icon size={14} className="text-[#4A3B32]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#4A3B32]">{act.action}</div>
                <div className="text-xs text-[#9E8E82]">{act.detail}</div>
              </div>
              <div className="text-xs text-[#9E8E82]">{act.time}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
