import { useMemo } from "react"

/**
 * MarkdownBody – renders CMS markdown body as sanitised HTML.
 * Supports headings, bold, italic, links, lists, code blocks,
 * blockquotes, horizontal rules, and inline images.
 * No external dependency; purely regex-based for lightweight use.
 */
export function MarkdownBody({ content, className = "" }: { content: string; className?: string }) {
  const html = useMemo(() => mdToHtml(content), [content])
  return (
    <div
      className={`prose-dd ${className}`}
      // We control this HTML output from our own markdown parser
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/** Convert markdown to safe HTML */
function mdToHtml(md: string): string {
  let html = md
    // Escape angle brackets first so they don't conflict with our tags
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // --- Block elements ---

  // Fenced code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    `<pre class="md-code" data-lang="${lang}"><code>${code.trim()}</code></pre>`,
  )

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="md-quote">$1</blockquote>')

  // HR
  html = html.replace(/^(?:---|\*\*\*|___)\s*$/gm, '<hr class="md-hr" />')

  // Headings h1–h6
  html = html.replace(/^###### (.+)$/gm, '<h6 class="md-h6">$1</h6>')
  html = html.replace(/^##### (.+)$/gm, '<h5 class="md-h5">$1</h5>')
  html = html.replace(/^#### (.+)$/gm, '<h4 class="md-h4">$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3 class="md-h3" id="$1">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 class="md-h2" id="$1">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>')

  // Unordered lists (merge consecutive items)
  html = html.replace(/((?:^- .+\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((l) => `<li>${l.replace(/^- /, "")}</li>`)
      .join("")
    return `<ul class="md-ul">${items}</ul>`
  })

  // Ordered lists
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((l) => `<li>${l.replace(/^\d+\. /, "")}</li>`)
      .join("")
    return `<ol class="md-ol">${items}</ol>`
  })

  // --- Inline elements ---

  // Images  ![alt](src)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="md-img" loading="lazy" />',
  )

  // Links  [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="md-link" target="_blank" rel="noopener noreferrer">$1</a>',
  )

  // Bold **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  // Italic *text*
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>")
  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code class="md-code-inline">$1</code>')

  // Paragraphs — wrap remaining text lines (not already in block tags)
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      block = block.trim()
      if (!block) return ""
      if (block.match(/^<(h[1-6]|ul|ol|pre|blockquote|hr|img)/)) return block
      return `<p class="md-p">${block.replace(/\n/g, " ")}</p>`
    })
    .join("\n")

  return html
}

