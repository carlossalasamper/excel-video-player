import createExcelMock from "@/utils/createExcelMock";
import createExcelMockData from "@/utils/createExcelMockData";
import setCalculationMode from "@/utils/setCalculationMode";

describe("setCalculationMode", () => {
  it("Should set the calculation mode correctly.", async function () {
    const excelMockData = createExcelMockData();
    const excelMock = createExcelMock(excelMockData);
    const manualMode = "Manual" as Excel.CalculationMode;

    global.Excel = excelMock as unknown as typeof Excel;

    await setCalculationMode(manualMode);

    expect(excelMock.context.application.calculationMode).toBe(manualMode);
  });

  it("Should handle errors when setting calculation mode.", async function () {
    const excelMockData = createExcelMockData({
      sync: jest.fn().mockRejectedValue(new Error("Sync error")),
    });
    const excelMock = createExcelMock(excelMockData);
    const manualMode = "Manual" as Excel.CalculationMode;

    global.Excel = excelMock as unknown as typeof Excel;

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    await setCalculationMode(manualMode);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error setting calculation mode:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
