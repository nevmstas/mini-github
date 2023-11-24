'use client'
import {
  SearchRepositoryQuery,
  SearchResultItemEdge,
  getSdkClient,
} from '@/graphql'
import { useEffect, useState } from 'react'
import useDebounce from './useDebounce'
import { useAppContext } from '@/context/AppContext'

const useSearch = () => {
  const { setRepositories, setSearchLoading, setError } = useAppContext()
  const [text, setText] = useState('')
  const debouncedText = useDebounce(text, 500)

  useEffect(() => {
    const search = async () => {
      try {
        setSearchLoading(true)
        const sdkClient = getSdkClient()
        const data: SearchRepositoryQuery = await sdkClient.SearchRepository({
          query: debouncedText,
        })

        setRepositories((data?.search?.edges as SearchResultItemEdge[]) || [])
      } catch (e: any) {
        setError(e.message)
      } finally {
        setSearchLoading(false)
      }
    }

    search()
  }, [debouncedText])

  return {
    onSearch: setText,
  }
}

export default useSearch
