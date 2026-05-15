'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PREFECTURES, HOPE_TYPES, calcAge, isAdult, type HopeType } from '@/lib/constants';
import { DEMO_MODE, MARRIAGE_INTENT_LABEL, MARRIAGE_INTENT_DESC } from '@/lib/demo';

type MarriageIntent = 1 | 2 | 3 | 4 | 5;

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventToken = searchParams.get('event');

  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [prefecture, setPrefecture] = useState('徳島県');
  const [bio, setBio] = useState('');
  const [hopeType, setHopeType] = useState<HopeType>('value');
  const [marriageIntent, setMarriageIntent] = useState<MarriageIntent | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!agreed) return setError('20歳以上の同意が必要です');
    if (password.length < 6) return setError('パスワードは6文字以上で設定してください');
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('ニックネームを入力してください');
    if (!birthdate) return setError('生年月日を入力してください');
    if (!isAdult(birthdate)) return setError('20歳以上のみ登録可能です');
    if (!marriageIntent) return setError('将来の温度感を選択してください');

    setLoading(true);

    if (DEMO_MODE) {
      router.push('/home');
      return;
    }

    try {
      const supabase = createClient();
      const { data: authData, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('登録に失敗しました');

      const userId = authData.user.id;
      let photoUrl: string | null = null;
      if (photoFile) {
        const ext = photoFile.name.split('.').pop() || 'jpg';
        const filePath = `${userId}/photo.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, photoFile, { upsert: true, cacheControl: '3600' });
        if (uploadError) throw uploadError;
        const { data: pub } = supabase.storage.from('avatars').getPublicUrl(filePath);
        photoUrl = pub.publicUrl;
      }

      const age = calcAge(birthdate);
      const { error: insertError } = await supabase.from('users').insert({
        id: userId,
        email,
        name: name.trim(),
        gender,
        birthdate,
        age,
        prefecture,
        bio: bio.trim(),
        photo_url: photoUrl,
        hope_type: hopeType,
        marriage_intent: marriageIntent,
      });
      if (insertError) throw insertError;

      if (eventToken) {
        const { data: eventRow } = await supabase
          .from('events')
          .select('id')
          .eq('qr_token', eventToken)
          .maybeSingle();
        if (eventRow) {
          await supabase.from('event_attendees').insert({ user_id: userId, event_id: eventRow.id });
        }
      }

      router.push('/home');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '登録に失敗しました');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-8 pt-16 pb-12">
        <div className="mb-12 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[11px] tracking-widest text-muted-foreground">
            <span className={cn('font-mont uppercase', step === 1 && 'text-foreground')}>01 — Account</span>
            <span className="h-px flex-1 bg-border" aria-hidden />
            <span className={cn('font-mont uppercase', step === 2 && 'text-foreground')}>02 — Profile</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {step === 1 ? 'はじめまして' : 'プロフィール'}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {step === 1 ? 'メールアドレスとパスワードを登録します。' : 'あなたのことを少し教えてください。'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleStep1} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">6文字以上</p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 accent-foreground"
              />
              <span className="text-sm leading-relaxed text-foreground">
                20歳以上であり、利用規約に同意します
              </span>
            </label>

            {error && (
              <div role="alert" className="rounded-lg border border-border bg-muted px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" fullWidth size="lg">次へ</Button>

            <p className="text-center text-sm text-muted-foreground">
              登録済みの方は{' '}
              <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
                ログイン
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">ニックネーム</Label>
              <Input
                id="name"
                type="text"
                required
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="birthdate">生年月日</Label>
              <Input
                id="birthdate"
                type="date"
                required
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>性別</Label>
              <div className="grid grid-cols-2 gap-3">
                {(['male', 'female'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={cn(
                      'h-12 rounded-lg border text-sm font-medium transition-colors',
                      gender === g
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border text-foreground hover:bg-muted'
                    )}
                  >
                    {g === 'male' ? '男性' : '女性'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="prefecture">居住地</Label>
              <select
                id="prefecture"
                value={prefecture}
                onChange={(e) => setPrefecture(e.target.value)}
                className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base"
              >
                {PREFECTURES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="bio">自己紹介（任意）</Label>
              <Textarea
                id="bio"
                maxLength={500}
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label>将来の温度感</Label>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  すぐ結婚、じゃなくていい。でも、将来をごまかさない出会いを。<br />
                  今のあなたの気持ちに一番近いものを1つ選んでください。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {([5, 4, 3, 2, 1] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setMarriageIntent(v)}
                    aria-pressed={marriageIntent === v}
                    className={cn(
                      'flex flex-col gap-1 rounded-lg border p-4 text-left transition-colors',
                      marriageIntent === v
                        ? 'border-foreground bg-foreground/[0.03]'
                        : 'border-border hover:bg-muted'
                    )}
                  >
                    <span className="text-sm font-semibold">{MARRIAGE_INTENT_LABEL[v]}</span>
                    <span className="text-xs text-muted-foreground">{MARRIAGE_INTENT_DESC[v]}</span>
                  </button>
                ))}
              </div>
              <p className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-[11px] leading-relaxed text-muted-foreground">
                ※ 将来のパートナー探し以外の目的（遊び・既婚・営業/勧誘等）での利用は禁止です。違反が確認された場合は即時退会となります。
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>希望タイプ</Label>
              <div className="grid grid-cols-2 gap-3">
                {HOPE_TYPES.map((h) => (
                  <button
                    key={h.value}
                    type="button"
                    onClick={() => setHopeType(h.value)}
                    className={cn(
                      'flex flex-col gap-1 rounded-lg border p-4 text-left transition-colors',
                      hopeType === h.value
                        ? 'border-foreground bg-foreground/[0.03]'
                        : 'border-border hover:bg-muted'
                    )}
                  >
                    <span className="text-sm font-semibold">{h.label}</span>
                    <span className="text-xs text-muted-foreground">{h.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="photo">プロフィール写真（任意）</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                className="cursor-pointer"
              />
            </div>

            {error && (
              <div role="alert" className="rounded-lg border border-border bg-muted px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" fullWidth size="lg" loading={loading}>
              登録して始める
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted-foreground">読み込み中…</div>}>
      <RegisterForm />
    </Suspense>
  );
}
