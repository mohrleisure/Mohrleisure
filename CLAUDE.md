# Mohr Leisure / Travel Food Explorer

> Drop this file at the root of the project repo. Claude Code reads it
> automatically every session and treats it as standing instructions. Edit the
> **Project** sections as the build evolves; the **Operating Rules** are stable.

A culinary travel guide — restaurant, bar, and cafe reviews for adventurous food
lovers, by Skyler & Kristen Mohr. Currently Dallas-area focused, expanding.
This repo is the **2.0 rebuild**: migrating off WordPress to a fast, owned,
custom static site.

---

## Tech Stack

- **Framework**: Astro (Markdown content collections for reviews)
- **Hosting**: Cloudflare Pages (free, CDN-fast, built-in redirects)
- **Images**: Cloudflare Images / Cloudinary (optimize the food photography)
- **Source**: GitHub repo — full history, PRs, instant rollbacks
- **Domain**: mohrleisure.com (DNS pointed at Cloudflare Pages)
- **Editing**: Claude Code — conversational content + code edits

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build → ./dist
npm run preview    # preview the production build locally
# deploy: pushing to main auto-deploys via Cloudflare Pages
```

## Architecture

- `src/content/reviews/` — one Markdown file per review (the content collection)
- `src/content/config.ts` — the review schema (frontmatter fields, validated)
- `src/pages/` — routes (home, blog index, `[slug]` review pages, About, Contact)
- `src/layouts/` — shared page shells
- `src/components/` — review cards, gallery, nav, footer
- `public/` — static assets, `_redirects` (old WordPress URLs → new paths)

## Review schema (frontmatter)

Every review in `src/content/reviews/*.md` uses these fields. Don't add fields
that aren't in `config.ts`, and don't omit required ones:

```yaml
title: "OSPI Dallas"
venue: "OSPI"
city: "Dallas"
neighborhood: "Highland Park"
cuisine: "Coastal Italian"
pubDate: 2026-05-16       # original publish date — preserve on migration
photo: "/images/ospi-hero.jpg"
standoutDishes: ["salt-air margarita", "crispy provolone"]
rating:                    # optional — only if the founders actually rated it
```

## Design direction

- **Editorial & image-forward** — big hero photography, generous whitespace, a
  confident serif/sans pairing. Let the food photos carry the page.
- **Reviews as cards** — photo, venue name, neighborhood, one-line hook.
- **Filter by city / cuisine** — as coverage grows beyond Dallas. (The old WP
  site left everything "Uncategorized" — don't repeat that.)
- **Keep the human story** — founder bio, testimonials, the adventurous voice.
- Dark or light is the founders' call — confirm brand colors/fonts before
  committing a palette; don't hardcode a theme they haven't approved.

## Content voice (HARD rule — anti-hallucination)

This is a real business reviewing real places. Accuracy is the product.

- **NEVER fabricate** venue names, addresses, hours, dishes, prices, or ratings.
  Every factual claim must trace to the founders' notes, the venue's own
  site/menu, or the original WordPress post being migrated.
- **NEVER invent** a rating the founders didn't give, or an award/accolade.
- **Preserve the founders' wording and voice** when migrating posts — tighten for
  consistency, but don't rewrite their take without sign-off.
- When uncertain about a fact, say "I'm not sure — please verify," don't guess.

## Migration notes

- Pull the existing 9 WordPress posts via the WP REST API
  (`/wp-json/wp/v2/posts` + `/media`), not by scraping rendered HTML.
- Convert each to a Markdown review with the schema above; tag city + cuisine.
- Add an entry to `public/_redirects` for every old WP URL → new path so SEO and
  inbound links survive.
- Before launch: run an SEO pass (meta, Restaurant/Review structured data,
  sitemap), a performance pass (Core Web Vitals), and an accessibility pass.

---

## Operating Rules

*Portable rules distilled from real, repeated mistakes. They bias toward
correctness and trust over speed. For trivial tasks, use judgment.*

### Hard global rules

1. **Read the actual thing before any destructive write.** Before overwriting or
   deleting a file, read its real contents first — never act on a grep count, a
   date, a filename, or memory of what's in it. A proxy justifies *investigating*;
   only the contents justify *destroying or overwriting*. If contents contradict
   how the file was described, stop and surface it.
2. **Report status from measurement, not intent.** "Done" means you checked the
   result on disk — not that a command returned 0 or that you launched something.
   Counts come from counting.
3. **Don't re-run a call that looks like it returned nothing.** Blank output
   almost always still arrived (display lag). Check the artifact once, or move on.
4. **Match the orchestration to the task.** Use the simplest path that solves it.
   Running the same expensive cycle 3+ times → stop and collapse it to one pass.
5. **Sanity-check inputs before an expensive/parallel job.** A surprisingly large
   count usually means a setup bug, not real work. Investigate before fanning out.
6. **Act on sensible defaults; don't over-ask.** Pick the obvious option, state
   it, proceed. Reserve questions for decisions that genuinely change the outcome.

### Coding behavior (Karpathy guidelines)

1. **Think before coding.** State assumptions; if uncertain, ask. Present multiple
   interpretations rather than picking silently. Mid-task, if a step fails or the
   diff balloons beyond scope — STOP and re-plan. Pushing through compounds.
2. **Simplicity first.** Minimum code that solves the problem. No speculative
   features, no single-use abstractions, no error handling for impossible cases.
   200 lines that could be 50 → rewrite.
3. **Surgical changes.** Touch only what you must. Don't "improve" adjacent code
   or refactor what isn't broken. Match existing style. Every changed line should
   trace to the request. Remove only the orphans your change created.
4. **Goal-driven execution.** Turn vague tasks into verifiable goals: "fix the
   bug" → "write a test that reproduces it, then make it pass." State a brief plan
   with a verify step per item.
5. **Use the model only for judgment calls.** LLM for drafting, classifying,
   summarizing, extracting from messy text. NOT for routing, retries, status-code
   handling, or deterministic transforms.
6. **Hard token/cost budgets.** Every loop can spiral. If a task approaches
   budget, summarize and start fresh — don't push through. Surface the breach.
7. **Surface conflicts, don't average them.** When two parts of the codebase
   disagree, pick the more recent/tested one, explain why, flag the other. Code
   that satisfies both patterns is the worst code.
8. **Read before you write.** Before adding to a file, read its exports, the
   immediate caller, and shared utilities. Don't understand why code is shaped a
   certain way? Ask before adding to it.
9. **Tests verify intent, not just behavior.** Every test encodes *why* the
   behavior matters. A test that wouldn't fail when the business logic breaks is
   the wrong test.
10. **Checkpoint after every significant step.** Summarize what's done, verified,
    and left. Don't continue from a state you can't describe back.
11. **Match the codebase's conventions, even if you disagree.** Conformance beats
    taste. If a convention is genuinely harmful, surface it — don't silently fork.
12. **Fail loud.** The most expensive failures look like success. "Migration
    complete" is wrong if records were skipped silently. Surface uncertainty.
13. **Dispatch sub-agents for parallel research / batched lookups.** One focused
    scope per agent; run independent ones in parallel; wait and synthesize rather
    than duplicating their work.
14. **Reads can use proxies; destructive writes cannot.** A grep result may justify
    investigating. Only the file's real contents justify destroying/overwriting.

---

## Conventions

- Node.js >= 18.
- Use `pubDate:` (not `date:`) for review publish dates — `date` is a YAML reserved word and Astro v5's glob loader drops it silently, causing build errors.
- Keep this file current: when a durable lesson emerges, add it as a one-liner
  *with the why*. That is how this ruleset was built.
- For facts that should survive across sessions (decisions, gotchas, external
  resource pointers), use Claude Code's file-based memory at
  `~/.claude/projects/<project>/memory/`.

---

## Lessons Learned — mohrleisure.com (HARD rules)

*Hard-won from running a large multi-city food guide. Each rule here cost real
time, money, or trust the first time around.*

### Photos — where a food/travel site lives or dies

1. **Never use user-uploaded photos (Yelp-style UGC) as hero images.** They're
   drink snapshots, stray hands, and drab rooms — they read as net-negative on a
   review. Use the venue's own / owner photos, or Skyler & Kristen's own camera.
2. **Hand-pick the hero photo on vibe — don't let an AI grader make the final
   call.** AI is fine for cheap triage (flagging logos, blur, wrong subject) but
   it flips run-to-run on "good vs. great." A human eye picks the featured shot:
   warm room, styled plate, or a striking exterior that matches the spot's feel.
3. **Hero priority order:** striking exterior/signage → warm interior/atmosphere
   → atmospheric food → close-up food. Reject hotel-room, wedding, blackboard,
   and logo shots.
4. **BACK UP before overwriting any live image.** Download the current file to a
   committed backup folder FIRST. A bulk in-place overwrite once destroyed
   hundreds of originals with no revert path. A backup is mandatory, not optional.
5. **Heavy unoptimized images are the #1 speed killer.** Compress every photo to
   WebP (Squoosh / Cloudflare Images) before it ships. Biggest performance win on
   a photo-forward blog.

### Voice — the Mohr Leisure review tone

6. **Write like an opinionated, well-fed friend — never a press release or
   Wikipedia.** De-hype, but keep the personality. The founders' take IS the value.
7. **Ban filler hype words:** "must-try," "hidden gem," "iconic," "legendary,"
   "world-class," "delicious," "amazing," "best-kept secret." If every spot is
   amazing, none are. Say what's specifically good and why.
8. **Name real dishes, not categories.** "Salt-air margarita, crispy provolone"
   beats "craft cocktails, small plates." Pull dish names from the actual menu.

### Accuracy — never fabricate

9. **Never invent** a venue name, address, hours, dish, price, rating, or award.
   Every factual claim must trace to the founders' notes, the venue's own
   site/menu, or the original post being migrated.
10. **Trust code, not the model, to catch hallucinations.** An LLM will
    confidently invent a plausible award, founding year, or chef name. A
    deterministic check catches what the model misses. When in doubt: "I'm not
    sure — please verify."
11. **Preserve the founders' original wording on migration.** Tighten for
    consistency; never rewrite their voice or opinion without sign-off.

### Data & structure

12. **Treat each review as structured data from day one** (venue, city,
    neighborhood, cuisine, dishes, photo, pubDate) — not a wall of text. That's
    what unlocks search, filters, and a map later. Retrofitting structure onto
    free text is painful; do it up front.
13. **Dedupe carefully before adding a spot.** Normalize the name (lowercase,
    strip "the/&/punctuation/location suffix") and compare — a sloppy match
    creates duplicate review cards. Same name, different address = second
    *location*, not a duplicate.
14. **Commit small and often.** A session once clobbered a batch of unsaved work.
    Commit after each post or small batch — recovery stays clean.

### Cost & process discipline

15. **Calibrate the quality bar on ~10–20 items BEFORE a big run — then run
    once.** Don't run loose, eyeball it, tighten, and re-run the whole batch.
    Decide the standard up front. Re-running a full pass to fix a bar you could've
    set first is the most common waste.
16. **Surface cost before any paid run; do the high-value items first.** State
    the rough spend, scope to what matters, don't sweep the long tail without a reason.
17. **Match the tool to the task.** Don't build elaborate multi-step automation
    for a job a single pass solves. Over-engineering burns time and money.
18. **When a session balloons, STOP and checkpoint.** Summarize what's done and
    committed, surface what's left, and decide next — don't charge through a
    degrading session stacking more work on a shaky state.

### Verification — the meta-lesson

19. **A screenshot is a point-in-time proxy — it may be stale** (cached image,
    old build, already-fixed). Verify against the live site/data before "fixing"
    something that may not be broken.
20. **Report status from what you measured, not what you intended.** "Done" means
    you checked the result on the live site — not that a command returned a number.
21. **Read the actual file before overwriting or deleting it.** Never act on a
    filename, a date, or memory of what's in it. A wrong read wastes a step; a
    wrong overwrite destroys work.

> **The one-liner:** Real photos hand-picked on vibe, an honest opinionated
> voice, every fact traceable to a source, structured data from day one, small
> frequent commits — and never let the AI be the final judge of quality or truth.
