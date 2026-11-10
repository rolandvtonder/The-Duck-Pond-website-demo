# The Duckpond website

Multi-page site for The Duckpond (R102, Greylands Road, between Ballito & Tongaat).
Built with Astro (static HTML per page, for SEO), Tailwind CSS v4 and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run check    # type check
```

## Where things live

- `src/data/site.ts`: every phone number, email, price, venue, room and the weekday special. Change prices here.
- `src/assets/photos/`: photos (resized to WebP automatically). Alt text is in `src/lib/photos.ts`.
- `src/pages/`: one file per page.
- `src/lib/schema.ts`: Google structured data (business, rooms, venues, FAQs).
- `media/`: the original photos and logo, untouched. Not used by the site directly.

## Client demo on GitHub Pages

Every push to `main` builds the demo and publishes it to
https://rolandvtonder.github.io/The-Duck-Pond-website-demo/ (see `.github/workflows/deploy.yml`).
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

The demo is hidden from Google (noindex), and because GitHub Pages can't receive forms, its booking
form hands the filled-in request to WhatsApp or email instead.

## Go live on Netlify (free)

1. Put this folder on GitHub, then in Netlify choose **Add new site → Import an existing project** (it reads `netlify.toml`).
2. **Site configuration → Forms**: enable form detection. Booking requests appear under **Forms → booking**.
3. **Forms → Form notifications → Add notification → Email**: send to `bookings@theduckpond.co.za`.
4. **Domain management**: add `theduckpond.co.za` and update the domain's DNS as Netlify instructs.
5. After launch: add the site to Google Search Console and submit `https://theduckpond.co.za/sitemap-index.xml`, and link the website from the Google Business Profile.

The booking form only sends on Netlify. Locally (or if Netlify is unreachable) it offers WhatsApp or email instead, pre-filled.

## Keep up to date

- The weekday special (`weekdaySpecial` in `site.ts`) ends 30 November 2026; the Specials page shows an "ended" notice after that. Update or replace it.
- Hero photos are stills with a slow drift. If a drone/video clip of the pond becomes available, it can replace the home hero.
