import Link from 'next/link';
import { ArrowRight, ThumbsUp, AlertCircle, Quote } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  DEMO_DIMENSION_DETAILS,
  DEMO_PARTNERS,
  PARTNER_CATEGORY_LABEL,
  SCORE_DIMENSION_LABEL,
  SCORE_DIMENSION_DESC,
  SCORE_DIMENSION_REFERENCE,
  type ScoreDimension,
} from '@/lib/demo';

interface Props {
  dimension: ScoreDimension;
  score: number;
  averageScore: number;
}

export function DimensionDetail({ dimension, score, averageScore }: Props) {
  const detail = DEMO_DIMENSION_DETAILS[dimension];
  const diff = score - averageScore;

  return (
    <details className="group rounded-2xl border border-border bg-card overflow-hidden">
      <summary className="cursor-pointer list-none px-6 py-5 transition-colors hover:bg-muted/30">
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold">{SCORE_DIMENSION_LABEL[dimension]}</span>
            <span className="text-[10px] text-muted-foreground">{SCORE_DIMENSION_DESC[dimension]}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mont text-base font-medium">{score}</span>
            <span className="font-mont text-[10px] text-muted-foreground">
              {diff >= 0 ? '+' : ''}{diff}
            </span>
            <span className="ml-1 text-[10px] text-muted-foreground transition-transform group-open:rotate-180" aria-hidden>
              ▾
            </span>
          </div>
        </div>
      </summary>

      <div className="space-y-8 border-t border-border px-6 py-6">
        {/* 良かった点 */}
        {detail.positives.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
              <h4 className="text-[11px] font-semibold tracking-[0.1em]">良かった点</h4>
            </div>
            <ul className="flex flex-col gap-3">
              {detail.positives.map((p) => (
                <li key={p.tag} className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{p.tag}</span>
                    <span className="font-mont text-xs text-muted-foreground">{p.count}名</span>
                  </div>
                  {p.comments && p.comments.length > 0 && (
                    <ul className="flex flex-col gap-1 border-t border-border pt-2">
                      {p.comments.map((c, i) => (
                        <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                          <Quote className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 改善ポイント */}
        {detail.improvements.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
              <h4 className="text-[11px] font-semibold tracking-[0.1em]">改善ポイント</h4>
            </div>
            <ul className="flex flex-col gap-4">
              {detail.improvements.map((imp) => {
                const partner = imp.partnerCategory
                  ? DEMO_PARTNERS.find((p) => p.category === imp.partnerCategory)
                  : null;
                return (
                  <li key={imp.tag} className="flex flex-col gap-3 rounded-lg border border-border p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{imp.tag}</span>
                        <Badge variant="warnSoft" className="text-[9px]">指摘 {imp.count}名</Badge>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {imp.tip}
                    </p>

                    {imp.comments && imp.comments.length > 0 && (
                      <ul className="flex flex-col gap-1 border-t border-border pt-2">
                        {imp.comments.map((c, i) => (
                          <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                            <Quote className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {partner && (
                      <Link
                        href={`/partners/${partner.id}`}
                        className="flex items-center justify-between gap-3 rounded-lg bg-foreground/[0.04] px-4 py-3 text-xs transition-colors hover:bg-foreground/[0.08]"
                      >
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {imp.partnerCategory && PARTNER_CATEGORY_LABEL[imp.partnerCategory]} の加盟店
                          </span>
                          <span className="truncate font-medium">{partner.name}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <p className="text-[10px] text-muted-foreground">
          ref. {SCORE_DIMENSION_REFERENCE[dimension]}
        </p>
      </div>
    </details>
  );
}
