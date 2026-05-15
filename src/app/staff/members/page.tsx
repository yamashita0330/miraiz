'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, User as UserIcon, Download, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEMO_APPLICATIONS, PLAN_LABEL, APPLICATION_STATUS_LABEL, type MembershipApplication } from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

type PlanFilter = 'all' | 'ume' | 'take' | 'matsu';

export default function MembersPage() {
  const [planFilter, setPlanFilter] = useState<PlanFilter>('all');
  const [search, setSearch] = useState('');

  // 全申込（アクティブ会員＋過去会員）から表示
  const members = DEMO_APPLICATIONS;

  const filtered = members.filter((m) => {
    if (planFilter !== 'all' && m.plan !== planFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return m.user_name.toLowerCase().includes(q) || m.user_email.toLowerCase().includes(q);
    }
    return true;
  });

  const counts = {
    all: members.length,
    ume: members.filter((m) => m.plan === 'ume').length,
    take: members.filter((m) => m.plan === 'take').length,
    matsu: members.filter((m) => m.plan === 'matsu').length,
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">会員管理</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `members_${todayStamp()}.csv`,
                  filtered.map((m) => ({
                    id: m.id,
                    user_name: m.user_name,
                    user_email: m.user_email,
                    user_phone: m.user_phone,
                    plan: PLAN_LABEL[m.plan],
                    amount: m.amount,
                    status: APPLICATION_STATUS_LABEL[m.status],
                    applied_at: m.applied_at,
                    activated_at: m.activated_at ?? '',
                    notes: m.notes ?? '',
                  })),
                  [
                    { key: 'id', label: '申込ID' },
                    { key: 'user_name', label: '氏名' },
                    { key: 'user_email', label: 'メール' },
                    { key: 'user_phone', label: '電話' },
                    { key: 'plan', label: 'プラン' },
                    { key: 'amount', label: '金額' },
                    { key: 'status', label: 'ステータス' },
                    { key: 'applied_at', label: '申込日時' },
                    { key: 'activated_at', label: '開始日時' },
                    { key: 'notes', label: 'メモ' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">プラン別の会員一覧・契約状況・行動履歴</p>

          {/* プラン別カウント */}
          <section className="mb-6 grid grid-cols-4 gap-3">
            <CountCard label="全会員" value={counts.all} active={planFilter === 'all'} onClick={() => setPlanFilter('all')} />
            <CountCard label="🌸 梅" value={counts.ume} active={planFilter === 'ume'} onClick={() => setPlanFilter('ume')} />
            <CountCard label="🎍 竹" value={counts.take} active={planFilter === 'take'} onClick={() => setPlanFilter('take')} />
            <CountCard label="🌲 松" value={counts.matsu} active={planFilter === 'matsu'} onClick={() => setPlanFilter('matsu')} highlight />
          </section>

          {/* 検索 */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="名前・メールで検索"
              className="w-full rounded-2xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* 会員一覧 */}
          <ul className="overflow-hidden rounded-2xl border border-border bg-card">
            {filtered.map((m, i) => (
              <li key={m.id} className={cn(i !== filtered.length - 1 && 'border-b border-border')}>
                <Link
                  href={`/staff/members/${m.id}`}
                  className="flex items-center gap-2 p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <MemberRow member={m} />
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-6 py-12 text-center text-xs text-muted-foreground">該当する会員はいません</li>
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

function CountCard({ label, value, active, onClick, highlight }: { label: string; value: number; active: boolean; onClick: () => void; highlight?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-2xl border-2 p-4 text-left transition-colors',
        active
          ? highlight ? 'border-rose bg-rose-50' : 'border-foreground bg-foreground text-background'
          : 'border-border bg-card hover:bg-muted/30'
      )}
    >
      <p className={cn('text-[10px]', active && !highlight ? 'opacity-70' : 'text-muted-foreground')}>{label}</p>
      <p className="mt-1 font-mont text-2xl font-medium">{value}</p>
    </button>
  );
}

function MemberRow({ member }: { member: MembershipApplication }) {
  return (
    <div className="flex items-baseline gap-4">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
        <UserIcon className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-sm font-medium truncate">{member.user_name}</span>
          <Badge variant={member.plan === 'matsu' ? 'rose' : 'outline'} className="text-[10px]">{PLAN_LABEL[member.plan]}</Badge>
        </div>
        <p className="text-[10px] text-muted-foreground truncate">{member.user_email}</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2 text-[10px]">
          <span className={cn(
            member.status === 'active' ? 'text-success' :
            member.status === 'cooling_off' ? 'text-rose' :
            member.status === 'cancelled' ? 'text-muted-foreground' :
            'text-warn'
          )}>
            {APPLICATION_STATUS_LABEL[member.status]}
          </span>
          <span className="text-muted-foreground">・申込 {formatDate(member.applied_at)}</span>
          {member.activated_at && <span className="text-muted-foreground">・開始 {formatDate(member.activated_at)}</span>}
        </div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
