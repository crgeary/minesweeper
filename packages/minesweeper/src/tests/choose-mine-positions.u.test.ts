import { describe, it, expect } from "vitest";
import { chooseMinePositions } from "../choose-mine-positions";

describe("chooseMinePositions()", () => {
  it("sets the correct number of mines", () => {
    const mines = chooseMinePositions(15, 7, 0); // 4x4

    expect(mines.size).toBe(7);
  });

  it("it does not set a mine on the excluded cell", () => {
    const mines = chooseMinePositions(15, 15, 8); // 4x4

    expect(mines.has(8)).toBe(false);
  });
});
