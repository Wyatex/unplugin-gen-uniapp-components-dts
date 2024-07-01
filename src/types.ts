export interface Options {
  /**
   * 插件解析器
   */
  resolvers?: (() => Record<string, string>)[]
  /**
   * dts 生成文件目录+文件名
   */
  dtsPath?: string
}
