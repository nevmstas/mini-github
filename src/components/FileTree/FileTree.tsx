'use client'
import { useAppContext } from '@/context/AppContext'
import { GetRepositoryQuery, getSdkClient } from '@/graphql'
import { useEffect, useMemo, useState } from 'react'
import styles from './FileTree.module.scss'
import { Loader } from '..'
import { FaRegFileCode, FaRegFolder } from 'react-icons/fa'

interface IFileTree {
  owner: string
  repo: string
  path?: string
}

const FileTree = ({ owner, repo, path }: IFileTree) => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<GetRepositoryQuery>()
  const [loading, setLoading] = useState(false)

  const { loadFile, setError } = useAppContext()

  const onFileClick = ({
    fileName,
    oid,
  }: {
    fileName: string
    oid: string
  }) => {
    loadFile({ owner, repoName: repo, oid, fileName })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const sdkClient = getSdkClient()
        const result: GetRepositoryQuery = await sdkClient.GetRepository({
          owner,
          name: repo,
          expression: `HEAD:${path ?? ''}`,
        })
        setData(result)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isOpen, owner, repo, path])

  const toggle = () => setIsOpen(!isOpen)

  const entryName = useMemo(() => {
    if (!path) {
      return repo
    }

    const splittedPath = path.split('/')

    return splittedPath[splittedPath.length - 1]
  }, [path, repo])

  if (loading) {
    return <Loader size="sm" />
  }

  return (
    <div className={styles.treeContainer}>
      <div className={styles.folder} onClick={toggle}>
        <FaRegFolder className={styles.icon} />
        <span>{`${entryName}`}</span>
      </div>
      {isOpen &&
        data?.repository?.object &&
        'entries' in data.repository.object &&
        data.repository.object.entries?.map((entry) => {
          const nextPath = path ? `${path}/${entry.name}` : entry.name
          return (
            <div key={entry.name} style={{ paddingLeft: '20px' }}>
              {entry.type === 'tree' ? (
                <FileTree owner={owner} repo={repo} path={nextPath} />
              ) : (
                <span
                  className={styles.file}
                  onClick={() =>
                    onFileClick({ fileName: entryName, oid: entry.oid })
                  }
                >
                  <FaRegFileCode className={styles.icon} />
                  {entry.name}
                </span>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default FileTree
