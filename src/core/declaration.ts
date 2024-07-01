export function getDeclaration(
  compMap: Record<string, string>,
  pathPrefix: string
) {
  let code = `/* eslint-disable */
// @ts-nocheck
// Generated by @wyatex/unplugin-gen-uniapp-components-dts
export {}

/* prettier-ignore */
declare module 'vue' {
  interface GlobalComponents {`

  for (const [name, path] of Object.entries(compMap)) {
    code += `
    ${name}: typeof import('${pathPrefix}${path}')['default']`
  }
  code += `
  }
}
`
  return code
}
