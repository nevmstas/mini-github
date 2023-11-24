'use client'
import { SearchResultItemEdge, getSdkClient } from '@/graphql'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

const noop = () => {}
const asyncNoop = async () => {}

interface LoadFileProps {
  owner: string
  repoName: string
  oid: string
  fileName: string
}

interface IFile {
  name: string
  text: string
}

interface IAppContext {
  repositories: SearchResultItemEdge[]
  setRepositories: (repositories: SearchResultItemEdge[]) => void
  loadFile: (props: LoadFileProps) => Promise<void>
  choosenFile: IFile
  loadingFile: boolean
  setSearchLoading: (props: boolean) => void
  searchLoading: boolean
  setError: (props: string) => void
  error: string
}

const initialData: IAppContext = {
  repositories: [],
  setRepositories: noop,
  loadFile: asyncNoop,
  choosenFile: { name: '', text: '' },
  loadingFile: false,
  setSearchLoading: noop,
  searchLoading: false,
  setError: noop,
  error: '',
}

const AppContext = createContext<IAppContext>(initialData)

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [repositories, setRepositories] = useState<SearchResultItemEdge[]>([])
  const [searchLoading, setSearchLoading] = useState<boolean>(false)

  const [choosenFile, setChoosenFile] = useState<IFile>({ name: '', text: '' })
  const [loadingFile, setLoadingFile] = useState(false)

  const [error, setError] = useState('')

  const _loadFile = async ({
    owner,
    repoName,
    oid,
    fileName,
  }: LoadFileProps) => {
    try {
      setLoadingFile(true)
      const sdkClient = getSdkClient()
      const data = await sdkClient.GetFileText({
        owner,
        repoName,
        fileOid: oid,
      })
      if (data.repository?.object && 'text' in data.repository.object)
        setChoosenFile({
          name: fileName,
          text: data.repository?.object.text || '',
        })
    } catch (e) {
      setError('Something went wrong!')
    } finally {
      setLoadingFile(false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        repositories,
        setRepositories,
        loadFile: _loadFile,
        setSearchLoading,
        searchLoading,
        choosenFile,
        loadingFile,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
