import { OfficeMockObject } from "office-addin-mock";
import prepareSheet from "./prepareSheet";
import createExcelMockData from "./createExcelMockData";

describe("prepareSheet", () => {
  it("Should prepare the Excel sheet correctly.", async function () {
    const worksheetItems = [
      {
        name: "Excel Video Player",
        getRange: function () {
          return {
            format: {
              columnWidth: 0,
              rowHeight: 0,
            },
          };
        },
        activate: function () {
          return;
        },
        getUsedRange: function () {
          return {
            clear: function () {
              return;
            },
          };
        },
      },
    ];
    const mockData = createExcelMockData({
      context: {
        application: {
          calculationMode: "Automatic",
        },
        workbook: {
          worksheets: {
            items: worksheetItems,
            getItemOrNullObject: function (name: string) {
              const sheet = worksheetItems.find(
                (sheet: { name: string }) => sheet.name === name
              );
              return sheet ? sheet : { isNullObject: true };
            },
          },
        },
      },
    });
    const excelMock = new OfficeMockObject(mockData);

    global.Excel = excelMock as unknown as typeof Excel;

    await prepareSheet({ width: 160, height: 90 }, 4);

    // assert.strictEqual(excelMock.context.workbook.range.format.fill.color, "yellow");
  });
});
