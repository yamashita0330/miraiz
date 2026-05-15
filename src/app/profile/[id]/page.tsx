import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  User as UserIcon,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Wallet,
  Ruler,
  Cigarette,
  Wine,
  MapPin,
  Users as UsersIcon,
  Calendar,
  Droplet,
  Languages,
  PawPrint,
  Heart,
  Baby,
  Briefcase as BriefcaseIcon,
  Home as HomeIcon,
  CalendarHeart,
  MessageCircle,
  Sparkles as SparklesIcon,
  Plane,
  Coins,
  Trees,
  Building2,
  Repeat,
  MessagesSquare,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from './FavoriteButton';
import { UnlockContact } from './UnlockContact';
import { ReportDialog } from './ReportDialog';
import { BlockButton } from './BlockButton';
import { HOPE_TYPE_LABEL } from '@/lib/constants';
import type { UserProfile } from '@/lib/types';
import { compatibility } from '@/lib/compatibility';
import { cn } from '@/lib/utils';
import {
  DEMO_MODE,
  DEMO_ME,
  findDemoMember,
  DEMO_FAVORITED_BY_ME,
  DEMO_FAVORITED_ME,
  DEMO_USER_STATE,
  SMOKING_LABEL,
  DRINKING_LABEL,
  BODY_TYPE_LABEL,
  BLOOD_TYPE_LABEL,
  HOLIDAY_TYPE_LABEL,
  WANT_CHILDREN_LABEL,
  WORK_AFTER_MARRIAGE_LABEL,
  LIVING_ARRANGEMENT_LABEL,
  MARRIAGE_INTENT_LABEL,
  DATE_FREQUENCY_LABEL,
  CONTACT_FREQUENCY_LABEL,
  HOUSEHOLD_DIVISION_LABEL,
  TRANSFER_POSSIBILITY_LABEL,
  WEDDING_STYLE_LABEL,
  HOUSING_PREFERENCE_LABEL,
  MONEY_STYLE_LABEL,
  RELIGION_LABEL,
  findDemoThreadByPartner,
} from '@/lib/demo';

export const dynamic = 'force-dynamic';

export default async function ProfileDetailPage({ params }: { params: { id: string } }) {
  let profile: UserProfile;
  let isMe: boolean;
  let iFavorited = false;
  let theyFavorited = false;

  if (DEMO_MODE) {
    const found = findDemoMember(params.id);
    if (!found) notFound();
    profile = found;
    isMe = profile.id === DEMO_ME.id;
    if (!isMe) {
      iFavorited = DEMO_FAVORITED_BY_ME.has(profile.id);
      theyFavorited = DEMO_FAVORITED_ME.has(profile.id);
    }
  } else {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: row } = await supabase
      .from('users')
      .select('*')
      .eq('id', params.id)
      .maybeSingle<UserProfile>();
    if (!row) notFound();
    profile = row;
    isMe = profile.id === user.id;

    if (!isMe) {
      const { data: fromMe } = await supabase
        .from('favorites')
        .select('id')
        .eq('from_user_id', user.id)
        .eq('to_user_id', profile.id)
        .maybeSingle();
      iFavorited = !!fromMe;

      const { data: fromThem } = await supabase
        .from('favorites')
        .select('id')
        .eq('from_user_id', profile.id)
        .eq('to_user_id', user.id)
        .maybeSingle();
      theyFavorited = !!fromThem;
    }
  }

  const mutual = iFavorited && theyFavorited;

  const personalFacts: { Icon: typeof Briefcase; label: string; value: string }[] = [];
  if (profile.occupation) personalFacts.push({ Icon: Briefcase, label: '職業', value: profile.occupation });
  if (profile.education) personalFacts.push({ Icon: GraduationCap, label: '学歴', value: profile.education });
  if (profile.income) personalFacts.push({ Icon: Wallet, label: '年収', value: profile.income });
  if (profile.height) personalFacts.push({ Icon: Ruler, label: '身長', value: `${profile.height} cm` });
  if (profile.body_type) personalFacts.push({ Icon: UserIcon, label: '体型', value: BODY_TYPE_LABEL[profile.body_type] });
  if (profile.blood_type) personalFacts.push({ Icon: Droplet, label: '血液型', value: BLOOD_TYPE_LABEL[profile.blood_type] });
  if (profile.hometown) personalFacts.push({ Icon: MapPin, label: '出身地', value: profile.hometown });
  if (profile.siblings) personalFacts.push({ Icon: UsersIcon, label: '兄弟構成', value: profile.siblings });
  if (profile.holiday_type) personalFacts.push({ Icon: Calendar, label: '休日', value: HOLIDAY_TYPE_LABEL[profile.holiday_type] });
  if (profile.pets) personalFacts.push({ Icon: PawPrint, label: 'ペット', value: profile.pets });
  if (profile.smoking) personalFacts.push({ Icon: Cigarette, label: '喫煙', value: SMOKING_LABEL[profile.smoking] });
  if (profile.drinking) personalFacts.push({ Icon: Wine, label: 'お酒', value: DRINKING_LABEL[profile.drinking] });

  const marriageFacts: { Icon: typeof Heart; label: string; value: string }[] = [];
  if (profile.marriage_intent) marriageFacts.push({ Icon: Heart, label: '結婚への意欲', value: MARRIAGE_INTENT_LABEL[profile.marriage_intent] });
  if (profile.want_children) marriageFacts.push({ Icon: Baby, label: '子供の希望', value: WANT_CHILDREN_LABEL[profile.want_children] });
  if (profile.work_after_marriage) marriageFacts.push({ Icon: BriefcaseIcon, label: '結婚後の働き方', value: WORK_AFTER_MARRIAGE_LABEL[profile.work_after_marriage] });
  if (profile.living_arrangement) marriageFacts.push({ Icon: HomeIcon, label: '同居予定', value: LIVING_ARRANGEMENT_LABEL[profile.living_arrangement] });
  if (profile.wedding_style) marriageFacts.push({ Icon: SparklesIcon, label: '結婚式の希望', value: WEDDING_STYLE_LABEL[profile.wedding_style] });
  if (profile.housing_preference) marriageFacts.push({ Icon: Building2, label: '住まいの希望', value: HOUSING_PREFERENCE_LABEL[profile.housing_preference] });
  if (profile.household_division) marriageFacts.push({ Icon: Repeat, label: '家事分担', value: HOUSEHOLD_DIVISION_LABEL[profile.household_division] });
  if (profile.transfer_possibility) marriageFacts.push({ Icon: Plane, label: '転勤の可能性', value: TRANSFER_POSSIBILITY_LABEL[profile.transfer_possibility] });

  const lifestyleFacts: { Icon: typeof Heart; label: string; value: string }[] = [];
  if (profile.date_frequency) lifestyleFacts.push({ Icon: CalendarHeart, label: '会いたい頻度', value: DATE_FREQUENCY_LABEL[profile.date_frequency] });
  if (profile.contact_frequency) lifestyleFacts.push({ Icon: MessagesSquare, label: '連絡頻度', value: CONTACT_FREQUENCY_LABEL[profile.contact_frequency] });
  if (profile.money_style) lifestyleFacts.push({ Icon: Coins, label: 'お金の感覚', value: MONEY_STYLE_LABEL[profile.money_style] });
  if (profile.weekend_style) lifestyleFacts.push({ Icon: Trees, label: '休日の過ごし方', value: { outdoor: 'アウトドア派', indoor: 'インドア派', mixed: '気分次第' }[profile.weekend_style] });
  if (profile.religion) lifestyleFacts.push({ Icon: SparklesIcon, label: '宗教', value: RELIGION_LABEL[profile.religion] });

  const thread = !isMe ? findDemoThreadByPartner(profile.id) : null;
  const compat = !isMe ? compatibility(DEMO_ME, profile) : null;

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-40">
        <div className="mx-auto max-w-xl">
          <div className="relative aspect-square bg-muted">
            {profile.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photo_url}
                alt={`${profile.name}のプロフィール写真`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground" aria-hidden>
                <UserIcon className="h-24 w-24" strokeWidth={1.2} />
              </div>
            )}
            {mutual && (
              <div className="absolute right-6 top-6">
                <Badge variant="rose">両想い</Badge>
              </div>
            )}
          </div>

          {profile.photos && profile.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-1 px-1">
              {profile.photos.slice(0, 3).map((src, i) => (
                <div key={i} className="aspect-square bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="px-8 py-12 text-center">
            <header className="flex flex-col items-center gap-3">
              <div className="flex items-baseline justify-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
                <span className="font-mont text-lg text-muted-foreground">{profile.age}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {profile.prefecture}
                {profile.hometown && profile.hometown !== profile.prefecture && (
                  <span className="text-xs"> · 出身 {profile.hometown}</span>
                )}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="soft">{HOPE_TYPE_LABEL[profile.hope_type]}</Badge>
                {profile.mbti && <Badge variant="outline" className="font-mont">{profile.mbti}</Badge>}
                <Badge variant="successSoft" className="gap-1 text-[10px]">
                  <ShieldCheck className="h-3 w-3" aria-hidden /> 年齢
                </Badge>
                <Badge variant="successSoft" className="gap-1 text-[10px]">
                  <ShieldCheck className="h-3 w-3" aria-hidden /> 本人
                </Badge>
                <Badge variant="goldSoft" className="gap-1 text-[10px]">
                  <ShieldCheck className="h-3 w-3" aria-hidden /> 独身
                </Badge>
              </div>
            </header>

            {compat && (
              <section className="mt-12 rounded-2xl border border-info-100 bg-info-50 p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mont uppercase tracking-[0.3em] text-info">
                      Compatibility
                    </span>
                    <p className="text-xs text-muted-foreground">
                      あなたと{profile.name}さんの相性
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mont text-5xl font-medium tracking-tight text-info">{compat.total}</span>
                    <span className="font-mont text-sm text-info/70">%</span>
                  </div>
                </div>

                <div className="mt-6 h-1 overflow-hidden rounded-full bg-info/15">
                  <div
                    className="h-full bg-info transition-all"
                    style={{ width: `${compat.total}%` }}
                  />
                </div>

                {compat.strongPoints.length > 0 && (
                  <div className="mt-6 flex flex-col gap-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Strong Points
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {compat.strongPoints.map((p) => (
                        <Badge key={p} variant="infoSoft" className="text-[10px]">
                          ◯ {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <details className="mt-6 cursor-pointer">
                  <summary className="text-xs font-medium underline-offset-4 hover:underline">
                    詳しい内訳を見る
                  </summary>
                  <ul className="mt-4 flex flex-col divide-y divide-border">
                    {compat.matches.map((m) => (
                      <li key={m.label} className="flex items-center justify-between gap-3 py-3">
                        <span className="text-xs">{m.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-muted-foreground">{m.detail}</span>
                          <span className={cn(
                            'inline-block h-2 w-2 rounded-full',
                            m.matched ? 'bg-foreground' : 'bg-muted-foreground/30'
                          )} aria-hidden />
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              </section>
            )}

            {profile.bio && (
              <Section title="About">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{profile.bio}</p>
              </Section>
            )}

            {profile.video_intro_url && (
              <Section title="Video Intro">
                <div className="overflow-hidden rounded-2xl border border-border bg-black">
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    src={profile.video_intro_url}
                    controls
                    playsInline
                    className="aspect-video w-full bg-black object-cover"
                  />
                </div>
              </Section>
            )}

            {personalFacts.length > 0 && (
              <Section title="Personal">
                <FactGrid items={personalFacts} />
              </Section>
            )}

            {marriageFacts.length > 0 && (
              <Section title="Marriage Plan">
                <FactGrid items={marriageFacts} cols={1} />
              </Section>
            )}

            {(profile.marriage_dream || profile.must_have) && (
              <Section title="Marriage Vision">
                {profile.marriage_dream && (
                  <div className="mb-6">
                    <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">理想の結婚生活</p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-center">{profile.marriage_dream}</p>
                  </div>
                )}
                {profile.must_have && (
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">譲れない条件</p>
                    <p className="text-sm leading-relaxed text-center">{profile.must_have}</p>
                  </div>
                )}
              </Section>
            )}

            {lifestyleFacts.length > 0 && (
              <Section title="Relationship Style">
                <FactGrid items={lifestyleFacts} cols={1} />
              </Section>
            )}

            {profile.personality_tags && profile.personality_tags.length > 0 && (
              <Section title="Personality">
                <div className="flex flex-wrap justify-center gap-2">
                  {profile.personality_tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
              </Section>
            )}

            {profile.hobbies && profile.hobbies.length > 0 && (
              <Section title="Hobbies">
                <div className="flex flex-wrap justify-center gap-2">
                  {profile.hobbies.map((h) => (
                    <Badge key={h} variant="outline">{h}</Badge>
                  ))}
                </div>
              </Section>
            )}

            {profile.languages && profile.languages.length > 0 && (
              <Section title="Languages">
                <div className="flex flex-wrap justify-center gap-2">
                  {profile.languages.map((lang) => (
                    <span key={lang} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Languages className="h-3 w-3" aria-hidden />
                      {lang}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {mutual && (
              <>
                <Section title="Chat">
                  {thread ? (
                    <Link
                      href={`/messages/${thread.id}`}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-foreground bg-foreground px-6 py-5 text-background transition-opacity hover:opacity-90"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium">トークを開く</span>
                          <span className="text-xs opacity-80">アプリ内で会話を続ける</span>
                        </div>
                      </div>
                      {thread.unread_count > 0 && (
                        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-background px-2 font-mont text-xs text-foreground">
                          {thread.unread_count}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <Link
                      href={`/messages/new?to=${profile.id}`}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-foreground bg-foreground px-6 py-5 text-background transition-opacity hover:opacity-90"
                    >
                      <MessageCircle className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                      <span className="text-sm font-medium">メッセージを送る</span>
                    </Link>
                  )}
                </Section>

                <Section title="Contact">
                  <UnlockContact targetName={profile.name} targetId={profile.id} />
                </Section>

                <Section title="For You">
                  <Link
                    href="/partners"
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-foreground/30"
                  >
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm font-semibold">加盟店から特典を選ぶ</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        フェイシャル / 脱毛 / 美容室 / ファッション 等の<br />
                        恋フェス会員価格で印象アップ
                      </p>
                    </div>
                    <span className="text-muted-foreground" aria-hidden>›</span>
                  </Link>
                </Section>
              </>
            )}

            {!isMe && !mutual && DEMO_MODE && (
              <Section title="">
                <p className="text-sm font-medium">★を付けて両想いを目指そう</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  両想いになると¥500で連絡先が解放されます。
                </p>
              </Section>
            )}

            {!isMe && (
              <section className="mt-12 flex items-center justify-end gap-6 border-t border-border pt-8">
                <ReportDialog targetName={profile.name} />
                <BlockButton targetName={profile.name} />
              </section>
            )}

            {isMe && (
              <Link
                href="/mypage/edit"
                className="mt-12 inline-block text-sm font-medium underline-offset-4 hover:underline"
              >
                プロフィールを編集 →
              </Link>
            )}
          </div>
        </div>
      </main>

      {!isMe && (
        <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-border bg-background/95 px-6 py-4 backdrop-blur">
          <div className="mx-auto max-w-xl">
            <FavoriteButton targetId={profile.id} initialFavorited={iFavorited} />
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
}

function Section({
  title,
  rightLabel,
  children,
}: {
  title: string;
  rightLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-border pt-12">
      <div className="mb-6 flex flex-col items-center gap-1">
        {title && (
          <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
            {title}
          </h2>
        )}
        {rightLabel && (
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{rightLabel}</span>
        )}
      </div>
      {children}
    </section>
  );
}

function FactGrid({
  items,
  cols = 2,
}: {
  items: { Icon: typeof Briefcase; label: string; value: string }[];
  cols?: 1 | 2;
}) {
  return (
    <dl className={`grid gap-x-6 gap-y-6 ${cols === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {items.map(({ Icon, label, value }) => (
        <div key={label} className="flex flex-col items-center gap-1.5 text-center">
          <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} aria-hidden />
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
          <dd className="text-sm leading-snug">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
