import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { DEMO_GRADUATES } from '@/lib/demo';

const STATS = [
  { value: '351', label: 'これまでの参加者' },
  { value: '68', label: 'カップル成立' },
  { value: '12', label: 'ご成婚' },
];

export default function GraduatesPage() {
  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Graduates
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              恋フェス卒業生
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              恋フェスで出会い、人生のパートナーになった先輩たち。
            </p>
          </header>

          <section className="mt-12 grid grid-cols-3 gap-4 border-y border-border py-10">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-mont text-3xl font-medium tracking-tight">{s.value}</span>
                <span className="text-[11px] leading-snug text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </section>

          <section className="mt-12">
            <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Couple Stories
            </h2>
            <div className="flex flex-col gap-8">
              {DEMO_GRADUATES.map((g) => (
                <article
                  key={g.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="flex aspect-[16/9] items-center justify-center bg-muted/30">
                    <span className="text-5xl opacity-40" aria-hidden>{g.photoEmoji}</span>
                  </div>
                  <div className="flex flex-col gap-4 p-8">
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-semibold tracking-tight">{g.coupleName}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>出会い：{g.metEvent}</span>
                        <span>結婚：{g.marriedDate}</span>
                      </div>
                    </div>
                    <p className="border-t border-border pt-4 text-sm leading-relaxed">
                      「{g.message}」
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-muted/30 p-10 text-center">
            <p className="text-base font-medium">あなたも次の卒業生に</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Vol.5 でお待ちしています。
            </p>
          </section>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
