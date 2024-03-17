import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

import { FaFlag, FaBomb } from "react-icons/fa";

type CellProps = ComponentPropsWithoutRef<"button"> & {
  isFlagged: boolean;
  isRevealed: boolean;
  state: number;
};

export function Cell({ isFlagged, isRevealed, state, className, ...props }: CellProps) {
  return (
    <button
      className={classNames(
        className,
        "w-8 h-8 flex items-center justify-center flex-col border-l border-b border-black text-lg font-bold",
        {
          "bg-gray-100": isFlagged,
          "bg-yellow-100": isRevealed && state === 0,
          "bg-yellow-50": isRevealed && state > 0,
          "text-blue-800": isRevealed && state === 1,
          "text-green-700": isRevealed && state === 2,
          "text-red-600": isRevealed && state === 3,
          "text-indigo-800": isRevealed && state === 4,
          "text-red-900": isRevealed && state === 5,
          "text-teal-600": isRevealed && state === 6,
          "text-black": isRevealed && state === 7,
          "text-gray-500": isRevealed && state === 8,
        },
      )}
      {...props}
    >
      <span>
        {isFlagged && <FaFlag />}
        {isRevealed && state === -1 && <FaBomb />}
        {isRevealed && state !== 0 && state !== -1 && state}
      </span>
    </button>
  );
}
