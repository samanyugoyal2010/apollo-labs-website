export default function ResearchBoundary() {
  return (
    <section className="crc-boundaries" aria-labelledby="research-boundaries">
      <div className="crc-page-frame crc-boundary-grid">
        <div>
          <p className="crc-eyebrow">Research boundaries</p>
          <h2 id="research-boundaries">Working notes are not finished findings.</h2>
        </div>

        <div className="crc-boundary-notes">
          <article>
            <span>01</span>
            <h3>Medical limits</h3>
            <p>
              Atlas and Lambda are educational research projects. They do not provide
              medical advice, diagnosis, treatment, or prescribing decisions.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Public evidence</h3>
            <p>
              Missing sources, code, datasets, update dates, and results are marked as
              missing. A project note is not a publication.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
