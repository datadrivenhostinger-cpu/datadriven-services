// Blog post frontmatter type produced by Decap CMS markdown files
export type BlogPost = {
  slug: string
  title: string
  date: string
  author: string
  category: string
  tags?: string[]
  coverImage?: string
  coverImageAlt?: string
  excerpt: string
  body: string
  featured?: boolean
  draft?: boolean
  seoTitle?: string
  canonical?: string
}

// Author display map
export const AUTHORS: Record<string, { name: string; role: string }> = {
  karthik: { name: "Karthik", role: "Founder & CEO" },
  kumaresan: { name: "Kumaresan", role: "Digital Marketing Lead" },
  rajkumar: { name: "RajKumar", role: "SEO Strategist" },
  sivasakthi: { name: "Sivasakthi", role: "Web Developer" },
  team: { name: "DataDriven Team", role: "Content Team" },
}

// Dynamically load all CMS blog posts from public/content/blog/*.md
// Falls back gracefully to empty array if no posts exist yet
export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    // Vite glob import – picks up all markdown files in public/content/blog/
    const modules = import.meta.glob("/public/content/blog/*.md", {
      eager: false,
      query: "?raw",
      import: "default",
    }) as Record<string, () => Promise<string>>

    const posts: BlogPost[] = []
    for (const [path, loader] of Object.entries(modules)) {
      try {
        const raw = await loader()
        const post = parseMd(raw, path)
        if (!post.draft) posts.push(post)
      } catch (_) {}
    }

    // Sort: featured first, then by date desc
    posts.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    return posts
  } catch (_) {
    return []
  }
}

/** Parse a Decap CMS markdown file (YAML frontmatter + body) */
function parseMd(raw: string, path: string): BlogPost {
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const body = fm ? raw.slice(fm[0].length).trim() : raw
  const meta = fm ? parseYaml(fm[1]) : {}
  const filename = path.split("/").pop()?.replace(/\.md$/, "") ?? "post"

  return {
    slug: meta.slug || filename,
    title: meta.title || "Untitled",
    date: meta.date || new Date().toISOString().slice(0, 10),
    author: meta.author || "team",
    category: meta.category || "Digital Marketing",
    tags: Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : [],
    coverImage: meta.coverImage,
    coverImageAlt: meta.coverImageAlt,
    excerpt: meta.excerpt || "",
    body,
    featured: meta.featured === true || meta.featured === "true",
    draft: meta.draft === true || meta.draft === "true",
    seoTitle: meta.seoTitle,
    canonical: meta.canonical,
  }
}

/** Minimal YAML key: value parser (handles strings, booleans, arrays) */
function parseYaml(yml: string): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  const lines = yml.split(/\r?\n/)
  let i = 0
  while (i < lines.length) {
    const m = lines[i].match(/^(\w+):\s*(.*)$/)
    if (m) {
      const [, key, val] = m
      if (val.trim() === "") {
        // list block
        const items: string[] = []
        i++
        while (i < lines.length && lines[i].match(/^\s+-\s+/)) {
          items.push(lines[i].replace(/^\s+-\s+/, "").trim())
          i++
        }
        out[key] = items
        continue
      } else {
        const v = val.trim().replace(/^["']|["']$/g, "")
        if (v === "true") out[key] = true
        else if (v === "false") out[key] = false
        else out[key] = v
      }
    }
    i++
  }
  return out
}

/** Format a date string like "Nov 13, 2026" */
export function fmtDate(d: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", { year: "numeric", month: "short", day: "numeric" }).format(new Date(d))
  } catch (_) {
    return d
  }
}

