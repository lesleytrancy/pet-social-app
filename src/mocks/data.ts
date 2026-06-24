import { AppState } from '@/types';

export const mockAppState: AppState = {
  pet: {
    id: 'pet-001',
    name: '咪咪',
    type: '🐱',
    breed: '橘猫',
    personality: ['粘人', '活泼'],
    level: 3,
    exp: 65,
    intimacy: 86,
    mood: 'happy',
    createdAt: '2024-01-01',
  },
  user: {
    id: 'user-001',
    name: '铲屎官小明',
    email: 'xiaoming@example.com',
    petId: 'pet-001',
    createdAt: '2024-01-01',
  },
  checkIn: {
    streak: 7,
    totalDays: 15,
    lastCheckIn: null,
    history: [
      { id: 'ci-1', day: '第7天', emoji: '😺', note: '第一次学会用猫砂', date: '06-10', petId: 'pet-001' },
      { id: 'ci-2', day: '第6天', emoji: '😸', note: '今天特别粘人', date: '06-09', petId: 'pet-001' },
      { id: 'ci-3', day: '第5天', emoji: '😻', note: '吃了好多罐头', date: '06-08', petId: 'pet-001' },
      { id: 'ci-4', day: '第4天', emoji: '🙀', note: '第一次见陌生人', date: '06-07', petId: 'pet-001' },
    ],
    weekStatus: [true, true, true, true, true, true, false],
  },
  messages: [
    { id: 'msg-1', from: 'pet', text: '主人早安！今天也要元气满满哦~ 🌞', time: '08:00', petId: 'pet-001' },
    { id: 'msg-2', from: 'me', text: '早安咪咪！', time: '08:05' },
    { id: 'msg-3', from: 'pet', text: '我饿了喵，能不能给我开个小罐头？🐟', time: '08:30', petId: 'pet-001' },
    { id: 'msg-4', from: 'pet', text: '对了，今天天气预报说会下雨，记得带伞哦 ☔', time: '09:00', petId: 'pet-001' },
  ],
  skills: [
    { id: 'music', icon: '🎵', name: '音乐播放', active: true, desc: '播放舒缓音乐' },
    { id: 'calendar', icon: '📅', name: '日程提醒', active: true, desc: '提醒重要日程' },
    { id: 'weather', icon: '☁️', name: '天气预报', active: false, desc: '每日天气播报' },
    { id: 'health', icon: '💊', name: '健康追踪', active: false, desc: '记录健康数据' },
    { id: 'game', icon: '🎮', name: '小游戏', active: false, desc: '和宠物玩游戏' },
    { id: 'story', icon: '📖', name: '睡前故事', active: false, desc: '讲温馨故事' },
  ],
  community: {
    nearbyCount: 4,
    friends: [
      { id: 'f-1', name: '小白', type: '🐶', breed: '萨摩耶', distance: '32m', mood: '开心', owner: '小李' },
      { id: 'f-2', name: '花花', type: '🐰', breed: '垂耳兔', distance: '58m', mood: '好奇', owner: '阿花' },
      { id: 'f-3', name: '皮皮', type: '🐦', breed: '鹦鹉', distance: '89m', mood: '活泼', owner: '老王' },
      { id: 'f-4', name: '球球', type: '🐹', breed: '仓鼠', distance: '45m', mood: '困倦', owner: '小美' },
    ],
    feeds: [
      { id: 'feed-1', petName: '小白', petType: '🐶', content: '今天在公园跑了3圈！', likes: 12, time: '10分钟前' },
      { id: 'feed-2', petName: '花花', petType: '🐰', content: '主人给我买了新胡萝卜~', likes: 8, time: '30分钟前' },
      { id: 'feed-3', petName: '皮皮', petType: '🐦', content: '学了一句新的话：你好呀！', likes: 23, time: '1小时前' },
    ],
  },
  achievements: [
    { id: 'streak7', icon: '🏆', name: '打卡达人', desc: '连续打卡7天', unlocked: true },
    { id: 'chat100', icon: '💬', name: '话痨宠物', desc: '发送100条消息', unlocked: true },
    { id: 'friends5', icon: '🤝', name: '社交之星', desc: '认识5位新朋友', unlocked: false },
    { id: 'legend', icon: '🌟', name: '传奇宠物', desc: '达到传奇等级', unlocked: false },
    { id: 'photo30', icon: '📸', name: '摄影师', desc: '打卡30天', unlocked: false },
    { id: 'skill3', icon: '🎒', name: '技能大师', desc: '激活3个技能', unlocked: false },
  ],
  settings: {
    notifications: true,
    location: true,
    darkMode: false,
    sound: true,
  },
};

// AI Mock Responses
export const mockAIReplies = [
  '收到！{name}最听话了~ 🐾',
  '好耶！主人最好了！💖',
  '喵~ 我知道啦！',
  '嘿嘿，我也爱你！😽',
  '那我去玩一会儿，等主人回来~',
  '主人主人，再陪我聊会儿嘛~',
  '我刚刚梦到好多小鱼干！🐟',
  '今天天气真好，想出去晒太阳~',
];

export const mockPetTypes = [
  { icon: '🐱', name: '猫咪', breed: '橘猫' },
  { icon: '🐶', name: '狗狗', breed: '金毛' },
  { icon: '🐰', name: '兔子', breed: '垂耳兔' },
  { icon: '🐦', name: '小鸟', breed: '鹦鹉' },
];

export const mockPersonalities = ['高冷', '粘人', '活泼', '贪吃', '傲娇', '温柔', '胆小', '调皮'];

// Admin mock data
export const mockAdminStats = {
  totalUsers: 128,
  totalPets: 156,
  activeToday: 42,
  newUsersToday: 8,
  totalMessages: 12580,
  totalCheckIns: 3420,
};

export const mockAdminUsers = [
  { id: 'u-1', name: '小明', email: 'xm@example.com', petName: '咪咪', petType: '🐱', createdAt: '2024-01-15', status: 'active' },
  { id: 'u-2', name: '小红', email: 'xh@example.com', petName: '旺财', petType: '🐶', createdAt: '2024-02-20', status: 'active' },
  { id: 'u-3', name: '小李', email: 'xl@example.com', petName: '小白', petType: '🐶', createdAt: '2024-03-10', status: 'inactive' },
];

export const mockAdminPets = [
  { id: 'p-1', name: '咪咪', type: '🐱', breed: '橘猫', owner: '小明', level: 3, intimacy: 86, createdAt: '2024-01-15' },
  { id: 'p-2', name: '旺财', type: '🐶', breed: '金毛', owner: '小红', level: 2, intimacy: 72, createdAt: '2024-02-20' },
  { id: 'p-3', name: '小白', type: '🐶', breed: '萨摩耶', owner: '小李', level: 4, intimacy: 91, createdAt: '2024-03-10' },
];
