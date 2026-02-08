import { useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import renderFrame from "@/utils/renderFrame";
import prepareSheet from "@/utils/prepareSheet";
import setCalculationMode from "@/utils/setCalculationMode";

interface VideoPlayerState {
  isPlaying: boolean;
  time: number;
  currentFrameData: ImageData | null;
  setIsPlaying: (isPlaying: boolean) => void;
  setTime: (time: number) => void;
  setCurrentFrameData: (frameData: ImageData) => void;
}

const videoPlayerStore = createStore<VideoPlayerState>()(
  subscribeWithSelector((set) => ({
    isPlaying: false,
    time: 0,
    currentFrameData: null,
    setIsPlaying: (isPlaying: boolean) => {
      set(() => ({ isPlaying }));
    },
    setTime: (time: number) => {
      set(() => ({ time }));
    },
    setCurrentFrameData: (frameData: ImageData) => {
      set(() => ({ currentFrameData: frameData }));
    },
  }))
);

videoPlayerStore.subscribe(
  (state) => state.isPlaying,
  (isPlaying) => {
    if (isPlaying) {
      prepareSheet();
    } else {
      setCalculationMode(Excel.CalculationMode.automatic);
    }
  }
);

videoPlayerStore.subscribe(
  (state) => state.currentFrameData,
  (frameData) => {
    if (frameData) {
      renderFrame(frameData);
    }
  }
);

export default videoPlayerStore;

export const useVideoPlayerStore = <SliceType>(
  selector: (state: VideoPlayerState) => SliceType
) => useStore(videoPlayerStore, selector);
