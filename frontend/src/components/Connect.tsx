import { ArrowUpRight, MapPin, MessageCircle, Users } from 'lucide-react'

const cards = [
  {
    icon: MapPin,
    label: 'Head office',
    title: 'Ghatboral',
    text: 'Near Humnabad, Bidar District, Karnataka.',
    action: 'View location',
  },
  {
    icon: Users,
    label: 'Leadership',
    title: 'Mr. Shashanka Salunkai',
    text: 'President · Board of Directors: 8 members.',
    action: 'About the team',
  },
  {
    icon: MessageCircle,
    label: 'Phone / WhatsApp',
    title: 'Contact details',
    text: 'Phone and WhatsApp number to be added by BS4G.',
    action: 'Number pending',
  },
]

function Connect() {
  return (
    <section id="connect" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
              04 · Connect
            </div>

            <h2 className="mt-5 font-display text-4xl text-ink sm:text-5xl">
              Start a conversation.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-ink-soft">
            Looking for a regular milk supply? Send your requirement and the
            BS4G team can follow up with you.
          </p>
        </div>

        <div className="grid gap-px border border-paper-line bg-paper-line md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.label}
                className="group bg-white p-7 transition hover:bg-cream sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <Icon size={20} className="text-brass" />

                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink-soft">
                    {card.label}
                  </span>
                </div>

                <h3 className="mt-12 font-display text-2xl text-ink">
                  {card.title}
                </h3>

                <p className="mt-3 min-h-[50px] text-sm leading-6 text-ink-soft">
                  {card.text}
                </p>

                <div className="mt-7 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-brass">
                  {card.action}
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Connect