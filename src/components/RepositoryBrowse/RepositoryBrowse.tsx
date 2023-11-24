'use client'
import styles from './RepositoryBrowse.module.scss'
import FileTree from '@/components/FileTree'
import { CodeScreen } from '@/components/CodeScreen'
import { useResponsivenessContext } from '@/context/ResponsivenessContext'

interface IRepositoryBrowse {
  repoName: string
  owner: string
}

export default function RepositoryBrowse({
  repoName,
  owner,
}: IRepositoryBrowse) {
  const { isSmallScreen } = useResponsivenessContext()
  return (
    <div className={styles.container}>
      <div className={styles.treeContainer}>
        <FileTree owner={owner} repo={repoName} />
      </div>
      <div className={styles.codeContainer}>
        <CodeScreen />
      </div>
    </div>
  )
}
