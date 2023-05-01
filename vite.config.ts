import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const createProxy = (paths: string[]) => {
  const baseURL = 'http://43.139.168.97'
  const result: Record<string, string> = {}

  for (const path of paths) {
    result[`/api/dpcq${path}`] = baseURL
  }

  return result
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: createProxy([
      '/index',
      '/chapter',
      '/wiki'
    ])
  }
})
