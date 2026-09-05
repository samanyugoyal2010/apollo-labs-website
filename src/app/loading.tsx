export default function Loading() {
  return (
    <section
      className="route-loading gutter"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="route-loading__content">
        <div>
          <p className="mono-label text-signal-text">Apollo Labs · Loading</p>
          <p className="t-sub mt-4 text-paper">Preparing the next view</p>
          <p className="t-meta mt-2 max-w-[32ch] text-muted">
            Pulling the latest work into place.
          </p>
        </div>
        <div className="route-loading__meter" aria-hidden="true">
          <span className="route-loading__signal" />
        </div>
      </div>
    </section>
  );
}
