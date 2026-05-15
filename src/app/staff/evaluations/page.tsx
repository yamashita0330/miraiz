'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Heart, Sparkles, ShieldAlert, Download } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEMO_EVALUATION_FEED, DEMO_CONCERNING_USERS, type EvaluationFeedItem } from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

type FilterTab = 'all' | 'concerning' | 'mutual_match';
type EventFilter = 'all' | string;

export default function EvaluationsPage() {
  const [tab, setTab] = useState<FilterTab>('all');
  const [eventFilter, setEventFilter] = useState<EventFilter>('all');

  const events = useMemo(() => {
    const map = new Map<string, string>();
    DEMO_EVALUATION_FEED.forEach((e) => map.set(e.event_token, e.event_name));
    return Array.from(map.entries());
  }, []);

  const filtered = useMemo(() => {
    return DEMO_EVALUATION_FEED.filter((e) => {
      if (eventFilter !== 'all' && e.event_token !== eventFilter) return false;
      if (tab === 'concerning' && e.flag !== 'concerning') return false;
      if (tab === 'mutual_match' && e.flag !== 'mutual_match') return false;
      return true;
    });
  }, [tab, eventFilter]);

  const counts = {
    all: DEMO_EVALUATION_FEED.length,
    concerning: DEMO_EVALUATION_FEED.filter((e) => e.flag === 'concerning').length,
    mutual: DEMO_EVALUATION_FEED.filter((e) => e.flag === 'mutual_match').length,
  };

  const concerningUsers = DEMO_CONCERNING_USERS;

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">相互評価管理</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `evaluations_${todayStamp()}.csv`,
                  filtered.map((e) => ({
                    id: e.id,
                    submitted_at: e.submitted_at,
                    event_name: e.event_name,
                    evaluator_name: e.evaluator_name,
                    evaluator_gender: e.evaluator_gender === 'male' ? '男性' : '女性',
                    partner_name: e.partner_name,
                    appearance_score: e.appearance_score,
                    talkability_score: e.talkability_score,
                    want_contact: e.want_contact ? 'はい' : 'いいえ',
                    comfortable: e.comfortable ? 'はい' : 'いいえ',
                    was_listened: e.was_listened ? 'はい' : 'いいえ',
                    not_judged: e.not_judged ? 'はい' : 'いいえ',
                    shared_topics: e.shared_topics ? 'はい' : 'いいえ',
                    reasons: e.reasons.join('・'),
                    attractive_tags: e.attractive_tags.join('・'),
                    improve_tags: e.improve_tags.join('・'),
                    impression_keyword: e.impression_keyword ?? '',
                    flag: e.flag === 'mutual_match' ? '相互ライク' : e.flag === 'concerning' ? '要注意' : '通常',
                  })),
                  [
                    { key: 'id', label: 'ID' },
                    { key: 'submitted_at', label: '提出日時' },
                    { key: 'event_name', label: 'イベント' },
                    { key: 'evaluator_name', label: '評価者' },
                    { key: 'evaluator_gender', label: '性別' },
                    { key: 'partner_name', label: '対象' },
                    { key: 'appearance_score', label: '見た目' },
                    { key: 'talkability_score', label: '話しやすさ' },
                    { key: 'want_contact', label: '連絡先希望' },
                    { key: 'comfortable', label: '居心地' },
                    { key: 'was_listened', label: '聞かれた' },
                    { key: 'not_judged', label: '否定されず' },
                    { key: 'shared_topics', label: '共通話題' },
                    { key: 'reasons', label: '理由' },
                    { key: 'attractive_tags', label: '魅力的' },
                    { key: 'improve_tags', label: '磨きどころ' },
                    { key: 'impression_keyword', label: '印象' },
                    { key: 'flag', label: 'フラグ' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">MID評価フィード・要注意ユーザー検出・相互ライク確認</p>

          {/* 要注意ユーザー */}
          {concerningUsers.length > 0 && (
            <section className="mb-8 rounded-2xl border-2 border-warn bg-warn-50 p-5">
              <div className="mb-3 flex items-baseline gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-warn" strokeWidth={1.6} aria-hidden />
                <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-warn">要注意ユーザー（複数の低評価）</h2>
              </div>
              <ul className="space-y-3">
                {concerningUsers.map((u) => (
                  <li key={u.user_id} className="rounded-xl border border-warn/40 bg-background p-4">
                    <div className="mb-2 flex flex-wrap items-baseline gap-3">
                      <span className="text-sm font-semibold">{u.user_name}</span>
                      <span className="font-mont text-[10px] text-muted-foreground">{u.user_id}</span>
                      {u.reports_count > 0 && (
                        <Badge variant="outline" className="text-[10px] text-warn border-warn">通報{u.reports_count}件</Badge>
                      )}
                      <span className="ml-auto font-mont text-[10px] text-muted-foreground">評価{u.total_evaluations}件</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] mb-2 md:grid-cols-5">
                      <Mini label="平均見た目" value={u.avg_appearance.toFixed(1)} warn={u.avg_appearance < 5} />
                      <Mini label="平均話しやすさ" value={u.avg_talkability.toFixed(1)} warn={u.avg_talkability < 5} />
                      <Mini label="居心地× " value={`${u.comfortable_false_count}/${u.total_evaluations}`} warn />
                      <Mini label="聞かれず×" value={`${u.was_listened_false_count}/${u.total_evaluations}`} warn />
                      <Mini label="否定された×" value={`${u.not_judged_false_count}/${u.total_evaluations}`} warn />
                    </div>
                    {u.recurring_improve_tags.length > 0 && (
                      <p className="text-[10px]">
                        <span className="text-muted-foreground">頻出磨きどころ：</span>
                        {u.recurring_improve_tags.map((t) => (
                          <Badge key={t} variant="outline" className="ml-1.5 text-[10px]">{t}</Badge>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* タブ */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Chip label={`全て ${counts.all}`} active={tab === 'all'} onClick={() => setTab('all')} />
            <Chip label={`相互ライク ${counts.mutual}`} active={tab === 'mutual_match'} onClick={() => setTab('mutual_match')} />
            <Chip label={`要注意 ${counts.concerning}`} active={tab === 'concerning'} onClick={() => setTab('concerning')} warn />
          </div>

          {/* イベントフィルタ */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Chip label="全イベント" active={eventFilter === 'all'} onClick={() => setEventFilter('all')} small />
            {events.map(([token, name]) => (
              <Chip key={token} label={name} active={eventFilter === token} onClick={() => setEventFilter(token)} small />
            ))}
          </div>

          {/* 評価フィード */}
          <ul className="flex flex-col gap-3">
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                該当する評価はありません
              </p>
            )}
            {filtered.map((e) => <EvalCard key={e.id} ev={e} />)}
          </ul>
        </div>
      </main>
    </>
  );
}

function EvalCard({ ev }: { ev: EvaluationFeedItem }) {
  const isConcerning = ev.flag === 'concerning';
  const isMutual = ev.flag === 'mutual_match';
  const psychSafetyAll = ev.comfortable && ev.was_listened && ev.not_judged;

  return (
    <li className={cn(
      'rounded-2xl border p-5',
      isConcerning ? 'border-warn bg-warn-50/50' :
      isMutual ? 'border-rose bg-rose-50/40' :
      'border-border bg-card'
    )}>
      <div className="mb-3 flex flex-wrap items-baseline gap-2">
        <span className="font-mont text-[10px] text-muted-foreground">{ev.id}</span>
        <Badge variant="outline" className="text-[10px]">{ev.event_name}</Badge>
        {isConcerning && (
          <Badge variant="outline" className="text-[10px] text-warn border-warn gap-1">
            <AlertTriangle className="h-2.5 w-2.5" aria-hidden />要注意
          </Badge>
        )}
        {isMutual && (
          <Badge variant="rose" className="text-[10px] gap-1">
            <Heart className="h-2.5 w-2.5" aria-hidden />相互ライク
          </Badge>
        )}
        <span className="ml-auto font-mont text-[10px] text-muted-foreground">{formatDateTime(ev.submitted_at)}</span>
      </div>

      <div className="mb-3 flex items-baseline gap-2 text-sm">
        <span className="font-medium">{ev.evaluator_name}</span>
        <span className="text-[10px] text-muted-foreground">（{ev.evaluator_gender === 'male' ? '男性' : '女性'}）</span>
        <span className="text-muted-foreground text-xs">→</span>
        <span className="font-medium">{ev.partner_name}</span>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-3">
        <ScoreBox label="見た目" value={ev.appearance_score} max={10} concerning={ev.appearance_score < 5} />
        <ScoreBox label="話しやすさ" value={ev.talkability_score} max={10} concerning={ev.talkability_score < 5} />
        <div className="rounded-lg bg-muted/30 px-3 py-2">
          <p className="text-[10px] text-muted-foreground">連絡先</p>
          <p className={cn('mt-0.5 text-sm font-medium', ev.want_contact ? 'text-success' : 'text-muted-foreground')}>
            {ev.want_contact ? '交換希望' : '希望せず'}
          </p>
        </div>
      </div>

      {/* 心理的安全性チェック */}
      <div className="mb-3 flex flex-wrap gap-2 text-[10px]">
        <Tag label="居心地◯" ok={ev.comfortable} />
        <Tag label="聞いてもらえた" ok={ev.was_listened} />
        <Tag label="否定されず" ok={ev.not_judged} />
        <Tag label="共通の話題" ok={ev.shared_topics} />
        {psychSafetyAll && (
          <Badge variant="outline" className="text-[10px] text-success border-success gap-1">
            <Sparkles className="h-2.5 w-2.5" aria-hidden />心理的安全性◎
          </Badge>
        )}
      </div>

      {(ev.attractive_tags.length > 0 || ev.improve_tags.length > 0) && (
        <div className="mb-3 grid grid-cols-2 gap-3 text-[10px]">
          {ev.attractive_tags.length > 0 && (
            <div>
              <p className="text-muted-foreground mb-1">魅力的：</p>
              <div className="flex flex-wrap gap-1">
                {ev.attractive_tags.map((t) => <Badge key={t} variant="rose" className="text-[10px]">{t}</Badge>)}
              </div>
            </div>
          )}
          {ev.improve_tags.length > 0 && (
            <div>
              <p className="text-muted-foreground mb-1">磨きどころ：</p>
              <div className="flex flex-wrap gap-1">
                {ev.improve_tags.map((t) => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
              </div>
            </div>
          )}
        </div>
      )}

      {ev.reasons.length > 0 && (
        <div className="mb-2 text-[10px]">
          <span className="text-muted-foreground">理由：</span>
          {ev.reasons.map((r) => (
            <span key={r} className="ml-1.5 inline-flex items-baseline rounded-full border border-border px-2 py-0.5">{r}</span>
          ))}
        </div>
      )}

      {ev.impression_keyword && (
        <p className="rounded-lg border border-border bg-background px-3 py-2 text-[11px] italic">
          「{ev.impression_keyword}」
        </p>
      )}
    </li>
  );
}

function ScoreBox({ label, value, max, concerning }: { label: string; value: number; max: number; concerning?: boolean }) {
  return (
    <div className={cn('rounded-lg px-3 py-2', concerning ? 'bg-warn-50 border border-warn/40' : 'bg-muted/30')}>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className={cn('mt-0.5 font-mont text-sm font-semibold', concerning && 'text-warn')}>
        {value}<span className="text-[10px] text-muted-foreground"> / {max}</span>
      </p>
    </div>
  );
}

function Tag({ label, ok }: { label: string; ok: boolean }) {
  return (
    <span className={cn(
      'inline-flex items-baseline rounded-full px-2 py-0.5 border',
      ok ? 'border-success/40 text-success bg-success/5' : 'border-warn/40 text-warn bg-warn/5'
    )}>
      {ok ? '✓' : '×'} {label}
    </span>
  );
}

function Mini({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/30 px-2 py-1.5">
      <p className="text-[9px] text-muted-foreground">{label}</p>
      <p className={cn('font-mont mt-0.5 text-xs font-medium', warn && 'text-warn')}>{value}</p>
    </div>
  );
}

function Chip({ label, active, onClick, warn, small }: { label: string; active: boolean; onClick: () => void; warn?: boolean; small?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border font-medium transition-colors',
        small ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]',
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
