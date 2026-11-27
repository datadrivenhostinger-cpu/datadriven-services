/**
 * /api/auth.js  — Step 1: Redirect user to GitHub OAuth consent screen
 *
 * Vercel serverless function acting as the OAuth entry point for Decap CMS.
 * Decap CMS calls GET /api/auth?site_id=...&scope=...
 */

export default function handler(req, res) {
  const { GITHUB_CLIENT_ID } = process.env

  if (!GITHUB_CLIENT_ID) {
    return res.status(500).send('Missing GITHUB_CLIENT_ID environment variable.')
  }

  // The scope Decap CMS needs to read/write repo content
  const scope = 'repo,user'

  // Random state to prevent CSRF
  const state = Math.random().toString(36).slice(2)

  // Store state in a short-lived cookie so /api/callback can verify it
  res.setHeader('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`)

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `https://datadriven.services.vercel.app/api/callback`,
    scope,
    state,
  })

  res.redirect(`https://github.com/login/oauth/authorize?${params}`)
}
