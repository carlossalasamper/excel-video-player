import { getSheetRangeAddress } from "./getSheetRangeAddress";
import Resolution from "@/types/Resolution";

export default function prepareSheet(resolution: Resolution, cellSize: number) {
  return Excel.run(async (context) => {
    const existingSheet =
      context.workbook.worksheets.getItemOrNullObject("Excel Video Player");

    await context.sync();

    context.application.calculationMode = Excel.CalculationMode.manual;

    const sheet = existingSheet.isNullObject
      ? context.workbook.worksheets.add("Excel Video Player")
      : existingSheet;
    const rangeAddress = getSheetRangeAddress(
      resolution.width,
      resolution.height
    );
    const range = sheet.getRange(rangeAddress);

    sheet.activate();
    sheet.getUsedRange().clear();

    range.format.columnWidth = cellSize;
    range.format.rowHeight = cellSize;

    await context.sync();
  }).catch((error) => {
    throw error;
  });
}
