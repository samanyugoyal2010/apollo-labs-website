export default function HeroVisual() {
  return (
    <div className="apollo-hero-visual-wrap relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center lg:max-w-none">
      <div className="apollo-hero-glow absolute inset-[5%] rounded-full" />

      <div className="absolute inset-0 rounded-full border border-black/[0.06] bg-white/40 shadow-[inset_0_0_40px_rgba(255,255,255,0.8)]" />
      <div
        className="apollo-orbit-visual absolute inset-[6%] rounded-full border border-black/[0.05]"
        style={{ animationDuration: '32s' }}
      />
      <div
        className="apollo-orbit-visual absolute inset-[18%] rounded-full border border-dashed border-black/15"
        style={{ animationDirection: 'reverse', animationDuration: '22s' }}
      />
      <div
        className="apollo-orbit-visual absolute inset-[32%] rounded-full border border-black/[0.08]"
        style={{ animationDuration: '16s' }}
      />

      <div className="apollo-hero-core relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-full">
        <span className="apollo-hero-core-letter text-[2.75rem] leading-none">A</span>
      </div>

      <div className="absolute top-[10%] right-[16%] h-3.5 w-3.5 rounded-full bg-[var(--apollo-text)] shadow-[0_0_12px_rgba(0,0,0,0.2)]" />
      <div className="absolute bottom-[18%] left-[10%] h-2.5 w-2.5 rounded-full bg-[var(--apollo-accent)] opacity-70 shadow-[0_0_10px_var(--apollo-accent-glow)]" />
      <div className="absolute top-[42%] left-[6%] h-2 w-2 rounded-full bg-black/25" />
      <div className="absolute bottom-[32%] right-[8%] h-2 w-2 rounded-full bg-black/15" />
    </div>
  )
}
