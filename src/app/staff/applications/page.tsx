'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Phone,
  Loader2,
  Building2,
  Download,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DEMO_APPLICATIONS,
  PLAN_LABEL,
  APPLICATION_STATUS_LABEL,
  ACQUISITION_SOURCE_LABEL,
  type MembershipApplication,
  type ApplicationStatus,
  type AcquisitionSource,
} from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

type FilterStatus = 'all' | ApplicationStatus;

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<MembershipApplication[]>(DEMO_APPLICATIONS);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | AcquisitionSource>('all');
  const [search, setSearch] = useState('');
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);

  const filtered = applications.filter((a) => {
    if (filter !== 'all' && a.status !== filter) return false;
    if (sourceFilter !== 'all' && a.acquisition_source !== sourceFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        a.user_name.toLowerCase().includes(q) ||
        a.user_email.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const availableSources = Array.from(new Set(applications.map((a) => a.acquisition_source))) as AcquisitionSource[];

  const handleActivate = (id: string) => {
    setActivatingId(id);
    setTimeout(() => {
      setApplications((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                status: 'active' as ApplicationStatus,
                activated_at: new Date().toISOString(),
              }
            : a
        )
      );
      setActivatingId(null);
      alert(`${id} をアクティベートしました（メール通知送信済）`);
    }, 1200);
  };

  const handleReject = (id: string) => {
    if (!confirm('この申込を拒否しますか？')) return;
    setApplications((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'rejected' as ApplicationStatus } : a
      )
    );
  };

  const detail = detailId ? applications.find((a) => a.id === detailId) : null;

  // ステータス別集計
  const counts = {
    all: applications.length,
    awaiting_transfer: applications.filter((a) => a.status === 'awaiting_transfer').length,
    awaiting_review: applications.filter((a) => a.status === 'awaiting_review').length,
    active: applications.filter((a) => a.status === 'active').length,
    cooling_off: applications.filter((a) => a.status === 'cooling_off').length,
    cancelled: applications.filter((a) => a.status === 'cancelled').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/staff"
            className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            ダッシュボード
          </Link>

          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">申込管理</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `applications_${todayStamp()}.csv`,
                  filtered.map((a) => ({
                    id: a.id,
                    user_name: a.user_name,
                    user_email: a.user_email,
                    user_phone: a.user_phone,
                    plan: PLAN_LABEL[a.plan],
                    amount: a.amount,
                    payment_method: a.payment_method === 'card' ? 'カード' : '振込',
                    status: APPLICATION_STATUS_LABEL[a.status],
                    applied_at: a.applied_at,
                    activated_at: a.activated_at ?? '',
                    acquisition_source: ACQUISITION_SOURCE_LABEL[a.acquisition_source],
                    source_event_token: a.source_event_token ?? '',
                    source_lead_id: a.source_lead_id ?? '',
                    notes: a.notes ?? '',
                  })),
                  [
                    { key: 'id', label: '申込ID' },
                    { key: 'user_name', label: '氏名' },
                    { key: 'user_email', label: 'メール' },
                    { key: 'user_phone', label: '電話' },
                    { key: 'plan', label: 'プラン' },
                    { key: 'amount', label: '金額' },
                    { key: 'payment_method', label: '決済方法' },
                    { key: 'status', label: 'ステータス' },
                    { key: 'applied_at', label: '申込日時' },
                    { key: 'activated_at', label: '開始日時' },
                    { key: 'acquisition_source', label: '流入経路' },
                    { key: 'source_event_token', label: 'イベント' },
                    { key: 'source_lead_id', label: 'リードID' },
                    { key: 'notes', label: '備考' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">
            梅・竹・松プランの申込状況・振込確認・アクティベートを管理
          </p>

          {/* フィルタ */}
          <section className="mb-6">
            <div className="flex flex-wrap gap-2">
              <FilterChip
                label="全て"
                count={counts.all}
                active={filter === 'all'}
                onClick={() => setFilter('all')}
              />
              <FilterChip
                label="振込待ち"
                count={counts.awaiting_transfer}
                active={filter === 'awaiting_transfer'}
                onClick={() => setFilter('awaiting_transfer')}
                highlight
              />
              <FilterChip
                label="確認待ち"
                count={counts.awaiting_review}
                active={filter === 'awaiting_review'}
                onClick={() => setFilter('awaiting_review')}
                highlight
              />
              <FilterChip
                label="アクティブ"
                count={counts.active}
                active={filter === 'active'}
                onClick={() => setFilter('active')}
              />
              <FilterChip
                label="クーリングオフ中"
                count={counts.cooling_off}
                active={filter === 'cooling_off'}
                onClick={() => setFilter('cooling_off')}
              />
              <FilterChip
                label="解約済"
                count={counts.cancelled}
                active={filter === 'cancelled'}
                onClick={() => setFilter('cancelled')}
              />
            </div>

            {/* 流入経路フィルタ */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-[10px] text-muted-foreground self-center">流入：</span>
              <button
                type="button"
                onClick={() => setSourceFilter('all')}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-[10px]',
                  sourceFilter === 'all' ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:bg-muted'
                )}
              >
                全経路
              </button>
              {availableSources.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSourceFilter(s)}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-[10px]',
                    sourceFilter === s ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:bg-muted'
                  )}
                >
                  {ACQUISITION_SOURCE_LABEL[s]}
                </button>
              ))}
            </div>

            {/* 検索 */}
            <div className="mt-4 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="名前・メール・申込IDで検索"
                className="w-full rounded-2xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </section>

          {/* 申込一覧 */}
          <section className="overflow-hidden rounded-2xl border border-border bg-card">
            {filtered.length === 0 ? (
              <div className="px-6 py-12 text-center text-xs text-muted-foreground">
                該当する申込はありません
              </div>
            ) : (
              <ul>
                {filtered.map((a, i) => (
                  <li
                    key={a.id}
                    className={cn(
                      'flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors',
                      i !== filtered.length - 1 && 'border-b border-border'
                    )}
                    onClick={() => setDetailId(a.id)}
                  >
                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mont text-[10px] text-muted-foreground">
                          {a.id}
                        </span>
                        <span className="text-sm font-medium truncate">{a.user_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{formatDateTime(a.applied_at)}</span>
                        <span>・</span>
                        <span>{a.payment_method === 'card' ? 'クレカ' : '振込'}</span>
                        <span>・</span>
                        <span className="font-mont">¥{a.amount.toLocaleString()}</span>
                      </div>
                    </div>

                    <Badge
                      variant={a.plan === 'matsu' ? 'rose' : 'outline'}
                      className="text-[10px] shrink-0"
                    >
                      {PLAN_LABEL[a.plan]}
                    </Badge>

                    <span className={cn('text-[10px] shrink-0', getStatusColor(a.status))}>
                      {APPLICATION_STATUS_LABEL[a.status]}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      {/* 詳細モーダル */}
      {detail && (
        <DetailModal
          application={detail}
          onClose={() => setDetailId(null)}
          onActivate={handleActivate}
          onReject={handleReject}
          activating={activatingId === detail.id}
        />
      )}
    </>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
  highlight,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
        active
          ? 'border-foreground bg-foreground text-background'
          : highlight && count > 0
            ? 'border-warn bg-warn-50 text-warn hover:bg-warn-50/80'
            : 'border-border bg-background hover:bg-muted'
      )}
    >
      {label} <span className="ml-1 font-mont">{count}</span>
    </button>
  );
}

function DetailModal({
  application,
  onClose,
  onActivate,
  onReject,
  activating,
}: {
  application: MembershipApplication;
  onClose: () => void;
  onActivate: (id: string) => void;
  onReject: (id: string) => void;
  activating: boolean;
}) {
  const a = application;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        className="pb-safe max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-border bg-background sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-baseline justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-1">
            <span className="font-mont text-[10px] uppercase tracking-wider text-muted-foreground">
              {a.id}
            </span>
            <p className="text-sm font-semibold">{a.user_name} さんの申込</p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="閉じる"
          >
            <XCircle className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="px-6 py-6">
          {/* ステータスバー */}
          <div className={cn('mb-6 rounded-2xl border-2 p-4', getStatusBg(a.status))}>
            <p className={cn('text-xs font-semibold', getStatusColor(a.status))}>
              {APPLICATION_STATUS_LABEL[a.status]}
            </p>
            {a.notes && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                {a.notes}
              </p>
            )}
          </div>

          {/* プラン情報 */}
          <section className="mb-6">
            <h3 className="mb-3 text-[10px] font-mont uppercase tracking-wider text-muted-foreground">
              Plan
            </h3>
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-baseline justify-between mb-2">
                <Badge variant={a.plan === 'matsu' ? 'rose' : 'outline'}>
                  {PLAN_LABEL[a.plan]}プラン
                </Badge>
                <span className="font-mont text-xl font-medium">¥{a.amount.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                決済方法：{a.payment_method === 'card' ? 'クレジットカード（自動継続）' : '銀行振込（一括）'}
              </p>
            </div>
          </section>

          {/* お客様情報 */}
          <section className="mb-6">
            <h3 className="mb-3 text-[10px] font-mont uppercase tracking-wider text-muted-foreground">
              Customer
            </h3>
            <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4">
              <InfoRow Icon={Mail} label="メール" value={a.user_email} />
              <InfoRow Icon={Phone} label="電話" value={a.user_phone} />
              {a.payment_method === 'transfer' && (
                <InfoRow Icon={Building2} label="振込予定" value="阿波銀行 徳島駅前支店 1234567" />
              )}
            </div>
          </section>

          {/* タイムライン */}
          <section className="mb-6">
            <h3 className="mb-3 text-[10px] font-mont uppercase tracking-wider text-muted-foreground">
              Timeline
            </h3>
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
              <TimelineItem label="申込受領" time={a.applied_at} done />
              {a.activated_at && (
                <TimelineItem label="アクティベート" time={a.activated_at} done />
              )}
              {a.status === 'awaiting_transfer' && (
                <TimelineItem label="振込確認" time="未対応" />
              )}
              {a.status === 'awaiting_review' && (
                <TimelineItem label="確認・アクティベート" time="未対応" />
              )}
            </div>
          </section>

          {/* 山下相談（竹のみ） */}
          {a.plan === 'take' && a.wants_initial_chat && (
            <section className="mb-6 rounded-2xl border-2 border-rose bg-rose-50 p-4">
              <p className="text-xs font-semibold text-rose">山下代表との初回相談 希望</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                予約URLメール送付要 / Calendly連携で対応
              </p>
            </section>
          )}

          {/* アクションボタン */}
          {(a.status === 'awaiting_transfer' || a.status === 'awaiting_review') && (
            <div className="flex flex-col gap-2">
              <Button
                fullWidth
                size="lg"
                disabled={activating}
                onClick={() => onActivate(a.id)}
                className="gap-2"
              >
                {activating ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                )}
                {a.status === 'awaiting_transfer' ? '振込確認 → アクティベート' : 'アクティベート'}
              </Button>
              <Button
                fullWidth
                size="lg"
                variant="outline"
                onClick={() => onReject(a.id)}
              >
                申込を拒否
              </Button>
            </div>
          )}

          {a.status === 'cooling_off' && (
            <div className="rounded-2xl border border-warn bg-warn-50 p-4">
              <p className="text-xs font-semibold text-warn flex items-baseline gap-2">
                <Clock className="h-3 w-3" aria-hidden />
                クーリングオフ期間中（8日以内）
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                この期間中の解約申請は無条件で全額返金処理が必要です。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  Icon,
  label,
  value,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline gap-2 text-xs">
      <Icon className="h-3 w-3 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground w-14 shrink-0">
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function TimelineItem({ label, time, done }: { label: string; time: string; done?: boolean }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className={cn(
          'inline-flex h-2 w-2 rounded-full shrink-0',
          done ? 'bg-success' : 'bg-muted-foreground'
        )}
      />
      <span className="text-xs flex-1">{label}</span>
      <span className="font-mont text-[10px] text-muted-foreground">
        {time === '未対応' ? '未対応' : formatDateTime(time)}
      </span>
    </div>
  );
}

function getStatusColor(status: ApplicationStatus): string {
  switch (status) {
    case 'awaiting_transfer':
    case 'awaiting_review':
      return 'text-warn';
    case 'active':
      return 'text-success';
    case 'cooling_off':
      return 'text-rose';
    case 'cancelled':
    case 'rejected':
      return 'text-muted-foreground';
  }
}

function getStatusBg(status: ApplicationStatus): string {
  switch (status) {
    case 'awaiting_transfer':
    case 'awaiting_review':
      return 'border-warn bg-warn-50';
    case 'active':
      return 'border-success bg-success-50';
    case 'cooling_off':
      return 'border-rose bg-rose-50';
    case 'cancelled':
    case 'rejected':
      return 'border-border bg-muted/30';
  }
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('ja-JP', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
