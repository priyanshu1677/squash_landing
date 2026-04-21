# Squash Landing Page

Production-grade Next.js 15 + Tailwind v4 marketing site for Squash — the AI
decision layer for Product Managers.

## Stack

- **Next.js 15** (App Router, React 19, Server Components by default)
- **Tailwind CSS v4** (native `@theme` brand tokens)
- **TypeScript** (strict)
- **Instrument Serif** + **Geist Sans/Mono** via `next/font/google`
- Zero runtime dependencies beyond React — every visual is inline SVG

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build and run in production:

```bash
npm run build
npm start
```

## Structure

```
squash-landing/
├── app/
│   ├── layout.tsx      # Fonts, SEO metadata, JSON-LD schemas
│   ├── page.tsx        # Section composition
│   └── globals.css     # Brand tokens, utilities, animations
├── components/
│   ├── Header.tsx          # Sticky nav + mobile sheet
│   ├── Hero.tsx            # Headline + CTAs + ChatMock
│   ├── LogoCloud.tsx       # Social proof band
│   ├── Problem.tsx         # Three-card pain narrative
│   ├── Solution.tsx        # Four-pillar grid
│   ├── Features.tsx        # Six-capability grid
│   ├── HowItWorks.tsx      # 3-step connector
│   ├── UseCases.tsx        # Persona cards
│   ├── Integrations.tsx    # Marquee + category grid
│   ├── Testimonials.tsx    # Quote cards
│   ├── FAQ.tsx             # Accordion (a11y-correct)
│   ├── FinalCTA.tsx        # Closing conversion surface
│   ├── Footer.tsx          # Links, social, legal
│   └── ui/
│       ├── ChatMock.tsx        # Hero product visual
│       ├── IntegrationMark.tsx # Brand-colored monogram
│       └── Logo.tsx            # Squash wordmark
└── lib/
    └── constants.ts    # All copy in one place
```

## Customization

### Brand tokens

Edit `app/globals.css` under `@theme`. Tokens follow Squash's `index.css`:

```css
--color-primary: #e8640f;
--color-primary-subtle: #fff5ed;
--color-background: #faf9f6; /* warm off-white */
--font-display: var(--font-instrument-serif); /* headings */
--font-sans: var(--font-geist-sans);          /* body */
```

### Copy

All landing page copy lives in `lib/constants.ts`. Marketing can iterate
without touching components.

### Placeholders to replace before launch

- **Customer logos** — `components/LogoCloud.tsx` uses generic names. Swap
  for real customers only with written permission.
- **Testimonials** — `components/Testimonials.tsx` contains voiced-but-generic
  quotes attributed to role, not name. Replace with real ones post-launch.
- **`/og-image.png`** — add a 1200×630 social image to `public/`.
- **Favicon** — add `/favicon.ico` and `/apple-touch-icon.png`.
- **Real product screenshots** — the `ChatMock.tsx` is a fabricated
  visualization. Once the product ships, swap for a real screenshot or
  animated MP4/Lottie.

## SEO & AI optimization

- Semantic HTML with correct H1/H2/H3 hierarchy
- `app/layout.tsx` includes `Metadata` (OG, Twitter, canonical, robots)
- Three JSON-LD schemas injected: `Organization`, `SoftwareApplication`,
  `FAQPage` — the FAQ schema is what powers Google rich results and
  AI-assistant quoting
- FAQ answers always rendered in the DOM (collapsed via CSS height
  transition, not conditional render) so crawlers and LLMs can read them
  without executing JS
- Respects `prefers-reduced-motion`
- Focus-visible rings on every interactive element

## Accessibility

- Every interactive element is a `<button>` or `<a>` with visible focus
- Icons marked `aria-hidden`, buttons labeled with `aria-label`
- FAQ accordion uses `aria-expanded` + `aria-controls`
- Color contrast passes WCAG AA on both `--foreground` and `--foreground-secondary`
  against the background
- Scroll locked on mobile menu open (add if you extend the nav)

## Deployment

Deploy on Vercel with zero config:

```bash
npx vercel
```

Any Node 20+ host works. `next start` serves the production build.

## License

Internal / proprietary. Do not redistribute without written permission
from Squash.
