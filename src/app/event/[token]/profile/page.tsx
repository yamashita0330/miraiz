'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Loader2, UserCheck } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DEMO_ME, findDemoEvent, HOBBY_SUGGESTIONS } from '@/lib/demo';

const FOCUS_OPTIONS = [
  '価値観の一致',
  '会話の相性',
  '第一印象',
  '将来のビジョン',
  '趣味・ライフスタイル',
  '安心感・居心地',
];

const AGE_RANGE_OPTIONS = ['20代前半', '20代後半', '30代前半', '30代後半', '40代以上', 'こだわらない'];

export default function EventProfilePage() {
  const params = useParams();
  const router = useRouter();
  const token = (params?.token as string) ?? '';
  const event = findDemoEvent(token);

  // マイページのプロフィールが入力済みか（名前以外に何か入っていれば「入力済み」とみなす）
  const hasMypageProfile = Boolean(DEMO_ME.occupation || DEMO_ME.bio || (DEMO_ME.hobbies && DEMO_ME.hobbies.length > 0));

  // 基本プロフィール（マイページから引き継ぎ）
  const [nickname, setNickname] = useState(DEMO_ME.name === 'あなた' ? '' : DEMO_ME.name);
  const [occupation, setOccupation] = useState(DEMO_ME.occupation ?? '');
  const [hometown, setHometown] = useState(DEMO_ME.hometown ?? '');
  const [hobbies, setHobbies] = useState<string[]>(DEMO_ME.hobbies ?? []);
  const [bio, setBio] = useState(DEMO_ME.bio === 'デモユーザーです。\nバックエンド未接続でも全画面の動作が確認できます。' ? '' : (DEMO_ME.bio ?? ''));

  // イベント当日用
  const [oneLineIntro, setOneLineIntro] = useState('');
  const [preferredAge, setPreferredAge] = useState('');
  const [focusPoints, setFocusPoints] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const toggleHobby = (h: string) => {
    setHobbies((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : prev.length < 6 ? [...prev, h] : prev));
  };
  const toggleFocus = (f: string) => {
    setFocusPoints((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : prev.length < 3 ? [...prev, f] : prev));
  };

  const canSave = nickname.trim() && oneLineIntro.trim() && preferredAge && focusPoints.length > 0;

  const handleSave = () => {
    if (!canSave) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setDone(true);
    }, 1200);
  };

  if (!event) {
    return (
      <>
        <Header showLogout />
        <main className="min-h-screen bg-background pb-24">
          <div className="mx-auto max-w-xl px-6 py-10 text-center text-sm text-muted-foreground">
            イベントが見つかりません
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  if (done) {
    return (
      <>
        <Header showLogout />
        <main className="min-h-screen bg-background pb-24">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-16 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">イベント用プロフィールを保存しました</h1>
            <p className="text-xs leading-relaxed text-muted-foreground max-w-sm">
              {event.name} 当日のグループトークと席順マッチングに使用されます。<br />
              開催前であればいつでも編集できます。
            </p>
            <div className="mt-2 flex w-full max-w-xs flex-col gap-2">
              <Button fullWidth size="lg" onClick={() => router.push(`/event/${token}`)}>
                イベント詳細へ
              </Button>
              <Link href="/events">
                <Button fullWidth size="lg" variant="ghost">イベント一覧へ</Button>
              </Link>
            </div>
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-32">
        <div className="mx-auto max-w-xl px-6 py-10">
          <Link
            href={`/event/${token}`}
            className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />イベント詳細
          </Link>
          <header className="flex flex-col gap-2">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Event Profile
            </span>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight">
              イベント用プロフィール
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {event.name} 当日の席順マッチングとグループトークに使われます。
            </p>
          </header>

          {/* マイページ引き継ぎバナー */}
          {hasMypageProfile && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-success/40 bg-success/5 p-4">
              <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={1.8} aria-hidden />
              <div>
                <p className="text-[12px] font-semibold text-success">
                  マイページの情報を引き継ぎました
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                  職業・出身・趣味・自己紹介をマイページから自動入力済みです。必要に応じて編集してください。
                </p>
              </div>
            </div>
          )}

          {/* ===== 基本プロフィール ===== */}
          <section className="mt-8">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Basic
            </h2>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label>当日のニックネーム<span className="ml-1 text-rose">*</span></Label>
                <Input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="グループトークで呼ばれる名前"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>職業</Label>
                <Input
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="例：広告代理店勤務"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>出身</Label>
                <Input
                  value={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                  placeholder="例：徳島県"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>趣味（最大6つ）</Label>
                <div className="flex flex-wrap gap-1.5">
                  {HOBBY_SUGGESTIONS.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => toggleHobby(h)}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-[11px] transition-colors',
                        hobbies.includes(h)
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border bg-background hover:bg-muted'
                      )}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>自己紹介</Label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="あなたの人柄が伝わる一文を"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          </section>

          {/* ===== イベント当日用 ===== */}
          <section className="mt-10">
            <h2 className="mb-1 text-xs font-mont uppercase tracking-[0.3em] text-rose">
              For the Event
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground">
              当日のマッチング精度を高める項目です。
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label>当日のひとこと自己紹介<span className="ml-1 text-rose">*</span></Label>
                <textarea
                  value={oneLineIntro}
                  onChange={(e) => setOneLineIntro(e.target.value)}
                  rows={2}
                  maxLength={80}
                  placeholder="グループトークの最初に話す自己紹介（80字以内）"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <span className="self-end text-[10px] text-muted-foreground">{oneLineIntro.length}/80</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>希望する相手の年齢層<span className="ml-1 text-rose">*</span></Label>
                <div className="flex flex-wrap gap-1.5">
                  {AGE_RANGE_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setPreferredAge(a)}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-[11px] transition-colors',
                        preferredAge === a
                          ? 'border-rose bg-rose text-rose-foreground'
                          : 'border-border bg-background hover:bg-muted'
                      )}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>当日重視したいこと（最大3つ）<span className="ml-1 text-rose">*</span></Label>
                <div className="flex flex-wrap gap-1.5">
                  {FOCUS_OPTIONS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggleFocus(f)}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] transition-colors',
                        focusPoints.includes(f)
                          ? 'border-rose bg-rose text-rose-foreground'
                          : 'border-border bg-background hover:bg-muted'
                      )}
                    >
                      {focusPoints.includes(f) && <Check className="h-2.5 w-2.5" aria-hidden />}
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 保存 */}
          <div className="mt-10">
            <Button
              fullWidth
              size="lg"
              className="gap-2"
              disabled={!canSave || saving}
              onClick={handleSave}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />保存中…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden />イベント用プロフィールを保存
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-[10px] text-muted-foreground">
              開催前であればいつでも編集できます
            </p>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
