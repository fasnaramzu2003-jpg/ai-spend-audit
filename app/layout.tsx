import './globals.css'

export const metadata = {
  title: 'AI Spend Audit',
  description: 'AI Tool Savings Calculator',
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