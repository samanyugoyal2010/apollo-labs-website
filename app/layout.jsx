import { IBM_Plex_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const TITLE = 'Collaborative Research Club | California High School'
const DESCRIPTION =
  'Collaborative Research Club is a student-led club at California High School documenting three student research projects.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Collaborative Research Club',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Collaborative Research Club',
    'CRC',
    'California High School',
    'Cal High',
    'student research',
  ],
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f2efe8',
  colorScheme: 'light',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="crc-skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
