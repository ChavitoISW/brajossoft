import '../styles/globals.css'

export const metadata = {
  title: 'BraJos Soft | Desarrollo de Sistemas y Diseño Web',
  description: 'BraJos Soft - Desarrollo de sistemas informáticos a la medida y diseño de páginas web profesionales',
  keywords: 'desarrollo software, sistemas a medida, diseño web, páginas web',
  authors: [{ name: 'BraJos Soft' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
