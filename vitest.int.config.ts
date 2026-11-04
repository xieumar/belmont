import { defineConfig } from "vitest/config";
import path from "node:path";

// Load Firebase credentials the same way Next.js does.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // File is optional; missing credentials are reported by the code under test.
  }
}

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.int.test.ts"],
    exclude: ["node_modules", ".next"],
    testTimeout: 30_000,
    // One shared database, so run files one at a time.
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      // `server-only` throws outside Next.js; stub it so tests can import admin code.
      "server-only": path.resolve(__dirname, "vitest.server-only-stub.ts"),
    },
  },
});
