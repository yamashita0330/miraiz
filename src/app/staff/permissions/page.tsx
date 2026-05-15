'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserCog, Plus, Shield, ShieldCheck, ShieldOff, KeyRound, CheckCircle2, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_STAFF_USERS,
  STAFF_ROLE_LABEL,
  STAFF_ROLE_DESC,
  ROLE_PERMISSIONS,
  type StaffUser,
  type StaffRole,
} from '@/lib/demo';

const ROLE_ICONS: Record<StaffRole, LucideIcon> = {
  owner: ShieldCheck,
  admin: Shield,
  operator: UserCog,
  viewer: ShieldOff,
};

const PERMISSION_LABELS: { key: keyof typeof ROLE_PERMISSIONS.owner; label: string }[] = [
  { key: 'view_members', label: '会員閲覧' },
  { key: 'manage_applications', label: '申込承認・却下' },
  { key: 'manage_cancellations', label: '解約・返金処理' },
  { key: 'manage_reports', label: '通報対応' },
  { key: 'manage_bookings', label: '予約管理' },
  { key: 'view_billing', label: '財務・売上閲覧' },
  { key: 'export_data', label: 'CSVエクスポート' },
  { key: 'manage_compliance', label: '法令書類管理' },
  { key: 'manage_staff', label: 'スタッフ・権限管理' },
];

export default function PermissionsPage() {
  const [staff, setStaff] = useState<StaffUser[]>(DEMO_STAFF_USERS);
  const [showRoleMatrix, setShowRoleMatrix] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const updateRole = (id: string, role: StaffRole) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, role } : s)));
    setEditing(null);
  };

  const toggleActive = (id: string) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">スタッフ・権限管理</h1>
          <p className="mb-8 text-xs text-muted-foreground">スタッフの招待・ロール変更・2要素認証・最終ログイン</p>

          <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="総スタッフ" value={`${staff.length}名`} />
            <Stat label="アクティブ" value={`${staff.filter((s) => s.active).length}名`} />
            <Stat label="2FA有効" value={`${staff.filter((s) => s.two_factor_enabled).length}名`} />
            <Stat label="2FA未設定" value={`${staff.filter((s) => !s.two_factor_enabled).length}名`} alert={staff.some((s) => !s.two_factor_enabled)} />
          </section>

          <div className="mb-6 flex justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => setShowRoleMatrix(!showRoleMatrix)}
            >
              <KeyRound className="h-3 w-3" aria-hidden />権限マトリクス
            </Button>
            <Button size="sm" className="gap-1">
              <Plus className="h-3 w-3" aria-hidden />スタッフを招待
            </Button>
          </div>

          {/* 権限マトリクス */}
          {showRoleMatrix && (
            <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="grid grid-cols-5 gap-2 border-b border-border bg-muted/30 px-5 py-3 text-[10px] font-mont uppercase tracking-wider text-muted-foreground">
                <div className="col-span-2">権限</div>
                <div className="text-center">オーナー</div>
                <div className="text-center">管理者</div>
                <div className="text-center">運営担当</div>
              </div>
              {PERMISSION_LABELS.map((p, i) => (
                <div key={p.key} className={cn('grid grid-cols-5 gap-2 px-5 py-2.5 text-[11px]', i !== PERMISSION_LABELS.length - 1 && 'border-b border-border')}>
                  <div className="col-span-2">{p.label}</div>
                  <PermCell allowed={ROLE_PERMISSIONS.owner[p.key]} />
                  <PermCell allowed={ROLE_PERMISSIONS.admin[p.key]} />
                  <PermCell allowed={ROLE_PERMISSIONS.operator[p.key]} />
                </div>
              ))}
            </section>
          )}

          {/* スタッフ一覧 */}
          <ul className="flex flex-col gap-3">
            {staff.map((s) => {
              const Icon = ROLE_ICONS[s.role];
              const isEditing = editing === s.id;
              return (
                <li key={s.id} className={cn('rounded-2xl border p-5', s.active ? 'border-border bg-card' : 'border-border bg-muted/30 opacity-60')}>
                  <div className="mb-3 flex flex-wrap items-baseline gap-3">
                    <Icon className={cn('h-4 w-4',
                      s.role === 'owner' ? 'text-rose' :
                      s.role === 'admin' ? 'text-foreground' :
                      s.role === 'viewer' ? 'text-muted-foreground' :
                      'text-muted-foreground'
                    )} strokeWidth={1.6} aria-hidden />
                    <span className="text-sm font-semibold">{s.name}</span>
                    <span className="font-mont text-[10px] text-muted-foreground">{s.email}</span>
                    {s.two_factor_enabled ? (
                      <Badge variant="outline" className="text-[10px] text-success border-success gap-1">
                        <CheckCircle2 className="h-2.5 w-2.5" aria-hidden />2FA
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-warn border-warn">2FA未設定</Badge>
                    )}
                    {!s.active && <Badge variant="outline" className="text-[10px]">停止中</Badge>}
                    <span className="ml-auto font-mont text-[10px] text-muted-foreground">
                      最終ログイン {s.last_login_at ? formatRelative(s.last_login_at) : '未ログイン'}
                    </span>
                  </div>

                  <div className="mb-3 flex items-baseline gap-3">
                    <span className="text-[10px] text-muted-foreground">ロール：</span>
                    {isEditing ? (
                      <div className="flex flex-wrap gap-1.5">
                        {(['owner', 'admin', 'operator', 'viewer'] as StaffRole[]).map((r) => (
                          <button
                            key={r}
                            onClick={() => updateRole(s.id, r)}
                            className={cn(
                              'rounded-full border px-2.5 py-1 text-[10px]',
                              s.role === r ? 'border-foreground bg-foreground text-background' : 'border-border hover:bg-muted'
                            )}
                          >
                            {STAFF_ROLE_LABEL[r]}
                          </button>
                        ))}
                        <button onClick={() => setEditing(null)} className="px-2 py-1 text-[10px] text-muted-foreground">
                          <X className="h-3 w-3" aria-hidden />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Badge variant={s.role === 'owner' ? 'rose' : 'soft'} className="text-[10px]">
                          {STAFF_ROLE_LABEL[s.role]}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{STAFF_ROLE_DESC[s.role]}</span>
                        {s.role !== 'owner' && (
                          <button onClick={() => setEditing(s.id)} className="ml-auto text-[10px] text-rose hover:underline">
                            変更
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 text-[10px] text-muted-foreground">
                    <span className="font-mont">{s.id}</span>
                    <span>・登録 {formatDate(s.created_at)}</span>
                    {s.role !== 'owner' && (
                      <button
                        onClick={() => toggleActive(s.id)}
                        className="ml-auto text-[10px] text-warn hover:underline"
                      >
                        {s.active ? '一時停止' : '復活'}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}

function PermCell({ allowed }: { allowed: boolean }) {
  return (
    <div className="text-center">
      {allowed ? (
        <CheckCircle2 className="inline h-3.5 w-3.5 text-success" strokeWidth={2} aria-hidden />
      ) : (
        <X className="inline h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} aria-hidden />
      )}
    </div>
  );
}

function Stat({ label, value, alert }: { label: string; value: string; alert?: boolean }) {
  return (
    <div className={cn('rounded-2xl border p-4', alert ? 'border-warn bg-warn-50' : 'border-border bg-card')}>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-mont text-xl font-medium">{value}</p>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  if (diffMin < 60) return `${diffMin}分前`;
  if (diffHr < 24) return `${diffHr}時間前`;
  if (diffDay < 7) return `${diffDay}日前`;
  return formatDate(iso);
}
