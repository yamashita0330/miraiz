'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, X, AlertTriangle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DEMO_CANCELLATIONS, CANCELLATION_REASON_LABEL, PLAN_LABEL, type CancellationRequest } from '@/lib/demo';

export default function CancellationsPage() {
  const [requests, setRequests] = useState<CancellationRequest[]>(DEMO_CANCELLATIONS);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  const filtered = requests.filter((r) => (filter === 'pending' ? r.status === 'pending' : true));

  const approve = (id: string) => {
    if (!confirm('この申請を承認し、返金処理を実施しますか？')) return;
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved' as const } : r)));
  };

  const reject = (id: string) => {
    if (!confirm('この申請を拒否しますか？')) return;
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'rejected' as const } : r)));
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">解約・クーリングオフ管理</h1>
          <p className="mb-8 text-xs text-muted-foreground">特商法準拠の中途解約・返金処理</p>

          <div className="mb-6 flex gap-2">
            <Chip label="未対応のみ" active={filter === 'pending'} onClick={() => setFilter('pending')} />
            <Chip label="全て" active={filter === 'all'} onClick={() => setFilter('all')} />
          </div>

          <ul className="flex flex-col gap-3">
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                該当する申請はありません
              </p>
            )}
            {filtered.map((r) => (
              <li key={r.id} className={cn('rounded-2xl border-2 p-5', r.is_cooling_off && r.status === 'pending' ? 'border-warn bg-warn-50' : 'border-border bg-card')}>
                <div className="mb-3 flex flex-wrap items-baseline gap-3">
                  <span className="font-mont text-[10px] text-muted-foreground">{r.id}</span>
                  <span className="text-sm font-semibold">{r.user_name}</span>
                  <Badge variant={r.plan === 'matsu' ? 'rose' : 'outline'} className="text-[10px]">{PLAN_LABEL[r.plan]}</Badge>
                  {r.is_cooling_off && (
                    <Badge variant="outline" className="text-[10px] text-warn border-warn gap-1">
                      <AlertTriangle className="h-2.5 w-2.5" aria-hidden />クーリングオフ
                    </Badge>
                  )}
                  <Badge variant="outline" className={cn('text-[10px]', r.status === 'pending' ? 'text-warn' : r.status === 'approved' ? 'text-success' : 'text-muted-foreground')}>
                    {r.status === 'pending' ? '未対応' : r.status === 'approved' ? '承認済' : '拒否'}
                  </Badge>
                </div>

                <div className="mb-3 flex items-baseline gap-4 text-[11px]">
                  <span className="text-muted-foreground">理由：</span>
                  <span className="font-medium">{CANCELLATION_REASON_LABEL[r.reason]}</span>
                </div>

                {r.detail && (
                  <p className="mb-3 rounded-lg border border-border bg-background px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
                    {r.detail}
                  </p>
                )}

                <div className="mb-3 grid grid-cols-2 gap-2 rounded-lg bg-muted/30 px-3 py-2 text-[10px]">
                  <div><p className="text-muted-foreground">契約金額</p><p className="font-mont mt-0.5">¥{r.contract_amount.toLocaleString()}</p></div>
                  <div><p className="text-muted-foreground">返金額</p><p className="font-mont mt-0.5 text-rose">¥{r.refund_amount.toLocaleString()}</p></div>
                </div>

                <p className="mb-3 text-[10px] text-muted-foreground">申請日時：{formatDateTime(r.applied_at)}</p>

                {r.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => approve(r.id)} className="gap-1">
                      <Check className="h-3 w-3" aria-hidden />
                      承認・返金処理
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => reject(r.id)} className="gap-1">
                      <X className="h-3 w-3" aria-hidden />
                      拒否
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn('rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors', active ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:bg-muted')}>
      {label}
    </button>
  );
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}
