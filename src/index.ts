import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import chokidar from 'chokidar'
import type { Options } from './types'
import { genDeclaration } from './core'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
) => {
  const resolveOption: Required<Options> = {
    dtsPath: options?.dtsPath || './components.d.ts',
    resolvers: options?.resolvers || [],
  }
  return {
    name: 'unplugin-gen-uniapp-components-dts',
    buildStart() {
      // 在build阶段执行一次生成dts
      genDeclaration(resolveOption)
      // 监听src/components目录变化
      const watch = chokidar.watch('src/components', {
        persistent: true,
      })
      watch.on('all', () => {
        genDeclaration(resolveOption)
      })
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
