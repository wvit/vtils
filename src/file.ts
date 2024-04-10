import { dom } from './dom'

/**
 * 将文件转为 base64
 *
 * @param file - 需要转为 base64 的文件
 *
 * @returns 返回一个 base64 字符串
 *
 * @example
 * ```
 * // 获取一个图片的 blob
 * const imgBlob = await fetch('/test.png').then(res => res.blob())
 * // 转为 base64
 * const imgBase64 = await getBase64(imgBlob)
 * ```
 */
export const getBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = e => reject(e)
  })
}

/** 
 * 下载文本内容
 * 
 * @param content - 需要下载的内容
 * @param fileName - 下载的文件名
 * @param [type] - MIME 类型值。默认为 'application/json'
 * 
 * @example
 * ```
 * // 将 "{ a: 1}" 保存名为 "test.json" 的文件
 * downloadContent('{ a: 1 }', 'test.json')
 * ```
 */
export const downloadContent = (
  content: string,
  fileName: string,
  type?: 'application/json' | 'text/plain' | string
) => {
  const blob = new Blob([content], { type: type || 'application/json' })
  const url = URL.createObjectURL(blob)

  dom.create('a', { download: fileName, href: url }).click()
  URL.revokeObjectURL(url)
}