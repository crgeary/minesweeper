import classNames from "classnames";

import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant: "easy" | "medium" | "hard" | "custom" | "default";
};

export function Button({ children, className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={classNames(className, "block py-1 px-2 w-full border-2 border-black font-medium", {
        "bg-green-300": variant === "easy",
        "bg-orange-300": variant === "medium",
        "bg-red-300": variant === "hard",
        "bg-blue-300": variant === "custom",
        "bg-gray-300": variant === "default",
      })}
      {...props}
    >
      {children}
    </button>
  );
}
