const V='noteroll-notes2',OWN=['','index.html','style.css','app.js','reader.js','manifest.json','logo.svg'];
const base=new URL('./',self.registration.scope).pathname;
self.addEventListener('install',e=>{e.waitUntil(self.skipWaiting())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;if(/(^|\.)gstatic\.com$|(^|\.)googleapis\.com$|cdnjs\.cloudflare\.com$/.test(u.hostname)&&/firebasejs|fonts|qrcode|\.woff2?$|css2/.test(u.href)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x.ok||x.type==='opaque'){const c=x.clone();caches.open(V).then(y=>y.put(e.request,c))}return x})));return}
  const rel=u.pathname.startsWith(base)?u.pathname.slice(base.length):null;if(rel===null||u.origin!==location.origin||!OWN.includes(rel))return;
e.respondWith(Promise.race([fetch(e.request),new Promise((_,j)=>setTimeout(j,5000))]).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
