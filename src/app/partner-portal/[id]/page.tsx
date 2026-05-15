import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, Calendar, Users, Bell, Clock, Settings, QrCode, Receipt } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import {
  findDemoPartner,
  DEMO_PARTNER_BOOKINGS,
  partnerVisitsSummary,
  type BookingRecord,
} from '@/lib/demo';

export default function PartnerDashboardPage({ params }: { params: { id: string } }) {
  const partner = findDemoPartner(params.id);
  if (!partner) notFound();

  const bookings = DEMO_PARTNER_BOOKINGS.filter((b) => b.partner_id === params.id);
  const today = new Date().toISOString().slice(0, 10);
  const todays = bookings.filter((b) => b.date === today);
  const upcoming = bookings.filter((b) => b.date > today);
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const visitSummary = partnerVisitsSummary(params.id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-xl px-6 py-10">
          {/* ヘッダー */}
          <Link
            href="/partner-portal"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            ポータルに戻る
          </Link>

          <header className="mt-6 flex flex-col gap-2">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Partner Dashboard
            </span>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight">
              {partner.name}
            </h1>
            <p className="text-xs text-muted-foreground">{partner.tagline}</p>
          </header>

          {/* 重要通知 */}
          {pendingCount > 0 && (
            <Link
              href={`/partner-portal/${params.id}/bookings?status=pending`}
              className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border-2 border-warn bg-warn p-5 text-warn-foreground transition-opacity hover:opacity-95"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold">未承認の予約 {pendingCount} 件</p>
                  <p className="text-[10px] opacity-80">タップして承認・調整</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          )}

          {/* QRコード掲示への動線（最重要） */}
          <Link
            href={`/partner-portal/${params.id}/qr`}
            className="group mt-10 flex items-center justify-between gap-4 rounded-2xl border-2 border-info bg-info p-5 text-info-foreground transition-opacity hover:opacity-95"
          >
            <div className="flex items-center gap-3">
              <QrCode className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold">来店QRコード</p>
                <p className="text-[10px] opacity-80">印刷してレジに掲示</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>

          {/* KPI */}
          <section className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-8">
            <Stat label="今月の来店" value={visitSummary.visitCount} />
            <Stat label="送客売上" value={Math.round(visitSummary.grossRevenue / 1000)} suffix="k" />
            <Stat label="手数料" value={visitSummary.commissionTotal} prefix="-¥" />
          </section>

          {/* 今日の予約 */}
          <section className="mt-12">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Today
            </h2>
            {todays.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">今日の予約はありません</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {todays.sort((a, b) => a.start_time.localeCompare(b.start_time)).map((b) => (
                  <BookingRow key={b.id} booking={b} partner={partner} />
                ))}
              </ul>
            )}
          </section>

          {/* 今後の予約 */}
          <section className="mt-12">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                Upcoming
              </h2>
              <span className="text-[10px] text-muted-foreground">
                {upcoming.length} 件
              </span>
            </div>
            {upcoming.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">今後の予約はありません</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {upcoming
                  .sort((a, b) => `${a.date}${a.start_time}`.localeCompare(`${b.date}${b.start_time}`))
                  .slice(0, 5)
                  .map((b) => (
                    <BookingRow key={b.id} booking={b} partner={partner} />
                  ))}
              </ul>
            )}
          </section>

          {/* 設定メニュー */}
          <section className="mt-12">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Settings
            </h2>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <MenuItem
                Icon={Clock}
                label="営業時間・予約枠の設定"
                sub="曜日別の対応時間を編集"
              />
              <MenuItem
                Icon={Calendar}
                label="休業日の設定"
                sub="長期休暇・臨時休業をカレンダーに反映"
              />
              <MenuItem
                Icon={Users}
                label="メニューと価格"
                sub={`${partner.menus?.length ?? 0} 件のサービス`}
              />
              <MenuItem
                Icon={Settings}
                label="店舗プロフィール"
                sub="紹介文・写真・住所を編集"
                last
              />
            </div>
          </section>

          <p className="mt-12 text-[10px] leading-relaxed text-muted-foreground">
            ※ デモ環境のため、データは一部モックです。<br />
            ※ 本番では予約承認時にお客様へプッシュ通知＋メール送信が自動で飛びます。
          </p>
        </div>
      </main>
    </>
  );
}

function Stat({
  label,
  value,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        {prefix && <span className="font-mont text-base text-muted-foreground">{prefix}</span>}
        <span className="font-mont text-2xl font-medium tracking-tight">
          {value.toLocaleString()}
        </span>
        {suffix && <span className="font-mont text-xs text-muted-foreground">{suffix}</span>}
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

function BookingRow({ booking, partner }: { booking: BookingRecord; partner: ReturnType<typeof findDemoPartner> }) {
  const menu = partner?.menus?.find((m) => m.id === booking.menu_id);
  const statusLabel = {
    pending: { label: '未承認', variant: 'accent' as const },
    confirmed: { label: '確定', variant: 'soft' as const },
    cancelled: { label: 'キャンセル', variant: 'outline' as const },
    visited: { label: '来店済', variant: 'default' as const },
  }[booking.status];

  return (
    <li className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-col items-center justify-center gap-0.5 rounded-lg bg-muted px-3 py-2 text-center">
        <span className="font-mont text-base font-medium leading-none">{booking.start_time}</span>
        <span className="text-[9px] text-muted-foreground">
          {booking.date.slice(5).replace('-', '/')}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-sm font-medium">{booking.customer_name}</span>
          <Badge variant={statusLabel.variant} className="ml-auto text-[9px]">
            {statusLabel.label}
          </Badge>
        </div>
        <p className="truncate text-[11px] text-muted-foreground">
          {menu?.name ?? booking.menu_id}
          {menu && ` · ${menu.duration_min}分 · ¥${menu.member_price.toLocaleString()}`}
        </p>
      </div>
    </li>
  );
}

function MenuItem({
  Icon,
  label,
  sub,
  last = false,
}: {
  Icon: typeof Clock;
  label: string;
  sub?: string;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-muted ${
        last ? '' : 'border-b border-border'
      }`}
    >
      <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} aria-hidden />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {sub && <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>}
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
    </button>
  );
}
