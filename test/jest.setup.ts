class NodeImageData {
  readonly data: Uint8ClampedArray;
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number);
  constructor(data: Uint8ClampedArray, width: number, height?: number);
  constructor(
    first: number | Uint8ClampedArray,
    second: number,
    third?: number
  ) {
    if (first instanceof Uint8ClampedArray) {
      this.data = first;
      this.width = second;
      const computedHeight = third ?? Math.floor(first.length / 4 / second);
      this.height = computedHeight;
      return;
    }

    this.width = first;
    this.height = second;
    this.data = new Uint8ClampedArray(this.width * this.height * 4);
  }
}

// Polyfill for ImageData in Node.js environment
if (typeof globalThis.ImageData === "undefined") {
  Object.defineProperty(globalThis, "ImageData", {
    configurable: true,
    writable: true,
    value: NodeImageData,
  });
}
