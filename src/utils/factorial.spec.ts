import { factorial } from "./factorial";

describe("factorial", () => {
  it("Should get the factorial of a given number.", () => {
    const n = 10;
    const expectedOutput = 3628800;
    const result = factorial(n);

    expect(result).toBe(expectedOutput);
  });

  it("Should return 1 for input 0.", () => {
    const n = 0;
    const expectedOutput = 1;
    const result = factorial(n);

    expect(result).toBe(expectedOutput);
  });

  it("Should throw an error for negative input.", () => {
    const n = -5;

    expect(() => factorial(n)).toThrow("Factorial is not defined for negative numbers.");
  });

  it("Should throw an error for non-integer input.", () => {
    const n = 3.5;

    expect(() => factorial(n)).toThrow("Factorial is only defined for integers.");
  });
});
