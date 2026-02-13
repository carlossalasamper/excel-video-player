import createExcelMock from "@/utils/test/createExcelMock";
import createExcelMockData from "@/utils/test/createExcelMockData";
import renderFrame from "@/utils/renderFrame";
import setExcelMock from "@/utils/test/setExcelMock";

describe("renderFrame", () => {
  it("Should render a frame on the sheet.", async function () {
    const setCellProperties = jest.fn();
    const range = {
      setCellProperties,
    };
    const worksheetItems = [
      {
        name: "Excel Video Player",
        getRange: function () {
          return range;
        },
      },
    ];
    const excelMockData = createExcelMockData({
      workbook: {
        worksheets: {
          items: worksheetItems,
          getItem: function (name: string) {
            const sheet = worksheetItems.find(
              (sheet: { name: string }) => sheet.name === name
            );
            if (!sheet) throw new Error("Sheet not found");
            return sheet;
          },
        },
      },
    });
    const excelMock = createExcelMock(excelMockData);

    setExcelMock(excelMock);

    const frameData = new ImageData(2, 2);
    frameData.data.set([
      255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 0, 255,
    ]);

    await renderFrame(frameData, { width: 2, height: 2 });

    expect(setCellProperties).toHaveBeenCalledWith([
      [
        { format: { fill: { color: "#ff0000" } } },
        { format: { fill: { color: "#00ff00" } } },
      ],
      [
        { format: { fill: { color: "#0000ff" } } },
        { format: { fill: { color: "#ffff00" } } },
      ],
    ]);
  });

  it("Should throw an error if Excel Video Player sheet is not found.", async function () {
    const excelMockData = createExcelMockData({
      workbook: {
        worksheets: {
          items: [],
          getItem: function (name: string) {
            throw new Error("Sheet not found: " + name);
          },
        },
      },
    });
    const excelMock = createExcelMock(excelMockData);

    setExcelMock(excelMock);

    const frameData = new ImageData(1, 1);
    frameData.data.set([255, 0, 0, 255]);

    await expect(
      renderFrame(frameData, { width: 1, height: 1 })
    ).rejects.toThrow(Error);
  });
});
