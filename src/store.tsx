import {create} from 'zustand';

interface TimerState {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  playTick: boolean;
  focusMode: boolean;
  fullscreen: boolean;
  adjustFocusMinutes: (minutes: number) => void;
  adjustShortBreakMinutes: (minutes: number) => void;
  adjustLongBreakMinutes: (minutes: number) => void;
  adjustLongBreakInterval: (interval: number) => void;
  isPlayTick: (playTick: boolean) => void;
  isFocusMode: (focusMode: boolean) => void;
  isFullscreen: (fullscreen: boolean) => void;
}

export const useTimer = create<TimerState>((set) => ({
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  playTick: false,
  focusMode: false,
  fullscreen: false,
  adjustFocusMinutes: (minutes: number) => set({focusMinutes: minutes}),
  adjustShortBreakMinutes: (minutes: number) => set({shortBreakMinutes: minutes}),
  adjustLongBreakMinutes: (minutes: number) => set({longBreakMinutes: minutes}),
  adjustLongBreakInterval: (interval: number) => set({longBreakInterval: interval}),
  isPlayTick: (playTick: boolean) => set({playTick}),
  isFocusMode: (focusMode: boolean) => set({focusMode}),
  isFullscreen: (fullscreen: boolean) => set({fullscreen}),
}));