import { describe, it, expect } from "vitest";
import { makeEmptyMinefield, makeMinefield } from "../make-minefield";

describe("makeEmptyMinefield()", () => {
  it("creates a minefield of the correct size with empty cells", () => {
    const minefield = makeEmptyMinefield(4, 4);

    expect(minefield.length).toBe(16);
    minefield.forEach((v) => expect(v).toBe(0));
  });
});

describe("makeMinefield()", () => {
  it("creates a minefield of the correct size", () => {
    const minefield = makeMinefield(4, 4, 6, 2);

    expect(minefield.length).toBe(16);
  });

  it("does not place mines at the initial cell", () => {
    const minefield = makeMinefield(4, 4, 15, 2);

    expect(minefield.at(2)).not.toBe(-1);
  });

  it("creates a minefield with the correct number of mines", () => {
    const minefield = makeMinefield(4, 4, 6, 2);

    expect(minefield.filter((cell) => cell === -1).length).toBe(6);
  });
});
