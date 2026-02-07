import { useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import settingsStore from "./settingsStore";
import { getSheetRangeAddress } from "@/utils/getSheetRangeAddress";

interface VideoPlayerState {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const videoPlayerStore = createStore<VideoPlayerState>()(
  subscribeWithSelector((set) => ({
    isPlaying: false,
    setIsPlaying: (isPlaying: boolean) => {
      set(() => ({ isPlaying }));
    },
  }))
);

videoPlayerStore.subscribe(
  (state) => state.isPlaying,
  (isPlaying) => {
    if (isPlaying) {
      Excel.run(async (context) => {
        const existingSheet =
          context.workbook.worksheets.getItemOrNullObject("Excel Video Player");

        await context.sync();

        const sheet = existingSheet.isNullObject
          ? context.workbook.worksheets.add("Excel Video Player")
          : existingSheet;
        const resolution = settingsStore.getState().resolution;
        const cellSize = settingsStore.getState().cellSize;
        const rangeAddress = getSheetRangeAddress(
          resolution.width,
          resolution.height
        );
        const range = sheet.getRange(rangeAddress);

        sheet.activate();

        range.format.columnWidth = cellSize;
        range.format.rowHeight = cellSize;
        range.format.fill.color = "black";

        await context.sync();
      }).catch((error) => {
        console.error("Error updating Excel cell:", error);
      });
    }
  }
);

export default videoPlayerStore;

export const useVideoPlayerStore = <SliceType>(
  selector: (state: VideoPlayerState) => SliceType
) => useStore(videoPlayerStore, selector);
