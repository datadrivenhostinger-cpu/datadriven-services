import type { ReactNode } from 'react'

const N = '#091b65'
const B = '#0141e1'
const C = '#01c7fa'
const S = '#dcecfb'

type Theme = 'email' | 'linkedin' | 'social' | 'seo' | 'sem' | 'content' | 'video' | 'design' | 'web' | 'data' | 'people' | 'support' | 'growth'

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
  if (/data|b2b|b2c/.test(p)) return 'data'
  if (/relationship|team|about|company|contact/.test(p)) return 'people'
  if (/virtual|assistant|support|faq|other/.test(p)) return 'support'
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
    case 'email':
      return (
        <Card label="Animated emails flying to an inbox">
          <path d="M60 120C160 40 300 40 420 100" stroke={B} strokeWidth="2" className="mg-dash" />
          {[0, 1.1, 2.2].map((d) => (
            <g key={d} className="mg-fly" style={{ ['--d' as string]: `${d}s` }}>
              <rect x="70" y="80" width="46" height="32" rx="6" fill="#fff" stroke={B} strokeWidth="2" />
              <path d="m72 84 21 15 21-15" stroke={B} strokeWidth="2" />
            </g>
          ))}
          <g className="mg-float">
            <rect x="420" y="60" width="96" height="70" rx="12" fill={N} />
            <path d="M436 76h64M436 92h44M436 108h54" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".85" />
            <circle cx="514" cy="62" r="13" fill={C} className="mg-pulse" />
            <circle cx="514" cy="62" r="11" fill={C} />
          </g>
        </Card>
      )
    case 'linkedin':
      return (
        <Card label="Animated professional network">
          <g stroke={B} strokeWidth="2" className="mg-dash" opacity=".7">
            <path d="M120 85 220 45M220 45 330 95M330 95 440 50M220 45 250 135M330 95 250 135M440 50 480 125" />
          </g>
          <Node x={120} y={85} r={22} d={0} c={N} />
          <Node x={220} y={45} d={0.4} />
          <Node x={330} y={95} r={20} d={0.8} c={N} />
          <Node x={440} y={50} d={1.2} />
          <Node x={250} y={135} r={12} d={1.6} c={C} />
          <Node x={480} y={125} r={12} d={2} c={C} />
        </Card>
      )
    case 'social':
      return (
        <Card label="Animated likes and shares floating up">
          {[80, 170, 260, 350, 440].map((x, i) => (
            <g key={x} className="mg-rise" style={{ ['--d' as string]: `${i * 0.65}s` }}>
              {i % 2 ? (
                <path d={`M${x} 130c-14-10-22-18-22-28a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 10-8 18-22 28Z`} fill={C} />
              ) : (
                <path d={`M${x - 20} 110a22 22 0 1 1 8 17l-14 5Z`} fill={B} />
              )}
            </g>
          ))}
          <rect x="30" y="140" width="500" height="6" rx="3" fill={S} />
          <rect x="30" y="140" width="300" height="6" rx="3" fill={B} className="mg-type" />
        </Card>
      )
    case 'seo':
      return (
        <Card label="Animated search ranking growth">
          <Bars x={30} n={8} />
          <path d="M40 130 150 100 250 112 360 60 470 36" stroke={N} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mg-draw" />
          <g className="mg-float">
            <circle cx="470" cy="66" r="30" fill="#fff" stroke={N} strokeWidth="6" />
            <path d="m492 88 24 24" stroke={N} strokeWidth="8" strokeLinecap="round" />
            <path d="m458 68 8 8 14-16" stroke={C} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </Card>
      )
    case 'sem':
      return (
        <Card label="Animated ad targeting and clicks">
          <g transform="translate(130 85)">
            {[62, 42, 22].map((r, i) => <circle key={r} r={r} fill="none" stroke={i % 2 ? C : B} strokeWidth="6" opacity=".9" className="mg-spin" />)}
            <circle r="9" fill={N} className="mg-float" />
            <circle r="30" fill={B} className="mg-pulse" opacity=".4" />
          </g>
          <path d="M260 120c40-10 40-60 90-60s60 40 130 20" stroke={B} strokeWidth="3" className="mg-dash" />
          <Bars x={300} n={7} />
          <g className="mg-float" style={{ ['--d' as string]: '.6s' }}>
            <path d="M205 40l8 36 9-12 13 14 5-6-13-14 14-4Z" fill={N} />
          </g>
        </Card>
      )
    case 'content':
      return (
        <Card label="Animated article being written">
          <g className="mg-float">
            <rect x="110" y="22" width="190" height="126" rx="12" fill="#fff" stroke={B} strokeWidth="2" />
            <rect x="128" y="40" width="70" height="10" rx="5" fill={N} />
            {[64, 82, 100, 118].map((y, i) => <rect key={y} x="128" y={y} width={150 - (i % 2) * 40} height="7" rx="3.5" fill={i % 2 ? S : B} opacity=".8" className="mg-type" style={{ ['--d' as string]: `${i * 0.4}s` }} />)}
          </g>
          <g className="mg-float" style={{ ['--d' as string]: '.8s' }}>
            <rect x="340" y="40" width="130" height="90" rx="12" fill={S} />
            <path d="m350 118 32-34 24 22 22-30 32 42Z" fill={B} opacity=".8" />
            <circle cx="440" cy="64" r="9" fill={C} />
          </g>
        </Card>
      )
    case 'video':
      return (
        <Card label="Animated video play and live audience">
          <g transform="translate(150 85)">
            <circle r="46" fill={B} className="mg-pulse" opacity=".35" />
            <circle r="46" fill={B} className="mg-pulse" opacity=".35" style={{ ['--d' as string]: '1.2s' }} />
            <circle r="38" fill={N} />
            <path d="M-12-20 22 0-12 20Z" fill="#fff" />
          </g>
          <Bars x={290} n={9} />
          {[0, 1, 2].map((i) => <Node key={i} x={320 + i * 70} y={50} r={11} d={i * 0.6} c={i === 1 ? C : B} />)}
        </Card>
      )
    case 'design':
      return (
        <Card label="Animated design shapes">
          <g className="mg-float"><rect x="90" y="40" width="80" height="80" rx="16" fill={B} /></g>
          <g className="mg-float" style={{ ['--d' as string]: '.7s' }}><circle cx="250" cy="82" r="42" fill={C} /></g>
          <g className="mg-float" style={{ ['--d' as string]: '1.4s' }}><path d="M370 122 410 44 450 122Z" fill={N} /></g>
          <circle cx="250" cy="82" r="58" stroke={B} strokeWidth="2" className="mg-dash" />
          <path d="M80 140h400" stroke={S} strokeWidth="6" strokeLinecap="round" />
        </Card>
      )
    case 'web':
      return (
        <Card label="Animated website code window">
          <g className="mg-float">
            <rect x="90" y="20" width="270" height="130" rx="12" fill="#fff" stroke={B} strokeWidth="2" />
            <rect x="90" y="20" width="270" height="26" rx="12" fill={N} />
            {[108, 124, 140].map((x, i) => <circle key={x} cx={x} cy="33" r="4" fill={i === 0 ? C : '#fff'} />)}
            {[62, 80, 98, 116].map((y, i) => <rect key={y} x={110 + (i % 2) * 18} y={y} width={120 - i * 10} height="8" rx="4" fill={i % 2 ? C : B} className="mg-type" style={{ ['--d' as string]: `${i * 0.5}s` }} />)}
          </g>
          <g className="mg-float" style={{ ['--d' as string]: '1s' }}>
            <rect x="390" y="44" width="100" height="90" rx="10" fill={S} stroke={B} strokeWidth="2" />
            <rect x="402" y="56" width="76" height="26" rx="6" fill={B} />
            <rect x="402" y="92" width="34" height="30" rx="6" fill={C} />
            <rect x="444" y="92" width="34" height="30" rx="6" fill="#fff" />
          </g>
        </Card>
      )
    case 'data':
      return (
        <Card label="Animated data flowing into a database">
          <path d="M60 85h250" stroke={B} strokeWidth="3" className="mg-dash" />
          {[0, 0.8, 1.6].map((d) => <circle key={d} cx="70" cy="85" r="7" fill={C} className="mg-fly" style={{ ['--d' as string]: `${d}s` }} />)}
          <g className="mg-float">
            {[40, 76, 112].map((y, i) => (
              <g key={y}>
                <path d={`M340 ${y}v26c0 10 38 16 76 16s76-6 76-16V${y}`} fill={i % 2 ? B : N} />
                <ellipse cx="416" cy={y} rx="76" ry="16" fill={i % 2 ? '#3d6df0' : B} />
              </g>
            ))}
          </g>
        </Card>
      )
    case 'people':
      return (
        <Card label="Animated team collaboration">
          <path d="M150 90 280 50 410 90 280 130Z" stroke={B} strokeWidth="2" className="mg-dash" />
          <Node x={150} y={90} r={24} d={0} c={N} />
          <Node x={280} y={50} r={22} d={0.5} />
          <Node x={410} y={90} r={24} d={1} c={N} />
          <Node x={280} y={130} r={20} d={1.5} c={C} />
        </Card>
      )
    case 'support':
      return (
        <Card label="Animated task checklist and assistant">
          {[34, 70, 106].map((y, i) => (
            <g key={y} className="mg-float" style={{ ['--d' as string]: `${i * 0.5}s` }}>
              <rect x="90" y={y} width="260" height="26" rx="8" fill="#fff" stroke={S} strokeWidth="2" />
              <circle cx="108" cy={y + 13} r="8" fill={i === 2 ? S : C} />
              <path d={`m104 ${y + 13} 3 3 6-7`} stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="126" y={y + 9} width={150 - i * 24} height="8" rx="4" fill={B} opacity=".75" className="mg-type" style={{ ['--d' as string]: `${i * 0.5}s` }} />
            </g>
          ))}
          <g className="mg-float" style={{ ['--d' as string]: '.4s' }}>
            <path d="M400 100v-16a40 40 0 0 1 80 0v16" stroke={N} strokeWidth="8" strokeLinecap="round" />
            <rect x="388" y="92" width="22" height="36" rx="8" fill={B} />
            <rect x="470" y="92" width="22" height="36" rx="8" fill={B} />
          </g>
        </Card>
      )
    default:
      return (
        <Card label="Animated business growth chart">
          <Bars x={40} n={10} />
          <path d="M40 125 160 95 270 105 380 55 500 28" stroke={N} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mg-draw" />
          <circle cx="500" cy="28" r="9" fill={C} className="mg-pulse" />
          <circle cx="500" cy="28" r="8" fill={C} />
        </Card>
      )
  }
}
