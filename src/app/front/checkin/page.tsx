'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Camera, Check } from 'lucide-react';

const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

const growthStages = [
  { day: 1, label: '幼年期', icon: '🥚', desc: '刚破壳的小可爱' },
  { day: 7, label: '成长期', icon: '🐣', desc: '开始探索世界' },
  { day: 30, label: '少年期', icon: '🐱', desc: '活力满满' },
  { day: 90, label: '成年期', icon: '🦁', desc: '成熟稳重' },
  { day: 365, label: '传奇期', icon: '👑', desc: '社区领袖' },
];

export default function CheckInPage() {
  const { state, checkIn } = useAppStore();
  const { pet, checkIn: checkInData } = state;
  const [showCamera, setShowCamera] = useState(false);
  const [note, setNote] = useState('');
  const [flash, setFlash] = useState(false);

  const todayChecked = !!checkInData.lastCheckIn &&
    new Date(checkInData.lastCheckIn).toDateString() === new Date().toDateString();

  const handleCapture = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
  };

  const handleFinish = () => {
    const today = new Date();
    const record = {
      id: Date.now().toString(),
      day: `第${checkInData.totalDays + 1}天`,
      emoji: pet.type,
      note: note || '今天很开心~',
      date: `${today.getMonth() + 1}-${today.getDate()}`,
      petId: pet.id,
    };
    checkIn(record);
    setShowCamera(false);
    setNote('');
  };

  const currentStage = growthStages.slice().reverse().find((s) => checkInData.totalDays >= s.day) || growthStages[0];
  const progress = Math.min((checkInData.totalDays / 30) * 100, 100);

  return (
    <div className="p-4 animate-fadeInUp">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#4A3B32]">📅 打卡日历</h2>
        <div className="flex items-center gap-1 bg-[#FF8FA3] text-white px-3 py-1.5 border-[3px] border-[#4A3B32] shadow-[3px_3px_0px_#4A3B32]">
          <span className="text-lg">🔥</span>
          <span className="text-lg font-bold">{checkInData.streak}</span>
          <span className="text-sm">天</span>
        </div>
      </div>

      {/* Week Calendar */}
      <div className="flex justify-between gap-1.5 mb-5">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 border-2 transition-all ${
              checkInData.weekStatus[i]
                ? 'bg-[#7FD8BE]/20 border-[#7FD8BE]'
                : 'bg-[#FFF0E4] border-[#E8D5C4]'
            }`}
          >
            <span className="text-[0.65rem] text-[#9E8E82]">周{day}</span>
            <span className="text-base">{checkInData.weekStatus[i] ? '✅' : '○'}</span>
          </div>
        ))}
      </div>

      {/* Check-in Button */}
      <button
        className={`w-full py-5 border-[3px] border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex flex-col items-center gap-2 transition-all mb-5 ${
          todayChecked
            ? 'bg-[#7FD8BE] cursor-default'
            : 'bg-gradient-to-r from-[#FF8FA3] to-[#FFB6C1] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#4A3B32]'
        }`}
        onClick={() => !todayChecked && setShowCamera(true)}
        disabled={todayChecked}
      >
        <span className="text-3xl">{todayChecked ? '✅' : '📸'}</span>
        <span className="text-white font-bold text-lg">
          {todayChecked ? `今日已打卡 · ${checkInData.streak}天` : '立即打卡'}
        </span>
      </button>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-[300] bg-[#4A3B32]/85 flex items-center justify-center p-6 animate-fadeInUp">
          <div className="bg-[#FFF8F0] border-[3px] border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] p-5 w-full max-w-[320px] relative">
            <div className={`aspect-square bg-[#FFF0E4] border-[3px] border-[#4A3B32] flex flex-col items-center justify-center relative ${flash ? 'brightness-200' : ''} transition-all`}>
              <span className="text-6xl animate-float">{pet.type}</span>
              <div className="absolute inset-5 border-2 border-dashed border-[#FF8FA3]" />
              <button
                className="absolute bottom-4 w-14 h-14 bg-[#FF8FA3] border-[3px] border-[#4A3B32] rounded-none flex items-center justify-center active:scale-90 transition-transform"
                onClick={handleCapture}
              >
                <Camera size={24} className="text-white" />
              </button>
            </div>
            <input
              className="w-full mt-4 px-3 py-2 border-2 border-[#4A3B32] bg-[#FFF8F0] text-sm outline-none"
              placeholder="记录今天的心情..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              className="w-full mt-3 py-3 bg-[#7FD8BE] text-white border-[3px] border-[#4A3B32] shadow-[3px_3px_0px_#4A3B32] font-bold active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#4A3B32] transition-all"
              onClick={handleFinish}
            >
              <Check size={18} className="inline mr-1" />
              完成打卡
            </button>
            <button
              className="absolute -top-3 -right-3 w-8 h-8 bg-[#FFF8F0] border-2 border-[#4A3B32] flex items-center justify-center text-sm"
              onClick={() => setShowCamera(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Growth */}
      <div className="mb-5">
        <h3 className="font-bold text-[#4A3B32] mb-3">🌱 成长进度</h3>
        <div className="bg-[#FFF0E4] border-[3px] border-[#4A3B32] shadow-[4px_4px_0px_rgba(74,59,50,0.15)] p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{currentStage.icon}</span>
            <div>
              <span className="font-bold text-lg">{currentStage.label}</span>
              <span className="text-sm text-[#9E8E82] block">{currentStage.desc}</span>
            </div>
          </div>
          <div className="h-3 bg-[#E8D5C4] border-2 border-[#4A3B32] mb-2">
            <div className="h-full bg-gradient-to-r from-[#FF8FA3] to-[#7FD8BE] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-sm text-[#9E8E82]">
            {pet.name} 已经陪伴你 {checkInData.totalDays} 天了
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-5">
        <h3 className="font-bold text-[#4A3B32] mb-3">🗺️ 成长路线图</h3>
        <div className="flex flex-col pl-5">
          {growthStages.map((stage, i) => (
            <div key={stage.day} className="flex items-start gap-3 relative pb-5">
              <div className={`w-6 h-6 flex items-center justify-center text-xs shrink-0 z-10 ${
                checkInData.totalDays >= stage.day
                  ? 'bg-[#FFF8F0] border-2 border-[#7FD8BE] text-[#7FD8BE]'
                  : 'bg-[#FFF8F0] border-2 border-[#E8D5C4] text-[#9E8E82]'
              }`}>
                {checkInData.totalDays >= stage.day ? '✦' : '○'}
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-xl">{stage.icon}</span>
                <span className="font-bold text-sm">{stage.label}</span>
                <span className="text-xs text-[#9E8E82]">{stage.day}天</span>
              </div>
              {i < growthStages.length - 1 && (
                <div className={`absolute left-[11px] top-6 w-0.5 h-[calc(100%-16px)] ${
                  checkInData.totalDays >= stage.day ? 'bg-[#7FD8BE]' : 'bg-[#E8D5C4]'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Photo History */}
      <div>
        <h3 className="font-bold text-[#4A3B32] mb-3">📸 打卡相册</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {checkInData.history.map((photo) => (
            <div key={photo.id} className="bg-[#FFF0E4] border-2 border-[#4A3B32] p-3 flex flex-col items-center gap-1.5 text-center">
              <div className="w-14 h-14 bg-[#FFF8F0] border-2 border-[#4A3B32] flex items-center justify-center text-3xl">
                {photo.emoji}
              </div>
              <span className="text-sm font-bold">{photo.day}</span>
              <span className="text-xs text-[#9E8E82] line-clamp-1">{photo.note}</span>
              <span className="text-[0.6rem] text-[#E8D5C4]">{photo.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-5" />
    </div>
  );
}
