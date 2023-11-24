'use client'
import { useAppContext } from '@/context/AppContext'
import React from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Loader } from '..'
import { FaCode } from 'react-icons/fa'

import styles from './CodeScreen.module.scss'
import { useResponsivenessContext } from '@/context/ResponsivenessContext'

export default () => {
  const { choosenFile, loadingFile } = useAppContext()
  const escapedText = choosenFile.text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

  const { isSmallScreen } = useResponsivenessContext()

  const render = () => {
    if (!escapedText) return <FaCode size={100} className={styles.icon} />
    if (loadingFile) return <Loader />

    return (
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        customStyle={{
          borderRadius: '8px',
          width: isSmallScreen ? '300px' : '750px',
        }}
      >
        {escapedText}
      </SyntaxHighlighter>
    )
  }

  return <div className={styles.codeContainer}>{render()}</div>
}
