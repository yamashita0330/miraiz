'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, Video, ShieldCheck, Heart, Layers } from 'lucide-react';
import { ProfileCard } from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { HOPE_TYPES, type HopeType } from '@/lib/constants';
import type { UserProfile } from '@/lib/types';
import { compatibility } from '@/lib/compatibility';
import { DEMO_ME } from '@/lib/demo';

type SortKey = 'compatibility' | 'new' | 'age_asc' | 'age_desc' | 'completion';

interface Props {
  members: UserProfile[];
  mutualIds: string[];
  prefectures: string[];
}

const QUICK_FILTERS: { key: keyof FilterState; label: string }[] = [
  { key: 'hasVideo', label: '動画あり' },
  { key: 'verified', label: '本人確認済' },
  { key: 'mutualOnly', label: '両想いのみ' },
  { key: 'seriousOnly', label: '本気度3以上' },
  { key: 'tokushimaOnly', label: '徳島県のみ' },
];

interface FilterState {
  q: string;
  ageMin: number;
  ageMax: number;
  prefectures: string[];
  hopeTypes: HopeType[];
  marriageMin: number;
  wantChildren: ('yes' | 'maybe' | 'no')[];
  smokingNo: boolean;
  hasVideo: boolean;
  verified: boolean;
  mutualOnly: boolean;
  seriousOnly: boolean;
  tokushimaOnly: boolean;
  sort: SortKey;
}

const DEFAULT_FILTERS: FilterState = {
  q: '',
  ageMin: 20,
  ageMax: 49,
  prefectures: [],
  hopeTypes: [],
  marriageMin: 0,
  wantChildren: [],
  smokingNo: false,
  hasVideo: false,
  verified: false,
  mutualOnly: false,
  seriousOnly: false,
  tokushimaOnly: false,
  sort: 'compatibility',
};

export function HomeSearch({ members, mutualIds, prefectures }: Props) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [open, setOpen] = useState(false);
  const mutualSet = useMemo(() => new Set(mutualIds), [mutualIds]);

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const togglePref = (pref: string) =>
    setFilters((prev) => ({
      ...prev,
      prefectures: prev.prefectures.includes(pref)
        ? prev.prefectures.filter((p) => p !== pref)
        : [...prev.prefectures, pref],
    }));

  const toggleHope = (h: HopeType) =>
    setFilters((prev) => ({
      ...prev,
      hopeTypes: prev.hopeTypes.includes(h)
        ? prev.hopeTypes.filter((x) => x !== h)
        : [...prev.hopeTypes, h],
    }));

  const toggleWantChildren = (v: 'yes' | 'maybe' | 'no') =>
    setFilters((prev) => ({
      ...prev,
      wantChildren: prev.wantChildren.includes(v)
        ? prev.wantChildren.filter((x) => x !== v)
        : [...prev.wantChildren, v],
    }));

  const reset = () => setFilters(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const list = members.filter((m) => {
      if (q) {
        const hay = [
          m.name, m.bio, m.occupation, m.hometown, m.prefecture,
          (m.hobbies ?? []).join(' '),
          (m.personality_tags ?? []).join(' '),
        ].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (m.age < filters.ageMin || m.age > filters.ageMax) return false;
      if (filters.prefectures.length > 0 && !filters.prefectures.includes(m.prefecture)) return false;
      if (filters.tokushimaOnly && m.prefecture !== '徳島県') return false;
      if (filters.hopeTypes.length > 0 && !filters.hopeTypes.includes(m.hope_type)) return false;
      if (filters.marriageMin > 0 && (!m.marriage_intent || m.marriage_intent < filters.marriageMin)) return false;
      if (filters.seriousOnly && (!m.marriage_intent || m.marriage_intent < 3)) return false;
      if (filters.wantChildren.length > 0 && (!m.want_children || !filters.wantChildren.includes(m.want_children as any))) return false;
      if (filters.smokingNo && m.smoking !== 'no') return false;
      if (filters.hasVideo && !m.video_intro_url) return false;
      if (filters.mutualOnly && !mutualSet.has(m.id)) return false;
      // verified: 全員 verified 扱い（モック都合）
      return true;
    });

    const completionOf = (m: UserProfile) => {
      const fields = [
        m.occupation, m.education, m.income, m.height, m.smoking, m.drinking,
        m.hometown, m.body_type, m.blood_type, m.siblings, m.holiday_type, m.pets,
        m.marriage_intent, m.want_children, m.work_after_marriage, m.living_arrangement,
        m.mbti, m.video_intro_url,
      ].filter((v) => v !== '' && v !== null && v !== undefined).length;
      return fields + (m.hobbies?.length ? 1 : 0) + (m.personality_tags?.length ? 1 : 0) + (m.languages?.length ? 1 : 0);
    };

    const compatOf = (m: UserProfile) => compatibility(DEMO_ME, m).total;

    return list.sort((a, b) => {
      if (filters.sort === 'compatibility') return compatOf(b) - compatOf(a);
      if (filters.sort === 'age_asc') return a.age - b.age;
      if (filters.sort === 'age_desc') return b.age - a.age;
      if (filters.sort === 'completion') return completionOf(b) - completionOf(a);
      return b.created_at.localeCompare(a.created_at);
    });
  }, [members, filters, mutualSet]);

  const activeChipCount =
    (filters.q ? 1 : 0) +
    (filters.prefectures.length > 0 ? 1 : 0) +
    (filters.hopeTypes.length > 0 ? 1 : 0) +
    (filters.marriageMin > 0 ? 1 : 0) +
    (filters.wantChildren.length > 0 ? 1 : 0) +
    (filters.smokingNo ? 1 : 0) +
    (filters.hasVideo ? 1 : 0) +
    (filters.verified ? 1 : 0) +
    (filters.mutualOnly ? 1 : 0) +
    (filters.seriousOnly ? 1 : 0) +
    (filters.tokushimaOnly ? 1 : 0) +
    ((filters.ageMin !== DEFAULT_FILTERS.ageMin || filters.ageMax !== DEFAULT_FILTERS.ageMax) ? 1 : 0);

  return (
    <>
      {/* ビュー切替 */}
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-full border border-border bg-muted/40 p-1">
        <button
          type="button"
          aria-current="page"
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-background text-xs font-medium shadow-sm"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
          リスト
        </button>
        <Link
          href="/swipe"
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full text-xs font-medium text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground"
        >
          <Layers className="h-3.5 w-3.5" aria-hidden />
          スワイプ
        </Link>
      </div>

      {/* 検索バー */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            placeholder="名前・趣味・職業で検索"
            value={filters.q}
            onChange={(e) => set('q', e.target.value)}
            className="pl-11 pr-4"
          />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted"
          aria-label="絞り込み"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          {activeChipCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 font-mont text-[10px] text-background">
              {activeChipCount}
            </span>
          )}
        </button>
      </div>

      {/* クイックフィルタ chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {QUICK_FILTERS.map(({ key, label }) => {
          const active = filters[key] === true;
          return (
            <button
              key={key}
              type="button"
              onClick={() => set(key as any, !active)}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors',
                active
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
              )}
            >
              {key === 'hasVideo' && <Video className="h-3 w-3" aria-hidden />}
              {key === 'verified' && <ShieldCheck className="h-3 w-3" aria-hidden />}
              {key === 'mutualOnly' && <Heart className="h-3 w-3" aria-hidden />}
              {label}
            </button>
          );
        })}
      </div>

      {/* 結果数＋ソート */}
      <div className="mt-8 flex items-baseline justify-between">
        <p className="text-sm">
          <span className="font-mont text-base font-medium">{filtered.length}</span>
          <span className="ml-2 text-xs text-muted-foreground">件 / {members.length}件中</span>
        </p>
        <select
          value={filters.sort}
          onChange={(e) => set('sort', e.target.value as SortKey)}
          className="h-8 rounded-md border border-border bg-background px-2 text-xs"
        >
          <option value="compatibility">相性が高い順</option>
          <option value="new">新着順</option>
          <option value="completion">プロフィール充実度順</option>
          <option value="age_asc">年齢が若い順</option>
          <option value="age_desc">年齢が年上順</option>
        </select>
      </div>

      {/* 結果グリッド */}
      <div className="mt-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">条件に合う相手が見つかりませんでした</p>
            <button
              type="button"
              onClick={reset}
              className="mt-3 text-xs font-medium underline-offset-4 hover:underline"
            >
              絞り込みをリセット
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((m) => (
              <ProfileCard
                key={m.id}
                user={m}
                mutual={mutualSet.has(m.id)}
                compatibility={compatibility(DEMO_ME, m).total}
              />
            ))}
          </div>
        )}
      </div>

      {/* 高度な絞り込みシート */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-2xl border border-border bg-background sm:rounded-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-6 py-5">
              <h2 className="text-base font-semibold tracking-tight">絞り込み</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  リセット
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="閉じる"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-12 px-6 py-8">
              <FilterSection title="年齢">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">最少</Label>
                    <Input
                      type="number"
                      min={20}
                      max={99}
                      value={filters.ageMin}
                      onChange={(e) => set('ageMin', Number(e.target.value) || 20)}
                      className="font-mont"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">最大</Label>
                    <Input
                      type="number"
                      min={20}
                      max={99}
                      value={filters.ageMax}
                      onChange={(e) => set('ageMax', Number(e.target.value) || 49)}
                      className="font-mont"
                    />
                  </div>
                </div>
              </FilterSection>

              <FilterSection title="居住地">
                <div className="flex flex-wrap gap-2">
                  {prefectures.map((p) => {
                    const active = filters.prefectures.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => togglePref(p)}
                        className={cn(
                          'inline-flex items-center rounded-full border px-3 py-1.5 text-xs transition-colors',
                          active
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                        )}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </FilterSection>

              <FilterSection title="希望タイプ">
                <div className="grid grid-cols-2 gap-2">
                  {HOPE_TYPES.map((h) => {
                    const active = filters.hopeTypes.includes(h.value);
                    return (
                      <button
                        key={h.value}
                        type="button"
                        onClick={() => toggleHope(h.value)}
                        className={cn(
                          'flex flex-col gap-0.5 rounded-lg border p-3 text-left transition-colors',
                          active
                            ? 'border-foreground bg-foreground/[0.03]'
                            : 'border-border hover:bg-muted'
                        )}
                      >
                        <span className="text-xs font-semibold">{h.label}</span>
                        <span className="text-[10px] text-muted-foreground">{h.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </FilterSection>

              <FilterSection title="結婚への意欲（最低）">
                <div className="grid grid-cols-5 gap-2">
                  {[0, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => set('marriageMin', n)}
                      className={cn(
                        'h-11 rounded-lg border text-xs font-medium transition-colors',
                        filters.marriageMin === n
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:bg-muted'
                      )}
                    >
                      {n === 0 ? '指定なし' : `★${n}+`}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  ★5=すぐにでも／★4=1年以内／★3=2〜3年以内
                </p>
              </FilterSection>

              <FilterSection title="子供の希望">
                <div className="grid grid-cols-3 gap-2">
                  {(['yes', 'maybe', 'no'] as const).map((v) => {
                    const label = { yes: 'ほしい', maybe: 'どちらかと言うと', no: '希望しない' }[v];
                    const active = filters.wantChildren.includes(v);
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => toggleWantChildren(v)}
                        className={cn(
                          'h-11 rounded-lg border px-2 text-xs font-medium transition-colors',
                          active
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border hover:bg-muted'
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </FilterSection>

              <FilterSection title="その他">
                <div className="flex flex-col gap-3">
                  <ToggleRow label="非喫煙者のみ" checked={filters.smokingNo} onChange={(v) => set('smokingNo', v)} />
                  <ToggleRow label="動画自己紹介あり" checked={filters.hasVideo} onChange={(v) => set('hasVideo', v)} />
                  <ToggleRow label="本人確認済のみ" checked={filters.verified} onChange={(v) => set('verified', v)} />
                </div>
              </FilterSection>
            </div>

            <div className="sticky bottom-0 z-10 border-t border-border bg-background px-6 py-5">
              <Button fullWidth size="lg" onClick={() => setOpen(false)}>
                {filtered.length}件を表示
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-left transition-colors hover:bg-muted"
    >
      <span className="text-sm">{label}</span>
      <Badge variant={checked ? 'accent' : 'soft'} className="text-[10px]">
        {checked ? 'ON' : 'OFF'}
      </Badge>
    </button>
  );
}
