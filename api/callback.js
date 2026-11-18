/**
 * /api/callback.js  — Step 2: Exchange GitHub code for access token
 *
 * GitHub redirects here after user approves the OAuth app.
 * We exchange the code for an access token and pass it back to Decap CMS
 * via a postMessage (the standard Decap CMS implicit flow handshake).
 */

export default async function handler(req, res) {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return res.status(500).send('Missing GitHub OAuth environment variables.')
  }

  const { code, state } = req.query

  if (!code) {
    return res.status(400).send('Missing OAuth code from GitHub.')
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        state,
      }),
    })

    const data = await tokenRes.json()

    if (data.error || !data.access_token) {
      const msg = data.error_description || data.error || 'Unknown error'
      return res.status(401).send(`GitHub OAuth error: ${msg}`)
    }

    // Build the postMessage payload Decap CMS expects
    const content = JSON.stringify({ token: data.access_token, provider: 'github' })
    const html = buildCallbackHtml(content)

    res.setHeader('Content-Type', 'text/html')
    return res.send(html)
  } catch (err) {
    console.error('OAuth callback error:', err)
    return res.status(500).send('Internal server error during OAuth exchange.')
  }
}

/**
 * Returns an HTML page that postMessages the token back to the CMS opener window.
 * Decap CMS opens this page in a popup, waits for the postMessage, then closes it.
 */
function buildCallbackHtml(content) {
  // Safely embed JSON inside JS using base64 to avoid any escaping issues
  const encoded = Buffer.from(content).toString('base64')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Authenticating – DataDriven CMS</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; margin: 0; background: #f4f9ff; color: #091b65;
    }
  </style>
</head>
<body>
  <p>Signing you in&hellip; this window will close automatically.</p>
  <script>
    (function () {
      var content = atob('${encoded}');
      var message = 'authorization:github:success:' + content;

      function receiveMessage(e) {
        window.opener.postMessage(message, e.origin);
      }
      window.addEventListener('message', receiveMessage, false);
      // Tell CMS the auth flow has started
      window.opener.postMessage('authorizing:github', '*');
    })();
  <\/script>
</body>
</html>`
}
