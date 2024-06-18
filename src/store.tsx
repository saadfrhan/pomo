import {create} from 'zustand';

interface TimerState {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  playTick: boolean;
  focusMode: boolean;
  fullscreen: boolean;
  showProgressbar: boolean;
  adjustFocusMinutes: (minutes: number) => void;
  adjustShortBreakMinutes: (minutes: number) => void;
  adjustLongBreakMinutes: (minutes: number) => void;
  adjustLongBreakInterval: (interval: number) => void;
  autoresume: boolean;
  isPlayTick: (playTick: boolean) => void;
  isFocusMode: (focusMode: boolean) => void;
  isFullscreen: (fullscreen: boolean) => void;
  isShowProgressbar: (showProgressbar: boolean) => void;
  isAutoresume: (autoresume: boolean) => void
}

export const useTimer = create<TimerState>((set) => ({
  showProgressbar: true,
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  playTick: false,
  focusMode: false,
  fullscreen: false,
  autoresume: true,
  adjustFocusMinutes: (minutes) => set({focusMinutes: minutes}),
  adjustShortBreakMinutes: (minutes) => set({shortBreakMinutes: minutes}),
  adjustLongBreakMinutes: (minutes) => set({longBreakMinutes: minutes}),
  adjustLongBreakInterval: (interval) => set({longBreakInterval: interval}),
  isPlayTick: (playTick) => set({playTick}),
  isFocusMode: (focusMode) => set({focusMode}),
  isFullscreen: (fullscreen) => set({fullscreen}),
  isShowProgressbar: (showProgressbar) => set({showProgressbar}),
  isAutoresume: (autoresume) => set({autoresume})
}));