import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://furong-huang.com",
  output: "static",
  build: {
    format: "directory"
  }
});
