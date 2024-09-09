const CACHE_NAME = 'radonezh-cache-v1';
const URLS_TO_CACHE = [
    '/',

    '/index.html',

    '/css/app.css',
    '/css/framework7-icons.css',
    '/css/framework7.ios.min.css',
    '/css/framework7.min.css',

    '/fonts/Framework7Icons-Regular.eot',
    '/fonts/Framework7Icons-Regular.svg',
    '/fonts/Framework7Icons-Regular.ttf',
    '/fonts/Framework7Icons-Regular.woff',
    '/fonts/Framework7Icons-Regular.woff2',

    '/img/back.svg',
    '/img/bg.svg',
    '/img/maestro.svg',
    '/img/mastercard.svg',
    '/img/mir.svg',
    '/img/next.svg',
    '/img/ok.svg',
    '/img/visa.svg',

    '/js/app.js',
    '/js/framework7.min.js',

    '/pages/about.html',
    '/pages/settings.html',

    '/res/icon/hdpi.png',
    '/res/icon/ldpi.png',
    '/res/icon/mdpi.png',
    '/res/icon/xhdpi.png',
    '/res/icon/xxhdpi.png',
    '/res/icon/xxxhdpi.png',
];

// Устанавливаем кэш
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Активируем новый кэш и удаляем старый
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Интерсептируем запросы и отвечаем из кэша, если доступно
/*
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;  // Возвращаем кэшированный ресурс
                }
                return fetch(event.request);  // Иначе делаем запрос к сети
            })
    );
});
*/
