'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, UserPlus, Mail, Phone, AlertCircle, Snowflake, CheckCircle2, Sparkles, Download } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_LEADS,
  ACQUISITION_SOURCE_LABEL,
  ACQUISITION_SOURCE_GROUP,
  ACQUISITION_SOURCE_GROUP_LABEL,
  LEAD_STATUS_LABEL,
  type AcquisitionSource,
  type LeadStatus,
} from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

type StatusFilter = 'all' | LeadStatus;
type SourceFilter = 'all' | AcquisitionSource;

export default function LeadsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return DEMO_LEADS.filter((l) => {
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;
      if (sourceFilter !== 'all' && l.source !== sourceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q) ||
          (l.notes ?? '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [statusFilter, sourceFilter, search]);

  const counts = {
    all: DEMO_LEADS.length,
    new: DEMO_LEADS.filter((l) => l.status === 'new').length,
    engaged: DEMO_LEADS.filter((l) => l.status === 'engaged').length,
    converted_free: DEMO_LEADS.filter((l) => l.status === 'converted_free').length,
    converted_paid: DEMO_LEADS.filter((l) => l.status === 'converted_paid').length,
    cold: DEMO_LEADS.filter((l) => l.status === 'cold').length,
  };

  const sources = Array.from(new Set(DEMO_LEADS.map((l) => l.source))) as AcquisitionSource[];

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">リード管理</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `leads_${todayStamp()}.csv`,
                  filtered.map((l) => ({
                    id: l.id,
                    name: l.name,
                    email: l.email,
                    phone: l.phone,
                    gender: l.gender === 'male' ? '男性' : '女性',
                    age: l.age,
                    source: ACQUISITION_SOURCE_LABEL[l.source],
                    source_event_token: l.source_event_token ?? '',
                    source_campaign: l.source_campaign ?? '',
                    source_referrer: l.source_referrer ?? '',
                    status: LEAD_STATUS_LABEL[l.status],
                    registered_at: l.registered_at,
                    last_activity_at: l.last_activity_at,
                    converted_application_id: l.converted_application_id ?? '',
                    notes: l.notes ?? '',
                  })),
                  [
                    { key: 'id', label: 'リードID' },
                    { key: 'name', label: '氏名' },
                    { key: 'email', label: 'メール' },
                    { key: 'phone', label: '電話' },
                    { key: 'gender', label: '性別' },
                    { key: 'age', label: '年齢' },
                    { key: 'source', label: '流入経路' },
                    { key: 'source_event_token', label: 'イベント' },
                    { key: 'source_campaign', label: 'キャンペーン' },
                    { key: 'source_referrer', label: 'リファラ' },
                    { key: 'status', label: 'ステータス' },
                    { key: 'registered_at', label: '登録日時' },
                    { key: 'last_activity_at', label: '最終活動' },
                    { key: 'converted_application_id', label: '本会員ID' },
                    { key: 'notes', label: 'メモ' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">簡易登録（イベント申込・LP登録）リードのフォローアップ・本会員昇格管理</p>

          {/* サマリー */}
          <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-6">
            <Stat label="総リード" value={counts.all} active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} />
            <Stat label="新規" value={counts.new} active={statusFilter === 'new'} onClick={() => setStatusFilter('new')} variant="warn" />
            <Stat label="エンゲージ" value={counts.engaged} active={statusFilter === 'engaged'} onClick={() => setStatusFilter('engaged')} />
            <Stat label="無料登録" value={counts.converted_free} active={statusFilter === 'converted_free'} onClick={() => setStatusFilter('converted_free')} />
            <Stat label="本会員昇格" value={counts.converted_paid} active={statusFilter === 'converted_paid'} onClick={() => setStatusFilter('converted_paid')} variant="success" />
            <Stat label="休眠" value={counts.cold} active={statusFilter === 'cold'} onClick={() => setStatusFilter('cold')} />
          </section>

          {/* 流入経路フィルタ */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Chip label="全経路" active={sourceFilter === 'all'} onClick={() => setSourceFilter('all')} />
            {sources.map((s) => (
              <Chip key={s} label={ACQUISITION_SOURCE_LABEL[s]} active={sourceFilter === s} onClick={() => setSourceFilter(s)} small />
            ))}
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="名前・メール・キャンペーン・メモで検索"
              className="w-full rounded-2xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <ul className="flex flex-col gap-3">
            {filtered.length === 0 && (
              <li className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                該当するリードはありません
              </li>
            )}
            {filtered.map((l) => {
              const group = ACQUISITION_SOURCE_GROUP[l.source];
              return (
                <li key={l.id} className={cn(
                  'rounded-2xl border p-5',
                  l.status === 'new' ? 'border-warn/40 bg-warn-50/30' :
                  l.status === 'converted_paid' ? 'border-success/40 bg-success/5' :
                  l.status === 'cold' ? 'border-border bg-muted/20' :
                  l.status === 'rejected' ? 'border-border bg-muted/30 opacity-60' :
                  'border-border bg-card'
                )}>
                  <div className="mb-3 flex flex-wrap items-baseline gap-3">
                    <StatusIcon status={l.status} />
                    <span className="font-mont text-[10px] text-muted-foreground">{l.id}</span>
                    <span className="text-base font-semibold">{l.name}</span>
                    <span className="text-[10px] text-muted-foreground">{l.gender === 'male' ? '男性' : '女性'}・{l.age}歳</span>
                    <Badge variant="outline" className={cn('text-[10px]',
                      l.status === 'new' ? 'text-warn border-warn' :
                      l.status === 'converted_paid' ? 'text-success border-success' :
                      l.status === 'cold' ? 'text-muted-foreground' : ''
                    )}>
                      {LEAD_STATUS_LABEL[l.status]}
                    </Badge>
                    <span className="ml-auto font-mont text-[10px] text-muted-foreground">登録 {formatDateTime(l.registered_at)}</span>
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-2 text-[10px] md:grid-cols-4">
                    <div className="flex items-baseline gap-1">
                      <Mail className="h-2.5 w-2.5 text-muted-foreground" aria-hidden />
                      <span className="font-mont truncate">{l.email}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <Phone className="h-2.5 w-2.5 text-muted-foreground" aria-hidden />
                      <span className="font-mont">{l.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">最終活動：</span>
                      <span className="font-mont">{formatRelative(l.last_activity_at)}</span>
                    </div>
                    {l.converted_application_id && (
                      <div>
                        <span className="text-muted-foreground">本会員：</span>
                        <Link href={`/staff/members/${l.converted_application_id}`} className="font-mont text-rose hover:underline">
                          {l.converted_application_id}
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="mb-3 rounded-lg bg-muted/30 px-3 py-2 text-[10px]">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-muted-foreground">流入経路：</span>
                      <Badge variant={group === 'paid' ? 'rose' : group === 'event' ? 'soft' : 'outline'} className="text-[10px]">
                        {ACQUISITION_SOURCE_LABEL[l.source]}
                      </Badge>
                      <span className="text-muted-foreground">／グループ：{ACQUISITION_SOURCE_GROUP_LABEL[group]}</span>
                      {l.source_event_token && (
                        <span className="font-mont text-rose">／{l.source_event_token}</span>
                      )}
                      {l.source_campaign && (
                        <span className="font-mont text-muted-foreground">／キャンペーン：{l.source_campaign}</span>
                      )}
                    </div>
                    {l.source_referrer && (
                      <p className="mt-1 text-[9px] text-muted-foreground font-mont break-all">
                        referrer: {l.source_referrer}
                      </p>
                    )}
                  </div>

                  {l.notes && (
                    <p className="mb-3 text-[11px] leading-relaxed">{l.notes}</p>
                  )}

                  {(l.status === 'new' || l.status === 'engaged' || l.status === 'cold' || l.status === 'converted_free') && (
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Mail className="h-3 w-3" aria-hidden />フォローメール
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Phone className="h-3 w-3" aria-hidden />電話メモ追加
                      </Button>
                      <Button size="sm" className="gap-1">
                        <UserPlus className="h-3 w-3" aria-hidden />本会員へ昇格
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

function StatusIcon({ status }: { status: LeadStatus }) {
  switch (status) {
    case 'new':
      return <AlertCircle className="h-3.5 w-3.5 text-warn" strokeWidth={1.8} aria-hidden />;
    case 'engaged':
      return <Sparkles className="h-3.5 w-3.5 text-foreground" strokeWidth={1.8} aria-hidden />;
    case 'converted_free':
      return <CheckCircle2 className="h-3.5 w-3.5 text-foreground" strokeWidth={1.8} aria-hidden />;
    case 'converted_paid':
      return <CheckCircle2 className="h-3.5 w-3.5 text-success" strokeWidth={1.8} aria-hidden />;
    case 'cold':
      return <Snowflake className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} aria-hidden />;
    case 'rejected':
      return <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} aria-hidden />;
  }
}

function Stat({ label, value, active, onClick, variant }: { label: string; value: number; active: boolean; onClick: () => void; variant?: 'warn' | 'success' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-2xl border p-3 text-left transition-colors',
        active
          ? variant === 'warn' ? 'border-warn bg-warn-50' :
            variant === 'success' ? 'border-success bg-success/5' :
            'border-foreground bg-foreground text-background'
          : 'border-border bg-card hover:bg-muted/30'
      )}
    >
      <p className={cn('text-[10px]', active && !variant ? 'opacity-70' : 'text-muted-foreground')}>{label}</p>
      <p className="mt-0.5 font-mont text-xl font-medium">{value}</p>
    </button>
  );
}

function Chip({ label, active, onClick, small }: { label: string; active: boolean; onClick: () => void; small?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border font-medium transition-colors',
        small ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]',
        active ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:bg-muted'
      )}
    >
      {label}
    </button>
  );
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  if (diffMin < 60) return `${diffMin}分前`;
  if (diffHr < 24) return `${diffHr}時間前`;
  if (diffDay < 7) return `${diffDay}日前`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}週前`;
  return formatDateTime(iso);
}
