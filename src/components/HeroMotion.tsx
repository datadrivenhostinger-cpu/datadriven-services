import type { ReactNode } from 'react'

const N = '#091b65'
const B = '#0141e1'
const C = '#01c7fa'
const S = '#dcecfb'

type Theme = 'email' | 'linkedin' | 'social' | 'seo' | 'sem' | 'content' | 'video' | 'design' | 'web' | 'people' | 'support' | 'growth'

export function themeFor(path: string): Theme {
  const p = path.toLowerCase()
  if (/email|deliverab|newsletter/.test(p)) return 'email'
  if (/linkedin/.test(p)) return 'linkedin'
  if (/social/.test(p)) return 'social'
  if (/search-engine-marketing|ads|ppc/.test(p)) return 'sem'
  if (/seo|search/.test(p)) return 'seo'
  if (/content|blog|write|case|portfolio/.test(p)) return 'content'
  if (/webinar|video|meeting/.test(p)) return 'video'
  if (/graphic|design|vcard/.test(p)) return 'design'
  if (/web|wordpress|develop/.test(p)) return 'web'
  if (/relationship|team|about|company|contact/.test(p)) return 'people'
  if (/virtual|assistant|support|faq|other|b2b|b2c/.test(p)) return 'support'
  return 'growth'
}

const Card = ({ children, label }: { children: ReactNode; label: string }) => (
  <div role="img" aria-label={label} className="mt-8 hidden overflow-hidden rounded-2xl bg-white/80 shadow-card ring-1 ring-white sm:block">
    <svg viewBox="0 0 560 170" className="block h-auto w-full" fill="none">
      <defs>
        <linearGradient id="mgbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#eaf5ff" /><stop offset="1" stopColor="#d8f4ff" /></linearGradient>
      </defs>
      <rect width="560" height="170" fill="url(#mgbg)" />
      {children}
    </svg>
  </div>
)

const Bars = ({ x = 40, n = 9, base = 140 }) => (
  <>
    {Array.from({ length: n }).map((_, i) => (
      <rect key={i} x={x + i * 26} y={base - (30 + ((i * 37) % 70))} width="14" height={30 + ((i * 37) % 70)} rx="4" fill={i % 3 ? B : C} opacity=".85" className="mg-bar" style={{ ['--d' as string]: `${i * 0.18}s` }} />
    ))}
  </>
)

const Node = ({ x, y, r = 14, d = 0, c = B }: { x: number; y: number; r?: number; d?: number; c?: string }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={c} className="mg-pulse" style={{ ['--d' as string]: `${d}s` }} />
    <circle cx={x} cy={y} r={r * 0.7} fill={c} />
    <circle cx={x} cy={y - r * 0.15} r={r * 0.22} fill="#fff" />
    <path d={`M${x - r * 0.42} ${y + r * 0.45}a${r * 0.42} ${r * 0.3} 0 0 1 ${r * 0.84} 0Z`} fill="#fff" />
  </g>
)

export default function HeroMotion({ path }: { path: string }) {
  const t = themeFor(path)
  switch (t) {

    // ── Email Marketing: open rates + inbox funnel ─────────────────────────
    case 'email':
      return (
        <Card label="Email campaigns driving open rates and inbox delivery">
          {/* Stat chips */}
          {[{ x: 30, label: '42% Open Rate', c: N }, { x: 185, label: '18% CTR', c: B }, { x: 310, label: '6× ROI', c: C }].map((s) => (
            <g key={s.x} className="mg-float" style={{ ['--d' as string]: `${s.x * 0.004}s` }}>
              <rect x={s.x} y="14" width="140" height="30" rx="10" fill={s.c} />
              <rect x={s.x + 12} y="24" width="80" height="10" rx="5" fill="#fff" opacity=".9" />
            </g>
          ))}
          {/* Emails flying along a curved path */}
          <path d="M60 110C160 55 320 55 460 100" stroke={B} strokeWidth="2" className="mg-dash" opacity=".5" />
          {[0, 1.1, 2.2].map((d) => (
            <g key={d} className="mg-fly" style={{ ['--d' as string]: `${d}s` }}>
              <rect x="68" y="92" width="44" height="30" rx="6" fill="#fff" stroke={B} strokeWidth="2" />
              <path d="m70 96 20 14 20-14" stroke={B} strokeWidth="2" />
            </g>
          ))}
          {/* Inbox box */}
          <g className="mg-float" style={{ ['--d' as string]: '.4s' }}>
            <rect x="430" y="68" width="94" height="68" rx="12" fill={N} />
            <path d="M446 84h62M446 100h44M446 116h52" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
            <circle cx="522" cy="70" r="12" fill={C} className="mg-pulse" />
            <text x="518" y="74" fontSize="12" fill="#fff" fontWeight="bold">✓</text>
          </g>
        </Card>
      )

    // ── LinkedIn: B2B decision-maker network ───────────────────────────────
    case 'linkedin':
      return (
        <Card label="LinkedIn B2B outreach reaching decision-makers">
          <g stroke={B} strokeWidth="2" className="mg-dash" opacity=".6">
            <path d="M120 85 220 45M220 45 340 90M340 90 450 48M220 45 260 130M340 90 260 130M450 48 490 125" />
          </g>
          {/* CEO / Decision-maker node */}
          <Node x={120} y={85} r={22} d={0} c={N} />
          <Node x={220} y={45} d={0.4} />
          <Node x={340} y={90} r={20} d={0.8} c={N} />
          <Node x={450} y={48} d={1.2} />
          <Node x={260} y={130} r={12} d={1.6} c={C} />
          <Node x={490} y={125} r={12} d={2} c={C} />
          {/* "Connected" badge */}
          <g className="mg-float" style={{ ['--d' as string]: '1.4s' }}>
            <rect x="358" y="52" width="76" height="20" rx="8" fill={C} />
            <rect x="368" y="58" width="46" height="8" rx="4" fill="#fff" opacity=".9" />
          </g>
        </Card>
      )

    // ── Social Media: engagement metrics dashboard ─────────────────────────
    case 'social':
      return (
        <Card label="Social media posts driving likes, shares and engagement">
          {/* Post card */}
          <g className="mg-float">
            <rect x="30" y="20" width="160" height="130" rx="12" fill="#fff" stroke={B} strokeWidth="2" />
            <rect x="30" y="20" width="160" height="40" rx="12" fill={N} />
            <rect x="42" y="32" width="80" height="8" rx="4" fill="#fff" opacity=".8" />
            <rect x="42" y="68" width="136" height="8" rx="4" fill={S} />
            <rect x="42" y="84" width="100" height="8" rx="4" fill={S} />
            {/* Reactions row */}
            {['❤️', '👍', '🔁'].map((e, i) => (
              <text key={e} x={44 + i * 42} y="122" fontSize="14">{e}</text>
            ))}
            <rect x="42" y="130" width="40" height="8" rx="4" fill={C} opacity=".6" />
          </g>
          {/* Floating engagement numbers */}
          {[{ x: 230, y: 30, w: 110, label: '2.4K Likes' }, { x: 230, y: 72, w: 95, label: '580 Shares' }, { x: 230, y: 114, w: 120, label: '12K Reached' }].map((s, i) => (
            <g key={s.y} className="mg-rise" style={{ ['--d' as string]: `${i * 0.6}s` }}>
              <rect x={s.x} y={s.y} width={s.w} height="28" rx="10" fill={i === 0 ? N : i === 1 ? B : C} />
              <rect x={s.x + 12} y={s.y + 10} width={s.w - 28} height="8" rx="4" fill="#fff" opacity=".9" />
            </g>
          ))}
          {/* Trend line */}
          <path d="M385 140 420 110 450 120 490 80 525 55" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mg-draw" />
          <circle cx="525" cy="55" r="8" fill={C} className="mg-pulse" />
        </Card>
      )

    // ── SEO: keyword rankings climbing ────────────────────────────────────
    case 'seo':
      return (
        <Card label="SEO rankings climbing to position 1 on search engines">
          {/* Rank positions */}
          {[{ pos: '#1', y: 25, c: C, w: 180 }, { pos: '#3', y: 65, c: B, w: 150 }, { pos: '#5', y: 105, c: N, w: 120 }].map((r, i) => (
            <g key={r.pos} className="mg-float" style={{ ['--d' as string]: `${i * 0.4}s` }}>
              <rect x="30" y={r.y} width={r.w} height="30" rx="8" fill={i === 0 ? '#fff' : '#fff'} stroke={r.c} strokeWidth="2" />
              <rect x="40" y={r.y + 11} width="8" height="8" rx="2" fill={r.c} />
              <rect x="56" y={r.y + 11} width={r.w - 36} height="8" rx="4" fill={r.c} opacity=".35" />
              <text x="40" y={r.y + 22} fontSize="11" fill={r.c} fontWeight="bold">{r.pos}</text>
            </g>
          ))}
          {/* Growth chart */}
          <Bars x={260} n={8} base={150} />
          <path d="M264 130 300 108 336 115 374 80 410 55 448 36" stroke={N} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mg-draw" />
          <g className="mg-float" style={{ ['--d' as string]: '.6s' }}>
            <circle cx="510" cy="85" r="32" fill="#fff" stroke={N} strokeWidth="6" />
            <path d="m530 105 22 22" stroke={N} strokeWidth="8" strokeLinecap="round" />
            <path d="m498 85 8 8 14-16" stroke={C} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </Card>
      )

    // ── SEM / Google Ads: ad click with ROI metrics ────────────────────────
    case 'sem':
      return (
        <Card label="Google Ads campaign delivering high ROI clicks">
          {/* Google-style ad cards */}
          {[{ y: 18, label: 'Ad · Sponsored', w: 180 }, { y: 60, label: 'Organic Result', w: 160 }, { y: 102, label: 'Organic Result', w: 140 }].map((a, i) => (
            <g key={a.y} className="mg-float" style={{ ['--d' as string]: `${i * 0.4}s` }}>
              <rect x="28" y={a.y} width={a.w + 20} height="34" rx="8" fill={i === 0 ? '#fff9e6' : '#fff'} stroke={i === 0 ? '#fbbf24' : S} strokeWidth="2" />
              <rect x="40" y={a.y + 13} width={a.w} height="8" rx="4" fill={i === 0 ? '#fbbf24' : B} opacity={i === 0 ? '.7' : '.35'} />
            </g>
          ))}
          {/* Click cursor */}
          <g className="mg-float" style={{ ['--d' as string]: '.6s' }}>
            <path d="M230 55l8 36 9-12 13 14 5-6-13-14 14-4Z" fill={N} />
          </g>
          {/* CPC & Conversion metrics */}
          <g className="mg-float" style={{ ['--d' as string]: '1s' }}>
            <rect x="270" y="20" width="260" height="130" rx="14" fill="#fff" stroke={S} strokeWidth="2" />
            <rect x="282" y="34" width="80" height="9" rx="4" fill={N} opacity=".8" />
            <Bars x={282} n={7} base={138} />
            <path d="M286 118 316 95 346 102 376 76 406 60 436 42" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mg-draw" />
          </g>
        </Card>
      )

    // ── Content Marketing: blog → distribute → measure leads ──────────────
    case 'content':
      return (
        <Card label="Content marketing pipeline from blog to leads">
          {/* Blog post card */}
          <g className="mg-float">
            <rect x="28" y="18" width="140" height="134" rx="12" fill="#fff" stroke={B} strokeWidth="2" />
            <rect x="40" y="30" width="96" height="10" rx="5" fill={N} />
            {[48, 66, 84, 102].map((y, i) => (
              <rect key={y} x="40" y={y} width={110 - (i % 2) * 32} height="8" rx="4" fill={i % 2 ? S : B} opacity=".75" className="mg-type" style={{ ['--d' as string]: `${i * 0.35}s` }} />
            ))}
            {/* Reading time + share CTA */}
            <rect x="40" y="120" width="30" height="8" rx="4" fill={C} opacity=".8" />
            <rect x="78" y="120" width="50" height="8" rx="4" fill={N} opacity=".3" />
            <rect x="136" y="120" width="20" height="8" rx="4" fill={B} opacity=".5" />
          </g>
          {/* Distribute arrows */}
          <path d="M174 60 240 38M174 85 240 85M174 112 240 132" stroke={B} strokeWidth="2" strokeDasharray="5 3" className="mg-dash" opacity=".55" />
          {/* Channel chips: Blog, Social, Email */}
          {[{ y: 24, label: 'Blog Post', c: N }, { y: 72, label: 'Social', c: B }, { y: 120, label: 'Email', c: C }].map((s, i) => (
            <g key={s.y} className="mg-float" style={{ ['--d' as string]: `${i * 0.5}s` }}>
              <rect x="244" y={s.y} width="96" height="28" rx="10" fill={s.c} />
              <rect x="256" y={s.y + 10} width={60 - i * 4} height="8" rx="4" fill="#fff" opacity=".9" />
            </g>
          ))}
          {/* Analytics / Leads panel */}
          <g className="mg-float" style={{ ['--d' as string]: '1s' }}>
            <rect x="366" y="22" width="162" height="126" rx="14" fill="#fff" stroke={S} strokeWidth="2" />
            <rect x="378" y="36" width="70" height="9" rx="4" fill={N} opacity=".8" />
            {/* Mini bar chart */}
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={378 + i * 24} y={100 - i * 14} width="16" height={22 + i * 14} rx="4" fill={i % 2 ? B : C} opacity=".9" className="mg-bar" style={{ ['--d' as string]: `${i * 0.2}s` }} />
            ))}
            {/* Trend line */}
            <path d="M380 112 404 96 428 100 462 76 500 56" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mg-draw" />
            <circle cx="500" cy="56" r="7" fill={C} className="mg-pulse" />
            {/* Leads label */}
            <rect x="378" y="136" width="60" height="8" rx="4" fill={B} opacity=".25" />
            <rect x="446" y="136" width="40" height="8" rx="4" fill={C} opacity=".5" />
          </g>
        </Card>
      )

    // ── Webinar / Video: live event with audience ──────────────────────────
    case 'video':
      return (
        <Card label="Live webinar driving registrations and pipeline">
          {/* Video screen */}
          <g className="mg-float">
            <rect x="28" y="18" width="240" height="140" rx="14" fill={N} />
            <rect x="28" y="18" width="240" height="30" rx="14" fill="#000" opacity=".3" />
            {/* Live badge */}
            <circle cx="48" cy="33" r="6" fill="#ef4444" className="mg-pulse" />
            <rect x="60" y="27" width="28" height="12" rx="4" fill="#ef4444" opacity=".9" />
            {/* Play icon */}
            <circle cx="148" cy="100" r="30" fill={B} opacity=".85" />
            <path d="M138 86 172 100 138 114Z" fill="#fff" />
          </g>
          {/* Attendee count / registration chips */}
          {[{ x: 290, y: 24, label: '1,240 Registered' }, { x: 290, y: 68, label: '876 Live Now' }, { x: 290, y: 112, label: '94 Leads' }].map((s, i) => (
            <g key={s.y} className="mg-float" style={{ ['--d' as string]: `${i * 0.5}s` }}>
              <rect x={s.x} y={s.y} width="240" height="32" rx="10" fill={i === 0 ? N : i === 1 ? B : C} />
              <Node x={s.x + 20} y={s.y + 16} r={9} d={i * 0.4} c="#fff" />
              <rect x={s.x + 36} y={s.y + 12} width={140 - i * 10} height="8" rx="4" fill="#fff" opacity=".85" />
            </g>
          ))}
        </Card>
      )

    // ── Graphic Design: brand identity tools ──────────────────────────────
    case 'design':
      return (
        <Card label="Creative graphic design and brand identity work">
          {/* Colour palette */}
          <g className="mg-float">
            {[N, B, C, '#fbbf24', '#10b981'].map((c, i) => (
              <circle key={c} cx={56 + i * 36} cy="40" r="20" fill={c} stroke="#fff" strokeWidth="3" />
            ))}
          </g>
          {/* Design canvas */}
          <g className="mg-float" style={{ ['--d' as string]: '.6s' }}>
            <rect x="28" y="72" width="220" height="84" rx="14" fill="#fff" stroke={B} strokeWidth="2" />
            <rect x="44" y="86" width="88" height="56" rx="8" fill={N} />
            <circle cx="88" cy="100" r="14" fill={C} opacity=".9" />
            <path d="M56 128 78 108 100 118 122 95 132 142Z" fill={B} opacity=".8" />
            <rect x="144" y="86" width="88" height="12" rx="6" fill={S} />
            <rect x="144" y="106" width="66" height="10" rx="5" fill={B} opacity=".4" />
            <rect x="144" y="122" width="78" height="10" rx="5" fill={B} opacity=".25" />
          </g>
          {/* Device preview: mobile */}
          <g className="mg-float" style={{ ['--d' as string]: '1.1s' }}>
            <rect x="274" y="28" width="68" height="118" rx="14" fill="#fff" stroke={N} strokeWidth="3" />
            <rect x="280" y="40" width="56" height="80" rx="6" fill={S} />
            <rect x="286" y="48" width="44" height="8" rx="4" fill={N} opacity=".7" />
            <rect x="286" y="62" width="30" height="6" rx="3" fill={B} opacity=".5" />
            <rect x="286" y="94" width="44" height="20" rx="6" fill={B} />
            <circle cx="308" cy="132" r="5" fill={S} />
          </g>
          {/* Stars / rating */}
          <g className="mg-float" style={{ ['--d' as string]: '1.5s' }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <text key={i} x={372 + i * 26} y="62" fontSize="20" fill="#fbbf24">★</text>
            ))}
            <rect x="372" y="72" width="100" height="82" rx="12" fill="#fff" stroke={S} strokeWidth="2" />
            <rect x="384" y="86" width="76" height="8" rx="4" fill={N} opacity=".7" />
            <rect x="384" y="102" width="58" height="6" rx="3" fill={B} opacity=".45" />
            <rect x="384" y="116" width="66" height="6" rx="3" fill={B} opacity=".3" />
            <rect x="384" y="134" width="50" height="14" rx="7" fill={B} />
          </g>
        </Card>
      )

    // ── Web Development: browser + mobile + speed ─────────────────────────
    case 'web':
      return (
        <Card label="WordPress website development with speed and SEO">
          {/* Browser window */}
          <g className="mg-float">
            <rect x="28" y="18" width="260" height="140" rx="14" fill="#fff" stroke={B} strokeWidth="2" />
            <rect x="28" y="18" width="260" height="34" rx="14" fill={N} />
            {[48, 62, 76].map((x, i) => (
              <circle key={x} cx={x} cy="35" r="5" fill={i === 0 ? '#ef4444' : i === 1 ? '#fbbf24' : '#22c55e'} />
            ))}
            <rect x="96" y="27" width="130" height="16" rx="6" fill="#fff" opacity=".15" />
            {/* Page content */}
            <rect x="40" y="66" width="100" height="12" rx="6" fill={N} opacity=".8" />
            {[86, 102, 118].map((y, i) => (
              <rect key={y} x="40" y={y} width={180 - i * 30} height="8" rx="4" fill={B} opacity=".25" />
            ))}
            <rect x="40" y="136" width="70" height="16" rx="8" fill={B} />
            {/* Hero image area */}
            <rect x="166" y="62" width="106" height="78" rx="8" fill={S} />
            <circle cx="219" cy="88" r="16" fill={C} opacity=".7" />
            <path d="M176 136 200 112 220 122 240 100 272 136Z" fill={B} opacity=".5" />
          </g>
          {/* Speed badge */}
          <g className="mg-float" style={{ ['--d' as string]: '.8s' }}>
            <rect x="306" y="18" width="224" height="58" rx="12" fill="#fff" stroke={S} strokeWidth="2" />
            <text x="324" y="40" fontSize="11" fill={N} fontWeight="bold">Page Speed Score</text>
            <circle cx="468" cy="47" r="20" fill="none" stroke="#22c55e" strokeWidth="6" />
            <text x="460" y="52" fontSize="13" fill="#22c55e" fontWeight="bold">98</text>
          </g>
          {/* Mobile preview */}
          <g className="mg-float" style={{ ['--d' as string]: '1.2s' }}>
            <rect x="306" y="90" width="58" height="96" rx="10" fill="#fff" stroke={N} strokeWidth="3" />
            <rect x="312" y="100" width="46" height="68" rx="6" fill={S} />
            <rect x="316" y="106" width="38" height="8" rx="4" fill={N} opacity=".7" />
            <rect x="316" y="120" width="26" height="6" rx="3" fill={B} opacity=".45" />
            <rect x="316" y="152" width="38" height="12" rx="6" fill={B} />
          </g>
          {/* SEO score */}
          <g className="mg-float" style={{ ['--d' as string]: '1.6s' }}>
            <rect x="378" y="90" width="152" height="96" rx="12" fill="#fff" stroke={S} strokeWidth="2" />
            <rect x="390" y="104" width="60" height="9" rx="4" fill={N} opacity=".7" />
            <Bars x={390} n={5} base={174} />
          </g>
        </Card>
      )

    // ── People / Relationship / About: team collaboration ─────────────────
    case 'people':
      return (
        <Card label="A collaborative data-driven marketing team">
          {/* Connection web */}
          <path d="M150 85 285 48 420 85 285 130Z" stroke={B} strokeWidth="2" className="mg-dash" opacity=".5" />
          <Node x={150} y={85} r={26} d={0} c={N} />
          <Node x={285} y={48} r={22} d={0.5} />
          <Node x={420} y={85} r={26} d={1} c={N} />
          <Node x={285} y={130} r={20} d={1.5} c={C} />
          {/* Metric chips */}
          {[{ x: 42, y: 18, label: '100+ Clients' }, { x: 200, y: 18, label: '250+ Projects' }, { x: 360, y: 18, label: '5 Years' }].map((s, i) => (
            <g key={s.x} className="mg-float" style={{ ['--d' as string]: `${i * 0.4}s` }}>
              <rect x={s.x} y={s.y} width="124" height="26" rx="10" fill={i === 0 ? N : i === 1 ? B : C} />
              <rect x={s.x + 10} y={s.y + 9} width="80" height="8" rx="4" fill="#fff" opacity=".9" />
            </g>
          ))}
        </Card>
      )

    // ── Support / VA / Other Services: task management ────────────────────
    case 'support':
      return (
        <Card label="Virtual assistant handling tasks and campaigns">
          {/* Task checklist */}
          {[{ label: 'Email Campaign Setup', done: true }, { label: 'Lead List Research', done: true }, { label: 'CRM Data Entry', done: false }].map((task, i) => (
            <g key={i} className="mg-float" style={{ ['--d' as string]: `${i * 0.5}s` }}>
              <rect x="28" y={22 + i * 44} width="260" height="34" rx="10" fill="#fff" stroke={task.done ? C : S} strokeWidth="2" />
              <circle cx="50" cy={39 + i * 44} r="10" fill={task.done ? C : S} />
              {task.done && <path d={`m44 ${39 + i * 44} 5 5 9-10`} stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />}
              <rect x="68" y={35 + i * 44} width={task.done ? 140 : 120} height="8" rx="4" fill={B} opacity={task.done ? '.75' : '.45'} className="mg-type" style={{ ['--d' as string]: `${i * 0.5}s` }} />
            </g>
          ))}
          {/* Completion metrics */}
          <g className="mg-float" style={{ ['--d' as string]: '1s' }}>
            <rect x="310" y="22" width="220" height="130" rx="14" fill="#fff" stroke={S} strokeWidth="2" />
            <rect x="322" y="36" width="70" height="9" rx="4" fill={N} opacity=".7" />
            <Bars x={322} n={6} base={140} />
            <path d="M326 128 358 108 390 115 422 88 454 68 490 48" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mg-draw" />
          </g>
        </Card>
      )

    // ── Default / Growth: data-driven marketing dashboard ─────────────────
    default:
      return (
        <Card label="Data-driven digital marketing growth dashboard">
          {/* KPI chips */}
          {[{ x: 28, y: 14, label: 'Leads +148%', c: N }, { x: 196, y: 14, label: 'ROI 6.2×', c: B }, { x: 344, y: 14, label: 'Open 42%', c: C }].map((s, i) => (
            <g key={s.x} className="mg-float" style={{ ['--d' as string]: `${i * 0.35}s` }}>
              <rect x={s.x} y={s.y} width="148" height="30" rx="10" fill={s.c} />
              <rect x={s.x + 12} y={s.y + 11} width="90" height="8" rx="4" fill="#fff" opacity=".9" />
            </g>
          ))}
          {/* Bar chart */}
          <Bars x={40} n={10} base={152} />
          {/* Growth trend line */}
          <path d="M44 142 100 118 158 128 220 100 280 80 340 62 400 44 460 28 520 18" stroke={N} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mg-draw" />
          <circle cx="520" cy="18" r="9" fill={C} className="mg-pulse" />
          <circle cx="520" cy="18" r="8" fill={C} />
        </Card>
      )
  }
}
