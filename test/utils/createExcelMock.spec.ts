import createExcelMock from "@/utils/createExcelMock";
import createExcelMockData from "@/utils/createExcelMockData";

describe("createExcelMock", () => {
  it("Should create an Excel mock object correctly.", function () {
    const excelMockData = createExcelMockData();
    const excelMock = createExcelMock(excelMockData);

    expect(excelMock).toHaveProperty("run");
    expect(excelMock).toHaveProperty("CalculationMode");
    expect(excelMock).toHaveProperty("context");
  });
});
