import dts from "vite-plugin-dts";

import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      fileName: "index",
      formats: ["es"],
    },
    target: "esnext",
  },
});
