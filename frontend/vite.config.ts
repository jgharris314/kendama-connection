import * as path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const dirname = path.resolve()

export const alias: Record<string, any> = {
  api: path.join(dirname, "src", "api"),
  pages: path.join(dirname, "src", "pages"),
  components: path.join(dirname, "src", "components"),
  assets: path.join(dirname, "src", "assets"),
  constants: path.join(dirname, "src", "constants"),
  context: path.join(dirname, "src", "context"),
  hooks: path.join(dirname, "src", "hooks"),
  utils: path.join(dirname, "src", "utils"),
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: Object.keys(alias).map((key) => ({
      find: key,
      replacement: alias[key],
    })),
  },
  plugins: [react()],
})
