'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Plus, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { VideoUpload } from '@/components/VideoUpload';
import { cn } from '@/lib/utils';
import { PREFECTURES, HOPE_TYPES, type HopeType } from '@/lib/constants';
import {
  DEMO_MODE,
  DEMO_ME,
  INCOME_OPTIONS,
  EDUCATION_OPTIONS,
  HOBBY_SUGGESTIONS,
  HOBBY_DETAIL_PLACEHOLDERS,
  FIRST_DATE_LOCATIONS,
  SPEND_CATEGORIES,
  BODY_TYPE_LABEL,
  BLOOD_TYPE_LABEL,
  HOLIDAY_TYPE_LABEL,
  WANT_CHILDREN_LABEL,
  WORK_AFTER_MARRIAGE_LABEL,
  LIVING_ARRANGEMENT_LABEL,
  MARRIAGE_INTENT_LABEL,
  MBTI_TYPES,
  PERSONALITY_SUGGESTIONS,
  LANGUAGE_OPTIONS,
  DATE_FREQUENCY_LABEL,
  CONTACT_FREQUENCY_LABEL,
  HOUSEHOLD_DIVISION_LABEL,
  TRANSFER_POSSIBILITY_LABEL,
  WEDDING_STYLE_LABEL,
  HOUSING_PREFERENCE_LABEL,
  MONEY_STYLE_LABEL,
  WEEKEND_STYLE_LABEL,
  RELIGION_LABEL,
} from '@/lib/demo';
import type {
  Smoking,
  Drinking,
  BodyType,
  BloodType,
  HolidayType,
  WantChildren,
  WorkAfterMarriage,
  LivingArrangement,
  MBTIType,
  DateFrequency,
  ContactFrequency,
  HouseholdDivision,
  TransferPossibility,
  WeddingStyle,
  HousingPreference,
  MoneyStyle,
  WeekendStyle,
  ReligionStatus,
} from '@/lib/types';

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [prefecture, setPrefecture] = useState('徳島県');
  const [bio, setBio] = useState('');
  const [hopeType, setHopeType] = useState<HopeType>('value');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // 詳細：個人
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('');
  const [income, setIncome] = useState('');
  const [height, setHeight] = useState<number | ''>('');
  const [smoking, setSmoking] = useState<Smoking | ''>('');
  const [drinking, setDrinking] = useState<Drinking | ''>('');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [newHobby, setNewHobby] = useState('');

  // 拡張：個人属性
  const [hometown, setHometown] = useState('');
  const [bodyType, setBodyType] = useState<BodyType | ''>('');
  const [bloodType, setBloodType] = useState<BloodType | ''>('');
  const [siblings, setSiblings] = useState('');
  const [holidayType, setHolidayType] = useState<HolidayType | ''>('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [pets, setPets] = useState('');

  // 結婚観
  const [marriageIntent, setMarriageIntent] = useState<1 | 2 | 3 | 4 | 5 | ''>('');
  const [wantChildren, setWantChildren] = useState<WantChildren | ''>('');
  const [workAfterMarriage, setWorkAfterMarriage] = useState<WorkAfterMarriage | ''>('');
  const [livingArrangement, setLivingArrangement] = useState<LivingArrangement | ''>('');

  // パーソナリティ
  const [mbti, setMbti] = useState<MBTIType | ''>('');
  const [personalityTags, setPersonalityTags] = useState<string[]>([]);

  // 動画
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  // 結婚生活プラン
  const [dateFrequency, setDateFrequency] = useState<DateFrequency | ''>('');
  const [contactFrequency, setContactFrequency] = useState<ContactFrequency | ''>('');
  const [householdDivision, setHouseholdDivision] = useState<HouseholdDivision | ''>('');
  const [transferPossibility, setTransferPossibility] = useState<TransferPossibility | ''>('');
  const [weddingStyle, setWeddingStyle] = useState<WeddingStyle | ''>('');
  const [housingPreference, setHousingPreference] = useState<HousingPreference | ''>('');
  const [moneyStyle, setMoneyStyle] = useState<MoneyStyle | ''>('');
  const [weekendStyle, setWeekendStyle] = useState<WeekendStyle | ''>('');
  const [religion, setReligion] = useState<ReligionStatus | ''>('');
  const [marriageDream, setMarriageDream] = useState('');
  const [mustHave, setMustHave] = useState('');

  // 自己紹介を深める質問
  const [firstDateLocations, setFirstDateLocations] = useState<string[]>([]);
  const [firstDateNote, setFirstDateNote] = useState('');
  const [spendCategories, setSpendCategories] = useState<string[]>([]);
  const [spendNote, setSpendNote] = useState('');
  const [hobbyDetails, setHobbyDetails] = useState<Record<string, string>>({});

  useEffect(() => {
    if (DEMO_MODE) {
      setUserId(DEMO_ME.id);
      setName(DEMO_ME.name);
      setPrefecture(DEMO_ME.prefecture);
      setBio(DEMO_ME.bio || '');
      setHopeType(DEMO_ME.hope_type);
      setPhotoUrl(DEMO_ME.photo_url);
      setOccupation(DEMO_ME.occupation || '');
      setEducation(DEMO_ME.education || '');
      setIncome(DEMO_ME.income || '');
      setHeight(DEMO_ME.height ?? '');
      setSmoking((DEMO_ME.smoking ?? '') as Smoking | '');
      setDrinking((DEMO_ME.drinking ?? '') as Drinking | '');
      setHobbies(DEMO_ME.hobbies ?? []);
      setHometown(DEMO_ME.hometown || '');
      setBodyType((DEMO_ME.body_type ?? '') as BodyType | '');
      setBloodType((DEMO_ME.blood_type ?? '') as BloodType | '');
      setSiblings(DEMO_ME.siblings || '');
      setHolidayType((DEMO_ME.holiday_type ?? '') as HolidayType | '');
      setLanguages(DEMO_ME.languages ?? []);
      setPets(DEMO_ME.pets || '');
      setMarriageIntent((DEMO_ME.marriage_intent ?? '') as 1 | 2 | 3 | 4 | 5 | '');
      setWantChildren((DEMO_ME.want_children ?? '') as WantChildren | '');
      setWorkAfterMarriage((DEMO_ME.work_after_marriage ?? '') as WorkAfterMarriage | '');
      setLivingArrangement((DEMO_ME.living_arrangement ?? '') as LivingArrangement | '');
      setMbti((DEMO_ME.mbti ?? '') as MBTIType | '');
      setPersonalityTags(DEMO_ME.personality_tags ?? []);
      setVideoPreviewUrl(DEMO_ME.video_intro_url ?? null);
      setDateFrequency((DEMO_ME.date_frequency ?? '') as DateFrequency | '');
      setContactFrequency((DEMO_ME.contact_frequency ?? '') as ContactFrequency | '');
      setHouseholdDivision((DEMO_ME.household_division ?? '') as HouseholdDivision | '');
      setTransferPossibility((DEMO_ME.transfer_possibility ?? '') as TransferPossibility | '');
      setWeddingStyle((DEMO_ME.wedding_style ?? '') as WeddingStyle | '');
      setHousingPreference((DEMO_ME.housing_preference ?? '') as HousingPreference | '');
      setMoneyStyle((DEMO_ME.money_style ?? '') as MoneyStyle | '');
      setWeekendStyle((DEMO_ME.weekend_style ?? '') as WeekendStyle | '');
      setReligion((DEMO_ME.religion ?? '') as ReligionStatus | '');
      setMarriageDream(DEMO_ME.marriage_dream ?? '');
      setMustHave(DEMO_ME.must_have ?? '');
      setFirstDateLocations(DEMO_ME.first_date_locations ?? []);
      setFirstDateNote(DEMO_ME.first_date_note ?? '');
      setSpendCategories(DEMO_ME.spend_categories ?? []);
      setSpendNote(DEMO_ME.spend_note ?? '');
      setHobbyDetails(DEMO_ME.hobby_details ?? {});
      setLoading(false);
      return;
    }
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const { data: p } = await supabase.from('users').select('*').eq('id', user.id).maybeSingle();
      if (p) {
        setUserId(user.id);
        setName(p.name);
        setPrefecture(p.prefecture);
        setBio(p.bio || '');
        setHopeType(p.hope_type);
        setPhotoUrl(p.photo_url);
        setOccupation(p.occupation || '');
        setEducation(p.education || '');
        setIncome(p.income || '');
        setHeight(p.height ?? '');
        setSmoking((p.smoking ?? '') as Smoking | '');
        setDrinking((p.drinking ?? '') as Drinking | '');
        setHobbies(p.hobbies ?? []);
        setHometown(p.hometown || '');
        setBodyType((p.body_type ?? '') as BodyType | '');
        setBloodType((p.blood_type ?? '') as BloodType | '');
        setSiblings(p.siblings || '');
        setHolidayType((p.holiday_type ?? '') as HolidayType | '');
        setLanguages(p.languages ?? []);
        setPets(p.pets || '');
        setMarriageIntent((p.marriage_intent ?? '') as 1 | 2 | 3 | 4 | 5 | '');
        setWantChildren((p.want_children ?? '') as WantChildren | '');
        setWorkAfterMarriage((p.work_after_marriage ?? '') as WorkAfterMarriage | '');
        setLivingArrangement((p.living_arrangement ?? '') as LivingArrangement | '');
        setMbti((p.mbti ?? '') as MBTIType | '');
        setPersonalityTags(p.personality_tags ?? []);
        setVideoPreviewUrl(p.video_intro_url ?? null);
        setDateFrequency((p.date_frequency ?? '') as DateFrequency | '');
        setContactFrequency((p.contact_frequency ?? '') as ContactFrequency | '');
        setHouseholdDivision((p.household_division ?? '') as HouseholdDivision | '');
        setTransferPossibility((p.transfer_possibility ?? '') as TransferPossibility | '');
        setWeddingStyle((p.wedding_style ?? '') as WeddingStyle | '');
        setHousingPreference((p.housing_preference ?? '') as HousingPreference | '');
        setMoneyStyle((p.money_style ?? '') as MoneyStyle | '');
        setWeekendStyle((p.weekend_style ?? '') as WeekendStyle | '');
        setReligion((p.religion ?? '') as ReligionStatus | '');
        setMarriageDream(p.marriage_dream ?? '');
        setMustHave(p.must_have ?? '');
        setFirstDateLocations(p.first_date_locations ?? []);
        setFirstDateNote(p.first_date_note ?? '');
        setSpendCategories(p.spend_categories ?? []);
        setSpendNote(p.spend_note ?? '');
        setHobbyDetails(p.hobby_details ?? {});
      }
      setLoading(false);
    })();
  }, [router]);

  const toggleHobby = (h: string) => {
    setHobbies((prev) => prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h].slice(0, 10));
  };
  const addHobby = () => {
    const t = newHobby.trim();
    if (!t || hobbies.includes(t)) { setNewHobby(''); return; }
    setHobbies((p) => [...p, t].slice(0, 10));
    setNewHobby('');
  };
  const togglePersonality = (tag: string) => {
    setPersonalityTags((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag].slice(0, 5)
    );
  };
  const toggleLanguage = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((x) => x !== lang) : [...prev, lang].slice(0, 5)
    );
  };
  const toggleFirstDate = (loc: string) => {
    setFirstDateLocations((prev) =>
      prev.includes(loc) ? prev.filter((x) => x !== loc) : [...prev, loc].slice(0, 5)
    );
  };
  const toggleSpend = (cat: string) => {
    setSpendCategories((prev) =>
      prev.includes(cat) ? prev.filter((x) => x !== cat) : [...prev, cat].slice(0, 5)
    );
  };
  const setHobbyDetail = (hobby: string, detail: string) => {
    setHobbyDetails((prev) => ({ ...prev, [hobby]: detail }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    if (DEMO_MODE) {
      router.push('/mypage');
      return;
    }

    try {
      const supabase = createClient();
      let newPhotoUrl = photoUrl;
      if (photoFile) {
        const ext = photoFile.name.split('.').pop() || 'jpg';
        const filePath = `${userId}/photo.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, photoFile, { upsert: true, cacheControl: '3600' });
        if (uploadError) throw uploadError;
        const { data: pub } = supabase.storage.from('avatars').getPublicUrl(filePath);
        newPhotoUrl = `${pub.publicUrl}?t=${Date.now()}`;
      }

      let newVideoUrl = videoPreviewUrl;
      if (videoFile) {
        const ext = videoFile.name.split('.').pop() || 'mp4';
        const filePath = `${userId}/intro.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('videos')
          .upload(filePath, videoFile, { upsert: true, cacheControl: '3600' });
        if (uploadError) throw uploadError;
        const { data: pub } = supabase.storage.from('videos').getPublicUrl(filePath);
        newVideoUrl = `${pub.publicUrl}?t=${Date.now()}`;
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          name: name.trim(),
          prefecture,
          bio: bio.trim(),
          hope_type: hopeType,
          photo_url: newPhotoUrl,
          video_intro_url: newVideoUrl,
          occupation: occupation.trim() || null,
          education: education || null,
          income: income || null,
          height: height === '' ? null : height,
          smoking: smoking || null,
          drinking: drinking || null,
          hobbies,
          hometown: hometown.trim() || null,
          body_type: bodyType || null,
          blood_type: bloodType || null,
          siblings: siblings.trim() || null,
          holiday_type: holidayType || null,
          languages,
          pets: pets.trim() || null,
          marriage_intent: marriageIntent === '' ? null : marriageIntent,
          want_children: wantChildren || null,
          work_after_marriage: workAfterMarriage || null,
          living_arrangement: livingArrangement || null,
          mbti: mbti || null,
          personality_tags: personalityTags,
          date_frequency: dateFrequency || null,
          contact_frequency: contactFrequency || null,
          household_division: householdDivision || null,
          transfer_possibility: transferPossibility || null,
          wedding_style: weddingStyle || null,
          housing_preference: housingPreference || null,
          money_style: moneyStyle || null,
          weekend_style: weekendStyle || null,
          religion: religion || null,
          marriage_dream: marriageDream.trim() || null,
          must_have: mustHave.trim() || null,
          first_date_locations: firstDateLocations,
          first_date_note: firstDateNote.trim() || null,
          spend_categories: spendCategories,
          spend_note: spendNote.trim() || null,
          hobby_details: hobbyDetails,
        })
        .eq('id', userId);
      if (updateError) throw updateError;
      router.push('/mypage');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-sm text-muted-foreground">読み込み中…</div>;
  }

  // 充実度スコア計算
  const filledFields = [
    occupation, education, income, height, smoking, drinking,
    hometown, bodyType, bloodType, siblings, holidayType, pets,
    marriageIntent, wantChildren, workAfterMarriage, livingArrangement,
    mbti, videoPreviewUrl,
    dateFrequency, contactFrequency, householdDivision, transferPossibility,
    weddingStyle, housingPreference, moneyStyle, weekendStyle, religion,
    marriageDream, mustHave,
  ].filter((v) => v !== '' && v !== null && v !== undefined).length
    + (hobbies.length > 0 ? 1 : 0)
    + (personalityTags.length > 0 ? 1 : 0)
    + (languages.length > 0 ? 1 : 0);
  const totalFields = 32;
  const completion = Math.round((filledFields / totalFields) * 100);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight">プロフィール編集</h1>
            <div className="rounded-2xl border border-border p-6">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">プロフィール充実度</p>
                <p className="font-mont text-2xl font-medium">{completion}<span className="ml-1 text-xs text-muted-foreground">%</span></p>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-foreground transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                70%以上で両想い率が約2倍になります。動画自己紹介は特に効果的です。
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-16">
            {/* 基本情報 */}
            <Section title="基本情報">
              <Field label="ニックネーム">
                <Input type="text" required maxLength={20} value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field label="居住地">
                <SelectField value={prefecture} onChange={setPrefecture} options={PREFECTURES.map((p) => ({ value: p, label: p }))} />
              </Field>
              <Field label="自己紹介">
                <Textarea maxLength={500} rows={5} value={bio} onChange={(e) => setBio(e.target.value)} />
              </Field>
              <Field label="希望タイプ">
                <div className="grid grid-cols-2 gap-3">
                  {HOPE_TYPES.map((h) => (
                    <button
                      key={h.value}
                      type="button"
                      onClick={() => setHopeType(h.value)}
                      className={cn(
                        'flex flex-col gap-1 rounded-lg border p-4 text-left transition-colors',
                        hopeType === h.value ? 'border-foreground bg-foreground/[0.03]' : 'border-border hover:bg-muted'
                      )}
                    >
                      <span className="text-sm font-semibold">{h.label}</span>
                      <span className="text-xs text-muted-foreground">{h.desc}</span>
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="プロフィール写真">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border bg-muted">
                    {photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photoUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <UserIcon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
                      </div>
                    )}
                  </div>
                  <Input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)} className="cursor-pointer" />
                </div>
              </Field>
            </Section>

            {/* 個人プロフィール */}
            <Section title="プロフィール詳細" desc="記入が多いほど両想い率が上がります">
              <Field label="職業">
                <Input type="text" maxLength={50} placeholder="例：保育士／IT企画" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
              </Field>
              <Field label="学歴">
                <SelectField value={education} onChange={setEducation} placeholder="選択しない" options={EDUCATION_OPTIONS.map((o) => ({ value: o, label: o }))} />
              </Field>
              <Field label="年収">
                <SelectField value={income} onChange={setIncome} placeholder="選択しない" options={INCOME_OPTIONS.map((o) => ({ value: o, label: o }))} />
              </Field>
              <Field label="身長 (cm)">
                <Input
                  type="number"
                  min={120}
                  max={220}
                  placeholder="例：165"
                  value={height}
                  onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                  className="font-mont"
                />
              </Field>
              <Field label="体型">
                <ChoiceGrid<BodyType>
                  cols={4}
                  value={bodyType}
                  onChange={setBodyType}
                  options={(['slim', 'standard', 'athletic', 'plus'] as BodyType[]).map((v) => ({ value: v, label: BODY_TYPE_LABEL[v] }))}
                />
              </Field>
              <Field label="血液型">
                <ChoiceGrid<BloodType>
                  cols={4}
                  value={bloodType}
                  onChange={setBloodType}
                  options={(['A', 'B', 'O', 'AB'] as BloodType[]).map((v) => ({ value: v, label: BLOOD_TYPE_LABEL[v] }))}
                />
              </Field>
              <Field label="出身地">
                <Input type="text" maxLength={20} placeholder="例：徳島県" value={hometown} onChange={(e) => setHometown(e.target.value)} />
              </Field>
              <Field label="兄弟構成">
                <Input type="text" maxLength={30} placeholder="例：長男／一人っ子" value={siblings} onChange={(e) => setSiblings(e.target.value)} />
              </Field>
              <Field label="休日">
                <ChoiceGrid<HolidayType>
                  cols={4}
                  value={holidayType}
                  onChange={setHolidayType}
                  options={(['weekend', 'weekday', 'shift', 'irregular'] as HolidayType[]).map((v) => ({ value: v, label: HOLIDAY_TYPE_LABEL[v] }))}
                />
              </Field>
              <Field label="ペット">
                <Input type="text" maxLength={30} placeholder="例：猫を飼ってます" value={pets} onChange={(e) => setPets(e.target.value)} />
              </Field>
              <Field label="喫煙">
                <ChoiceGrid<Smoking>
                  cols={3}
                  value={smoking}
                  onChange={setSmoking}
                  options={[
                    { value: 'no', label: '吸わない' },
                    { value: 'sometimes', label: '時々' },
                    { value: 'yes', label: '吸う' },
                  ]}
                />
              </Field>
              <Field label="お酒">
                <ChoiceGrid<Drinking>
                  cols={3}
                  value={drinking}
                  onChange={setDrinking}
                  options={[
                    { value: 'no', label: '飲まない' },
                    { value: 'sometimes', label: '時々' },
                    { value: 'yes', label: '飲む' },
                  ]}
                />
              </Field>
            </Section>

            {/* 結婚観 */}
            <Section title="結婚観" desc="将来像を共有することで本気度の高い相手と出会えます">
              <Field label="結婚への意欲">
                <ChoiceGrid<1 | 2 | 3 | 4 | 5>
                  cols={1}
                  value={marriageIntent}
                  onChange={setMarriageIntent}
                  options={([1, 2, 3, 4, 5] as const).map((v) => ({
                    value: v,
                    label: `${MARRIAGE_INTENT_LABEL[v]}`,
                  }))}
                />
              </Field>
              <Field label="子供の希望">
                <ChoiceGrid<WantChildren>
                  cols={2}
                  value={wantChildren}
                  onChange={setWantChildren}
                  options={(['yes', 'maybe', 'no', 'decline'] as WantChildren[]).map((v) => ({ value: v, label: WANT_CHILDREN_LABEL[v] }))}
                />
              </Field>
              <Field label="結婚後の働き方">
                <ChoiceGrid<WorkAfterMarriage>
                  cols={1}
                  value={workAfterMarriage}
                  onChange={setWorkAfterMarriage}
                  options={(['dual', 'flexible', 'full', 'undecided'] as WorkAfterMarriage[]).map((v) => ({
                    value: v,
                    label: WORK_AFTER_MARRIAGE_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="同居予定">
                <ChoiceGrid<LivingArrangement>
                  cols={1}
                  value={livingArrangement}
                  onChange={setLivingArrangement}
                  options={(['separate', 'with_parents', 'undecided'] as LivingArrangement[]).map((v) => ({
                    value: v,
                    label: LIVING_ARRANGEMENT_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="結婚式の希望">
                <ChoiceGrid<WeddingStyle>
                  cols={2}
                  value={weddingStyle}
                  onChange={setWeddingStyle}
                  options={(['large', 'medium', 'small', 'family_only', 'none', 'undecided'] as WeddingStyle[]).map((v) => ({
                    value: v,
                    label: WEDDING_STYLE_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="住まいの希望">
                <ChoiceGrid<HousingPreference>
                  cols={3}
                  value={housingPreference}
                  onChange={setHousingPreference}
                  options={(['owned', 'rent', 'undecided'] as HousingPreference[]).map((v) => ({
                    value: v,
                    label: HOUSING_PREFERENCE_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="家事分担">
                <ChoiceGrid<HouseholdDivision>
                  cols={2}
                  value={householdDivision}
                  onChange={setHouseholdDivision}
                  options={(['equal', 'good_at', 'depends', 'undecided'] as HouseholdDivision[]).map((v) => ({
                    value: v,
                    label: HOUSEHOLD_DIVISION_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="転勤の可能性">
                <ChoiceGrid<TransferPossibility>
                  cols={3}
                  value={transferPossibility}
                  onChange={setTransferPossibility}
                  options={(['no', 'maybe', 'yes'] as TransferPossibility[]).map((v) => ({
                    value: v,
                    label: TRANSFER_POSSIBILITY_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="理想の結婚生活（自由記述・任意）">
                <Textarea
                  maxLength={300}
                  rows={4}
                  placeholder="例：休日に手作りごはんを一緒に食べる時間が理想"
                  value={marriageDream}
                  onChange={(e) => setMarriageDream(e.target.value)}
                />
              </Field>
              <Field label="譲れない条件（自由記述・任意）">
                <Input
                  type="text"
                  maxLength={100}
                  placeholder="例：誠実さ・対話を大切にできること"
                  value={mustHave}
                  onChange={(e) => setMustHave(e.target.value)}
                />
              </Field>
            </Section>

            {/* 関係性プラン */}
            <Section title="お付き合いのスタイル" desc="付き合い方・連絡頻度・お金の感覚">
              <Field label="会いたい頻度">
                <ChoiceGrid<DateFrequency>
                  cols={2}
                  value={dateFrequency}
                  onChange={setDateFrequency}
                  options={(['weekly', 'biweekly', 'monthly', 'flexible'] as DateFrequency[]).map((v) => ({
                    value: v,
                    label: DATE_FREQUENCY_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="連絡頻度の希望">
                <ChoiceGrid<ContactFrequency>
                  cols={1}
                  value={contactFrequency}
                  onChange={setContactFrequency}
                  options={(['multiple_daily', 'daily', 'few_per_week', 'weekly', 'flexible'] as ContactFrequency[]).map((v) => ({
                    value: v,
                    label: CONTACT_FREQUENCY_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="お金の感覚">
                <ChoiceGrid<MoneyStyle>
                  cols={2}
                  value={moneyStyle}
                  onChange={setMoneyStyle}
                  options={(['saver', 'balanced', 'spender', 'undecided'] as MoneyStyle[]).map((v) => ({
                    value: v,
                    label: MONEY_STYLE_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="休日の過ごし方">
                <ChoiceGrid<WeekendStyle>
                  cols={3}
                  value={weekendStyle}
                  onChange={setWeekendStyle}
                  options={(['outdoor', 'indoor', 'mixed'] as WeekendStyle[]).map((v) => ({
                    value: v,
                    label: WEEKEND_STYLE_LABEL[v],
                  }))}
                />
              </Field>
              <Field label="宗教">
                <ChoiceGrid<ReligionStatus>
                  cols={3}
                  value={religion}
                  onChange={setReligion}
                  options={(['none', 'has', 'decline'] as ReligionStatus[]).map((v) => ({
                    value: v,
                    label: RELIGION_LABEL[v],
                  }))}
                />
              </Field>
            </Section>

            {/* パーソナリティ */}
            <Section title="性格・人柄">
              <Field label="MBTI（任意）">
                <div className="grid grid-cols-4 gap-2">
                  {MBTI_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setMbti(mbti === t ? '' : t)}
                      className={cn(
                        'h-11 rounded-lg border font-mont text-xs font-medium transition-colors',
                        mbti === t ? 'border-foreground bg-foreground text-background' : 'border-border hover:bg-muted'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={`性格タグ（最大5個・現在${personalityTags.length}）`}>
                <div className="flex flex-wrap gap-2">
                  {PERSONALITY_SUGGESTIONS.map((tag) => {
                    const active = personalityTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => togglePersonality(tag)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-colors',
                          active
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
                        )}
                      >
                        {active ? <X className="h-3 w-3" aria-hidden /> : <Plus className="h-3 w-3" aria-hidden />}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </Field>
            </Section>

            {/* ライフスタイル */}
            <Section title="ライフスタイル">
              <Field label={`趣味（最大10個・現在${hobbies.length}）`}>
                {hobbies.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {hobbies.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => toggleHobby(h)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background"
                      >
                        {h}
                        <X className="h-3 w-3" aria-hidden />
                      </button>
                    ))}
                  </div>
                )}
                <p className="mb-2 text-xs text-muted-foreground">候補から選ぶ</p>
                <div className="flex flex-wrap gap-2">
                  {HOBBY_SUGGESTIONS.filter((h) => !hobbies.includes(h)).map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => toggleHobby(h)}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                    >
                      <Plus className="h-3 w-3" aria-hidden />
                      {h}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <Input
                    type="text"
                    placeholder="趣味を自由入力"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addHobby(); } }}
                  />
                  <Button type="button" variant="outline" onClick={addHobby}>追加</Button>
                </div>
              </Field>

              {hobbies.length > 0 && (
                <Field label="趣味の詳細（タップして具体的に書く）">
                  <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
                    例: 「お笑い鑑賞」→ 「ナインティナイン・マヂカルラブリー・見取り図」など、具体的に書くと共通の話題で盛り上がれます。
                  </p>
                  <div className="flex flex-col gap-2">
                    {hobbies.map((h) => (
                      <div key={h} className="rounded-xl border border-border bg-card p-3">
                        <div className="mb-1.5 flex items-baseline gap-2">
                          <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold">
                            {h}
                          </span>
                          {hobbyDetails[h] && (
                            <span className="text-[9px] text-success">✓ 入力済</span>
                          )}
                        </div>
                        <Textarea
                          rows={2}
                          value={hobbyDetails[h] ?? ''}
                          onChange={(e) => setHobbyDetail(h, e.target.value)}
                          placeholder={HOBBY_DETAIL_PLACEHOLDERS[h] ?? '好きな作品・好きな人・印象に残ったもの など'}
                        />
                      </div>
                    ))}
                  </div>
                </Field>
              )}

              <Field label={`初デートに行きたい場所（最大5・現在${firstDateLocations.length}）`}>
                <p className="mb-2 text-xs text-muted-foreground">行ってみたい・誘ってほしい場所を選んでください</p>
                <div className="flex flex-wrap gap-2">
                  {FIRST_DATE_LOCATIONS.map((loc) => {
                    const active = firstDateLocations.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => toggleFirstDate(loc)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-colors',
                          active
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
                        )}
                      >
                        {!active && <Plus className="h-3 w-3" aria-hidden />}
                        {loc}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <Textarea
                    rows={2}
                    value={firstDateNote}
                    onChange={(e) => setFirstDateNote(e.target.value)}
                    placeholder="その他・具体的に（例: 徳島駅前のクラフトビールバー、阿波踊り会館 など）"
                  />
                </div>
              </Field>

              <Field label={`何にお金を使っているか（最大5・現在${spendCategories.length}）`}>
                <p className="mb-2 text-xs text-muted-foreground">本気度・価値観のヒントになります</p>
                <div className="flex flex-wrap gap-2">
                  {SPEND_CATEGORIES.map((cat) => {
                    const active = spendCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleSpend(cat)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-colors',
                          active
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
                        )}
                      >
                        {!active && <Plus className="h-3 w-3" aria-hidden />}
                        {cat}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <Textarea
                    rows={2}
                    value={spendNote}
                    onChange={(e) => setSpendNote(e.target.value)}
                    placeholder="具体的に（例: 月¥3万 ジム・月¥2万 推し活・年¥30万 旅行 など）"
                  />
                </div>
              </Field>

              <Field label={`話せる言語（最大5・現在${languages.length}）`}>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGE_OPTIONS.map((lang) => {
                    const active = languages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-colors',
                          active
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
                        )}
                      >
                        {active ? <X className="h-3 w-3" aria-hidden /> : <Plus className="h-3 w-3" aria-hidden />}
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </Field>
            </Section>

            {/* メディア（動画自己紹介） */}
            <Section title="写真・動画" desc="動画があるプロフィールは閲覧時間が3倍に伸びます">
              <VideoUpload
                initialUrl={videoPreviewUrl}
                onChange={(file, url) => {
                  setVideoFile(file);
                  setVideoPreviewUrl(url);
                }}
              />
            </Section>

            {error && (
              <div role="alert" className="rounded-lg border border-border bg-muted px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" fullWidth size="lg" loading={saving}>保存する</Button>
          </form>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 border-t border-border pt-12">
        <h2 className="text-sm font-semibold tracking-tight">
          {title}
        </h2>
        {desc && <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>}
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function SelectField({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function ChoiceGrid<T extends string | number>({
  value,
  onChange,
  options,
  cols = 3,
}: {
  value: T | '';
  onChange: (v: T | '') => void;
  options: { value: T; label: string }[];
  cols?: 1 | 2 | 3 | 4;
}) {
  const colClass = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[cols];
  return (
    <div className={cn('grid gap-2', colClass)}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          onClick={() => onChange(value === o.value ? '' : o.value)}
          className={cn(
            'h-11 rounded-lg border px-3 text-xs font-medium transition-colors',
            value === o.value
              ? 'border-foreground bg-foreground text-background'
              : 'border-border hover:bg-muted'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
