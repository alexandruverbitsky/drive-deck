# Default radio catalog

A curated mix of news, talk and entertainment, not an audience ranking. Existing shortcuts are retained. BBC World Service, Kommersant FM, France Inter and CBC Radio One Toronto are also added to the default favorites. FIP is upgraded from a website shortcut to direct playback.

| Country | News and talk | Music and entertainment |
| --- | --- | --- |
| UK | BBC World Service, LBC News | Heart UK |
| Russia | Kommersant FM | Europa Plus, Retro FM 80s |
| France | France Inter, franceinfo | FIP |
| Canada | CBC Radio One Toronto, ICI Première Montréal | ICI Musique Montréal, JAZZ.FM91 Toronto |

All 13 stream endpoints returned HTTP 200 with an audio content type and a 2 KB audio sample on November 14, 2026. This is a connectivity check, not a full listening or Tesla-device test. Availability and geographic restrictions can change.

The user-supplied Kommersant HTTP address on port 8016 is replaced by its verified HTTPS endpoint on port 8085 so it can be loaded from an HTTPS GitHub Pages site. BBC uses `https://stream.live.vc.bbcmedia.co.uk/bbc_world_service`. Canadian StreamTheWorld stations use stable redirect addresses rather than pinning a numbered edge server. MP3/AAC feeds avoid requiring an HLS player dependency.

## Sources

- [Radio Browser directory API](https://docs.radio-browser.info/): station names and direct-stream discovery. Entries were checked against the actual streaming endpoints.
- [BBC World Service](https://www.bbc.co.uk/worldserviceradio)
- [Kommersant FM](https://www.kommersant.ru/fm)
- [Radio France official API examples](https://developers.radiofrance.fr/doc/tutorial-by-example/list-brands): France Inter, franceinfo and FIP stream URLs.
- [Radio-Canada streaming information](https://assistance.radio-canada.ca/hc/fr/articles/15935829984276-O%C3%B9-puis-je-trouver-les-adresses-URL-de-ICI-Premi%C3%A8re-et-ICI-Musique)
- [JAZZ.FM91 official stream addresses](https://jazz.fm/streaming/)

Each new JSON entry includes `country`, `genre`, `homepage` and `streamChecked`. Country and genre appear under radio tiles. These fields do not add any runtime discovery API calls or backend dependencies. Edit the JSON to change the selection; stream checks are historical notes, not automatic health monitoring.
