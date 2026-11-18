import raw from './pages.json'

export type Block = { t: string; x?: string; src?: string; alt?: string; href?: string; l?: string; items?: string[] }
export type Page = { title: string; metaDesc: string; crumbs: string[]; blocks: Block[] }
export const pages = raw as unknown as Record<string, Page>

const ORIGIN = 'https://datadriven-services.com'
const local = import.meta.glob('../assets/pages/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const byName: Record<string, string> = {}
for (const k in local) byName[k.split('/').pop() as string] = local[k]

export function img(url?: string) {
  if (!url) return ''
  const m = url.split('/wp-content/uploads/')[1]
  if (!m) return url
  const name = m.replace(/\//g, '_').replace(/[^A-Za-z0-9._-]/g, '-')
  return byName[name] || url
}

export function hasLocal(url?: string) {
  if (!url) return false
  const m = url.split('/wp-content/uploads/')[1]
  return !!m && !!byName[m.replace(/\//g, '_').replace(/[^A-Za-z0-9._-]/g, '-')]
}

const ALIAS: Record<string, string> = {
  'portfolio-copy': '/portfolio/websites',
  'portfolio-copy-duplicate-18170': '/portfolio/digital-vcards',
  'about-us/clients': '/about-us',
  'webinar-digital-marketing-for-small-businesses-25-02-2024': '/webinar-marketing-services',
  'wordpress-web-development': '/web-development-services',
  vcard: '/portfolio/digital-vcards',
  support: '/contact',
  'terms-and-conditions': '/privacy-policy',
  'case-studies/shankara-build-pro': '/case-studies',
  'case-studies/seo-1': '/case-studies/seo',
  'case-studies/virtual-assitance': '/case-studies/virtual-assistance',
}

export const KNOWN = new Set<string>([
  '/', '/about-us', '/our-team', '/contact', '/book-a-meeting', '/digital-marketing', '/data-services', '/other-services',
  '/blog', '/case-studies', '/portfolio', '/portfolio/websites', '/portfolio/digital-vcards', '/write-for-us',
  '/privacy-policy', '/terms-and-conditions', '/support', '/faq', '/sitemap',
  ...Object.keys(pages)
    .filter((k) => !['portfolio-copy', 'portfolio-copy-duplicate-18170', 'case-studies/virtual-assitance'].includes(k))
    .map((k) => '/' + k),
  '/case-studies/virtual-assistance',
])

export function resolve(href?: string): { to: string; external: boolean } {
  if (!href) return { to: '/contact', external: false }
  if (href.startsWith('#')) return { to: '/contact', external: false }
  if (href.startsWith('/') && !href.startsWith('//')) return internal(href, href)
  if (href.startsWith(ORIGIN)) return internal(href.slice(ORIGIN.length), href)
  return { to: href, external: true }
}

function internal(path: string, original: string) {
  const clean = path.split('#')[0].split('?')[0].replace(/^\/+|\/+$/g, '')
  if (!clean) return { to: '/', external: false }
  if (clean.startsWith('blog/category')) return { to: '/blog', external: false }
  const mapped = ALIAS[clean] || '/' + clean
  if (KNOWN.has(mapped)) return { to: mapped, external: false }
  return { to: original.startsWith('/') ? ORIGIN + original : original, external: true }
}

export function pageFor(path: string): Page | undefined {
  const k = path.replace(/^\//, '')
  if (k === 'portfolio/websites') return pages['portfolio-copy']
  if (k === 'portfolio/digital-vcards') return pages['portfolio-copy-duplicate-18170']
  if (k === 'case-studies/virtual-assistance') return pages['case-studies/virtual-assitance']
  return pages[k]
}

export const slugFromHref = (h?: string) => (h || '').replace(/\/$/, '').split('/').pop() || ''

export function tidy(t: string) {
  return t.replace(/\s+/g, ' ').trim()
}
