import {
  EB_Garamond,
  Great_Vibes,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google'
import AppShell from '@/components/AppShell'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
})

const TITLE = 'Apollo Labs | Cal High student research'
const DESCRIPTION =
  'Apollo Labs is a student-led lab at California High School where students work together on research projects, from hypothesis to write-up.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Apollo Labs',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Apollo Labs',
    'Apollo',
    'California High School',
    'Cal High',
    'student research',
    'high school research',
    'collaborative research',
    'machine learning research',
    'student-led lab',
  ],
  authors: [{ name: SITE_NAME }],
  // Icons and the social card come from the file conventions in `app/`:
  // icon.svg, apple-icon.jsx, opengraph-image.jsx. Declaring `icons` here would
  // override those and drop the apple-touch-icon link.
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: TITLE,
    description:
      'High school students building research, together. Founded by Samanyu Goyal, Ram Rithvik Pagadala, and Ashmit Pai.',
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
  themeColor: '#fafaf9',
  colorScheme: 'light',
}

// Runs before the page paints so the intro overlay never flashes the content
// behind it. The timeout is a failsafe: if hydration never happens, the cover
// clears itself rather than leaving a black screen.
const PRELOAD_SCRIPT = `(function(){try{var r=document.documentElement;var h=location.pathname==='/'||location.pathname==='';var s=null;try{s=window.sessionStorage.getItem('crc-seen')}catch(e){}var m=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(h&&!s&&!m){r.classList.add('crc-preload');setTimeout(function(){r.classList.remove('crc-preload')},6000)}}catch(e){}})()`

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ebGaramond.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${greatVibes.variable}`}
    >
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: PRELOAD_SCRIPT }} />
        <a href="#main" className="crc-skip-link">
          Skip to content
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
