export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, background: '#0a0e27', color: '#fff' }}>
        {children}
      </body>
    </html>
  )
}
