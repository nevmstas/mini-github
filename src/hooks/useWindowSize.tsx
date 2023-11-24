import safeGetWindow from '@/utils/safe-get-window'
import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: safeGetWindow((w) => w.innerWidth) ?? 0,
    height: safeGetWindow((w) => w.innerHeight) ?? 0,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return windowSize
}

export default useWindowSize
