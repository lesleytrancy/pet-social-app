'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { mockAIReplies } from '@/mocks/data';
import { Send, Image } from 'lucide-react';

const quickReplies = ['摸摸头', '好的', '马上来', '爱你', '乖~', '吃饭啦'];

export default function ChatPage() {
  const { state, addMessage, addPetReply } = useAppStore();
  const { pet, messages } = state;
  const [inputText, setInputText] = useState('');
  const [petTyping, setPetTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, petTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const newMsg = { id: Date.now().toString(), from: 'me' as const, text, time: now };
    addMessage(newMsg);
    setInputText('');

    setPetTyping(true);
    setTimeout(() => {
      setPetTyping(false);
      const template = mockAIReplies[Math.floor(Math.random() * mockAIReplies.length)];
      const replyText = template.replace('{name}', pet.name);
      const reply = {
        id: (Date.now() + 1).toString(),
        from: 'pet' as const,
        text: replyText,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        petId: pet.id,
      };
      addPetReply(reply);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#FFF0E4] border-b-[3px] border-[#4A3B32] shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 bg-[#FFF8F0] border-[3px] border-[#4A3B32] flex items-center justify-center text-xl">
              {pet.type}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#7FD8BE] border-2 border-[#4A3B32]" />
          </div>
          <div>
            <h3 className="font-bold text-[#4A3B32]">{pet.name}</h3>
            <span className="text-[0.65rem] text-[#7FD8BE]">在线中 · {pet.personality[0]}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#FF8FA3]">
          <span className="text-sm">💖</span>
          <span className="text-sm font-bold">{pet.intimacy}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" ref={scrollRef}>
        <div className="text-center text-[0.65rem] text-[#9E8E82] py-2">今天</div>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 max-w-[85%] ${msg.from === 'me' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            {msg.from === 'pet' && (
              <div className="w-8 h-8 bg-[#FFF0E4] border-2 border-[#4A3B32] flex items-center justify-center text-sm shrink-0">
                {pet.type}
              </div>
            )}
            <div className={`flex flex-col gap-1 ${msg.from === 'me' ? 'items-end' : 'items-start'}`}>
              <div className={`px-3.5 py-2.5 text-sm leading-relaxed border-2 border-[#4A3B32] ${
                msg.from === 'me' ? 'bg-[#FF8FA3] text-white' : 'bg-[#FFF0E4]'
              }`}>
                {msg.text}
              </div>
              <span className="text-[0.6rem] text-[#9E8E82]">{msg.time}</span>
            </div>
          </div>
        ))}
        {petTyping && (
          <div className="flex gap-2 self-start">
            <div className="w-8 h-8 bg-[#FFF0E4] border-2 border-[#4A3B32] flex items-center justify-center text-sm shrink-0">
              {pet.type}
            </div>
            <div className="px-3.5 py-2.5 bg-[#FFF0E4] border-2 border-[#4A3B32]">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#9E8E82] animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-2 h-2 bg-[#9E8E82] animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-[#9E8E82] animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto shrink-0">
        {quickReplies.map((reply) => (
          <button
            key={reply}
            className="shrink-0 px-4 py-2 bg-[#FFF0E4] border-2 border-[#4A3B32] text-sm active:bg-[#FF8FA3] active:text-white transition-colors"
            onClick={() => sendMessage(reply)}
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#FFF0E4] border-t-[3px] border-[#4A3B32] shrink-0">
        <button className="w-10 h-10 bg-[#FFF8F0] border-2 border-[#4A3B32] flex items-center justify-center shrink-0">
          <Image size={18} />
        </button>
        <input
          type="text"
          className="flex-1 px-3 py-2 border-2 border-[#4A3B32] bg-[#FFF8F0] text-sm outline-none focus:shadow-[2px_2px_0px_#FF8FA3]"
          placeholder={`跟${pet.name}说点什么...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
        />
        <button
          className="w-10 h-10 bg-[#7FD8BE] border-2 border-[#4A3B32] flex items-center justify-center shrink-0 disabled:opacity-50 transition-all active:translate-x-0.5 active:translate-y-0.5"
          onClick={() => sendMessage(inputText)}
          disabled={!inputText.trim()}
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}
