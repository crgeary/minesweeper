import { ComponentPropsWithoutRef } from "react";

type MineIconProps = ComponentPropsWithoutRef<"svg">;

export function MineIcon(props: MineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M226.16 0h59.68l.81 33.77h14.5l1.12 42.4 48.17 19.95 30.77-29.2 10.26 10.26 24.45-23.3 42.2 42.2-23.3 24.45 10.25 10.25-28.72 30.27 20.18 48.73 41.7 1.1v14.5l33.77.82v59.67l-33.77.82v14.5l-41.26 1.08-20.29 48.98 28.4 29.92-10.26 10.25 23.3 24.46-42.2 42.2-24.45-23.3-10.26 10.25-29.91-28.39-49.06 20.32-1.08 41.27h-14.5l-.82 33.77h-59.68l-.81-33.77h-14.5l-1.1-41.77-48.65-20.15-30.31 28.77-10.26-10.26-24.45 23.3-42.2-42.2 23.3-24.45-10.25-10.25 29.23-30.8-19.95-48.19-42.44-1.1v-14.51L0 285.8v-59.67l33.77-.82v-14.5l42.93-1.12 19.77-47.73-29.54-31.13 10.25-10.25-23.3-24.46 42.2-42.2 24.45 23.3 10.26-10.25 31.1 29.51 47.83-19.81 1.12-42.9h14.5L226.17 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}