# Architecture and development

[Back to README](../README.md)

## Runtime

The host serves static assets. Browser JavaScript loads and validates the two JSON files, renders tiles, controls an HTML audio element and optionally creates a TradingView iframe. There are no `/api/` calls to a Drive Deck backend.

| File | Role |
| --- | --- |
| `index.html` | Dashboard structure and controls |
| `app.js` | Startup, views, player wiring, settings and market embed |
| `config.js` | Station, favorite and market validation |
| `icons.js` | SVG icon rendering and HTML escaping |
| `pager.js` | Responsive app pages and navigation |
| `radio-player.js` | Playback state and recovery |
| `themes.js` | Allowed theme identifiers |
| `styles.css`, `dashboard.css` | Copied Drive Deck visual styling |
| `lite.css` | Static-edition layout adjustments |
| `data/` | Public catalog and market configuration |

The copied presentation and player modules are independent files. Editing Lite does not edit the original webapp. Future changes to the original are not automatically inherited.

## Storage and external services

Local preferences use the `drive-deck-lite:` prefix: theme, volume, station and markets. The catalog and favorites remain authoritative in JSON. Audio goes directly to broadcasters; market data comes from the externally hosted TradingView embed. No secrets are needed in the client.

## Local preview

From the repository root:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. To test a repository prefix, serve the parent directory and open `/drive-deck-lite/`. Keep imports, asset links and JSON paths relative.

## Checks

With Node.js 22 or newer:

```bash
npm test
npm run check
```

No runtime npm packages are required. Tests cover valid configuration, invalid favorites, unsafe URLs, empty catalogs and source-path checks. They do not replace browser verification or prove a station is available.

Before release, test desktop, Tesla split/full views, phone portrait/landscape, playback recovery, empty favorites, JSON errors, local storage restrictions, modal closing and ticker hide/pause behavior. Check browser requests for accidental calls to the original backend.

November 14, 2026: five configuration/path tests and JavaScript syntax checks passed. Thirteen curated stream endpoints returned HTTPS audio samples. Full browser and Tesla-device verification remain pending.
