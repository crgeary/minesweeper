import { randomBetween } from "../random-between";

describe("randomBetween()", () => {
  it("returns a number between 2 different numbers", () => {
    const min = 15;
    const max = 40;

    const randomNumber = randomBetween(min, max);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  it("returns a number between 2 different numbers when arguments are reversed", () => {
    const min = 40;
    const max = 15;

    const randomNumber = randomBetween(min, max);

    expect(randomNumber).toBeLessThanOrEqual(min);
    expect(randomNumber).toBeGreaterThanOrEqual(max);
  });

  it("returns the same number if both are equal", () => {
    const randomNumber = randomBetween(10, 10);

    expect(randomNumber).toBe(10);
  });
});
