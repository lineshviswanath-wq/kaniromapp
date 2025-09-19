// PWA Utility Functions

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

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Check if the app is running in standalone mode (installed as PWA)
export const isStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone ||
         document.referrer.includes('android-app://');
};

// Check if the device is iOS
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Check if the device is Android
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent);
};

// Check if PWA install is supported
export const isPWAInstallSupported = (): boolean => {
  return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
};

// Get device type for PWA optimization
export const getDeviceType = (): 'desktop' | 'tablet' | 'mobile' => {
  const width = window.innerWidth;
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
};

// Check if user has dismissed install prompt recently
export const isInstallPromptRecentlyDismissed = (days: number = 7): boolean => {
  const dismissedTime = localStorage.getItem('pwa-install-dismissed');
  if (!dismissedTime) return false;
  
  const dismissedDate = new Date(parseInt(dismissedTime));
  const currentDate = new Date();
  const diffInDays = (currentDate.getTime() - dismissedDate.getTime()) / (1000 * 3600 * 24);
  
  return diffInDays < days;
};

// Track PWA installation
export const trackPWAInstall = (): void => {
  localStorage.setItem('pwa-installed', Date.now().toString());
  
  // Analytics tracking (can be enhanced with your analytics provider)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install', {
      event_category: 'PWA',
      event_label: 'App Installed'
    });
  }
  
  console.log('PWA Installation tracked');
};

// Track PWA usage
export const trackPWAUsage = (): void => {
  if (isStandalone()) {
    localStorage.setItem('pwa-last-used', Date.now().toString());
    
    // Track session in standalone mode
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_usage', {
        event_category: 'PWA',
        event_label: 'Standalone Mode Usage'
      });
    }
  }
};

// Get PWA installation stats
export const getPWAStats = () => {
  const installTime = localStorage.getItem('pwa-installed');
  const lastUsed = localStorage.getItem('pwa-last-used');
  const dismissedTime = localStorage.getItem('pwa-install-dismissed');
  
  return {
    isInstalled: !!installTime,
    installDate: installTime ? new Date(parseInt(installTime)) : null,
    lastUsed: lastUsed ? new Date(parseInt(lastUsed)) : null,
    lastDismissed: dismissedTime ? new Date(parseInt(dismissedTime)) : null,
    isStandalone: isStandalone(),
    deviceType: getDeviceType(),
    isIOS: isIOS(),
    isAndroid: isAndroid()
  };
};

// Configure PWA for optimal performance
export const optimizePWAPerformance = (): void => {
  // Preload critical resources
  const preloadResources = [
    '/static/css/main.css',
    '/static/js/bundle.js'
  ];
  
  preloadResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
  
  // Enable hardware acceleration for animations
  document.documentElement.style.transform = 'translateZ(0)';
  
  // Optimize scrolling performance
  document.documentElement.style.overscrollBehavior = 'none';
  document.documentElement.style.touchAction = 'pan-y';
};

// Handle PWA navigation
export const setupPWANavigation = (): void => {
  // Handle back button in standalone mode
  if (isStandalone()) {
    window.addEventListener('popstate', (event) => {
      // Custom back button handling for PWA
      if (window.history.length === 1) {
        // If no more history, stay in app
        event.preventDefault();
        window.history.pushState(null, '', window.location.href);
      }
    });
    
    // Push initial state to prevent accidental exit
    window.history.pushState(null, '', window.location.href);
  }
};

// Setup PWA offline handling
export const setupOfflineHandling = (): void => {
  const showOfflineIndicator = () => {
    // Show offline toast or banner
    console.log('App is offline - showing cached content');
  };
  
  const hideOfflineIndicator = () => {
    // Hide offline indicator
    console.log('App is back online');
  };
  
  window.addEventListener('online', hideOfflineIndicator);
  window.addEventListener('offline', showOfflineIndicator);
  
  // Initial check
  if (!navigator.onLine) {
    showOfflineIndicator();
  }
};

// PWA Splash Screen with iOS Fix
export const setupSplashScreen = (): void => {
  if (isStandalone()) {
    // Create splash screen element
    const splash = document.createElement('div');
    splash.id = 'pwa-splash';
    splash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #030213 0%, #1e40af 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      color: white;
      font-family: system-ui, -apple-system, sans-serif;
    `;
    
    splash.innerHTML = `
      <div style="text-align: center;">
        <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; color: #10b981;">K</div>
        <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: bold;">Kaniro Financial</h1>
        <p style="margin: 0; opacity: 0.8; font-size: 14px;">Loading your financial dashboard...</p>
        <div style="margin-top: 30px; width: 40px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; overflow: hidden;">
          <div style="width: 100%; height: 100%; background: #10b981; border-radius: 2px; animation: loading 1.5s ease-in-out infinite;"></div>
        </div>
      </div>
      <style>
        @keyframes loading {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
        }
      </style>
    `;
    
    document.body.appendChild(splash);
    
    // Multiple removal strategies for iOS PWA reliability
    const removeSplash = () => {
      const splashElement = document.getElementById('pwa-splash');
      if (splashElement) {
        splashElement.style.opacity = '0';
        splashElement.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => {
          if (splashElement.parentNode) {
            splashElement.parentNode.removeChild(splashElement);
          }
        }, 300);
      }
    };

    // Strategy 1: Standard load event
    window.addEventListener('load', () => {
      setTimeout(removeSplash, 800);
    });

    // Strategy 2: DOM ready fallback
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(removeSplash, 1000);
      });
    } else {
      // DOM already ready
      setTimeout(removeSplash, 1200);
    }

    // Strategy 3: React component mount detection
    const checkForReactMount = () => {
      const reactRoot = document.querySelector('#root > div');
      if (reactRoot) {
        setTimeout(removeSplash, 500);
        return;
      }
      setTimeout(checkForReactMount, 100);
    };
    setTimeout(checkForReactMount, 500);

    // Strategy 4: Maximum timeout failsafe (iOS PWA can be slow)
    setTimeout(() => {
      console.log('PWA: Failsafe splash removal after 3 seconds');
      removeSplash();
    }, 3000);

    // Strategy 5: User interaction fallback
    const interactionRemoval = () => {
      setTimeout(removeSplash, 200);
      document.removeEventListener('touchstart', interactionRemoval);
      document.removeEventListener('click', interactionRemoval);
    };
    document.addEventListener('touchstart', interactionRemoval, { once: true });
    document.addEventListener('click', interactionRemoval, { once: true });
  }
};

// Initialize all PWA features
export const initializePWA = (): void => {
  optimizePWAPerformance();
  setupPWANavigation();
  setupOfflineHandling();
  
  // Only show splash screen if not in debug mode
  const isDebugMode = window.location.search.includes('debug') || window.location.hostname === 'localhost';
  if (!isDebugMode) {
    setupSplashScreen();
  }
  
  trackPWAUsage();
  
  console.log('PWA initialized with all features' + (isDebugMode ? ' (splash screen disabled for debug)' : ''));
};