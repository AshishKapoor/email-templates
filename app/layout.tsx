import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Email Generator Pro',
  description: 'Created by Sannty',
  generator: 'sannty.in',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
