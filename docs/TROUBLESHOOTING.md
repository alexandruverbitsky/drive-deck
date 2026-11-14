# Troubleshooting

[Back to README](../README.md)

| Symptom | Check |
| --- | --- |
| GitHub Pages returns 404 | Pages is enabled on the correct branch/root, deployment succeeded, and `index.html` is at repository root |
| JSON does not load locally | Use an HTTP preview server; do not open `index.html` as a `file:` URL |
| Dashboard reports invalid configuration | Check JSON syntax, unique IDs, required fields and favorites that reference existing entries |
| A new station does not appear | Confirm the commit and deployment succeeded; refresh after hosting caches update |
| Favorites is empty | Add station IDs to the `favorites` array; names and URLs are not IDs |
| Radio will not start | Tap Play; confirm a direct HTTPS stream, browser-compatible audio and network access |
| A station works elsewhere but not in the Tesla | Check browser codec support, broadcaster restrictions, redirects and vehicle browser limitations |
| Playback stops | Inspect the connection state; use Retry after recovery attempts are exhausted |
| FIP/NTS opens a website | Bundled entries are website shortcuts; replace with a valid direct stream and `type: "radio"` if desired |
| Ticker is missing | Check JSON `enabled`, symbols, the local show/hide preference, content blockers and TradingView availability |
| Ticker is paused | Select Resume to reload the embed |
| Theme or station is forgotten | Local storage may have been cleared or restricted; preferences are browser-specific |
| Phone settings differ from the Tesla | Lite has no account synchronization |

## Reporting an issue

Include the viewport/device, browser if known, reproduction steps and any visible error. For stream failures, include only the public station URL. Do not share credentials, signed private URLs, environment files or AWS configuration.

The existing full Drive Deck app is a separate project. Troubleshooting Lite should not require changing its server, database, domain or deployment files.
