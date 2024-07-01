import { resolveModule } from 'local-pkg'
import fg from 'fast-glob'
import { snakeToCamel } from '../core/utils'

export function VkUviewUiResolver() {
  const componentsPath = `${resolveModule('vk-uview-ui')
    ?.split('index.js')[0]
    .replace(/\\/g, '/')}components/`
  const components = fg
    .sync('**/*.vue', {
      onlyFiles: true,
      cwd: componentsPath,
      deep: 2,
    })
    .filter(name => name.startsWith('u-'))
  const compMap = Object.fromEntries(
    components.map((path) => {
      const name = path.split('/')[0]
      return [snakeToCamel(name), `vk-uview-ui/components/${name}`]
    }),
  )
  return compMap
}
