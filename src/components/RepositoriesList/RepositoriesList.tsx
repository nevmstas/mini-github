'use client'

import styles from './RepositoriesList.module.scss'
import { useAppContext } from '@/context/AppContext'
import { Card, Loader } from '..'
import { Repository } from '@/graphql'

export default () => {
  const { repositories, searchLoading } = useAppContext()

  const render = () => {
    if (searchLoading) return <Loader />

    return repositories.map(({ node }) => {
      if (!node) {
        return null
      }

      const { name, description, owner, id } = node as Repository
      return (
        <Card
          key={id}
          owner={owner.login}
          name={name}
          description={description}
        />
      )
    })
  }

  return <div className={styles.cardsContainer}>{render()}</div>
}
