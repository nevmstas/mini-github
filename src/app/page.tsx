import { Header, RepositoriesList, Search } from '@/components'
import { FaGithubAlt } from 'react-icons/fa'
import styles from './Home.module.scss'
import { ResponsivenessContextProvider } from '@/context/ResponsivenessContext'
import { AppContextProvider } from '@/context/AppContext'
import MaxWidthWrapper from '@/components/MaxWithWrapper'

export default async function Home() {
  return (
    <main>
      <ResponsivenessContextProvider>
        <AppContextProvider>
          <MaxWidthWrapper>
            <FaGithubAlt size={100} className={styles.githubIcon} />
            <Header title="MINI GITHUB" />
            <Search />
            <RepositoriesList />
          </MaxWidthWrapper>
        </AppContextProvider>
      </ResponsivenessContextProvider>
    </main>
  )
}
