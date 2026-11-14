import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validateStations,validateMarkets} from '../config.js';
const stations=JSON.parse(await readFile(new URL('../data/stations.json',import.meta.url)));
const markets=JSON.parse(await readFile(new URL('../data/markets.json',import.meta.url)));
test('published stations and market configuration are valid',()=>{
  assert.equal(validateStations(stations),stations);
  assert.equal(validateMarkets(markets),markets);
  assert.ok(stations.stations.some(x=>x.type==='radio'));
});
test('favorites cannot refer to missing or duplicated station IDs',()=>{
  assert.throws(()=>validateStations({...stations,favorites:['missing']}));
  assert.throws(()=>validateStations({...stations,favorites:[stations.stations[0].id,stations.stations[0].id]}));
});
test('configuration rejects executable URLs, credentials and unsupported app types',()=>{
  for(const patch of [{url:'javascript:alert(1)'},{url:'http://example.com/stream'},{url:'https://user:secret@example.com/'},{type:'assistant'},{color:'red;display:none'}]){
    assert.throws(()=>validateStations({...stations,stations:[{...stations.stations[0],...patch}],favorites:[]}));
  }
});
test('empty catalogs and disabled markets are valid',()=>{
  validateStations({version:1,stations:[],favorites:[]});
  validateMarkets({enabled:false,symbols:[]});
});
test('HTML and imports are repository-path safe and have no backend dependencies',async()=>{
  const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
  const app=await readFile(new URL('../app.js',import.meta.url),'utf8');
  assert.doesNotMatch(html,/(?:href|src)="\/(?!\/)/);
  assert.doesNotMatch(app,/\/api\/|createAssistant|createCompanion/);
  assert.doesNotMatch(app,/from ['"]\//);
});
