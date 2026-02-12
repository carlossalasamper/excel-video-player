import ExcelMockData from "@/types/ExcelMockData";
import createExcelMockData from "./createExcelMockData";

describe("createExcelMockData", () => {
  it("Should create Excel mock data with custom workbook.", () => {
    const data = {
      context: {
        workbook: {
          worksheets: {
            getItemOrNullObject: new Function(),
            add: new Function(),
          },
        },
      },
    };
    const mockData: ExcelMockData = createExcelMockData(data);

    expect(mockData.context.workbook).toHaveProperty("worksheets");
    expect(
      mockData.context.workbook.worksheets.getItemOrNullObject
    ).toBeInstanceOf(Function);
    expect(mockData.context.workbook.worksheets.add).toBeInstanceOf(Function);
    expect(mockData.run).toBeInstanceOf(Function);
  });
});
