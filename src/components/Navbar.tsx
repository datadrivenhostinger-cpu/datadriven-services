import { useState } from 'react'
import logo from '../assets/DD-LOGO-Brand-New.svg'
import { Container } from './ui'

const S = '/'
type Leaf = { label: string; href: string }
type Group = { label: string; href?: string; children?: Leaf[] }
type Item = { label: string; href: string; groups: Group[] }

const NAV: Item[] = [
  {
    label: 'Digital Marketing',
    href: S + 'digital-marketing/',
    groups: [
      {
        label: 'Email Marketing',
        href: S + 'email-marketing/',
        children: [
          { label: 'Outbound Email Marketing', href: S + 'outbound-email-marketing/' },
          { label: 'Inbound Email Marketing', href: S + 'inbound-email-marketing/' },
        ],
      },
      { label: 'LinkedIn Marketing', href: S + 'linkedin-marketing/' },
      {
        label: 'Social Media Services',
        children: [
          { label: 'Social Media Marketing – Organic', href: S + 'organic-social-media-marketing-services-in-india/' },
          { label: 'Social Media Marketing – Ads', href: S + 'social-media-marketing-ads/' },
        ],
      },
      { label: 'Search Engine Optimization', href: S + 'search-engine-optimization-seo/' },
      { label: 'Search Engine Marketing', href: S + 'search-engine-marketing/' },
      { label: 'Content Marketing', href: S + 'content-marketing-company-in-chennai/' },
      { label: 'Webinar Marketing Services', href: S + 'webinar-marketing-services/' },
      { label: 'Video Marketing', href: S + 'video-marketing/' },
      { label: 'Graphic Design', href: S + 'graphic-design-services/' },
      { label: 'WordPress Web Development', href: S + 'web-development-services/' },
    ],
  },
  {
    label: 'Data Services',
    href: S + 'data-services/',
    groups: [
      { label: 'B2C Data', href: S + 'b2c-data/' },
      { label: 'B2B Data', href: S + 'digital-marketing/b2b-data/' },
    ],
  },
  {
    label: 'Other Services',
    href: '/other-services',
    groups: [
      { label: 'B2B Email Marketing Services', href: S + 'b2b-email-marketing-services/' },
      { label: 'B2C Email Marketing Services', href: S + 'b2c-email-marketing-services/' },
      { label: 'Email Deliverability Consulting', href: S + 'email-deliverability-consulting/' },
      { label: 'Virtual Assistant Services', href: S + 'virtual-assistant-services/' },
      { label: 'Relationship Building Services', href: S + 'relationship-building-services/' },
    ],
  },
  {
    label: 'Company',
    href: '/about-us',
    groups: [
      { label: 'About Us', href: S + 'about-us/' },
      { label: 'Our Team', href: S + 'our-team/' },
      { label: 'Write for us', href: S + 'write-for-us/' },
    ],
  },
  {
    label: 'Resources',
    href: '/blog',
    groups: [
      { label: 'Blog', href: S + 'blog/' },
      { label: 'Case Studies', href: S + 'case-studies/' },
      {
        label: 'Portfolio',
        href: S + 'portfolio/',
        children: [
          { label: 'Websites', href: S + 'portfolio/websites' },
          { label: 'Digital Vcards', href: S + 'portfolio/digital-vcards' },
        ],
      },
    ],
  },
]

const CONTACT: Group[] = [
  { label: 'Submit the form', href: S + 'contact/' },
  { label: 'Call Us', href: 'tel:+919500087415' },
  { label: 'BOOK A MEETING', href: '/book-a-meeting' },
]

const Chevron = ({ open = false }: { open?: boolean }) => (
  <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="m2.500 4.500 3.500 3.500 3.500-3.500" />
  </svg>
)

function Panel({ groups, align = 'left' }: { groups: Group[]; align?: 'left' | 'right' }) {
  return (
    <div
      className={`invisible absolute top-full z-50 w-72 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${align === 'right' ? 'right-0' : 'left-0'}`}
    >
      <ul className="rounded-2xl bg-white p-2 shadow-lift">
        {groups.map((g) => (
          <li key={g.label}>
            {g.href ? (
              <a href={g.href} className="block rounded px-3 py-2 text-[14px] text-ink transition-colors hover:bg-stone hover:text-ember-deep">
                {g.label}
              </a>
            ) : (
              <span className="block px-3 pb-1 pt-2 font-mono text-[11px] uppercase tracking-widest text-mute">{g.label}</span>
            )}
            {g.children && (
              <ul className="mb-1 ml-3 pl-2">
                {g.children.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} className="block rounded px-3 py-1.5 text-[13.5px] text-ink/75 transition-colors hover:bg-stone hover:text-ember-deep">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [exp, setExp] = useState<string | null>(null)

  return (
    <>
    <header className="sticky top-0 z-50 bg-white/95 shadow-[0_6px_24px_-12px_rgb(40_110_190/0.3)] backdrop-blur">
      <Container className="flex h-[68px] items-center justify-between gap-3 lg:gap-4">
        <a href="/" aria-label="DataDriven – Lead Generation Made Easy!" className="shrink-0">
          <img src={logo} alt="DataDriven – Lead Generation Made Easy!" className="h-9 w-auto sm:h-10" />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((it) => (
            <div key={it.label} className="group relative">
              <a href={it.href} className="relative flex min-h-[68px] items-center gap-1.5 whitespace-nowrap px-2 font-sans text-[13.5px] xl:px-3 xl:text-[14px] font-bold text-ink/80 transition-colors group-hover:text-ember-deep">
                {it.label}
                <Chevron />
              </a>
              <Panel groups={it.groups} />
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="group relative hidden lg:block">
            <a href={S + 'contact/'} className="flex min-h-10 items-center gap-2 whitespace-nowrap rounded-xl bg-navy px-5 text-[14px] font-bold text-white shadow-[0_8px_20px_-10px_rgb(9_27_101/0.7)] transition-colors hover:bg-ember-deep hover:text-white">
              Contact Us <Chevron />
            </a>
            <Panel groups={CONTACT} align="right" />
          </div>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-stone lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-all ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1/2 h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-all ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
            </span>
          </button>
        </div>
      </Container>

      {open && (
        <div onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)} className="max-h-[calc(100dvh-68px)] overflow-y-auto bg-paper lg:hidden">
          <Container className="py-3">
            {[...NAV, { label: 'Contact Us', href: S + 'contact/', groups: CONTACT }].map((it) => (
              <div key={it.label}>
                <button
                  className="flex min-h-14 w-full items-center justify-between font-sans text-[16px] font-bold"
                  onClick={() => setExp(exp === it.label ? null : it.label)}
                  aria-expanded={exp === it.label}
                >
                  {it.label}
                  <Chevron open={exp === it.label} />
                </button>
                {exp === it.label && (
                  <ul className="pb-3">
                    {it.groups.map((g) => (
                      <li key={g.label}>
                        {g.href ? (
                          <a href={g.href} className="block py-2.5 text-[15px] text-ink/80">{g.label}</a>
                        ) : (
                          <span className="block pt-2 font-mono text-[11px] uppercase tracking-widest text-mute">{g.label}</span>
                        )}
                        {g.children?.map((c) => (
                          <a key={c.label} href={c.href} className="block py-2 pl-4 text-[14px] text-ink/70">{c.label}</a>
                        ))}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Container>
        </div>
      )}
    </header>
    </>
  )
}
