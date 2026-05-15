'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Pin, Calendar, Sparkles, Megaphone, Wrench, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { cn } from '@/lib/utils';
import {
  DEMO_ANNOUNCEMENTS,
  ANNOUNCEMENT_CATEGORY_LABEL,
  type Announcement,
  type AnnouncementCategory,
} from '@/lib/demo';

const CATEGORY_ICON: Record<AnnouncementCategory, typeof Calendar> = {
  event: Calendar,
  feature: Sparkles,
  campaign: Megaphone,
  maintenance: Wrench,
  important: AlertCircle,
};

const CATEGORY_STYLE: Record<AnnouncementCategory, string> = {
  event: 'text-rose border-rose bg-rose-50',
  feature: 'text-info border-info-100 bg-info-50',
  campaign: 'text-success border-success bg-success/5',
  maintenance: 'text-muted-foreground border-border bg-muted/30',
  important: 'text-warn border-warn bg-warn-50',
};

type Filter = 'all' | AnnouncementCategory;

export default function NewsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(
    DEMO_ANNOUNCEMENTS.find((a) => a.pinned)?.id ?? null
  );

  const sorted = [...DEMO_ANNOUNCEMENTS].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });
  const filtered = filter === 'all' ? sorted : sorted.filter((a) => a.category === filter);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <Link href="/mypage" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />マイページ
          </Link>
          <header className="flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              News
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              お知らせ
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              運営からのお知らせ・新機能・イベント情報をお届けします。
            </p>
          </header>

          {/* カテゴリフィルタ */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip label="すべて" active={filter === 'all'} onClick={() => setFilter('all')} />
            {(Object.keys(ANNOUNCEMENT_CATEGORY_LABEL) as AnnouncementCategory[]).map((c) => (
              <Chip
                key={c}
                label={ANNOUNCEMENT_CATEGORY_LABEL[c]}
                active={filter === c}
                onClick={() => setFilter(c)}
              />
            ))}
          </div>

          {/* お知らせ一覧 */}
          <ul className="mt-6 flex flex-col gap-3">
            {filtered.length === 0 && (
              <li className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                該当するお知らせはありません
              </li>
            )}
            {filtered.map((a) => (
              <NewsCard
                key={a.id}
                item={a}
                open={openId === a.id}
                onToggle={() => setOpenId(openId === a.id ? null : a.id)}
              />
            ))}
          </ul>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function NewsCard({
  item,
  open,
  onToggle,
}: {
  item: Announcement;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = CATEGORY_ICON[item.category];

  return (
    <li className={cn('rounded-2xl border bg-card overflow-hidden', item.pinned ? 'border-rose/40' : 'border-border')}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-col gap-2 p-5 text-left transition-colors hover:bg-muted/30"
      >
        <div className="flex flex-wrap items-baseline gap-2">
          {item.pinned && (
            <Pin className="h-3 w-3 text-rose" strokeWidth={2} aria-hidden />
          )}
          <span
            className={cn(
              'inline-flex items-baseline gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium',
              CATEGORY_STYLE[item.category]
            )}
          >
            <Icon className="h-2.5 w-2.5" aria-hidden />
            {ANNOUNCEMENT_CATEGORY_LABEL[item.category]}
          </span>
          <span className="ml-auto font-mont text-[10px] text-muted-foreground">
            {formatDate(item.published_at)}
          </span>
        </div>
        <p className="text-sm font-semibold leading-snug">{item.title}</p>
        {!open && (
          <p className="line-clamp-1 text-[11px] text-muted-foreground">{item.body}</p>
        )}
      </button>
      {open && (
        <div className="border-t border-border px-5 py-4">
          <p className="whitespace-pre-wrap text-[13px] leading-relaxed">{item.body}</p>
        </div>
      )}
    </li>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-background hover:bg-muted'
      )}
    >
      {label}
    </button>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')}`;
}
