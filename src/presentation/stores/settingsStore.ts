import { useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import Resolution from "../types/Resolution";

interface SettingsState {
  resolution: Resolution;
  cellSize: number;
  videoUrl: string;
  setResolution: (resolution: Resolution) => void;
  setCellSize: (cellSize: number) => void;
  setVideoUrl: (videoUrl: string) => void;
}

const settingsStore = createStore<SettingsState>()(
  subscribeWithSelector((set) => ({
    resolution: { width: 160, height: 90 },
    cellSize: 4,
    videoUrl: "",
    setResolution: (resolution: Resolution) => {
      set(() => ({ resolution }));
    },
    setCellSize: (cellSize: number) => {
      set(() => ({ cellSize }));
    },
    setVideoUrl: (videoUrl: string) => {
      set(() => ({ videoUrl }));
    },
  }))
);

Office.onReady(() => {
  const savedResolution = Office.context.document.settings.get("resolution");
  const savedCellSize = Office.context.document.settings.get("cellSize");
  const savedVideoUrl = Office.context.document.settings.get("videoUrl");

  if (savedResolution) {
    settingsStore.setState({ resolution: savedResolution });
  }

  if (savedCellSize) {
    settingsStore.setState({ cellSize: savedCellSize });
  }

  if (savedVideoUrl) {
    settingsStore.setState({ videoUrl: savedVideoUrl });
  }

  settingsStore.subscribe(
    (state) => state.resolution,
    (resolution) => {
      Office.context.document.settings.set("resolution", resolution);
      Office.context.document.settings.saveAsync();
    }
  );

  settingsStore.subscribe(
    (state) => state.cellSize,
    (cellSize) => {
      Office.context.document.settings.set("cellSize", cellSize);
      Office.context.document.settings.saveAsync();
    }
  );

  settingsStore.subscribe(
    (state) => state.videoUrl,
    (videoUrl) => {
      Office.context.document.settings.set("videoUrl", videoUrl);
      Office.context.document.settings.saveAsync();
    }
  );
});

export default settingsStore;

export const useSettingsStore = <SliceType>(
  selector: (state: SettingsState) => SliceType
) => useStore(settingsStore, selector);
