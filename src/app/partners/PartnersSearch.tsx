'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Star, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  PARTNER_CATEGORY_LABEL,
  PARTNER_CATEGORY_DESC,
  type Partner,
  type PartnerCategory,
} from '@/lib/demo';

const CATEGORY_ORDER: PartnerCategory[] = [
  'facial', 'hair_removal', 'eyelash', 'eyebrow',
  'hair_salon', 'bodymake', 'fashion', 'communication',
];

type SortKey = 'rating' | 'review_count' | 'price_asc' | 'price_desc';

interface Props {
  partners: Partner[];
}

export function PartnersSearch({ partners }: Props) {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<PartnerCategory[]>([]);
  const [officialOnly, setOfficialOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('rating');

  const toggleCategory = (cat: PartnerCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const reset = () => {
    setQuery('');
    setSelectedCategories([]);
    setOfficialOnly(false);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = partners.filter((p) => {
      if (q) {
        const hay = [
          p.name, p.tagline, p.description, p.address, p.member_offer,
          PARTNER_CATEGORY_LABEL[p.category],
          PARTNER_CATEGORY_DESC[p.category],
        ].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      if (officialOnly && !p.is_owned) return false;
      return true;
    });

    return list.sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'review_count') return b.review_count - a.review_count;
      if (sort === 'price_asc') return a.base_price - b.base_price;
      if (sort === 'price_desc') return b.base_price - a.base_price;
      return 0;
    });
  }, [partners, query, selectedCategories, officialOnly, sort]);

  // カテゴリ別にグループ化（フィルタなし時のみ）
  const grouped = useMemo(() => {
    if (selectedCategories.length > 0 || query || officialOnly) return null;
    return CATEGORY_ORDER.map((cat) => ({
      category: cat,
      partners: filtered.filter((p) => p.category === cat),
    })).filter((g) => g.partners.length > 0);
  }, [filtered, selectedCategories, query, officialOnly]);

  const activeFilterCount =
    (query ? 1 : 0) +
    selectedCategories.length +
    (officialOnly ? 1 : 0);

  return (
    <>
      {/* 検索バー */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          placeholder="店舗名・サービス・エリアで検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-11"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="検索をクリア"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}
      </div>

      {/* カテゴリチップ */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <Chip
          active={officialOnly}
          onClick={() => setOfficialOnly(!officialOnly)}
        >
          公式のみ
        </Chip>
        {CATEGORY_ORDER.map((cat) => (
          <Chip
            key={cat}
            active={selectedCategories.includes(cat)}
            onClick={() => toggleCategory(cat)}
          >
            {PARTNER_CATEGORY_LABEL[cat]}
          </Chip>
        ))}
      </div>

      {/* 結果数＋ソート */}
      <div className="mt-6 flex items-baseline justify-between">
        <p className="text-sm">
          <span className="font-mont text-base font-medium">{filtered.length}</span>
          <span className="ml-2 text-xs text-muted-foreground">
            件 / {partners.length}件中
          </span>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="ml-3 text-xs font-medium underline-offset-4 hover:underline"
            >
              リセット
            </button>
          )}
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-8 rounded-md border border-border bg-background px-2 text-xs"
        >
          <option value="rating">評価が高い順</option>
          <option value="review_count">レビュー数順</option>
          <option value="price_asc">価格が安い順</option>
          <option value="price_desc">価格が高い順</option>
        </select>
      </div>

      {/* 結果 */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">条件に合う加盟店が見つかりませんでした</p>
            <button
              type="button"
              onClick={reset}
              className="mt-3 text-xs font-medium underline-offset-4 hover:underline"
            >
              絞り込みをリセット
            </button>
          </div>
        ) : grouped ? (
          // カテゴリ別表示（フィルタなし時）
          <>
            {grouped.map(({ category, partners: catPartners }) => (
              <section key={category} id={category} className="mb-12 scroll-mt-24">
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="text-base font-semibold tracking-tight">
                    {PARTNER_CATEGORY_LABEL[category]}
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {PARTNER_CATEGORY_DESC[category]}
                  </span>
                </div>
                <ul className="flex flex-col gap-3">
                  {catPartners.map((p) => <PartnerRow key={p.id} partner={p} />)}
                </ul>
              </section>
            ))}
          </>
        ) : (
          // フラットリスト（フィルタ時）
          <ul className="flex flex-col gap-3">
            {filtered.map((p) => <PartnerRow key={p.id} partner={p} showCategory />)}
          </ul>
        )}
      </div>
    </>
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
        'inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
}

function PartnerRow({ partner: p, showCategory = false }: { partner: Partner; showCategory?: boolean }) {
  return (
    <li>
      <Link
        href={`/partners/${p.id}`}
        className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-foreground/30"
      >
        <div className="flex aspect-square h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <span className="font-mont text-[10px] uppercase tracking-[0.2em]">
            {PARTNER_CATEGORY_LABEL[p.category].slice(0, 2)}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 min-w-0">
          <div className="flex items-baseline gap-2">
            <p className="truncate text-sm font-semibold">{p.name}</p>
            {p.is_owned && <Badge variant="goldSoft" className="text-[9px]">公式</Badge>}
            {showCategory && (
              <Badge variant="outline" className="text-[9px]">
                {PARTNER_CATEGORY_LABEL[p.category]}
              </Badge>
            )}
          </div>
          <p className="line-clamp-1 text-xs text-muted-foreground">{p.tagline}</p>
          <p className="line-clamp-1 text-[11px] font-medium">{p.member_offer}</p>
          <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" aria-hidden />
              {p.rating}
            </span>
            <span>{p.review_count}件のレビュー</span>
            <span className="font-mont">¥{p.base_price.toLocaleString()}〜</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
