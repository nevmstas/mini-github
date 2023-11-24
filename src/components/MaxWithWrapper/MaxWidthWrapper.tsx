'use client'
import { PropsWithChildren } from 'react'
import styles from './MaxWidthWrapper.module.scss'

export default ({ children }: PropsWithChildren) => {
  return <div className={styles.wrapper}>{children}</div>
}
