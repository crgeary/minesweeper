import classNames from "classnames";

import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={classNames("block w-full px-1.5 border-2 border-black bg-gray-200", className)}
      {...props}
    />
  );
}
