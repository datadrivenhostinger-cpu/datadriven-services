import { createBrowserRouter, Navigate, Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router'
import type { MouseEvent, ReactNode } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FinalCta from './components/FinalCta'
import { About, Campaign, Clients, Hero } from './components/sections-a'
import { Services, WhyUs } from './components/sections-b'
import { Blog, Projects, Testimonials } from './components/sections-c'
import { Container } from './components/ui'
import { PageHero, useSeo } from './components/page'
import { ROUTES, type Kind } from './content/routes'
import { resolve } from './content/site'
import * as T from './components/templates'
import { CmsBlogListPage, CmsBlogPostPage } from './components/CmsBlog'
import { SitemapPage } from './components/SitemapPage'
import { getSeo } from './content/seo'

const NO_CTA = new Set(['/contact', '/book-a-meeting', '/write-for-us', '/sitemap'])

function Root() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as HTMLElement).closest('a')
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return
    const href = a.getAttribute('href')
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
    const r = resolve(href)
    if (r.external) return
    e.preventDefault()
    navigate(r.to)
  }
  return (
    <div onClick={onClick} className="min-h-screen bg-paper font-sans text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-5 focus:py-3">Skip to content</a>
      <Navbar />
      <main id="main"><Outlet /></main>
      {!NO_CTA.has(pathname.replace(/\/+$/, '')) && <FinalCta />}
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

function Home() {
  const seo = getSeo('/')
  useSeo(seo.title, seo.desc)
  return (
    <>
      <Hero />
      <Campaign />
      <Clients />
      <About />
      <Services />
      <WhyUs />
      <Projects />
      <Testimonials />
      <Blog />
    </>
  )
}

function NotFound() {
  useSeo('Page not found')
  return (
    <>
      <PageHero path="/" title="Page not found" lead="The page you are looking for does not exist or has moved." />
      <Container className="pb-24"><a href="/" className="font-semibold underline decoration-ember decoration-2 underline-offset-4">Back to Home</a></Container>
    </>
  )
}

const BY_KIND: Record<Kind, () => ReactNode> = {
  overview: T.ServicePage, service: T.ServicePage, data: T.ServicePage, other: T.OtherServicesPage,
  about: T.AboutPage, team: T.TeamPage, contact: T.ContactPage, book: T.BookPage,
  cases: T.CaseListPage, case: T.CaseDetailPage,
  // CMS-powered blog replaces old static blog list/post
  blog: CmsBlogListPage, post: T.BlogPostPage,
  portfolio: T.PortfolioPage, sites: T.SitesPage, simple: T.PolicyPage, faq: T.FaqPage,
}

const specials: Record<string, () => ReactNode> = { '/write-for-us': T.WritePage }

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      ...ROUTES.filter((r) => !['/terms-and-conditions', '/support'].includes(r.path)).map((r) => ({
        path: r.path.slice(1),
        Component: (specials[r.path] || BY_KIND[r.kind]) as () => ReactNode,
      })),
      // CMS blog post detail route
      { path: 'blog/:slug', Component: CmsBlogPostPage },
      // Visual sitemap page
      { path: 'sitemap', Component: SitemapPage },
      { path: 'terms-and-conditions', element: <Navigate to="/privacy-policy" replace /> },
      { path: 'support', element: <Navigate to="/contact" replace /> },
      { path: 'portfolio-copy', element: <Navigate to="/portfolio/websites" replace /> },
      { path: 'portfolio-copy-duplicate-18170', element: <Navigate to="/portfolio/digital-vcards" replace /> },
      { path: 'case-studies/virtual-assitance', element: <Navigate to="/case-studies/virtual-assistance" replace /> },
      { path: '*', Component: NotFound },
    ],
  },
])
