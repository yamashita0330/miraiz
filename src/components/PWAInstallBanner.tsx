'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'pwa-banner-dismissed';

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    // すでにPWAとして起動している場合は非表示
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // iOS判定（Androidと違いbeforeinstallpromptが発火しないため手動案内）
    const ua = window.navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    if (ios) {
      setIsIOS(true);
      setVisible(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      localStorage.setItem(DISMISS_KEY, '1');
    }
    setVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium">ホーム画面に追加</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {isIOS
              ? '共有ボタンから「ホーム画面に追加」をタップ'
              : 'アプリとして使うと便利です'}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {!isIOS && (
            <button
              onClick={handleInstall}
              className="h-9 rounded-full bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              追加
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="h-9 text-xs text-muted-foreground transition-colors hover:text-foreground"
            aria-label="バナーを閉じる"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
