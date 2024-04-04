import { Dom } from './dom'

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
