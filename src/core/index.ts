import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import type { Options } from '../types'
import { searchComponents } from './search'
import { getRelative, snakeToCamel } from './utils'
import { getDeclaration } from './declaration'

export function genDeclaration(
  options: Required<Options>,
  scanPath = 'src/components/',
) {
  const components = searchComponents(scanPath)
  const relatedPath = getRelative(options.dtsPath, scanPath)
  const compMap = {}
  if (options.resolvers) {
    options.resolvers.forEach((resolver) => {
      Object.assign(compMap, resolver())
    })
  }
  Object.assign(compMap, Object.fromEntries(
    components.map((file) => {
      const [_, fileNameWithExt] = file.split('/')
      const [fileName] = fileNameWithExt.split('.')
      return [snakeToCamel(fileName), `${relatedPath}${file}`]
    }),
  ))
  const declaration = getDeclaration(compMap)
  fs.writeFileSync(options.dtsPath, declaration, {
    encoding: 'utf-8',
  })
  return declaration
}
