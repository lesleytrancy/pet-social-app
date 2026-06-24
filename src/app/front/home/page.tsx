'use client';

import { useAppStore } from '@/lib/store';
import { Heart, Camera, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { state, updatePet, checkIn, toggleSkill } = useAppStore();
  const { pet, checkIn: checkInData, skills, messages, community } = state;

  const activeSkills = skills.filter((s) => s.active);
  const recentMessages = messages.slice(-3);

  const handleLike = () => {
    updatePet({ intimacy: Math.min(pet.intimacy + 1, 100) });
  };

  const moodEmoji = {
    happy: '😊',
    excited: '🤩',
    sleepy: '😴',
    hungry: '😋',
  }[pet.mood] || '😊';

  return (
    <div className="p-4 animate-fadeInUp">
      {/* Header */}
      <header className="bg-[#FFF0E4] pixel-border p-4 mb-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-[#FFF8F0] border-[3px] border-[#4A3B32] flex items-center justify-center text-3xl">
              {pet.type}
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#FFF8F0] border-2 border-[#4A3B32] flex items-center justify-center text-sm">
              {moodEmoji}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#4A3B32]">{pet.name}</h1>
            <p className="text-xs text-[#9E8E82]">
              {pet.personality.join(' · ')} · Lv.{pet.level}
            </p>
          </div>
          <button className="w-10 h-10 bg-[#FFF8F0] border-[3px] border-[#4A3B32] flex items-center justify-center relative">
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF8FA3] border border-[#4A3B32]" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-around items-center py-3 border-t-2 border-dashed border-[#E8D5C4]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-[#FF8FA3]">{checkInData.streak}</span>
            <span className="text-[0.65rem] text-[#9E8E82]">连续打卡</span>
          </div>
          <div className="w-px h-7 bg-[#E8D5C4]" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-[#FF8FA3]">{pet.level}</span>
            <span className="text-[0.65rem] text-[#9E8E82]">等级</span>
          </div>
          <div className="w-px h-7 bg-[#E8D5C4]" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-[#FF8FA3]">{pet.intimacy}%</span>
            <span className="text-[0.65rem] text-[#9E8E82]">亲密度</span>
          </div>
        </div>

        {/* Exp Bar */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-2.5 bg-[#E8D5C4] border-2 border-[#4A3B32]">
            <div
              className="h-full bg-gradient-to-r from-[#FF8FA3] to-[#7FD8BE] transition-all duration-500"
              style={{ width: `${pet.exp}%` }}
            />
          </div>
          <span className="text-[0.65rem] text-[#9E8E82] whitespace-nowrap">
            EXP {pet.exp}/100
          </span>
        </div>
      </header>

      {/* Like Button */}
      <button
        onClick={handleLike}
        className="w-full py-3 bg-gradient-to-r from-[#FF8FA3] to-[#FFB6C1] border-[3px] border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#4A3B32] transition-all flex items-center justify-center gap-2 text-white font-bold mb-4"
      >
        <Heart size={18} fill="white" />
        <span>我喜欢</span>
        <span className="bg-white/30 px-2 py-0.5 border-2 border-white text-sm">
          {pet.intimacy}
        </span>
      </button>

      {/* Check-in Card */}
      <Link href="/front/checkin">
        <div className="bg-gradient-to-br from-[#7FD8BE] to-[#A8E6CF] border-[3px] border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] p-4 mb-4 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#4A3B32] transition-all">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Camera size={20} />
                今日打卡
              </h3>
              <p className="text-white/90 text-sm mt-1">
                记录{pet.name}的第 {checkInData.totalDays} 天
              </p>
              <div className="flex gap-0.5 mt-2">
                {Array.from({ length: Math.min(checkInData.streak, 7) }).map((_, i) => (
                  <Star key={i} size={14} fill="white" stroke="white" className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
            <div className="w-14 h-14 bg-white/30 border-[3px] border-white flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>
          </div>
        </div>
      </Link>

      {/* Skills */}
      <section className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-[#4A3B32]">🎒 宠物技能</h3>
          <Link href="/front/profile" className="text-xs text-[#9E8E82] flex items-center gap-0.5">
            管理 <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {activeSkills.slice(0, 4).map((skill) => (
            <div key={skill.id} className="flex flex-col items-center gap-1.5">
              <div className="w-13 h-13 bg-[#7FD8BE]/20 border-[3px] border-[#7FD8BE] flex items-center justify-center text-2xl">
                {skill.icon}
              </div>
              <span className="text-[0.65rem] text-[#9E8E82]">{skill.name}</span>
            </div>
          ))}
          {activeSkills.length < 4 && (
            <Link href="/front/profile">
              <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                <div className="w-13 h-13 bg-[#E8D5C4]/20 border-[3px] border-[#E8D5C4] flex items-center justify-center text-2xl">
                  ➕
                </div>
                <span className="text-[0.65rem] text-[#9E8E82]">添加</span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Messages */}
      <section className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-[#4A3B32]">💌 最新消息</h3>
          <Link href="/front/chat" className="text-xs text-[#9E8E82] flex items-center gap-0.5">
            全部 <ChevronRight size={14} />
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          {recentMessages.map((msg) => (
            <div key={msg.id} className="flex gap-2.5 p-3 bg-[#FFF0E4] border-2 border-[#E8D5C4]">
              <div className="w-9 h-9 bg-[#FFF8F0] border-2 border-[#4A3B32] flex items-center justify-center text-lg shrink-0">
                {msg.from === 'pet' ? pet.type : '👤'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed line-clamp-2">{msg.text}</p>
                <span className="text-[0.6rem] text-[#9E8E82]">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-[#4A3B32]">🌍 社区动态</h3>
          <Link href="/front/community" className="text-xs text-[#9E8E82] flex items-center gap-0.5">
            更多 <ChevronRight size={14} />
          </Link>
        </div>
        <Link href="/front/map">
          <div className="bg-[#FFF0E4] border-[3px] border-[#4A3B32] shadow-[4px_4px_0px_rgba(74,59,50,0.15)] p-4 text-center cursor-pointer">
            <div className="flex justify-center gap-2 mb-2">
              {community.friends.slice(0, 4).map((f, i) => (
                <span
                  key={f.id}
                  className="w-11 h-11 bg-[#FFF8F0] border-2 border-[#4A3B32] flex items-center justify-center text-xl"
                  style={{ animation: `float 3s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
                >
                  {f.type}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#9E8E82] mb-3">
              附近有 {community.nearbyCount} 位小伙伴在散步
            </p>
            <span className="inline-block bg-[#7FD8BE] text-white border-[3px] border-[#4A3B32] shadow-[3px_3px_0px_#4A3B32] px-5 py-2 text-sm font-bold active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#4A3B32] transition-all">
              去看看 👀
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}
