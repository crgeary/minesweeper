import { PERIOD_CHAR, SEGMENTS, VALID_CHARS } from "./constants";
import { Char, Segment } from "./types";

export function parseIntoSegmentData(value: number): Segment[] {
  const chars = `${value}`.split("").filter((c) => [...VALID_CHARS, PERIOD_CHAR].includes(c));

  return chars
    .filter((c) => c !== PERIOD_CHAR)
    .map((c, i) => ({ char: c as Char, period: chars[i + 1] === PERIOD_CHAR }));
}

export function getCharSegments(char: Char) {
  return SEGMENTS[char];
}
