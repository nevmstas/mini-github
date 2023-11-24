'use client'
import Link from 'next/link'

import styles from './Card.module.scss'

interface ICard {
  owner: string
  name: string
  description?: string | null
}

export default ({ owner, name, description }: ICard) => {
  return (
    <Link href={`${owner}/${name}`} className={styles.card}>
      <span className={styles.repositoryName}>{name}</span>
      {description && (
        <span className={styles.repositoryDescription}>{description}</span>
      )}
    </Link>
  )
}
