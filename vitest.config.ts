import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    // Integration tests need Firebase credentials; run them with `test:int`.
    exclude: ["node_modules", ".next", "**/*.int.test.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname) },
  },
});
