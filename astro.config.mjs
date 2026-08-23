import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://lakeheadconcretecanoe.com",
  output: "static",
  server: {
    host: true,
    port: 3030,
  },
});
