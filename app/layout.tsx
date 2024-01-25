import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans} from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import ModalProvider from '@/components/providers/modal-provider'
import { SocketProvider } from '@/components/providers/socket-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord clone',
  description: 'This is a clone of discord!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
       <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <body
      className={font.className}>
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SocketProvider>
            <ModalProvider />
            {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
    </>
  )
}
