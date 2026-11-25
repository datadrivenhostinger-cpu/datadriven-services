/**
 * heroImages.ts
 * Maps every service/page path → a meaningful hero photo.
 * These override the icon-style images that come from the CMS page content.
 */

import emailTeam      from '../assets/pages/2025_02_people-teamwork-laptop-technology-working-email-concept-2048x1242.webp'
import coldEmail      from '../assets/pages/2025_02_Cold-Email-Outreach-for-B2C----1024x865.webp'
import automatedFlows from '../assets/pages/2025_02_Automated-Email-Flows-768x604.webp'
import personalised   from '../assets/pages/2025_02_Personalized-Campaigns-1-1024x1024.webp'
import analytics      from '../assets/pages/2025_02_Analytics-and-Optimization-768x640.webp'
import linkedin       from '../assets/pages/2023_05_Linkedin.webp'
import socialBanner   from '../assets/pages/2021_11_Ravee-Yellow-and-Black-Illustrated-Social-Media-Blog-Banner-1.webp'
import smmAd          from '../assets/pages/2024_11_TCL-SMM-Ad-1.webp'
import chenSeo        from '../assets/pages/2023_08_chennai-seo.webp'
import digitalSeo     from '../assets/pages/2023_08_digital-seo.webp'
import googleAds      from '../assets/pages/2024_11_KM-google-Ads-Report-1024x439.webp'
import brandStory     from '../assets/pages/2023_08_brand-story-1.webp'
import webinarReport  from '../assets/pages/2024_11_Webinar-Marketing-Report-scaled.webp'
import storyxpress    from '../assets/pages/2024_12_Storyxpress-Ad-post-1.webp'
import creativePost   from '../assets/pages/2024_11_Creative-post.webp'
import ddWebsite      from '../assets/pages/elementor_thumbs_DD-Website-q6w0jkpzafpwluikh53rdj8iwthy0v4qe3ly1ucpbc.webp'
import roi            from '../assets/pages/2025_01_ROI-1024x850.webp'
import strategy       from '../assets/pages/2025_01_strategy-768x583.webp'
import b2c            from '../assets/pages/2023_05_B2C-Company.webp'
import b2b            from '../assets/pages/2023_05_B2B.webp'
import expert         from '../assets/pages/2025_01_expert-1024x462.webp'
import kimService     from '../assets/pages/2024_11_KIM-Service-promotion.webp'
import brand          from '../assets/pages/2023_05_brand.webp'
import weCraft        from '../assets/pages/2023_05_We-craft-experience-for-business-to-help-reach-our-customer.-3.webp'
import craft          from '../assets/pages/2023_05_Craft.webp'
import leadGen        from '../assets/pages/2021_11_Lead-Generation-1-scaled.jpg'
import emailMkt       from '../assets/pages/2024_11_Email-Marketing-1024x970.webp'
import increase       from '../assets/pages/2024_11_INcrease-1024x486.webp'
import kimB2b         from '../assets/pages/2024_11_KIM-3D-1.webp'
import ddService      from '../assets/pages/2024_11_DD-Service.webp'
import webinarEva     from '../assets/pages/2024_01_Eva-New-version-B2B-webinar.-1920----1080-px-2-1024x345.png'

export const HERO_IMAGES: Record<string, string> = {
  // ── Digital Marketing ──────────────────────────────────────────────────
  '/digital-marketing':                                      brand,
  '/email-marketing':                                        emailTeam,
  '/outbound-email-marketing':                               coldEmail,
  '/inbound-email-marketing':                                automatedFlows,
  '/linkedin-marketing':                                     linkedin,
  '/organic-social-media-marketing-services-in-india':       socialBanner,
  '/social-media-marketing-ads':                             smmAd,
  '/search-engine-optimization-seo':                         chenSeo,
  '/search-engine-marketing':                                googleAds,
  '/content-marketing-company-in-chennai':                   brandStory,
  '/webinar-marketing-services':                             webinarEva,
  '/video-marketing':                                        storyxpress,
  '/graphic-design-services':                                creativePost,
  '/web-development-services':                               ddWebsite,

  // ── Data Services ──────────────────────────────────────────────────────
  '/data-services':                                          roi,
  '/b2c-data':                                               b2c,
  '/digital-marketing/b2b-data':                             b2b,

  // ── Other Services ─────────────────────────────────────────────────────
  '/other-services':                                         ddService,
  '/b2b-email-marketing-services':                           kimService,
  '/b2c-email-marketing-services':                           personalised,
  '/email-deliverability-consulting':                        analytics,
  '/virtual-assistant-services':                             weCraft,
  '/relationship-building-services':                         craft,

  // ── Case Studies ──────────────────────────────────────────────────────
  '/case-studies':                                           increase,
  '/case-studies/seo':                                       digitalSeo,
  '/case-studies/webinar-marketing':                         webinarReport,
  '/case-studies/virtual-assistance':                        expert,
  '/case-studies/video-creation':                            storyxpress,
  '/case-studies/data-enrichment-services':                  strategy,
  '/case-studies/cloudyugab2b':                              kimB2b,
  '/case-studies/google-ads':                                googleAds,
  '/case-studies/tcl':                                       smmAd,

  // ── Portfolio ─────────────────────────────────────────────────────────
  '/portfolio':                                              creativePost,
  '/portfolio/websites':                                     ddWebsite,
  '/portfolio/digital-vcards':                               brand,
}
