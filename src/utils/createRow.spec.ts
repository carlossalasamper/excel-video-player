import { createRow } from "./createRow";

describe("createRow", () => {
  it("Should convert an array to a matrix where each element is in its own column.", () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = [input];
    const result = createRow(input);

    expect(result).toEqual(expectedOutput);
  });
});
