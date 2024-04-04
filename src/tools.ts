import type { Properties } from 'csstype'

/** 传入一个时间戳，返回一个日期字符串 */
export const getDate = ({ time, full, offsetOption = {} }) => {
  /** 生成一个日期对象 */
  const date = new Date(time)
  /** 数值如果小于10, 则补0 */
  const judge = (key, offset = 0) => {
    const value = date[key]() + (offsetOption[key] || 0) + offset
    return value < 10 ? `0${value}` : value
  }
  /** 生成 年-月-日 */
  const transfromDate1 = `${judge('getFullYear')}-${judge(
    'getMonth',
    1
  )}-${judge('getDate')}`
  /** 生成 年-月-日 时:分:秒 */
  const transfromDate2 = `${transfromDate1} ${judge('getHours')}:${judge(
    'getMinutes'
  )}:${judge('getSeconds')}`

  return full ? transfromDate2 : transfromDate1
}

/** 获取一个指定长度的数组 */
export const getArr = length => {
  return Array(length)
    .fill(null)
    .map((_, index) => index)
}

/** 获取数组中的随机项 */
export const getArrRandom = (arr: any[], length = 1) => {
  if (!arr?.length) return []
  return getArr(length).map(() => {
    return arr[Math.ceil(Math.random() * (arr.length - 1))]
  })
}

/** 获取一个指定范围的随机数 */
export const getRandom = (max: number, min = 0) => {
  return min + Math.ceil(Math.random() * (max - min))
}

/** 获取一个20位长度的随机id */
export const getId = () => {
  return Math.random().toString().slice(2) + getRandom(9999)
}

/** 将 style 对象转为 htmlElement 上的 style 字符串 */
export const styleToString = (style: Properties<string | number>) => {
  const styleString = Object.keys(style).reduce((prev, key) => {
    return `${prev} ${key}:${style[key]};`
  }, '')
  return styleString
}
