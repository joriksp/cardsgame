import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   base: "/",
   resolve: {
      alias: {
         src: "/src",
         components: "/src/components",
         hooks: "/src/hooks",
         pages: "/src/pages",
      },
   },
});
