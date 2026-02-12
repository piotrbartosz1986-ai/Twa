/* Minimal Service Worker: cache + offline fallback (GitHub Pages: /Twa/) */
const CACHE_NAME = "twa-hello-v1";
const BASE = "/Twa/";
const OFFLINE_URL = BASE + "offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      BASE,
      BASE + "index.html",
      BASE + "manifest.webmanifest",
      BASE + "offline.html",
      BASE + "icons/icon-192.png",
      BASE + "icons/icon-512.png"
    ]);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE_NAME) ? caches.delete(k) : Promise.resolve()));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith((async () => {
    try {
      const network = await fetch(req);
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, network.clone());
      return network;
    } catch (e) {
      const cached = await caches.match(req, { ignoreSearch: true });
      if (cached) return cached;
      return caches.match(OFFLINE_URL);
    }
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "PING") {
    event.source?.postMessage({ type: "PONG" });
  }
});
