import settingsStore from "@/stores/settingsStore";
import videoPlayerStore from "@/stores/videoPlayerStore";
import { getSheetRangeAddress } from "./getSheetRangeAddress";

export default function prepareSheet() {
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
    console.error("Error preparing Excel sheet:", error);
  });
}
