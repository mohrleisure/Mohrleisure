# SEO Playbook — mohrleisure.com

Food & travel content lives or dies on search + social. Do these and the site
out-ranks the old WordPress version while looking better when shared.

## 1. Structured data (the big win — gets star ratings in Google)

Add JSON-LD to each review page. This is what produces the rich "★★★★☆ · $$ ·
Italian" result in Google. Drop into the review layout `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "OSPI",
  "servesCuisine": "Coastal Italian",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dallas",
    "addressRegion": "TX"
  },
  "image": "https://mohrleisure.com/images/ospi-hero.jpg",
  "review": {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Skyler & Kristen Mohr" },
    "reviewBody": "The salt-air margarita is the move here…"
    // include reviewRating ONLY if you actually rated it:
    // "reviewRating": { "@type": "Rating", "ratingValue": 4, "bestRating": 5 }
  }
}
</script>
```
Generate this from the review frontmatter so it never drifts from the content.
Validate at https://search.google.com/test/rich-results before launch.

## 2. Per-page meta + Open Graph (social cards)

Every page needs a unique title, description, and OG image so shared links look
good on iMessage / Instagram / Facebook:

```html
<title>OSPI Dallas — Coastal Italian in Highland Park | Mohr Leisure</title>
<meta name="description" content="Salt-air margaritas and crispy provolone — our take on OSPI in Highland Park.">
<meta property="og:title" content="OSPI Dallas — Mohr Leisure">
<meta property="og:description" content="Salt-air margaritas and crispy provolone in Highland Park.">
<meta property="og:image" content="https://mohrleisure.com/images/ospi-hero.jpg">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
```
Astro tip: the `astro-seo` package wires all of this from a single component.

## 3. Title & URL patterns
- **Page titles:** `<Venue> <City> — <Cuisine/Hook> | Mohr Leisure`
- **URLs:** `/reviews/ospi` — short, lowercase, hyphenated, no dates or ?p=123.
- One clear `<h1>` per page (the venue name). Don't skip heading levels.

## 4. The basics that still matter
- `sitemap.xml` + `robots.txt` (Astro generates the sitemap automatically).
- Submit the sitemap in **Google Search Console** + **Bing Webmaster Tools**.
- Descriptive **alt text** on every photo (also helps Google Images traffic).
- Internal links: link related reviews ("more Dallas Italian →").
- A real **404 page** that points back to the reviews index.

## 5. Migration-specific (don't lose existing rankings)
- 301-redirect every old WordPress URL → its new path (see `starter/_redirects`).
- Keep the same domain (mohrleisure.com) — don't start a fresh one.
- After launch, watch Search Console "Coverage" for crawl errors for ~2 weeks.

> With Claude Code, the `seo` skill can generate the JSON-LD + meta from your
> frontmatter and run the rich-results check for you.
