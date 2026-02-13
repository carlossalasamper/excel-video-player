export default function setExcelMock(excelMock: unknown): void {
  (globalThis as typeof globalThis & { Excel: typeof Excel }).Excel =
    excelMock as typeof Excel;
}
