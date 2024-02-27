import { Segment } from "./segment.component";
import { parseIntoSegmentData } from "./utils";

type SegmentDisplayProps = {
  value: number | string;
};

export function SegmentDisplay({ value }: SegmentDisplayProps) {
  return (
    <div className="flex flex-nowrap gap-1">
      {parseIntoSegmentData(value).map((segment, i) => (
        <Segment key={i} char={segment.char} height={32} period={segment.period} />
      ))}
    </div>
  );
}
