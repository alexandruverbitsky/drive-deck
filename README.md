# Drive Deck Lite

**Your stations. Your favorites. Your drive.**

Drive Deck Lite brings radio stations, favorite websites and a compact market ticker into the familiar Drive Deck interface. Designed for Tesla, mobile and desktop browsers, it combines themes, horizontal app pages and an integrated radio player with a catalog maintained in simple JSON files.

## Documentation

- [Default radio catalog and stream sources](docs/RADIO-CATALOG.md)
- [Using the dashboard](docs/USER-GUIDE.md)
- [Stations, favorites and market configuration](docs/CONFIGURATION.md)
- [GitHub Pages deployment](docs/DEPLOYMENT.md)
- [Development and architecture](docs/DEVELOPMENT.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## GitHub repository description

Suggested About text:

> A lightweight Drive Deck dashboard for Tesla, mobile and desktop browsers, with JSON-managed radio stations and favorites, themes and an optional market ticker. Static hosting on GitHub Pages; no application backend or sign-in.

Suggested topics: `tesla`, `dashboard`, `internet-radio`, `github-pages`, `static-site`, `javascript`.

## Validation status

On November 14, 2026, all five configuration/path tests and the JavaScript syntax checks passed. The 13 curated UK, Russia, France and Canada radio endpoints returned HTTPS audio samples. Browser and Tesla-device playback verification remain pending; this does not imply deployment.

A standalone static edition of Drive Deck: the same dashboard styling, app paging, radio player, themes and optional market ticker. No application server, database, sign-in or AI keys. The full Drive Deck project is separate and unchanged.

## Publish on GitHub Pages

1. Create a new public repository, for example `drive-deck-lite`.
2. Upload the **contents of this folder** to the repository root, including `data/` and `.nojekyll`. Do not upload the full Drive Deck repository or any environment files.
3. In repository **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and Save.
4. Open the URL GitHub provides: `https://YOUR-USERNAME.github.io/drive-deck-lite/`.

No build command, npm installation or GitHub Actions workflow is required. All application paths are relative so project URLs and custom domains work. GitHub Pages supports HTTPS; streams must also use HTTPS. A custom subdomain such as `lite.avlab.xyz` can be configured later without moving the full app.

## Stations and favorites

Edit `data/stations.json` and commit to publish changes. `stations` includes both direct audio streams and website shortcuts. Use `type: "radio"` for a direct playable HTTPS MP3/AAC stream; use `web` or `map` for website links, which open separately. FIP is a direct stream; NTS remains a website shortcut.

Each entry needs a unique `id`, `name`, `type`, HTTPS `url`, six-digit hex `color` and `icon`. Available icons include `radio`, `leaf`, `orbit`, `navigation`, `globe`, `bandcamp`, `music`, `headphones`, `link`, `fip` and `nts`.

The `favorites` array contains station IDs in the shared catalog. Everyone sees the same published favorites; the catalog order controls tile order. Browser preferences never replace the published station list. Invalid configuration displays an error rather than using stale data.

The initial catalog copies the full app's built-in non-AI shortcuts. Personal account stations stored in its database are not exported or accessed.

## Markets

Edit `data/markets.json`: set `enabled` and list up to 12 TradingView `{ "symbol": "FX:USDCAD", "name": "USD / CAD" }` entries. Prices come directly from TradingView, may be delayed and depend on symbol availability. Index entries labeled CFD are not cash index spot prices. Pause unloads the embed; Appearance and settings can hide it on this device.

## Local preferences

Theme, volume, last station and market visibility use the `drive-deck-lite:` local-storage namespace. They stay on the current browser and do not sync. Reload restores the selected station paused. Audio requires an internet connection and a user gesture. Browser support, broadcaster outages and geographic restrictions can affect playback.

## Preview and checks

From this folder run `python3 -m http.server 8080`, then open `http://localhost:8080`. This is a local preview only; deployment needs no running process. Opening `index.html` directly as a `file:` URL will not load JSON reliably.

With Node installed, `npm test` validates the catalog and `npm run check` checks JavaScript syntax. No runtime npm dependencies are needed.

Published JSON is public. Do not put credentials or private information in these files. This personal/free static edition is intended for GitHub Pages; consult GitHub's usage rules before commercializing it.
