import { useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import renderFrame from "@/utils/renderFrame";
import prepareSheet from "@/utils/prepareSheet";
import setCalculationMode from "@/utils/setCalculationMode";
import settingsStore from "./settingsStore";

interface VideoPlayerState {
  isPlaying: boolean;
  time: number;
  currentFrameData: ImageData | null;
  errors: Error[];
  setIsPlaying: (isPlaying: boolean) => void;
  setTime: (time: number) => void;
  setCurrentFrameData: (frameData: ImageData) => void;
  addError: (error: Error) => void;
  clearErrors: () => void;
  getLastError: () => Error | null;
}

const videoPlayerStore = createStore<VideoPlayerState>()(
  subscribeWithSelector((set, get) => ({
    isPlaying: false,
    time: 0,
    currentFrameData: null,
    errors: [],
    setIsPlaying: (isPlaying: boolean) => {
      set(() => ({ isPlaying }));
    },
    setTime: (time: number) => {
      set(() => ({ time }));
    },
    setCurrentFrameData: (frameData: ImageData) => {
      set(() => ({ currentFrameData: frameData }));
    },
    addError: (error: Error) => {
      set((state) => ({ errors: [...state.errors, error] }));
    },
    clearErrors: () => {
      set(() => ({ errors: [] }));
    },
    getLastError: () => {
      return get().errors[get().errors.length - 1] || null;
    },
  }))
);

videoPlayerStore.subscribe(
  (state) => state.isPlaying,
  async (isPlaying) => {
    if (isPlaying) {
      const { resolution, cellSize } = settingsStore.getState();
      const { addError, clearErrors } = videoPlayerStore.getState();

      try {
        await prepareSheet(resolution, cellSize);
        clearErrors();
      } catch (error) {
        addError(error as Error);
      }
    } else {
      setCalculationMode(Excel.CalculationMode.automatic);
    }
  }
);

videoPlayerStore.subscribe(
  (state) => state.currentFrameData,
  async (frameData) => {
    if (frameData) {
      const { resolution } = settingsStore.getState();
      const { addError, clearErrors } = videoPlayerStore.getState();

      try {
        await renderFrame(frameData, resolution);
        clearErrors();
      } catch (error) {
        addError(error as Error);
      }
    }
  }
);

export default videoPlayerStore;

export const useVideoPlayerStore = <SliceType>(
  selector: (state: VideoPlayerState) => SliceType
) => useStore(videoPlayerStore, selector);
