import { useMemo, useState, type ReactNode } from 'react'
import { Link, Navigate, useLocation } from 'react-router'
import { img as imgUrl, pageFor, resolve, type Block } from '../content/site'
import { ROUTES, SERVICE_GROUPS, byPath, linkFor, type Route } from '../content/routes'
import { Button, Container, ContactForm, Eyebrow, QuoteMark, Reveal, Arrow } from './ui'
import { swapFallback, Breadcrumbs, CheckList, FALLBACKS, Photo, PageHero, Rich, Sect, SectionTitle, StatsBand, TextLink, useSeo } from './page'
import { ExploreChips, Flow, LongForm, IntroProse, ItemRows, Sections, clean, fallbackImg, parse, shapeFor, type Group } from './blocks'
import { Clients } from './sections-a'
import sivasakthi from '../assets/sivasakthi.jpg'
import { getSeo } from '../content/seo'
import { HERO_IMAGES } from '../content/heroImages'

function useRoute(): Route {
  const { pathname } = useLocation()
  return byPath(pathname.replace(/\/+$/, '') || '/') as Route
}

function usePage(r: Route) {
  const page = pageFor(r.path)
  if (!page) throw new Error('missing page ' + r.path)
  // Use our hand-crafted SEO titles/descs; fall back to CMS page data if not found
  const seo = getSeo(r.path)
  useSeo(seo.title, seo.desc)
  return page
}

const heroActions = (
  <>
    <Button href="/contact">Contact Us</Button>
    <Button href="/book-a-meeting" variant="outline">Book a Meeting</Button>
  </>
)

/* ---------- D / E: Service detail, data service, overview ---------- */
export function ServicePage() {
  const r = useRoute()
  const page = usePage(r)
  const n = ROUTES.indexOf(r)
  const p = useMemo(() => parse(page, r.label), [page, r.label])
  const siblings = ROUTES.filter((x) => x.kind === r.kind && x.path !== r.path && (r.kind === 'overview' || x.parent === r.parent))
  const chips = r.kind === 'overview' ? [] : siblings.map((x) => ({ label: x.label, path: x.path }))
  return (
    <>
      <PageHero path={r.path} eyebrow={p.eyebrow} title={p.title} lead={p.lead} image={HERO_IMAGES[r.path] || fallbackImg(n)} imageAlt={p.imageAlt || p.title} shape={shapeFor(n)}>
        {heroActions}
      </PageHero>
      {r.path === '/linkedin-marketing' ? (
        <LongForm intro={p.intro} sections={p.sections} />
      ) : (
        <>
          <IntroProse blocks={p.intro} />
          <Sections sections={p.sections} start={p.intro.length ? 1 : 0} />
        </>
      )}
      {chips.length > 0 && <ExploreChips items={chips} title={r.parent === '/other-services' ? 'More Other Services' : r.kind === 'data' ? 'More Data Services' : 'Explore More Services'} />}
      {r.kind === 'overview' && <ExploreChips items={SERVICE_GROUPS.filter((g) => g.path !== r.path).map((g) => ({ label: g.label, path: g.path }))} title="Also Explore" />}
    </>
  )
}

export function OtherServicesPage() {
  const r = useRoute()
  useSeo('Other Services', 'Email deliverability, B2B and B2C email marketing, virtual assistant and relationship building services from DataDriven.')
  const gs: Group[] = SERVICE_GROUPS[1].items.map((it) => {
    const pg = pageFor(it.path)!
    const pr = parse(pg, it.label)
    return { image: pr.image ? { t: 'img', src: pr.image, alt: pr.imageAlt } : undefined, title: it.label, href: it.path, body: pr.lead ? [{ t: 'p', x: pr.lead }] : [] }
  })
  return (
    <>
      <PageHero path={r.path} eyebrow="Our Services" title="Other Services" image={HERO_IMAGES[r.path] || FALLBACKS[0]} shape="arch">
        {heroActions}
      </PageHero>
      <Sect tone="bg-white"><ItemRows gs={gs} offset={2} /></Sect>
      <ExploreChips items={[{ label: SERVICE_GROUPS[0].label, path: SERVICE_GROUPS[0].path }]} title="Also Explore" />
    </>
  )
}

/* ---------- B: About ---------- */
export function AboutPage() {
  const r = useRoute()
  const page = usePage(r)
  const p = useMemo(() => parse(page, r.label), [page, r.label])
  return (
    <>
      <PageHero path={r.path} eyebrow="About DataDriven" title={p.title} lead={p.lead} image={FALLBACKS[1]} imageAlt="Team gathered around a laptop in a planning session" shape="arch">
        <Button href="/our-team">Our Team</Button>
        <Button href="/contact" variant="outline">Contact Us</Button>
      </PageHero>
      <IntroProse blocks={p.intro} />
      <StatsBand />
      <Sections sections={p.sections} start={1} />
      <Clients />
    </>
  )
}

/* ---------- Team ---------- */
const TEAM = ['Karthik', 'Kumaresan', 'RajKumar', 'Sivasakthi']
const SIVA = { name: 'Sivasakthi', role: 'Jr Web Developer', src: sivasakthi, alt: 'Sivasakthi' }
const unquote = (t?: string) => (t || '').replace(/^[“"]\s*/, '').replace(/\s*[”"]$/, '')

export function TeamPage() {
  const r = useRoute()
  const page = usePage(r)
  const bl = useMemo(() => clean(page.blocks), [page])
  const intro = bl.find((b) => b.t === 'p')?.x
  const lead = bl.find((b, k) => b.t === 'p' && bl[k - 1]?.t === 'h2' && /Meet With/i.test(bl[k - 1].x || ''))?.x
  const members = useMemo(() => {
    const out: { name: string; role: string; src?: string; alt?: string }[] = []
    let img: Block | undefined
    for (let k = 0; k < bl.length; k++) {
      const b = bl[k]
      if (b.t === 'img') { img = b; continue }
      if (b.t === 'h3' && TEAM.includes(b.x || '') && bl[k + 1]?.t === 'p' && !out.some((m) => m.name === b.x)) {
        out.push({ name: b.x || '', role: bl[k + 1].x || '', src: img ? imgUrl(img.src) : undefined, alt: b.x })
        img = undefined
      }
    }
    out.push(SIVA)
    return TEAM.map((n) => out.find((m) => m.name === n)!).filter(Boolean)
  }, [bl])
  const wi = bl.findIndex((b) => b.t === 'h2' && /Best Creative/i.test(b.x || ''))
  const who = bl[wi]?.x
  const whoText = unquote(bl[wi + 1]?.x)
  const pillars = bl.slice(wi + 2).reduce<{ t: string; x: string }[]>((acc, b, k, arr) => {
    if (b.t === 'h3' && arr[k + 1]?.t === 'p') acc.push({ t: (b.x || '').replace(/^Efective/, 'Effective'), x: unquote(arr[k + 1].x).replace(/"$/, '') })
    return acc
  }, [])
  const cta = bl.find((b) => b.t === 'btn' && b.l)
  return (
    <>
      <section className="bg-paper text-ink">
        <Container className="pb-12 pt-8 lg:pb-16 lg:pt-10">
          <Breadcrumbs path={r.path} />
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="hero-in"><Eyebrow>Our Team</Eyebrow></div>
              <h1 className="hero-in font-display text-[clamp(1.77rem,5.2vw,3.62rem)] font-bold leading-[1] tracking-[-0.04em] [text-wrap:balance]" style={{ ['--d' as string]: '80ms' }}>
                Meet With Professional <span className="text-ember-deep">Team</span>
              </h1>
            </div>
            <div className="hero-in space-y-4 lg:col-span-5" style={{ ['--d' as string]: '200ms' }}>
              {lead && <p className="text-[15.5px] leading-[1.75] text-ink/75">{lead}</p>}
              {intro && <p className="text-[16px] leading-[1.75] text-ink/60">{intro}</p>}
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white pb-14 pt-4 lg:pb-20">
        <Container>
          <ul className="mx-auto grid max-w-[1180px] gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {members.map((m, i) => (
              <li key={m.name} className="mx-auto w-full max-w-sm sm:max-w-none">
                <Reveal delay={(i % 4) * 70}>
                  <div className="group">
                    <div className="overflow-hidden rounded-[1.5rem] bg-stone shadow-card">
                      <img src={m.src} alt={m.alt || m.name} loading="lazy" className={`aspect-[4/5] w-full object-cover object-[50%_18%] transition-transform duration-700 ${m.name === 'Kumaresan' ? 'origin-[50%_32%] scale-[1.7] group-hover:scale-[1.75]' : 'group-hover:scale-[1.04]'}`} />
                    </div>
                    <h3 className="mt-5 font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] transition-colors group-hover:text-ember-deep">{m.name}</h3>
                    <p className="mt-1 text-[14.5px] text-mute">{m.role}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      {who && (
        <Sect tone="bg-paper">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <SectionTitle eyebrow="Who We Are">{who}</SectionTitle>
              <p className="mt-6 max-w-xl text-[15.5px] leading-[1.8] text-ink/75">{whoText}</p>
              {cta && <div className="mt-8"><Button href="/case-studies">{cta.l}</Button></div>}
            </Reveal>
            <div className="space-y-8 lg:col-span-6 lg:pt-8">
              {pillars.map((p, i) => (
                <Reveal key={p.t} delay={i * 80}>
                  <div className="flex gap-5">
                    <span className="mt-1 font-mono text-[12px] tracking-[0.2em] text-ember-deep">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.02em]">{p.t}</h3>
                      <p className="mt-2 max-w-lg text-[15px] leading-[1.75] text-ink/70">{p.x}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Sect>
      )}
    </>
  )
}

/* ---------- Testimonials band (case studies) ---------- */
function Testimonials({ items }: { items: { q: string; role: string; name: string; src?: string }[] }) {
  const [i, setI] = useState(0)
  const t = items[i]
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="min-w-0 lg:col-span-4">
        <ul className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Testimonials">
          {items.map((x, k) => (
            <li key={x.name} className="shrink-0">
              <button role="tab" aria-selected={k === i} onClick={() => setI(k)} className={`flex min-h-14 w-full items-center gap-4 rounded-full py-2 pl-2 pr-6 text-left transition ${k === i ? 'bg-white shadow-card' : 'hover:bg-white/60'}`}>
                {x.src ? <img src={imgUrl(x.src)} alt="" className="h-10 w-10 rounded-full bg-stone object-cover" /> : <span className="h-10 w-10 rounded-full bg-ember/20" />}
                <span className="text-[14.5px] font-semibold">{x.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 lg:col-span-8">
        <figure key={i} className="hero-in rounded-[2rem] bg-white p-8 shadow-card sm:p-12">
          <QuoteMark className="mb-6 h-8 w-11 text-ember" />
          <blockquote className="font-display text-[clamp(1.05rem,2vw,1.3rem)] font-medium leading-[1.4] tracking-[-0.015em]">{t.q}</blockquote>
          <figcaption className="mt-8">
            <div className="font-semibold">{t.name}</div>
            <div className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.14em] text-mute">{t.role}</div>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

/* ---------- F: Case study list ---------- */
function caseMeta(path: string) {
  const pg = pageFor(path)
  if (!pg) return {}
  const bl = clean(pg.blocks)
  const ci = bl.findIndex((b) => b.t === 'h3' && b.x === 'Category')
  const pr = parse(pg)
  const image = bl.find((b) => b.t === 'img' && !/-1024x(122|181)/.test(b.src || ''))
  return { cat: ci >= 0 ? bl[ci + 1]?.x : undefined, lead: pr.lead, image: image?.src, alt: image?.alt }
}

export function CaseListPage() {
  const r = useRoute()
  const page = usePage(r)
  const p = useMemo(() => parse(page, r.label), [page, r.label])
  const bl = clean(page.blocks)
  const cards = bl.filter((b) => b.t === 'h3').map((b) => ({ title: b.x || '', to: b.href ? resolve(b.href).to : undefined }))
  const ti = bl.findIndex((b) => b.t === 'h2' && /clients say/i.test(b.x || ''))
  const tb = ti >= 0 ? bl.slice(ti + 1) : []
  const tl = tb.findIndex((b) => b.t === 'p')
  const items: { q: string; role: string; name: string; src?: string }[] = []
  for (let k = tl + 1; k < tb.length; k++) {
    if (tb[k].t === 'p' && tb[k + 1]?.t === 'img' && tb[k + 2]?.t === 'p') {
      items.push({ q: tb[k].x || '', src: tb[k + 1].src, name: tb[k + 1].alt || 'Client', role: tb[k + 2].x || '' })
      k += 2
    }
  }
  const sec = p.sections.find((s) => /Discover Solutions/i.test(s.title || ''))
  return (
    <>
      <PageHero path={r.path} eyebrow="Our Case Studies" title={p.title} lead={p.lead} image={FALLBACKS[2]} shape="wide">
        <Button href="/contact">Contact Us</Button>
      </PageHero>
      <Sect tone="bg-white">
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12">
          <SectionTitle className="lg:col-span-7">{sec?.title}</SectionTitle>
          <p className="text-[15.5px] leading-[1.8] text-ink/70 lg:col-span-5 lg:pt-8">{sec?.blocks.find((b) => b.t === 'p')?.x}</p>
        </div>
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {cards.map((c, i) => {
            const m = c.to ? caseMeta(c.to) : {}
            const src = m.image ? imgUrl(m.image) : fallbackImg(i)
            const inner = (
              <>
                <div className="overflow-hidden rounded-[2rem] bg-stone shadow-card">
                  <img src={src} alt={m.alt || c.title} loading="lazy" className={`w-full object-cover transition-transform duration-[1200ms] ${c.to ? 'group-hover:scale-105' : ''} ${i % 3 === 0 ? 'aspect-[16/11]' : 'aspect-[16/9]'}`} onError={swapFallback} />
                </div>
                {m.cat && <span className="mt-6 inline-block rounded-full bg-ember/15 px-3.5 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-ember-deep">{m.cat}</span>}
                <h3 className="mt-4 font-display text-[clamp(1.11rem,2.4vw,1.55rem)] font-bold leading-[1.1] tracking-[-0.03em]">{c.title}</h3>
                {m.lead && <p className="mt-3 max-w-xl text-[16px] leading-[1.75] text-ink/70">{m.lead}</p>}
                {c.to && <span className="mt-5 inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink group-hover:text-ember-deep">View Case Study <Arrow className="transition-transform group-hover:translate-x-1" /></span>}
              </>
            )
            return (
              <li key={c.title} className={i % 2 ? 'md:mt-16' : ''}>
                <Reveal>{c.to ? <Link to={c.to} className="group block">{inner}</Link> : <div>{inner}</div>}</Reveal>
              </li>
            )
          })}
        </ul>
      </Sect>
      {items.length > 0 && (
        <Sect tone="bg-stone">
          <SectionTitle eyebrow="Testimonials" className="mb-12 max-w-3xl">What our clients say About Us</SectionTitle>
          <Testimonials items={items} />
        </Sect>
      )}
    </>
  )
}

/* ---------- G: Case study detail ---------- */
export function CaseDetailPage() {
  const r = useRoute()
  const page = usePage(r)
  const bl = clean(page.blocks)
  const lead = bl.find((b) => b.t === 'p')?.x
  const ci = bl.findIndex((b) => b.t === 'h3' && b.x === 'Client')
  const body = bl.slice(bl.findIndex((b) => b.t === 'h2', 1) + 1, ci < 0 ? undefined : ci)
  const metaEnd = bl.findIndex((b, k) => k > ci && (b.t === 'img' || b.t === 'btn'))
  const metaBl = ci < 0 ? [] : bl.slice(ci, metaEnd < 0 ? undefined : metaEnd)
  const meta: [string, string][] = []
  for (let k = 0; k < metaBl.length; k += 2) {
    const l = metaBl[k].x || ''
    meta.push([/\d{4}/.test(l) ? 'Date' : l.replace(/:$/, ''), metaBl[k + 1]?.x || ''])
  }
  const shots = bl.filter((b) => b.t === 'img')
  const secs: { label: string; blocks: Block[] }[] = []
  for (const b of body) {
    if (b.t === 'h3') secs.push({ label: (b.x || '').replace(/:$/, ''), blocks: [] })
    else secs[secs.length - 1]?.blocks.push(b)
  }
  const cat = meta.find(([l]) => l === 'Category')?.[1]
  const idx = ROUTES.filter((x) => x.kind === 'case')
  const at = idx.findIndex((x) => x.path === r.path)
  const nextRoute = idx[(at + 1) % idx.length]
  return (
    <>
      <PageHero path={r.path} eyebrow={cat || 'Case Study'} title={bl[0]?.x || r.label} lead={lead} />
      <Sect tone="bg-white" className="!pt-6 lg:!pt-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-14 lg:col-span-8">
            {secs.map((s) => (
              <Reveal key={s.label}>
                <h2 className="mb-5 flex items-center gap-3 font-display text-[clamp(1.18rem,2.6vw,1.62rem)] font-bold tracking-[-0.03em]">
                  <span className="h-2.5 w-2.5 rounded-full bg-ember" aria-hidden />{s.label}
                </h2>
                <Flow blocks={s.blocks} />
              </Reveal>
            ))}
          </div>
          {meta.length > 0 && (
            <aside className="lg:col-span-4">
              <dl className="rounded-[2rem] bg-stone p-7 shadow-card lg:sticky lg:top-28 sm:p-9">
                {meta.map(([l, v]) => (
                  <div key={l} className="py-3.5 first:pt-0 last:pb-0">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{l}</dt>
                    <dd className="mt-1.5 text-[15px] font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>
      </Sect>
      {shots.length > 0 && (
        <Sect tone="bg-paper">
          <div className="mx-auto grid max-w-5xl gap-6">
            {shots.map((s, i) => (
              <Reveal key={i}><img src={imgUrl(s.src)} alt={s.alt || `${bl[0]?.x} result ${i + 1}`} loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} className="mx-auto h-auto max-h-[80vh] w-auto max-w-full rounded-[1.5rem] bg-white shadow-card" /></Reveal>
            ))}
          </div>
        </Sect>
      )}
      <Sect tone="bg-white" className="!py-14 lg:!py-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <TextLink to="/case-studies">All Case Studies</TextLink>
          {nextRoute && <Button href={nextRoute.path} variant="dark">Next Case Study</Button>}
        </div>
      </Sect>
    </>
  )
}

/* ---------- H: Blog list ---------- */
type Post = { title: string; to: string; src?: string; alt?: string; excerpt?: string }
function posts(): Post[] {
  const bl = clean(pageFor('/blog')!.blocks)
  const out: Post[] = []
  let img: Block | undefined
  for (let k = 0; k < bl.length; k++) {
    if (bl[k].t === 'img') img = bl[k]
    else if (bl[k].t === 'h3' && bl[k].href) {
      out.push({ title: bl[k].x || '', to: resolve(bl[k].href).to, src: img?.src, alt: img?.alt, excerpt: bl[k + 1]?.t === 'p' ? bl[k + 1].x : undefined })
      img = undefined
    }
  }
  return out
}

export function BlogListPage() {
  const r = useRoute()
  const page = usePage(r)
  const p = useMemo(() => parse(page, r.label), [page, r.label])
  const list = useMemo(posts, [])
  const [f, ...rest] = list
  return (
    <>
      <PageHero path={r.path} eyebrow="Our Blog" title={p.title} lead={p.lead} />
      <Sect tone="bg-white" className="!pt-4">
        <SectionTitle eyebrow="Our Blog" className="mb-12">Latest Blog &amp; Articles</SectionTitle>
        {f && (
          <Reveal>
            <Link to={f.to} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <div className="overflow-hidden rounded-[2rem] bg-stone shadow-lift lg:col-span-7">
                <img src={imgUrl(f.src)} alt={f.alt || f.title} className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="lg:col-span-5">
                <h3 className="font-display text-[clamp(1.29rem,3vw,2.03rem)] font-bold leading-[1.06] tracking-[-0.03em] [text-wrap:balance]">{f.title}</h3>
                {f.excerpt && <p className="mt-5 text-[15.5px] leading-[1.8] text-ink/70">{f.excerpt}</p>}
                <span className="mt-6 inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em] group-hover:text-ember-deep">Read More <Arrow className="transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>
        )}
        <ul className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((x, i) => (
            <li key={x.to}>
              <Reveal delay={(i % 3) * 80}>
                <Link to={x.to} className="group block">
                  <div className="overflow-hidden rounded-[1.75rem] bg-stone shadow-card">
                    <img src={imgUrl(x.src)} alt={x.alt || x.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" onError={swapFallback} />
                  </div>
                  <h3 className="mt-5 font-display text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.02em] group-hover:text-ember-deep">{x.title}</h3>
                  {x.excerpt && <p className="mt-3 line-clamp-3 text-[14.5px] leading-[1.7] text-ink/70">{x.excerpt}</p>}
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Sect>
    </>
  )
}

/* ---------- I: Blog detail ---------- */
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function BlogPostPage() {
  const r = useRoute()
  const page = usePage(r)
  const bl = clean(page.blocks)
  const title = bl.find((b) => b.t === 'h1')?.x || r.label
  const cut = bl.findIndex((b) => b.t === 'h2' && /Leave a Reply|More Tips/i.test(b.x || ''))
  const main = bl.slice(0, cut < 0 ? undefined : cut).filter((b) => b.t !== 'h1')
  const cover = main.find((b) => b.t === 'img')
  const body = main.filter((b) => b !== cover && !(b.t === 'h4' && /table of contents/i.test(b.x || '')) && !(b.t === 'h3' && /^Latest Posts$/i.test(b.x || '')))
  const toc = body.filter((b) => b.t === 'h2' || b.t === 'h3').map((b) => ({ id: slug(b.x || ''), label: b.x || '', sub: b.t === 'h3' }))
  const related = posts().filter((x) => x.to !== r.path).slice(0, 3)
  return (
    <>
      <section className="bg-paper">
        <Container className="pb-12 pt-8 lg:pb-16 lg:pt-10">
          <Breadcrumbs path={r.path} />
          <h1 className="hero-in max-w-4xl font-display text-[clamp(1.55rem,4.4vw,2.95rem)] font-bold leading-[1.04] tracking-[-0.035em] [text-wrap:balance]">{title}</h1>
        </Container>
        {cover && (
          <Container>
            <div className="img-reveal overflow-hidden rounded-[2rem] bg-stone shadow-lift">
              <img src={imgUrl(cover.src)} alt={cover.alt || title} className="aspect-[16/8] w-full object-cover" onError={swapFallback} />
            </div>
          </Container>
        )}
      </section>
      <Sect tone="bg-paper" className="!pt-14 lg:!pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {toc.length > 0 && (
            <nav aria-label="Table of Contents" className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Table of Contents</div>
                <ul className="space-y-1">
                  {toc.map((t) => (
                    <li key={t.id}><a href={`#${t.id}`} className={`block rounded-lg py-1.5 text-[14px] leading-snug text-ink/70 transition hover:text-ember-deep ${t.sub ? 'pl-4' : 'font-semibold'}`}>{t.label}</a></li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
          <article className={`min-w-0 break-words ${toc.length ? 'lg:col-span-8' : 'lg:col-span-8 lg:col-start-3'}`}>
            <div className="max-w-[44rem] space-y-6">
              {body.map((b, i) => {
                switch (b.t) {
                  case 'h2': return <h2 key={i} id={slug(b.x || '')} className="scroll-mt-28 pt-8 font-display text-[clamp(1.25rem,2.8vw,1.77rem)] font-bold leading-[1.1] tracking-[-0.03em]">{b.x}</h2>
                  case 'h3': return <h3 key={i} id={slug(b.x || '')} className="scroll-mt-28 pt-6 font-display text-[clamp(1.05rem,2.1vw,1.3rem)] font-semibold leading-[1.2] tracking-[-0.02em]">{b.x}</h3>
                  case 'p': return <Rich key={i} text={b.x || ''} className="!text-[16px] !leading-[1.9]" />
                  case 'ul': return <CheckList key={i} items={b.items || []} />
                  case 'img': return <img key={i} src={imgUrl(b.src)} alt={b.alt || ''} loading="lazy" className="h-auto w-full rounded-[1.5rem] bg-stone" onError={swapFallback} />
                  case 'h4': return <h4 key={i} className="pt-3 font-display text-[1.25rem] font-semibold">{b.x}</h4>
                  case 'btn': return <div key={i}><Button href={resolve(b.href).to}>{b.l}</Button></div>
                  default: return null
                }
              })}
            </div>
          </article>
        </div>
      </Sect>
      <Sect tone="bg-stone">
        <SectionTitle eyebrow="Our Blog" className="mb-12">More Tips</SectionTitle>
        <ul className="grid gap-8 md:grid-cols-3">
          {related.map((x) => (
            <li key={x.to}>
              <Link to={x.to} className="group block">
                <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-card"><img src={imgUrl(x.src)} alt={x.alt || x.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" onError={swapFallback} /></div>
                <h3 className="mt-5 font-display text-[1.3rem] font-semibold leading-[1.15] tracking-[-0.02em] group-hover:text-ember-deep">{x.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12"><TextLink to="/blog">All Articles</TextLink></div>
      </Sect>
    </>
  )
}

/* ---------- Portfolio ---------- */
type Work = { src?: string; alt?: string; play: boolean; title: string; desc: string }

export function PortfolioPage() {
  const r = useRoute()
  const page = usePage(r)
  const p = useMemo(() => parse(page, r.label), [page, r.label])
  const [filter, setFilter] = useState<'All' | 'Videos' | 'Image Posts'>('All')
  const works = useMemo(() => {
    const bl = clean(page.blocks)
    const start = bl.findIndex((b) => b.t === 'ul') + 1
    const out: Work[] = []
    let cur: Work | null = null
    for (const b of bl.slice(start)) {
      if (b.t === 'img') {
        if (cur && (cur.title || cur.desc)) cur = null
        cur = { src: b.src, alt: b.alt, play: false, title: '', desc: '' }
        out.push(cur)
      } else if (b.t === 'play' && cur) cur.play = true
      else if (b.t === 'p') {
        if (!cur || cur.desc) { cur = { play: false, title: '', desc: '' }; out.push(cur) }
        if (!cur.title) cur.title = b.x || ''
        else cur.desc = b.x || ''
      }
    }
    return out.filter((w) => w.title)
  }, [page])
  const shown = works.filter((w) => filter === 'All' || (filter === 'Videos' ? w.play : !w.play))
  const chip = (on: boolean) => `inline-flex min-h-11 items-center rounded-full px-5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] transition ${on ? 'bg-navy text-white' : 'bg-white text-ink shadow-card hover:bg-ember hover:text-white'}`
  return (
    <>
      <PageHero path={r.path} eyebrow="Our Portfolio" title={p.title} lead={p.lead} />
      <Sect tone="bg-stone" className="!pt-12 lg:!pt-16">
        <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label="Filter portfolio">
          {(['All', 'Videos', 'Image Posts'] as const).map((c) => (
            <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c} className={chip(filter === c)}>{c}</button>
          ))}
          <Link to="/portfolio/websites" className={chip(false)}>Websites</Link>
          <Link to="/portfolio/digital-vcards" className={chip(false)}>Digital VCards</Link>
        </div>
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6">
          {shown.map((w, i) => (
            <li key={w.title + i} className="break-inside-avoid">
              <figure className="group overflow-hidden rounded-[1.75rem] bg-white shadow-card transition hover:shadow-lift">
                {w.src && (
                  <div className="relative overflow-hidden bg-stone">
                    <img src={imgUrl(w.src)} alt={w.alt || w.title} loading="lazy" className="h-auto w-full transition-transform duration-[1200ms] group-hover:scale-[1.04]" onError={swapFallback} />
                    {w.play && (
                      <span className="absolute inset-0 flex items-center justify-center" aria-label="Video">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ink shadow-lift"><svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                      </span>
                    )}
                  </div>
                )}
                <figcaption className="p-6">
                  <h3 className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.01em]">{w.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-ink/70">{w.desc}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Sect>
    </>
  )
}

function SiteShot({ href, label }: { href: string; label: string }) {
  const [bad, setBad] = useState(false)
  const host = href.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-stone shadow-card">
      {!bad && (
        <img src={`https://image.thum.io/get/width/1000/crop/760/noanimate/${href}`} alt={`${label} website preview`} loading="lazy" onError={() => setBad(true)} className="h-full w-full object-cover object-top transition-transform duration-[1400ms] group-hover:scale-105" />
      )}
      {bad && (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-ember/10 p-6 text-center">
          <span className="break-all font-display text-2xl font-bold tracking-[-0.03em] text-ember-deep sm:text-3xl">{host}</span>
        </div>
      )}
    </div>
  )
}

export function SitesPage() {
  const r = useRoute()
  const page = usePage(r)
  const p = useMemo(() => parse(page, r.label), [page, r.label])
  const bl = clean(page.blocks)
  const items: { title: string; href: string; label: string }[] = []
  for (let k = 0; k < bl.length; k++) {
    if (bl[k].t === 'h3' && bl[k + 1]?.t === 'btn') {
      const href = bl[k + 1].href || ''
      const rr = resolve(href)
      items.push({ title: bl[k].x || '', href: !rr.external && rr.to === r.path ? 'https://datadriven-services.com/vcard/' : rr.to, label: bl[k + 1].l || 'View' })
    }
  }
  return (
    <>
      <PageHero path={r.path} eyebrow="Our Portfolio" title={p.title} lead={p.lead}>
        <Button href="/portfolio" variant="outline">All Portfolio</Button>
      </PageHero>
      <Sect tone="bg-white" className="!pt-6">
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {items.map((it, i) => (
            <li key={it.title + i} className={i % 2 ? 'md:mt-14' : ''}>
              <Reveal>
                <a href={it.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <SiteShot href={it.href} label={it.title} />
                  <h3 className="mt-6 font-display text-[clamp(1.05rem,2.2vw,1.4rem)] font-bold leading-[1.1] tracking-[-0.025em]">{it.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em] group-hover:text-ember-deep">{it.label} <Arrow className="transition-transform group-hover:translate-x-1" /></span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Sect>
    </>
  )
}

/* ---------- J: Contact + Book ---------- */
export function ContactPage() {
  const r = useRoute()
  const page = usePage(r)
  const p = useMemo(() => parse(page, r.label), [page, r.label])
  const sec = p.sections.find((s) => s.title === 'Get More Information')
  const offices: { h: string; t: string }[] = []
  const bl = sec?.blocks || []
  for (let k = 0; k < bl.length; k++) if (bl[k].t === 'h4' && bl[k + 1]?.t === 'p') offices.push({ h: bl[k].x || '', t: bl[k + 1].x || '' })
  return (
    <>
      <PageHero path={r.path} eyebrow="Contact Us" title={p.title} lead={p.lead} />
      <Sect tone="bg-white" className="!pt-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="pastel-band rounded-[2rem] p-7 text-ink shadow-card sm:p-12">
              <h2 className="mb-8 font-display text-[clamp(1.33rem,3vw,1.92rem)] font-bold tracking-[-0.03em]">Lead Generation <span className="text-ember">Made Easy!</span></h2>
              <ContactForm />
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionTitle eyebrow="Contact Us">{sec?.title}</SectionTitle>
            {sec?.blocks[0]?.t === 'p' && <p className="mt-5 text-[15px] leading-[1.8] text-ink/70">{sec.blocks[0].x}</p>}
            <div className="mt-10 space-y-8">
              {offices.map((o) => (
                <div key={o.h}>
                  <h3 className="font-display text-[1.35rem] font-semibold tracking-[-0.02em]">{o.h}</h3>
                  <p className="mt-2 text-[16px] leading-[1.7] text-ink/75">{o.t}</p>
                </div>
              ))}
              <div>
                <h3 className="font-display text-[1.35rem] font-semibold tracking-[-0.02em]">Work Hours</h3>
                <p className="mt-2 text-[16px] text-ink/75">10 AM - 07 PM , Monday - Friday</p>
              </div>
              <div className="flex flex-col items-start gap-1 text-[16px]">
                <a href="mailto:karthik@datadriven-services.com" className="py-1 font-semibold transition-colors hover:text-ember-deep">Email Us</a>
                <a href="tel:+919500087415" className="py-1 font-semibold transition-colors hover:text-ember-deep">Call Us</a>
              </div>
              <Button href="/book-a-meeting" variant="dark">Book a Meeting</Button>
            </div>
          </div>
        </div>
      </Sect>
    </>
  )
}

export function BookPage() {
  const r = useRoute()
  const seo = getSeo(r.path)
  useSeo(seo.title, seo.desc)
  return (
    <>
      <PageHero path={r.path} eyebrow="Contact Us" title="Book a Meeting" lead="Contact us for a free consultation to take your business to the next level.">
        <Button href="https://calendly.com/karthiks26/121" variant="outline">Open in Calendly</Button>
      </PageHero>
      <Sect tone="bg-white" className="!pt-4">
        <div className="overflow-hidden rounded-[2rem] bg-stone shadow-lift">
          <iframe title="Book a meeting with DataDriven" src="https://calendly.com/karthiks26/121?hide_gdpr_banner=1&background_color=efece5" className="h-[760px] w-full border-0" loading="lazy" />
        </div>
        <p className="mt-8 text-center text-[15px] text-mute">Prefer to write? <Link to="/contact" className="font-semibold text-ink underline decoration-ember decoration-2 underline-offset-4">Submit the form</Link></p>
      </Sect>
    </>
  )
}

/* ---------- K: Simple content / policy ---------- */
export function PolicyPage() {
  const r = useRoute()
  const page = usePage(r)
  const bl = clean(page.blocks)
  const title = bl[0]?.x || r.label
  type S = { h?: string; blocks: Block[] }
  const secs: S[] = [{ blocks: [] }]
  for (const b of bl.slice(1)) {
    const x = b.x || ''
    if (b.t === 'p' && x.length < 60 && !/[.:;,]$/.test(x)) secs.push({ h: x, blocks: [] })
    else secs[secs.length - 1].blocks.push(b)
  }
  const named = secs.filter((s) => s.h)
  return (
    <>
      <PageHero path={r.path} eyebrow="Legal" title={title} />
      <Sect tone="bg-white" className="!pt-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <ul className="sticky top-28 space-y-1">
              {named.map((s) => <li key={s.h}><a href={`#${slug(s.h!)}`} className="block py-1.5 text-[14px] text-ink/70 transition hover:text-ember-deep">{s.h}</a></li>)}
            </ul>
          </nav>
          <article className="max-w-[46rem] space-y-10 lg:col-span-8">
            {secs.map((s, i) => (
              <div key={i}>
                {s.h && <h2 id={slug(s.h)} className="mb-4 scroll-mt-28 font-display text-[clamp(1.11rem,2.4vw,1.48rem)] font-bold tracking-[-0.025em]">{s.h}</h2>}
                <Flow blocks={s.blocks} />
              </div>
            ))}
          </article>
        </div>
      </Sect>
    </>
  )
}

export function WritePage() {
  const r = useRoute()
  const page = usePage(r)
  const p = useMemo(() => parse(page, r.label), [page, r.label])
  const h4 = clean(page.blocks).find((b) => b.t === 'h4')?.x
  return (
    <>
      <PageHero path={r.path} eyebrow="Company" title={p.title} lead={p.lead} image={p.image ? imgUrl(p.image) : FALLBACKS[3]} imageAlt={p.imageAlt || p.title} shape="soft" />
      <IntroProse blocks={p.intro} />
      <Sect tone="bg-stone">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-7 shadow-card sm:p-12">
          <h2 className="mb-8 font-display text-[clamp(1.18rem,2.6vw,1.62rem)] font-bold tracking-[-0.03em]">{h4}</h2>
          <ContactForm light />
        </div>
      </Sect>
    </>
  )
}

export function FaqPage() {
  const r = useRoute()
  const seo = getSeo(r.path)
  useSeo(seo.title, seo.desc)
  return (
    <>
      <PageHero path={r.path} eyebrow="Useful Links" title={r.label === 'FAQ' ? 'Frequently Asked Questions' : r.label}>
        <Button href="/contact">Contact Us</Button>
        <Button href="/book-a-meeting" variant="outline">Book a Meeting</Button>
      </PageHero>
    </>
  )
}

export const Redirect = ({ to }: { to: string }) => <Navigate to={to} replace />
export type { ReactNode }
export { linkFor, Eyebrow }
