import { create } from "zustand";

interface TimerState {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  focusMode: boolean;
  fullscreen: boolean;
  showProgressbar: boolean;
  autoresume: boolean;
  extraBoldTime: boolean;
  adjustFocusMinutes: (minutes: number) => void;
  adjustShortBreakMinutes: (minutes: number) => void;
  adjustLongBreakMinutes: (minutes: number) => void;
  adjustLongBreakInterval: (interval: number) => void;
  isFocusMode: (focusMode: boolean) => void;
  isFullscreen: (fullscreen: boolean) => void;
  isShowProgressbar: (showProgressbar: boolean) => void;
  isAutoresume: (autoresume: boolean) => void;
  isExtraBoldTime: (extraBoldTime: boolean) => void;
  status: string;
  setStatus: (status: string) => void;
}

export const useTimer = create<TimerState>((set) => ({
  showProgressbar: true,
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  focusMode: false,
  fullscreen: false,
  autoresume: true,
  extraBoldTime: true,
  adjustFocusMinutes: (minutes) => set({ focusMinutes: minutes }),
  adjustShortBreakMinutes: (minutes) => set({ shortBreakMinutes: minutes }),
  adjustLongBreakMinutes: (minutes) => set({ longBreakMinutes: minutes }),
  adjustLongBreakInterval: (interval) => set({ longBreakInterval: interval }),
  isFocusMode: (focusMode) => set({ focusMode }),
  isFullscreen: (fullscreen) => set({ fullscreen }),
  isShowProgressbar: (showProgressbar) => set({ showProgressbar }),
  isAutoresume: (autoresume) => set({ autoresume }),
  isExtraBoldTime: (extraBoldTime) => set({ extraBoldTime }),
  status: "focus",
  setStatus: (status) => set({ status }),
}));
