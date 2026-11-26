# BrewBudget

BrewBudget is a lightweight coffee spending calculator and practical guide. Visitors can compare café coffee with a home-brew estimate, use USD, GBP, CAD, or AUD, and see weekly, monthly, and yearly totals.

The English-language site is aimed at coffee drinkers in the United States, United Kingdom, Canada, and Australia. Prices are formatted in the selected currency; the calculator does not convert between currencies.

## Run locally

Open `index.html` in a browser. The app is static and has no build step, server, cookies, accounts, or analytics.

## Publish

Upload this folder to any static host, such as GitHub Pages, Netlify, or Cloudflare Pages. For GitHub Pages, choose the repository's root folder as the publishing source. Add a custom domain later if desired.

## Monetization setup

The page includes clearly marked placements for a display ad and coffee gear partner links. These are placeholders; they do not generate revenue until you connect an ad network or replace the sample link with an approved affiliate link. Apply to the provider, add its verification code or link, and follow its disclosure and content policies. Traffic, acceptance, and earnings are not guaranteed.

## Before adding ad tracking

- Replace the sample content and partner call to action with your selected provider's code and destination.
- Keep the commission disclosure near affiliate links.
- Update `privacy.html` with the actual providers, cookies, and data practices after adding them.
- Add the host's verification file or DNS record if the provider asks for it.

## Files

- `index.html` — app and page content
- `coffee-cost-guide.html` — original guide to estimating home-brew costs
- `styles.css` — responsive styling
- `app.js` — calculator logic
- `privacy.html` — starter privacy notice for the current no-tracking version

## Notes

This is an informational budgeting tool, not financial advice. Currency is currently USD. Visitors can adjust café price, home-brew cost per cup, cups, and days to fit their routine. The estimate excludes equipment, milk, taxes, travel, waste, and changes in routine.
