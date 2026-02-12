import { getSheetRangeAddress } from "@/utils/getSheetRangeAddress";

describe("getSheetRangeAddress", () => {
  it("Should return the correct Excel range string given width and height.", () => {
    const width = 5;
    const height = 10;
    const expectedOutput = "A1:E10";
    const result = getSheetRangeAddress(width, height);

    expect(result).toEqual(expectedOutput);
  });

  it("Should handle single column correctly.", () => {
    const width = 1;
    const height = 15;
    const expectedOutput = "A1:A15";
    const result = getSheetRangeAddress(width, height);

    expect(result).toEqual(expectedOutput);
  });

  it("Should handle single row correctly.", () => {
    const width = 8;
    const height = 1;
    const expectedOutput = "A1:H1";
    const result = getSheetRangeAddress(width, height);

    expect(result).toEqual(expectedOutput);
  });

  it("Should handle larger dimensions correctly.", () => {
    const width = 30;
    const height = 100;
    const expectedOutput = "A1:AD100";
    const result = getSheetRangeAddress(width, height);

    expect(result).toEqual(expectedOutput);
  });

  it("Should handle edge case of width 0 and height 0.", () => {
    const width = 0;
    const height = 0;
    const expectedOutput = "A1:A1";
    const result = getSheetRangeAddress(width, height);

    expect(result).toEqual(expectedOutput);
  });
});
