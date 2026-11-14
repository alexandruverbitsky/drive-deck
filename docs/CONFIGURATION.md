# Configuration reference

[Back to README](../README.md)

## Stations and shortcuts

Edit `data/stations.json`:

```json
{
  "version": 1,
  "stations": [
    {
      "id": "groove",
      "name": "Groove Salad",
      "type": "radio",
      "url": "https://ice2.somafm.com/groovesalad-128-mp3",
      "icon": "leaf",
      "color": "#9ac79b"
    },
    {
      "id": "fip",
      "name": "FIP",
      "type": "web",
      "url": "https://www.radiofrance.fr/fip",
      "icon": "fip",
      "color": "#ed5ca4"
    }
  ],
  "favorites": ["groove", "fip"]
}
```

| Field | Requirement |
| --- | --- |
| `version` | Must be `1` |
| `stations` | Up to 100 entries; an empty array is allowed |
| `id` | Unique, 1–60 letters, digits, underscores or hyphens |
| `name` | Nonempty, at most 80 characters |
| `type` | `radio`, `web` or `map` |
| `url` | HTTPS, at most 2,048 characters, no embedded username/password |
| `icon` | Icon name, at most 24 characters |
| `color` | Six-digit hex color, such as `#9ac79b` |
| `favorites` | Unique IDs present in `stations` |

Tiles follow the `stations` array order, including in Favorites. The favorites array determines membership, not a separate order. Remove a deleted station’s ID from favorites too.

Icons include `radio`, `leaf`, `orbit`, `navigation`, `globe`, `bandcamp`, `music`, `headphones`, `link`, `fip` and `nts`. Unknown names use a generic link icon.

Use a direct browser-compatible HTTPS stream for `radio`, preferably MP3 or AAC. A homepage, playlist file or video page may not be playable. Lite does not relay or transcode audio. Use `web` for a website and `map` for a map website; both open separately.

Optional station metadata: `country`, `genre`, `homepage` and `streamChecked`. Country and genre appear beneath radio tiles. `streamChecked` is the date of a manual connectivity check, not a live availability guarantee.

## Markets

Edit `data/markets.json`:

```json
{
  "enabled": true,
  "symbols": [
    { "symbol": "FX:USDCAD", "name": "USD / CAD" },
    { "symbol": "FOREXCOM:SPXUSD", "name": "US 500 · CFD" },
    { "symbol": "BITSTAMP:BTCUSD", "name": "Bitcoin · USD" }
  ]
}
```

`enabled` is a boolean. List up to 12 instruments. Each requires a TradingView identifier of 1–80 characters and a nonempty name of at most 60 characters. Identifiers allow letters, digits, underscores, colons, periods, slashes and hyphens. Validation checks syntax, not provider availability.

Use `enabled: false` or an empty symbols array to disable the ticker globally. Viewers may also hide it locally through settings. Their hidden preference survives reload.

## Publish edits

Save valid JSON without comments or trailing commas, run `npm test` if Node is available, then commit and push. Wait for the Pages deployment to succeed before refreshing. Hosting caches may briefly retain the previous revision.

Invalid station configuration displays an error. Invalid market configuration hides the ticker and displays a notification. Published files are public: never include credentials, private signed URLs or personal information.
