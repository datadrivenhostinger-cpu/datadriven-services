import hero from '../assets/hero.webp'
import mobius from '../assets/mobius.webp'
import akasa from '../assets/akasa-air.webp'
import expertrec from '../assets/epertrec.webp'
import leadwalnut from '../assets/leadwalnut.webp'
import tcl from '../assets/TCL.webp'
import technosoft from '../assets/technosoft.webp'
import firstsource from '../assets/firstsource-removebg-preview.webp'
import emailable from '../assets/emailable.webp'
import { Arrow, Button, Container, CountUp, Eyebrow, H2, QuoteMark, Reveal, SITE } from './ui'

import about from '../assets/about.jpg'
import campaign from '../assets/campaign.jpg'
export function Hero() {
  return (
    <section id="top" className="overflow-hidden hero-glow text-ink">
      <Container className="grid items-center gap-10 pb-12 pt-8 lg:grid-cols-12 lg:gap-12 lg:pb-14 lg:pt-10">
        <div className="lg:col-span-7">
          <div className="hero-in mb-6 inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-1.5 font-mono text-[13px] text-ink shadow-card">
            <span className="h-2 w-2 rounded-full bg-ember" />
            Welcome to DataDriven
          </div>
          <h1
            className="hero-in font-display text-[clamp(1.77rem,5vw,3.39rem)] font-bold leading-[1.04] tracking-[-0.035em]"
            style={{ ['--d' as string]: '100ms' }}
          >
            We are an <span className="text-ember-deep">Award-winning Best</span> digital marketing agency in Chennai
          </h1>
          <p className="hero-in mt-8 max-w-xl text-[15.5px] leading-[1.75] text-ink/70" style={{ ['--d' as string]: '250ms' }}>
            We are a trusted, well-known, full-service, and technologically advanced digital marketing company with a team
            that consists of strategists, designers, content producers, and technologists.
          </p>
          <div className="hero-in mt-10 flex flex-wrap items-center gap-6" style={{ ['--d' as string]: '380ms' }}>
            <Button href={SITE + 'contact/'}>Get Started</Button>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="img-reveal overflow-hidden rounded-[2rem] bg-stone shadow-lift" style={{ ['--d' as string]: '200ms' }}>
            <img
              src={hero}
              alt="DataDriven strategists, designers and technologists in the office"
              className="aspect-[4/5] w-full object-cover object-[40%_25%]"
            />
          </div>
          <div className="hero-in absolute -left-4 bottom-10 rounded-2xl bg-white px-6 py-5 shadow-lift sm:-left-10" style={{ ['--d' as string]: '900ms' }}>
            <div className="font-display text-4xl font-bold leading-none tracking-[-0.03em]">100<span className="text-ember">+</span></div>
            <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-mute">Trusted Clients</div>
          </div>
          <div className="hero-in absolute -right-2 top-10 rounded-2xl bg-navy px-6 py-5 text-white shadow-lift sm:-right-6" style={{ ['--d' as string]: '1100ms' }}>
            <div className="font-display text-4xl font-bold leading-none tracking-[-0.03em]">250<span className="text-ember">+</span></div>
            <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/80">Projects Completed</div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function Campaign() {
  return (
    <section className="bg-paper pb-10 lg:pb-14">
      <Container>
        <Reveal>
          <div className="group relative overflow-hidden rounded-[2rem] bg-ink shadow-lift">
            <img src={campaign} alt="Team reviewing campaign performance on laptops" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105 sm:aspect-[16/8] lg:aspect-[21/8]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" aria-hidden />
            <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4 sm:inset-x-10 sm:bottom-10">
              <div className="flex gap-3 sm:gap-4">
                <div className="rounded-2xl bg-white px-5 py-4 shadow-lift sm:px-7 sm:py-5">
                  <div className="font-display text-4xl font-bold leading-none tracking-[-0.03em] text-ink sm:text-6xl">100<span className="text-ember">+</span></div>
                  <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-mute">Trusted Clients</div>
                </div>
                <div className="rounded-2xl bg-navy px-5 py-4 text-white shadow-lift sm:px-7 sm:py-5">
                  <div className="font-display text-4xl font-bold leading-none tracking-[-0.03em] sm:text-6xl">250+</div>
                  <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/80">Projects Completed</div>
                </div>
              </div>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink sm:h-16 sm:w-16" aria-hidden>
                <Arrow className="-rotate-45" />
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

const LOGOS = [
  { n: 'Mobius', s: mobius },
  { n: 'Akasa Air', s: akasa },
  { n: 'ExpertRec', s: expertrec },
  { n: 'LeadWalnut', s: leadwalnut },
  { n: 'Tamilnadu Chicken League', s: tcl },
  { n: 'Technosoft Corporation', s: technosoft },
  { n: 'Firstsource', s: firstsource },
  { n: 'emailable', s: emailable },
]

export function Clients() {
  const row = [...LOGOS, ...LOGOS]
  return (
    <section className="bg-white py-6 lg:py-8">
      <Container>
        <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="marquee-track flex w-max items-center gap-14 pr-14">
            {row.map((l, i) => (
              <li key={l.n + i} className="flex h-14 shrink-0 items-center" aria-hidden={i >= LOGOS.length}>
                <img src={l.s} alt={i >= LOGOS.length ? '' : l.n} loading="lazy" className="max-h-11 w-auto max-w-[170px] object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

const STATS = [
  { n: 100, l: 'Trusted Clients' },
  { n: 250, l: 'Projects Completed' },
  { n: 5, l: 'Years Of Experience' },
  { n: 15, l: 'Professionals' },
]

export function About() {
  return (
    <section id="about" className="bg-paper py-12 lg:py-16">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <img src={about} alt="Team gathered around a laptop in a planning session" loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift" />
              <div className="absolute -bottom-6 -right-2 rounded-2xl bg-navy px-7 py-5 text-white shadow-lift sm:-right-8">
                <div className="font-display text-6xl font-bold leading-none tracking-[-0.05em]">5+</div>
                <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em]">Years of Experience</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-7">
            <Eyebrow>About DataDriven</Eyebrow>
            <H2>A result-driven digital marketing agency!</H2>
            <p className="mt-8 max-w-2xl text-[16px] leading-[1.8] text-ink/75">
              DataDriven is a top digital marketing agency that assists businesses of all sizes reach their online objectives.
              With 5+ years of experience and 250+ happy clients, our team of experts excels in SEO, PPC, social media, email
              marketing and more. We’re a top 20 lead generation company by Designrush, always learning to provide the best
              service. Contact us for a free consultation to take your business to the next level.
            </p>
            <div className="mt-10">
              <Button href={SITE + 'about-us/'} variant="dark">More About Us</Button>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 lg:mt-14">
          <ul className="grid grid-cols-2 gap-y-10 pastel-band rounded-[2rem] px-8 py-10 text-ink shadow-card sm:px-14 lg:grid-cols-4 lg:py-12">
            {STATS.map((s) => (
              <li key={s.l}>
                <div className="font-display text-[clamp(2.21rem,6vw,3.69rem)] font-bold leading-[0.95] tracking-[-0.04em]">
                  <CountUp to={s.n} />
                  <span className="text-ember">+</span>
                </div>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">{s.l}</div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10 lg:mt-14">
          <figure className="mx-auto max-w-4xl text-center">
            <QuoteMark className="mx-auto mb-8 h-10 w-14 text-ember" />
            <blockquote className="font-display text-[clamp(1.29rem,3.8vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
              The Real marketing is about maximizing the value of a product or service while minimizing the need for excessive promotion.
            </blockquote>
          </figure>
        </Reveal>
      </Container>
    </section>
  )
}
