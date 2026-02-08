import settingsStore from "@/stores/settingsStore";
import { getSheetRangeAddress } from "./getSheetRangeAddress";
import { rgbToHex } from "./rgbToHex";

export default function renderFrame(frameData: ImageData) {
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
