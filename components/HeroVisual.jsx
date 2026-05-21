export default function HeroVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-[var(--apollo-border)] opacity-60" />
      <div className="apollo-orbit-visual absolute inset-8 rounded-full border border-dashed border-black/20" />
      <div
        className="apollo-orbit-visual absolute inset-16 rounded-full border border-[var(--apollo-border)]"
        style={{ animationDirection: 'reverse', animationDuration: '18s' }}
      />
      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--apollo-surface)] border border-black/15 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
        <span className="font-display text-3xl text-black">A</span>
      </div>
      <div className="absolute top-[12%] right-[18%] h-3 w-3 rounded-full bg-black opacity-80" />
      <div className="absolute bottom-[20%] left-[12%] h-2 w-2 rounded-full bg-black/30" />
      <div className="absolute top-[45%] left-[8%] h-2 w-2 rounded-full bg-black/20" />
    </div>
  )
}
