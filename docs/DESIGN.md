# DESIGN.md — Mohr Leisure visual system

A starter design system so the site looks intentional, not templated. Confirm the
palette/fonts with Skyler & Kristen, then keep these tokens consistent everywhere.
Don't hardcode random hex values or add new fonts ad hoc.

## Type
A refined editorial pairing for food/travel (all free, self-hostable):
- **Headlines:** Fraunces (or Playfair Display) — warm, characterful serif.
- **Body / UI:** Inter (or Source Sans 3) — clean, highly legible.
- Sizes: body 17–18px, generous line-height (1.6). Big headlines — let them breathe.

```
--font-display: 'Fraunces', Georgia, serif;
--font-body: 'Inter', system-ui, sans-serif;
```

## Color
A warm, appetite-friendly palette (swap to the founders' brand if they have one).
Generate/adjust at coolors.co; check contrast at webaim.org/resources/contrastchecker.

```
--ink:        #1f1b16;   /* near-black text — warm, not pure black */
--paper:      #fbf7f1;   /* warm off-white background */
--accent:     #b5462f;   /* terracotta — buttons, links, highlights */
--accent-2:   #d9a441;   /* gold — small accents, hover */
--muted:      #6b6258;   /* secondary text, captions */
--line:       #e7ded2;   /* hairline borders */
```
Rule: one accent does the heavy lifting. Don't introduce a third bright color.

## Layout
- **Image-forward:** big hero photo per review; let photography lead.
- **Generous whitespace** — editorial, uncluttered. Don't crowd.
- **Review cards:** photo on top, venue name (display font), one-line hook,
  neighborhood · cuisine in muted small caps.
- Max content width ~70ch for readable prose; full-bleed for hero images.
- Mobile-first — most food/travel readers are on a phone.

## Components
- Buttons: solid accent fill, generous padding, subtle hover (accent-2).
- Links in body: accent color, underline on hover.
- Photo overlays: when text sits on an image, add a soft dark gradient so it
  stays readable (a grainy gradient reads more premium than flat black).

## Do / Don't
- ✅ Let photos and whitespace carry the design.
- ✅ One display font + one body font. That's it.
- ✅ Consistent corner radius (e.g. 8px) and one shadow style.
- ❌ No stock-WordPress drop shadows, gradients-on-everything, or clip art.
- ❌ No more than 2 fonts, no more than 1 accent color.
- ❌ Don't put light text on a busy photo without a gradient scrim.

## Tools (all free)
Fonts: fonts.google.com · Palette: coolors.co · Preview on a layout:
realtimecolors.com · Icons: lucide.dev · Image compression: squoosh.app
