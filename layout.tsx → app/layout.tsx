export const metadata = {
  title: 'SMT Trading Journal',
  description: 'Trading journal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0a0e27', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}
