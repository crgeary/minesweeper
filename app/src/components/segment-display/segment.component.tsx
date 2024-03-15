import classNames from "classnames";
import { SEGMENT_PATHS } from "./constants";
import { Char } from "./types";
import { getCharSegments } from "./utils";

type SegmentProps = {
  char: Char;
  height: number;
  period: boolean;
};

export function Segment({ char, height, period }: SegmentProps) {
  const size = { width: 196, height: 312 };

  const segments = getCharSegments(char);

  return (
    <svg
      width={height * (size.width / size.height)}
      height={height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {SEGMENT_PATHS.map((path, i) => (
        <path
          key={i}
          d={path}
          className={classNames({
            "fill-gray-200": segments[i] === 0,
            "fill-gray-900": segments[i] === 1,
          })}
        />
      ))}
      <circle
        cx="184"
        cy="300"
        r="12"
        className={classNames({
          "fill-gray-100": !period,
          "fill-gray-900": !!period,
        })}
      />
    </svg>
  );
}
