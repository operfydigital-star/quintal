const CACHE_NAME = 'quintal-do-marchetti-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/metadata.json',
  '/App.tsx',
  '/types.ts',
  '/constants.tsx',
  '/mockData.ts',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg',
  '/maskable-icon.svg',
  '/manifest.json',
  '/services/geminiService.ts',
  '/components/Card.tsx',
  '/components/FichaTecnicaCard.tsx',
  '/components/FichaTecnicaForm.tsx',
  '/components/FichaTecnicaViewModal.tsx',
  '/components/MainContent.tsx',
  '/components/Modal.tsx',
  '/components/Sidebar.tsx',
  '/components/Spinner.tsx',
  '/components/ThemeToggle.tsx',
  '/components/icons/BarIcon.tsx',
  '/components/icons/CaixaIcon.tsx',
  '/components/icons/CleaningIcon.tsx',
  '/components/icons/EditIcon.tsx',
  '/components/icons/ExportIcon.tsx',
  '/components/icons/GerenteIcon.tsx',
  '/components/icons/GrillIcon.tsx',
  '/components/icons/ImageIcon.tsx',
  '/components/icons/KitchenIcon.tsx',
  '/components/icons/MenuIcon.tsx',
  '/components/icons/MoonIcon.tsx',
  '/components/icons/ServiceIcon.tsx',
  '/components/icons/SunIcon.tsx',
  '/components/icons/TrashIcon.tsx',
  '/components/icons/XIcon.tsx'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
