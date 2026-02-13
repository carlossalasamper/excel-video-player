import createExcelMock from "@/utils/test/createExcelMock";
import createExcelMockData from "@/utils/test/createExcelMockData";
import prepareSheet from "@/utils/prepareSheet";
import setExcelMock from "@/utils/test/setExcelMock";

describe("prepareSheet", () => {
  it("Should activate, clear and resize cells of an existing sheet.", async function () {
    const activate = jest.fn();
    const clear = jest.fn();
    const usedRange = {
      clear,
    };
    const range = {
      format: {
        columnWidth: 0,
        rowHeight: 0,
      },
    };
    const worksheetItems = [
      {
        name: "Excel Video Player",
        getRange: function () {
          return range;
        },
        activate,
        getUsedRange: function () {
          return usedRange;
        },
      },
    ];
    const excelMockData = createExcelMockData({
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
    });
    const excelMock = createExcelMock(excelMockData);

    setExcelMock(excelMock);

    await prepareSheet({ width: 160, height: 90 }, 4);

    expect(activate).toHaveBeenCalled();
    expect(clear).toHaveBeenCalled();
    expect(range.format.columnWidth).toBe(4);
    expect(range.format.rowHeight).toBe(4);
  });

  it("Should activate, clear and resize cells of a new sheet.", async function () {
    const activate = jest.fn();
    const clear = jest.fn();
    const usedRange = {
      clear,
    };
    const range = {
      format: {
        columnWidth: 0,
        rowHeight: 0,
      },
    };
    const worksheetItems: {
      name: string;
      getRange: () => typeof range;
      activate: typeof activate;
      getUsedRange: () => typeof usedRange;
    }[] = [];
    const excelMockData = createExcelMockData({
      workbook: {
        worksheets: {
          items: worksheetItems,
          getItemOrNullObject: function (name: string) {
            const sheet = worksheetItems.find(
              (sheet: { name: string }) => sheet.name === name
            );
            return sheet ? sheet : { isNullObject: true };
          },
          add: function (name: string) {
            const sheet = {
              name,
              getRange: function () {
                return range;
              },
              activate,
              getUsedRange: function () {
                return usedRange;
              },
            };

            worksheetItems.push(sheet);

            return sheet;
          },
        },
      },
    });
    const excelMock = createExcelMock(excelMockData);

    setExcelMock(excelMock);

    await prepareSheet({ width: 160, height: 90 }, 4);

    expect(activate).toHaveBeenCalled();
    expect(clear).toHaveBeenCalled();
    expect(range.format.columnWidth).toBe(4);
    expect(range.format.rowHeight).toBe(4);
  });

  it("Should throw an error if Excel.run fails.", async function () {
    const excelMock = createExcelMock(
      createExcelMockData({
        workbook: {
          worksheets: {
            getItemOrNullObject: function () {
              return { isNullObject: true };
            },
            add: function () {
              throw new Error("Failed to add sheet");
            },
          },
        },
      })
    );

    setExcelMock(excelMock);

    await expect(prepareSheet({ width: 160, height: 90 }, 4)).rejects.toThrow(
      Error
    );
  });
});
