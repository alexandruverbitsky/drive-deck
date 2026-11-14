const paths = {
  grid: '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="3" width="6" height="6" rx="1.5"/><rect x="3" y="15" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
  radio:
    '<rect x="3" y="8" width="18" height="13" rx="3"/><path d="m6 8 12-5M6 13h6M6 17h3"/><circle cx="17" cy="15" r="2"/>',
  settings:
    '<path d="m9 3-.8 3-2.9.8-1.5 2.6L6 12l-2.2 2.6 1.5 2.6 2.9.8.8 3h6l.8-3 2.9-.8 1.5-2.6L18 12l2.2-2.6-1.5-2.6-2.9-.8L15 3Z"/><circle cx="12" cy="12" r="3"/>',
  expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5"/>',
  qr: '<path d="M3 3h6v6H3zm12 0h6v6h-6zM3 15h6v6H3zm12 0h2v2h-2zm4 0h2v6h-6v-2h4zM12 3v3m0 5v3m-9-2h5m4 5v4"/>',
  edit: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  navigation: '<path d="m20 4-6 17-3-8-8-3Z"/><path d="m11 13 5-5"/>',
  leaf: '<path d="M20 3C8 2 2 8 5 16c8 6 17-1 15-13Z"/><path d="M4 21 16 9m-6 6v-4m0 4h4"/>',
  orbit:
    '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(-35 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(35 12 12)"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/>',
  bandcamp: '<path d="m8 6-6 12h14l6-12Z" fill="currentColor" stroke="none"/>',
  music:
    '<path d="M9 18V5l12-2v13M9 8l12-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="18" cy="16" rx="3" ry="3"/>',
  headphones:
    '<path d="M4 15v-4a8 8 0 0 1 16 0v4"/><rect x="2" y="12" width="5" height="9" rx="2"/><rect x="17" y="12" width="5" height="9" rx="2"/>',
  link: '<path d="m10 14 4-4m-6 2-3 3a4 4 0 0 0 6 6l3-3m-2-12 3-3a4 4 0 0 1 6 6l-3 3"/>',
  play: '<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
  volume:
    '<path d="m11 4-6 5H2v6h3l6 5Zm5 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  mute: '<path d="m11 4-6 5H2v6h3l6 5Zm5 5 6 6m0-6-6 6"/>',
};
export function svg(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.link}</svg>`;
}
export const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
