import { Link } from 'react-router'
import { img as imgUrl, resolve, type Block, type Page } from '../content/site'
import { linkFor } from '../content/routes'
import { Button, Container, Eyebrow, Reveal } from './ui'
import { CheckList, FALLBACKS, Photo, Rich, Sect, SectionTitle, TextLink, type Shape } from './page'
import { HERO_IMAGES } from '../content/heroImages'

export type Sec = { eyebrow?: string; title?: string; blocks: Block[] }
export type Parsed = { eyebrow?: string; title: string; lead?: string; image?: string; imageAlt?: string; intro: Block[]; sections: Sec[] }

const isNum = (b?: Block) => !!b && b.t === 'h2' && /^\d{1,2}$/.test((b.x || '').trim())
const isHead = (b?: Block) => !!b && ['h1', 'h2', 'h3', 'h4', 'h5'].includes(b.t)

function isVsSec(sec: Sec): boolean {
  if (sec.title?.trim().toUpperCase() === 'VS') return true
  if (!sec.title && sec.blocks.length <= 1 && sec.blocks[0]?.x?.trim().toUpperCase() === 'VS') return true
  return false
}

export function clean(blocks: Block[]) {
  const out: Block[] = []
  for (const b of blocks) {
    if (b.t === 'p' && /^Lorem ipsum/i.test(b.x || '')) continue
    if (b.t === 'btn' && !b.l) continue
    if (b.t === 'img' && /arrow\.png|play-icon/i.test(b.src || '')) continue
    const prev = out[out.length - 1]
    if (prev && prev.t === b.t && prev.x === b.x && prev.src === b.src && (b.x || b.src)) continue
    out.push(b)
  }
  return out
}

export function parse(page: Page, fallbackTitle = ''): Parsed {
  const bl = clean(page.blocks)
  let i = 0
  let eyebrow: string | undefined
  if (bl[0]?.t === 'h5' && ['h1', 'h2'].includes(bl[1]?.t)) {
    eyebrow = bl[0].x
    i = 1
  }
  let title = fallbackTitle
  if (bl[i] && ['h1', 'h2'].includes(bl[i].t)) {
    title = bl[i].x || fallbackTitle
    i++
  }
  while (bl[i] && ['h1', 'h2'].includes(bl[i].t) && bl[i].x === title) i++
  const intro: Block[] = []
  while (i < bl.length && !isHead(bl[i]) && bl[i].t !== 'btn') intro.push(bl[i++])
  const leadIdx = intro.findIndex((b) => b.t === 'p')
  const imgIdx = intro.findIndex((b) => b.t === 'img')
  const lead = leadIdx >= 0 ? intro[leadIdx].x : undefined
  const image = imgIdx >= 0 ? intro[imgIdx].src : undefined
  const imageAlt = imgIdx >= 0 ? intro[imgIdx].alt : undefined
  const rest = intro.filter((_, k) => k !== leadIdx && k !== imgIdx)

  const sections: Sec[] = []
  let cur: Sec | null = null
  let pend: string | undefined
  for (; i < bl.length; i++) {
    const b = bl[i]
    if (b.t === 'h5' && bl[i + 1]?.t === 'h2' && !isNum(bl[i + 1])) {
      pend = b.x
      continue
    }
    if ((b.t === 'h2' || b.t === 'h1') && !isNum(b)) {
      cur = { eyebrow: pend, title: b.x, blocks: [] }
      pend = undefined
      sections.push(cur)
      continue
    }
    if (!cur) {
      cur = { blocks: [] }
      sections.push(cur)
    }
    cur.blocks.push(b)
  }
  return { eyebrow, title, lead, image, imageAlt, intro: rest, sections: sections.filter((s) => s.blocks.length || s.title) }
}

export const shapeFor = (n: number): Shape => (['soft', 'arch', 'wide'] as Shape[])[n % 3]
export const fallbackImg = (n: number) => FALLBACKS[n % FALLBACKS.length]

function BtnBlock({ b }: { b: Block }) {
  const r = resolve(b.href)
  return <Button href={r.external ? r.to : r.to}>{b.l}</Button>
}

export function Flow({ blocks, className = '' }: { blocks: Block[]; className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p': return <Rich key={i} text={b.x || ''} />
          case 'ul': return <CheckList key={i} items={b.items || []} />
          case 'h3': return <h3 key={i} className="pt-4 font-display text-[clamp(1.05rem,2.2vw,1.37rem)] font-semibold leading-[1.15] tracking-[-0.02em]">{b.x}</h3>
          case 'h4': return <h4 key={i} className="pt-3 font-display text-[1.2rem] font-semibold tracking-[-0.01em]">{b.x}</h4>
          case 'h5': return <h5 key={i} className="pt-2 font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-ember-deep">{b.x}</h5>
          case 'h2': return <h3 key={i} className="pt-4 font-display text-[1.6rem] font-semibold tracking-[-0.02em]">{b.x}</h3>
          case 'img': return <Photo key={i} src={imgUrl(b.src)} alt={b.alt || ''} shape="wide" className="!shadow-card" />
          case 'btn': return <div key={i} className="pt-2"><BtnBlock b={b} /></div>
          default: return null
        }
      })}
    </div>
  )
}

export type Group = { image?: Block; title: string; href?: string; body: Block[] }

function groups(blocks: Block[]) {
  const head: Block[] = []
  const gs: Group[] = []
  const tail: Block[] = []
  const hasH3 = blocks.filter((b) => b.t === 'h3').length >= 2
  const H = hasH3 ? 'h3' : 'h4'
  let cur: Group | null = null
  let pendingImg: Block | undefined
  for (let k = 0; k < blocks.length; k++) {
    const b = blocks[k]
    if (b.t === 'img' && blocks[k + 1]?.t === H) {
      pendingImg = b
      continue
    }
    if (b.t === H) {
      cur = { image: pendingImg, title: b.x || '', href: b.href, body: [] }
      pendingImg = undefined
      gs.push(cur)
      continue
    }
    if (!cur) head.push(b)
    else if (b.t === 'btn' && gs.length && k > blocks.length - 3) tail.push(b)
    else cur.body.push(b)
  }
  return { head, gs, tail }
}

function itemLink(g: Group) {
  if (g.href) return resolve(g.href).to
  return linkFor(g.title)
}

export function ItemRows({ gs, offset }: { gs: Group[]; offset: number }) {
  return (
    <div className="space-y-16 lg:space-y-28">
      {gs.map((g, i) => {
        const to = itemLink(g)
        const heroSrc = g.href ? HERO_IMAGES[g.href] : undefined
        const src = heroSrc || (g.image ? imgUrl(g.image.src) : fallbackImg(i + offset))
        return (
          <Reveal key={g.title + i}>
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2' : ''}`}>
                <Photo src={src} alt={g.image?.alt || g.title} shape={i % 3 === 1 ? 'arch' : 'soft'} />
              </div>
              <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-1' : ''}`}>
                <div className="mb-4 font-mono text-[12px] tracking-[0.2em] text-ember-deep">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-[clamp(1.18rem,2.8vw,1.84rem)] font-bold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]">{g.title}</h3>
                <Flow blocks={g.body} className="mt-5 max-w-2xl" />
                {to && <div className="mt-6"><TextLink to={to}>Read More</TextLink></div>}
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

function ItemList({ gs }: { gs: Group[] }) {
  return (
    <ol className="space-y-10 lg:space-y-12">
      {gs.map((g, i) => {
        const to = itemLink(g)
        return (
          <li key={g.title + i} className="grid gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ember/15 font-mono text-[13px] font-medium text-ember-deep sm:h-14 sm:w-14">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <h3 className="font-display text-[clamp(1.05rem,2.2vw,1.37rem)] font-semibold leading-[1.15] tracking-[-0.02em]">{g.title}</h3>
              <Flow blocks={g.body} className="mt-3 max-w-2xl" />
              {to && <div className="mt-4"><TextLink to={to}>Read More</TextLink></div>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

const TONE3 = ["tone-ice", "tone-peach", "tone-butter"]

function Steps({ sec }: { sec: Sec }) {
  const steps: { n: string; title: string; body: Block[] }[] = []
  const head: Block[] = []
  let cur: { n: string; title: string; body: Block[] } | null = null
  for (const b of sec.blocks) {
    if (isNum(b)) {
      cur = { n: (b.x || '').trim(), title: '', body: [] }
      steps.push(cur)
    } else if (!cur) head.push(b)
    else if (b.t === 'h3' && !cur.title) cur.title = b.x || ''
    else if (b.t === 'img') continue
    else cur.body.push(b)
  }
  return (
    <Sect tone="bg-stone">
      <SectionTitle eyebrow={sec.eyebrow} className="max-w-3xl">{sec.title}</SectionTitle>
      {head.length > 0 && <Flow blocks={head} className="mt-6 max-w-2xl" />}
      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 80}>
            <li className={`h-full list-none rounded-[1.5rem] p-6 shadow-card ring-1 ring-white ${TONE3[i % 3]}`}>
              <div className="font-display text-5xl font-bold leading-none tracking-[-0.04em] text-ember">{s.n}</div>
              <h3 className="mt-6 font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.02em]">{s.title}</h3>
              <Flow blocks={s.body} className="mt-3 !space-y-3 [&_p]:text-[15.5px] [&_p]:leading-[1.7]" />
            </li>
          </Reveal>
        ))}
      </ol>
    </Sect>
  )
}

export function SectionView({ sec, idx }: { sec: Sec; idx: number }) {
  if (sec.blocks.filter(isNum).length >= 3) return <Steps sec={sec} />
  const tone = idx % 2 ? 'bg-paper' : 'bg-white'
  const { head, gs, tail } = groups(sec.blocks)
  const imgs = gs.filter((g) => g.image).length

  if (gs.length >= 2) {
    const rows = imgs >= Math.ceil(gs.length / 2)
    return (
      <Sect tone={tone}>
        <div className="mb-8 grid gap-6 lg:mb-10 lg:grid-cols-12">
          <SectionTitle eyebrow={sec.eyebrow} className="lg:col-span-6">{sec.title}</SectionTitle>
          {head.length > 0 && <Flow blocks={head} className="lg:col-span-6 lg:pt-8" />}
        </div>
        {rows ? <ItemRows gs={gs} offset={idx} /> : <div className="max-w-5xl"><ItemList gs={gs} /></div>}
        {tail.length > 0 && <div className="mt-14 flex flex-wrap gap-4">{tail.map((b, i) => <BtnBlock key={i} b={b} />)}</div>}
      </Sect>
    )
  }

  const body = sec.blocks
  return (
    <Sect tone={tone}>
      {sec.title ? (
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <SectionTitle eyebrow={sec.eyebrow} className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">{sec.title}</SectionTitle>
          <Reveal className="lg:col-span-7">
            <Flow blocks={body} />
          </Reveal>
        </div>
      ) : (
        <Reveal><Flow blocks={body} className="max-w-4xl" /></Reveal>
      )}
    </Sect>
  )
}

const LABELED = /^([^:.!?]{3,60}):\s+(\S[\s\S]{40,})$/

function LongSection({ sec, idx }: { sec: Sec; idx: number }) {
  const tone = idx % 2 ? 'bg-paper' : 'bg-white'
  const btn = sec.blocks.find((b) => b.t === 'btn')
  const cards = sec.blocks.filter((b) => b.t === 'p' && LABELED.test(b.x || ''))
  const plain = sec.blocks.filter((b) => b.t === 'p' && !LABELED.test(b.x || ''))
  const ti = sec.blocks.findIndex((b) => b.t === 'h3')
  const tips = ti >= 0 ? sec.blocks.slice(ti) : []

  if (btn && cards.length < 3) {
    return (
      <section className="bg-paper py-12 lg:py-16">
        <Container>
          <Reveal>
            <div className="grid items-center gap-8 pastel-band rounded-[2rem] p-8 text-ink shadow-card sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[clamp(1.25rem,3vw,1.92rem)] font-bold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]">{sec.title}</h2>
                {plain.map((b, i) => <p key={i} className="mt-4 max-w-3xl text-[15.5px] leading-[1.8] text-ink/75">{b.x}</p>)}
              </div>
              <div className="lg:col-span-4 lg:justify-self-end"><BtnBlock b={btn} /></div>
            </div>
          </Reveal>
        </Container>
      </section>
    )
  }

  return (
    <Sect tone={tone}>
      <SectionTitle eyebrow={sec.eyebrow} className="max-w-3xl">{sec.title}</SectionTitle>
      {plain.length > 0 && <Flow blocks={plain} className="mt-6 max-w-3xl" />}
      {cards.length > 0 && (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((b, i) => {
            const m = (b.x || '').match(LABELED)!
            return (
              <Reveal key={i} delay={i * 60}>
                <li className={`h-full list-none rounded-[1.5rem] p-6 shadow-card ring-1 ring-white ${TONE3[i % 3]}`}>
                  <div className="font-mono text-[12px] tracking-[0.2em] text-ember-deep">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="mt-4 font-display text-[1.3rem] font-semibold leading-tight tracking-[-0.02em]">{m[1]}</h3>
                  <p className="mt-3 text-[15.5px] leading-[1.75] text-ink/70">{m[2]}</p>
                </li>
              </Reveal>
            )
          })}
        </ul>
      )}
      {tips.length > 0 && (
        <div className="mt-10 rounded-[1.5rem] bg-paper p-7 sm:p-9 lg:mt-12">
          {tips.map((b, i) =>
            b.t === 'h3' ? <h3 key={i} className="font-display text-[clamp(1.05rem,2.2vw,1.37rem)] font-semibold tracking-[-0.02em]">{b.x}</h3>
            : b.t === 'ul' ? (
              <ul key={i} className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {(b.items || []).map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-[1.6] text-ink/80">
                    <span className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-ember" aria-hidden />{it}
                  </li>
                ))}
              </ul>
            ) : b.t === 'p' ? <p key={i} className="mt-4 max-w-3xl text-[15px] leading-[1.8] text-ink/75">{b.x}</p> : null,
          )}
        </div>
      )}
    </Sect>
  )
}

export function LongForm({ intro, sections }: { intro: Block[]; sections: Sec[] }) {
  return (
    <>
      {intro.length > 0 && (
        <Sect tone="bg-white" className="!py-12 lg:!py-16">
          <Reveal>
            <div className="gap-14 space-y-6 lg:columns-2 [&>p]:break-inside-avoid">
              {intro.filter((b) => b.t === 'p').map((b, i) => <Rich key={i} text={b.x || ''} />)}
            </div>
          </Reveal>
        </Sect>
      )}
      {sections.map((s, i) => <LongSection key={i} sec={s} idx={i + 1} />)}
    </>
  )
}

function ComparisonCard({ secA, secB, idx }: { secA: Sec; secB: Sec; idx: number }) {
  const tone = idx % 2 ? 'bg-paper' : 'bg-white'
  function CompareList({ blocks, good }: { blocks: Block[]; good: boolean }) {
    return (
      <div className="space-y-3">
        {blocks.map((b, i) => {
          if (b.t === 'ul') return (
            <ul key={i} className="space-y-3">
              {(b.items || []).map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.6]">
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${good ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>
                    {good ? '✓' : '✗'}
                  </span>
                  <span>{item.replace(/^[❌✅✓✗×x]\s*/, '')}</span>
                </li>
              ))}
            </ul>
          )
          if (b.t === 'p') return <Rich key={i} text={b.x || ''} />
          return null
        })}
      </div>
    )
  }
  return (
    <Sect tone={tone}>
      <Reveal>
        <div className="relative">
          <div className="grid md:grid-cols-2">
            <div className="rounded-t-[2rem] md:rounded-tl-[2rem] md:rounded-tr-none md:rounded-bl-[2rem] bg-red-50 p-8 ring-2 ring-red-100 lg:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <span className="text-lg font-bold text-red-500">✗</span>
                </div>
                <h3 className="font-display text-[1.25rem] font-bold tracking-tight text-red-800">{secA.title}</h3>
              </div>
              <CompareList blocks={secA.blocks} good={false} />
            </div>
            <div className="flex items-center gap-4 py-5 md:hidden">
              <div className="h-px flex-1 bg-ink/10" />
              <span className="font-display text-2xl font-black text-navy">VS</span>
              <div className="h-px flex-1 bg-ink/10" />
            </div>
            <div className="rounded-b-[2rem] md:rounded-tr-[2rem] md:rounded-br-[2rem] md:rounded-bl-none bg-emerald-50 p-8 ring-2 ring-emerald-100 lg:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-lg font-bold text-emerald-600">✓</span>
                </div>
                <h3 className="font-display text-[1.25rem] font-bold tracking-tight text-emerald-800">{secB.title}</h3>
              </div>
              <CompareList blocks={secB.blocks} good={true} />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex h-16 w-16 items-center justify-center rounded-full bg-navy font-display text-[1rem] font-black text-white shadow-lift ring-4 ring-white">
            VS
          </div>
        </div>
      </Reveal>
    </Sect>
  )
}

export function Sections({ sections, start = 0 }: { sections: Sec[]; start?: number }) {
  const result: JSX.Element[] = []
  let i = 0
  while (i < sections.length) {
    if (i + 2 < sections.length && isVsSec(sections[i + 1])) {
      result.push(<ComparisonCard key={i} secA={sections[i]} secB={sections[i + 2]} idx={i + start} />)
      i += 3
    } else {
      result.push(<SectionView key={i} sec={sections[i]} idx={i + start} />)
      i++
    }
  }
  return <>{result}</>
}

export function IntroProse({ blocks }: { blocks: Block[] }) {
  if (!blocks.length) return null
  return (
    <Sect tone="bg-white" className="!py-10 lg:!py-14">
      <Flow blocks={blocks} className="max-w-4xl" />
    </Sect>
  )
}

export function ExploreChips({ items, title = 'Explore More Services' }: { items: { label: string; path: string }[]; title?: string }) {
  return (
    <Sect tone="bg-paper" className="!py-10 lg:!py-14">
      <Eyebrow>{title}</Eyebrow>
      <ul className="flex flex-wrap gap-3">
        {items.map((r) => (
          <li key={r.path}>
            <Link to={r.path} className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-[14.5px] font-medium text-ink shadow-card transition hover:-translate-y-0.5 hover:bg-ember hover:text-white hover:shadow-lift">
              {r.label}
            </Link>
          </li>
        ))}
      </ul>
    </Sect>
  )
}

export { Container }
