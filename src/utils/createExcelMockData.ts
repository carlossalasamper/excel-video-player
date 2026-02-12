/* eslint-disable @typescript-eslint/no-explicit-any */

import ExcelMockData from "@/types/ExcelMockData";

export default function createExcelMockData(
  data: Record<string, any>
): ExcelMockData {
  return {
    run: async function (
      callback: (context: Partial<Excel.RequestContext>) => Promise<void>
    ) {
      await callback(this.context);
    },
    CalculationMode: {
      manual: "Manual",
      automatic: "Automatic",
      automaticExceptTables: "AutomaticExceptTables",
    },
    context: {},
    ...data,
  };
}
