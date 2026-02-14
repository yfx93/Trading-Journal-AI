import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SMT Trading Journal - Ultimate Edition',
  description: 'Professional SMT trading journal with advanced analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
