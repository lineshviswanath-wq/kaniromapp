import React, { useEffect } from 'react';
import { initializePWA } from '../utils/pwa-utils';

// Unicode-safe base64 encoding function
const safeBtoa = (str: string): string => {
  try {
    // First try regular btoa
    return btoa(str);
  } catch (error) {
    // If that fails, encode as UTF-8 first
    return btoa(unescape(encodeURIComponent(str)));
  }
};

export const PWAManager: React.FC = () => {
  useEffect(() => {
    // Add PWA meta tags and manifest dynamically
    const addPWAMeta = () => {
      const head = document.head;
      
      // Remove existing PWA meta tags to avoid duplicates
      const existingMeta = head.querySelectorAll('[data-pwa-meta]');
      existingMeta.forEach(meta => meta.remove());

      // Viewport meta tag (if not already present)
      if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
        viewport.setAttribute('data-pwa-meta', 'true');
        head.appendChild(viewport);
      }

      // Theme color
      const themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      themeColor.content = '#030213';
      themeColor.setAttribute('data-pwa-meta', 'true');
      head.appendChild(themeColor);

      // Apple-specific meta tags
      const appleCapable = document.createElement('meta');
      appleCapable.name = 'apple-mobile-web-app-capable';
      appleCapable.content = 'yes';
      appleCapable.setAttribute('data-pwa-meta', 'true');
      head.appendChild(appleCapable);

      const appleStatusBar = document.createElement('meta');
      appleStatusBar.name = 'apple-mobile-web-app-status-bar-style';
      appleStatusBar.content = 'black-translucent';
      appleStatusBar.setAttribute('data-pwa-meta', 'true');
      head.appendChild(appleStatusBar);

      const appleTitle = document.createElement('meta');
      appleTitle.name = 'apple-mobile-web-app-title';
      appleTitle.content = 'Kaniro Financial';
      appleTitle.setAttribute('data-pwa-meta', 'true');
      head.appendChild(appleTitle);

      // Microsoft tile
      const msapplication = document.createElement('meta');
      msapplication.name = 'msapplication-TileColor';
      msapplication.content = '#030213';
      msapplication.setAttribute('data-pwa-meta', 'true');
      head.appendChild(msapplication);

      // Application name
      const appName = document.createElement('meta');
      appName.name = 'application-name';
      appName.content = 'Kaniro Financial Services';
      appName.setAttribute('data-pwa-meta', 'true');
      head.appendChild(appName);

      // Create and add manifest
      const manifest = {
        name: 'Kaniro Financial Services',
        short_name: 'Kaniro',
        description: 'Your comprehensive financial services platform for savings, payments, and goal achievement',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#030213',
        orientation: 'portrait-primary',
        scope: '/',
        categories: ['finance', 'productivity', 'business'],
        lang: 'en-IN',
        dir: 'ltr',
        icons: [
          {
            src: 'data:image/svg+xml;base64,' + safeBtoa(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#030213">
                <rect width="512" height="512" rx="128" fill="#f8fafc"/>
                <circle cx="256" cy="180" r="60" fill="#059669"/>
                <rect x="196" y="260" width="120" height="80" rx="20" fill="#3b82f6"/>
                <path d="M160 380 Q160 360 180 360 L332 360 Q352 360 352 380 L352 420 Q352 440 332 440 L180 440 Q160 440 160 420 Z" fill="#8b5cf6"/>
                <text x="256" y="480" text-anchor="middle" font-family="system-ui" font-size="24" font-weight="bold" fill="#030213">KANIRO</text>
              </svg>
            `),
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'data:image/svg+xml;base64,' + safeBtoa(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" fill="#030213">
                <rect width="192" height="192" rx="48" fill="#f8fafc"/>
                <circle cx="96" cy="68" r="22" fill="#059669"/>
                <rect x="74" y="98" width="44" height="30" rx="8" fill="#3b82f6"/>
                <path d="M60 142 Q60 134 68 134 L124 134 Q132 134 132 142 L132 158 Q132 166 124 166 L68 166 Q60 166 60 158 Z" fill="#8b5cf6"/>
              </svg>
            `),
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'data:image/svg+xml;base64,' + safeBtoa(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144" fill="#030213">
                <rect width="144" height="144" rx="36" fill="#f8fafc"/>
                <circle cx="72" cy="50" r="16" fill="#059669"/>
                <rect x="56" y="72" width="32" height="22" rx="6" fill="#3b82f6"/>
                <path d="M45 106 Q45 100 51 100 L93 100 Q99 100 99 106 L99 118 Q99 124 93 124 L51 124 Q45 124 45 118 Z" fill="#8b5cf6"/>
              </svg>
            `),
            sizes: '144x144',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ],
        shortcuts: [
          {
            name: 'Create Dabba Save',
            short_name: 'Save',
            description: 'Start a new savings goal',
            url: '/?action=save',
            icons: [
              {
                src: 'data:image/svg+xml;base64,' + safeBtoa(`
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="#059669">
                    <circle cx="48" cy="48" r="48" fill="#dcfce7"/>
                    <path d="M32 38 Q32 32 38 32 L58 32 Q64 32 64 38 L64 54 Q64 60 58 60 L38 60 Q32 60 32 54 Z" fill="#059669"/>
                    <circle cx="48" cy="46" r="4" fill="#dcfce7"/>
                  </svg>
                `),
                sizes: '96x96',
                type: 'image/svg+xml'
              }
            ]
          },
          {
            name: 'Pay Overdue',
            short_name: 'Pay',
            description: 'Pay overdue loans',
            url: '/?action=pay',
            icons: [
              {
                src: 'data:image/svg+xml;base64,' + safeBtoa(`
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="#3b82f6">
                    <circle cx="48" cy="48" r="48" fill="#dbeafe"/>
                    <rect x="24" y="36" width="48" height="32" rx="6" fill="#3b82f6"/>
                    <rect x="28" y="40" width="16" height="4" rx="2" fill="#dbeafe"/>
                    <rect x="28" y="60" width="8" height="4" rx="2" fill="#dbeafe"/>
                  </svg>
                `),
                sizes: '96x96',
                type: 'image/svg+xml'
              }
            ]
          }
        ],
        related_applications: [],
        prefer_related_applications: false,
        launch_handler: {
          client_mode: ['navigate-existing', 'auto']
        },
        edge_side_panel: {
          preferred_width: 480
        },
        screenshots: [
          {
            src: 'data:image/svg+xml;base64,' + safeBtoa(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 812" fill="#f8fafc">
                <rect width="375" height="812" fill="#f8fafc"/>
                <rect x="0" y="0" width="375" height="100" fill="#030213"/>
                <text x="187.5" y="55" text-anchor="middle" font-family="system-ui" font-size="18" font-weight="bold" fill="white">Kaniro Financial</text>
                <rect x="20" y="120" width="335" height="120" rx="16" fill="white"/>
                <text x="40" y="150" font-family="system-ui" font-size="16" font-weight="bold" fill="#030213">OneDabba Services</text>
                <rect x="40" y="170" width="295" height="60" rx="12" fill="#059669" opacity="0.1"/>
                <text x="60" y="195" font-family="system-ui" font-size="14" font-weight="bold" fill="#059669">Dabba Save</text>
                <text x="60" y="215" font-family="system-ui" font-size="12" fill="#6b7280">Daily micro-deposits from Rs 10</text>
              </svg>
            `),
            sizes: '375x812',
            type: 'image/svg+xml',
            form_factor: 'narrow',
            label: 'Kaniro Dashboard on Mobile'
          }
        ]
      };

      // Add manifest link
      const manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = 'data:application/json;base64,' + safeBtoa(JSON.stringify(manifest));
      manifestLink.setAttribute('data-pwa-meta', 'true');
      head.appendChild(manifestLink);

      // Add apple touch icons
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.href = 'data:image/svg+xml;base64,' + safeBtoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" fill="#030213">
          <rect width="180" height="180" rx="45" fill="#f8fafc"/>
          <circle cx="90" cy="64" r="20" fill="#059669"/>
          <rect x="70" y="92" width="40" height="26" rx="8" fill="#3b82f6"/>
          <path d="M57 130 Q57 124 63 124 L117 124 Q123 124 123 130 L123 144 Q123 150 117 150 L63 150 Q57 150 57 144 Z" fill="#8b5cf6"/>
        </svg>
      `);
      appleTouchIcon.setAttribute('data-pwa-meta', 'true');
      head.appendChild(appleTouchIcon);

      // Add favicon
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/svg+xml';
      favicon.href = 'data:image/svg+xml;base64,' + safeBtoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#030213">
          <rect width="32" height="32" rx="8" fill="#f8fafc"/>
          <circle cx="16" cy="12" r="4" fill="#059669"/>
          <rect x="12" y="18" width="8" height="5" rx="2" fill="#3b82f6"/>
          <path d="M9 26 Q9 24 11 24 L21 24 Q23 24 23 26 L23 28 Q23 30 21 30 L11 30 Q9 30 9 28 Z" fill="#8b5cf6"/>
        </svg>
      `);
      favicon.setAttribute('data-pwa-meta', 'true');
      head.appendChild(favicon);
    };

    // Register service worker for offline functionality
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        // Create service worker content
        const swContent = `
          const CACHE_NAME = 'kaniro-v1';
          const urlsToCache = [
            '/',
            '/static/js/bundle.js',
            '/static/css/main.css'
          ];

          self.addEventListener('install', (event) => {
            event.waitUntil(
              caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.addAll(urlsToCache);
                })
            );
          });

          self.addEventListener('fetch', (event) => {
            event.respondWith(
              caches.match(event.request)
                .then((response) => {
                  if (response) {
                    return response;
                  }
                  return fetch(event.request);
                }
              )
            );
          });

          self.addEventListener('activate', (event) => {
            event.waitUntil(
              caches.keys().then((cacheNames) => {
                return Promise.all(
                  cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                      return caches.delete(cacheName);
                    }
                  })
                );
              })
            );
          });
        `;

        // Register service worker using blob URL
        const swBlob = new Blob([swContent], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(swBlob);

        navigator.serviceWorker.register(swUrl)
          .then((registration) => {
            console.log('Service Worker registered successfully:', registration.scope);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      }
    };

    // Add PWA features
    addPWAMeta();
    registerServiceWorker();
    
    // Initialize PWA utilities
    initializePWA();

    // Handle app install banner
    let deferredPrompt: any;
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Handle app installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      deferredPrompt = null;
    });

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Check if app is running in standalone mode
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');
    
    if (isStandalone) {
      // Add styles for standalone mode
      document.body.classList.add('pwa-standalone');
      
      // Prevent zoom on double tap
      let lastTouchEnd = 0;
      document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);

      // Add status bar height for iOS
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.documentElement.style.setProperty('--status-bar-height', '44px');
      }
    }
  }, []);

  return null;
};