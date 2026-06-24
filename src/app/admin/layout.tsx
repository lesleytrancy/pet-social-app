import Link from 'next/link';
import { Home, Users, PawPrint, BarChart3, ArrowLeft } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', icon: Home, label: '概览' },
  { href: '/admin/users', icon: Users, label: '用户' },
  { href: '/admin/pets', icon: PawPrint, label: '宠物' },
  { href: '/admin/stats', icon: BarChart3, label: '统计' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Admin Header */}
      <div className="bg-white border-b border-[#E8D5C4] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF8FA3] rounded-lg flex items-center justify-center text-white font-bold text-sm">
            管
          </div>
          <span className="font-bold text-[#4A3B32]">后台管理</span>
        </div>
        <Link
          href="/front/home"
          className="flex items-center gap-1 text-sm text-[#9E8E82] hover:text-[#4A3B32] transition-colors"
        >
          <ArrowLeft size={16} />
          返回前台
        </Link>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-16 bg-white border-r border-[#E8D5C4] min-h-screen sticky top-14 flex flex-col items-center py-4 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[#9E8E82] hover:bg-[#FFF0E4] hover:text-[#4A3B32] transition-colors"
            >
              <item.icon size={18} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
