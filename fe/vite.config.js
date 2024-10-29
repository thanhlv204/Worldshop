import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["chunk-SMH37M3I.js"], // Loại trừ tệp này khỏi quá trình tối ưu hóa
  },
});
