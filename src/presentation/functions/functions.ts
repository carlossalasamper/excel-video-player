import { createColumn } from "../../utils/createColumn";
import { createRow } from "../../utils/createRow";
import { getFactorials } from "../../utils/getFactorials";
import settingsStore from "../stores/settingsStore";

/**
 * Calculates the factorial row for a given number.
 * @customfunction
 * @param {number} n Number to calculate factorial row for
 * @return The factorial as a 2D array.
 */
export function FACTORIALROW(n: number): number[][] {
  const mode = settingsStore.getState().factorialMode;
  const factorials = getFactorials(n);
  let result: number[][];

  switch (mode) {
    case "column":
      result = createColumn(factorials);
      break;
    case "row":
    default:
      result = createRow(factorials);
      break;
  }

  return result;
}
