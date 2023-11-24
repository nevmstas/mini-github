import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'
import { Error } from '@/components'

const inter = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mini Github',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Error />
      </body>
    </html>
  )
}
