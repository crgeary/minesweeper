import { VALID_CHARS } from "./constants";

export type Char = (typeof VALID_CHARS)[number];

export type Segment = {
  char: Char;
  period: boolean;
};
