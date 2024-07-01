import path from 'node:path'

export function snakeToCamel(str: string) {
  // 将字符串按下划线分割成单词数组
  const words = str.split('-')

  // 将每个单词的首字母大写，其余字母小写，并拼接在一起
  const camelCaseStr = words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')

  return camelCaseStr
}

export function getRelative(from: string, to: string) {
  // 计算从 a 到 b 的相对路径
  const relativePath = path.relative(path.dirname(from), to)

  // 将相对路径转换为带有 './' 前缀的形式，并确保路径末尾有斜杠
  return `./${relativePath.replace(/\\/g, '/').replace(/\/?$/, '/')}`
}
