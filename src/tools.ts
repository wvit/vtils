import { Dom } from './dom'

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

/** 转换 url query 参数 */
export const urlQuery = {
  /** 获取当前 url query数据 */
  getQuery: () => {
    const query = urlQuery.parse(location?.search) || {}
    return query
  },

  /** 将 url 中 query 参数提取出来 */
  parse: (url: string) => {
    const queryString = url.split('?')[1] || url.split('?')[0]

    return queryString
      .split('&')
      .reduce<any>((query: Record<string, any>, item: string) => {
        const [key, value] = item.split('=').map(decodeURIComponent)

        if (key) {
          query[key] = value
          return query
        }
      }, {})
  },

  /** 将对象拼接为 queryString */
  stringify: (query: Record<string, any>, url?) => {
    const queryString = Object.keys(query)
      .map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join('&')

    return url ? `${url}?${queryString}` : queryString
  },
}

/** 剪切板功能 */
export const clipboard = {
  /** 向剪切板写入文本 */
  writeText: async content => {
    try {
      /** 非 https 页面，浏览器可能会限制 navigator.clipboard 相关api  */
      await navigator.clipboard.writeText(content)
    } catch (e) {
      /** 降级使用 document.execCommand 复制文本 */
      const copyNode = Dom.create('textarea', {
        style: 'position:absolute;opacity: 0;',
      })
      const body = Dom.query('body')

      body.appendChild(copyNode)
      copyNode.value = content
      copyNode.select()
      document.execCommand('Copy')
      body.removeChild(copyNode)
    }
  },

  /** TODO：读取剪切板内容 */
  read: () => {},
}
