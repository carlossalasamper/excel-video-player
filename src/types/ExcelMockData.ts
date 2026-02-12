/* eslint-disable @typescript-eslint/no-explicit-any */

type ExcelMockData = {
  run: (
    callback: (context: Partial<Excel.RequestContext>) => Promise<void>
  ) => Promise<void>;
  CalculationMode: {
    manual: string;
    automatic: string;
    automaticExceptTables: string;
  };
  context: any;
};

export default ExcelMockData;
