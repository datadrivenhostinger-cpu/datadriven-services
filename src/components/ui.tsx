import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

export const SITE = '/'

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal ${seen ? 'is-in' : ''} ${className}`} style={{ ['--d' as string]: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function CountUp({ to }: { to: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(to)
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1600, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return <span ref={ref}>{n}</span>
}

export const Arrow = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`h-4 w-4 shrink-0 ${className}`} aria-hidden>
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
)

type BtnProps = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'dark' | 'outline' | 'outline-light'
  className?: string
  type?: 'button' | 'submit'
}
const V = {
  primary: 'bg-navy text-white hover:bg-ember-deep hover:text-white',
  dark: 'bg-navy text-white hover:bg-ember-deep hover:text-white',
  outline: 'border border-ink/15 bg-white text-ink hover:border-ember hover:text-ember-deep',
  'outline-light': 'border border-ink/15 bg-white text-ink hover:border-ember hover:text-ember-deep',
}
export function Button({ children, href, variant = 'primary', className = '', type = 'button' }: BtnProps) {
  const cls = `group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-7 text-[15px] font-bold shadow-[0_8px_20px_-10px_rgb(19_18_16/0.35)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${V[variant]} ${className}`
  const inner = (
    <>
      {children}
      <Arrow className="transition-transform duration-300 group-hover/btn:translate-x-1" />
    </>
  )
  return href ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <button type={type} className={cls}>{inner}</button>
  )
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean; n?: string }) {
  return (
    <div className={`mb-5 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-[13px] ${dark ? 'bg-white/10 text-paper' : 'bg-white text-ink shadow-card'}`}>
      <span className="h-2 w-2 rounded-full bg-ember" />
      {children}
    </div>
  )
}

export function H2({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <h2 className={`font-display text-[clamp(1.66rem,5vw,3.14rem)] font-bold leading-[1.05] tracking-[-0.03em] ${dark ? 'text-paper' : 'text-ink'} ${className}`}>
      {children}
    </h2>
  )
}

export const Lead = ({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) => (
  <p className={`text-[15.5px] leading-[1.75] ${dark ? 'text-paper/70' : 'text-ink/70'} ${className}`}>{children}</p>
)

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-14 ${className}`}>{children}</div>
)

export const QuoteMark = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 48 36" className={className} fill="currentColor" aria-hidden>
    <path d="M0 36V20C0 8 6 1.5 18 0v7c-6 1.2-8.6 4.6-8.6 9H18v20H0Zm27 0V20C27 8 33 1.5 45 0v7c-6 1.2-8.6 4.6-8.6 9H45v20H27Z" />
  </svg>
)

const fieldDark =
  'w-full rounded-2xl border-0 bg-paper/10 px-5 py-4 text-[16px] text-paper outline-none transition placeholder:text-paper/55 focus:bg-paper/15 focus:ring-2 focus:ring-ember'
const fieldLight =
  'w-full rounded-2xl border-0 bg-stone px-5 py-4 text-[16px] text-ink outline-none transition placeholder:text-ink/50 focus:bg-white focus:ring-2 focus:ring-ember'

export function ContactForm({ light = false }: { light?: boolean }) {
  const field = light ? fieldLight : fieldDark
  const uid = useId()
  const [sent, setSent] = useState(false)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="grid gap-3"
    >
      {[
        ['Name', 'text', 'name'],
        ['Email', 'email', 'email'],
        ['Phone Number', 'tel', 'tel'],
      ].map(([l, t, a]) => (
        <div key={l}>
          <label className="sr-only" htmlFor={`${uid}-${a}`}>{l}</label>
          <input id={`${uid}-${a}`} type={t} autoComplete={a} required placeholder={l} className={field} />
        </div>
      ))}
      <label className="sr-only" htmlFor={`${uid}-msg`}>Message</label>
      <textarea id={`${uid}-msg`} required rows={3} placeholder="Message" className={`${field} resize-none`} />
      <div className="mt-6">
        <Button type="submit">{sent ? 'Sent' : 'Send'}</Button>
      </div>
    </form>
  )
}

const ico = (d: ReactNode) => (
  <svg viewBox="0 0 32 32" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden>
    {d}
  </svg>
)
export const ICONS: Record<string, ReactNode> = {
  data: ico(<><ellipse cx="16" cy="8" rx="9" ry="3.5" /><path d="M7 8v8c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V8M7 16v8c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5v-8" /></>),
  marketing: ico(<><circle cx="14" cy="14" r="8" /><path d="m20 20 7 7M10 16l3-3 2 2 3-4" /></>),
  email: ico(<><rect x="3" y="7" width="26" height="18" /><path d="m4 9 12 9 12-9" /></>),
  relation: ico(<><circle cx="11" cy="12" r="4" /><circle cx="22" cy="12" r="4" /><path d="M3 26c0-4 3.5-7 8-7 1.5 0 3 .4 4 1M17 26c0-4 2.5-7 6-7s6 3 6 7" /></>),
  wp: ico(<><rect x="3" y="5" width="26" height="22" /><path d="M3 11h26M9 17l-2 3 2 3M23 17l2 3-2 3M17 16l-2 8" /></>),
  va: ico(<><path d="M6 18v-3a10 10 0 0 1 20 0v3" /><rect x="4" y="17" width="5" height="8" /><rect x="23" y="17" width="5" height="8" /><path d="M26 25c0 2-3 3-7 3" /></>),
  shield: ico(<><path d="M16 3 5 7v8c0 7 5 11 11 14 6-3 11-7 11-14V7L16 3Z" /><path d="m11 16 4 4 6-8" /></>),
  growth: ico(<><path d="M4 27h24M6 21l6-6 5 4 9-11" /><path d="M20 8h6v6" /></>),
  team: ico(<><circle cx="16" cy="10" r="4" /><path d="M7 27c0-5 4-9 9-9s9 4 9 9" /></>),
}
