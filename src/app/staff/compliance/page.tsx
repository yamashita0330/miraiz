'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Upload, AlertTriangle, CheckCircle2, Building2, Receipt, Scale, ScrollText, ShieldCheck, FileArchive, FileLock, Calculator, Camera } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_COMPLIANCE_DOCS,
  COMPLIANCE_DOC_CATEGORY_LABEL,
  type ComplianceDoc,
  type ComplianceDocCategory,
} from '@/lib/demo';

const CATEGORY_ICONS: Record<ComplianceDocCategory, LucideIcon> = {
  business_license: Building2,
  invoice_registration: Receipt,
  tokutei_disclosure: Scale,
  gaiyou_document: ScrollText,
  contract_document: ScrollText,
  privacy_policy: ShieldCheck,
  terms_of_service: ShieldCheck,
  photo_consent: Camera,
  identity_log: FileLock,
  audit_archive: FileArchive,
  tax_certificate: Calculator,
};

export default function CompliancePage() {
  const [filter, setFilter] = useState<ComplianceDocCategory | 'all'>('all');

  const docs = DEMO_COMPLIANCE_DOCS;
  const filtered = filter === 'all' ? docs : docs.filter((d) => d.category === filter);

  const expiringSoon = docs.filter((d) => d.status === 'expiring_soon');
  const expired = docs.filter((d) => d.status === 'expired');

  const requiredCategories: ComplianceDocCategory[] = [
    'business_license',
    'invoice_registration',
    'tokutei_disclosure',
    'gaiyou_document',
    'contract_document',
    'privacy_policy',
    'terms_of_service',
    'photo_consent',
  ];
  const missing = requiredCategories.filter((cat) => !docs.some((d) => d.category === cat && d.status === 'active'));

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">法令証跡ホルダー</h1>
          <p className="mb-8 text-xs text-muted-foreground">届出書・契約書面・本人確認ログ・監査アーカイブの集中管理</p>

          {/* 警告バー */}
          {(missing.length > 0 || expired.length > 0 || expiringSoon.length > 0) && (
            <section className="mb-6 rounded-2xl border-2 border-warn bg-warn-50 p-5">
              <div className="flex items-baseline gap-2 text-warn mb-3">
                <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                <p className="text-xs font-semibold">要対応</p>
              </div>
              <ul className="space-y-1.5 text-xs">
                {missing.length > 0 && (
                  <li className="text-warn">
                    必須書類が未登録：{missing.map((c) => COMPLIANCE_DOC_CATEGORY_LABEL[c]).join('・')}
                  </li>
                )}
                {expired.map((d) => (
                  <li key={d.id} className="text-warn">期限切れ：{d.title}</li>
                ))}
                {expiringSoon.map((d) => (
                  <li key={d.id}>更新間近：{d.title}（{d.expires_at}）</li>
                ))}
              </ul>
            </section>
          )}

          {/* サマリー */}
          <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="登録書類" value={`${docs.length}件`} icon={<FileText className="h-3.5 w-3.5" />} />
            <Stat label="有効" value={`${docs.filter((d) => d.status === 'active').length}件`} icon={<CheckCircle2 className="h-3.5 w-3.5 text-success" />} />
            <Stat label="更新間近" value={`${expiringSoon.length}件`} alert={expiringSoon.length > 0} />
            <Stat label="必須未登録" value={`${missing.length}件`} alert={missing.length > 0} />
          </section>

          {/* カテゴリフィルタ */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Chip label="全て" active={filter === 'all'} onClick={() => setFilter('all')} />
            {Object.entries(COMPLIANCE_DOC_CATEGORY_LABEL).map(([key, label]) => (
              <Chip
                key={key}
                label={label}
                active={filter === key}
                onClick={() => setFilter(key as ComplianceDocCategory)}
                small
              />
            ))}
          </div>

          {/* 書類一覧 */}
          <ul className="flex flex-col gap-3">
            {filtered.length === 0 && (
              <li className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                該当する書類はありません
              </li>
            )}
            {filtered.map((d) => <DocCard key={d.id} doc={d} />)}
          </ul>

          {/* アップロードボタン */}
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="gap-2">
              <Upload className="h-3.5 w-3.5" aria-hidden />新規書類をアップロード
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

function DocCard({ doc }: { doc: ComplianceDoc }) {
  const Icon = CATEGORY_ICONS[doc.category] ?? FileText;
  const isWarn = doc.status === 'expired' || doc.status === 'expiring_soon' || doc.status === 'pending';

  return (
    <li className={cn(
      'rounded-2xl border p-5',
      doc.status === 'expired' ? 'border-warn bg-warn-50' :
      doc.status === 'expiring_soon' ? 'border-warn/40 bg-warn-50/50' :
      'border-border bg-card'
    )}>
      <div className="mb-3 flex flex-wrap items-baseline gap-3">
        <Icon className={cn('h-4 w-4', isWarn ? 'text-warn' : 'text-muted-foreground')} strokeWidth={1.6} aria-hidden />
        <span className="font-mont text-[10px] uppercase tracking-wider text-muted-foreground">
          {COMPLIANCE_DOC_CATEGORY_LABEL[doc.category]}
        </span>
        <Badge variant="outline" className={cn('text-[10px]',
          doc.status === 'active' ? 'text-success border-success' :
          doc.status === 'expired' ? 'text-warn border-warn' :
          doc.status === 'expiring_soon' ? 'text-warn border-warn' :
          'text-muted-foreground'
        )}>
          {doc.status === 'active' ? '有効' :
           doc.status === 'expired' ? '期限切れ' :
           doc.status === 'expiring_soon' ? '更新間近' : '保留中'}
        </Badge>
      </div>

      <h3 className="mb-2 text-sm font-semibold">{doc.title}</h3>

      <div className="mb-3 grid grid-cols-2 gap-3 rounded-lg bg-muted/30 px-3 py-2 text-[10px] md:grid-cols-4">
        {doc.authority && (
          <div>
            <p className="text-muted-foreground">発行機関</p>
            <p className="font-mont mt-0.5">{doc.authority}</p>
          </div>
        )}
        {doc.reference_number && (
          <div>
            <p className="text-muted-foreground">受理番号</p>
            <p className="font-mont mt-0.5">{doc.reference_number}</p>
          </div>
        )}
        {doc.issued_at && (
          <div>
            <p className="text-muted-foreground">発行日</p>
            <p className="font-mont mt-0.5">{doc.issued_at}</p>
          </div>
        )}
        {doc.expires_at && (
          <div>
            <p className="text-muted-foreground">保管期限</p>
            <p className="font-mont mt-0.5">{doc.expires_at}</p>
          </div>
        )}
      </div>

      {doc.notes && (
        <p className="mb-3 rounded-lg border border-border bg-background px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
          {doc.notes}
        </p>
      )}

      <div className="flex items-baseline justify-between text-[10px]">
        <p className="text-muted-foreground">
          {doc.file_name && (
            <span className="font-mont">{doc.file_name}</span>
          )}
          {doc.uploaded_by && doc.uploaded_at && (
            <span className="ml-2">アップロード：{doc.uploaded_by}・{formatDate(doc.uploaded_at)}</span>
          )}
        </p>
        {doc.file_name && (
          <Button size="sm" variant="ghost" className="text-[10px] h-7">PDF表示</Button>
        )}
      </div>
    </li>
  );
}

function Stat({ label, value, icon, alert }: { label: string; value: string; icon?: React.ReactNode; alert?: boolean }) {
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

function Chip({ label, active, onClick, small }: { label: string; active: boolean; onClick: () => void; small?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border font-medium transition-colors',
        small ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]',
        active ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:bg-muted'
      )}
    >
      {label}
    </button>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
