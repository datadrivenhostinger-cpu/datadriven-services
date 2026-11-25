export type Kind =
  | 'overview' | 'service' | 'about' | 'team' | 'contact' | 'book' | 'cases' | 'case' | 'blog' | 'post'
  | 'portfolio' | 'sites' | 'simple' | 'other' | 'faq'

export type Route = { path: string; key?: string; label: string; parent?: string; kind: Kind }

const DM = '/digital-marketing'
const OS = '/other-services'

export const ROUTES: Route[] = [
  { path: '/about-us', key: 'about-us', label: 'About Us', kind: 'about' },
  { path: '/our-team', key: 'our-team', label: 'Our Team', parent: '/about-us', kind: 'team' },
  { path: '/contact', key: 'contact', label: 'Contact', kind: 'contact' },
  { path: '/book-a-meeting', label: 'Book a Meeting', parent: '/contact', kind: 'book' },

  { path: DM, key: 'digital-marketing', label: 'Digital Marketing', kind: 'overview' },
  { path: OS, label: 'Other Services', kind: 'other' },

  { path: '/email-marketing', key: 'email-marketing', label: 'Email Marketing', parent: DM, kind: 'service' },
  { path: '/outbound-email-marketing', key: 'outbound-email-marketing', label: 'Outbound Email Marketing', parent: '/email-marketing', kind: 'service' },
  { path: '/inbound-email-marketing', key: 'inbound-email-marketing', label: 'Inbound Email Marketing', parent: '/email-marketing', kind: 'service' },
  { path: '/linkedin-marketing', key: 'linkedin-marketing', label: 'LinkedIn Marketing', parent: DM, kind: 'service' },
  { path: '/organic-social-media-marketing-services-in-india', key: 'organic-social-media-marketing-services-in-india', label: 'Social Media Marketing – Organic', parent: DM, kind: 'service' },
  { path: '/social-media-marketing-ads', key: 'social-media-marketing-ads', label: 'Social Media Marketing – Ads', parent: DM, kind: 'service' },
  { path: '/search-engine-optimization-seo', key: 'search-engine-optimization-seo', label: 'Search Engine Optimization', parent: DM, kind: 'service' },
  { path: '/search-engine-marketing', key: 'search-engine-marketing', label: 'Search Engine Marketing', parent: DM, kind: 'service' },
  { path: '/content-marketing-company-in-chennai', key: 'content-marketing-company-in-chennai', label: 'Content Marketing', parent: DM, kind: 'service' },
  { path: '/webinar-marketing-services', key: 'webinar-marketing-services', label: 'Webinar Marketing Services', parent: DM, kind: 'service' },
  { path: '/video-marketing', key: 'video-marketing', label: 'Video Marketing', parent: DM, kind: 'service' },
  { path: '/graphic-design-services', key: 'graphic-design-services', label: 'Graphic Design', parent: DM, kind: 'service' },
  { path: '/web-development-services', key: 'web-development-services', label: 'WordPress Web Development', parent: DM, kind: 'service' },

  { path: '/b2b-email-marketing-services', key: 'b2b-email-marketing-services', label: 'B2B Email Marketing Services', parent: OS, kind: 'service' },
  { path: '/b2c-email-marketing-services', key: 'b2c-email-marketing-services', label: 'B2C Email Marketing Services', parent: OS, kind: 'service' },
  { path: '/email-deliverability-consulting', key: 'email-deliverability-consulting', label: 'Email Deliverability Consulting', parent: OS, kind: 'service' },
  { path: '/virtual-assistant-services', key: 'virtual-assistant-services', label: 'Virtual Assistant Services', parent: OS, kind: 'service' },
  { path: '/relationship-building-services', key: 'relationship-building-services', label: 'Relationship Building Services', parent: OS, kind: 'service' },

  { path: '/case-studies', key: 'case-studies', label: 'Case Studies', kind: 'cases' },
  { path: '/case-studies/seo', key: 'case-studies/seo', label: 'SEO', parent: '/case-studies', kind: 'case' },
  { path: '/case-studies/webinar-marketing', key: 'case-studies/webinar-marketing', label: 'Webinar Marketing', parent: '/case-studies', kind: 'case' },
  { path: '/case-studies/virtual-assistance', key: 'case-studies/virtual-assitance', label: 'Virtual Assistance', parent: '/case-studies', kind: 'case' },
  { path: '/case-studies/video-creation', key: 'case-studies/video-creation', label: 'Video Creation', parent: '/case-studies', kind: 'case' },
  { path: '/case-studies/data-enrichment-services', key: 'case-studies/data-enrichment-services', label: 'Data Enrichment Services', parent: '/case-studies', kind: 'case' },
  { path: '/case-studies/cloudyugab2b', key: 'case-studies/cloudyugab2b', label: 'CloudYuga(B2B)', parent: '/case-studies', kind: 'case' },
  { path: '/case-studies/google-ads', key: 'case-studies/google-ads', label: 'Google Ads', parent: '/case-studies', kind: 'case' },
  { path: '/case-studies/tcl', key: 'case-studies/tcl', label: 'TCL', parent: '/case-studies', kind: 'case' },

  { path: '/portfolio', key: 'portfolio', label: 'Portfolio', kind: 'portfolio' },
  { path: '/portfolio/websites', key: 'portfolio-copy', label: 'Websites', parent: '/portfolio', kind: 'sites' },
  { path: '/portfolio/digital-vcards', key: 'portfolio-copy-duplicate-18170', label: 'Digital Vcards', parent: '/portfolio', kind: 'sites' },

  { path: '/blog', key: 'blog', label: 'Blog', kind: 'blog' },
  { path: '/blog/b2b-lead-generation-strategies', key: 'blog/b2b-lead-generation-strategies', label: '5 Proven Strategies to Skyrocket Your B2B Lead Generation', parent: '/blog', kind: 'post' },
  { path: '/blog/crucial-insights-google-and-yahoos-february-email-updates', key: 'blog/crucial-insights-google-and-yahoos-february-email-updates', label: 'Crucial Insights: Google and Yahoo’s February Email Updates Unveiled', parent: '/blog', kind: 'post' },
  { path: '/blog/top-10-webinar-marketing-agencies-in-india', key: 'blog/top-10-webinar-marketing-agencies-in-india', label: 'Top 10 Webinar Marketing Agencies in India', parent: '/blog', kind: 'post' },
  { path: '/blog/10-best-seo-agencies-in-chennai', key: 'blog/10-best-seo-agencies-in-chennai', label: '10 Best SEO Agencies in chennai', parent: '/blog', kind: 'post' },
  { path: '/blog/benefits-of-social-bookmarking-in-seo', key: 'blog/benefits-of-social-bookmarking-in-seo', label: 'How can social bookmarking contribute to better SEO results?', parent: '/blog', kind: 'post' },
  { path: '/blog/how-social-media-marketing-strategy-helps-startup-businesses', key: 'blog/how-social-media-marketing-strategy-helps-startup-businesses', label: 'How Social Media Marketing Strategy Helps Startup Businesses', parent: '/blog', kind: 'post' },

  { path: '/write-for-us', key: 'write-for-us', label: 'Write for us', parent: '/about-us', kind: 'simple' },
  { path: '/privacy-policy', key: 'privacy-policy', label: 'Privacy Policy', kind: 'simple' },
  { path: '/terms-and-conditions', key: 'privacy-policy', label: 'Terms and Conditions', kind: 'simple' },
  { path: '/support', label: 'Support', kind: 'faq' },
  { path: '/faq', label: 'FAQ', kind: 'faq' },
]

export const byPath = (p: string) => ROUTES.find((r) => r.path === p)

export function trail(path: string): { label: string; to?: string }[] {
  const out: { label: string; to?: string }[] = []
  let r = byPath(path)
  while (r) {
    out.unshift({ label: r.label, to: r.path })
    r = r.parent ? byPath(r.parent) : undefined
  }
  out.unshift({ label: 'Home', to: '/' })
  out[out.length - 1].to = undefined
  return out
}

const norm = (s: string) => s.toLowerCase().replace(/&amp;/g, '&').replace(/[^a-z0-9]+/g, ' ').trim()

const EXTRA: Record<string, string> = {
  'b2b data provider service': '/digital-marketing/b2b-data',
  'b2c data provider service': '/b2c-data',
  'webinar marketing service': '/webinar-marketing-services',
  'relationship building service': '/relationship-building-services',
  'wordpress website development': '/web-development-services',
  'email deliverability consultant': '/email-deliverability-consulting',
}

export function linkFor(title: string): string | undefined {
  const n = norm(title)
  if (EXTRA[n]) return EXTRA[n]
  const hit = ROUTES.find((r) => ['service', 'data', 'overview', 'cases'].includes(r.kind) && norm(r.label) === n)
  return hit?.path
}

export const SERVICE_GROUPS = [
  { label: 'Digital Marketing', path: DM, items: ROUTES.filter((r) => r.kind === 'service' && (r.parent === DM || r.parent === '/email-marketing')) },
  { label: 'Other Services', path: OS, items: ROUTES.filter((r) => r.kind === 'service' && r.parent === OS) },
]
