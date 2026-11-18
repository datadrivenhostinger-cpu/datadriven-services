import { useEffect, useState, useMemo } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { Container, Reveal, Arrow, Eyebrow, Button } from "./ui"
import { Breadcrumbs, SectionTitle, Sect, useSeo } from "./page"
import { MarkdownBody } from "./MarkdownBody"
import { type BlogPost, loadBlogPosts, AUTHORS, fmtDate } from "../content/blog"
import { getSeo } from "../content/seo"

// ─── Shared helpers ────────────────────────────────────────────────────────

function PostCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      {post.coverImage && (
        <div className="overflow-hidden rounded-[1.75rem] bg-stone shadow-card">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            loading={priority ? "eager" : "lazy"}
            className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
        </div>
      )}
      {!post.coverImage && (
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.75rem] bg-stone shadow-card">
          <span className="font-display text-[3rem] font-bold text-ember/20">DD</span>
        </div>
      )}
      {post.category && (
        <span className="mt-5 inline-block rounded-full bg-ember/10 px-3.5 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-ember-deep">
          {post.category}
        </span>
      )}
      <h3 className="mt-3 font-display text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.02em] group-hover:text-ember-deep">
        {post.title}
      </h3>
      <div className="mt-2 flex items-center gap-3 text-[13px] text-mute">
        <span>{AUTHORS[post.author]?.name ?? post.author}</span>
        <span>·</span>
        <time dateTime={post.date}>{fmtDate(post.date)}</time>
      </div>
      {post.excerpt && (
        <p className="mt-3 line-clamp-3 text-[14.5px] leading-[1.7] text-ink/70">{post.excerpt}</p>
      )}
    </Link>
  )
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Reveal>
      <Link to={`/blog/${post.slug}`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="overflow-hidden rounded-[2rem] bg-stone shadow-lift lg:col-span-7">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-stone to-sky">
              <span className="font-display text-[5rem] font-bold text-ember/15">DD</span>
            </div>
          )}
        </div>
        <div className="lg:col-span-5">
          {post.category && (
            <span className="mb-4 inline-block rounded-full bg-ember/10 px-3.5 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-ember-deep">
              {post.category}
            </span>
          )}
          <h3 className="font-display text-[clamp(1.29rem,3vw,2.03rem)] font-bold leading-[1.06] tracking-[-0.03em] [text-wrap:balance]">
            {post.title}
          </h3>
          <div className="mt-3 flex items-center gap-3 text-[13.5px] text-mute">
            <span>{AUTHORS[post.author]?.name ?? post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
          </div>
          {post.excerpt && (
            <p className="mt-5 text-[15.5px] leading-[1.8] text-ink/70">{post.excerpt}</p>
          )}
          <span className="mt-6 inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em] group-hover:text-ember-deep">
            Read More <Arrow className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

function usePosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlogPosts()
      .then(setPosts)
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading }
}

// ─── CATEGORY FILTER BAR ───────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Digital Marketing",
  "Email Marketing",
  "SEO",
  "Social Media",
  "Content Marketing",
  "Data Services",
  "Tips & Tricks",
]

function CategoryBar({
  active,
  onChange,
  counts,
}: {
  active: string
  onChange: (c: string) => void
  counts: Record<string, number>
}) {
  const chip = (on: boolean) =>
    `inline-flex min-h-10 items-center rounded-full px-5 font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] transition whitespace-nowrap ${
      on ? "bg-navy text-white shadow-[0_6px_18px_-8px_rgb(9_27_101/0.5)]" : "bg-white text-ink shadow-card hover:bg-ember hover:text-white"
    }`

  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none" role="group" aria-label="Filter by category">
      {CATEGORIES.map((c) => (
        <button key={c} onClick={() => onChange(c)} aria-pressed={active === c} className={chip(active === c)}>
          {c}
          {counts[c] !== undefined && (
            <span className={`ml-2 text-[10px] ${active === c ? "opacity-70" : "opacity-50"}`}>
              {c === "All" ? Object.values(counts).reduce((a, b) => a + b, 0) : counts[c] ?? 0}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ─── BLOG LIST PAGE ────────────────────────────────────────────────────────

export function CmsBlogListPage() {
  const seo = getSeo('/blog')
  useSeo(seo.title, seo.desc)
  const { posts, loading } = usePosts()
  const [category, setCategory] = useState("All")

  const filtered = useMemo(
    () => (category === "All" ? posts : posts.filter((p) => p.category === category)),
    [posts, category],
  )

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const p of posts) c[p.category] = (c[p.category] ?? 0) + 1
    return c
  }, [posts])

  const [featured, ...rest] = filtered

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-[13px] text-mute animate-pulse">Loading posts…</span>
      </div>
    )
  }

  // If no CMS posts yet, fall back to a placeholder prompt
  if (posts.length === 0) {
    return (
      <>
        <section className="bg-paper">
          <Container className="pb-16 pt-10">
            <Breadcrumbs path="/blog" />
            <div className="hero-in">
              <Eyebrow>Our Blog</Eyebrow>
            </div>
            <h1 className="hero-in mt-4 max-w-3xl font-display text-[clamp(1.77rem,5.2vw,3.62rem)] font-bold leading-[1] tracking-[-0.04em] [text-wrap:balance]" style={{ ["--d" as string]: "80ms" }}>
              Latest Blog & Articles
            </h1>
            <p className="hero-in mt-6 max-w-xl text-[15.5px] leading-[1.8] text-ink/70" style={{ ["--d" as string]: "160ms" }}>
              Digital marketing tips, email strategies, SEO guides and industry insights.
            </p>
          </Container>
        </section>
        <Sect tone="bg-white">
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-stone">
              <svg viewBox="0 0 32 32" className="h-9 w-9 text-ember" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 8h20M6 14h14M6 20h10" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight">No posts yet</h2>
            <p className="mt-3 max-w-sm text-[15px] text-ink/60">
              Blog posts created in the CMS will appear here automatically.
            </p>
            <a href="/admin" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-[14px] font-bold text-white hover:bg-ember-deep">
              Go to CMS Admin
            </a>
          </div>
        </Sect>
      </>
    )
  }

  return (
    <>
      {/* Page hero */}
      <section className="bg-paper">
        <Container className="pb-12 pt-8 lg:pb-16 lg:pt-10">
          <Breadcrumbs path="/blog" />
          <div className="hero-in">
            <Eyebrow>Our Blog</Eyebrow>
          </div>
          <h1
            className="hero-in mt-4 max-w-3xl font-display text-[clamp(1.77rem,5.2vw,3.62rem)] font-bold leading-[1] tracking-[-0.04em] [text-wrap:balance]"
            style={{ ["--d" as string]: "80ms" }}
          >
            Latest Blog & Articles
          </h1>
          <p className="hero-in mt-6 max-w-xl text-[15.5px] leading-[1.8] text-ink/70" style={{ ["--d" as string]: "160ms" }}>
            Digital marketing tips, email strategies, SEO guides and industry insights.
          </p>
        </Container>
      </section>

      <Sect tone="bg-white" className="!pt-6">
        {/* Category filter */}
        <div className="mb-10">
          <CategoryBar active={category} onChange={setCategory} counts={counts} />
        </div>

        {/* Featured / first post */}
        {featured && (
          <div className="mb-14 lg:mb-20">
            <FeaturedCard post={featured} />
          </div>
        )}

        {/* Post grid */}
        {rest.length > 0 && (
          <ul className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={(i % 3) * 80}>
                  <PostCard post={post} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[15px] text-mute">No posts in this category yet.</p>
            <button onClick={() => setCategory("All")} className="mt-4 text-[14px] font-semibold text-ember-deep underline">
              View all posts
            </button>
          </div>
        )}
      </Sect>
    </>
  )
}

// ─── BLOG POST DETAIL PAGE ─────────────────────────────────────────────────

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function CmsBlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { posts, loading } = usePosts()

  const post = useMemo(() => posts.find((p) => p.slug === slug), [posts, slug])

  // Table of contents
  const toc = useMemo(() => {
    if (!post) return []
    const headings: { id: string; label: string; level: number }[] = []
    const re = /^(#{2,3}) (.+)$/gm
    let m: RegExpExecArray | null
    while ((m = re.exec(post.body)) !== null) {
      headings.push({ id: slugify(m[2]), label: m[2], level: m[1].length })
    }
    return headings
  }, [post])

  // Related posts
  const related = useMemo(
    () => posts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3),
    [posts, slug, post?.category],
  )

  // SEO: use post's own seoTitle/excerpt, or look up static seo.ts, or fallback
  const staticSeo = getSeo(`/blog/${slug}`)
  const seoTitle = post?.seoTitle || (staticSeo.title !== getSeo('/').title ? staticSeo.title : post ? `${post.title} | DataDriven Services` : "Blog")
  const seoDesc = post?.excerpt || (staticSeo.desc !== getSeo('/').desc ? staticSeo.desc : "DataDriven blog – digital marketing insights and strategies.")
  useSeo(seoTitle, seoDesc)

  useEffect(() => {
    if (!loading && !post && posts.length > 0) navigate("/blog", { replace: true })
  }, [loading, post, posts.length, navigate])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-[13px] text-mute animate-pulse">Loading…</span>
      </div>
    )
  }

  if (!post) return null

  const author = AUTHORS[post.author] ?? { name: post.author, role: "" }

  return (
    <>
      {/* Post header */}
      <section className="bg-paper">
        <Container className="pb-10 pt-8 lg:pb-14 lg:pt-10">
          <Breadcrumbs path={`/blog/${post.slug}`} />
          {post.category && (
            <span className="mb-4 inline-block rounded-full bg-ember/10 px-3.5 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-ember-deep">
              {post.category}
            </span>
          )}
          <h1 className="hero-in max-w-4xl font-display text-[clamp(1.55rem,4.4vw,2.95rem)] font-bold leading-[1.04] tracking-[-0.035em] [text-wrap:balance]">
            {post.title}
          </h1>
          <div className="hero-in mt-5 flex flex-wrap items-center gap-4 text-[14px] text-mute" style={{ ["--d" as string]: "100ms" }}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember/10 font-display text-[1rem] font-bold text-ember-deep">
                {author.name[0]}
              </span>
              <div>
                <div className="font-semibold text-ink">{author.name}</div>
                {author.role && <div className="text-[12px] text-mute">{author.role}</div>}
              </div>
            </div>
            <span>·</span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            {post.tags && post.tags.length > 0 && (
              <>
                <span>·</span>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span key={t} className="rounded-full bg-stone px-3 py-1 text-[11.5px] font-medium text-ink/70">
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </Container>

        {/* Cover image */}
        {post.coverImage && (
          <Container>
            <div className="img-reveal overflow-hidden rounded-[2rem] bg-stone shadow-lift">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                className="aspect-[16/8] w-full object-cover"
              />
            </div>
          </Container>
        )}
      </section>

      {/* Body */}
      <Sect tone="bg-paper" className="!pt-14 lg:!pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Table of contents */}
          {toc.length > 0 && (
            <nav aria-label="Table of Contents" className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                  Table of Contents
                </div>
                <ul className="space-y-1">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className={`block rounded-lg py-1.5 text-[14px] leading-snug text-ink/70 transition hover:text-ember-deep ${t.level === 3 ? "pl-4" : "font-semibold"}`}
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}

          {/* Article */}
          <article className={`min-w-0 break-words ${toc.length ? "lg:col-span-9" : "lg:col-span-9 lg:col-start-3"}`}>
            <MarkdownBody content={post.body} className="max-w-[44rem]" />
          </article>
        </div>
      </Sect>

      {/* Related posts */}
      {related.length > 0 && (
        <Sect tone="bg-stone">
          <SectionTitle eyebrow="Our Blog" className="mb-12">
            More Tips &amp; Articles
          </SectionTitle>
          <ul className="grid gap-8 md:grid-cols-3">
            {related.map((x) => (
              <li key={x.slug}>
                <PostCard post={x} />
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink/70 hover:text-ember-deep"
            >
              All Articles <Arrow className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Sect>
      )}

      {/* CTA */}
      <Sect tone="bg-white" className="!py-14 lg:!py-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Ready to grow?</p>
            <h2 className="mt-2 font-display text-[clamp(1.3rem,3vw,1.9rem)] font-bold tracking-[-0.03em]">
              Let DataDriven take your marketing to the next level
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact">Contact Us</Button>
            <Button href="/book-a-meeting" variant="outline">Book a Meeting</Button>
          </div>
        </div>
      </Sect>
    </>
  )
}
