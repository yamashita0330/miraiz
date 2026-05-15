'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Search, AlertTriangle, CheckCircle2, Eye, Send, Download } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEMO_EMAIL_LOGS, EMAIL_TEMPLATE_LABEL, EMAIL_STATUS_LABEL, type EmailLog, type EmailStatus } from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

type StatusFilter = 'all' | 'failed' | EmailStatus;

export default function EmailsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<EmailLog | null>(null);

  const filtered = useMemo(() => {
    return DEMO_EMAIL_LOGS.filter((m) => {
      if (statusFilter === 'failed' && m.status !== 'failed' && m.status !== 'bounced') return false;
      if (statusFilter !== 'all' && statusFilter !== 'failed' && m.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return m.to_user_name.toLowerCase().includes(q) || m.to_email.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q);
      }
      return true;
    });
  }, [statusFilter, search]);

  const counts = {
    total: DEMO_EMAIL_LOGS.length,
    sent: DEMO_EMAIL_LOGS.filter((m) => m.status === 'sent' || m.status === 'delivered').length,
    opened: DEMO_EMAIL_LOGS.filter((m) => m.status === 'opened').length,
    failed: DEMO_EMAIL_LOGS.filter((m) => m.status === 'failed' || m.status === 'bounced').length,
  };
  const openRate = Math.round((counts.opened / counts.total) * 100);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">メール配信ログ</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `email_logs_${todayStamp()}.csv`,
                  filtered.map((m) => ({
                    id: m.id,
                    sent_at: m.sent_at,
                    template: EMAIL_TEMPLATE_LABEL[m.template],
                    subject: m.subject,
                    to_user_name: m.to_user_name,
                    to_email: m.to_email,
                    status: EMAIL_STATUS_LABEL[m.status],
                    opened_at: m.opened_at ?? '',
                    error_message: m.error_message ?? '',
                  })),
                  [
                    { key: 'id', label: 'メールID' },
                    { key: 'sent_at', label: '送信時刻' },
                    { key: 'template', label: 'テンプレート' },
                    { key: 'subject', label: '件名' },
                    { key: 'to_user_name', label: '宛名' },
                    { key: 'to_email', label: 'メール' },
                    { key: 'status', label: 'ステータス' },
                    { key: 'opened_at', label: '開封時刻' },
                    { key: 'error_message', label: 'エラー' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">自動送信メールの配信状況・開封率・失敗追跡</p>

          <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <KpiBox label="送信件数" value={String(counts.total)} icon={<Send className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />} />
            <KpiBox label="開封率" value={`${openRate}%`} icon={<Eye className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />} />
            <KpiBox label="配信完了" value={String(counts.sent + counts.opened)} icon={<CheckCircle2 className="h-3.5 w-3.5 text-success" strokeWidth={1.6} aria-hidden />} />
            <KpiBox label="失敗・バウンス" value={String(counts.failed)} icon={<AlertTriangle className="h-3.5 w-3.5 text-warn" strokeWidth={1.6} aria-hidden />} alert={counts.failed > 0} />
          </section>

          <div className="mb-4 flex flex-wrap gap-2">
            <Chip label="全て" active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} />
            <Chip label="開封済" active={statusFilter === 'opened'} onClick={() => setStatusFilter('opened')} />
            <Chip label="配信完了" active={statusFilter === 'delivered'} onClick={() => setStatusFilter('delivered')} />
            <Chip label="送信済" active={statusFilter === 'sent'} onClick={() => setStatusFilter('sent')} />
            <Chip label="失敗・バウンス" active={statusFilter === 'failed'} onClick={() => setStatusFilter('failed')} warn />
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="名前・メール・件名で検索"
              className="w-full rounded-2xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <ul className="overflow-hidden rounded-2xl border border-border bg-card">
            {filtered.length === 0 && (
              <li className="px-6 py-12 text-center text-xs text-muted-foreground">該当するメールはありません</li>
            )}
            {filtered.map((m, i) => {
              const isFailed = m.status === 'failed' || m.status === 'bounced';
              return (
                <li
                  key={m.id}
                  className={cn(
                    'cursor-pointer px-5 py-4 hover:bg-muted/30 transition-colors',
                    i !== filtered.length - 1 && 'border-b border-border',
                    isFailed && 'bg-warn-50/50'
                  )}
                  onClick={() => setSelected(m)}
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <Mail className={cn('h-3.5 w-3.5', isFailed ? 'text-warn' : 'text-muted-foreground')} strokeWidth={1.6} aria-hidden />
                    <span className="text-sm font-medium truncate flex-1">{m.subject}</span>
                    <Badge variant="outline" className={cn('text-[10px] shrink-0',
                      m.status === 'opened' ? 'text-success border-success' :
                      isFailed ? 'text-warn border-warn' :
                      'text-muted-foreground'
                    )}>
                      {EMAIL_STATUS_LABEL[m.status]}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-3 text-[10px] text-muted-foreground">
                    <span>{EMAIL_TEMPLATE_LABEL[m.template]}</span>
                    <span>→ {m.to_user_name}</span>
                    <span className="font-mont">{m.to_email}</span>
                    <span className="ml-auto font-mont">{formatDateTime(m.sent_at)}</span>
                  </div>
                  {m.error_message && (
                    <p className="mt-1.5 text-[10px] text-warn">{m.error_message}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {selected && <DetailModal log={selected} onClose={() => setSelected(null)} />}
      </main>
    </>
  );
}

function DetailModal({ log, onClose }: { log: EmailLog; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-base font-semibold">メール詳細</h2>
          <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground">閉じる</button>
        </div>
        <dl className="space-y-3 text-xs">
          <Row label="件名" value={log.subject} />
          <Row label="テンプレート" value={EMAIL_TEMPLATE_LABEL[log.template]} />
          <Row label="宛先" value={`${log.to_user_name}（${log.to_email}）`} mono />
          <Row label="ステータス" value={EMAIL_STATUS_LABEL[log.status]} />
          <Row label="送信時刻" value={formatDateTime(log.sent_at)} mono />
          {log.opened_at && <Row label="開封時刻" value={formatDateTime(log.opened_at)} mono />}
          {log.error_message && <Row label="エラー" value={log.error_message} warn />}
          <Row label="メッセージID" value={log.id} mono />
        </dl>
      </div>
    </div>
  );
}

function Row({ label, value, mono, warn }: { label: string; value: string; mono?: boolean; warn?: boolean }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-border pb-2 last:border-b-0 last:pb-0">
      <dt className="w-24 shrink-0 text-[10px] text-muted-foreground">{label}</dt>
      <dd className={cn(mono && 'font-mont', warn && 'text-warn', 'flex-1 break-all')}>{value}</dd>
    </div>
  );
}

function KpiBox({ label, value, icon, alert }: { label: string; value: string; icon: React.ReactNode; alert?: boolean }) {
  return (
    <div className={cn('rounded-2xl border p-4', alert ? 'border-warn bg-warn-50' : 'border-border bg-card')}>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className="mt-1 font-mont text-xl font-medium">{value}</p>
    </div>
  );
}

function Chip({ label, active, onClick, warn }: { label: string; active: boolean; onClick: () => void; warn?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
        active
          ? warn ? 'border-warn bg-warn text-background' : 'border-foreground bg-foreground text-background'
          : 'border-border bg-background hover:bg-muted'
      )}
    >
      {label}
    </button>
  );
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}
