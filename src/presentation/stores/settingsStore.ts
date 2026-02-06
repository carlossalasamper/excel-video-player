import { useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { FactorialMode } from "../types/FactorialMode";

interface SettingsState {
  factorialMode: FactorialMode;
  setFactorialMode: (mode: FactorialMode) => void;
}

const settingsStore = createStore<SettingsState>()(
  subscribeWithSelector((set) => ({
    factorialMode: "column",
    setFactorialMode: (mode: FactorialMode) => {
      set(() => ({ factorialMode: mode }));
    },
  }))
);

Office.onReady(() => {
  const savedFactorialMode =
    Office.context.document.settings.get("factorialMode");

  if (savedFactorialMode) {
    settingsStore.setState({ factorialMode: savedFactorialMode });
  }

  settingsStore.subscribe(
    (state) => state.factorialMode,
    (factorialMode) => {
      Office.context.document.settings.set("factorialMode", factorialMode);
      Office.context.document.settings.saveAsync();

      Excel.run(async (context) => {
        context.workbook.application.calculate(Excel.CalculationType.full);
        context.sync();
      });
    }
  );
});

export default settingsStore;

export const useSettingsStore = <SliceType>(
  selector: (state: SettingsState) => SliceType
) => useStore(settingsStore, selector);
