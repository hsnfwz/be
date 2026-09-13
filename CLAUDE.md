# bé by Benjam Papp — working notes

Static marketing site for a Nordic-Asian fine dining restaurant in Vancouver.
Two pages: `/` (story) and `/menu` (tasting menu). Astro static output, Tailwind
v4, deployed to Vercel. **The only client-side JavaScript is the scroll reveal**
described under Motion — roughly 20 lines, no dependencies. Keep it that way:
don't add a framework or a runtime, and say so if you add any script at all.

## Commands

```bash
npm run dev      # localhost:4321
npm run build    # -> dist/
npm run preview  # serve dist/
npm run check    # astro check (TypeScript)
npm run format   # Prettier (run before committing)
```

Node 22.12+ required (`.nvmrc` pins 22).

## Design conventions

These are deliberate. Don't "fix" them without asking:

- **Photography runs in full colour.** It used to be filtered `grayscale`;
  that was dropped deliberately, so don't reintroduce the filter.
- **The interface is strictly black and white.** There is no grey text and no
  accent colour — the muted neutral-400 that headings and the wordmark's `é`
  once used has been removed deliberately, so don't reintroduce it. Type is
  black on white, or white on the black nav, footer and hero.
- **Two typefaces.** `font-serif` = Playfair Display (headings, wordmark),
  `font-sans` = Montserrat (body copy). Both are self-hosted from
  `public/fonts/` and declared in `src/styles/global.css` with real
  `font-weight` / `font-style` axes — so use `font-bold` and `italic`, never a
  weight-specific family name.
- **Line height scales inversely with type size.** Display is tight, body is
  loose. The curve in use: 84px hero at 1.0, 42px headings at 1.15, 24px
  headings at 1.25, 16px body at 1.625 (mobile hero 42px at 1.15). Body
  leading is set once on `body` in `global.css`; the font-size utilities carry
  their own pairings, so only unsized copy inherits it. The button is pinned to
  1.5 so a UI control doesn't sit on the body scale.
- **Section headings are serif, 24px on mobile and 42px from `md`**, in normal
  sentence case — not uppercased. They carry explicit `leading-*`, because the
  sizes are arbitrary values and so bring no paired line-height of their own.
  The brand is lowercase `bé` everywhere, so a `uppercase` transform would
  render it `BÉ` and undo that; don't add one back.
- **Nav** is sticky at the top, identically at every viewport — there is no
  separate mobile treatment, and it shouldn't gain one. Its height is
  `--nav-height` (4.25rem) in `global.css`, which must track the real bar
  height if its padding changes. Full-height sections use the
  `viewport-minus-nav` utility — don't hardcode `calc(100vh - 64px)` again.

## Motion

Hero copy and the button fade in and settle a few pixels downward on load
(`.rise`, staggered with `.rise-step-2` / `.rise-step-3`) — pure CSS, since the
hero is above the fold and only ever plays once anyway.

Section headings, descriptions and the cuisine plates do the same the first time
their section is half in view, and then **stay revealed** — scrolling back up does not replay or
re-hide them. That requires JavaScript: an `IntersectionObserver` in
`Base.astro` adds `.revealed` once per section and then disconnects. A CSS
scroll timeline (`animation-timeline: view()`) cannot do this, because it is
scrubbed by scroll position and so necessarily rewinds on the way back up. Don't
"simplify" it back to CSS without losing the requirement.

Heading rules (`.rule-grow`) draw themselves in, travelling the way the heading
is aligned: centred headings open outwards from the middle, left-aligned ones
sweep left to right. They are `::after` pseudo-elements, not `border-bottom`,
because a border cannot be scaled on its own — scaling the element would scale
the type with it. Their resting state is fully drawn; only the animation holds
them collapsed, so reduced motion leaves a complete rule rather than none.

The rule sits at `z-index: -1` so descenders cross in front of it instead of
being sliced. That needs `isolation: isolate` on the heading — without a
stacking context the negative z-index drops the rule behind the section
background and it disappears entirely.

Direction is a modifier, not a separate system: `rise-in` settles downward from
16px above (the default), and `.reveal-from-below` swaps in `lift-in`, which
settles upward from 16px below. The two cuisine plates use one each, so they
converge. A `.reveal-from-below` element is still a `.rise-in-view`, so the
observer, the hidden start state and the no-JS fallback all apply unchanged.

Three rules to keep:

1. **Never let the animation be load-bearing for visibility.** The hidden start
   state is `.js .rise-in-view`, and the `js` class is set by a tiny inline
   script in `<head>`. If that never runs — no JS, blocked, errored — the copy
   renders normally. Same for `prefers-reduced-motion`, which is handled in CSS
   and in the observer. Both paths are verified: with scripting disabled and
   with reduced motion, every piece of copy measures `opacity: 1`.
2. **Verify motion by driving a real browser over the DevTools Protocol.**
   Nearly every shortcut lies here: `getComputedStyle` reports stale base values
   for compositor-run animations, headless `--screenshot` cannot scroll,
   `IntersectionObserver` does not fire for content in a nested iframe or under
   `--virtual-time-budget`, and **injecting a `<style>` tag to slow an animation
   is silently blocked by this site's own CSP** (`style-src` has no
   `unsafe-inline`), which quietly invalidates the measurement. Use
   `--remote-debugging-port` with `Animation.setPlaybackRate` to slow motion and
   `Page.captureScreenshot` to sample pixels — that is how the reveal and the
   button sweep were confirmed.
3. **Keep the reveal styles out of the `animation` shorthand where a timeline is
   involved.** Lightning CSS folds `animation` + `animation-timeline` into
   `animation: ... view()`, which Chrome rejects and drops entirely. This bit
   once already.

## Content

`src/data/site.ts` and `src/data/menu.ts` are the single source of truth for
restaurant details and the tasting menu. Edit those, not the templates.

Two things to know:

1. **The contact details are placeholders** (`1234 Main Street`, `A1B 2C3`,
   `be@restaurant.com`). `CONTACT_IS_PLACEHOLDER` in `site.ts` is `true`, which
   deliberately withholds address/phone/email from the JSON-LD — publishing a
   fake address as machine-readable `LocalBusiness` data hurts local search.
   When real details land, update them and flip that flag to `false`.
2. **Menu copy is the restaurant's own.** Spelling and punctuation were
   corrected once with the owner's sign-off. Don't rewrite the wording beyond
   that — raise suggested changes rather than applying them.

## Images

Put new photography in `src/assets/` and import it — Astro only bundles what's
imported, so unused files there cost nothing at deploy. Always use the `<Image>`
component with `widths` and `sizes`; never a bare `<img>` for local assets.

Note: `food-3.jpg` and `food-4.jpg` are leftovers from the original set, only
640×640 and currently unused. The full-bleed slots now use `food-1.jpg` and
`food-2.jpg` (1440px), so nothing on the page is upscaled any more.

## Security headers

CSP is generated by Astro (`security.csp` in `astro.config.mjs`) as a `<meta>`
tag with per-build hashes, which covers the inline JSON-LD. The remaining
headers live in `vercel.json`. If you ever add an inline `style=` attribute or a
third-party script, the CSP will block it — update the directives deliberately.
