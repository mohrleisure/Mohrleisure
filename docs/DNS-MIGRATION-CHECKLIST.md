# DNS Migration Checklist — mohrleisure.com (WordPress → Cloudflare Pages)

The one step where a mistake is visible and costly. The biggest risk is
**breaking email** — moving the website's DNS can knock out the domain's email if
you don't preserve the MX records. Go in order.

## Before you touch DNS
- [ ] New Astro site is built and previewing correctly on the Cloudflare Pages
      `*.pages.dev` URL (test it thoroughly there first).
- [ ] `public/_redirects` has every old WordPress URL → new path.
- [ ] **Record the current DNS** at the existing host: screenshot/export ALL
      records, especially **MX** (email), **TXT** (SPF/DKIM/DMARC), and any
      subdomains (`www`, `mail`, `blog`). You'll re-create these.
- [ ] Note where email is hosted (Google Workspace, the WP host, etc.) — those
      **MX + TXT records must be carried over unchanged** or email stops.

## Cutover
- [ ] Add the domain to Cloudflare (Pages → Custom domains → `mohrleisure.com`
      and `www.mohrleisure.com`).
- [ ] In Cloudflare DNS, **re-create the MX and email TXT records exactly** as
      they were at the old host (this protects email).
- [ ] Point the apex (`mohrleisure.com`) and `www` at Cloudflare Pages per the
      dashboard's instructions (CNAME/flattening is handled automatically).
- [ ] Update the domain's **nameservers** to Cloudflare's (registrar step) — or,
      if staying on the current DNS provider, just update the website records.
- [ ] Lower TTL to 5 min a day before cutover if possible, so changes propagate fast.

## After cutover (within 24–48h)
- [ ] Site loads on `https://mohrleisure.com` AND `https://www.mohrleisure.com`
      (one should redirect to the other — pick a canonical).
- [ ] HTTPS padlock is valid (Cloudflare issues the cert automatically).
- [ ] **Send + receive a test email** to/from the domain — confirm email survived.
- [ ] Spot-check 5+ old WordPress URLs → they 301 to the new pages.
- [ ] Resubmit `sitemap.xml` in Google Search Console; watch for crawl errors.
- [ ] Keep the old WordPress site/host running for ~30 days as a fallback before
      cancelling — don't delete it the same day.

## Rollback
If something breaks, reverting the nameservers / records to the old host restores
the previous setup (within the TTL window). This is why you exported the old
records first — that export *is* your rollback plan.
