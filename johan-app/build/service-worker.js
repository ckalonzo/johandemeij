/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
<<<<<<< HEAD
  "/precache-manifest.1daf7b3604339c52719d81dfb5e1a5f6.js"
=======
  "/precache-manifest.f913e92691c988d30f449e934575bfdb.js"
>>>>>>> a5e387214c466596c6e0a8b5c6fbc2c68db81b0d
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
<<<<<<< HEAD
  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
=======
  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
>>>>>>> a5e387214c466596c6e0a8b5c6fbc2c68db81b0d
});
