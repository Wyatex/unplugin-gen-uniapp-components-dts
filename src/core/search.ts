import fg from 'fast-glob'
import Debug from 'debug'

const debug = Debug('unplugin-gen-uniapp-components-dts:glob')

function isSnakeCase(str: string) {
  // 蛇形分隔的正则表达式
  const snakeCaseRegex = /^[a-z]+(\-[a-z]+)*$/
  return snakeCaseRegex.test(str)
}

function ruleCheck(filePath: string) {
  const splited = filePath.split('/')
  if (splited.length !== 2) return false
  const [dir, fileNameWithExt] = splited
  const [fileName] = fileNameWithExt.split('.')
  return isSnakeCase(dir) && isSnakeCase(fileName) && dir === fileName
}

export function searchComponents(cwd: string) {
  debug(`started glob`)
  const files = fg
    .sync('**/*.vue', {
      onlyFiles: true,
      cwd,
      deep: 2,
    })
    .filter(ruleCheck)
  debug(`${files.length} components found.`)
  return files
}
