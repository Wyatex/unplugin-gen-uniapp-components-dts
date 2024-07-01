import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'
import { VkUviewUiResolver } from '../src'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      dtsPath: './src/types/components.d.ts',
      resolvers: [VkUviewUiResolver],
    }),
  ],
})
