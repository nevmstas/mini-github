'use client'
import { useAppContext } from '@/context/AppContext'
import styles from './Error.module.scss'

import { MdErrorOutline, MdClose } from 'react-icons/md'

export default () => {
  const { setError, error } = useAppContext()

  const handleOnClose = () => {
    setError('')
  }

  if (!error) return null

  return (
    <div className={styles.errorContainer}>
      <MdErrorOutline />
      <span>Something went wrong!</span>
      <MdClose onClick={handleOnClose} className={styles.close} />
    </div>
  )
}
