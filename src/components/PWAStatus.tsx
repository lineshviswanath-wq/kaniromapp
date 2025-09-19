import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Smartphone, Wifi, WifiOff, Download } from 'lucide-react';

export const PWAStatus: React.FC = () => {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPromptAvailable, setInstallPromptAvailable] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (installed as PWA)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                     (window.navigator as any).standalone ||
                     document.referrer.includes('android-app://');
    setIsStandalone(standalone);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for install prompt availability
    const handleBeforeInstallPrompt = () => {
      setInstallPromptAvailable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Don't show status if not relevant
  if (!isStandalone && !installPromptAvailable && isOnline) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* PWA Installed Status */}
      {isStandalone && (
        <Badge className="bg-green-100 text-green-800 border-green-300 shadow-sm">
          <Smartphone className="h-3 w-3 mr-1" />
          App Mode
        </Badge>
      )}

      {/* Network Status */}
      {!isOnline && (
        <Badge className="bg-orange-100 text-orange-800 border-orange-300 shadow-sm">
          <WifiOff className="h-3 w-3 mr-1" />
          Offline
        </Badge>
      )}

      {/* Install Available */}
      {installPromptAvailable && !isStandalone && (
        <Badge className="bg-blue-100 text-blue-800 border-blue-300 shadow-sm animate-pulse">
          <Download className="h-3 w-3 mr-1" />
          Install Available
        </Badge>
      )}
    </div>
  );
};