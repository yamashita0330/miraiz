'use client';

import { useState } from 'react';
import { Quote, ThumbsUp, MessageSquare } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import {
  DEMO_EVENT_COMMENTS,
  SCORE_DIMENSION_LABEL,
  type EventComment,
  type ScoreDimension,
} from '@/lib/demo';

type Filter = 'all' | 'positive' | 'constructive';

const DIMENSION_ORDER: ScoreDimension[] = [
  'appearance', 'talkability', 'gottman', 'comfort', 'timeless', 'safety',
];

export function EventComments({ initialFilter = 'all' }: { initialFilter?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [dim, setDim] = useState<ScoreDimension | 'all'>('all');

  const filtered = DEMO_EVENT_COMMENTS.filter((c) => {
    if (filter !== 'all' && c.type !== filter) return false;
    if (dim !== 'all' && c.dimension !== dim) return false;
    return true;
  });

  const positiveCount = DEMO_EVENT_COMMENTS.filter((c) => c.type === 'positive').length;
  const constructiveCount = DEMO_EVENT_COMMENTS.filter((c) => c.type === 'constructive').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          Voices from the Event
        </h3>
        <span className="font-mont text-xs text-muted-foreground">
          {filtered.length}件
        </span>
      </div>

      {/* フィルタ */}
      <div className="flex gap-2">
        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
          <MessageSquare className="h-3 w-3" aria-hidden />
          すべて {DEMO_EVENT_COMMENTS.length}
        </Chip>
        <Chip active={filter === 'positive'} onClick={() => setFilter('positive')}>
          <ThumbsUp className="h-3 w-3" aria-hidden />
          ポジティブ {positiveCount}
        </Chip>
        <Chip active={filter === 'constructive'} onClick={() => setFilter('constructive')}>
          建設的 {constructiveCount}
        </Chip>
      </div>

      {/* 次元フィルタ */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <DimChip active={dim === 'all'} onClick={() => setDim('all')}>すべて</DimChip>
        {DIMENSION_ORDER.map((d) => (
          <DimChip key={d} active={dim === d} onClick={() => setDim(d)}>
            {SCORE_DIMENSION_LABEL[d]}
          </DimChip>
        ))}
      </div>

      {/* コメント一覧 */}
      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
          条件に合うコメントがありません
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((c) => <CommentRow key={c.id} comment={c} />)}
        </ul>
      )}

      <p className="text-[10px] leading-relaxed text-muted-foreground">
        ※ コメントは匿名で表示されます。投稿者の特定はできません。<br />
        ※ 不適切なコメントは運営が削除します。
      </p>
    </div>
  );
}

function CommentRow({ comment }: { comment: EventComment }) {
  const isPositive = comment.type === 'positive';
  return (
    <li className="flex gap-3 rounded-2xl border border-border bg-card p-5">
      <Quote
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0',
          isPositive ? 'text-foreground' : 'text-muted-foreground'
        )}
        aria-hidden
      />
      <div className="flex flex-1 flex-col gap-3">
        <p className="text-sm leading-relaxed">{comment.text}</p>
        <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
          <Badge variant={isPositive ? 'successSoft' : 'warnSoft'} className="text-[9px]">
            {isPositive ? 'ポジティブ' : '建設的'}
          </Badge>
          {comment.dimension && (
            <Badge variant="outline" className="text-[9px]">
              {SCORE_DIMENSION_LABEL[comment.dimension]}
            </Badge>
          )}
          <span>
            {comment.fromGender === 'female' ? '女性' : '男性'}・{comment.fromAgeRange}
          </span>
        </div>
      </div>
    </li>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
}

function DimChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-[11px] transition-colors',
        active
          ? 'border-foreground bg-foreground/[0.05] text-foreground'
          : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
}
