/** 睡眠定时器，一般用于防止触发机器人验证或等待节点加载 */
export const sleep = (time: number) => {
  return new Promise<void>(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, time)
  })
}

/** 定时检测器 */
export const inspectTimer = (
  callback: (count: number) => boolean | Promise<boolean>,
  options?: { time: number; maxCount: number }
) => {
  const { time = 20, maxCount = 100 } = options || {}
  const isAsync = callback.constructor.name === 'AsyncFunction'

  return new Promise<void>(resolve => {
    let count = 0

    /** 同步函数使用 setIntervalue, 异步函数使用 setTimeout */
    if (isAsync) {
      const next = async () => {
        count++

        try {
          if (count > maxCount || (await callback(count))) {
            return resolve()
          }
        } catch (e) {
          console.error('inspectTimer 出错', e)
          return resolve()
        }

        const timer = setTimeout(() => {
          clearTimeout(timer)
          next()
        }, time)
      }

      next()
    } else {
      const timer = setInterval(() => {
        const done = () => {
          clearInterval(timer)
          resolve()
        }

        count++

        try {
          if (count > maxCount || callback(count)) done()
        } catch (e) {
          done()
          console.error('inspectTimer 出错', e)
        }
      }, time)
    }
  })
}
