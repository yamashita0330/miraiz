import type { UserProfile } from './types';

interface Match {
  label: string;
  score: number; // 0..1
  weight: number; // 0..100
}

export interface CompatibilityResult {
  total: number; // 0..100
  matches: { label: string; weight: number; matched: boolean; detail?: string }[];
  strongPoints: string[];
}

const W = {
  hope_type: 22,
  marriage_intent: 18,
  want_children: 14,
  work_after_marriage: 8,
  living_arrangement: 6,
  date_frequency: 5,
  contact_frequency: 5,
  money_style: 6,
  weekend_style: 4,
  smoking: 5,
  drinking: 3,
  hobbies: 4,
};

export function compatibility(me: UserProfile, them: UserProfile): CompatibilityResult {
  const matches: Match[] = [];

  // 希望タイプ（同タイプ満点・補完タイプ70%）
  if (me.hope_type && them.hope_type) {
    const same = me.hope_type === them.hope_type;
    const complementary: Record<string, string[]> = {
      hispec: ['family'],
      value: ['comfort', 'growth'],
      comfort: ['value', 'family'],
      active: ['growth'],
      family: ['comfort', 'hispec'],
      growth: ['value', 'active'],
    };
    const compl = complementary[me.hope_type]?.includes(them.hope_type) ?? false;
    matches.push({
      label: '希望タイプ',
      score: same ? 1 : compl ? 0.7 : 0.3,
      weight: W.hope_type,
    });
  }

  // 結婚意欲（差0=満点・差4=0点）
  if (me.marriage_intent && them.marriage_intent) {
    const diff = Math.abs(me.marriage_intent - them.marriage_intent);
    matches.push({
      label: '結婚への意欲',
      score: Math.max(0, 1 - diff * 0.25),
      weight: W.marriage_intent,
    });
  }

  // 子供希望
  if (me.want_children && them.want_children) {
    const map: Record<string, number> = { yes: 1, maybe: 0.5, no: 0, decline: 0.4 };
    const a = map[me.want_children] ?? 0.5;
    const b = map[them.want_children] ?? 0.5;
    matches.push({
      label: '子供の希望',
      score: 1 - Math.abs(a - b),
      weight: W.want_children,
    });
  }

  if (me.work_after_marriage && them.work_after_marriage) {
    matches.push({
      label: '結婚後の働き方',
      score: me.work_after_marriage === them.work_after_marriage ? 1 : 0.4,
      weight: W.work_after_marriage,
    });
  }

  if (me.living_arrangement && them.living_arrangement) {
    matches.push({
      label: '同居予定',
      score: me.living_arrangement === them.living_arrangement ? 1 : 0.4,
      weight: W.living_arrangement,
    });
  }

  if (me.date_frequency && them.date_frequency) {
    matches.push({
      label: '会いたい頻度',
      score: me.date_frequency === them.date_frequency ? 1 : 0.5,
      weight: W.date_frequency,
    });
  }

  if (me.contact_frequency && them.contact_frequency) {
    const order = ['multiple_daily', 'daily', 'few_per_week', 'weekly', 'flexible'];
    const a = order.indexOf(me.contact_frequency);
    const b = order.indexOf(them.contact_frequency);
    const diff = Math.abs(a - b);
    matches.push({
      label: '連絡頻度',
      score: Math.max(0, 1 - diff * 0.25),
      weight: W.contact_frequency,
    });
  }

  if (me.money_style && them.money_style) {
    matches.push({
      label: 'お金の感覚',
      score: me.money_style === them.money_style ? 1 : 0.5,
      weight: W.money_style,
    });
  }

  if (me.weekend_style && them.weekend_style) {
    matches.push({
      label: '休日の過ごし方',
      score: me.weekend_style === them.weekend_style ? 1 : 0.6,
      weight: W.weekend_style,
    });
  }

  if (me.smoking && them.smoking) {
    matches.push({
      label: '喫煙',
      score: me.smoking === them.smoking ? 1 : (me.smoking === 'no' && them.smoking === 'no' ? 1 : 0.4),
      weight: W.smoking,
    });
  }

  if (me.drinking && them.drinking) {
    matches.push({
      label: 'お酒',
      score: me.drinking === them.drinking ? 1 : 0.7,
      weight: W.drinking,
    });
  }

  // 趣味の重なり数
  if (me.hobbies && them.hobbies && me.hobbies.length > 0 && them.hobbies.length > 0) {
    const shared = me.hobbies.filter((h) => them.hobbies?.includes(h));
    const ratio = shared.length / Math.min(me.hobbies.length, them.hobbies.length);
    matches.push({
      label: '趣味',
      score: Math.min(1, ratio + 0.2),
      weight: W.hobbies,
    });
  }

  // 重み付け平均
  const totalWeight = matches.reduce((sum, m) => sum + m.weight, 0);
  const weightedScore = matches.reduce((sum, m) => sum + m.score * m.weight, 0);
  const total = totalWeight === 0 ? 0 : Math.round((weightedScore / totalWeight) * 100);

  const breakdown = matches.map((m) => ({
    label: m.label,
    weight: m.weight,
    matched: m.score >= 0.7,
    detail: explain(m, me, them),
  }));

  const strongPoints = matches
    .filter((m) => m.score >= 0.85)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((m) => m.label);

  return { total, matches: breakdown, strongPoints };
}

function explain(m: Match, _me: UserProfile, _them: UserProfile): string {
  if (m.score >= 0.85) return 'ぴったり一致';
  if (m.score >= 0.6) return '近い価値観';
  if (m.score >= 0.4) return '違いはあるが相談可';
  return 'ギャップあり';
}
