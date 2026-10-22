const V='batchnotes-1',OWN=['','index.html','style.css','app.js','manifest.json','logo.svg'];
const base=new URL('./',self.registration.scope).pathname;
self.addEventListener('install',e=>{e.waitUntil(self.skipWaiting())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;const rel=u.pathname.startsWith(base)?u.pathname.slice(base.length):null;if(rel===null||!OWN.includes(rel))return;
e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
