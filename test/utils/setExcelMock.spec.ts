import setExcelMock from "@/utils/test/setExcelMock";

describe("setExcelMock", () => {
  it("Should set the global Excel object to the provided mock.", function () {
    const excelMock = { mockProperty: "mockValue" };

    setExcelMock(excelMock);

    expect(
      (globalThis as typeof globalThis & { Excel: typeof Excel }).Excel
    ).toBe(excelMock);
  });
});
