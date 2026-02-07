export function getSheetRangeAddress(width: number, height: number): string {
  const LETTERS_COUNT = 26;
  const validHeight = Math.max(height, 1);
  let remainingWidth = Math.max(width, 1);
  let lastColumnLetters = "";

  while (remainingWidth > 0) {
    remainingWidth--;
    const charCode = (remainingWidth % LETTERS_COUNT) + 64 + 1;
    lastColumnLetters = String.fromCharCode(charCode) + lastColumnLetters;
    remainingWidth = Math.floor(remainingWidth / LETTERS_COUNT);
  }

  return `A1:${lastColumnLetters}${validHeight}`;
}
