import '../styles/globals.css'

export const metadata = {
  title: {
    default: 'BraJos Soft | Desarrollo de Software a Medida en Costa Rica',
    template: '%s | BraJos Soft'
  },
  description: 'Empresa costarricense especializada en desarrollo de software a medida, sistemas ERP, aplicaciones web y móviles. Transformamos ideas en soluciones digitales innovadoras.',
  keywords: [
    'desarrollo software costa rica',
    'sistemas a medida',
    'diseño web costa rica',
    'desarrollo web alajuela',
    'aplicaciones empresariales',
    'software personalizado',
    'ERP costa rica',
    'Next.js',
    'React'
  ],
  authors: [{ name: 'BraJos Soft', url: 'https://brajossoft.com' }],
  creator: 'BraJos Soft',
  publisher: 'BraJos Soft',
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://brajossoft.com',
    siteName: 'BraJos Soft',
    title: 'BraJos Soft | Desarrollo de Software a Medida',
    description: 'Empresa costarricense especializada en desarrollo de software a medida y soluciones digitales innovadoras.',
    images: [
      {
        url: 'https://brajossoft.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'BraJos Soft Logo'
      }
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'BraJos Soft | Desarrollo de Software a Medida',
    description: 'Soluciones digitales innovadoras en Costa Rica',
    images: ['https://brajossoft.com/logo.png'],
  },
  
  // Verificación y robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  
  // Verificación
  verification: {
    google: 'ABC123XYZ...', // 👈 Pegar solo el contenido del content="..." aquí
  },
  
  // Otros
  alternates: {
    canonical: 'https://brajossoft.com',
  },
  category: 'technology',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  // Datos estructurados JSON-LD para SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BraJos Soft',
    description: 'Empresa especializada en desarrollo de software a medida y soluciones digitales',
    url: 'https://brajossoft.com',
    logo: 'https://brajossoft.com/logo.png',
    email: 'contacto@brajossoft.com',
    telephone: '+50661000702',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Alajuela',
      addressCountry: 'CR'
    },
    sameAs: [
      'https://www.facebook.com/share/1CKc69FPCD/',
      'https://wa.me/50662787954'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+50661000702',
      contactType: 'customer service',
      email: 'contacto@brajossoft.com',
      availableLanguage: ['Spanish', 'English']
    },
    areaServed: {
      '@type': 'Country',
      name: 'Costa Rica'
    },
    knowsAbout: [
      'Desarrollo de Software',
      'Sistemas ERP',
      'Aplicaciones Web',
      'Diseño Web',
      'Next.js',
      'React'
    ]
  }

  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
        
        {/* Datos estructurados JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
