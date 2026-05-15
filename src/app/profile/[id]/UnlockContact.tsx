'use client';

import { useState } from 'react';
import { Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  targetName: string;
  targetId: string;
}

const COST_YEN = 500;

export function UnlockContact({ targetName, targetId }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [confirming, setConfirming] = useState(false);

  if (unlocked) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 p-8 text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {targetName}さんの連絡先
        </p>
        <p className="mt-3 font-mont text-lg font-medium tracking-tight">
          @koifes_{targetId.replace(/[^a-z0-9]/g, '').slice(-6)}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          LINE ID をコピーして連絡してください
        </p>
      </div>
    );
  }

  if (confirming) {
    return (
      <div className="rounded-2xl border border-border p-8">
        <p className="text-center text-sm font-medium">連絡先を解放しますか？</p>
        <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
          <span className="text-sm">お支払い</span>
          <span className="font-mont text-sm font-medium">¥{COST_YEN.toLocaleString()}</span>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Button fullWidth size="lg" onClick={() => setUnlocked(true)}>
            ¥{COST_YEN.toLocaleString()} で解放
          </Button>
          <Button fullWidth size="lg" variant="ghost" onClick={() => setConfirming(false)}>
            キャンセル
          </Button>
        </div>
        <p className="mt-4 text-center text-[10px] text-muted-foreground">
          ※ 両者がプレミアム会員の場合は無料で解放されます
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium">両想いになりました</p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        連絡先を解放するとLINEで直接やりとりできます。
      </p>
      <Button fullWidth size="lg" onClick={() => setConfirming(true)} className="gap-2">
        <Unlock className="h-4 w-4" aria-hidden />
        連絡先を見る（¥{COST_YEN.toLocaleString()}）
      </Button>
    </div>
  );
}
