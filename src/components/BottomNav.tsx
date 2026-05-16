'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, MessageCircle, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DEMO_TOTAL_UNREAD, DEMO_EVENT_CONVERSATIONS, DEMO_FAVORITED_ME } from '@/lib/demo';

// 進行中の会話 + 未評価のターン数（イベント参加中のpending件数）
const EVENT_PENDING = DEMO_EVENT_CONVERSATIONS.filter(
  (c) => c.status === 'in_progress' || (c.status === 'completed' && !c.evaluation)
).length;
// ライブイベント参加中かどうか（未完了の会話があれば true）
const EVENT_LIVE = DEMO_EVENT_CONVERSATIONS.some(
  (c) => c.status === 'in_progress' || c.status === 'upcoming'
);
// トークバッジ = 未読メッセージ + 受信いいね
const TALK_BADGE = DEMO_TOTAL_UNREAD + DEMO_FAVORITED_ME.size;

const NAV_ITEMS = [
  { href: '/home', label: '出逢う', Icon: Home },
  {
    href: '/events',
    label: 'イベント',
    Icon: Calendar,
    badge: EVENT_PENDING > 0 ? EVENT_PENDING : undefined,
    pulse: EVENT_LIVE,
  },
  { href: '/messages', label: 'トーク', Icon: MessageCircle, badge: TALK_BADGE > 0 ? TALK_BADGE : undefined },
  { href: '/partners', label: '磨く', Icon: Sparkles },
  { href: '/mypage', label: 'マイページ', Icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-40 border-t border-foreground/10 bg-foreground backdrop-blur">
      <div className="mx-auto flex max-w-xl">
        {NAV_ITEMS.map((item) => {
          const { href, label, Icon, badge } = item;
          const pulse = 'pulse' in item ? item.pulse : false;
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-[9px] font-medium transition-colors',
                pulse ? 'text-rose' : active ? 'text-background' : 'text-background/60 hover:text-background'
              )}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
            >
              <div className="relative">
                <Icon className="h-4 w-4" strokeWidth={active ? 2.4 : 1.8} aria-hidden />
                {pulse && (
                  <span className="absolute -right-1.5 -top-1 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" aria-hidden />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" aria-hidden />
                  </span>
                )}
                {!pulse && badge !== undefined && badge > 0 && (
                  <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose px-1 font-mont text-[9px] text-rose-foreground">
                    {badge}
                  </span>
                )}
              </div>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
