'use client';

import Link from 'next/link';
import { ArrowLeft, Store, Download } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DEMO_PARTNER_USAGES, PLAN_LABEL } from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

export default function PartnerUsagesPage() {
  const usages = DEMO_PARTNER_USAGES;
  const totalCompany = usages.reduce((s, u) => s + u.company_paid, 0);
  const totalMember = usages.reduce((s, u) => s + u.member_paid, 0);
  const totalAmount = usages.reduce((s, u) => s + u.amount, 0);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">加盟店利用管理</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `partner_usages_${todayStamp()}.csv`,
                  usages.map((u) => ({
                    id: u.id,
                    used_at: u.used_at,
                    user_name: u.user_name,
                    plan: PLAN_LABEL[u.plan],
                    usage_type: u.usage_type === 'half' ? '半額' : '無料',
                    partner_name: u.partner_name,
                    partner_category: u.partner_category,
                    amount: u.amount,
                    member_paid: u.member_paid,
                    company_paid: u.company_paid,
                  })),
                  [
                    { key: 'id', label: 'ID' },
                    { key: 'used_at', label: '利用日時' },
                    { key: 'user_name', label: '会員名' },
                    { key: 'plan', label: 'プラン' },
                    { key: 'usage_type', label: '種別' },
                    { key: 'partner_name', label: '加盟店' },
                    { key: 'partner_category', label: 'カテゴリ' },
                    { key: 'amount', label: '通常金額' },
                    { key: 'member_paid', label: '会員支払' },
                    { key: 'company_paid', label: '会社負担' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">竹（月1半額）・松（月1無料）の加盟店利用記録</p>

          <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Card label="利用件数" value={String(usages.length) + '件'} />
            <Card label="加盟店受領" value={'¥' + totalAmount.toLocaleString()} />
            <Card label="会員支払" value={'¥' + totalMember.toLocaleString()} positive />
            <Card label="会社負担" value={'¥' + totalCompany.toLocaleString()} negative />
          </section>

          <ul className="overflow-hidden rounded-2xl border border-border bg-card">
            {usages.map((u, i) => (
              <li key={u.id} className={i !== usages.length - 1 ? 'border-b border-border p-5' : 'p-5'}>
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <Store className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                  <span className="font-mont text-xs">{formatDate(u.used_at)}</span>
                  <Badge variant={u.plan === 'matsu' ? 'rose' : 'soft'} className="text-[10px]">{PLAN_LABEL[u.plan]}</Badge>
                  <Badge variant="outline" className="text-[10px]">{u.usage_type === 'half' ? '半額' : '無料'}</Badge>
                  <span className="text-sm font-medium flex-1">{u.user_name}</span>
                </div>
                <p className="text-xs">{u.partner_name}<span className="text-muted-foreground"> ／ {u.partner_category}</span></p>
                <div className="mt-2 grid grid-cols-3 gap-2 rounded-lg bg-muted/30 px-3 py-2 text-[10px]">
                  <div><p className="text-muted-foreground">通常</p><p className="font-mont">¥{u.amount.toLocaleString()}</p></div>
                  <div><p className="text-muted-foreground">会員</p><p className="font-mont text-success">¥{u.member_paid.toLocaleString()}</p></div>
                  <div><p className="text-muted-foreground">会社</p><p className="font-mont text-rose">¥{u.company_paid.toLocaleString()}</p></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

function Card(props: { label: string; value: string; positive?: boolean; negative?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-[10px] text-muted-foreground">{props.label}</p>
      <p className={`mt-1 font-mont text-xl font-medium ${props.positive ? 'text-success' : props.negative ? 'text-rose' : ''}`}>{props.value}</p>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}
