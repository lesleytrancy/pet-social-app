'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, MessageCircle, Camera, Globe, User } from 'lucide-react';

const navItems = [
  { key: '/front/home', icon: Home, label: '首页' },
  { key: '/front/chat', icon: MessageCircle, label: '聊天' },
  { key: '/front/checkin', icon: Camera, label: '打卡' },
  { key: '/front/community', icon: Globe, label: '社区' },
  { key: '/front/profile', icon: User, label: '我的' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-16 bg-[#FFF8F0] border-t-[3px] border-[#4A3B32] flex justify-around items-center z-50 shadow-[0_-4px_12px_rgba(74,59,50,0.08)]">
      {navItems.map((item) => {
        const isActive = pathname === item.key;
        const Icon = item.icon;
        return (
          <button
            key={item.key}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-3 transition-colors ${
              isActive ? 'text-[#FF8FA3]' : 'text-[#9E8E82]'
            }`}
            onClick={() => router.push(item.key)}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[0.65rem] font-medium tracking-wide">{item.label}</span>
            {isActive && <span className="w-1 h-1 bg-[#FF8FA3] mt-0.5" />}
          </button>
        );
      })}
    </nav>
  );
}
