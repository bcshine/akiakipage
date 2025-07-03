// Service Worker for 아키아키 PWA
const CACHE_NAME = 'akiaki-v1.0.0';
const STATIC_CACHE_NAME = 'akiaki-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'akiaki-dynamic-v1.0.0';

// 캐시할 정적 리소스들
const STATIC_FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  // 이미지 파일들
  '/images/logo.png',
  '/images/full.jpg',
  '/images/cover.jpg',
  '/images/full2.jpg',
  '/images/chan.png',
  '/images/wook.png',
  '/images/haru.jpg',
  '/images/seminar.jpg',
  '/images/crab.png',
  '/images/lobster.jpg',
  '/images/crabsashimi.jpg',
  '/images/A.jpg',
  '/images/B.jpg',
  '/images/C.jpg',
  '/images/mulhoe.jpg',
  '/images/gulbi.jpg',
  '/images/bok.jpg',
  '/images/hwedup.jpg',
  '/images/propose.jpg',
  '/images/1st.jpg',
  '/images/wedding.jpg',
  '/images/seven.jpg',
  '/images/birthday_placeholder.jpg',
  '/images/caviar.jpg',
  // 폰트 및 외부 리소스
  'https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap'
];

// Service Worker 설치 이벤트
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .catch(err => {
        console.log('[SW] Cache installation failed:', err);
      })
  );
  self.skipWaiting();
});

// Service Worker 활성화 이벤트
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('[SW] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', event => {
  // 네이버 예약이나 외부 링크는 캐시하지 않음
  if (event.request.url.indexOf('naver.com') !== -1 || 
      event.request.url.indexOf('instagram.com') !== -1 ||
      event.request.url.indexOf('youtube.com') !== -1) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에서 찾으면 반환
        if (response) {
          return response;
        }

        // 네트워크에서 가져오기
        return fetch(event.request)
          .then(res => {
            // 유효한 응답이 아니면 그대로 반환
            if (!res || res.status !== 200 || res.type !== 'basic') {
              return res;
            }

            // 동적 캐시에 저장
            const responseClone = res.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseClone);
              });

            return res;
          })
          .catch(err => {
            // 오프라인 상태일 때 기본 페이지 반환
            console.log('[SW] Fetch failed, returning offline page');
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// 백그라운드 동기화 (향후 확장용)
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// 푸시 알림 처리 (향후 확장용)
self.addEventListener('push', event => {
  console.log('[SW] Push received');
  
  const options = {
    body: event.data ? event.data.text() : '아키아키에서 새로운 소식이 있습니다!',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '메뉴 보기',
        icon: '/images/logo.png'
      },
      {
        action: 'close',
        title: '닫기',
        icon: '/images/logo.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('아키아키', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click received.');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#omakase')
    );
  } else if (event.action === 'close') {
    event.notification.close();
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 백그라운드 동기화 함수
function doBackgroundSync() {
  return new Promise((resolve, reject) => {
    console.log('[SW] Background sync completed');
    resolve();
  });
}

// 캐시 정리 함수
function cleanupCaches() {
  return caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName.startsWith('akiaki-') && 
            cacheName !== STATIC_CACHE_NAME && 
            cacheName !== DYNAMIC_CACHE_NAME) {
          return caches.delete(cacheName);
        }
      })
    );
  });
}

// 캐시 크기 제한 함수
function limitCacheSize(name, size) {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
} 