'use client';

import { mockAdminUsers } from '@/mocks/data';
import { motion } from 'framer-motion';
import { Search, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const filtered = mockAdminUsers.filter(u =>
    u.name.includes(search) || u.email.includes(search) || u.petName.includes(search)
  );

  return (
    <div>
      <h1 className="text-xl font-bold text-[#4A3B32] mb-4">用户管理</h1>

      {/* Search */}
      <div className="bg-white rounded-xl p-3 pixel-border-sm mb-4 flex items-center gap-2">
        <Search size={16} className="text-[#9E8E82]" />
        <input
          type="text"
          placeholder="搜索用户、邮箱或宠物..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 text-sm outline-none bg-transparent text-[#4A3B32] placeholder:text-[#9E8E82]"
        />
      </div>

      {/* User List */}
      <div className="bg-white rounded-xl pixel-border-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-2 p-3 bg-[#FFF0E4] text-xs font-bold text-[#4A3B32]">
          <div className="col-span-3">用户</div>
          <div className="col-span-3">宠物</div>
          <div className="col-span-3">注册时间</div>
          <div className="col-span-2">状态</div>
          <div className="col-span-1"></div>
        </div>
        {filtered.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-12 gap-2 p-3 border-t border-[#E8D5C4] items-center text-sm"
          >
            <div className="col-span-3">
              <div className="font-bold text-[#4A3B32]">{user.name}</div>
              <div className="text-xs text-[#9E8E82]">{user.email}</div>
            </div>
            <div className="col-span-3 flex items-center gap-1">
              <span>{user.petType}</span>
              <span className="text-[#4A3B32]">{user.petName}</span>
            </div>
            <div className="col-span-3 text-[#9E8E82]">{user.createdAt}</div>
            <div className="col-span-2">
              {user.status === 'active' ? (
                <span className="inline-flex items-center gap-1 text-xs text-[#7FD8BE]">
                  <UserCheck size={12} /> 活跃
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-[#9E8E82]">
                  <UserX size={12} /> 停用
                </span>
              )}
            </div>
            <div className="col-span-1 text-right">
              <button className="text-xs text-[#FF8FA3] hover:underline">详情</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
