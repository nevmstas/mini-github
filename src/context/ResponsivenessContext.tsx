'use client'

import useWindowSize from '@/hooks/useWindowSize'
import { PropsWithChildren, createContext, useContext } from 'react'
import variables from '../app/variables.module.scss'

const ResponsivenessContext = createContext({
  isSmallScreen: false,
})

export const ResponsivenessContextProvider = ({
  children,
}: PropsWithChildren) => {
  const { width } = useWindowSize()

  const isSmallScreen =
    width < Number.parseInt(variables.smallScreenMaxWidthPx, 10)

  return (
    <ResponsivenessContext.Provider value={{ isSmallScreen }}>
      {children}
    </ResponsivenessContext.Provider>
  )
}

export const useResponsivenessContext = () => useContext(ResponsivenessContext)
