'use client';

import { useState } from 'react';
import { Sparkles, Check, X, Edit3, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  INTENTION_TAGS,
  INTENTION_TAG_LABEL,
  INTENTION_MIN_TAGS,
  INTENTION_MAX_TAGS,
  type IntentionTag,
  type EventIntention,
} from '@/lib/demo';

interface Props {
  initialIntention: EventIntention | null;
  eventToken: string;
  onSave: (intention: EventIntention) => void;
}

export function IntentionCard({ initialIntention, eventToken, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const isSet = initialIntention && initialIntention.tags.length > 0;

  if (editing || !isSet) {
    return (
      <IntentionEditor
        initial={initialIntention}
        eventToken={eventToken}
        onClose={() => setEditing(false)}
        onSave={(intention) => {
          onSave(intention);
          setEditing(false);
        }}
      />
    );
  }

  // 表示モード
  return (
    <section className="rounded-2xl border-2 border-rose bg-rose-50 p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose text-rose-foreground">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
          </span>
          <p className="text-xs font-mont uppercase tracking-[0.3em] text-rose">
            My Intention
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1 text-[10px] text-rose hover:underline"
        >
          <Edit3 className="h-3 w-3" aria-hidden />
          編集
        </button>
      </div>

      <p className="mb-3 text-sm font-semibold">今回の試み（成長目標）</p>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {initialIntention!.tags.map((tag) => (
          <Badge key={tag} variant="rose" className="text-[10px]">
            <Check className="mr-1 h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
            {INTENTION_TAG_LABEL[tag]}
          </Badge>
        ))}
      </div>

      {initialIntention!.free_note && (
        <div className="rounded-lg border border-rose/30 bg-background/60 px-3 py-2">
          <p className="text-[10px] font-medium text-muted-foreground mb-1">自由記述</p>
          <p className="text-xs leading-relaxed">{initialIntention!.free_note}</p>
        </div>
      )}

      <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
        ※ MIRAIZのコアメッセージ「未来を磨く」。会場でこの試みを意識すると、関係性の質が変わります。
      </p>
    </section>
  );
}

function IntentionEditor({
  initial,
  eventToken,
  onClose,
  onSave,
}: {
  initial: EventIntention | null;
  eventToken: string;
  onClose: () => void;
  onSave: (intention: EventIntention) => void;
}) {
  const [tags, setTags] = useState<IntentionTag[]>(initial?.tags ?? []);
  const [freeNote, setFreeNote] = useState<string>(initial?.free_note ?? '');
  const [saving, setSaving] = useState(false);

  const toggleTag = (tag: IntentionTag) => {
    setTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : prev.length < INTENTION_MAX_TAGS
        ? [...prev, tag]
        : prev
    );
  };

  const canSave = tags.length >= INTENTION_MIN_TAGS;

  const submit = () => {
    if (!canSave) return;
    setSaving(true);
    setTimeout(() => {
      onSave({
        event_token: eventToken,
        tags,
        free_note: freeNote.trim() || null,
        set_at: new Date().toISOString(),
        reviewed_at: initial?.reviewed_at ?? null,
        achieved_tags: initial?.achieved_tags ?? [],
      });
      setSaving(false);
    }, 600);
  };

  // カテゴリ別にグループ化
  const grouped = INTENTION_TAGS.reduce<Record<string, typeof INTENTION_TAGS>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  return (
    <section className="rounded-2xl border-2 border-rose bg-rose-50 p-5">
      <header className="mb-4 flex items-baseline justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-mont uppercase tracking-[0.3em] text-rose">
            Set Intention
          </p>
          <p className="text-sm font-semibold">今回のイベントで磨きたいこと</p>
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            {INTENTION_MIN_TAGS}〜{INTENTION_MAX_TAGS}個選択してください。<br />
            見た目はイベント前に準備、会話・行動は当日に意識する自分への約束です。
          </p>
        </div>
        {initial && (
          <button
            onClick={onClose}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="閉じる"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}
      </header>

      {/* カテゴリ別タグリスト */}
      <div className="mb-4 flex flex-col gap-3">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <p className="mb-1.5 text-[10px] font-medium text-muted-foreground">
              {category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((t) => {
                const on = tags.includes(t.value);
                const reachedMax = !on && tags.length >= INTENTION_MAX_TAGS;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => toggleTag(t.value)}
                    disabled={reachedMax}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
                      on
                        ? 'border-rose bg-rose text-rose-foreground'
                        : 'border-border bg-background hover:bg-muted',
                      reachedMax && 'opacity-30'
                    )}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mb-3 text-center text-[10px] text-muted-foreground">
        {tags.length}/{INTENTION_MAX_TAGS} 選択中
      </p>

      {/* 自由記述 */}
      <div className="mb-4">
        <label className="mb-1.5 block text-[10px] font-medium text-muted-foreground">
          自由記述（任意・自分への約束を一言）
        </label>
        <textarea
          value={freeNote}
          onChange={(e) => setFreeNote(e.target.value)}
          placeholder="例：相手の話に集中して、自分の話は3割に抑える"
          maxLength={120}
          rows={2}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <p className="mt-1 text-right text-[10px] text-muted-foreground">
          {freeNote.length}/120
        </p>
      </div>

      <Button fullWidth size="lg" disabled={!canSave || saving} onClick={submit} className="gap-2">
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Sparkles className="h-4 w-4" aria-hidden />
        )}
        {initial ? '更新する' : '今回の試みを設定'}
      </Button>

      <p className="mt-3 text-[10px] leading-relaxed text-center text-muted-foreground">
        MIRAIZ ＝ 未来 (mirai) ＋ 磨く (izu)<br />
        会う前に自分を整える。それが磨くということ。
      </p>
    </section>
  );
}
