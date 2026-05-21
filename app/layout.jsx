import {
  EB_Garamond,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google'
import AppShell from '@/components/AppShell'
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

export const metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Apollo Labs — Student-led collaborative research',
  description:
    'Apollo Labs is a student-led organization where high school students collaborate on shared research projects — from hypothesis to write-up.',
  openGraph: {
    title: 'Apollo Labs — Student-led collaborative research',
    description:
      'High school students building research, together. Founded by Samanyu Goyal, Ram Rithvik Pagadala, and Ashmit Pai.',
    siteName: 'Apollo Labs',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ebGaramond.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
