import { useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import settingsStore from "./settingsStore";
import { getSheetRangeAddress } from "@/utils/getSheetRangeAddress";
import { rgbToHex } from "@/utils/rgbToHex";

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
      Excel.run(async (context) => {
        const existingSheet =
          context.workbook.worksheets.getItemOrNullObject("Excel Video Player");

        await context.sync();

        context.application.calculationMode = Excel.CalculationMode.manual;

        const sheet = existingSheet.isNullObject
          ? context.workbook.worksheets.add("Excel Video Player")
          : existingSheet;
        const resolution = settingsStore.getState().resolution;
        const cellSize = settingsStore.getState().cellSize;
        const time = videoPlayerStore.getState().time;
        const rangeAddress = getSheetRangeAddress(
          resolution.width,
          resolution.height
        );
        const range = sheet.getRange(rangeAddress);

        sheet.activate();

        if (time === 0) {
          sheet.getUsedRange().clear();
        }

        range.format.columnWidth = cellSize;
        range.format.rowHeight = cellSize;

        await context.sync();
      }).catch((error) => {
        console.error("Error updating Excel cell:", error);
      });
    } else {
      Excel.run(async (context) => {
        context.application.calculationMode = Excel.CalculationMode.automatic;
      }).catch((error) => {
        console.error("Error stopping video playback:", error);
      });
    }
  }
);

videoPlayerStore.subscribe(
  (state) => state.currentFrameData,
  (frameData) => {
    if (frameData) {
      Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem("Excel Video Player");
        const resolution = settingsStore.getState().resolution;
        const rangeAddress = getSheetRangeAddress(
          resolution.width,
          resolution.height
        );
        const range = sheet.getRange(rangeAddress);
        const cellProperties: Excel.SettableCellProperties[][] = [];

        for (let row = 0; row < resolution.height; row++) {
          const rowProps: Excel.SettableCellProperties[] = [];

          for (let col = 0; col < resolution.width; col++) {
            const pixelIndex = (row * frameData.width + col) * 4;
            const r = frameData.data[pixelIndex];
            const g = frameData.data[pixelIndex + 1];
            const b = frameData.data[pixelIndex + 2];
            const hex = rgbToHex(r, g, b);

            rowProps.push({
              format: {
                fill: { color: hex },
              },
            });
          }

          cellProperties.push(rowProps);
        }

        range.setCellProperties(cellProperties);

        await context.sync();
      }).catch((error) => {
        console.error("Error updating Excel cell colors:", error);
      });
    }
  }
);

export default videoPlayerStore;

export const useVideoPlayerStore = <SliceType>(
  selector: (state: VideoPlayerState) => SliceType
) => useStore(videoPlayerStore, selector);
