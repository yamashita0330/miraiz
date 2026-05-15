// 都道府県
export const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
] as const;

// 希望タイプ（6択）
export const HOPE_TYPES = [
  { value: 'hispec', label: 'ハイスペ志向', desc: '年収・肩書き重視' },
  { value: 'value', label: '価値観共有', desc: '趣味・思想一致' },
  { value: 'comfort', label: '居心地・安心', desc: '穏やか・安心感' },
  { value: 'active', label: 'アクティブ刺激', desc: '一緒に遊べる' },
  { value: 'family', label: '家族・安定', desc: '結婚前提' },
  { value: 'growth', label: '成長志向', desc: 'お互い高め合う' },
] as const;

export type HopeType = typeof HOPE_TYPES[number]['value'];

export const HOPE_TYPE_LABEL: Record<HopeType, string> = {
  hispec: 'ハイスペ志向',
  value: '価値観共有',
  comfort: '居心地・安心',
  active: 'アクティブ刺激',
  family: '家族・安定',
  growth: '成長志向',
};

// 年齢計算（20歳以上判定）
export const calcAge = (birthdate: string): number => {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const isAdult = (birthdate: string): boolean => calcAge(birthdate) >= 20;
