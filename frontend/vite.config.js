import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
// envPrefix: "REACT_APP_";
// , envCompatible()
export default defineConfig({
  plugins: [react()],
});
