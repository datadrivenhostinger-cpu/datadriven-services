import { useState } from 'react'
import jon from '../assets/Jon.png'
import natarajan from '../assets/Natarajan-Alagappan.png'
import abhishek from '../assets/Black-White-Minimalist-Circle-Monogram-Logo-9.png'
import job from '../assets/Black-White-Minimalist-Circle-Monogram-Logo-8.png'
import b1 from '../assets/2d2f5701-4dc2-4225-a28e-5c93516bfb1b.jpg'
import b2 from '../assets/Navigating-Changes-in-Email-Marketing-Stay-ahead-with-Google-Yahoos-February-Updates.png'
import b3 from '../assets/explaining-girl.png'
import b4 from '../assets/10-seo.webp'
import { Arrow, Container, Eyebrow, H2, Lead, QuoteMark, Reveal, SITE } from './ui'

const U = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

type P = { n: string; t: string; c: string; img: string; cls: string; img_cls: string }
const PROJECTS: P[] = [
  { n: '01', t: 'Growth Strategies', c: 'Business Planning', img: U('1624555130581-1d9cca783bc0', 2000), cls: 'lg:col-span-12', img_cls: 'aspect-[4/3] sm:aspect-[21/9]' },
  { n: '02', t: 'OutBound', c: 'Email & LinkedIn', img: U('1542744173-05336fcc7ad4'), cls: 'lg:col-span-5', img_cls: 'aspect-[4/5]' },
  { n: '03', t: 'Social Media', c: 'Organic & Ads', img: U('1599658880436-c61792e70672'), cls: 'lg:col-span-4 lg:mt-32', img_cls: 'aspect-square' },
  { n: '04', t: 'SEO Booster', c: 'Ranking', img: U('1551288049-bebda4e38f71'), cls: 'lg:col-span-3 lg:mt-12', img_cls: 'aspect-[3/4]' },
]

export function Projects() {
  return (
    <section className="bg-paper py-12 lg:py-16">
      <Container>
        <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <Eyebrow>Our Projects</Eyebrow>
            <H2>Latest Projects that We Have Done</H2>
          </Reveal>
          <Reveal delay={120} className="flex items-end lg:col-span-4">
            <Lead>“Discover our latest and innovative projects, showcasing our commitment to delivering exceptional results.”</Lead>
          </Reveal>
        </div>
        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.t} delay={(i % 3) * 100} className={p.cls}>
              <a href={SITE + 'case-studies/'} className="group block">
                <div className={`relative overflow-hidden rounded-[1.75rem] bg-ink shadow-card ${p.img_cls}`}>
                  <img
                    src={p.img}
                    alt={`${p.t} – ${p.c}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                  <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink">{p.c}</span>
                  <span className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white transition-transform duration-500 group-hover:scale-110">
                    <Arrow className="-rotate-45" />
                  </span>
                </div>
                <div className="mt-6 flex items-baseline gap-4 px-1">
                  <span className="font-mono text-[13px] text-ember-deep">{p.n}</span>
                  <h3 className={`font-display font-bold tracking-[-0.03em] transition-colors group-hover:text-ember-deep ${i === 0 ? 'text-[clamp(1.48rem,4.5vw,2.95rem)] leading-none' : 'text-[clamp(1.11rem,2.4vw,1.66rem)] leading-tight'}`}>
                    {p.t}
                  </h3>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

const TESTIMONIALS = [
  {
    q: 'Having worked with Karthik for a while now, I am thoroughly impressed by his commitment to his tasks, by his enthusiasm and his willingness to learn about our products in detail. He is an excellent lead generation professional and I recommend him without hesitation.​I would recommend his services to anyone in the B2B space.',
    n: 'Jonathan Rodger',
    r: 'Founder',
    p: jon,
  },
  {
    q: 'Karthik and the team are a hidden treasure we found. Across data harvesting, email outreach, and application monitoring. Karthik, Sundar, and the team have shown exemplary professionalism. Reliable, quality-focused, and great with progress updates - anytime I need diligence in process adherence - I’ll turn to Karthik. Big shoulders!',
    n: 'Natarajan Alagappan',
    r: 'Chief Product Officer, LeadWalnut',
    p: natarajan,
  },
  {
    q: 'Karthik is polite, diligent, and analytical person. As a leader, his company has the capacity and ability to do business development in Enterprise sales. He is patient, methodical, facts-driven and is always eager to explore new initiatives. He is a resourceful person to work with. We look forward to working with him long-term.',
    n: 'Abhishek Mishra',
    r: 'Co-Founder, Aindra Labs',
    p: abhishek,
  },
  {
    q: 'Karthik, young entrepreneur / Co-founder of Data - Driven... I am associated with this organization for Database generation and web based campaigning. They are doing a fabulous job in contacts mining, they follow the best practices to deliver the expected results. Sundar is a SME when it comes to lead gen and email campaign.',
    n: 'Job Abeth',
    r: 'AVP - Sales, Maarga Systems',
    p: job,
  },
]

export function Testimonials() {
  const [i, setI] = useState(0)
  const t = TESTIMONIALS[i]
  const n = TESTIMONIALS.length
  const step = (d: number) => setI((i + d + n) % n)
  const btn = 'flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-card transition hover:bg-ink hover:text-paper'
  return (
    <section className="bg-stone py-12 lg:py-16">
      <Container>
        <div className="mb-10 grid gap-8 lg:mb-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Testimonials</Eyebrow>
            <H2>What our clients say About Us</H2>
          </Reveal>
          <Reveal delay={120} className="flex items-end lg:col-span-5">
            <Lead>“Our exceptional service has received praise from clients, transforming their businesses with increased success.”</Lead>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="relative rounded-[2rem] bg-white p-8 shadow-lift sm:p-12 lg:col-span-8 lg:p-16">
            <QuoteMark className="h-12 w-16 text-ember lg:h-16 lg:w-24" />
            <figure key={i} className="swap mt-8">
              <blockquote className="font-display text-[clamp(1.05rem,1.9vw,1.3rem)] font-medium leading-[1.45] tracking-[-0.015em]">
                {t.q}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-5">
                <img src={t.p} alt={t.n} className="h-16 w-16 rounded-full bg-stone object-cover" />
                <div>
                  <div className="font-display text-xl font-bold tracking-[-0.01em]">{t.n}</div>
                  <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink/70">{t.r}</div>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col lg:col-span-4">
            <ul className="space-y-3" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((x, k) => (
                <li key={x.n}>
                  <button
                    role="tab"
                    aria-selected={k === i}
                    onClick={() => setI(k)}
                    className={`flex min-h-[72px] w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${k === i ? 'bg-white text-ink shadow-lift ring-2 ring-ember' : 'bg-white/60 text-ink hover:bg-white hover:shadow-card'}`}
                  >
                    <img src={x.p} alt="" className="h-11 w-11 rounded-full bg-stone object-cover" />
                    <span>
                      <span className="block font-display text-[15.5px] font-bold">{x.n}</span>
                      <span className={`block text-[13px] leading-snug ${k === i ? 'text-ink/60' : 'text-ink/60'}`}>{x.r}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <button className={btn} onClick={() => step(-1)} aria-label="Previous testimonial"><Arrow className="rotate-180" /></button>
              <button className={btn} onClick={() => step(1)} aria-label="Next testimonial"><Arrow /></button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

const BLOGS = [
  { c: 'Digital Marketing', t: '5 Proven Strategies to Skyrocket Your B2B Lead Generation', d: 'B2B lead generation strategies include webinar marketing,and leveraging social media. Optimize your efforts to attract ideal buyers and guide...', img: b1, h: SITE + 'blog/b2b-lead-generation-strategies/', ch: SITE + 'blog/category/digital-marketing/' },
  { c: 'Email deliverability', t: 'Crucial Insights: Google and Yahoo’s February Email Updates Unveiled', d: "In the world of email marketing, it's important to keep up with the latest updates. Google and Yahoo, big...", img: b2, h: SITE + 'blog/crucial-insights-google-and-yahoos-february-email-updates/', ch: SITE + 'blog/category/email-deliverability/' },
  { c: 'Webinar Marketing', t: 'Top 10 Webinar Marketing Agencies in India', d: 'Webinars are a powerful marketing tool that lets you talk to your audience in real time, answer their questions,...', img: b3, h: SITE + 'blog/top-10-webinar-marketing-agencies-in-india/', ch: SITE + 'blog/category/webinar-marketing/' },
  { c: 'SEO', t: '10 Best SEO Agencies in chennai', d: "In today's crowded digital market, finding the perfect SEO Agency can be quite a task. To make it easier...", img: b4, h: SITE + 'blog/10-best-seo-agencies-in-chennai/', ch: SITE + 'blog/category/seo/' },
]

export function Blog() {
  const [f, ...rest] = BLOGS
  return (
    <section id="blog" className="bg-white py-12 lg:py-16">
      <Container>
        <div className="mb-10 grid gap-8 lg:mb-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Our Blog</Eyebrow>
            <H2>Latest Blog &amp; Articles</H2>
          </Reveal>
          <Reveal delay={120} className="flex items-end lg:col-span-5">
            <Lead>“Stay informed and engaged with our informative articles and blog posts, covering the latest industry trends.”</Lead>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <article className="group h-full overflow-hidden rounded-[2rem] bg-stone shadow-card transition-shadow duration-500 hover:shadow-lift">
              <a href={f.h} className="block overflow-hidden">
                <img src={f.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
              </a>
              <div className="p-8 sm:p-10">
                <a href={f.ch} className="inline-block rounded-full bg-navy px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white">{f.c}</a>
                <h3 className="mt-5 font-display text-[clamp(1.29rem,3vw,2.03rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                  <a href={f.h} className="transition-colors group-hover:text-ember-deep">{f.t}</a>
                </h3>
                <p className="mt-5 max-w-xl text-[16px] leading-[1.7] text-ink/70">{f.d}</p>
                <a href={f.h} className="group/l mt-6 inline-flex min-h-11 items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-ember-deep">Read More <Arrow className="transition-transform group-hover/l:translate-x-1" /></a>
              </div>
            </article>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((b, k) => (
              <Reveal key={b.t} delay={k * 100}>
                <article className="group grid grid-cols-[1fr_104px] gap-5 rounded-3xl bg-stone p-5 transition-shadow duration-500 hover:shadow-lift sm:grid-cols-[1fr_140px] sm:p-6">
                  <div>
                    <a href={b.ch} className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ember-deep">{b.c}</a>
                    <h3 className="mt-2 font-display text-[clamp(1.05rem,1.7vw,1.3rem)] font-bold leading-[1.15] tracking-[-0.02em]">
                      <a href={b.h} className="transition-colors group-hover:text-ember-deep">{b.t}</a>
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/65">{b.d}</p>
                    <a href={b.h} className="group/l mt-3 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-ember-deep">Read More <Arrow className="transition-transform group-hover/l:translate-x-1" /></a>
                  </div>
                  <a href={b.h} className="block self-start overflow-hidden rounded-2xl">
                    <img src={b.img} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-110" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
