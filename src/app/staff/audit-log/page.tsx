'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, History, Search, Download, Shield } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_AUDIT_LOG,
  AUDIT_ACTION_LABEL,
  DEMO_STAFF_USERS,
  type AuditAction,
} from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [operatorFilter, setOperatorFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<AuditAction | 'all'>('all');

  const operators = DEMO_STAFF_USERS;

  const filtered = useMemo(() => {
    return DEMO_AUDIT_LOG.filter((a) => {
      if (operatorFilter !== 'all' && a.operator_id !== operatorFilter) return false;
      if (actionFilter !== 'all' && a.action !== actionFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          a.target_label.toLowerCase().includes(q) ||
          a.target_id.toLowerCase().includes(q) ||
          (a.detail ?? '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, operatorFilter, actionFilter]);

  const counts = {
    today: DEMO_AUDIT_LOG.filter((a) => isToday(a.occurred_at)).length,
    this_week: DEMO_AUDIT_LOG.filter((a) => isThisWeek(a.occurred_at)).length,
    refunds: DEMO_AUDIT_LOG.filter((a) => a.action === 'refund_issued' || a.action === 'cancellation_approve').length,
    suspensions: DEMO_AUDIT_LOG.filter((a) => a.action === 'member_suspended').length,
  };

  const actionTypes = Array.from(new Set(DEMO_AUDIT_LOG.map((a) => a.action))) as AuditAction[];

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">操作ログ（監査）</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `audit_log_${todayStamp()}.csv`,
                  filtered.map((a) => ({
                    id: a.id,
                    occurred_at: a.occurred_at,
                    operator_name: a.operator_name,
                    action: AUDIT_ACTION_LABEL[a.action],
                    target_label: a.target_label,
                    detail: a.detail ?? '',
                    ip_address: a.ip_address,
                  })),
                  [
                    { key: 'id', label: 'ログID' },
                    { key: 'occurred_at', label: '発生日時' },
                    { key: 'operator_name', label: 'スタッフ' },
                    { key: 'action', label: 'アクション' },
                    { key: 'target_label', label: '対象' },
                    { key: 'detail', label: '詳細' },
                    { key: 'ip_address', label: 'IPアドレス' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">スタッフの全操作記録・監査用・7年保管</p>

          <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="今日の操作" value={`${counts.today}件`} />
            <Stat label="今週の操作" value={`${counts.this_week}件`} />
            <Stat label="返金・解約承認" value={`${counts.refunds}件`} />
            <Stat label="会員停止" value={`${counts.suspensions}件`} alert={counts.suspensions > 0} />
          </section>

          <div className="mb-4 flex flex-wrap gap-2">
            <select
              value={operatorFilter}
              onChange={(e) => setOperatorFilter(e.target.value)}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-[11px]"
            >
              <option value="all">全スタッフ</option>
              {operators.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value as AuditAction | 'all')}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-[11px]"
            >
              <option value="all">全アクション</option>
              {actionTypes.map((a) => (
                <option key={a} value={a}>{AUDIT_ACTION_LABEL[a]}</option>
              ))}
            </select>
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="対象名・ID・詳細で検索"
              className="w-full rounded-2xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <ul className="flex flex-col gap-2">
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                該当する操作ログはありません
              </p>
            )}
            {filtered.map((a) => {
              const isCritical = a.action === 'member_suspended' || a.action === 'refund_issued' || a.action === 'cancellation_approve' || a.action === 'role_changed';
              return (
                <li key={a.id} className={cn(
                  'rounded-2xl border p-4',
                  isCritical ? 'border-warn/40 bg-warn-50/30' : 'border-border bg-card'
                )}>
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    {isCritical ? (
                      <Shield className="h-3 w-3 text-warn" strokeWidth={1.8} aria-hidden />
                    ) : (
                      <History className="h-3 w-3 text-muted-foreground" strokeWidth={1.8} aria-hidden />
                    )}
                    <Badge variant="outline" className={cn('text-[10px]', isCritical && 'border-warn text-warn')}>
                      {AUDIT_ACTION_LABEL[a.action]}
                    </Badge>
                    <span className="text-sm font-medium">{a.target_label}</span>
                    <span className="font-mont text-[9px] text-muted-foreground">{a.target_id}</span>
                    <span className="ml-auto font-mont text-[10px] text-muted-foreground">{formatDateTime(a.occurred_at)}</span>
                  </div>
                  {a.detail && <p className="mb-2 text-[11px] leading-relaxed">{a.detail}</p>}
                  <div className="flex items-baseline gap-3 text-[10px] text-muted-foreground">
                    <span>by <span className="font-medium text-foreground">{a.operator_name}</span></span>
                    <span className="font-mont">IP: {a.ip_address}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}

function Stat({ label, value, alert }: { label: string; value: string; alert?: boolean }) {
  return (
    <div className={cn('rounded-2xl border p-4', alert ? 'border-warn bg-warn-50' : 'border-border bg-card')}>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-mont text-xl font-medium">{value}</p>
    </div>
  );
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

function isThisWeek(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}
