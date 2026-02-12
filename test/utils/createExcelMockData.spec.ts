import createExcelMockData from "@/utils/createExcelMockData";

describe("createExcelMockData", () => {
  it("Should create Excel mock data with custom workbook.", () => {
    const excelMockData = createExcelMockData({
      workbook: {
        worksheets: {
          getItemOrNullObject: new Function(),
          add: new Function(),
        },
      },
    });

    expect(excelMockData.context.workbook).toHaveProperty("worksheets");
    expect(
      excelMockData.context.workbook.worksheets.getItemOrNullObject
    ).toBeInstanceOf(Function);
    expect(excelMockData.context.workbook.worksheets.add).toBeInstanceOf(
      Function
    );
  });

  it("Should create Excel mock data with default values.", () => {
    const excelMockData = createExcelMockData();

    expect(excelMockData.context).not.toBeUndefined();
    expect(excelMockData.context.application).toHaveProperty("calculationMode");
    expect(excelMockData.context.application.calculationMode).toBe("Automatic");
    expect(excelMockData.CalculationMode).toEqual({
      manual: "Manual",
      automatic: "Automatic",
      automaticExceptTables: "AutomaticExceptTables",
    });
    expect(excelMockData.run).toBeInstanceOf(Function);
  });
});
