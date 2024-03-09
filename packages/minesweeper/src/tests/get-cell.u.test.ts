import { describe, it, expect } from "vitest";
import { getCell } from "../get-cell";

describe("getCell()", () => {
  it("identifies bomb locations", () => {
    const cell = getCell(4, 4, new Set([4]));

    expect(cell).toBe(-1);
  });

  it("can count nearby neighbours accurately", () => {
    const mines = new Set([7, 8, 9, 10, 11, 14, 18, 19, 20, 21]);
    const columns = 5;

    const cells = [
      0, 1, 2, 3, 2, 2, 3, -1, -1, -1, -1, -1, 4, 6, -1, 4, 4, 3, -1, -1, -1, -1, 2, 2, 2,
    ];

    cells.forEach((cell, i) => expect(getCell(i, columns, mines)).toBe(cell));
  });
});
