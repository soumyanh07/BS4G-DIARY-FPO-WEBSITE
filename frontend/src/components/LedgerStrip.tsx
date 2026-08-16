import { useEffect, useRef, useState } from 'react'

interface StatProps {
  value: number
  suffix?: string
  label: string
  prefix?: string
}

function Counter({ value, suffix = '', label, prefix = '' }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.4 },
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const duration = 1000
    const start = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(eased * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [started, value])

  return (
    <div ref={ref} className="px-5 py-7 sm:px-8">
      <div className="font-mono text-3xl font-semibold tracking-tight text-ink">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>

      <div className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </div>
    </div>
  )
}

function LedgerStrip() {
  return (
    <div className="border-y border-paper-line bg-cream">
      <div className="mx-auto grid max-w-7xl divide-y divide-paper-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        <Counter value={3500} suffix=" L" label="Milk procured / day" />
        <Counter value={7} label="Outlets around Bidar" />
        <Counter value={8} label="Board members" />

        <div className="px-5 py-7 sm:px-8">
          <div className="font-mono text-3xl font-semibold tracking-tight text-ink">
            FPO
          </div>

          <div className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
            Farmer producer organization
          </div>
        </div>
      </div>
    </div>
  )
}

export default LedgerStrip