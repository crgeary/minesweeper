import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

import { FaFlag, FaBomb } from "react-icons/fa";

type CellProps = ComponentPropsWithoutRef<"button"> & {
  isFlagged: boolean;
  isRevealed: boolean;
  state: number;
};

export function Cell({ isFlagged, isRevealed, state, ...props }: CellProps) {
  return (
    <button
      className={classNames(
        "w-8 h-8 flex items-center justify-center flex-col border-l border-b border-black text-sm font-bold",
        {
          "bg-gray-100": isFlagged,
          "bg-white": isRevealed,
          "bg-yellow-100": isRevealed && state === 0,
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
