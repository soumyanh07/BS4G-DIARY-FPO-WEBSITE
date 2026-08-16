import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink">
                <span className="font-display text-lg font-semibold">B</span>
              </div>

              <div>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
                  BS4G
                </div>

                <div className="font-display text-lg font-semibold leading-none">
                  Dairy FPO
                </div>
              </div>
            </div>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/50">
              A dairy Farmer Producer Organization based at Ghatboral, near
              Humnabad, Bidar District, Karnataka.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-3">
            <div>
              <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-white/30">
                Navigate
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="#about"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  About
                </a>

                <a
                  href="#activities"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Activities
                </a>

                <a
                  href="#outlets"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Outlets
                </a>
              </div>
            </div>

            <div>
              <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-white/30">
                Connect
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="#connect"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Contact
                </a>

                <a
                  href="#requirement"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Milk requirement
                </a>

                <Link
                  to="/team"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  FPO Team
                </Link>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-white/30">
                At a glance
              </div>

              <div className="font-mono text-xs leading-7 text-white/60">
                <div>3,500 L / DAY</div>
                <div>7 OUTLETS</div>
                <div>8 DIRECTORS</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="font-mono text-[9px] uppercase tracking-wider text-white/30">
            © {new Date().getFullYear()} BS4G Dairy FPO
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-white/30">
            Ghatboral · Bidar · Karnataka
            <ArrowUpRight size={12} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer