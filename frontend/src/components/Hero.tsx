import { ArrowDown, ArrowUpRight } from 'lucide-react'
import LedgerStrip from './LedgerStrip'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cream blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-0 pt-20 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="max-w-4xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-brass" />

            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">
              Ghatboral · Humnabad · Bidar
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-5xl font-medium leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-8xl">
            Milk procurement,
            <br />
            <span className="text-brass">rooted in our farmers.</span>
          </h1>

          <div className="mt-8 flex max-w-2xl flex-col gap-7 sm:flex-row sm:items-end">
            <p className="max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
              BS4G Dairy FPO works with dairy farmers around Bidar, procuring
              approximately 3,500 litres of buffalo milk every day and
              connecting local production with customer needs.
            </p>

            <div className="hidden h-20 w-px bg-paper-line sm:block" />
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#requirement"
              className="group inline-flex items-center justify-center gap-3 bg-ink px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-ink-soft"
            >
              Request milk
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 border border-paper-line px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition hover:border-brass hover:text-brass"
            >
              Our story
              <ArrowDown size={15} />
            </a>
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Daily procurement ledger
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage">
              Active
            </span>
          </div>

          <LedgerStrip />
        </div>
      </div>
    </section>
  )
}

export default Hero