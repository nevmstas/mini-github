'use client'

import { Header } from '@/components'
import { ResponsivenessContextProvider } from '@/context/ResponsivenessContext'
import { AppContextProvider } from '@/context/AppContext'
import MaxWidthWrapper from '@/components/MaxWithWrapper'
import RepositoryBrowse from '@/components/RepositoryBrowse'

interface PageProps {
  params: {
    repoName: string
    owner: string
  }
}

export default function Page({ params }: PageProps) {
  const { repoName, owner } = params

  return (
    <ResponsivenessContextProvider>
      <AppContextProvider>
        <MaxWidthWrapper>
          <div>
            <Header title={`${owner}'s repository - ${repoName}`} />
            <RepositoryBrowse repoName={repoName} owner={owner} />
          </div>
        </MaxWidthWrapper>
      </AppContextProvider>
    </ResponsivenessContextProvider>
  )
}
