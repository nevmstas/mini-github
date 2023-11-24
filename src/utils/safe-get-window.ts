const safeGetWindow = <F extends (window: Window) => any>(
  fn: F
): ReturnType<F> | undefined => {
  if (typeof window !== 'undefined') {
    return fn(window)
  }

  return undefined
}

export default safeGetWindow
