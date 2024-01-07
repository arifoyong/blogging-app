import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
 
import './globals.css'
import { cn } from "@/lib/utils"

import ThemeProvider from '@/provider/theme-provider'
import NextAuthProvider from '@/provider/next-auth-provider'
import GlobalState  from '@/context'
import Header from '@/components/header'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Blogging Application',
  description: 'Blogging Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextAuthProvider>
              <GlobalState>
                <Header/>
                {children}
              </GlobalState>
            </NextAuthProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
