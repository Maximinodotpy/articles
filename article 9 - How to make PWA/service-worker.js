function CacheStuff() {
    var cache = caches.open('v10');
    cache.addAll([
        '/',
        '/index.html',
        '/images/icon_200.png'
    ])
}

this.addEventListener('install', (event) => {
    event.waitUntil(CacheStuff())
})


this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
  );
})

