import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router'
import { trail } from '../content/routes'
import { Arrow, Container, Eyebrow, Reveal } from './ui'
import why from '../assets/why.webp'
import about from '../assets/about.jpg'
import campaign from '../assets/campaign.jpg'
import hero from '../assets/hero.webp'

export const FALLBACKS = [why, about, campaign, hero]

let fb = 0
export function swapFallback(e: { currentTarget: HTMLImageElement }) {
  const el = e.currentTarget
  el.onerror = null
  el.src = FALLBACKS[fb++ % FALLBACKS.length]
}

const SITE = 'https://datadriven-services.com'
const SITE_NAME = 'DataDriven Services'
const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

export function useSeo(title: string, desc?: string, opts?: { canonical?: string; image?: string; type?: string }) {
  useEffect(() => {
    const fullTitle = /datadriven/i.test(title) ? title : `${title} | ${SITE_NAME}`
    const description = desc || `${SITE_NAME} – Award-winning digital marketing agency in Chennai offering email marketing, SEO, B2B data, and lead generation services.`
    const canonical = opts?.canonical || `${SITE}${window.location.pathname.replace(/\/+$/, '') || '/'}`
    const image = opts?.image || DEFAULT_OG_IMAGE
    const type = opts?.type || 'website'

    // ── Basic ──────────────────────────────────────────
    document.title = fullTitle
    setMeta('description', description)
    setMeta('robots', 'index, follow')
    setCanonical(canonical)

    // ── Open Graph ─────────────────────────────────────
    setMeta('og:type', type, 'property')
    setMeta('og:site_name', SITE_NAME, 'property')
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:image', image, 'property')
    setMeta('og:image:width', '1200', 'property')
    setMeta('og:image:height', '630', 'property')
    setMeta('og:locale', 'en_IN', 'property')

    // ── Twitter / X Card ───────────────────────────────
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:site', '@datadrivensvc')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', image)
  }, [title, desc, opts?.canonical, opts?.image, opts?.type])
}

export function Breadcrumbs({ path, dark = false }: { path: string; dark?: boolean }) {
  const items = trail(path)
  return (
    <nav aria-label="Breadcrumb" className="mb-6 lg:mb-7">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11.5px] uppercase tracking-[0.14em] ${dark ? 'text-paper/70' : 'text-mute'}`}>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-ember">/</span>}
            {c.to ? (
              <Link to={c.to} className="transition-colors hover:text-ember-deep">{c.label}</Link>
            ) : (
              <span aria-current="page" className={`max-w-[60vw] truncate ${dark ? 'text-paper' : 'text-ink'}`}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export type Shape = 'soft' | 'arch' | 'wide'

export function Photo({ src, alt = '', shape = 'soft', className = '', priority = false }: { src: string; alt?: string; shape?: Shape; className?: string; priority?: boolean }) {
  const r = shape === 'arch' ? 'rounded-t-[999px] rounded-b-[2rem]' : 'rounded-[2rem]'
  const a = shape === 'arch' ? 'aspect-[4/5]' : shape === 'wide' ? 'aspect-[16/10]' : 'aspect-[5/4]'
  return (
    <div className={`overflow-hidden bg-stone shadow-lift ring-1 ring-white ${r} ${className}`}>
      <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} className={`${a} w-full object-cover`} onError={swapFallback} />
    </div>
  )
}

export function PageHero({
  path, eyebrow, title, lead, image, imageAlt, shape = 'soft', children, dark = false,
}: {
  path: string; eyebrow?: string; title: string; lead?: ReactNode; image?: string; imageAlt?: string; shape?: Shape; children?: ReactNode; dark?: boolean
}) {
  return (
    <section className={`overflow-hidden ${dark ? 'bg-ink text-paper' : 'hero-glow text-ink'}`}>
      <Container className="pb-10 pt-6 lg:pb-14 lg:pt-8">
        <Breadcrumbs path={path} dark={dark} />
        <div className={`grid items-start gap-8 lg:gap-12 ${image ? 'lg:min-h-[380px] lg:grid-cols-12' : ''}`}>
          <div className={image ? 'lg:col-span-7' : 'max-w-5xl'}>
            {eyebrow && <div className="hero-in"><Eyebrow dark={dark}>{eyebrow}</Eyebrow></div>}
            <h1 className="hero-in font-display text-[clamp(1.62rem,4.6vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.035em] [text-wrap:balance]" style={{ ['--d' as string]: '80ms' }}>
              {title}
            </h1>
            {lead && (
              <p className={`hero-in mt-7 max-w-2xl text-[15.5px] leading-[1.8] lg:text-[16px] ${dark ? 'text-paper/75' : 'text-ink/70'}`} style={{ ['--d' as string]: '200ms' }}>
                {lead}
              </p>
            )}
            {children && <div className="hero-in mt-9 flex flex-wrap items-center gap-4" style={{ ['--d' as string]: '320ms' }}>{children}</div>}

          </div>
          {image && (
            <div className="img-reveal lg:col-span-5" style={{ ['--d' as string]: '160ms' }}>
              <Photo src={image} alt={imageAlt} shape="soft" priority />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export const TONES = ['bg-white', 'bg-paper', 'bg-stone'] as const

export function Sect({ tone = 'bg-paper', children, className = '', id, labelledBy }: { tone?: string; children: ReactNode; className?: string; id?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tone} py-10 lg:py-14 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionTitle({ eyebrow, children, id, className = '' }: { eyebrow?: string; children: ReactNode; id?: string; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="font-display text-[clamp(1.37rem,3.2vw,2.07rem)] font-bold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]">
        {children}
      </h2>
    </div>
  )
}

export function Rich({ text, className = '' }: { text: string; className?: string }) {
  const m = text.match(/^([^:.!?]{3,60}):\s+(\S[\s\S]{40,})$/)
  return (
    <p className={`text-[15.5px] leading-[1.85] text-ink/75 ${className}`}>
      {m ? (<><strong className="font-semibold text-ink">{m[1]}:</strong> {m[2]}</>) : text}
    </p>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((it) => (
        <li key={it} className="flex gap-4 text-[14.5px] leading-[1.7] text-ink/80">
          <span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-ember" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`group inline-flex min-h-11 items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:text-ember-deep ${className}`}>
      {children}
      <Arrow className="transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

export function Stat({ n, l, dark }: { n: string; l: string; dark?: boolean }) {
  return (
    <div>
      <div className="font-display text-[clamp(2.03rem,5.5vw,3.69rem)] font-bold leading-[0.95] tracking-[-0.045em]">{n}<span className="text-ember">+</span></div>
      <div className={`mt-3 font-mono text-[11px] uppercase tracking-[0.18em] ${dark ? 'text-paper/75' : 'text-mute'}`}>{l}</div>
    </div>
  )
}

export function StatsBand() {
  return (
    <Sect tone="bg-paper" className="!py-6 lg:!py-8">
      <Reveal>
        <ul className="grid grid-cols-2 gap-y-10 pastel-band rounded-[2rem] px-8 py-10 text-ink shadow-card sm:px-14 lg:grid-cols-4 lg:py-12">
          {[['100', 'Trusted Clients'], ['250', 'Projects Completed'], ['5', 'Years Of Experience'], ['15', 'Professionals']].map(([n, l]) => (
            <li key={l}><Stat n={n} l={l} /></li>
          ))}
        </ul>
      </Reveal>
    </Sect>
  )
}
