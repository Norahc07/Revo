// Basic ReVo service worker for PWA installability.
// This currently does not implement offline caching logic.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

