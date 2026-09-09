const CACHE_NAME = 'dkd-portal-v3';
const ASSETS = ['/index.html', '/manifest.json'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(c => { try { return c.addAll(ASSETS); } catch(e2){} })); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(names => Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => e.respondWith(fetch(e.request).then(r => { caches.open(CACHE_NAME).then(c => c.put(e.request, r.clone())); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('/index.html')))));
