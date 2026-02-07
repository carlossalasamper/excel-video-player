import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

interface VideoPlayerState {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const videoPlayerStore = createStore<VideoPlayerState>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => {
    set(() => ({ isPlaying }));
  },
}));

export default videoPlayerStore;

export const useVideoPlayerStore = <SliceType>(
  selector: (state: VideoPlayerState) => SliceType
) => useStore(videoPlayerStore, selector);
