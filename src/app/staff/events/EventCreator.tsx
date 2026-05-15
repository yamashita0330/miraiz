'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/Button';

// ランダムトークン生成（衝突確率は実用上ゼロ）
const generateToken = (): string => {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(36).padStart(2, '0')).join('').slice(0, 16);
};

export function EventCreator() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('events').insert({
        name: name.trim(),
        event_date: date,
        qr_token: generateToken(),
      });
      if (error) throw error;
      setName('');
      setDate('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreate} className="space-y-3">
      <div>
        <label className="block text-xs font-bold mb-1" htmlFor="evname">イベント名</label>
        <input
          id="evname"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例：恋フェスVol.5"
          className="w-full px-3 py-2 border-2 border-base-gray rounded-xl focus:border-pink focus:outline-none min-h-[44px]"
        />
      </div>
      <div>
        <label className="block text-xs font-bold mb-1" htmlFor="evdate">開催日</label>
        <input
          id="evdate"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border-2 border-base-gray rounded-xl focus:border-pink focus:outline-none min-h-[44px]"
        />
      </div>
      {error && <p className="text-xs text-pink">{error}</p>}
      <Button type="submit" loading={loading} fullWidth>
        作成してQR発行
      </Button>
    </form>
  );
}
