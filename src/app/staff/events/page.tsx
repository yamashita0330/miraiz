import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { EventCreator } from './EventCreator';
import { QRDisplay } from './QRDisplay';
import type { EventRow } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: me } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle();

  if (!me?.is_admin) redirect('/home');

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: false })
    .returns<EventRow[]>();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-base-gray pb-10">
        <div className="max-w-xl mx-auto px-4 py-6">
          <h1 className="text-xl font-bold mb-6">イベント管理</h1>

          <div className="bg-white rounded-2xl p-5 mb-6">
            <h2 className="font-bold mb-4">新規イベント作成</h2>
            <EventCreator />
          </div>

          <div className="space-y-4">
            <h2 className="font-bold">既存イベント ({events?.length ?? 0})</h2>
            {!events || events.length === 0 ? (
              <p className="text-text-mid text-sm text-center py-8">まだイベントがありません</p>
            ) : (
              events.map((ev) => {
                const qrUrl = `${baseUrl}/event/${ev.qr_token}`;
                return (
                  <div key={ev.id} className="bg-white rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold">{ev.name}</h3>
                        <p className="text-sm text-text-mid">{ev.event_date}</p>
                      </div>
                    </div>
                    <QRDisplay url={qrUrl} eventName={ev.name} />
                    <p className="text-xs text-text-mid mt-3 break-all font-mont">{qrUrl}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </>
  );
}
