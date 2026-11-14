# GitHub Pages deployment

[Back to README](../README.md)

## Repository layout

The repository is `https://github.com/alexandruverbitsky/drive-deck`. Upload the contents of the **drive-deck-lite** folder to its root—not the parent workspace and not the original webapp.

Keep `index.html`, the JavaScript and CSS files, `data/`, `privacy.html`, `favicon.svg` and `.nojekyll`. Documentation and tests can also be committed. No build or npm install is needed to publish this static site.

## Enable Pages

1. Open repository **Settings → Pages**.
2. Set Source to **Deploy from a branch**.
3. Choose **main**, folder **/ (root)**, and Save.
4. Wait for the Pages deployment to succeed.
5. Open the URL shown by GitHub.

The expected project URL is `https://alexandruverbitsky.github.io/drive-deck/`; it is not live until Pages is enabled and deployment succeeds. Relative application paths support this repository prefix.

For the first smoke test, check all three navigation views, radio Play/Pause, reload without autoplay, theme persistence, market Pause/Resume and the Privacy link. Test on the actual vehicle before relying on its browser behavior.

## Updates

Commit and push changes to `main`. GitHub republishes the branch. Update stations and favorites through `data/stations.json`, and ticker symbols through `data/markets.json`.

To roll back a change, revert the relevant commit and push the revert. Avoid force-pushing shared history.

## Custom domain

A separate subdomain such as `lite.avlab.xyz` can point to Pages while the full app remains at its existing address. Follow GitHub’s custom-domain instructions and enable HTTPS after DNS and the certificate are ready. Do not repoint the full app’s domain unless you intend to replace it.

Official references:

- [Publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

## Before committing

Review `git status` and `git diff --cached` from the Lite repository. The `.gitignore` excludes common environment, AWS, SSH, key, database and archive files. It does not remove already-tracked files or detect secrets embedded in source. Never add the original app’s deployment configuration or credentials.
