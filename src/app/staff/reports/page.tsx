'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert, Check, X, Eye } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DEMO_REPORTS, REPORT_REASON_LABEL, REPORT_STATUS_LABEL } from '@/lib/demo';
import type { Report } from '@/lib/types';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(DEMO_REPORTS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewing' | 'resolved' | 'dismissed'>('pending');

  const filtered = reports.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return r.status === 'pending' || r.status === 'reviewing';
    return r.status === filter;
  });

  const updateStatus = (id: string, status: Report['status']) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">通報管理</h1>
          <p className="mb-8 text-xs text-muted-foreground">ユーザー通報・違反確認・退会処理</p>

          <div className="mb-6 flex flex-wrap gap-2">
            <Chip label="未対応" active={filter === 'pending'} onClick={() => setFilter('pending')} />
            <Chip label="対応済" active={filter === 'resolved'} onClick={() => setFilter('resolved')} />
            <Chip label="却下" active={filter === 'dismissed'} onClick={() => setFilter('dismissed')} />
            <Chip label="全て" active={filter === 'all'} onClick={() => setFilter('all')} />
          </div>

          <ul className="flex flex-col gap-3">
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                該当する通報はありません
              </p>
            )}
            {filtered.map((r) => {
              const isUrgent = r.status === 'pending' || r.status === 'reviewing';
              return (
                <li key={r.id} className={cn('rounded-2xl border p-5', isUrgent ? 'border-warn bg-warn-50' : 'border-border bg-card')}>
                  <div className="mb-3 flex flex-wrap items-baseline gap-3">
                    <ShieldAlert className={cn('h-3.5 w-3.5', isUrgent ? 'text-warn' : 'text-muted-foreground')} strokeWidth={1.6} aria-hidden />
                    <span className="font-mont text-[10px] text-muted-foreground">{r.id}</span>
                    <Badge variant="outline" className="text-[10px]">{REPORT_REASON_LABEL[r.reason]}</Badge>
                    <Badge variant="outline" className={cn('text-[10px]',
                      r.status === 'pending' || r.status === 'reviewing' ? 'text-warn border-warn' :
                      r.status === 'resolved' ? 'text-success border-success' :
                      'text-muted-foreground'
                    )}>
                      {REPORT_STATUS_LABEL[r.status]}
                    </Badge>
                    <span className="ml-auto text-[10px] text-muted-foreground">{formatDateTime(r.created_at)}</span>
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <p className="text-muted-foreground text-[10px]">通報者</p>
                      <p className="font-mont mt-0.5">{r.from_user_id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px]">対象</p>
                      <p className="font-mont mt-0.5">{r.to_user_id}</p>
                    </div>
                  </div>

                  {r.detail && (
                    <p className="mb-3 rounded-lg border border-border bg-background px-3 py-2 text-[11px] leading-relaxed">
                      {r.detail}
                    </p>
                  )}

                  {isUrgent && (
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => updateStatus(r.id, 'resolved')} className="gap-1">
                        <Check className="h-3 w-3" aria-hidden />
                        違反確認・退会処理
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, 'reviewing')} className="gap-1">
                        <Eye className="h-3 w-3" aria-hidden />
                        確認中にする
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => updateStatus(r.id, 'dismissed')} className="gap-1">
                        <X className="h-3 w-3" aria-hidden />
                        却下
                      </Button>
                    </div>
                  )}
                </li>
              );
            })}
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
