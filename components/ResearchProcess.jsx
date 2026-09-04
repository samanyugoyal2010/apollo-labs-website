import { PROCESS_STEPS } from '@/lib/data'

export default function ResearchProcess() {
  return (
    <section id="process" className="crc-process" data-scene="process">
      <div className="crc-page-frame crc-process-layout">
        <div className="crc-process-intro">
          <p className="crc-eyebrow">The research process</p>
          <h2>Every claim needs a trace.</h2>
          <p>
            A useful project note shows what the team is asking, what it plans to do,
            what evidence exists, and what remains uncertain.
          </p>
          <div className="crc-process-key">
            <span />
            Scroll through the four parts of a record
          </div>
        </div>

        <ol className="crc-process-steps">
          {PROCESS_STEPS.map((step) => (
            <li key={step.id} className="crc-process-step" data-process-step={step.id}>
              <span className="crc-process-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="crc-process-output">Output: {step.output}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
