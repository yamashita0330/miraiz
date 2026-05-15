import Link from 'next/link';
import { User as UserIcon } from 'lucide-react';
import { HOPE_TYPE_LABEL } from '@/lib/constants';
import type { UserProfile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface ProfileCardProps {
  user: Pick<UserProfile, 'id' | 'name' | 'age' | 'prefecture' | 'photo_url' | 'hope_type'>;
  mutual?: boolean;
  compatibility?: number;
}

export function ProfileCard({ user, mutual, compatibility }: ProfileCardProps) {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-foreground/20 hover:shadow-sm"
      aria-label={`${user.name}さんのプロフィールを見る`}
    >
      <div className="relative aspect-square bg-muted">
        {user.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photo_url}
            alt={`${user.name}のプロフィール写真`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground" aria-hidden>
            <UserIcon className="h-12 w-12" strokeWidth={1.2} />
          </div>
        )}
        {mutual && (
          <div className="absolute right-3 top-3">
            <Badge variant="rose" className="text-[10px]">両想い</Badge>
          </div>
        )}
        {compatibility !== undefined && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-border bg-background/95 px-2 py-1 backdrop-blur">
            <span className="font-mont text-xs font-medium tracking-tight">{compatibility}</span>
            <span className="text-[9px] text-muted-foreground">%</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-baseline gap-2">
          <h3 className="truncate text-base font-semibold tracking-tight">{user.name}</h3>
          <span className="font-mont text-sm text-muted-foreground">{user.age}</span>
        </div>
        <p className="mt-1 truncate text-xs text-muted-foreground">{user.prefecture}</p>
        <Badge variant="soft" className="mt-3 text-[10px]">
          {HOPE_TYPE_LABEL[user.hope_type]}
        </Badge>
      </div>
    </Link>
  );
}
