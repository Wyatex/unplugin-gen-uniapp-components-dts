export interface Options {
  /**
   * 插件解析器
   */
  resolvers?: (() => string[])[]
  /**
   * dts 生成文件目录+文件名
   */
  dtsPath?: string
}
