import classNames from "classnames";

import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant: "easy" | "medium" | "hard" | "custom" | "default";
};

export function Button({ children, className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={classNames(className, "block py-1.5 px-4 border-2 border-black font-medium", {
        "bg-green-300 text-black": variant === "easy",
        "bg-orange-300 text-black": variant === "medium",
        "bg-red-300 text-black": variant === "hard",
        "bg-blue-300 text-black": variant === "custom",
        "bg-black text-white": variant === "default",
      })}
      {...props}
    >
      {children}
    </button>
  );
}
