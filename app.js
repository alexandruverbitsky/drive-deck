import {svg, esc} from './icons.js';
import {createPager} from './pager.js';
import {createRadioPlayer} from './radio-player.js';
import {themes, defaultTheme, isTheme} from './themes.js';
import {validateStations, validateMarkets} from './config.js';
const $=s=>document.querySelector(s);
const storage={get(k,fallback=null){try{return JSON.parse(localStorage.getItem('drive-deck-lite:'+k))??fallback}catch{return fallback}},set(k,v){try{localStorage.setItem('drive-deck-lite:'+k,JSON.stringify(v))}catch{}}};
let config={stations:[],favorites:[]}, markets=null, tab='all', active=null, wanted=false, paused=false, placeholder=null;
let marketVisible=storage.get('markets',true)!==false;
const audio=$('#audio'), modal=$('#modal');
const pager=createPager({viewport:$('#shortcutGrid'),controls:$('#pageControls'),previous:$('#previousPage'),next:$('#nextPage'),status:$('#pageStatus')});
function close(){modal.close();}
function restoreCard(){if(placeholder){placeholder.replaceWith($('.now-card'));placeholder=null;}modal.classList.remove('radio-dialog');}
modal.addEventListener('close',restoreCard);
function open(html){restoreCard();$('#modalBody').innerHTML=html;if(!modal.open)modal.showModal();$('#closeModal').focus();}
$('#closeModal').onclick=close;
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
let toastTimer;function toast(message){$('#toast').textContent=message;$('#toast').style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').style.display='none',5000);}
const player=createRadioPlayer({audio,remember:station=>storage.set('station',station?.id),onState(state){
 active=state.station;wanted=state.wanted;
 const labels={idle:'READY TO PLAY',paused:'PAUSED',connecting:'CONNECTING',playing:'LIVE RADIO',buffering:'BUFFERING',reconnecting:'RECONNECTING',offline:'OFFLINE',failed:'CONNECTION LOST',blocked:'TAP PLAY'};
 $('#liveLabel').textContent=labels[state.state]||state.state;
 $('#trackName').textContent=active?.name||'Choose your soundtrack.';
 $('#trackMeta').textContent=state.state==='offline'?'Waiting for a connection.':state.state==='failed'?'Tap Retry to reconnect.':active?'Independent radio · Live stream':'Choose a radio station to tune in.';
 $('#play').innerHTML=svg(wanted?'pause':'play');$('#play').setAttribute('aria-label',wanted?'Pause radio':'Play radio');
 $('#retryRadio').hidden=!['failed','blocked'].includes(state.state);
 $('#equalizer').classList.toggle('playing',state.state==='playing');
 if(active){$('.station-art-label').textContent=active.name;$('#albumArt').style.background=active.color;}
}});
function render(){
 const shown=config.stations.filter(x=>tab==='all'||tab==='radio'&&x.type==='radio'||tab==='favorites'&&config.favorites.includes(x.id));
 const nodes=shown.map(x=>{const node=document.createElement('div');node.className='shortcut';const button=document.createElement('button');button.className='tile';button.setAttribute('aria-label','Open '+x.name);
 const word=['fip','nts'].includes(x.icon);button.innerHTML=`<span class="app-icon ${word?'word '+x.icon:''}" style="background:${x.color}">${word?x.icon.toUpperCase():svg(x.icon)}</span><span class="app-name">${esc(x.name)}</span><span class="app-type">${x.type==='radio'?esc(x.country ? x.country+' · '+(x.genre||'Radio') : 'STREAM RADIO'):x.type==='map'?'LIVE MAP':'WEB APP'}</span>`;
 button.onclick=()=>{if(x.type==='radio')player.play(x);else window.open(x.url,'_blank','noopener,noreferrer');};node.append(button);return node;});
 if(!nodes.length){const n=document.createElement('p');n.className='small';n.textContent=tab==='favorites'?'No favorites configured yet.':'No stations in this view.';nodes.push(n);}
 pager.setItems(nodes,false,true);
 document.querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('selected',b.dataset.tab===tab);b.setAttribute('aria-pressed',String(b.dataset.tab===tab));});
}
for(const [id,icon]of [['gridNav','grid'],['starNav','star'],['radioNav','radio'],['fullscreen','expand'],['settings','settings'],['mute','volume'],['play','play']])$('#'+id).innerHTML=svg(icon);
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render();});
$('#play').onclick=()=>{if(wanted)player.pause();else{const station=active||config.stations.find(x=>x.type==='radio');if(station)player.play(station);else toast('No radio streams configured.');}};
$('#retryRadio').onclick=()=>{if(active)player.play(active)};
const volume=storage.get('volume',.7);audio.volume=Number.isFinite(volume)?Math.max(0,Math.min(1,volume)):.7;$('#volume').value=audio.volume;
$('#volume').oninput=e=>{audio.volume=Number(e.target.value);storage.set('volume',audio.volume);};
$('#mute').onclick=()=>{audio.muted=!audio.muted;$('#mute').innerHTML=svg(audio.muted?'mute':'volume');$('#mute').setAttribute('aria-label',audio.muted?'Unmute':'Mute');};
window.addEventListener('offline',()=>player.offline());window.addEventListener('online',()=>player.online());window.addEventListener('pagehide',()=>player.pause());
$('#fullscreen').onclick=()=>{open('<div id="radioStage"></div>');modal.classList.add('radio-dialog');placeholder=document.createComment('radio home');$('.now-card').before(placeholder);$('#radioStage').append($('.now-card'));};
function setTheme(value){const id=isTheme(value)?value:defaultTheme;document.documentElement.dataset.theme=id;storage.set('theme',id);}
setTheme(storage.get('theme',defaultTheme));
function renderMarkets(){const host=$('#marketFrame');host.replaceChildren();$('.market-strip').hidden=!markets?.enabled||!marketVisible||!markets.symbols.length;$('#marketsPaused').hidden=!paused;host.hidden=paused;$('#toggleMarkets').textContent=paused?'Resume':'Pause';$('#toggleMarkets').setAttribute('aria-pressed',String(paused));if($('.market-strip').hidden||paused)return;
 const frame=document.createElement('iframe');frame.title='Market prices and daily changes';frame.className='compact-markets';frame.sandbox='allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox';frame.referrerPolicy='no-referrer';
 const settings={symbols:markets.symbols.map(x=>({proName:x.symbol,title:x.name})),colorTheme:'dark',isTransparent:false,displayMode:'regular',showSymbolLogo:true};
 frame.src='https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#'+encodeURIComponent(JSON.stringify(settings));host.append(frame);
}
$('#toggleMarkets').onclick=()=>{paused=!paused;renderMarkets()};
$('#marketSettings').onclick=()=>open('<h2>Market watch</h2><p>Quotes are supplied by TradingView and may be delayed. Index entries marked CFD are not cash index prices.</p><p>Symbols are maintained in <code>data/markets.json</code>. Hide the feed in Appearance and settings.</p>');
$('#settings').onclick=()=>{open(`<h2>Make it yours</h2><label for="theme">Theme</label><select id="theme">${themes.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select><label class="lite-switch"><input type="checkbox" id="showMarkets" ${marketVisible?'checked':''}> Show market ticker</label><p class="small">Theme, volume and last station stay on this device. Stations and favorites come from the published JSON files.</p>`);$('#theme').value=document.documentElement.dataset.theme;$('#theme').onchange=e=>setTheme(e.target.value);$('#showMarkets').onchange=e=>{marketVisible=e.target.checked;storage.set('markets',marketVisible);renderMarkets();};};
$('#help').onclick=()=>open('<h2>Drive Deck Lite</h2><p>Your apps. Your drive.</p><p>A standalone static dashboard. Edit <code>data/stations.json</code> to update stations, shortcuts and favorites, then publish your changes on GitHub Pages.</p><p>Radio connects directly to each broadcaster. Website shortcuts open separately. No account or API keys are needed.</p><p><a href="./privacy.html">Privacy and local data</a></p>');
function clock(){$('#clock').textContent=new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date());}clock();setInterval(clock,30000);
async function json(file){const response=await fetch(new URL('./data/'+file,import.meta.url),{cache:'no-cache'});if(!response.ok)throw Error('Could not load '+file);return response.json();}
async function init(){
 try{config=validateStations(await json('stations.json'));render();const remembered=config.stations.find(x=>x.id===storage.get('station')&&x.type==='radio');if(remembered)player.restore(remembered);}
 catch(e){$('#shortcutGrid').innerHTML='<div class="lite-error" role="alert"><h2>Could not load your dashboard</h2><p></p><button class="primary" id="reload">Retry</button></div>';$('.lite-error p').textContent=e.message;$('#reload').onclick=()=>location.reload();}
 try{markets=validateMarkets(await json('markets.json'));renderMarkets();}catch(e){$('.market-strip').hidden=true;toast(e.message);}
}
init();
