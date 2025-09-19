import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, Download, Smartphone, Home } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
    
    // Check if app is already installed (running in standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                     (window.navigator as any).standalone ||
                     document.referrer.includes('android-app://');
    setIsStandalone(standalone);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show manual install instructions
    if (iOS && !standalone) {
      // Show iOS install prompt after a delay
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store in localStorage to not show again for a while
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show if already installed or recently dismissed
  if (isStandalone || !showInstallPrompt) {
    return null;
  }

  // Check if recently dismissed (within 7 days)
  const lastDismissed = localStorage.getItem('pwa-install-dismissed');
  if (lastDismissed && Date.now() - parseInt(lastDismissed) < 7 * 24 * 60 * 60 * 1000) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Download className="h-5 w-5" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">Install Kaniro App</h3>
              {isIOS ? (
                <div className="space-y-2">
                  <p className="text-xs opacity-90">Add to your home screen for the best experience:</p>
                  <div className="text-xs space-y-1 opacity-80">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-xs">1</span>
                      </div>
                      <span>Tap the Share button</span>
                      <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-xs">⬆</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-xs">2</span>
                      </div>
                      <span>Select "Add to Home Screen"</span>
                      <Home className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs opacity-90 mb-3">Get the native app experience with offline access and push notifications.</p>
              )}
              
              <div className="flex items-center space-x-2 mt-3">
                {!isIOS && deferredPrompt && (
                  <Button
                    size="sm"
                    onClick={handleInstallClick}
                    className="bg-white text-blue-600 hover:bg-gray-100 flex-1"
                  >
                    <Smartphone className="h-3 w-3 mr-1" />
                    Install Now
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="text-white hover:bg-white/20 px-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};