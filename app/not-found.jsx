import Link from 'next/link'
import CRCMark from '@/components/CRCMark'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <div className="crc-site">
      <Nav />
      <main id="main" className="crc-not-found">
        <div className="crc-page-frame crc-not-found-layout">
          <div>
            <p className="crc-eyebrow">404</p>
            <h1>This page is not in the record.</h1>
            <p>The address may have changed, or the page may no longer exist.</p>
            <Link href="/" className="crc-button crc-button-primary">
              Return home
            </Link>
          </div>
          <CRCMark priority sizes="(max-width: 767px) 68vw, 440px" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
