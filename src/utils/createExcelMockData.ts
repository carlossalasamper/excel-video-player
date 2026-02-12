/* eslint-disable @typescript-eslint/no-explicit-any */

import ExcelMockData from "@/types/ExcelMockData";

export default function createExcelMockData(
  context: Record<string, any> = {}
): ExcelMockData {
  const mockData: ExcelMockData = {
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
    context: {
      application: {
        calculationMode: "Automatic",
      },
      ...context,
    },
  };

  return mockData;
}
