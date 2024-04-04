import type { Properties } from 'csstype'

/** 将 style 对象转为 htmlElement 上的 style 字符串 */
export const styleToString = (style: Properties<string | number>) => {
  const styleString = Object.keys(style).reduce((prev, key) => {
    return `${prev} ${key}:${style[key]};`
  }, '')
  return styleString
}
