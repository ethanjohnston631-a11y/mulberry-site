import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      // "server-only" throws outside a React Server Components bundle; tests run plain Node.
      "server-only": path.resolve(__dirname, "tests/server-only-stub.ts"),
    },
  },
  test: { environment: "node", include: ["tests/**/*.test.ts"] },
});
