import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GYM-PLATFORM',
  description: 'The Darik Developer',
  generator: 'The Darik Developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  )
}
