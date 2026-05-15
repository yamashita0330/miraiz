'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Camera, Keyboard, Loader2, ScanLine } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { parsePartnerQr, findDemoPartner } from '@/lib/demo';

function ScanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryToken = searchParams.get('t');

  const [mode, setMode] = useState<'camera' | 'manual'>('camera');
  const [manualToken, setManualToken] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);

  // クエリパラメータでトークンが来た場合は即時遷移
  useEffect(() => {
    if (queryToken) {
      const partnerId = parsePartnerQr(queryToken);
      if (partnerId && findDemoPartner(partnerId)) {
        router.replace(`/scan/result/${partnerId}`);
      } else {
        setError('無効なQRコードです');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // カメラ起動
  useEffect(() => {
    if (mode !== 'camera' || queryToken) return;

    let stopped = false;
    const reader = new BrowserMultiFormatReader();
    setScanning(true);
    setError('');

    (async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const deviceId =
          devices.find((d) => /back|rear|environment/i.test(d.label))?.deviceId ??
          devices[0]?.deviceId;

        if (!deviceId) {
          setError('カメラが見つかりません');
          setScanning(false);
          return;
        }

        const controls = await reader.decodeFromVideoDevice(
          deviceId,
          videoRef.current!,
          (result) => {
            if (stopped) return;
            if (result) {
              const text = result.getText();
              const partnerId = parsePartnerQr(text);
              if (partnerId && findDemoPartner(partnerId)) {
                stopped = true;
                controls.stop();
                router.push(`/scan/result/${partnerId}`);
              }
            }
          }
        );
        controlsRef.current = controls;
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'カメラの起動に失敗しました';
        setError(msg);
        setScanning(false);
      }
    })();

    return () => {
      stopped = true;
      controlsRef.current?.stop();
      setScanning(false);
    };
  }, [mode, queryToken, router]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const partnerId = parsePartnerQr(manualToken.trim());
    if (!partnerId || !findDemoPartner(partnerId)) {
      setError('無効なコードです。レジに掲示されているQRをご確認ください。');
      return;
    }
    router.push(`/scan/result/${partnerId}`);
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-xl px-6 py-8">
        <header className="flex items-center gap-3">
          <Link
            href="/partners"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="戻る"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Link>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              QR Scan
            </span>
            <h1 className="text-base font-semibold tracking-tight">来店QRをスキャン</h1>
          </div>
        </header>

        {/* モード切替 */}
        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => setMode('camera')}
            className={`flex-1 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
              mode === 'camera'
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-background text-muted-foreground'
            }`}
          >
            <Camera className="mr-1 inline h-3 w-3" aria-hidden /> カメラ
          </button>
          <button
            type="button"
            onClick={() => setMode('manual')}
            className={`flex-1 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
              mode === 'manual'
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-background text-muted-foreground'
            }`}
          >
            <Keyboard className="mr-1 inline h-3 w-3" aria-hidden /> 手入力
          </button>
        </div>

        {mode === 'camera' && (
          <div className="mt-6 flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-black">
              <video
                ref={videoRef}
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                aria-label="QRスキャナーの映像"
              />
              {scanning && !error && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative h-3/5 w-3/5 rounded-2xl border-2 border-white/80">
                    <ScanLine className="absolute inset-0 m-auto h-12 w-12 text-white/80" strokeWidth={1.4} aria-hidden />
                  </div>
                </div>
              )}
              {!scanning && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/60">
                  <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
                  <p className="text-xs">カメラを起動中…</p>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-white/90">
                  <p className="text-sm font-medium">カメラを利用できません</p>
                  <p className="text-xs leading-relaxed opacity-80">{error}</p>
                  <button
                    type="button"
                    onClick={() => setMode('manual')}
                    className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-medium text-foreground"
                  >
                    手入力に切り替える
                  </button>
                </div>
              )}
            </div>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              レジ横に掲示されているQRコードを枠内に収めてください。
            </p>
          </div>
        )}

        {mode === 'manual' && (
          <form onSubmit={handleManualSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="token">
                コードを入力
              </label>
              <Input
                id="token"
                type="text"
                placeholder="KOIFES-VISIT-XXX"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                className="font-mont"
              />
              <p className="text-[10px] text-muted-foreground">
                例：KOIFES-VISIT-P-BII
              </p>
            </div>
            {error && (
              <div role="alert" className="rounded-lg border border-border bg-muted px-4 py-3 text-sm">
                {error}
              </div>
            )}
            <Button type="submit" size="lg" fullWidth>
              来店を記録する
            </Button>
          </form>
        )}

        <section className="mt-12 rounded-2xl border border-rose-100 bg-rose-50 p-6">
          <p className="text-xs font-medium text-rose">スキャンしないと損をします</p>
          <ul className="mt-3 flex flex-col gap-2 text-[11px] leading-relaxed">
            <li className="flex items-baseline gap-2">
              <span className="text-rose">①</span>
              <span><span className="font-medium">会員価格が適用される</span>（最大50%OFF）</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-rose">②</span>
              <span><span className="font-medium">来店金額の5%をキャッシュバック</span>（次回提携サロンで利用可）</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-rose">③</span>
              <span><span className="font-medium">通知表スコアが自動アップ</span>＋スタンプ進行</span>
            </li>
          </ul>
          <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
            ※ スキャン画面を会計時にスタッフに提示してください。
            あなたの個人情報は店舗に共有されません。
          </p>
        </section>
      </div>
    </main>
  );
}

export default function ScanPage() {
  return (
    <>
      <Header showLogout />
      <Suspense fallback={<div className="p-12 text-center text-sm text-muted-foreground">読み込み中…</div>}>
        <ScanContent />
      </Suspense>
      <BottomNav />
    </>
  );
}
