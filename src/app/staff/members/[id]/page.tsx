'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  User as UserIcon,
  CreditCard,
  CalendarClock,
  Mail,
  ShieldAlert,
  XCircle,
  Heart,
  AlertTriangle,
  StickyNote,
  Plus,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_APPLICATIONS,
  DEMO_BOOKINGS,
  DEMO_CANCELLATIONS,
  DEMO_REPORTS,
  DEMO_EMAIL_LOGS,
  DEMO_PAYMENT_FAILURES,
  DEMO_EVALUATION_FEED,
  DEMO_PARTNER_USAGES,
  DEMO_AUDIT_LOG,
  PLAN_LABEL,
  APPLICATION_STATUS_LABEL,
  BOOKING_TYPE_LABEL,
  EMAIL_TEMPLATE_LABEL,
  EMAIL_STATUS_LABEL,
  REPORT_REASON_LABEL,
  CANCELLATION_REASON_LABEL,
  PAYMENT_FAILURE_REASON_LABEL,
  AUDIT_ACTION_LABEL,
} from '@/lib/demo';

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) ?? '';

  const application = DEMO_APPLICATIONS.find((a) => a.id === id);

  const [notes, setNotes] = useState<{ id: string; text: string; at: string; by: string }[]>([
    { id: 'note-1', text: 'Vol.5前に1回相談済。優先紹介リスト追加。', at: '2026-05-05T16:08:00+09:00', by: '山下 純也' },
  ]);
  const [newNote, setNewNote] = useState('');

  // 名前一致でその他データを集約（実本番では user_id でJOIN）
  const userName = application?.user_name ?? '';

  const bookings = useMemo(() => DEMO_BOOKINGS.filter((b) => b.user_name === userName), [userName]);
  const cancellations = useMemo(() => DEMO_CANCELLATIONS.filter((c) => c.user_name === userName), [userName]);
  const emails = useMemo(() => DEMO_EMAIL_LOGS.filter((m) => m.to_user_name === userName), [userName]);
  const paymentFailures = useMemo(() => DEMO_PAYMENT_FAILURES.filter((p) => p.user_name === userName), [userName]);
  const partnerUsages = useMemo(() => DEMO_PARTNER_USAGES.filter((u) => u.user_name === userName), [userName]);
  const reports = useMemo(() => DEMO_REPORTS.filter((r) => r.to_user_id === userName || r.from_user_id === userName), [userName]);
  const evaluations = useMemo(() => DEMO_EVALUATION_FEED.filter((e) => e.evaluator_name === userName || e.partner_name === userName), [userName]);
  const auditEntries = useMemo(() => DEMO_AUDIT_LOG.filter((a) => a.target_label.includes(userName)), [userName]);

  if (!application) {
    return (
      <>
        <Header showLogout />
        <main className="min-h-screen bg-background pb-12">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <Link href="/staff/members" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" aria-hidden />会員一覧
            </Link>
            <p className="rounded-2xl border border-border bg-card px-5 py-12 text-center text-xs text-muted-foreground">
              該当の会員が見つかりません（ID: {id}）
            </p>
          </div>
        </main>
      </>
    );
  }

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [
      { id: `note-${Date.now()}`, text: newNote.trim(), at: new Date().toISOString(), by: '山下 純也' },
      ...prev,
    ]);
    setNewNote('');
  };

  const totalSpent =
    application.amount +
    partnerUsages.reduce((s, u) => s + u.member_paid, 0);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <button onClick={() => router.back()} className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />戻る
          </button>

          {/* ヘッダー */}
          <section className="mb-8 rounded-2xl border-2 border-foreground bg-foreground p-6 text-background">
            <div className="flex items-baseline gap-4 mb-3">
              <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-background/10">
                <UserIcon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mont text-[10px] uppercase tracking-[0.4em] opacity-70">{application.id}</p>
                <h1 className="text-2xl font-semibold tracking-tight">{application.user_name}</h1>
                <p className="text-[11px] opacity-80 mt-0.5 break-all">{application.user_email}</p>
              </div>
              <Badge variant={application.plan === 'matsu' ? 'rose' : 'soft'} className="text-[10px] shrink-0">
                {PLAN_LABEL[application.plan]}
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-3 text-[11px]">
              <div>
                <p className="opacity-70">ステータス</p>
                <p className="font-mont mt-0.5">{APPLICATION_STATUS_LABEL[application.status]}</p>
              </div>
              <div>
                <p className="opacity-70">電話</p>
                <p className="font-mont mt-0.5 inline-flex items-center gap-1">
                  <Phone className="h-2.5 w-2.5 opacity-60" aria-hidden />{application.user_phone}
                </p>
              </div>
              <div>
                <p className="opacity-70">入会金額</p>
                <p className="font-mont mt-0.5">¥{application.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="opacity-70">累計支払</p>
                <p className="font-mont mt-0.5">¥{totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </section>

          {/* クイック操作 */}
          <section className="mb-8 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Mail className="h-3 w-3" aria-hidden />メール送信
            </Button>
            <Button size="sm" variant="outline" className="gap-1">
              <CreditCard className="h-3 w-3" aria-hidden />領収書再発行
            </Button>
            <Button size="sm" variant="outline" className="gap-1">
              <CalendarClock className="h-3 w-3" aria-hidden />予約追加
            </Button>
            <Button size="sm" variant="ghost" className="gap-1 text-warn ml-auto">
              <ShieldAlert className="h-3 w-3" aria-hidden />会員停止
            </Button>
          </section>

          {/* 警告セクション */}
          {(paymentFailures.filter((p) => p.status !== 'resolved' && p.status !== 'churned').length > 0 ||
            reports.filter((r) => r.to_user_id === userName).length > 0) && (
            <section className="mb-8 rounded-2xl border-2 border-warn bg-warn-50 p-5">
              <div className="flex items-baseline gap-2 text-warn mb-2">
                <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                <p className="text-xs font-semibold">この会員に関する警告</p>
              </div>
              <ul className="space-y-1 text-[11px]">
                {paymentFailures.filter((p) => p.status !== 'resolved' && p.status !== 'churned').map((p) => (
                  <li key={p.id}>決済失敗：{PAYMENT_FAILURE_REASON_LABEL[p.reason]}（{p.attempts}回試行）</li>
                ))}
                {reports.filter((r) => r.to_user_id === userName).map((r) => (
                  <li key={r.id}>通報受信：{REPORT_REASON_LABEL[r.reason]}</li>
                ))}
              </ul>
            </section>
          )}

          {/* メモ */}
          <Section title="社内メモ" icon={<StickyNote className="h-3.5 w-3.5" aria-hidden />}>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addNote()}
                  placeholder="電話メモ、対応履歴、優先紹介の意向など"
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button size="sm" onClick={addNote} className="gap-1">
                  <Plus className="h-3 w-3" aria-hidden />追加
                </Button>
              </div>
              <ul className="space-y-2">
                {notes.map((n) => (
                  <li key={n.id} className="rounded-lg border border-border bg-card px-3 py-2 text-[11px]">
                    <p className="leading-relaxed">{n.text}</p>
                    <p className="mt-1 text-[9px] text-muted-foreground font-mont">
                      {n.by} ・ {formatDateTime(n.at)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* 決済履歴 */}
          <Section title="決済・契約履歴" icon={<CreditCard className="h-3.5 w-3.5" aria-hidden />} count={1 + paymentFailures.length}>
            <ul className="space-y-2">
              <Row
                primary={`入会決済 ¥${application.amount.toLocaleString()}（${PLAN_LABEL[application.plan]}）`}
                secondary={`${application.payment_method === 'card' ? 'カード決済' : '銀行振込'}・${formatDateTime(application.applied_at)}`}
                badge={<Badge variant="outline" className="text-[10px] text-success border-success">成功</Badge>}
              />
              {paymentFailures.map((p) => (
                <Row
                  key={p.id}
                  primary={`サブスク決済失敗 ¥${p.amount.toLocaleString()}`}
                  secondary={`${PAYMENT_FAILURE_REASON_LABEL[p.reason]}・${p.attempts}回試行・${formatDateTime(p.failed_at)}`}
                  badge={
                    <Badge variant="outline" className={cn('text-[10px]',
                      p.status === 'resolved' ? 'text-success border-success' :
                      p.status === 'churned' ? 'text-muted-foreground' :
                      'text-warn border-warn')}>
                      {p.status === 'resolved' ? '解決済' : p.status === 'churned' ? '失客' : p.status === 'retrying' ? '再試行中' : '対応必要'}
                    </Badge>
                  }
                />
              ))}
              {paymentFailures.length === 0 && (
                <p className="text-[10px] text-muted-foreground">追加決済履歴はありません</p>
              )}
            </ul>
          </Section>

          {/* 予約履歴 */}
          <Section title="予約履歴" icon={<CalendarClock className="h-3.5 w-3.5" aria-hidden />} count={bookings.length}>
            {bookings.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">予約履歴はありません</p>
            ) : (
              <ul className="space-y-2">
                {bookings.map((b) => (
                  <Row
                    key={b.id}
                    primary={`${BOOKING_TYPE_LABEL[b.type]}（${b.duration_minutes}分）`}
                    secondary={`${formatDateTime(b.scheduled_at)}・${b.notes ?? ''}`}
                    badge={<Badge variant="outline" className={cn('text-[10px]',
                      b.status === 'completed' ? 'text-success border-success' :
                      b.status === 'no_show' ? 'text-warn border-warn' : '')}>
                      {b.status === 'upcoming' ? '予定' : b.status === 'completed' ? '完了' : b.status === 'no_show' ? 'no-show' : 'キャンセル'}
                    </Badge>}
                  />
                ))}
              </ul>
            )}
          </Section>

          {/* 加盟店利用 */}
          <Section title="加盟店利用" icon={<CheckCircle2 className="h-3.5 w-3.5" aria-hidden />} count={partnerUsages.length}>
            {partnerUsages.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">加盟店利用はありません</p>
            ) : (
              <ul className="space-y-2">
                {partnerUsages.map((u) => (
                  <Row
                    key={u.id}
                    primary={`${u.partner_name}（${u.partner_category}）`}
                    secondary={`${formatDate(u.used_at)}・${u.usage_type === 'half' ? '半額' : '無料'}・会員¥${u.member_paid.toLocaleString()} / 会社¥${u.company_paid.toLocaleString()}`}
                  />
                ))}
              </ul>
            )}
          </Section>

          {/* 相互評価 */}
          <Section title="MID評価（イベント）" icon={<Heart className="h-3.5 w-3.5" aria-hidden />} count={evaluations.length}>
            {evaluations.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">評価データはありません</p>
            ) : (
              <ul className="space-y-2">
                {evaluations.map((e) => {
                  const isAbout = e.partner_name === userName;
                  return (
                    <Row
                      key={e.id}
                      primary={isAbout ? `${e.evaluator_name} → 本人（受けた評価）` : `本人 → ${e.partner_name}（行った評価）`}
                      secondary={`${e.event_name}・見た目${e.appearance_score}/10・話しやすさ${e.talkability_score}/10`}
                      badge={
                        e.flag === 'mutual_match' ? <Badge variant="rose" className="text-[10px]">相互ライク</Badge> :
                        e.flag === 'concerning' ? <Badge variant="outline" className="text-[10px] text-warn border-warn">要注意</Badge> :
                        null
                      }
                    />
                  );
                })}
              </ul>
            )}
          </Section>

          {/* 通報 */}
          <Section title="通報関連" icon={<ShieldAlert className="h-3.5 w-3.5" aria-hidden />} count={reports.length}>
            {reports.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">通報関連の記録はありません</p>
            ) : (
              <ul className="space-y-2">
                {reports.map((r) => (
                  <Row
                    key={r.id}
                    primary={`${REPORT_REASON_LABEL[r.reason]}（${r.to_user_id === userName ? '受けた' : '行った'}）`}
                    secondary={`${r.detail ?? ''}・${formatDateTime(r.created_at)}`}
                  />
                ))}
              </ul>
            )}
          </Section>

          {/* 解約申請 */}
          <Section title="解約・クーリングオフ" icon={<XCircle className="h-3.5 w-3.5" aria-hidden />} count={cancellations.length}>
            {cancellations.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">解約申請はありません</p>
            ) : (
              <ul className="space-y-2">
                {cancellations.map((c) => (
                  <Row
                    key={c.id}
                    primary={`${CANCELLATION_REASON_LABEL[c.reason]}${c.is_cooling_off ? '（クーリングオフ）' : ''}`}
                    secondary={`返金¥${c.refund_amount.toLocaleString()}・${formatDateTime(c.applied_at)}`}
                    badge={<Badge variant="outline" className={cn('text-[10px]',
                      c.status === 'approved' ? 'text-success border-success' :
                      c.status === 'rejected' ? 'text-muted-foreground' :
                      'text-warn border-warn')}>
                      {c.status === 'pending' ? '未対応' : c.status === 'approved' ? '承認済' : '拒否'}
                    </Badge>}
                  />
                ))}
              </ul>
            )}
          </Section>

          {/* メール履歴 */}
          <Section title="メール送信履歴" icon={<Mail className="h-3.5 w-3.5" aria-hidden />} count={emails.length}>
            {emails.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">メール送信履歴はありません</p>
            ) : (
              <ul className="space-y-2">
                {emails.map((m) => (
                  <Row
                    key={m.id}
                    primary={m.subject}
                    secondary={`${EMAIL_TEMPLATE_LABEL[m.template]}・${formatDateTime(m.sent_at)}`}
                    badge={<Badge variant="outline" className={cn('text-[10px]',
                      m.status === 'opened' ? 'text-success border-success' :
                      (m.status === 'failed' || m.status === 'bounced') ? 'text-warn border-warn' :
                      '')}>
                      {EMAIL_STATUS_LABEL[m.status]}
                    </Badge>}
                  />
                ))}
              </ul>
            )}
          </Section>

          {/* スタッフ操作履歴 */}
          <Section title="この会員への操作履歴" icon={<UserIcon className="h-3.5 w-3.5" aria-hidden />} count={auditEntries.length}>
            {auditEntries.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">操作履歴はありません</p>
            ) : (
              <ul className="space-y-2">
                {auditEntries.map((a) => (
                  <Row
                    key={a.id}
                    primary={AUDIT_ACTION_LABEL[a.action]}
                    secondary={`${a.operator_name}・${formatDateTime(a.occurred_at)}・${a.detail ?? ''}`}
                  />
                ))}
              </ul>
            )}
          </Section>
        </div>
      </main>
    </>
  );
}

function Section({ title, icon, count, children }: { title: string; icon: React.ReactNode; count?: number; children: React.ReactNode }) {
  return (
    <section className="mb-6 rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-baseline gap-2">
        {icon}
        <h2 className="text-xs font-mont uppercase tracking-[0.2em] text-muted-foreground">{title}</h2>
        {count !== undefined && (
          <span className="ml-auto font-mont text-[10px] text-muted-foreground">{count}件</span>
        )}
      </div>
      {children}
    </section>
  );
}

function Row({ primary, secondary, badge }: { primary: string; secondary: string; badge?: React.ReactNode }) {
  return (
    <li className="flex items-baseline gap-3 rounded-lg bg-muted/20 px-3 py-2">
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium truncate">{primary}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{secondary}</p>
      </div>
      {badge}
    </li>
  );
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
