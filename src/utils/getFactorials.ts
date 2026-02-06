import { factorial } from "./factorial";

export function getFactorials(n: number): number[] {
  const cache = new Map<number, number>();
  const factorials = Array.from({ length: n + 1 }, (_, i) => {
    const previousResult = cache.get(i - 1);
    const root =
      previousResult !== undefined
        ? { n: i - 1, factorial: previousResult }
        : undefined;
    const result = factorial(i, root);

    cache.set(i, result);

    return result;
  });

  return factorials;
}
