import { Link } from "react-router"
import { Container, Reveal, Eyebrow } from "./ui"
import { useSeo } from "./page"
import { getSeo } from "../content/seo"

// ─── Types ────────────────────────────────────────────────────────────────

type SitemapLeaf = { label: string; path: string; external?: boolean }
type SitemapGroup = {
  icon: string
  title: string
  color: string
  bg: string
  pages: (SitemapLeaf & { children?: SitemapLeaf[] })[]
}

// ─── Data ─────────────────────────────────────────────────────────────────

const SECTIONS: SitemapGroup[] = [
  {
    icon: "M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9",
    title: "Home",
    color: "text-ember-deep",
    bg: "bg-butter",
    pages: [
      { label: "Home", path: "/" },
    ],
  },
  {
    icon: "M17 20h5v-1a4 4 0 00-5.33-3.77M9 20H4v-1a4 4 0 015.33-3.77M16 7a4 4 0 11-8 0 4 4 0 018 0z",
    title: "Company",
    color: "text-[#0141e1]",
    bg: "bg-stone",
    pages: [
      { label: "About Us", path: "/about-us" },
      { label: "Our Team", path: "/our-team" },
      { label: "Write for Us", path: "/write-for-us" },
      { label: "Contact Us", path: "/contact" },
      { label: "Book a Meeting", path: "/book-a-meeting" },
    ],
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Digital Marketing",
    color: "text-[#065f46]",
    bg: "bg-[#d1fae5]",
    pages: [
      {
        label: "Digital Marketing Overview",
        path: "/digital-marketing",
        children: [
          { label: "Email Marketing", path: "/email-marketing" },
          { label: "Outbound Email Marketing", path: "/outbound-email-marketing" },
          { label: "Inbound Email Marketing", path: "/inbound-email-marketing" },
          { label: "LinkedIn Marketing", path: "/linkedin-marketing" },
          { label: "Social Media Marketing – Organic", path: "/organic-social-media-marketing-services-in-india" },
          { label: "Social Media Marketing – Ads", path: "/social-media-marketing-ads" },
          { label: "Search Engine Optimization (SEO)", path: "/search-engine-optimization-seo" },
          { label: "Search Engine Marketing (SEM)", path: "/search-engine-marketing" },
          { label: "Content Marketing", path: "/content-marketing-company-in-chennai" },
          { label: "Webinar Marketing Services", path: "/webinar-marketing-services" },
          { label: "Video Marketing", path: "/video-marketing" },
          { label: "Graphic Design", path: "/graphic-design-services" },
          { label: "WordPress Web Development", path: "/web-development-services" },
        ],
      },
    ],
  },
  {
    icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4",
    title: "Data Services",
    color: "text-[#92400e]",
    bg: "bg-[#fef3c7]",
    pages: [
      {
        label: "Data Services Overview",
        path: "/data-services",
        children: [
          { label: "B2C Data", path: "/b2c-data" },
          { label: "B2B Data", path: "/digital-marketing/b2b-data" },
        ],
      },
    ],
  },
  {
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Other Services",
    color: "text-[#5b21b6]",
    bg: "bg-[#ede9fe]",
    pages: [
      {
        label: "Other Services Overview",
        path: "/other-services",
        children: [
          { label: "B2B Email Marketing Services", path: "/b2b-email-marketing-services" },
          { label: "B2C Email Marketing Services", path: "/b2c-email-marketing-services" },
          { label: "Email Deliverability Consulting", path: "/email-deliverability-consulting" },
          { label: "Virtual Assistant Services", path: "/virtual-assistant-services" },
          { label: "Relationship Building Services", path: "/relationship-building-services" },
        ],
      },
    ],
  },
  {
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: "Case Studies",
    color: "text-[#be185d]",
    bg: "bg-[#fce7f3]",
    pages: [
      {
        label: "Case Studies",
        path: "/case-studies",
        children: [
          { label: "SEO Case Study", path: "/case-studies/seo" },
          { label: "Webinar Marketing", path: "/case-studies/webinar-marketing" },
          { label: "Virtual Assistance", path: "/case-studies/virtual-assistance" },
          { label: "Video Creation", path: "/case-studies/video-creation" },
          { label: "Data Enrichment Services", path: "/case-studies/data-enrichment-services" },
          { label: "CloudYuga (B2B)", path: "/case-studies/cloudyugab2b" },
          { label: "Google Ads", path: "/case-studies/google-ads" },
          { label: "TCL", path: "/case-studies/tcl" },
        ],
      },
    ],
  },
  {
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    title: "Portfolio",
    color: "text-[#0369a1]",
    bg: "bg-[#e0f2fe]",
    pages: [
      {
        label: "Portfolio",
        path: "/portfolio",
        children: [
          { label: "Websites", path: "/portfolio/websites" },
          { label: "Digital Vcards", path: "/portfolio/digital-vcards" },
        ],
      },
    ],
  },
  {
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h2v4",
    title: "Blog & Resources",
    color: "text-[#115e59]",
    bg: "bg-[#ccfbf1]",
    pages: [
      {
        label: "Blog",
        path: "/blog",
        children: [
          { label: "5 Proven B2B Lead Generation Strategies", path: "/blog/b2b-lead-generation-strategies" },
          { label: "Google & Yahoo's February Email Updates", path: "/blog/crucial-insights-google-and-yahoos-february-email-updates" },
          { label: "Top 10 Webinar Marketing Agencies in India", path: "/blog/top-10-webinar-marketing-agencies-in-india" },
          { label: "10 Best SEO Agencies in Chennai", path: "/blog/10-best-seo-agencies-in-chennai" },
          { label: "Social Bookmarking in SEO", path: "/blog/benefits-of-social-bookmarking-in-seo" },
          { label: "Social Media Strategy for Startups", path: "/blog/how-social-media-marketing-strategy-helps-startup-businesses" },
          { label: "Email Marketing Strategies to Boost ROI (CMS)", path: "/blog/email-marketing-strategies-boost-roi-2025" },
        ],
      },
    ],
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Legal & Support",
    color: "text-[#374151]",
    bg: "bg-[#f3f4f6]",
    pages: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms and Conditions", path: "/terms-and-conditions" },
      { label: "FAQ", path: "/faq" },
      { label: "Support", path: "/support" },
      { label: "Sitemap", path: "/sitemap" },
    ],
  },
]

// ─── Stats ────────────────────────────────────────────────────────────────

function countPages(sections: SitemapGroup[]) {
  return sections.reduce((total, s) => {
    return total + s.pages.reduce((n, p) => n + 1 + (p.children?.length ?? 0), 0)
  }, 0)
}

// ─── Components ───────────────────────────────────────────────────────────

function PageLink({ label, path, external }: SitemapLeaf) {
  const cls =
    "group flex items-center gap-2 rounded-lg px-3 py-2.5 text-[14px] text-ink/80 transition-colors hover:bg-white hover:text-ember-deep"
  const inner = (
    <>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-30 transition group-hover:opacity-100" />
      <span className="leading-snug">{label}</span>
      {external && (
        <svg viewBox="0 0 12 12" className="ml-auto h-3 w-3 shrink-0 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 10L10 2M5 2h5v5" />
        </svg>
      )}
    </>
  )
  return external ? (
    <a href={path} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link to={path} className={cls}>{inner}</Link>
  )
}

function SectionCard({ section, delay }: { section: SitemapGroup; delay: number }) {
  const totalLinks = section.pages.reduce((n, p) => n + 1 + (p.children?.length ?? 0), 0)

  return (
    <Reveal delay={delay}>
      <div className="rounded-[1.75rem] bg-white p-6 shadow-card sm:p-8">
        {/* Card header */}
        <div className="mb-5 flex items-start gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${section.bg}`}>
            <svg viewBox="0 0 24 24" className={`h-5 w-5 ${section.color}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={section.icon} />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-[1.15rem] font-bold leading-tight tracking-[-0.02em]">
              {section.title}
            </h2>
            <span className="font-mono text-[11px] text-mute">
              {totalLinks} page{totalLinks !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Pages */}
        <div className="space-y-1">
          {section.pages.map((page) => (
            <div key={page.path}>
              {/* Parent / top-level link */}
              <div className={`group flex items-center gap-2 rounded-xl px-3 py-2.5 font-semibold text-[14px] transition-colors hover:bg-white hover:text-ember-deep ${section.bg} text-ink`}>
                <span className={`h-2 w-2 shrink-0 rounded-full ${section.color.replace("text-", "bg-")}`} />
                <Link to={page.path} className="flex-1 leading-snug hover:text-ember-deep">
                  {page.label}
                </Link>
                <span className="font-mono text-[10px] text-mute opacity-60 group-hover:opacity-100">
                  {page.path}
                </span>
              </div>

              {/* Child links */}
              {page.children && page.children.length > 0 && (
                <div className="ml-5 mt-1 space-y-0.5 border-l-2 border-stone-2 pl-4">
                  {page.children.map((child) => (
                    <PageLink key={child.path} {...child} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────

export function SitemapPage() {
  const seo = getSeo('/sitemap')
  useSeo(seo.title, seo.desc)

  const totalPages = countPages(SECTIONS)

  return (
    <>
      {/* Hero */}
      <section className="bg-paper">
        <Container className="pb-12 pt-10 lg:pb-16 lg:pt-12">
          <div className="hero-in">
            <Eyebrow>Sitemap</Eyebrow>
          </div>
          <h1
            className="hero-in mt-4 max-w-3xl font-display text-[clamp(1.77rem,5.2vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.04em]"
            style={{ ["--d" as string]: "80ms" }}
          >
            Complete Site Map
          </h1>
          <p
            className="hero-in mt-5 max-w-xl text-[15.5px] leading-[1.8] text-ink/70"
            style={{ ["--d" as string]: "160ms" }}
          >
            Every page on DataDriven Services — organised by section. {totalPages} pages total.
          </p>

          {/* Quick-jump chips */}
          <div
            className="hero-in mt-8 flex flex-wrap gap-2.5"
            style={{ ["--d" as string]: "240ms" }}
          >
            {SECTIONS.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                className={`inline-flex h-9 items-center gap-2 rounded-full px-4 font-mono text-[11.5px] font-medium transition hover:shadow-card ${s.bg} ${s.color}`}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={s.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {s.title}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats band */}
      <section className="border-y border-stone-2 bg-white">
        <Container className="py-6">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: totalPages, l: "Total Pages" },
              { n: 13, l: "Service Pages" },
              { n: 8, l: "Case Studies" },
              { n: 7, l: "Blog Posts" },
            ].map(({ n, l }) => (
              <div key={l} className="text-center sm:text-left">
                <dd className="font-display text-[2rem] font-bold tracking-[-0.04em] text-ember-deep">{n}</dd>
                <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{l}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Sitemap grid */}
      <section className="bg-paper py-14 lg:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SECTIONS.map((section, i) => (
              <div key={section.title} id={section.title.toLowerCase().replace(/\s+/g, "-")}>
                <SectionCard section={section} delay={(i % 3) * 80} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* XML sitemap link */}
      <section className="bg-white py-10">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] bg-stone px-7 py-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">For Search Engines</p>
              <h2 className="mt-1 font-display text-[1.2rem] font-bold tracking-[-0.02em]">XML Sitemap</h2>
              <p className="mt-1 text-[14px] text-ink/65">
                Submit to Google Search Console and Bing Webmaster Tools for faster indexing.
              </p>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-navy px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-ember-deep"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" />
              </svg>
              View sitemap.xml
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}

