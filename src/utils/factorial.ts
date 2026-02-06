export function factorial(
  n: number,
  root: { n: number; factorial: number } = { n: 0, factorial: 1 }
): number {
  let result = root.factorial;

  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers.");
  } else if (!Number.isInteger(n)) {
    throw new Error("Factorial is only defined for integers.");
  } else if (n > 0) {
    for (let i = root.n + 1; i <= n; i++) {
      result *= i;
    }
  }

  return result;
}
