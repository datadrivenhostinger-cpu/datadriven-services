/**
 * seo.ts — Centralised SEO meta titles & descriptions for every page.
 *
 * Rules applied:
 *  - Title:  50–60 chars | Primary keyword first | Brand suffix added by useSeo()
 *  - Desc:   140–160 chars | Action-oriented | Includes primary keyword naturally
 */

export type PageSeo = {
  title: string   // shown in <title> (useSeo adds " | DataDriven Services")
  desc: string    // meta description
}

export const PAGE_SEO: Record<string, PageSeo> = {

  // ─── HOME ────────────────────────────────────────────────────────────────
  '/': {
    title: 'DataDriven Services – Award-winning Best Digital Marketing Agency in Chennai',
    desc: 'DataDriven is an award-winning digital marketing agency in Chennai. We offer email marketing, SEO, LinkedIn, social media, B2B data & lead generation that drive real business results.',
  },

  // ─── COMPANY ─────────────────────────────────────────────────────────────
  '/about-us': {
    title: 'About DataDriven – Top Digital Marketing Company in Chennai',
    desc: "Learn how DataDriven became one of Chennai's most trusted digital marketing agencies. 100+ clients, 250+ projects, 5 years of data-driven marketing expertise.",
  },
  '/our-team': {
    title: 'Meet Our Team – DataDriven Marketing Experts Chennai',
    desc: "Get to know the passionate strategists, designers, and technologists behind DataDriven Services – Chennai's award-winning digital marketing team.",
  },
  '/contact': {
    title: 'Contact DataDriven – Get a Free Digital Marketing Consultation',
    desc: 'Reach out to DataDriven Services in Chennai. Call, email, or fill out the form for a free consultation on email marketing, SEO, social media, and lead generation.',
  },
  '/book-a-meeting': {
    title: 'Book a Free Strategy Meeting – DataDriven Services',
    desc: 'Book a free 1-on-1 strategy call with the DataDriven team. Discuss your marketing goals and get a tailored plan to grow your business online.',
  },
  '/write-for-us': {
    title: 'Write for Us – DataDriven Digital Marketing Blog',
    desc: "Are you a digital marketing expert? Submit a guest post to DataDriven's blog. We accept articles on SEO, email marketing, social media, and content strategy.",
  },

  // ─── DIGITAL MARKETING ───────────────────────────────────────────────────
  '/digital-marketing': {
    title: 'Digital Marketing Services in Chennai – Full-Service Agency',
    desc: 'DataDriven offers full-service digital marketing in Chennai: email, SEO, social media, LinkedIn, content, webinar & video marketing to grow your business online.',
  },
  '/email-marketing': {
    title: 'Email Marketing Services in India – High ROI Campaigns',
    desc: "Boost ROI with DataDriven's expert email marketing services. We create personalised, automated campaigns that deliver 40%+ open rates and measurable lead generation.",
  },
  '/outbound-email-marketing': {
    title: 'Outbound Email Marketing Services – B2B Lead Generation',
    desc: "Generate qualified B2B leads with DataDriven's outbound email marketing. Cold email campaigns crafted for high deliverability, open rates, and reply rates.",
  },
  '/inbound-email-marketing': {
    title: 'Inbound Email Marketing Services – Nurture & Convert Leads',
    desc: "Convert subscribers into customers with DataDriven's inbound email marketing. Automated drip sequences, welcome flows, and segmented campaigns that nurture leads.",
  },
  '/linkedin-marketing': {
    title: 'LinkedIn Marketing Services in India – B2B Lead Generation',
    desc: "Reach decision-makers on LinkedIn with DataDriven's B2B marketing services. Profile optimisation, content strategy, outreach campaigns, and paid ads for real pipeline.",
  },
  '/organic-social-media-marketing-services-in-india': {
    title: 'Organic Social Media Marketing Services in India',
    desc: "Grow your brand organically with DataDriven's social media marketing. Content calendars, community management, and engagement strategies across all major platforms.",
  },
  '/social-media-marketing-ads': {
    title: 'Social Media Advertising Services – Facebook, Instagram & More',
    desc: 'Drive leads and sales with targeted social media ad campaigns. DataDriven manages Facebook, Instagram, and LinkedIn ads with optimised bidding and creative strategy.',
  },
  '/search-engine-optimization-seo': {
    title: 'SEO Services in Chennai – Rank Higher, Get More Traffic',
    desc: "Dominate search rankings with DataDriven's SEO services in Chennai. Technical SEO, keyword research, on-page optimisation, link building, and monthly reporting.",
  },
  '/search-engine-marketing': {
    title: 'Search Engine Marketing (SEM / PPC) Services in Chennai',
    desc: "Get instant search visibility with DataDriven's SEM and Google Ads management. High-converting PPC campaigns with transparent ROI reporting for businesses in India.",
  },
  '/content-marketing-company-in-chennai': {
    title: 'Content Marketing Company in Chennai – SEO-Driven Content',
    desc: "DataDriven's content marketing services help brands attract, engage, and convert audiences. Blog posts, whitepapers, videos, and infographics crafted for SEO and leads.",
  },
  '/webinar-marketing-services': {
    title: 'Webinar Marketing Services in India – End-to-End Management',
    desc: 'From promotion to post-event follow-up, DataDriven manages your webinars end-to-end. Increase registrations, attendance, and pipeline with our webinar marketing service.',
  },
  '/video-marketing': {
    title: 'Video Marketing Services in Chennai – Engage & Convert',
    desc: "Tell your brand story with DataDriven's video marketing. Explainer videos, social reels, YouTube campaigns, and product demos designed to engage and convert viewers.",
  },
  '/graphic-design-services': {
    title: 'Graphic Design Services in Chennai – Creative Digital Design',
    desc: "Professional graphic design services for social media, ads, presentations, and branding. DataDriven's design team creates visuals that capture attention and drive results.",
  },
  '/web-development-services': {
    title: 'WordPress Web Development Services in Chennai',
    desc: "Get a fast, SEO-optimised WordPress website built by DataDriven's developers. Custom design, mobile-first development, and ongoing support for businesses in India.",
  },

  // ─── DATA SERVICES ───────────────────────────────────────────────────────
  '/data-services': {
    title: 'B2B & B2C Data Services in India – Verified Business Data',
    desc: 'DataDriven provides verified, GDPR-compliant B2B and B2C data for email campaigns, cold outreach, and market research. High-accuracy, opt-in contact lists across industries.',
  },
  '/b2c-data': {
    title: 'B2C Data Provider in India – Consumer Contact Lists',
    desc: "Access accurate B2C consumer data for targeted email and SMS campaigns. DataDriven's B2C data lists are verified, segmented by demographics, interests, and location.",
  },
  '/digital-marketing/b2b-data': {
    title: 'B2B Data Provider in India – Business Contact Database',
    desc: "Fuel your B2B outreach with DataDriven's accurate business contact data. Industry, job title, company size, and location-filtered lists for high-precision targeting.",
  },

  // ─── OTHER SERVICES ──────────────────────────────────────────────────────
  '/other-services': {
    title: 'Other Marketing Services – Email Deliverability, VA & More',
    desc: 'DataDriven offers specialised services including B2B & B2C email marketing, email deliverability consulting, virtual assistant services, and relationship building.',
  },
  '/b2b-email-marketing-services': {
    title: 'B2B Email Marketing Services in India – Lead Generation',
    desc: "DataDriven's B2B email marketing service generates qualified leads for your sales team. Strategy, copywriting, list management, and campaign execution all included.",
  },
  '/b2c-email-marketing-services': {
    title: 'B2C Email Marketing Services – Drive Consumer Sales',
    desc: "Engage consumers and drive repeat purchases with DataDriven's B2C email marketing. Personalised campaigns, automated flows, and performance analytics included.",
  },
  '/email-deliverability-consulting': {
    title: 'Email Deliverability Consulting – Land in the Inbox',
    desc: "Struggling with low open rates or spam folder issues? DataDriven's email deliverability consultants fix authentication, warm-up sequences, and sender reputation.",
  },
  '/virtual-assistant-services': {
    title: 'Virtual Assistant Services in India – Remote Support',
    desc: "Delegate your marketing, admin, and research tasks to DataDriven's experienced virtual assistants. Flexible, cost-effective VA support for businesses across India.",
  },
  '/relationship-building-services': {
    title: 'Relationship Building Services – B2B Outreach & Networking',
    desc: 'Build lasting business relationships with DataDriven\'s personalised outreach and networking services. We help you connect with decision-makers and grow your pipeline.',
  },

  // ─── CASE STUDIES ────────────────────────────────────────────────────────
  '/case-studies': {
    title: 'Digital Marketing Case Studies – Real Results by DataDriven',
    desc: "Explore DataDriven's client case studies showcasing measurable results in SEO, email marketing, Google Ads, webinars, LinkedIn, and data enrichment campaigns.",
  },
  '/case-studies/seo': {
    title: 'SEO Case Study – How DataDriven Drove Organic Growth',
    desc: "See how DataDriven's SEO strategy delivered significant ranking improvements and organic traffic growth for a client in a competitive niche. Full results inside.",
  },
  '/case-studies/webinar-marketing': {
    title: 'Webinar Marketing Case Study – Leads & Registrations',
    desc: "Discover how DataDriven's webinar marketing service generated hundreds of qualified registrations and nurtured attendees into paying clients for a B2B brand.",
  },
  '/case-studies/virtual-assistance': {
    title: 'Virtual Assistance Case Study – Scaling Operations Efficiently',
    desc: "Learn how DataDriven's virtual assistant services helped a growing business scale operations, reduce costs, and free up leadership time for strategic work.",
  },
  '/case-studies/video-creation': {
    title: 'Video Creation Case Study – Engaging Brand Content',
    desc: 'Find out how DataDriven created compelling video content that boosted brand visibility, social engagement, and lead generation for a client across multiple channels.',
  },
  '/case-studies/data-enrichment-services': {
    title: 'Data Enrichment Case Study – Cleaner Data, Better Results',
    desc: "See how DataDriven's data enrichment service improved email list quality, boosted deliverability, and dramatically increased campaign ROI for a B2B client.",
  },
  '/case-studies/cloudyugab2b': {
    title: 'CloudYuga B2B Marketing Case Study – DataDriven',
    desc: 'Explore how DataDriven helped CloudYuga reach enterprise decision-makers through targeted B2B email campaigns, LinkedIn outreach, and data-driven strategy.',
  },
  '/case-studies/google-ads': {
    title: 'Google Ads Case Study – High ROI PPC Campaign Results',
    desc: "See how DataDriven's Google Ads management delivered measurable ROI for a client — lower cost-per-click, higher conversion rates, and increased lead volume.",
  },
  '/case-studies/tcl': {
    title: 'TCL Social Media Marketing Case Study – DataDriven',
    desc: "Discover how DataDriven managed TCL's social media marketing campaigns, growing brand awareness and engagement across Facebook and Instagram in India.",
  },

  // ─── PORTFOLIO ───────────────────────────────────────────────────────────
  '/portfolio': {
    title: 'Our Portfolio – Digital Marketing Work by DataDriven',
    desc: "Browse DataDriven's portfolio of creative work: social media content, video campaigns, graphic designs, websites, and digital vCards built for clients across industries.",
  },
  '/portfolio/websites': {
    title: 'Website Portfolio – Web Development Projects by DataDriven',
    desc: 'Explore websites designed and developed by DataDriven Services. Fast, SEO-friendly, mobile-first WordPress and custom websites built for businesses across India.',
  },
  '/portfolio/digital-vcards': {
    title: 'Digital VCards Portfolio – Interactive Business Cards',
    desc: "View DataDriven's digital vCard designs — interactive, mobile-friendly electronic business cards that make a lasting impression and generate more leads.",
  },

  // ─── BLOG ────────────────────────────────────────────────────────────────
  '/blog': {
    title: 'Digital Marketing Blog – Tips, Guides & Insights',
    desc: 'The DataDriven blog covers email marketing, SEO, social media, LinkedIn, B2B lead generation, and data strategies. Actionable tips from our team of marketing experts.',
  },
  '/blog/b2b-lead-generation-strategies': {
    title: '5 Proven Strategies to Skyrocket Your B2B Lead Generation',
    desc: 'Discover 5 battle-tested B2B lead generation strategies used by DataDriven to help clients fill their sales pipeline with qualified prospects and close more deals.',
  },
  '/blog/crucial-insights-google-and-yahoos-february-email-updates': {
    title: "Google & Yahoo's February Email Updates – What Senders Must Know",
    desc: "Google and Yahoo's 2024 email sender requirements changed deliverability forever. Learn what DMARC, DKIM, and one-click unsubscribe changes mean for your campaigns.",
  },
  '/blog/top-10-webinar-marketing-agencies-in-india': {
    title: 'Top 10 Webinar Marketing Agencies in India (2025 Guide)',
    desc: 'Looking for the best webinar marketing agency in India? We ranked the top 10 agencies based on services, pricing, and client results to help you choose the right partner.',
  },
  '/blog/10-best-seo-agencies-in-chennai': {
    title: '10 Best SEO Agencies in Chennai – Ranked & Reviewed',
    desc: "Find Chennai's top SEO agencies of 2025. We reviewed 10 companies on expertise, pricing, and client results so you can find the right SEO partner for your business.",
  },
  '/blog/benefits-of-social-bookmarking-in-seo': {
    title: 'How Social Bookmarking Contributes to Better SEO Results',
    desc: 'Learn how social bookmarking can improve your SEO by building backlinks, increasing crawl frequency, and driving referral traffic to your website.',
  },
  '/blog/how-social-media-marketing-strategy-helps-startup-businesses': {
    title: 'How Social Media Marketing Strategy Helps Startup Businesses',
    desc: 'A strong social media marketing strategy is vital for startup growth. Discover how startups can use organic and paid social media to build brand awareness and get customers.',
  },

  // ─── LEGAL & UTILITY ─────────────────────────────────────────────────────
  '/privacy-policy': {
    title: 'Privacy Policy – DataDriven Services',
    desc: "Read DataDriven Services' privacy policy to understand how we collect, use, and protect your personal information when you use our website and marketing services.",
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions – DataDriven Services',
    desc: 'Review the terms and conditions governing the use of DataDriven Services website and all digital marketing services offered by our agency.',
  },
  '/faq': {
    title: 'Frequently Asked Questions – DataDriven Services',
    desc: "Have questions about DataDriven's digital marketing services? Find answers to the most common questions about our email marketing, SEO, data, and pricing.",
  },
  '/sitemap': {
    title: 'Sitemap – DataDriven Services',
    desc: 'Complete sitemap of all pages on the DataDriven Services website — services, blog, case studies, portfolio, and more.',
  },
}

/** Get the SEO data for a given path, with a fallback for unknown paths */
export function getSeo(path: string): PageSeo {
  const clean = path.replace(/\/+$/, '') || '/'
  return (
    PAGE_SEO[clean] || {
      title: 'DataDriven Services – Digital Marketing Agency Chennai',
      desc: 'DataDriven Services is a full-service digital marketing agency in Chennai offering email marketing, SEO, B2B data, and lead generation.',
    }
  )
}
