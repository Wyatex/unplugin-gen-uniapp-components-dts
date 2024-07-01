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
  const compMap = Object.fromEntries(
    components.map((file) => {
      const [_, fileNameWithExt] = file.split('/')
      const [fileName] = fileNameWithExt.split('.')
      return [snakeToCamel(fileName), file]
    }),
  )
  const relatedPath = getRelative(options.dtsPath, scanPath)
  const declaration = getDeclaration(compMap, relatedPath)
  fs.writeFileSync(options.dtsPath, declaration, {
    encoding: 'utf-8',
  })
  return declaration
}
