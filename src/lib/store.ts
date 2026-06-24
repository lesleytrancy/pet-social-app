'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppState } from '@/types';
import { mockAppState } from '@/mocks/data';

const STORAGE_KEY = 'pet_social_state_v2';

function loadState(): AppState {
  if (typeof window === 'undefined') return mockAppState;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return mockAppState;
}

function saveState(state: AppState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(mockAppState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) saveState(state);
  }, [state, isLoaded]);

  const updatePet = useCallback((updates: Partial<AppState['pet']>) => {
    setState(prev => ({ ...prev, pet: { ...prev.pet, ...updates } }));
  }, []);

  const checkIn = useCallback((record: AppState['checkIn']['history'][0]) => {
    setState(prev => ({
      ...prev,
      checkIn: {
        ...prev.checkIn,
        streak: prev.checkIn.streak + 1,
        totalDays: prev.checkIn.totalDays + 1,
        lastCheckIn: new Date().toISOString(),
        history: [record, ...prev.checkIn.history].slice(0, 30),
      },
      pet: {
        ...prev.pet,
        exp: Math.min(prev.pet.exp + 10, 100),
        intimacy: Math.min(prev.pet.intimacy + 5, 100),
      },
    }));
  }, []);

  const addMessage = useCallback((msg: AppState['messages'][0]) => {
    setState(prev => ({ ...prev, messages: [...prev.messages, msg] }));
  }, []);

  const addPetReply = useCallback((msg: AppState['messages'][0]) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, msg],
      pet: {
        ...prev.pet,
        intimacy: Math.min(prev.pet.intimacy + 2, 100),
      },
    }));
  }, []);

  const toggleSkill = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, active: !s.active } : s),
    }));
  }, []);

  const toggleSetting = useCallback((key: keyof AppState['settings']) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: !prev.settings[key] },
    }));
  }, []);

  const greetFriend = useCallback(() => {
    setState(prev => ({
      ...prev,
      pet: { ...prev.pet, intimacy: Math.min(prev.pet.intimacy + 3, 100) },
    }));
  }, []);

  const resetState = useCallback(() => {
    setState(mockAppState);
  }, []);

  return {
    state,
    isLoaded,
    updatePet,
    checkIn,
    addMessage,
    addPetReply,
    toggleSkill,
    toggleSetting,
    greetFriend,
    resetState,
  };
}
