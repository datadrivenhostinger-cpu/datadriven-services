import logoWhite from '../assets/DD-LOGO-Brand-New.svg'
import { Button, Container } from './ui'

const head = 'mb-4 font-mono text-[15px] font-bold text-ink'
const link = 'inline-block py-1.5 text-[15px] text-ink/75 transition-colors hover:text-ember-deep'

const SOCIAL = [
  { n: 'Facebook', d: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8Z' },
  { n: 'LinkedIn', d: 'M5 9h4v11H5V9Zm2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4 5h4v1.5c.6-1 2-1.8 3.8-1.8 3.400 0 4.200 2.200 4.200 5.300V20h-4v-5.200c0-1.300-.2-2.500-1.800-2.500S15 13.500 15 14.800V20h-4V9Z' },
  { n: 'Instagram', d: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z' },
  { n: 'YouTube', d: 'M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Zm7 1.5v5l4.500-2.500L10 9.500Z' },
]

const QUICK = [['About Us', '/about-us'], ['Digital Marketing', '/digital-marketing'], ['Data', '/data-services'], ['Blog', '/blog'], ['Contact', '/contact']]
const USEFUL = [['Privacy Policy', '/privacy-policy'], ['Terms and Conditions', '/terms-and-conditions'], ['Support', '/support'], ['FAQ', '/faq'], ['Sitemap', '/sitemap']]

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-white text-ink">
      <Container className="pt-10 lg:pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.7fr_1fr_1.15fr_1.1fr_1.6fr] lg:gap-x-10">
          <div className="col-span-2 lg:col-span-1">
            <a href="/" aria-label="DataDriven – Lead Generation Made Easy!" className="inline-block">
              <img src={logoWhite} alt="DataDriven – Lead Generation Made Easy!" className="h-14 w-auto max-w-full sm:h-16" />
            </a>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-ink/70">
              We are a trusted, well-known, full-service, and technologically advanced digital marketing company with a team that consists of strategists, designers, content producers, and technologists.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIAL.map((s) => (
                <a key={s.n} href="#" aria-label={s.n} className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone text-ink transition hover:bg-ember hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill={s.n === 'Instagram' ? 'none' : 'currentColor'} stroke={s.n === 'Instagram' ? 'currentColor' : 'none'} strokeWidth="1.8" aria-hidden>
                    <path d={s.d} />
                    {s.n === 'Instagram' && <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick Links">
            <h3 className={head}>Quick Links</h3>
            <ul>{QUICK.map(([l, h]) => <li key={l}><a href={h} className={link}>{l}</a></li>)}</ul>
          </nav>
          <nav aria-label="Useful Links">
            <h3 className={head}>Useful Links</h3>
            <ul>{USEFUL.map(([l, h]) => <li key={l}><a href={h} className={link}>{l}</a></li>)}</ul>
          </nav>

          <div className="col-span-2 sm:col-span-1">
            <h3 className={head}>Work Hours</h3>
            <p className="py-1.5 text-[15px] leading-[1.6] text-ink/75">10 AM - 07 PM , Monday - Friday</p>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h3 className={head}>Address</h3>
            <address className="not-italic">
              <p className="py-1.5 text-[15px] leading-[1.6] text-ink/75">12/11, Thilagar Street, Saligramam, Chennai - 600093</p>
              <a href="mailto:karthik@datadriven-services.com" className="flex items-center gap-2 py-1.5 text-[15px] font-medium text-ink transition-colors hover:text-ember-deep"><svg viewBox="0 0 24 24" className="h-4 w-4 text-ember-deep" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>Email Us</a>
              <a href="tel:+919500087415" className="flex items-center gap-2 py-1.5 text-[15px] font-medium text-ink transition-colors hover:text-ember-deep"><svg viewBox="0 0 24 24" className="h-4 w-4 text-ember-deep" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>Call Us</a>
            </address>
            <div className="mt-4">
              <Button href="/contact">Make Appointment</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1.5 border-t border-ink/10 py-6 text-[13.5px] text-ink/60 sm:flex-row sm:justify-between">
          <span>DataDriven Services – A Digital Marketing Agency</span>
          <span>Copyright © 2024. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  )
}
