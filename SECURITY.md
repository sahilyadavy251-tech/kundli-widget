# Security

## What this widget is

`widget.js` is a **client-side only** script. It renders a form and, on submit, builds a URL
and opens it. It makes **no network requests of its own**, stores nothing, and has no access
to the host site's server.

## Why it cannot harm an embedding site

| Risk | Why it does not apply |
|---|---|
| Reading your page's data | The widget only reads its own four inputs. It never touches `document.cookie`, `localStorage` of the host page, or any other DOM node. |
| Breaking your layout | Styles live inside a Shadow DOM root; they cannot leak in either direction. |
| XSS into your page | The only `innerHTML` is a **static template string**. No user input is ever concatenated into HTML — inputs are read with `.value` and escaped with `encodeURIComponent`. |
| Stealing sessions | No cookies are read or written; the new tab is opened with `rel="noopener"`. |
| Slow page | 5 KB, one request, cached by the CDN. |

## For the site owner

- The repository contains **no keys, tokens or secrets** — only the widget itself.
- Nothing in this repo can modify `sahilrao.in`. The site is served from a separate, private
  repository behind Cloudflare Pages.
- Forking or copying the widget is allowed (MIT). A fork is an independent copy and cannot
  affect the original.

## Reporting a vulnerability

If you find a security issue, please **do not open a public issue**. Message
**+91 93060 09161** (WhatsApp) or email **sahilyadavy251@gmail.com** with steps to reproduce.
We aim to reply within 72 hours.
