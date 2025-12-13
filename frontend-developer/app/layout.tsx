import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProviderWrapper } from './auth/AuthProviderWrapper'
import { ErrorProvider } from './contexts/ErrorContext'

import { ThemeProvider } from './contexts/ThemeContext'
import { AgentConfigProvider } from './contexts/AgentConfigContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Developer Dashboard',
  description: 'Developer Dashboard for managing agents, phone numbers, and configurations',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${inter.className} dark:bg-gray-900 dark:text-white min-h-screen overflow-x-hidden`}>

        <ThemeProvider>
          <>
          <>
              <ErrorProvider>
                
                  {children}
                
              </ErrorProvider>
            </>
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
