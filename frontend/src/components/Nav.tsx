import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Activities', href: '#activities' },
  { label: 'Outlets', href: '#outlets' },
  { label: 'Connect', href: '#connect' },
]

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-paper-line/60 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white">
            <span className="font-display text-lg font-semibold">B</span>
          </div>

          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
              BS4G
            </div>
            <div className="font-display text-lg font-semibold leading-none text-ink">
              Dairy FPO
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-ink-soft transition hover:text-brass"
            >
              {link.label}
            </a>
          ))}

          <Link
            to="/team"
            className="font-mono text-xs uppercase tracking-wider text-ink-soft transition hover:text-brass"
          >
            FPO Team
          </Link>

          <a
            href="#requirement"
            className="group flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-ink-soft"
          >
            Submit requirement
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center border border-paper-line text-ink lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-paper-line bg-white px-5 py-5 lg:hidden">
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-paper-line py-4 font-mono text-xs uppercase tracking-wider text-ink"
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/team"
              onClick={() => setOpen(false)}
              className="border-b border-paper-line py-4 font-mono text-xs uppercase tracking-wider text-ink"
            >
              FPO Team
            </Link>

            <a
              href="#requirement"
              onClick={() => setOpen(false)}
              className="mt-5 bg-ink px-5 py-4 text-center font-mono text-xs font-semibold uppercase tracking-wider text-white"
            >
              Submit milk requirement
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Nav