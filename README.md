# Free Kundli Widget — for any website

A tiny (5 KB), dependency-free embeddable **Vedic kundli (birth chart) calculator** widget.
Drop two lines into any page and your visitors get a working kundli form — no signup, no API key,
no data leaves their browser.

```html
<div id="aoa-kundli-widget"></div>
<script src="https://sahilrao.in/widget.js" async></script>
```

**Live demo:** https://sahilyadavy251-tech.github.io/kundli-widget/demo.html
**How to embed (full guide):** https://sahilrao.in/embed.html
**Full app:** https://sahilrao.in

---

## Why it is safe to embed

| | |
|---|---|
| **Shadow DOM** | Your site's CSS can never break it, and its CSS can never touch your page |
| **5 KB, no dependencies** | One request, cached by the CDN |
| **No tracking** | No cookies, no analytics, no fonts, no third-party calls |
| **No data collected** | The four fields go straight to `sahilrao.in` in a new tab; nothing is stored on your server or ours |
| **No iframe** | Works even when a site sends `X-Frame-Options: SAMEORIGIN` |

## What it does

The visitor fills **name, date of birth, time of birth and place**. The widget opens
`https://sahilrao.in/?w=1&n=…&d=…&t=…&p=…` in a new tab, where the chart is built
instantly — whole-sign houses, Lahiri ayanamsa, Vimshottari dasha, D1–D60 vargas.

## Install

### 1. Put a container where the widget should appear

```html
<div id="aoa-kundli-widget"></div>
```

If the container is missing, the widget appends itself to the end of `<body>`.

### 2. Load the script

```html
<script src="https://sahilrao.in/widget.js" async></script>
```

### 3. That's it

No build step, no npm, no config. It renders a 340 px card; it is responsive below that width.

## Hosting it yourself

`widget.js` is a single file. Copy it to your own server or CDN and change the `HOST`
constant at the top if you fork it. Keep the attribution link — that is the only thing the
project asks for.

## Configuration

The widget is intentionally zero-config. The two constants at the top of `widget.js`:

```js
var HOST  = 'https://sahilrao.in';   // where the calculator opens
var MOUNT = 'aoa-kundli-widget';     // the container id
```

## Browser support

Any browser with Shadow DOM — Chrome/Edge 53+, Safari 10+, Firefox 63+, and every Android
WebView in use today. Without Shadow DOM the widget still renders (styles leak into the page).

## Privacy

The widget collects nothing. It reads four inputs and builds a URL. The destination page
computes the chart **in the visitor's browser**; birth details are only stored if the visitor
later chooses to save the chart or book a consultation.
See the [privacy policy](https://sahilrao.in/privacy.html).

## License

MIT — see [LICENSE](LICENSE).

---

Built by **[Sahil Rao](https://sahilrao.in)** — Vedic astrologer. Free kundli calculator,
36-gun matching, vimshottari dasha and 65-page PDF reports at
**[sahilrao.in](https://sahilrao.in)**.
