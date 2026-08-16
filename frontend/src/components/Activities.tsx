import { Check, FlaskConical, Snowflake, Truck } from 'lucide-react'

const activities = [
  {
    number: '01',
    title: 'Collection',
    description: 'Milk is collected through the local farmer network.',
    icon: Check,
  },
  {
    number: '02',
    title: 'Testing',
    description: 'Milk is checked as part of the procurement process.',
    icon: FlaskConical,
  },
  {
    number: '03',
    title: 'Chilling',
    description: 'Milk is handled and preserved under controlled conditions.',
    icon: Snowflake,
  },
  {
    number: '04',
    title: 'Distribution',
    description: 'Milk moves through BS4G outlets toward customers.',
    icon: Truck,
  },
]

function Activities() {
  return (
    <section id="activities" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
              02 · What we do
            </div>

            <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
              From farm
              <br />
              to community.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-ink-soft">
              BS4G's work is built around a straightforward local procurement
              chain — connecting farmers, milk handling and distribution.
            </p>
          </div>

          <div className="border-t border-paper-line">
            {activities.map((activity) => {
              const Icon = activity.icon

              return (
                <div
                  key={activity.number}
                  className="group grid gap-5 border-b border-paper-line py-7 sm:grid-cols-[70px_55px_1fr] sm:items-center"
                >
                  <div className="font-mono text-xs text-brass">
                    {activity.number}
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center border border-paper-line bg-white text-ink transition group-hover:border-brass">
                    <Icon size={18} />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-ink">
                      {activity.title}
                    </h3>

                    <p className="mt-1 max-w-lg text-sm leading-6 text-ink-soft">
                      {activity.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Activities