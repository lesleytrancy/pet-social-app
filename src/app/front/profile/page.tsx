'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { motion } from 'framer-motion';
import {
  Settings, Bell, MapPin, Moon, Volume2, ChevronRight,
  Trophy, Star, Zap, Heart, LogOut, User, Camera
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { state, toggleSetting, resetState } = useAppStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const stats = [
    { icon: Trophy, label: '等级', value: `Lv.${state.pet.level}`, color: '#FF8FA3' },
    { icon: Heart, label: '亲密度', value: `${state.pet.intimacy}%`, color: '#FF8FA3' },
    { icon: Zap, label: '连续打卡', value: `${state.checkIn.streak}天`, color: '#7FD8BE' },
    { icon: Star, label: '总天数', value: `${state.checkIn.totalDays}天`, color: '#C9A0DC' },
  ];

  const settings = [
    { key: 'notifications' as const, icon: Bell, label: '消息通知', desc: '接收宠物消息提醒' },
    { key: 'location' as const, icon: MapPin, label: '位置服务', desc: '发现附近的小伙伴' },
    { key: 'sound' as const, icon: Volume2, label: '音效', desc: '开启交互音效' },
    { key: 'darkMode' as const, icon: Moon, label: '深色模式', desc: '切换深色主题' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-[#4A3B32]">我的</h1>
          <Link href="/admin/dashboard" className="p-2 bg-white rounded-xl pixel-border-sm hover:bg-[#FFF0E4] transition-colors">
            <Settings size={18} className="text-[#9E8E82]" />
          </Link>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 pixel-border">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-[#FFF0E4] rounded-2xl flex items-center justify-center text-3xl pixel-border-sm">
                {state.pet.type}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#FF8FA3] rounded-full flex items-center justify-center">
                <Camera size={12} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-[#4A3B32]">{state.user.name}</h2>
              <p className="text-sm text-[#9E8E82]">宠物：{state.pet.name} · {state.pet.breed}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-[#FF8FA3]/10 text-[#FF8FA3] px-2 py-0.5 rounded-full">
                  {state.pet.personality.join(' · ')}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-[#E8D5C4]">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <s.icon size={18} className="mx-auto mb-1" style={{ color: s.color }} />
                <div className="text-sm font-bold text-[#4A3B32]">{s.value}</div>
                <div className="text-[10px] text-[#9E8E82]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-4">
        <h2 className="text-sm font-bold text-[#4A3B32] mb-2">成就徽章</h2>
        <div className="bg-white rounded-2xl p-3 pixel-border">
          <div className="grid grid-cols-3 gap-2">
            {state.achievements.map((ach, i) => (
              <motion.div
                key={ach.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`text-center p-2 rounded-xl ${ach.unlocked ? 'bg-[#FFF0E4]' : 'bg-gray-50 opacity-50'}`}
              >
                <div className="text-2xl mb-1">{ach.icon}</div>
                <div className="text-xs font-bold text-[#4A3B32]">{ach.name}</div>
                <div className="text-[10px] text-[#9E8E82]">{ach.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 mb-4">
        <h2 className="text-sm font-bold text-[#4A3B32] mb-2">设置</h2>
        <div className="bg-white rounded-2xl pixel-border overflow-hidden">
          {settings.map((s, i) => (
            <div
              key={s.key}
              className={`flex items-center gap-3 p-3 ${i < settings.length - 1 ? 'border-b border-[#E8D5C4]' : ''}`}
            >
              <div className="w-9 h-9 bg-[#FFF0E4] rounded-lg flex items-center justify-center">
                <s.icon size={16} className="text-[#4A3B32]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#4A3B32]">{s.label}</div>
                <div className="text-xs text-[#9E8E82]">{s.desc}</div>
              </div>
              <button
                onClick={() => toggleSetting(s.key)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  state.settings[s.key] ? 'bg-[#7FD8BE]' : 'bg-[#E8D5C4]'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    state.settings[s.key] ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Entry */}
      <div className="px-4 mb-4">
        <Link href="/admin/dashboard">
          <div className="bg-white rounded-2xl p-3 flex items-center gap-3 pixel-border hover:bg-[#FFF0E4] transition-colors">
            <div className="w-9 h-9 bg-[#C9A0DC]/20 rounded-lg flex items-center justify-center">
              <User size={16} className="text-[#C9A0DC]" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-[#4A3B32]">后台管理</div>
              <div className="text-xs text-[#9E8E82]">查看数据统计和用户管理</div>
            </div>
            <ChevronRight size={16} className="text-[#9E8E82]" />
          </div>
        </Link>
      </div>

      {/* Reset */}
      <div className="px-4 pb-8">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full py-3 rounded-2xl text-sm font-bold text-[#9E8E82] bg-white pixel-border hover:bg-red-50 hover:text-red-400 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          重置所有数据
        </button>
      </div>

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-xs pixel-border"
          >
            <h3 className="text-lg font-bold text-[#4A3B32] mb-2">确认重置？</h3>
            <p className="text-sm text-[#9E8E82] mb-4">这将清除所有本地数据，包括宠物信息、聊天记录和打卡记录。此操作不可撤销。</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#FFF0E4] text-[#4A3B32]"
              >
                取消
              </button>
              <button
                onClick={() => {
                  resetState();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-400 text-white"
              >
                确认重置
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
