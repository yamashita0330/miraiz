'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { DEMO_MODE } from '@/lib/demo';

interface Props {
  targetId: string;
  initialFavorited: boolean;
}

export function FavoriteButton({ targetId, initialFavorited }: Props) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggle = async () => {
    setError('');
    setLoading(true);

    if (DEMO_MODE) {
      setFavorited((v) => !v);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('ログインしてください');

      if (favorited) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('from_user_id', user.id)
          .eq('to_user_id', targetId);
        if (error) throw error;
        setFavorited(false);
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ from_user_id: user.id, to_user_id: targetId });
        if (error) throw error;
        setFavorited(true);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={favorited ? 'outline' : 'default'}
        fullWidth
        size="lg"
        onClick={toggle}
        loading={loading}
        aria-label={favorited ? 'お気に入り解除' : 'お気に入りに追加'}
        className="gap-2"
      >
        <Star className="h-4 w-4" fill={favorited ? 'currentColor' : 'none'} aria-hidden />
        {favorited ? '気になる中' : '気になる'}
      </Button>
      {error && <p className="mt-2 text-center text-xs text-muted-foreground">{error}</p>}
    </>
  );
}
