import { createColumn } from "./createColumn";

describe("createColumn", () => {
  it("Should convert an array to a matrix where each element is in its own row.", () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = [[1], [2], [3], [4], [5]];

    const result = createColumn(input);

    expect(result).toEqual(expectedOutput);
  });
});
