const CACHE_NAME = "little-ledger-v1";

const APP_SHELL = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/storage.js",
    "./js/calculations.js",
    "./js/filters.js",
    "./js/analytics.js",
    "./js/budget.js",
    "./js/comparison.js",
    "./js/data.js",
    "./js/insights.js",
    "./js/modal.js",
    "./js/notifications.js",
    "./js/transactions.js",
    "./js/app.js",
    "./manifest.webmanifest",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then((response) => {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, copy);
                });
                return response;
            }).catch(() => caches.match("./index.html"));
        })
    );
});
