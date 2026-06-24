export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  personality: string[];
  level: number;
  exp: number;
  intimacy: number;
  mood: 'happy' | 'excited' | 'sleepy' | 'hungry';
  avatar?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  petId?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  from: 'pet' | 'me' | 'system';
  text: string;
  time: string;
  petId?: string;
}

export interface CheckInRecord {
  id: string;
  day: string;
  emoji: string;
  note: string;
  date: string;
  petId: string;
}

export interface Skill {
  id: string;
  icon: string;
  name: string;
  active: boolean;
  desc: string;
}

export interface CommunityFriend {
  id: string;
  name: string;
  type: string;
  breed: string;
  distance: string;
  mood: string;
  owner: string;
}

export interface CommunityFeed {
  id: string;
  petName: string;
  petType: string;
  content: string;
  likes: number;
  time: string;
}

export interface Achievement {
  id: string;
  icon: string;
  name: string;
  desc: string;
  unlocked: boolean;
}

export interface AppState {
  pet: Pet;
  user: User;
  checkIn: {
    streak: number;
    totalDays: number;
    lastCheckIn: string | null;
    history: CheckInRecord[];
    weekStatus: boolean[];
  };
  messages: Message[];
  skills: Skill[];
  community: {
    nearbyCount: number;
    friends: CommunityFriend[];
    feeds: CommunityFeed[];
  };
  achievements: Achievement[];
  settings: {
    notifications: boolean;
    location: boolean;
    darkMode: boolean;
    sound: boolean;
  };
}
