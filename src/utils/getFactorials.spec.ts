import { getFactorials } from "./getFactorials";

describe("getFactorials", () => {
  it("Should get an array of factorials for a given number.", () => {
    const input = 5;
    const expectedOutput = [1, 1, 2, 6, 24, 120];
    const result = getFactorials(input);

    expect(result).toEqual(expectedOutput);
  });
});
