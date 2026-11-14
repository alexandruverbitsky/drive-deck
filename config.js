export function validateStations(data) {
  if (data?.version !== 1 || !Array.isArray(data.stations) || data.stations.length > 100 || !Array.isArray(data.favorites)) throw Error('Invalid stations.json: use version 1, stations and favorites arrays.');
  const ids = new Set();
  for (const x of data.stations) {
    if (!x || !/^[\w-]{1,60}$/.test(x.id) || ids.has(x.id) || typeof x.name !== 'string' || !x.name.trim() || x.name.length > 80 || !['radio','web','map'].includes(x.type) || !/^#[\da-f]{6}$/i.test(x.color) || typeof x.icon !== 'string' || x.icon.length > 24) throw Error('Invalid station entry. Check IDs, names, types, icons and colors.');
    let url; try { url = new URL(x.url); } catch { throw Error('A station URL is invalid.'); }
    if (url.protocol !== 'https:' || url.username || url.password || x.url.length > 2048) throw Error('Station URLs must use HTTPS without credentials.');
    ids.add(x.id);
  }
  if (new Set(data.favorites).size !== data.favorites.length || data.favorites.some(id=>!ids.has(id))) throw Error('Favorites must contain unique, existing station IDs.');
  return data;
}
export function validateMarkets(data) {
  if (typeof data?.enabled !== 'boolean' || !Array.isArray(data.symbols) || data.symbols.length > 12 || data.symbols.some(x=> !x || typeof x.symbol !== 'string' || !/^[\w:./-]{1,80}$/.test(x.symbol) || typeof x.name !== 'string' || !x.name.trim() || x.name.length>60)) throw Error('Invalid markets.json. Use enabled and up to 12 named symbols.');
  return data;
}
