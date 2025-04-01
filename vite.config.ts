
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      supported: {
        bigint: true
      }
    },
    // Explicitly exclude wasm files from optimization
    exclude: ['*.wasm']
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      // Explicitly tell Rollup how to handle .wasm files
      external: [/\.wasm$/]
    }
  },
}));
