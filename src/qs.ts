/** querystring 相关方法 */
export const qs = {
  /** 获取当前 url query数据 */
  getQuery: () => {
    const query = qs.parse(location?.search) || {}
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
