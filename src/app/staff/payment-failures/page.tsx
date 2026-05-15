'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, AlertTriangle, RefreshCw, Mail, TrendingDown, CheckCircle2, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_PAYMENT_FAILURES,
  PAYMENT_FAILURE_REASON_LABEL,
  PLAN_LABEL,
  type PaymentFailure,
} from '@/lib/demo';

type FilterType = 'pending' | 'all' | 'churned' | 'resolved';

export default function PaymentFailuresPage() {
  const [filter, setFilter] = useState<FilterType>('pending');

  const filtered = useMemo(() => {
    return DEMO_PAYMENT_FAILURES.filter((p) => {
      if (filter === 'all') return true;
      if (filter === 'pending') return p.status === 'pending_action' || p.status === 'retrying';
      return p.status === filter;
    });
  }, [filter]);

  const counts = {
    pending_action: DEMO_PAYMENT_FAILURES.filter((p) => p.status === 'pending_action').length,
    retrying: DEMO_PAYMENT_FAILURES.filter((p) => p.status === 'retrying').length,
    churned: DEMO_PAYMENT_FAILURES.filter((p) => p.status === 'churned').length,
    resolved: DEMO_PAYMENT_FAILURES.filter((p) => p.status === 'resolved').length,
    total_at_risk: DEMO_PAYMENT_FAILURES
      .filter((p) => p.status === 'pending_action' || p.status === 'retrying')
      .reduce((s, p) => s + p.amount, 0),
    monthly_churn_loss: DEMO_PAYMENT_FAILURES
      .filter((p) => p.status === 'churned')
      .reduce((s, p) => s + p.amount, 0),
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">決済失敗・督促</h1>
          <p className="mb-8 text-xs text-muted-foreground">Stripeサブスク決済失敗の監視・督促・失客防止</p>

          {/* リスク警告 */}
          {counts.pending_action > 0 && (
            <section className="mb-6 rounded-2xl border-2 border-warn bg-warn-50 p-5">
              <div className="flex items-baseline gap-2 mb-2">
                <AlertTriangle className="h-3.5 w-3.5 text-warn" strokeWidth={1.8} aria-hidden />
                <p className="text-xs font-semibold text-warn">対応必要：{counts.pending_action}件</p>
              </div>
              <p className="text-[11px] leading-relaxed">
                自動再試行が枯渇した会員。手動でカード更新依頼メールを送るか、本人確認の電話が必要。
                放置するほど失客率が上がる（業界平均：5日以内対応で60%復活、30日後は10%以下）。
              </p>
            </section>
          )}

          {/* KPI */}
          <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="対応必要" value={`${counts.pending_action}件`} icon={<AlertTriangle className="h-3.5 w-3.5 text-warn" />} alert={counts.pending_action > 0} />
            <Stat label="再試行中" value={`${counts.retrying}件`} icon={<RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />} />
            <Stat label="失客（今月）" value={`${counts.churned}件`} icon={<TrendingDown className="h-3.5 w-3.5 text-warn" />} sub={`-¥${counts.monthly_churn_loss.toLocaleString()}/月`} />
            <Stat label="解決済" value={`${counts.resolved}件`} icon={<CheckCircle2 className="h-3.5 w-3.5 text-success" />} />
          </section>

          {/* タブ */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Chip label={`未対応 ${counts.pending_action + counts.retrying}`} active={filter === 'pending'} onClick={() => setFilter('pending')} warn />
            <Chip label={`失客 ${counts.churned}`} active={filter === 'churned'} onClick={() => setFilter('churned')} />
            <Chip label={`解決済 ${counts.resolved}`} active={filter === 'resolved'} onClick={() => setFilter('resolved')} />
            <Chip label="全て" active={filter === 'all'} onClick={() => setFilter('all')} />
          </div>

          {/* リスク総額バナー */}
          {filter === 'pending' && counts.total_at_risk > 0 && (
            <div className="mb-6 rounded-2xl border border-warn/40 bg-warn-50/50 px-5 py-3">
              <p className="text-[11px]">
                <span className="text-muted-foreground">未回収リスク額：</span>
                <span className="font-mont font-semibold text-warn">¥{counts.total_at_risk.toLocaleString()}</span>
                <span className="text-muted-foreground ml-2">（年換算 ¥{(counts.total_at_risk * 12).toLocaleString()}）</span>
              </p>
            </div>
          )}

          {/* リスト */}
          <ul className="flex flex-col gap-3">
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                該当する決済失敗はありません
              </p>
            )}
            {filtered.map((p) => <FailureCard key={p.id} pf={p} />)}
          </ul>
        </div>
      </main>
    </>
  );
}

function FailureCard({ pf }: { pf: PaymentFailure }) {
  const isUrgent = pf.status === 'pending_action';
  const isChurned = pf.status === 'churned';

  return (
    <li className={cn(
      'rounded-2xl border p-5',
      isUrgent ? 'border-warn bg-warn-50' :
      pf.status === 'retrying' ? 'border-warn/40 bg-warn-50/30' :
      isChurned ? 'border-border bg-muted/20' :
      'border-border bg-card'
    )}>
      <div className="mb-3 flex flex-wrap items-baseline gap-3">
        <CreditCard className={cn('h-3.5 w-3.5', isUrgent ? 'text-warn' : 'text-muted-foreground')} strokeWidth={1.6} aria-hidden />
        <span className="font-mont text-[10px] text-muted-foreground">{pf.id}</span>
        <span className="text-sm font-semibold">{pf.user_name}</span>
        <Badge variant={pf.plan === 'take' ? 'soft' : 'outline'} className="text-[10px]">{PLAN_LABEL[pf.plan]}</Badge>
        <Badge variant="outline" className={cn('text-[10px]',
          pf.status === 'pending_action' ? 'text-warn border-warn' :
          pf.status === 'retrying' ? 'text-warn border-warn/40' :
          pf.status === 'churned' ? 'text-muted-foreground' :
          'text-success border-success'
        )}>
          {pf.status === 'pending_action' ? '対応必要' :
           pf.status === 'retrying' ? '再試行中' :
           pf.status === 'churned' ? '失客' : '解決済'}
        </Badge>
        <span className="ml-auto font-mont text-[10px] text-muted-foreground">{formatDateTime(pf.failed_at)}</span>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3 rounded-lg bg-muted/30 px-3 py-2 text-[10px] md:grid-cols-4">
        <div>
          <p className="text-muted-foreground">原因</p>
          <p className="font-mont mt-0.5 text-warn">{PAYMENT_FAILURE_REASON_LABEL[pf.reason]}</p>
        </div>
        <div>
          <p className="text-muted-foreground">金額</p>
          <p className="font-mont mt-0.5">¥{pf.amount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">試行回数</p>
          <p className="font-mont mt-0.5">{pf.attempts}回</p>
        </div>
        <div>
          <p className="text-muted-foreground">{pf.next_retry_at ? '次回再試行' : 'Stripe ID'}</p>
          <p className="font-mont mt-0.5 truncate">
            {pf.next_retry_at ? formatDateTime(pf.next_retry_at) : pf.stripe_payment_intent_id}
          </p>
        </div>
      </div>

      {pf.status === 'churned' && pf.resolved_at && (
        <p className="mb-3 text-[11px] text-muted-foreground">
          失客確定：{formatDateTime(pf.resolved_at)}（自動退会処理済）
        </p>
      )}

      <div className="flex items-baseline justify-between text-[10px]">
        <p className="text-muted-foreground">
          <span className="font-mont">{pf.user_email}</span>
        </p>
        <div className="flex gap-2">
          <Link
            href={`/staff/members/APP-2026-002`}
            className="text-rose hover:underline inline-flex items-baseline gap-1"
          >
            会員詳細 <ExternalLink className="h-2.5 w-2.5" aria-hidden />
          </Link>
        </div>
      </div>

      {(isUrgent || pf.status === 'retrying') && (
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" className="gap-1">
            <Mail className="h-3 w-3" aria-hidden />カード更新依頼メール
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <RefreshCw className="h-3 w-3" aria-hidden />手動再試行
          </Button>
          <Button size="sm" variant="ghost" className="gap-1 text-warn">
            退会処理
          </Button>
        </div>
      )}
    </li>
  );
}

function Stat({ label, value, icon, sub, alert }: { label: string; value: string; icon: React.ReactNode; sub?: string; alert?: boolean }) {
  return (
    <div className={cn('rounded-2xl border p-4', alert ? 'border-warn bg-warn-50' : 'border-border bg-card')}>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className="mt-1 font-mont text-xl font-medium">{value}</p>
      {sub && <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>}
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
