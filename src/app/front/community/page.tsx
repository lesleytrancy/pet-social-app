'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

export default function CommunityPage() {
  const { state } = useAppStore();
  const { community } = state;
  const [likedFeeds, setLikedFeeds] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedFeeds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-4 animate-fadeInUp">
      <header className="mb-4">
        <h2 className="text-xl font-bold text-[#4A3B32]">🌍 社区动态</h2>
      </header>

      {/* Feeds */}
      <div className="flex flex-col gap-3 mb-6">
        {community.feeds.map((feed) => (
          <div
            key={feed.id}
            className="bg-[#FFF0E4] border-[3px] border-[#4A3B32] shadow-[4px_4px_0px_rgba(74,59,50,0.15)] p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FFF8F0] border-2 border-[#4A3B32] flex items-center justify-center text-xl">
                {feed.petType}
              </div>
              <div>
                <span className="font-bold text-sm">{feed.petName}</span>
                <span className="text-[0.65rem] text-[#9E8E82] block">{feed.time}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-3">{feed.content}</p>
            <div className="flex gap-4 pt-3 border-t border-dashed border-[#E8D5C4]">
              <button
                className={`flex items-center gap-1.5 text-sm ${
                  likedFeeds.has(feed.id) ? 'text-[#FF8FA3]' : 'text-[#9E8E82]'
                }`}
                onClick={() => toggleLike(feed.id)}
              >
                <Heart size={16} fill={likedFeeds.has(feed.id) ? '#FF8FA3' : 'none'} />
                <span>{feed.likes + (likedFeeds.has(feed.id) ? 1 : 0)}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-[#9E8E82]">
                <MessageCircle size={16} />
                <span>评论</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-[#9E8E82]">
                <Share2 size={16} />
                <span>分享</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nearby Friends */}
      <div>
        <h3 className="font-bold text-[#4A3B32] mb-3">📍 附近的小伙伴</h3>
        <div className="flex gap-2.5 overflow-x-auto pb-2">
          {community.friends.map((friend) => (
            <div
              key={friend.id}
              className="shrink-0 flex flex-col items-center gap-1.5 p-3 bg-[#FFF0E4] border-2 border-[#4A3B32] min-w-[80px]"
            >
              <span className="text-3xl">{friend.type}</span>
              <span className="text-sm font-bold">{friend.name}</span>
              <span className="text-[0.65rem] text-[#7FD8BE]">{friend.distance}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-5" />
    </div>
  );
}
