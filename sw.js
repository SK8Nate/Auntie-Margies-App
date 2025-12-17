const CACHE_NAME = 'margie-list-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap'
];

// Install service worker and cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Margie List: Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .catch((err) => {
                console.log('Margie List: Cache failed', err);
            })
    );
    self.skipWaiting();
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Margie List: Removing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch with cache-first strategy for app shell, network-first for data
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // For same-origin requests
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request)
                        .then((response) => {
                            // Don't cache non-successful responses
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }
                            
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                            
                            return response;
                        });
                })
                .catch(() => {
                    // Return offline fallback if available
                    return caches.match('/index.html');
                })
        );
    } else {
        // For external requests (like fonts), try network first
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request))
        );
    }
});

// Handle push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'Time to check MimaDay!',
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'mimaday-notification',
        requireInteraction: true,
        actions: [
            { action: 'open', title: 'Open MimaDay' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('MimaDay', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'dismiss') {
        return;
    }

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // If MimaDay is already open, focus it
                for (const client of clientList) {
                    if (client.url.includes('mimaday') && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Otherwise, open a new window
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});

// Background sync for journal entries (when online)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-journal') {
        event.waitUntil(syncJournalEntries());
    }
});

async function syncJournalEntries() {
    // This would sync journal entries to a server when available
    console.log('Margie List: Syncing journal entries...');
}

// Periodic background sync for morning reminders
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'morning-check') {
        event.waitUntil(checkMorningReminder());
    }
});

async function checkMorningReminder() {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 7 && hour < 9) {
        self.registration.showNotification('Good Morning, Margie! ☀️', {
            body: "Tap to see what's on today!",
            icon: 'icon-192.png',
            badge: 'icon-192.png',
            tag: 'morning-reminder',
            requireInteraction: true
        });
    }
}
