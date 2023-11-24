'use client'

import useSearch from '@/hooks/useSearch'
import styles from './Search.module.scss'

export default () => {
  const { onSearch } = useSearch()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        onChange={handleSearch}
        placeholder="Type here..."
      />
    </div>
  )
}
