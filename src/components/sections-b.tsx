import { useState } from 'react'
import why from '../assets/why.webp'
import { Arrow, Button, Container, CountUp, Eyebrow, H2, ICONS, Lead, Reveal, SITE } from './ui'

const SERVICES = [
  { t: 'Data Provider', d: 'Data services involve the collection, processing, and analysis of data to make informed decisions.', i: 'data', h: SITE + 'data-services/' },
  { t: 'Digital Marketing', d: 'Digital marketing helps businesses promote their products or services online to reach target audiences.', i: 'marketing', h: SITE + 'digital-marketing/' },
  { t: 'Email Deliverability Services', d: 'Email deliverability services ensure high delivery rates for emails, optimizing inbox placement and avoiding spam filters.', i: 'email', h: SITE + 'email-deliverability-consulting/' },
  { t: 'Relationship Building Services', d: 'Relationship-building services aim to strengthen connections between your businesses and customers or partners.', i: 'relation', h: SITE + 'relationship-building-services/' },
  { t: 'WordPress Web Development', d: 'Web development involves the creation and maintenance of websites, including design, functionality, and content management.', i: 'wp', h: SITE + 'web-development-services/' },
  { t: 'Virtual Assistant Services', d: 'Virtual assistant services provide administrative support remotely, saving time and increasing efficiency.', i: 'va', h: SITE + 'virtual-assistant-services/' },
]

export function Services() {
  const [a, setA] = useState(0)
  const s = SERVICES[a]
  return (
    <section id="services" className="bg-white py-12 lg:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Our Services</Eyebrow>
            <H2>The Services We Offer</H2>
          </Reveal>
          <Reveal delay={120} className="flex flex-col items-start justify-end gap-8 lg:col-span-5">
            <Lead>
              DataDriven offers various digital marketing services including SEO, PPC, social media, email marketing, and more
              to help businesses achieve their online goals.
            </Lead>
            <Button href={SITE + 'contact/'} variant="dark">Get in Touch</Button>
          </Reveal>
        </div>

        <div className="mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-16">
          <ol className="lg:col-span-7">
            {SERVICES.map((x, i) => {
              const on = i === a
              return (
                <li key={x.t} onMouseEnter={() => setA(i)}>
                  <button
                    className="group flex min-h-[72px] w-full items-center gap-5 py-3 text-left sm:gap-7 lg:py-4"
                    onClick={() => setA(i)}
                    onFocus={() => setA(i)}
                    aria-expanded={on}
                    aria-controls={`svc-${i}`}
                  >
                    <span className={`w-8 shrink-0 font-mono text-[13px] transition-colors ${on ? 'text-ember-deep' : 'text-ink/40'}`}>0{i + 1}</span>
                    <span className={`font-display text-[clamp(1.18rem,3.2vw,2.14rem)] font-bold leading-[1.05] tracking-[-0.03em] transition-all duration-500 ${on ? 'translate-x-2 text-ink' : 'text-ink/30 group-hover:text-ink/60'}`}>
                      {x.t}
                    </span>
                    <span className={`ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember text-white transition-all duration-500 ${on ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                      <Arrow />
                    </span>
                  </button>
                  <div id={`svc-${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-out lg:hidden ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="flex flex-col items-start gap-5 pb-6 pl-[52px] pr-2">
                        <p className="text-[16px] leading-[1.7] text-ink/70">{x.d}</p>
                        <a href={x.h} tabIndex={on ? 0 : -1} className="group/l inline-flex min-h-11 items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-ember-deep">
                          Read More <Arrow className="transition-transform group-hover/l:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          <aside className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 overflow-hidden rounded-[2rem] bg-stone p-10 shadow-card">
              <div key={a} className="swap">
                <div className="flex items-center justify-between">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white p-5 text-ember-deep shadow-card">{ICONS[s.i]}</div>
                  <span className="font-display text-7xl font-bold leading-none tracking-[-0.05em] text-ink/10">0{a + 1}</span>
                </div>
                <h3 className="mt-14 font-display text-3xl font-bold leading-tight tracking-[-0.03em]">{s.t}</h3>
                <p className="mt-4 text-[14.5px] leading-[1.7] text-ink/70">{s.d}</p>
                <div className="mt-8">
                  <a href={s.h} className="group/l inline-flex min-h-11 items-center gap-3 rounded-full bg-ink py-1 pl-6 pr-1 font-mono text-[14px] text-white">
                    Read More
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white"><Arrow className="transition-transform group-hover/l:translate-x-0.5" /></span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}

const WHY = [
  { t: 'Trusted by 100+ Companies', i: 'shield', d: '"Gain peace of mind knowing you are working with a reliable and trustworthy company, delivering results."' },
  { t: 'Digital Marketing Expert', i: 'growth', d: '"Maximize your online presence with our experienced digital marketer, delivering results-driven campaigns."' },
  { t: 'Professional Team', i: 'team', d: '"Transform your online strategy with our skilled digital marketing team, delivering successful campaigns."' },
]

export function WhyUs() {
  return (
    <section className="overflow-hidden bg-stone py-12 lg:py-16">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-6">
          <div className="relative mx-auto max-w-[620px] lg:mx-0 lg:mr-10">
            <div className="group relative overflow-hidden rounded-[2rem] bg-ink shadow-lift">
              <img src={why} alt="Creative coworkers collaborating in an office" loading="lazy" className="aspect-[4/5] w-full object-cover object-[35%_50%] transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-6 right-4 rounded-2xl bg-white px-7 py-5 shadow-lift sm:-right-8">
              <div className="font-display text-6xl font-bold leading-none tracking-[-0.04em]">
                <CountUp to={100} />
                <span className="text-ember">+</span>
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Trusted Clients</div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>Why Choose Us</Eyebrow>
            <H2>We Provide Creative Solutions For Your Business</H2>
            <Lead className="mt-6 max-w-xl">“Innovate your brand strategy with custom digital solutions, boost engagement and drive growth.”</Lead>
          </Reveal>
          <ul className="mt-12 space-y-9">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 120}>
                <li className="group flex gap-6">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ember/15 p-3.5 text-ember-deep transition-colors duration-300 group-hover:bg-ember group-hover:text-white">
                    {ICONS[w.i]}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.05rem,2.2vw,1.4rem)] font-bold leading-tight tracking-[-0.02em]">{w.t}</h3>
                    <p className="mt-3 max-w-md text-[16px] leading-[1.7] text-ink/70">{w.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
