import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

type PaperProps = ComponentPropsWithoutRef<"div">;

export function Paper({ className, ...props }: PaperProps) {
  return (
    <div className={classNames("bg-white border-2 border-black shadow-md", className)} {...props} />
  );
}
