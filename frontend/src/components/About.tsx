import { Building2, Milk, Users } from 'lucide-react'

function About() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <div className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
            01 · About BS4G
          </div>

          <h2 className="max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            A farmer-owned organization with a local purpose.
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-8 text-ink-soft">
            BS4G Dairy FPO is a Farmer Producer Organization based at Ghatboral,
            near Humnabad in Bidar District, Karnataka. The organization works
            with dairy farmers and primarily focuses on buffalo milk
            procurement.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-8 text-ink-soft">
            With approximately 3,500 litres of milk procured every day and a
            presence through seven outlets around Bidar, BS4G connects local
            dairy production with the communities it serves.
          </p>

          <div className="mt-10 grid gap-px border border-paper-line bg-paper-line sm:grid-cols-3">
            <div className="bg-white p-5">
              <Users size={20} className="text-brass" />

              <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                Leadership
              </div>

              <div className="mt-2 font-display text-lg text-ink">
                8 Directors
              </div>
            </div>

            <div className="bg-white p-5">
              <Milk size={20} className="text-brass" />

              <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                Focus
              </div>

              <div className="mt-2 font-display text-lg text-ink">
                Buffalo milk
              </div>
            </div>

            <div className="bg-white p-5">
              <Building2 size={20} className="text-brass" />

              <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                President
              </div>

              <div className="mt-2 font-display text-lg text-ink">
                Shashanka Salunkai
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[440px] overflow-hidden bg-cream p-8 sm:p-12">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-0 top-24 h-px w-full bg-paper-line" />
            <div className="absolute left-0 top-48 h-px w-full bg-paper-line" />
            <div className="absolute left-0 top-72 h-px w-full bg-paper-line" />
            <div className="absolute left-0 top-96 h-px w-full bg-paper-line" />
          </div>

          <div className="relative flex h-full flex-col justify-between">
            <div className="flex justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                Procurement record
              </span>

              <span className="font-mono text-[10px] text-ink-soft">
                BS4G / 001
              </span>
            </div>

            <div className="flex items-center justify-center py-10">
              <svg
                viewBox="0 0 260 320"
                className="h-72 w-56 text-ink"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M87 63h86" />
                <path d="M102 63v-18c0-9 7-16 16-16h24c9 0 16 7 16 16v18" />
                <path d="M72 78c0-8 7-15 15-15h86c8 0 15 7 15 15v174c0 18-15 33-33 33h-50c-18 0-33-15-33-33V78Z" />
                <path d="M72 96h116" />
                <path d="M72 239h116" />
                <path d="M92 96v143" opacity=".35" />
                <path d="M168 96v143" opacity=".35" />
                <path d="M108 157h44" />
                <path d="M130 135v44" />
                <path d="M117 223h26" />
              </svg>
            </div>

            <div className="flex items-end justify-between border-t border-paper-line pt-5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                  Daily volume
                </div>

                <div className="mt-1 font-mono text-2xl font-semibold text-ink">
                  3,500 L
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                  Location
                </div>

                <div className="mt-1 font-mono text-xs text-ink">
                  GHATBORAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About