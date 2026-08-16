import { ArrowUpRight, MapPin } from 'lucide-react'

const outlets = [
  {
    number: '01',
    name: 'BS4G Outlet',
    area: 'Bidar',
  },
  {
    number: '02',
    name: 'BS4G Outlet',
    area: 'Bidar',
  },
  {
    number: '03',
    name: 'BS4G Outlet',
    area: 'Bidar',
  },
  {
    number: '04',
    name: 'BS4G Outlet',
    area: 'Bidar',
  },
  {
    number: '05',
    name: 'BS4G Outlet',
    area: 'Bidar',
  },
  {
    number: '06',
    name: 'BS4G Outlet',
    area: 'Bidar',
  },
  {
    number: '07',
    name: 'BS4G Outlet',
    area: 'Bidar',
  },
]

function Outlets() {
  return (
    <section id="outlets" className="bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
              03 · Local presence
            </div>

            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              Seven points
              <br />
              around Bidar.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              BS4G currently has seven outlets around Bidar supporting its
              milk-related activities.
            </p>

            <div className="mt-8 flex items-center gap-3 border-l border-brass pl-4">
              <MapPin size={17} className="text-brass" />

              <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">
                Outlet details to be confirmed by BS4G
              </span>
            </div>
          </div>

          <div className="border-t border-white/15">
            {outlets.map((outlet) => (
              <div
                key={outlet.number}
                className="group grid grid-cols-[45px_1fr_auto] items-center gap-4 border-b border-white/15 py-5 transition hover:bg-white/[0.03] sm:grid-cols-[60px_1fr_140px_30px]"
              >
                <span className="font-mono text-xs text-brass">
                  {outlet.number}
                </span>

                <div>
                  <div className="font-display text-xl text-white">
                    {outlet.name}
                  </div>

                  <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-white/40 sm:hidden">
                    {outlet.area}
                  </div>
                </div>

                <div className="hidden font-mono text-[10px] uppercase tracking-widest text-white/40 sm:block">
                  {outlet.area}
                </div>

                <ArrowUpRight
                  size={15}
                  className="text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border border-white/15 bg-white/[0.03] px-5 py-4">
          <p className="font-mono text-[10px] leading-5 text-white/50">
            NOTE · Outlet names and exact locations are placeholders pending
            confirmation from the BS4G Dairy FPO team. No unverified location
            information is being represented as official.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Outlets