//Service worker
//https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers

const cacheName = 'TimesTables-v2';
const contentToCache = [
    'index.html',
    'script.js',
    'style.css',
    'favicon192.png',
    "favicon.ico"
];

self.addEventListener('install', (e) => {
    // console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
    })());
});