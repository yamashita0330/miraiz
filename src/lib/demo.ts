import type { UserProfile, MagazineArticle, Report, ChatThread, ChatMessage } from './types';

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === '1';

export const DEMO_ME: UserProfile = {
  id: 'demo-me',
  email: 'demo@koifes.app',
  name: 'あなた',
  gender: 'male',
  birthdate: '1995-04-01',
  age: 30,
  prefecture: '徳島県',
  bio: 'デモユーザーです。\nバックエンド未接続でも全画面の動作が確認できます。',
  photo_url: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=600&h=800&fit=crop&crop=faces&auto=format&q=80',
  hope_type: 'value',
  is_active: true,
  is_admin: true,
  created_at: '2026-04-01T00:00:00Z',
  occupation: '広告代理店勤務',
  education: '大学卒',
  income: '500〜700万円',
  height: 175,
  smoking: 'no',
  drinking: 'sometimes',
  hobbies: ['カフェ巡り', '映画', '読書', 'ランニング'],
  photos: [],
  video_intro_url: null,
  hometown: '徳島県',
  body_type: 'standard',
  blood_type: 'O',
  siblings: '長男',
  holiday_type: 'weekend',
  languages: ['日本語', '英語'],
  pets: '実家に犬',
  marriage_intent: 4,
  want_children: 'yes',
  work_after_marriage: 'dual',
  living_arrangement: 'separate',
  mbti: 'ENFJ',
  personality_tags: ['誠実', '前向き', '聞き上手', 'ユーモアがある'],
  date_frequency: 'weekly',
  contact_frequency: 'daily',
  household_division: 'good_at',
  transfer_possibility: 'maybe',
  wedding_style: 'medium',
  housing_preference: 'owned',
  money_style: 'balanced',
  weekend_style: 'mixed',
  religion: 'none',
  marriage_dream: '同じ目標に向かって支え合える、笑顔の絶えない家庭を作りたいです。\n子供が産まれても2人の時間も大切にしたい。',
  must_have: '誠実さと、価値観を擦り合わせる対話ができること',
};

export const DEMO_MEMBERS: UserProfile[] = [
  {
    id: 'demo-1',
    email: null,
    name: 'みお',
    gender: 'female',
    birthdate: '1998-06-12',
    age: 27,
    prefecture: '徳島県',
    bio: 'カフェ巡りと映画が好きです。穏やかに過ごせる方と出会いたいです。',
    photo_url: 'https://images.unsplash.com/photo-1610307023797-b04d1f86e3e8?w=600&h=800&fit=crop&crop=faces&auto=format&q=80',
    hope_type: 'comfort',
    is_active: true,
    is_admin: false,
    created_at: '2026-04-10T00:00:00Z',
    occupation: '保育士',
    education: '短大卒',
    income: '300〜400万円',
    height: 158,
    smoking: 'no',
    drinking: 'sometimes',
    hobbies: ['カフェ巡り', '映画', 'お菓子作り', 'ヨガ'],
    photos: [],
    video_intro_url: null,
    hometown: '徳島県',
    body_type: 'slim',
    blood_type: 'A',
    siblings: '次女',
    holiday_type: 'shift',
    languages: ['日本語'],
    pets: '猫を飼ってます',
    marriage_intent: 3,
    want_children: 'yes',
    work_after_marriage: 'flexible',
    living_arrangement: 'separate',
    mbti: 'INFJ',
    personality_tags: ['穏やか', '聞き上手', '優しい'],
    date_frequency: 'biweekly',
    contact_frequency: 'daily',
    household_division: 'depends',
    transfer_possibility: 'no',
    wedding_style: 'small',
    housing_preference: 'undecided',
    money_style: 'saver',
    weekend_style: 'mixed',
    religion: 'none',
    marriage_dream: '穏やかにお互いを尊重し合える夫婦になりたいです。\n休日に手作りごはんを一緒に食べる時間が理想。',
    must_have: '価値観が合うこと・タバコを吸わないこと',
  },
  {
    id: 'demo-2',
    email: null,
    name: 'さくら',
    gender: 'female',
    birthdate: '1996-02-20',
    age: 29,
    prefecture: '香川県',
    bio: '結婚を視野に真剣な出会いを探しています。',
    photo_url: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?w=600&h=800&fit=crop&crop=faces&auto=format&q=80',
    hope_type: 'family',
    is_active: true,
    is_admin: false,
    created_at: '2026-04-11T00:00:00Z',
    occupation: '看護師',
    education: '専門学校卒',
    income: '400〜500万円',
    height: 162,
    smoking: 'no',
    drinking: 'sometimes',
    hobbies: ['料理', '旅行', '温泉', 'カラオケ'],
    photos: [],
    video_intro_url: null,
    hometown: '香川県',
    body_type: 'standard',
    blood_type: 'B',
    siblings: '長女',
    holiday_type: 'shift',
    languages: ['日本語'],
    pets: 'なし',
    marriage_intent: 5,
    want_children: 'yes',
    work_after_marriage: 'flexible',
    living_arrangement: 'separate',
    mbti: 'ESFJ',
    personality_tags: ['真面目', '明るい', 'しっかり者', '一途'],
    date_frequency: 'weekly',
    contact_frequency: 'multiple_daily',
    household_division: 'equal',
    transfer_possibility: 'no',
    wedding_style: 'large',
    housing_preference: 'owned',
    money_style: 'saver',
    weekend_style: 'mixed',
    religion: 'none',
    marriage_dream: '結婚式は親族・友人みんなに祝ってもらいたい。\n子供は2〜3人欲しいです。',
    must_have: '結婚への本気度・健康への意識',
  },
  {
    id: 'demo-3',
    email: null,
    name: 'ゆい',
    gender: 'female',
    birthdate: '2000-09-05',
    age: 24,
    prefecture: '徳島県',
    bio: 'アウトドア大好き！一緒に山やキャンプに行ける方がいいな。',
    photo_url: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=600&h=800&fit=crop&crop=faces&auto=format&q=80',
    hope_type: 'active',
    is_active: true,
    is_admin: false,
    created_at: '2026-04-12T00:00:00Z',
    occupation: '事務職',
    education: '大学卒',
    income: '300〜400万円',
    height: 165,
    smoking: 'no',
    drinking: 'yes',
    hobbies: ['キャンプ', '登山', 'ドライブ', 'スノボ'],
    photos: [],
    video_intro_url: null,
    hometown: '徳島県',
    body_type: 'athletic',
    blood_type: 'O',
    siblings: '末っ子（兄2人）',
    holiday_type: 'weekend',
    languages: ['日本語', '英語（日常会話）'],
    pets: '柴犬',
    marriage_intent: 2,
    want_children: 'maybe',
    work_after_marriage: 'dual',
    living_arrangement: 'separate',
    mbti: 'ESTP',
    personality_tags: ['行動派', '明るい', '社交的'],
    date_frequency: 'weekly',
    contact_frequency: 'few_per_week',
    household_division: 'good_at',
    transfer_possibility: 'maybe',
    wedding_style: 'small',
    housing_preference: 'rent',
    money_style: 'balanced',
    weekend_style: 'outdoor',
    religion: 'none',
    marriage_dream: '一緒に旅行・キャンプを楽しめる夫婦に。\n結婚しても自分の趣味の時間も大切にしたい。',
    must_have: 'お互いの趣味の時間を尊重できること',
  },
  {
    id: 'demo-4',
    email: null,
    name: 'りん',
    gender: 'female',
    birthdate: '1994-11-30',
    age: 30,
    prefecture: '愛媛県',
    bio: 'お互いに高め合える関係を築きたいです。',
    photo_url: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=600&h=800&fit=crop&crop=faces&auto=format&q=80',
    hope_type: 'growth',
    is_active: true,
    is_admin: false,
    created_at: '2026-04-13T00:00:00Z',
    occupation: 'IT企画職',
    education: '大学院卒',
    income: '600〜800万円',
    height: 168,
    smoking: 'no',
    drinking: 'sometimes',
    hobbies: ['読書', '英会話', 'マラソン', '勉強会参加'],
    photos: [],
    video_intro_url: null,
    hometown: '愛媛県',
    body_type: 'slim',
    blood_type: 'A',
    siblings: '一人っ子',
    holiday_type: 'weekend',
    languages: ['日本語', '英語', '中国語（基礎）'],
    pets: 'なし',
    marriage_intent: 3,
    want_children: 'maybe',
    work_after_marriage: 'dual',
    living_arrangement: 'separate',
    mbti: 'INTJ',
    personality_tags: ['真面目', '計画的', '誠実', '前向き'],
    date_frequency: 'biweekly',
    contact_frequency: 'daily',
    household_division: 'equal',
    transfer_possibility: 'maybe',
    wedding_style: 'small',
    housing_preference: 'undecided',
    money_style: 'saver',
    weekend_style: 'mixed',
    religion: 'none',
    marriage_dream: 'お互いの仕事・キャリアを尊重し、知的に刺激し合える関係を築きたい。',
    must_have: '対話を大切にできること・お互いの自立を尊重',
  },
  {
    id: 'demo-5',
    email: null,
    name: 'あや',
    gender: 'female',
    birthdate: '1992-03-15',
    age: 33,
    prefecture: '高知県',
    bio: '価値観の合う方とゆっくりお話したいです。',
    photo_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&crop=faces&auto=format&q=80',
    hope_type: 'value',
    is_active: true,
    is_admin: false,
    created_at: '2026-04-14T00:00:00Z',
    occupation: '美容師',
    education: '専門学校卒',
    income: '400〜500万円',
    height: 160,
    smoking: 'sometimes',
    drinking: 'yes',
    hobbies: ['アート鑑賞', 'ファッション', '猫'],
    photos: [],
    video_intro_url: null,
    hometown: '高知県',
    body_type: 'slim',
    blood_type: 'AB',
    siblings: '長女',
    holiday_type: 'weekday',
    languages: ['日本語'],
    pets: 'マンチカン2匹',
    marriage_intent: 2,
    want_children: 'maybe',
    work_after_marriage: 'flexible',
    living_arrangement: 'separate',
    mbti: 'ISFP',
    personality_tags: ['マイペース', 'おっとり', 'ユーモアがある'],
    date_frequency: 'flexible',
    contact_frequency: 'few_per_week',
    household_division: 'depends',
    transfer_possibility: 'no',
    wedding_style: 'family_only',
    housing_preference: 'rent',
    money_style: 'balanced',
    weekend_style: 'mixed',
    religion: 'none',
    must_have: '無理しなくていい関係',
  },
  {
    id: 'demo-6',
    email: null,
    name: 'なな',
    gender: 'female',
    birthdate: '1997-07-22',
    age: 28,
    prefecture: '徳島県',
    bio: '医療系で働いています。安定した方と出会えたら嬉しいです。',
    photo_url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&h=800&fit=crop&crop=faces&auto=format&q=80',
    hope_type: 'hispec',
    is_active: true,
    is_admin: false,
    created_at: '2026-04-15T00:00:00Z',
    occupation: '薬剤師',
    education: '大学卒（薬学部）',
    income: '500〜700万円',
    height: 161,
    smoking: 'no',
    drinking: 'sometimes',
    hobbies: ['ピアノ', '映画', 'ワイン', 'フィットネス'],
    photos: [],
    video_intro_url: null,
    hometown: '徳島県',
    body_type: 'standard',
    blood_type: 'A',
    siblings: '次女',
    holiday_type: 'weekend',
    languages: ['日本語', '英語'],
    pets: 'なし',
    marriage_intent: 4,
    want_children: 'yes',
    work_after_marriage: 'dual',
    living_arrangement: 'separate',
    mbti: 'ISTJ',
    personality_tags: ['真面目', 'しっかり者', '一途', '計画的'],
    date_frequency: 'weekly',
    contact_frequency: 'daily',
    household_division: 'equal',
    transfer_possibility: 'no',
    wedding_style: 'medium',
    housing_preference: 'owned',
    money_style: 'saver',
    weekend_style: 'mixed',
    religion: 'none',
    marriage_dream: '計画的に2人で歩める関係。健康面も気をつけて長く一緒にいたい。',
    must_have: '生活リズムが合うこと',
  },
  {
    id: 'demo-7',
    email: null,
    name: 'ことね',
    gender: 'female',
    birthdate: '1999-01-08',
    age: 26,
    prefecture: '香川県',
    bio: '読書と美術館巡りが趣味です。',
    photo_url: 'https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?w=600&h=800&fit=crop&crop=faces&auto=format&q=80',
    hope_type: 'value',
    is_active: true,
    is_admin: false,
    created_at: '2026-04-16T00:00:00Z',
    occupation: '学芸員',
    education: '大学院卒',
    income: '300〜400万円',
    height: 164,
    smoking: 'no',
    drinking: 'no',
    hobbies: ['美術館', '読書', '茶道', '京都旅行'],
    photos: [],
    video_intro_url: null,
    hometown: '香川県',
    body_type: 'slim',
    blood_type: 'O',
    siblings: '一人っ子',
    holiday_type: 'weekday',
    languages: ['日本語', '英語', 'フランス語（基礎）'],
    pets: 'なし',
    marriage_intent: 2,
    want_children: 'maybe',
    work_after_marriage: 'flexible',
    living_arrangement: 'separate',
    mbti: 'INFP',
    personality_tags: ['内向的', '誠実', 'マイペース', 'おっとり'],
    date_frequency: 'biweekly',
    contact_frequency: 'few_per_week',
    household_division: 'good_at',
    transfer_possibility: 'no',
    wedding_style: 'family_only',
    housing_preference: 'undecided',
    money_style: 'saver',
    weekend_style: 'indoor',
    religion: 'none',
    marriage_dream: '静かな時間を大切にできる関係。本や音楽を一緒に楽しみたい。',
    must_have: 'お互いの世界観を尊重できること',
  },
  {
    id: 'demo-8',
    email: null,
    name: 'ひかり',
    gender: 'female',
    birthdate: '1995-12-03',
    age: 30,
    prefecture: '徳島県',
    bio: '一緒に笑い合える穏やかな関係が理想です。',
    photo_url: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=600&h=800&fit=crop&crop=faces&auto=format&q=80',
    hope_type: 'comfort',
    is_active: true,
    is_admin: false,
    created_at: '2026-04-17T00:00:00Z',
    occupation: '公務員',
    education: '大学卒',
    income: '400〜500万円',
    height: 159,
    smoking: 'no',
    drinking: 'sometimes',
    hobbies: ['お笑い鑑賞', '散歩', 'カフェ', 'ボードゲーム'],
    photos: [],
    video_intro_url: null,
    hometown: '徳島県',
    body_type: 'standard',
    blood_type: 'B',
    siblings: '次女',
    holiday_type: 'weekend',
    languages: ['日本語'],
    pets: '実家に犬',
    marriage_intent: 4,
    want_children: 'yes',
    work_after_marriage: 'dual',
    living_arrangement: 'separate',
    mbti: 'ENFP',
    personality_tags: ['明るい', '社交的', 'ユーモアがある', '前向き'],
    date_frequency: 'weekly',
    contact_frequency: 'daily',
    household_division: 'depends',
    transfer_possibility: 'no',
    wedding_style: 'medium',
    housing_preference: 'owned',
    money_style: 'balanced',
    weekend_style: 'mixed',
    religion: 'none',
    marriage_dream: '笑いの絶えない明るい家庭にしたいです。お互いの実家とも仲良く過ごせる関係が理想。',
    must_have: '明るく前向きでいられること',
  },
];

export const findDemoMember = (id: string): UserProfile | null => {
  if (id === DEMO_ME.id) return DEMO_ME;
  return DEMO_MEMBERS.find((m) => m.id === id) ?? null;
};

export const DEMO_FAVORITED_BY_ME = new Set(['demo-1', 'demo-3']);
export const DEMO_FAVORITED_ME = new Set(['demo-1', 'demo-5']);
export const DEMO_MUTUAL_IDS = new Set(['demo-1']);

export const DEMO_STATS = {
  userCount: DEMO_MEMBERS.length + 1,
  eventCount: 4,
  favCount: 17,
};

// ========== バックオフィス（管理画面）モックデータ ==========

// 申込ステータス
export type ApplicationStatus =
  | 'awaiting_transfer'  // 振込待ち（松）
  | 'awaiting_review'    // 確認待ち
  | 'active'             // アクティブ
  | 'cooling_off'        // クーリングオフ期間中
  | 'cancelled'          // 解約済
  | 'rejected';          // 拒否

export const APPLICATION_STATUS_LABEL: Record<ApplicationStatus, string> = {
  awaiting_transfer: '振込待ち',
  awaiting_review: '確認待ち',
  active: 'アクティブ',
  cooling_off: 'クーリングオフ期間',
  cancelled: '解約済',
  rejected: '拒否',
};

export interface MembershipApplication {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  plan: 'ume' | 'take' | 'matsu';
  amount: number;
  payment_method: 'card' | 'transfer';
  status: ApplicationStatus;
  applied_at: string;
  activated_at: string | null;
  wants_initial_chat: boolean;
  notes: string | null;
  acquisition_source: AcquisitionSource;
  source_event_token: string | null;
  source_lead_id: string | null;
}

export const DEMO_APPLICATIONS: MembershipApplication[] = [
  {
    id: 'APP-2026-001',
    user_name: '田中 太郎',
    user_email: 'tanaka@example.com',
    user_phone: '08011112222',
    plan: 'matsu',
    amount: 298000,
    payment_method: 'transfer',
    status: 'awaiting_transfer',
    applied_at: '2026-05-05T14:30:00+09:00',
    activated_at: null,
    wants_initial_chat: false,
    notes: '振込予定日：2026-05-07',
    acquisition_source: 'event_attendee',
    source_event_token: 'vol4',
    source_lead_id: null,
  },
  {
    id: 'APP-2026-002',
    user_name: '佐藤 美咲',
    user_email: 'sato@example.com',
    user_phone: '09033334444',
    plan: 'take',
    amount: 9800,
    payment_method: 'card',
    status: 'active',
    applied_at: '2026-05-04T11:20:00+09:00',
    activated_at: '2026-05-04T11:21:00+09:00',
    wants_initial_chat: true,
    notes: '初回相談予約：2026-05-08 10:00',
    acquisition_source: 'event_attendee',
    source_event_token: 'vol4',
    source_lead_id: 'lead-001',
  },
  {
    id: 'APP-2026-003',
    user_name: '山田 健太',
    user_email: 'yamada@example.com',
    user_phone: '07055556666',
    plan: 'matsu',
    amount: 298000,
    payment_method: 'transfer',
    status: 'awaiting_review',
    applied_at: '2026-05-05T20:15:00+09:00',
    activated_at: null,
    wants_initial_chat: false,
    notes: '振込確認済・契約書面送付待ち',
    acquisition_source: 'friend_referral',
    source_event_token: null,
    source_lead_id: null,
  },
  {
    id: 'APP-2026-004',
    user_name: '鈴木 花子',
    user_email: 'suzuki@example.com',
    user_phone: '08077778888',
    plan: 'ume',
    amount: 2390,
    payment_method: 'card',
    status: 'active',
    applied_at: '2026-05-03T09:00:00+09:00',
    activated_at: '2026-05-03T09:01:00+09:00',
    wants_initial_chat: false,
    notes: null,
    acquisition_source: 'instagram_ad',
    source_event_token: null,
    source_lead_id: 'lead-002',
  },
  {
    id: 'APP-2026-005',
    user_name: '高橋 大輔',
    user_email: 'takahashi@example.com',
    user_phone: '09099990000',
    plan: 'take',
    amount: 9800,
    payment_method: 'card',
    status: 'cooling_off',
    applied_at: '2026-05-04T18:30:00+09:00',
    activated_at: '2026-05-04T18:31:00+09:00',
    wants_initial_chat: true,
    notes: 'クーリングオフ期限：2026-05-12',
    acquisition_source: 'partner_shop',
    source_event_token: null,
    source_lead_id: 'lead-009',
  },
  {
    id: 'APP-2026-006',
    user_name: '伊藤 みき',
    user_email: 'ito@example.com',
    user_phone: '08000001111',
    plan: 'ume',
    amount: 2390,
    payment_method: 'card',
    status: 'cancelled',
    applied_at: '2026-04-15T10:00:00+09:00',
    activated_at: '2026-04-15T10:01:00+09:00',
    wants_initial_chat: false,
    notes: '結婚成立により解約（2026-05-02）',
    acquisition_source: 'organic_search',
    source_event_token: null,
    source_lead_id: null,
  },
];

// 仲人予約（Zoom・対面）
export type BookingType = 'zoom' | 'in_person' | 'mindset_meeting' | 'individual_feedback' | 'advisor_consult';

export const BOOKING_TYPE_LABEL: Record<BookingType, string> = {
  zoom: 'Zoom 30分',
  in_person: '対面セッション',
  mindset_meeting: '月例マインドセット会',
  individual_feedback: '個別フィードバック会',
  advisor_consult: 'アドバイザー相談',
};

export interface MatchmakerBooking {
  id: string;
  user_name: string;
  plan: 'take' | 'matsu' | 'free' | 'ume';
  type: BookingType;
  scheduled_at: string;
  duration_minutes: number;
  // requested = アドバイザー相談リクエスト受信・日程未確定
  status: 'requested' | 'upcoming' | 'completed' | 'cancelled' | 'no_show';
  notes: string | null;
  // アドバイザー相談リクエスト用：会員が送った希望日程候補
  requested_slots?: string[];
  consult_topic?: string;
  consult_format?: 'zoom' | 'in_person' | 'phone';
}

export const DEMO_BOOKINGS: MatchmakerBooking[] = [
  {
    id: 'BK-101',
    user_name: '高橋 さくら',
    plan: 'ume',
    type: 'advisor_consult',
    scheduled_at: '2026-05-20T10:00:00+09:00',
    duration_minutes: 30,
    status: 'requested',
    notes: 'アプリから相談リクエスト受信。日程調整待ち。',
    consult_topic: 'プロフィールの改善',
    consult_format: 'zoom',
    requested_slots: [
      '2026-05-20 午前（10-12時）',
      '2026-05-22 夜（18-21時）',
      '2026-05-25 昼（12-15時）',
    ],
  },
  {
    id: 'BK-102',
    user_name: '中村 拓也',
    plan: 'matsu',
    type: 'advisor_consult',
    scheduled_at: '2026-05-19T19:00:00+09:00',
    duration_minutes: 45,
    status: 'requested',
    notes: 'アプリから相談リクエスト受信。日程調整待ち。',
    consult_topic: 'デートの進め方',
    consult_format: 'in_person',
    requested_slots: [
      '2026-05-19 夜（18-21時）',
      '2026-05-21 夕方（15-18時）',
    ],
  },
  {
    id: 'BK-001',
    user_name: '佐藤 美咲',
    plan: 'take',
    type: 'zoom',
    scheduled_at: '2026-05-08T10:00:00+09:00',
    duration_minutes: 30,
    status: 'upcoming',
    notes: '入会時 初回相談',
  },
  {
    id: 'BK-002',
    user_name: '田中 太郎',
    plan: 'matsu',
    type: 'in_person',
    scheduled_at: '2026-05-09T14:00:00+09:00',
    duration_minutes: 60,
    status: 'upcoming',
    notes: '対面マッチングセッション 月1回',
  },
  {
    id: 'BK-003',
    user_name: '高橋 大輔',
    plan: 'take',
    type: 'zoom',
    scheduled_at: '2026-05-10T20:00:00+09:00',
    duration_minutes: 30,
    status: 'upcoming',
    notes: 'デート前ブリーフィング',
  },
  {
    id: 'BK-004',
    user_name: '鈴木 花子',
    plan: 'ume',
    type: 'mindset_meeting',
    scheduled_at: '2026-05-11T19:00:00+09:00',
    duration_minutes: 90,
    status: 'upcoming',
    notes: '梅会員初回無料',
  },
  {
    id: 'BK-005',
    user_name: '佐藤 美咲',
    plan: 'take',
    type: 'zoom',
    scheduled_at: '2026-04-20T11:00:00+09:00',
    duration_minutes: 30,
    status: 'completed',
    notes: 'デート後カウンセリング',
  },
];

// 加盟店利用記録（プラン特典）
export interface PartnerUsageRecord {
  id: string;
  user_name: string;
  plan: 'take' | 'matsu';
  partner_name: string;
  partner_category: string;
  used_at: string;
  amount: number;        // 通常料金
  member_paid: number;   // 会員支払い
  company_paid: number;  // 会社負担
  usage_type: 'half' | 'free';
}

export const DEMO_PARTNER_USAGES: PartnerUsageRecord[] = [
  {
    id: 'PU-001',
    user_name: '佐藤 美咲',
    plan: 'take',
    partner_name: 'Hair&Make ROSE',
    partner_category: '美容室',
    used_at: '2026-05-03T15:00:00+09:00',
    amount: 7000,
    member_paid: 3500,
    company_paid: 3500,
    usage_type: 'half',
  },
  {
    id: 'PU-002',
    user_name: '田中 太郎',
    plan: 'matsu',
    partner_name: 'BARBER 麗',
    partner_category: 'メンズ理容',
    used_at: '2026-05-02T11:30:00+09:00',
    amount: 5500,
    member_paid: 0,
    company_paid: 2750,
    usage_type: 'free',
  },
  {
    id: 'PU-003',
    user_name: '鈴木 花子',
    plan: 'take',
    partner_name: 'NAIL atelier 徳島',
    partner_category: 'ネイル',
    used_at: '2026-04-28T14:00:00+09:00',
    amount: 6400,
    member_paid: 3200,
    company_paid: 3200,
    usage_type: 'half',
  },
];

// 解約・クーリングオフ申請
export type CancellationReason = 'married' | 'too_expensive' | 'no_match' | 'other';

export const CANCELLATION_REASON_LABEL: Record<CancellationReason, string> = {
  married: '結婚成立',
  too_expensive: '価格が見合わない',
  no_match: 'マッチが見つからない',
  other: 'その他',
};

export interface CancellationRequest {
  id: string;
  user_name: string;
  plan: 'ume' | 'take' | 'matsu';
  is_cooling_off: boolean;
  applied_at: string;
  contract_amount: number;
  refund_amount: number;
  reason: CancellationReason;
  detail: string | null;
  status: 'pending' | 'approved' | 'rejected';
}

export const DEMO_CANCELLATIONS: CancellationRequest[] = [
  {
    id: 'CN-001',
    user_name: '高橋 大輔',
    plan: 'take',
    is_cooling_off: true,
    applied_at: '2026-05-06T08:00:00+09:00',
    contract_amount: 9800,
    refund_amount: 9800,
    reason: 'other',
    detail: '気が変わった',
    status: 'pending',
  },
  {
    id: 'CN-002',
    user_name: '伊藤 みき',
    plan: 'ume',
    is_cooling_off: false,
    applied_at: '2026-05-02T10:00:00+09:00',
    contract_amount: 2390,
    refund_amount: 0,
    reason: 'married',
    detail: '恋フェスVol.4で出会った方と入籍します',
    status: 'approved',
  },
];

// 月次収益データ（過去6ヶ月）
export interface MonthlyRevenue {
  month: string;
  ume_count: number;
  take_count: number;
  matsu_count: number;
  ume_revenue: number;
  take_revenue: number;
  matsu_revenue: number;
  event_revenue: number;
  tsuchihyo_revenue: number;
  other_revenue: number;
  total: number;
}

export const DEMO_MONTHLY_REVENUE: MonthlyRevenue[] = [
  {
    month: '2025-12',
    ume_count: 12,
    take_count: 2,
    matsu_count: 0,
    ume_revenue: 28680,
    take_revenue: 19600,
    matsu_revenue: 0,
    event_revenue: 480000,
    tsuchihyo_revenue: 78000,
    other_revenue: 25000,
    total: 631280,
  },
  {
    month: '2026-01',
    ume_count: 28,
    take_count: 5,
    matsu_count: 1,
    ume_revenue: 66920,
    take_revenue: 49000,
    matsu_revenue: 298000,
    event_revenue: 0,
    tsuchihyo_revenue: 95000,
    other_revenue: 32000,
    total: 540920,
  },
  {
    month: '2026-02',
    ume_count: 45,
    take_count: 8,
    matsu_count: 2,
    ume_revenue: 107550,
    take_revenue: 78400,
    matsu_revenue: 0,
    event_revenue: 240000,
    tsuchihyo_revenue: 105000,
    other_revenue: 38000,
    total: 568950,
  },
  {
    month: '2026-03',
    ume_count: 78,
    take_count: 14,
    matsu_count: 4,
    ume_revenue: 186420,
    take_revenue: 137200,
    matsu_revenue: 596000,
    event_revenue: 360000,
    tsuchihyo_revenue: 145000,
    other_revenue: 52000,
    total: 1476620,
  },
  {
    month: '2026-04',
    ume_count: 125,
    take_count: 22,
    matsu_count: 7,
    ume_revenue: 298750,
    take_revenue: 215600,
    matsu_revenue: 596000,
    event_revenue: 0,
    tsuchihyo_revenue: 178000,
    other_revenue: 68000,
    total: 1356350,
  },
  {
    month: '2026-05',
    ume_count: 168,
    take_count: 32,
    matsu_count: 10,
    ume_revenue: 401520,
    take_revenue: 313600,
    matsu_revenue: 894000,
    event_revenue: 1260000, // Vol.5
    tsuchihyo_revenue: 245000,
    other_revenue: 95000,
    total: 3209120,
  },
];

// ========== メール配信ログ ==========

export type EmailTemplate =
  | 'welcome'
  | 'payment_receipt'
  | 'cooling_off_notice'
  | 'cancellation_completed'
  | 'event_ticket'
  | 'event_reminder_3d'
  | 'event_reminder_1d'
  | 'event_thanks'
  | 'tsuchihyo_ready'
  | 'match_notification'
  | 'date_proposal_received'
  | 'match_expiring'
  | 'mindset_meeting_invite'
  | 'individual_feedback_invite'
  | 'idle_reactivation';

export const EMAIL_TEMPLATE_LABEL: Record<EmailTemplate, string> = {
  welcome: '入会ウェルカム',
  payment_receipt: '決済領収書',
  cooling_off_notice: 'クーリングオフ通知',
  cancellation_completed: '解約完了通知',
  event_ticket: 'イベントチケット',
  event_reminder_3d: 'イベント3日前リマインド',
  event_reminder_1d: 'イベント前日リマインド',
  event_thanks: 'イベント参加お礼',
  tsuchihyo_ready: '通知表配信完了',
  match_notification: 'マッチ成立通知',
  date_proposal_received: 'デート提案受信',
  match_expiring: 'マッチ失効間近',
  mindset_meeting_invite: 'マインドセット会案内',
  individual_feedback_invite: '個別フィードバック会案内',
  idle_reactivation: '休眠会員リアクティベーション',
};

export type EmailStatus = 'sent' | 'delivered' | 'opened' | 'bounced' | 'failed';

export const EMAIL_STATUS_LABEL: Record<EmailStatus, string> = {
  sent: '送信済',
  delivered: '配信完了',
  opened: '開封済',
  bounced: 'バウンス',
  failed: '送信失敗',
};

export interface EmailLog {
  id: string;
  to_user_id: string;
  to_user_name: string;
  to_email: string;
  template: EmailTemplate;
  subject: string;
  status: EmailStatus;
  sent_at: string;
  opened_at: string | null;
  error_message: string | null;
}

export const DEMO_EMAIL_LOGS: EmailLog[] = [
  {
    id: 'mail-001',
    to_user_id: 'user-001',
    to_user_name: '田中 美咲',
    to_email: 'misaki.t@example.jp',
    template: 'welcome',
    subject: '【MIRAIZ】ご入会ありがとうございます（梅プラン）',
    status: 'opened',
    sent_at: '2026-05-01T10:23:00+09:00',
    opened_at: '2026-05-01T10:45:00+09:00',
    error_message: null,
  },
  {
    id: 'mail-002',
    to_user_id: 'user-001',
    to_user_name: '田中 美咲',
    to_email: 'misaki.t@example.jp',
    template: 'payment_receipt',
    subject: '【MIRAIZ】領収書（¥2,390・梅プラン）',
    status: 'delivered',
    sent_at: '2026-05-01T10:24:00+09:00',
    opened_at: null,
    error_message: null,
  },
  {
    id: 'mail-003',
    to_user_id: 'user-002',
    to_user_name: '山田 健太',
    to_email: 'kenta.y@example.jp',
    template: 'event_ticket',
    subject: '【恋フェスVol.5】チケット発行のお知らせ',
    status: 'opened',
    sent_at: '2026-04-28T18:30:00+09:00',
    opened_at: '2026-04-28T19:12:00+09:00',
    error_message: null,
  },
  {
    id: 'mail-004',
    to_user_id: 'user-003',
    to_user_name: '佐藤 麗奈',
    to_email: 'reina.s@example.jp',
    template: 'cooling_off_notice',
    subject: '【MIRAIZ】クーリングオフ申請を受理しました',
    status: 'opened',
    sent_at: '2026-05-04T11:05:00+09:00',
    opened_at: '2026-05-04T11:18:00+09:00',
    error_message: null,
  },
  {
    id: 'mail-005',
    to_user_id: 'user-004',
    to_user_name: '鈴木 翔太',
    to_email: 'shota@example.jp',
    template: 'tsuchihyo_ready',
    subject: '【恋フェス】あなたの恋愛通知表が届きました',
    status: 'opened',
    sent_at: '2026-03-16T20:00:00+09:00',
    opened_at: '2026-03-16T20:23:00+09:00',
    error_message: null,
  },
  {
    id: 'mail-006',
    to_user_id: 'user-005',
    to_user_name: '高橋 さくら',
    to_email: 'sakura.t@example.jp',
    template: 'match_notification',
    subject: '【MIRAIZ】マッチが成立しました',
    status: 'delivered',
    sent_at: '2026-05-05T14:22:00+09:00',
    opened_at: null,
    error_message: null,
  },
  {
    id: 'mail-007',
    to_user_id: 'user-006',
    to_user_name: '伊藤 大輔',
    to_email: 'daisuke.i@example.jp',
    template: 'event_reminder_3d',
    subject: '【恋フェスVol.5】3日前のお知らせ・持ち物確認',
    status: 'sent',
    sent_at: '2026-05-06T09:00:00+09:00',
    opened_at: null,
    error_message: null,
  },
  {
    id: 'mail-008',
    to_user_id: 'user-007',
    to_user_name: '渡辺 真由',
    to_email: 'mayu@example.jp',
    template: 'mindset_meeting_invite',
    subject: '【MIRAIZ】5月のマインドセット会のご案内',
    status: 'opened',
    sent_at: '2026-05-02T19:00:00+09:00',
    opened_at: '2026-05-02T19:34:00+09:00',
    error_message: null,
  },
  {
    id: 'mail-009',
    to_user_id: 'user-008',
    to_user_name: '中村 拓也',
    to_email: 'takuya.n@example.jp',
    template: 'cancellation_completed',
    subject: '【MIRAIZ】解約完了のお知らせ',
    status: 'delivered',
    sent_at: '2026-04-30T16:45:00+09:00',
    opened_at: null,
    error_message: null,
  },
  {
    id: 'mail-010',
    to_user_id: 'user-009',
    to_user_name: '小林 由美',
    to_email: 'yumi.k@example.jp',
    template: 'date_proposal_received',
    subject: '【MIRAIZ】デートのお誘いが届きました',
    status: 'opened',
    sent_at: '2026-05-05T22:30:00+09:00',
    opened_at: '2026-05-05T22:55:00+09:00',
    error_message: null,
  },
  {
    id: 'mail-011',
    to_user_id: 'user-010',
    to_user_name: '加藤 雄一',
    to_email: 'yuichi.k@oldmail.jp',
    template: 'payment_receipt',
    subject: '【MIRAIZ】領収書（¥9,800・竹プラン）',
    status: 'bounced',
    sent_at: '2026-05-03T11:15:00+09:00',
    opened_at: null,
    error_message: 'メールアドレスが存在しません（550 5.1.1）',
  },
  {
    id: 'mail-012',
    to_user_id: 'user-011',
    to_user_name: '吉田 香織',
    to_email: 'kaori.y@example.jp',
    template: 'idle_reactivation',
    subject: '【MIRAIZ】お久しぶりです・新着の方からアクションが',
    status: 'sent',
    sent_at: '2026-05-06T08:00:00+09:00',
    opened_at: null,
    error_message: null,
  },
  {
    id: 'mail-013',
    to_user_id: 'user-012',
    to_user_name: '松本 直樹',
    to_email: 'naoki.m@example.jp',
    template: 'individual_feedback_invite',
    subject: '【MIRAIZ】個別フィードバック会のご案内（松プラン）',
    status: 'opened',
    sent_at: '2026-05-04T14:00:00+09:00',
    opened_at: '2026-05-04T14:08:00+09:00',
    error_message: null,
  },
  {
    id: 'mail-014',
    to_user_id: 'user-013',
    to_user_name: '林 美穂',
    to_email: 'miho.h@example.jp',
    template: 'match_expiring',
    subject: '【MIRAIZ】マッチがあと3日で失効します',
    status: 'delivered',
    sent_at: '2026-05-06T07:30:00+09:00',
    opened_at: null,
    error_message: null,
  },
  {
    id: 'mail-015',
    to_user_id: 'user-014',
    to_user_name: '清水 涼',
    to_email: 'ryo.s@example.jp',
    template: 'event_thanks',
    subject: '【恋フェスVol.4】ご参加ありがとうございました',
    status: 'opened',
    sent_at: '2026-03-15T22:00:00+09:00',
    opened_at: '2026-03-15T22:34:00+09:00',
    error_message: null,
  },
];

// ========== イベント分析 ==========

export interface EventAnalytics {
  event_token: string;
  event_name: string;
  event_date: string;
  capacity: number;
  tickets_sold: number;
  attended: number;
  no_show: number;
  total_conversations: number;       // 全会話数（参加者×回数）
  mid_eval_completed: number;        // MID評価提出件数
  mid_eval_completion_rate: number;  // MID完了率（提出/想定）
  matches_formed: number;            // 相互ライク成立数
  date_proposals: number;            // デート提案発生数
  date_confirmed: number;            // デート確定数
  tsuchihyo_distributed: number;     // 通知表配信数
  tsuchihyo_purchased: number;       // 通知表購入数（¥2,190）
  ticket_revenue: number;
  tsuchihyo_revenue: number;
  status: 'upcoming' | 'in_progress' | 'completed';
  fill_rate: number; // tickets_sold/capacity
}

export const DEMO_EVENT_ANALYTICS: EventAnalytics[] = [
  {
    event_token: 'vol5-pm',
    event_name: '恋フェスVol.5（午後の部）',
    event_date: '2026-06-13T14:00:00+09:00',
    capacity: 60,
    tickets_sold: 47,
    attended: 0,
    no_show: 0,
    total_conversations: 0,
    mid_eval_completed: 0,
    mid_eval_completion_rate: 0,
    matches_formed: 0,
    date_proposals: 0,
    date_confirmed: 0,
    tsuchihyo_distributed: 0,
    tsuchihyo_purchased: 0,
    ticket_revenue: 282000,
    tsuchihyo_revenue: 0,
    status: 'upcoming',
    fill_rate: 78,
  },
  {
    event_token: 'vol5-am',
    event_name: '恋フェスVol.5（午前の部）',
    event_date: '2026-06-13T10:00:00+09:00',
    capacity: 60,
    tickets_sold: 52,
    attended: 0,
    no_show: 0,
    total_conversations: 0,
    mid_eval_completed: 0,
    mid_eval_completion_rate: 0,
    matches_formed: 0,
    date_proposals: 0,
    date_confirmed: 0,
    tsuchihyo_distributed: 0,
    tsuchihyo_purchased: 0,
    ticket_revenue: 312000,
    tsuchihyo_revenue: 0,
    status: 'upcoming',
    fill_rate: 87,
  },
  {
    event_token: 'vol4',
    event_name: '恋フェスVol.4',
    event_date: '2026-03-15T14:00:00+09:00',
    capacity: 60,
    tickets_sold: 58,
    attended: 54,
    no_show: 4,
    total_conversations: 378,
    mid_eval_completed: 351,
    mid_eval_completion_rate: 93,
    matches_formed: 42,
    date_proposals: 28,
    date_confirmed: 19,
    tsuchihyo_distributed: 54,
    tsuchihyo_purchased: 31,
    ticket_revenue: 348000,
    tsuchihyo_revenue: 67890,
    status: 'completed',
    fill_rate: 97,
  },
  {
    event_token: 'vol3',
    event_name: '恋フェスVol.3',
    event_date: '2025-12-14T14:00:00+09:00',
    capacity: 50,
    tickets_sold: 50,
    attended: 48,
    no_show: 2,
    total_conversations: 336,
    mid_eval_completed: 298,
    mid_eval_completion_rate: 89,
    matches_formed: 38,
    date_proposals: 24,
    date_confirmed: 16,
    tsuchihyo_distributed: 48,
    tsuchihyo_purchased: 22,
    ticket_revenue: 300000,
    tsuchihyo_revenue: 48180,
    status: 'completed',
    fill_rate: 100,
  },
  {
    event_token: 'vol2',
    event_name: '恋フェスVol.2',
    event_date: '2025-09-15T14:00:00+09:00',
    capacity: 40,
    tickets_sold: 38,
    attended: 36,
    no_show: 2,
    total_conversations: 252,
    mid_eval_completed: 218,
    mid_eval_completion_rate: 87,
    matches_formed: 28,
    date_proposals: 17,
    date_confirmed: 11,
    tsuchihyo_distributed: 36,
    tsuchihyo_purchased: 14,
    ticket_revenue: 228000,
    tsuchihyo_revenue: 30660,
    status: 'completed',
    fill_rate: 95,
  },
];

// ========== 相互評価フィード（MID evaluations 横断ビュー） ==========

export interface EvaluationFeedItem {
  id: string;
  event_token: string;
  event_name: string;
  evaluator_id: string;
  evaluator_name: string;
  evaluator_gender: 'male' | 'female';
  partner_id: string;
  partner_name: string;
  appearance_score: number;       // 1-10
  talkability_score: number;      // 1-10
  want_contact: boolean;
  comfortable: boolean;
  was_listened: boolean;
  not_judged: boolean;
  shared_topics: boolean;
  reasons: string[];               // 表示用ラベル
  improve_tags: string[];          // LookTag label
  attractive_tags: string[];       // LookTag label
  impression_keyword: string | null;
  submitted_at: string;
  flag: 'normal' | 'concerning' | 'mutual_match'; // 要注意・相互高評価
}

export const DEMO_EVALUATION_FEED: EvaluationFeedItem[] = [
  {
    id: 'eval-101',
    event_token: 'vol4',
    event_name: '恋フェスVol.4',
    evaluator_id: 'demo-me',
    evaluator_name: '本人',
    evaluator_gender: 'male',
    partner_id: 'demo-1',
    partner_name: '美咲',
    appearance_score: 8,
    talkability_score: 9,
    want_contact: true,
    comfortable: true,
    was_listened: true,
    not_judged: true,
    shared_topics: true,
    reasons: ['もっと話してみたい', '見た目がタイプ'],
    improve_tags: ['髪型'],
    attractive_tags: ['笑顔', '雰囲気', '清潔感'],
    impression_keyword: '柔らかくて聞き上手',
    submitted_at: '2026-03-15T15:42:00+09:00',
    flag: 'mutual_match',
  },
  {
    id: 'eval-102',
    event_token: 'vol4',
    event_name: '恋フェスVol.4',
    evaluator_id: 'user-022',
    evaluator_name: '佐藤 麗奈',
    evaluator_gender: 'female',
    partner_id: 'user-088',
    partner_name: '加藤 雄一',
    appearance_score: 4,
    talkability_score: 3,
    want_contact: false,
    comfortable: false,
    was_listened: false,
    not_judged: false,
    shared_topics: false,
    reasons: ['価値観が合わなかった'],
    improve_tags: ['服装のサイズ感', '清潔感', '姿勢'],
    attractive_tags: [],
    impression_keyword: '一方的に話す',
    submitted_at: '2026-03-15T15:48:00+09:00',
    flag: 'concerning',
  },
  {
    id: 'eval-103',
    event_token: 'vol4',
    event_name: '恋フェスVol.4',
    evaluator_id: 'user-035',
    evaluator_name: '高橋 さくら',
    evaluator_gender: 'female',
    partner_id: 'user-088',
    partner_name: '加藤 雄一',
    appearance_score: 5,
    talkability_score: 2,
    want_contact: false,
    comfortable: false,
    was_listened: false,
    not_judged: false,
    shared_topics: false,
    reasons: ['あまり話が合わなかった'],
    improve_tags: ['服装のサイズ感', '姿勢'],
    attractive_tags: [],
    impression_keyword: null,
    submitted_at: '2026-03-15T16:01:00+09:00',
    flag: 'concerning',
  },
  {
    id: 'eval-104',
    event_token: 'vol4',
    event_name: '恋フェスVol.4',
    evaluator_id: 'user-041',
    evaluator_name: '渡辺 真由',
    evaluator_gender: 'female',
    partner_id: 'user-088',
    partner_name: '加藤 雄一',
    appearance_score: 4,
    talkability_score: 3,
    want_contact: false,
    comfortable: false,
    was_listened: false,
    not_judged: true,
    shared_topics: false,
    reasons: ['価値観が合わなかった'],
    improve_tags: ['服装のサイズ感', '清潔感'],
    attractive_tags: [],
    impression_keyword: null,
    submitted_at: '2026-03-15T16:14:00+09:00',
    flag: 'concerning',
  },
  {
    id: 'eval-105',
    event_token: 'vol4',
    event_name: '恋フェスVol.4',
    evaluator_id: 'user-058',
    evaluator_name: '中村 拓也',
    evaluator_gender: 'male',
    partner_id: 'user-022',
    partner_name: '佐藤 麗奈',
    appearance_score: 9,
    talkability_score: 10,
    want_contact: true,
    comfortable: true,
    was_listened: true,
    not_judged: true,
    shared_topics: true,
    reasons: ['もっと話してみたい', '価値観が合いそう', '笑顔が素敵だった'],
    improve_tags: [],
    attractive_tags: ['笑顔', '雰囲気', '清潔感'],
    impression_keyword: '一緒にいて落ち着く',
    submitted_at: '2026-03-15T16:22:00+09:00',
    flag: 'mutual_match',
  },
  {
    id: 'eval-106',
    event_token: 'vol4',
    event_name: '恋フェスVol.4',
    evaluator_id: 'user-022',
    evaluator_name: '佐藤 麗奈',
    evaluator_gender: 'female',
    partner_id: 'user-058',
    partner_name: '中村 拓也',
    appearance_score: 8,
    talkability_score: 9,
    want_contact: true,
    comfortable: true,
    was_listened: true,
    not_judged: true,
    shared_topics: true,
    reasons: ['もっと話してみたい', '落ち着く感じがした'],
    improve_tags: [],
    attractive_tags: ['雰囲気', '笑顔'],
    impression_keyword: '安心感',
    submitted_at: '2026-03-15T16:25:00+09:00',
    flag: 'mutual_match',
  },
  {
    id: 'eval-107',
    event_token: 'vol3',
    event_name: '恋フェスVol.3',
    evaluator_id: 'user-077',
    evaluator_name: '林 美穂',
    evaluator_gender: 'female',
    partner_id: 'user-091',
    partner_name: '吉田 健',
    appearance_score: 7,
    talkability_score: 8,
    want_contact: true,
    comfortable: true,
    was_listened: true,
    not_judged: true,
    shared_topics: false,
    reasons: ['もっと話してみたい'],
    improve_tags: ['眉毛'],
    attractive_tags: ['笑顔', '清潔感'],
    impression_keyword: 'まじめ',
    submitted_at: '2025-12-14T15:30:00+09:00',
    flag: 'normal',
  },
];

// 同一ユーザーが連続して低評価／要注意フラグを受けたら集計（admin警告用）
export interface ConcerningUser {
  user_id: string;
  user_name: string;
  total_evaluations: number;
  avg_appearance: number;
  avg_talkability: number;
  not_judged_false_count: number;     // 「否定されない」=否のカウント
  was_listened_false_count: number;
  comfortable_false_count: number;
  recurring_improve_tags: string[];
  reports_count: number;
}

export const DEMO_CONCERNING_USERS: ConcerningUser[] = [
  {
    user_id: 'user-088',
    user_name: '加藤 雄一',
    total_evaluations: 7,
    avg_appearance: 4.4,
    avg_talkability: 2.7,
    not_judged_false_count: 5,
    was_listened_false_count: 6,
    comfortable_false_count: 6,
    recurring_improve_tags: ['服装のサイズ感', '姿勢', '清潔感'],
    reports_count: 1,
  },
  {
    user_id: 'user-103',
    user_name: '木村 翔',
    total_evaluations: 5,
    avg_appearance: 5.2,
    avg_talkability: 4.0,
    not_judged_false_count: 2,
    was_listened_false_count: 3,
    comfortable_false_count: 3,
    recurring_improve_tags: ['髪型', '清潔感'],
    reports_count: 0,
  },
];

// ========== 集客・リード管理 ==========

export type AcquisitionSource =
  | 'organic_search'
  | 'instagram_ad'
  | 'instagram_organic'
  | 'tiktok'
  | 'google_ad'
  | 'friend_referral'
  | 'event_walkin'
  | 'event_attendee'
  | 'press_article'
  | 'lp_direct'
  | 'partner_shop'
  | 'unknown';

export const ACQUISITION_SOURCE_LABEL: Record<AcquisitionSource, string> = {
  organic_search: 'Google検索',
  instagram_ad: 'Instagram広告',
  instagram_organic: 'Instagramオーガニック',
  tiktok: 'TikTok',
  google_ad: 'Google広告',
  friend_referral: '友人紹介',
  event_walkin: 'イベント当日チラシ',
  event_attendee: 'イベント参加者',
  press_article: 'プレス記事',
  lp_direct: 'LP直リンク',
  partner_shop: '加盟店紹介',
  unknown: '不明',
};

export const ACQUISITION_SOURCE_GROUP: Record<AcquisitionSource, 'paid' | 'organic' | 'event' | 'referral' | 'unknown'> = {
  instagram_ad: 'paid',
  google_ad: 'paid',
  organic_search: 'organic',
  instagram_organic: 'organic',
  tiktok: 'organic',
  press_article: 'organic',
  lp_direct: 'organic',
  event_walkin: 'event',
  event_attendee: 'event',
  friend_referral: 'referral',
  partner_shop: 'referral',
  unknown: 'unknown',
};

export const ACQUISITION_SOURCE_GROUP_LABEL: Record<'paid' | 'organic' | 'event' | 'referral' | 'unknown', string> = {
  paid: '広告',
  organic: 'オーガニック',
  event: 'イベント',
  referral: '紹介',
  unknown: '不明',
};

export const ACQUISITION_SOURCE_MONTHLY_COST: Partial<Record<AcquisitionSource, number>> = {
  instagram_ad: 50000,
  google_ad: 30000,
};

export type LeadStatus = 'new' | 'engaged' | 'converted_free' | 'converted_paid' | 'cold' | 'rejected';

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: '新規',
  engaged: 'エンゲージ',
  converted_free: '無料登録',
  converted_paid: '本会員昇格',
  cold: '休眠',
  rejected: '対象外',
};

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  age: number;
  source: AcquisitionSource;
  source_event_token: string | null;
  source_campaign: string | null;
  source_referrer: string | null;
  registered_at: string;
  status: LeadStatus;
  converted_application_id: string | null;
  last_activity_at: string;
  notes: string | null;
}

export const DEMO_LEADS: Lead[] = [
  {
    id: 'lead-001',
    name: '吉田 真由子',
    email: 'mayuko.y@example.jp',
    phone: '08011112233',
    gender: 'female',
    age: 28,
    source: 'event_attendee',
    source_event_token: 'vol4',
    source_campaign: null,
    source_referrer: 'vol4_thank_you_page',
    registered_at: '2026-03-15T18:30:00+09:00',
    status: 'converted_paid',
    converted_application_id: 'APP-2026-002',
    last_activity_at: '2026-05-04T11:21:00+09:00',
    notes: 'Vol.4参加後、竹プランへ昇格。仲人相談1回完了',
  },
  {
    id: 'lead-002',
    name: '伊藤 健司',
    email: 'kenji.i@example.jp',
    phone: '09022223344',
    gender: 'male',
    age: 32,
    source: 'instagram_ad',
    source_event_token: null,
    source_campaign: 'spring_2026_q2',
    source_referrer: 'instagram_reels',
    registered_at: '2026-04-22T20:15:00+09:00',
    status: 'converted_paid',
    converted_application_id: 'APP-2026-004',
    last_activity_at: '2026-05-03T09:01:00+09:00',
    notes: 'リール広告→LP→7日後に梅プラン課金',
  },
  {
    id: 'lead-003',
    name: '中村 さくら',
    email: 'sakura.n@example.jp',
    phone: '07033334455',
    gender: 'female',
    age: 26,
    source: 'event_walkin',
    source_event_token: 'vol4',
    source_campaign: null,
    source_referrer: 'flyer_qr',
    registered_at: '2026-03-15T16:45:00+09:00',
    status: 'engaged',
    converted_application_id: null,
    last_activity_at: '2026-05-02T14:20:00+09:00',
    notes: 'Vol.4配布QR登録・LP再訪3回・未課金',
  },
  {
    id: 'lead-004',
    name: '加藤 翔太',
    email: 'shota.k@example.jp',
    phone: '08044445566',
    gender: 'male',
    age: 35,
    source: 'friend_referral',
    source_event_token: null,
    source_campaign: 'referral_2026q2',
    source_referrer: 'user-022',
    registered_at: '2026-04-30T11:00:00+09:00',
    status: 'new',
    converted_application_id: null,
    last_activity_at: '2026-04-30T11:00:00+09:00',
    notes: '佐藤 麗奈からの紹介・本人確認待ち',
  },
  {
    id: 'lead-005',
    name: '小川 美咲',
    email: 'misaki.o@example.jp',
    phone: '09055556677',
    gender: 'female',
    age: 30,
    source: 'organic_search',
    source_event_token: null,
    source_campaign: null,
    source_referrer: 'google.com/search?q=徳島+婚活',
    registered_at: '2026-04-15T13:30:00+09:00',
    status: 'converted_free',
    converted_application_id: null,
    last_activity_at: '2026-05-05T22:00:00+09:00',
    notes: 'SEO流入・無料診断完了・有料化未',
  },
  {
    id: 'lead-006',
    name: '田中 浩二',
    email: 'koji.t@example.jp',
    phone: '07066667788',
    gender: 'male',
    age: 40,
    source: 'press_article',
    source_event_token: null,
    source_campaign: 'tokushima_news',
    source_referrer: 'tokushima-shimbun.co.jp',
    registered_at: '2026-04-10T09:00:00+09:00',
    status: 'cold',
    converted_application_id: null,
    last_activity_at: '2026-04-10T09:15:00+09:00',
    notes: '徳島新聞掲載後の登録・以降アクション無し',
  },
  {
    id: 'lead-007',
    name: '鈴木 由美',
    email: 'yumi.s@example.jp',
    phone: '08077778899',
    gender: 'female',
    age: 29,
    source: 'event_attendee',
    source_event_token: 'vol3',
    source_campaign: null,
    source_referrer: 'vol3_post_event_email',
    registered_at: '2025-12-15T10:00:00+09:00',
    status: 'converted_paid',
    converted_application_id: 'APP-2025-088',
    last_activity_at: '2026-05-01T19:30:00+09:00',
    notes: 'Vol.3後に松プラン契約・継続中',
  },
  {
    id: 'lead-008',
    name: '高橋 大輝',
    email: 'daiki.t@example.jp',
    phone: '09088889900',
    gender: 'male',
    age: 33,
    source: 'instagram_ad',
    source_event_token: null,
    source_campaign: 'spring_2026_q2',
    source_referrer: 'instagram_stories',
    registered_at: '2026-04-25T18:00:00+09:00',
    status: 'engaged',
    converted_application_id: null,
    last_activity_at: '2026-05-04T20:30:00+09:00',
    notes: 'ストーリー広告→LP→マインドセット会興味',
  },
  {
    id: 'lead-009',
    name: '林 さおり',
    email: 'saori.h@example.jp',
    phone: '07099990011',
    gender: 'female',
    age: 31,
    source: 'partner_shop',
    source_event_token: null,
    source_campaign: null,
    source_referrer: 'beauty_salon_miishiki',
    registered_at: '2026-04-28T17:00:00+09:00',
    status: 'converted_paid',
    converted_application_id: 'APP-2026-005',
    last_activity_at: '2026-05-04T22:00:00+09:00',
    notes: '美意識サロンでの紹介・梅プラン課金',
  },
  {
    id: 'lead-010',
    name: '渡辺 拓也',
    email: 'takuya.w@example.jp',
    phone: '08000110022',
    gender: 'male',
    age: 27,
    source: 'tiktok',
    source_event_token: null,
    source_campaign: 'koifes_dance_challenge',
    source_referrer: 'tiktok_video_8842',
    registered_at: '2026-05-01T22:30:00+09:00',
    status: 'new',
    converted_application_id: null,
    last_activity_at: '2026-05-01T22:30:00+09:00',
    notes: 'TikTokダンスチャレンジ動画から流入',
  },
  {
    id: 'lead-011',
    name: '藤田 麻里',
    email: 'mari.f@example.jp',
    phone: '09011220033',
    gender: 'female',
    age: 34,
    source: 'lp_direct',
    source_event_token: null,
    source_campaign: null,
    source_referrer: 'koifes.jp/premium',
    registered_at: '2026-04-20T11:30:00+09:00',
    status: 'rejected',
    converted_application_id: null,
    last_activity_at: '2026-04-22T10:00:00+09:00',
    notes: '本人確認NG（既婚判明）',
  },
  {
    id: 'lead-012',
    name: '清水 涼介',
    email: 'ryosuke.s@example.jp',
    phone: '07022330044',
    gender: 'male',
    age: 30,
    source: 'event_walkin',
    source_event_token: 'vol3',
    source_campaign: null,
    source_referrer: 'flyer_qr',
    registered_at: '2025-12-14T16:00:00+09:00',
    status: 'converted_free',
    converted_application_id: null,
    last_activity_at: '2026-04-10T18:00:00+09:00',
    notes: 'Vol.3当日チラシ→無料診断のみ・課金検討中',
  },
];

// 月次の集客サマリー
export interface AcquisitionMonthly {
  month: string;
  leads_total: number;
  leads_by_source: Partial<Record<AcquisitionSource, number>>;
  applications_total: number;
  applications_by_source: Partial<Record<AcquisitionSource, number>>;
  ad_spend: number;
  conversion_rate_pct: number;
  cac: number;
}

export const DEMO_ACQUISITION_MONTHLY: AcquisitionMonthly[] = [
  {
    month: '2025-12',
    leads_total: 28,
    leads_by_source: { event_walkin: 12, event_attendee: 8, organic_search: 4, instagram_ad: 2, friend_referral: 2 },
    applications_total: 12,
    applications_by_source: { event_attendee: 6, event_walkin: 3, friend_referral: 2, organic_search: 1 },
    ad_spend: 30000,
    conversion_rate_pct: 43,
    cac: 5000,
  },
  {
    month: '2026-01',
    leads_total: 35,
    leads_by_source: { event_attendee: 14, organic_search: 8, instagram_ad: 7, friend_referral: 4, lp_direct: 2 },
    applications_total: 14,
    applications_by_source: { event_attendee: 7, instagram_ad: 3, friend_referral: 2, organic_search: 2 },
    ad_spend: 50000,
    conversion_rate_pct: 40,
    cac: 5000,
  },
  {
    month: '2026-02',
    leads_total: 42,
    leads_by_source: { instagram_ad: 12, organic_search: 10, event_attendee: 8, friend_referral: 5, partner_shop: 4, press_article: 3 },
    applications_total: 18,
    applications_by_source: { instagram_ad: 5, event_attendee: 4, organic_search: 3, friend_referral: 3, partner_shop: 3 },
    ad_spend: 80000,
    conversion_rate_pct: 43,
    cac: 4444,
  },
  {
    month: '2026-03',
    leads_total: 78,
    leads_by_source: { event_walkin: 22, event_attendee: 18, instagram_ad: 14, organic_search: 12, friend_referral: 6, partner_shop: 4, press_article: 2 },
    applications_total: 32,
    applications_by_source: { event_attendee: 12, event_walkin: 6, instagram_ad: 6, organic_search: 4, friend_referral: 3, partner_shop: 1 },
    ad_spend: 80000,
    conversion_rate_pct: 41,
    cac: 2500,
  },
  {
    month: '2026-04',
    leads_total: 95,
    leads_by_source: { instagram_ad: 28, organic_search: 18, event_attendee: 14, friend_referral: 12, partner_shop: 10, lp_direct: 6, tiktok: 4, press_article: 3 },
    applications_total: 38,
    applications_by_source: { instagram_ad: 11, event_attendee: 8, friend_referral: 6, organic_search: 5, partner_shop: 5, lp_direct: 2, tiktok: 1 },
    ad_spend: 100000,
    conversion_rate_pct: 40,
    cac: 2632,
  },
  {
    month: '2026-05',
    leads_total: 64,
    leads_by_source: { instagram_ad: 22, organic_search: 14, friend_referral: 10, event_attendee: 8, partner_shop: 5, tiktok: 3, lp_direct: 2 },
    applications_total: 22,
    applications_by_source: { instagram_ad: 7, friend_referral: 5, event_attendee: 4, organic_search: 3, partner_shop: 3 },
    ad_spend: 80000,
    conversion_rate_pct: 34,
    cac: 3636,
  },
];

// イベント別の集客→本会員転換ファネル
export interface EventAcquisitionFunnel {
  event_token: string;
  event_name: string;
  event_date: string;
  attended: number;
  leads_generated: number;
  free_signups: number;
  paid_signups: number;
  paid_revenue: number;
  conversion_rate_pct: number;
}

export const DEMO_EVENT_ACQUISITION_FUNNEL: EventAcquisitionFunnel[] = [
  {
    event_token: 'vol4',
    event_name: '恋フェスVol.4',
    event_date: '2026-03-15',
    attended: 54,
    leads_generated: 40,
    free_signups: 28,
    paid_signups: 18,
    paid_revenue: 542000,
    conversion_rate_pct: 33,
  },
  {
    event_token: 'vol3',
    event_name: '恋フェスVol.3',
    event_date: '2025-12-14',
    attended: 48,
    leads_generated: 35,
    free_signups: 24,
    paid_signups: 14,
    paid_revenue: 388000,
    conversion_rate_pct: 29,
  },
  {
    event_token: 'vol2',
    event_name: '恋フェスVol.2',
    event_date: '2025-09-15',
    attended: 36,
    leads_generated: 26,
    free_signups: 18,
    paid_signups: 8,
    paid_revenue: 142000,
    conversion_rate_pct: 22,
  },
];

// ========== スワイプ・マッチ分析（アプリ内行動） ==========

export interface SwipeUserStats {
  user_id: string;
  user_name: string;
  gender: 'male' | 'female';
  age: number;
  plan: 'free' | 'ume' | 'take' | 'matsu';
  swipes_total: number;
  likes_given: number;
  passes_given: number;
  likes_received: number;
  matches_count: number;
  like_rate_pct: number;          // 自分が出したlikeの割合
  popularity_pct: number;          // likesされた回数 / 自分が見られた回数
  match_rate_pct: number;          // matches / likes_given
  last_active_at: string;
  joined_at: string;
  flag: 'normal' | 'low_engagement' | 'highly_popular' | 'profile_concern';
}

export const DEMO_SWIPE_USER_STATS: SwipeUserStats[] = [
  {
    user_id: 'demo-1',
    user_name: '佐藤 麗奈',
    gender: 'female',
    age: 27,
    plan: 'take',
    swipes_total: 142,
    likes_given: 28,
    passes_given: 114,
    likes_received: 89,
    matches_count: 12,
    like_rate_pct: 20,
    popularity_pct: 63,
    match_rate_pct: 43,
    last_active_at: '2026-05-06T08:30:00+09:00',
    joined_at: '2026-03-16T11:20:00+09:00',
    flag: 'highly_popular',
  },
  {
    user_id: 'demo-2',
    user_name: '中村 拓也',
    gender: 'male',
    age: 31,
    plan: 'matsu',
    swipes_total: 218,
    likes_given: 45,
    passes_given: 173,
    likes_received: 22,
    matches_count: 8,
    like_rate_pct: 21,
    popularity_pct: 18,
    match_rate_pct: 18,
    last_active_at: '2026-05-06T07:45:00+09:00',
    joined_at: '2026-03-15T17:30:00+09:00',
    flag: 'normal',
  },
  {
    user_id: 'demo-3',
    user_name: '高橋 さくら',
    gender: 'female',
    age: 29,
    plan: 'ume',
    swipes_total: 95,
    likes_given: 22,
    passes_given: 73,
    likes_received: 54,
    matches_count: 9,
    like_rate_pct: 23,
    popularity_pct: 51,
    match_rate_pct: 41,
    last_active_at: '2026-05-05T22:00:00+09:00',
    joined_at: '2026-04-01T10:00:00+09:00',
    flag: 'normal',
  },
  {
    user_id: 'demo-4',
    user_name: '伊藤 大輔',
    gender: 'male',
    age: 35,
    plan: 'take',
    swipes_total: 312,
    likes_given: 78,
    passes_given: 234,
    likes_received: 8,
    matches_count: 2,
    like_rate_pct: 25,
    popularity_pct: 6,
    match_rate_pct: 3,
    last_active_at: '2026-05-06T09:15:00+09:00',
    joined_at: '2026-02-15T19:00:00+09:00',
    flag: 'profile_concern',
  },
  {
    user_id: 'demo-5',
    user_name: '田中 美咲',
    gender: 'female',
    age: 28,
    plan: 'matsu',
    swipes_total: 67,
    likes_given: 8,
    passes_given: 59,
    likes_received: 76,
    matches_count: 7,
    like_rate_pct: 12,
    popularity_pct: 72,
    match_rate_pct: 88,
    last_active_at: '2026-05-06T08:00:00+09:00',
    joined_at: '2026-04-10T14:00:00+09:00',
    flag: 'highly_popular',
  },
  {
    user_id: 'demo-6',
    user_name: '渡辺 真由',
    gender: 'female',
    age: 33,
    plan: 'ume',
    swipes_total: 12,
    likes_given: 2,
    passes_given: 10,
    likes_received: 18,
    matches_count: 1,
    like_rate_pct: 17,
    popularity_pct: 28,
    match_rate_pct: 50,
    last_active_at: '2026-04-22T20:00:00+09:00',
    joined_at: '2026-02-20T11:00:00+09:00',
    flag: 'low_engagement',
  },
  {
    user_id: 'demo-7',
    user_name: '加藤 雄一',
    gender: 'male',
    age: 38,
    plan: 'take',
    swipes_total: 487,
    likes_given: 142,
    passes_given: 345,
    likes_received: 3,
    matches_count: 0,
    like_rate_pct: 29,
    popularity_pct: 1,
    match_rate_pct: 0,
    last_active_at: '2026-05-03T16:48:00+09:00',
    joined_at: '2026-01-10T20:00:00+09:00',
    flag: 'profile_concern',
  },
];

// 日次のアプリ内アクティビティ
export interface DailySwipeActivity {
  date: string;
  active_users: number;
  total_swipes: number;
  total_likes: number;
  matches_formed: number;
  messages_sent: number;
}

export const DEMO_DAILY_SWIPE_ACTIVITY: DailySwipeActivity[] = [
  { date: '2026-04-30', active_users: 142, total_swipes: 1820, total_likes: 412, matches_formed: 18, messages_sent: 87 },
  { date: '2026-05-01', active_users: 156, total_swipes: 2104, total_likes: 478, matches_formed: 22, messages_sent: 102 },
  { date: '2026-05-02', active_users: 168, total_swipes: 2240, total_likes: 520, matches_formed: 24, messages_sent: 115 },
  { date: '2026-05-03', active_users: 134, total_swipes: 1820, total_likes: 408, matches_formed: 17, messages_sent: 78 },
  { date: '2026-05-04', active_users: 178, total_swipes: 2356, total_likes: 564, matches_formed: 26, messages_sent: 128 },
  { date: '2026-05-05', active_users: 192, total_swipes: 2580, total_likes: 612, matches_formed: 31, messages_sent: 145 },
  { date: '2026-05-06', active_users: 205, total_swipes: 2768, total_likes: 658, matches_formed: 34, messages_sent: 167 },
];

// ========== ユーザーセッション（ログイン履歴・滞在時間） ==========

export type DeviceType = 'ios' | 'android' | 'web_chrome' | 'web_safari' | 'web_firefox';

export const DEVICE_TYPE_LABEL: Record<DeviceType, string> = {
  ios: 'iOS App',
  android: 'Android App',
  web_chrome: 'Web (Chrome)',
  web_safari: 'Web (Safari)',
  web_firefox: 'Web (Firefox)',
};

export interface UserSession {
  id: string;
  user_id: string;
  user_name: string;
  plan: 'free' | 'ume' | 'take' | 'matsu';
  started_at: string;
  ended_at: string | null;        // null は現在アクティブ
  duration_minutes: number;        // 滞在時間（アクティブなら経過時間）
  device: DeviceType;
  ip_address: string;
  location_estimate: string;
  pages_viewed: number;
  swipes_in_session: number;
  messages_sent_in_session: number;
  active_now: boolean;
}

export const DEMO_USER_SESSIONS: UserSession[] = [
  {
    id: 'sess-001',
    user_id: 'demo-1',
    user_name: '佐藤 麗奈',
    plan: 'take',
    started_at: '2026-05-06T08:30:00+09:00',
    ended_at: null,
    duration_minutes: 23,
    device: 'ios',
    ip_address: '210.165.93.221',
    location_estimate: '徳島県徳島市',
    pages_viewed: 14,
    swipes_in_session: 18,
    messages_sent_in_session: 3,
    active_now: true,
  },
  {
    id: 'sess-002',
    user_id: 'demo-2',
    user_name: '中村 拓也',
    plan: 'matsu',
    started_at: '2026-05-06T07:45:00+09:00',
    ended_at: null,
    duration_minutes: 68,
    device: 'ios',
    ip_address: '126.34.12.88',
    location_estimate: '徳島県小松島市',
    pages_viewed: 32,
    swipes_in_session: 42,
    messages_sent_in_session: 7,
    active_now: true,
  },
  {
    id: 'sess-003',
    user_id: 'demo-3',
    user_name: '高橋 さくら',
    plan: 'ume',
    started_at: '2026-05-06T08:15:00+09:00',
    ended_at: null,
    duration_minutes: 12,
    device: 'android',
    ip_address: '49.98.144.55',
    location_estimate: '徳島県鳴門市',
    pages_viewed: 8,
    swipes_in_session: 12,
    messages_sent_in_session: 2,
    active_now: true,
  },
  {
    id: 'sess-004',
    user_id: 'demo-5',
    user_name: '田中 美咲',
    plan: 'matsu',
    started_at: '2026-05-06T08:00:00+09:00',
    ended_at: null,
    duration_minutes: 45,
    device: 'web_safari',
    ip_address: '118.243.211.7',
    location_estimate: '徳島県徳島市',
    pages_viewed: 22,
    swipes_in_session: 8,
    messages_sent_in_session: 5,
    active_now: true,
  },
  {
    id: 'sess-005',
    user_id: 'demo-4',
    user_name: '伊藤 大輔',
    plan: 'take',
    started_at: '2026-05-06T09:15:00+09:00',
    ended_at: null,
    duration_minutes: 8,
    device: 'ios',
    ip_address: '203.140.91.14',
    location_estimate: '徳島県阿南市',
    pages_viewed: 5,
    swipes_in_session: 6,
    messages_sent_in_session: 0,
    active_now: true,
  },
  // 過去のセッション
  {
    id: 'sess-006',
    user_id: 'demo-1',
    user_name: '佐藤 麗奈',
    plan: 'take',
    started_at: '2026-05-05T22:30:00+09:00',
    ended_at: '2026-05-05T23:18:00+09:00',
    duration_minutes: 48,
    device: 'ios',
    ip_address: '210.165.93.221',
    location_estimate: '徳島県徳島市',
    pages_viewed: 26,
    swipes_in_session: 24,
    messages_sent_in_session: 6,
    active_now: false,
  },
  {
    id: 'sess-007',
    user_id: 'demo-2',
    user_name: '中村 拓也',
    plan: 'matsu',
    started_at: '2026-05-05T20:00:00+09:00',
    ended_at: '2026-05-05T21:42:00+09:00',
    duration_minutes: 102,
    device: 'ios',
    ip_address: '126.34.12.88',
    location_estimate: '徳島県小松島市',
    pages_viewed: 45,
    swipes_in_session: 58,
    messages_sent_in_session: 12,
    active_now: false,
  },
  {
    id: 'sess-008',
    user_id: 'demo-7',
    user_name: '加藤 雄一',
    plan: 'take',
    started_at: '2026-05-03T15:30:00+09:00',
    ended_at: '2026-05-03T16:48:00+09:00',
    duration_minutes: 78,
    device: 'android',
    ip_address: '180.43.117.92',
    location_estimate: '徳島県徳島市',
    pages_viewed: 38,
    swipes_in_session: 89,
    messages_sent_in_session: 0,
    active_now: false,
  },
  {
    id: 'sess-009',
    user_id: 'demo-6',
    user_name: '渡辺 真由',
    plan: 'ume',
    started_at: '2026-04-22T19:15:00+09:00',
    ended_at: '2026-04-22T19:23:00+09:00',
    duration_minutes: 8,
    device: 'web_chrome',
    ip_address: '101.140.56.180',
    location_estimate: '徳島県徳島市',
    pages_viewed: 4,
    swipes_in_session: 2,
    messages_sent_in_session: 0,
    active_now: false,
  },
  {
    id: 'sess-010',
    user_id: 'demo-3',
    user_name: '高橋 さくら',
    plan: 'ume',
    started_at: '2026-05-05T14:20:00+09:00',
    ended_at: '2026-05-05T14:55:00+09:00',
    duration_minutes: 35,
    device: 'android',
    ip_address: '49.98.144.55',
    location_estimate: '徳島県鳴門市',
    pages_viewed: 18,
    swipes_in_session: 16,
    messages_sent_in_session: 3,
    active_now: false,
  },
];

// ユーザー別の月次エンゲージメント集計
export interface UserEngagement {
  user_id: string;
  user_name: string;
  gender: 'male' | 'female';
  plan: 'free' | 'ume' | 'take' | 'matsu';
  sessions_this_month: number;
  total_minutes_this_month: number;
  avg_minutes_per_session: number;
  days_active_this_month: number;
  last_login_at: string;
  login_streak_days: number;
  retention_label: '高頻度' | '通常' | '低頻度' | '休眠候補' | '休眠';
}

export const DEMO_USER_ENGAGEMENT: UserEngagement[] = [
  {
    user_id: 'demo-1',
    user_name: '佐藤 麗奈',
    gender: 'female',
    plan: 'take',
    sessions_this_month: 18,
    total_minutes_this_month: 845,
    avg_minutes_per_session: 47,
    days_active_this_month: 5,
    last_login_at: '2026-05-06T08:30:00+09:00',
    login_streak_days: 3,
    retention_label: '高頻度',
  },
  {
    user_id: 'demo-2',
    user_name: '中村 拓也',
    gender: 'male',
    plan: 'matsu',
    sessions_this_month: 22,
    total_minutes_this_month: 1420,
    avg_minutes_per_session: 65,
    days_active_this_month: 6,
    last_login_at: '2026-05-06T07:45:00+09:00',
    login_streak_days: 6,
    retention_label: '高頻度',
  },
  {
    user_id: 'demo-3',
    user_name: '高橋 さくら',
    gender: 'female',
    plan: 'ume',
    sessions_this_month: 14,
    total_minutes_this_month: 478,
    avg_minutes_per_session: 34,
    days_active_this_month: 5,
    last_login_at: '2026-05-06T08:15:00+09:00',
    login_streak_days: 2,
    retention_label: '通常',
  },
  {
    user_id: 'demo-4',
    user_name: '伊藤 大輔',
    gender: 'male',
    plan: 'take',
    sessions_this_month: 28,
    total_minutes_this_month: 920,
    avg_minutes_per_session: 33,
    days_active_this_month: 6,
    last_login_at: '2026-05-06T09:15:00+09:00',
    login_streak_days: 6,
    retention_label: '高頻度',
  },
  {
    user_id: 'demo-5',
    user_name: '田中 美咲',
    gender: 'female',
    plan: 'matsu',
    sessions_this_month: 12,
    total_minutes_this_month: 540,
    avg_minutes_per_session: 45,
    days_active_this_month: 4,
    last_login_at: '2026-05-06T08:00:00+09:00',
    login_streak_days: 1,
    retention_label: '通常',
  },
  {
    user_id: 'demo-6',
    user_name: '渡辺 真由',
    gender: 'female',
    plan: 'ume',
    sessions_this_month: 2,
    total_minutes_this_month: 18,
    avg_minutes_per_session: 9,
    days_active_this_month: 1,
    last_login_at: '2026-04-22T19:23:00+09:00',
    login_streak_days: 0,
    retention_label: '休眠',
  },
  {
    user_id: 'demo-7',
    user_name: '加藤 雄一',
    gender: 'male',
    plan: 'take',
    sessions_this_month: 8,
    total_minutes_this_month: 380,
    avg_minutes_per_session: 48,
    days_active_this_month: 2,
    last_login_at: '2026-05-03T16:48:00+09:00',
    login_streak_days: 0,
    retention_label: '休眠候補',
  },
];

// ========== リファラル：美容モニター記事執筆型 ==========

export const REFERRAL_PARTNER_AGREEMENT_VERSION = 'v1.0';

export const REFERRAL_PARTNER_AGREEMENT_ITEMS = [
  {
    title: '業務委託の関係',
    body: '紹介者（パートナー）と株式会社FUSHIMEは業務委託契約を結び、消費者契約ではありません。報酬は雑所得または事業所得として税務申告の対象となります。',
  },
  {
    title: '業務の内容',
    body: 'パートナーは、(1) 加盟美容店でのモニター施術、(2) 体験記事の執筆またはSNS発信、(3) MIRAIZの紹介、の3点を業務として遂行します。',
  },
  {
    title: '報酬発生条件',
    body: '紹介された方が梅以上のプランに課金完了し、1ヶ月以上継続した場合に報酬が発生します。途中解約された場合は報酬無効となります。',
  },
  {
    title: '月の紹介上限',
    body: '1ヶ月あたりの紹介成立は最大3名までとします。これを超える紹介は翌月以降に繰り越されません。',
  },
  {
    title: '記事執筆ガイドライン',
    body: '300文字以上の体験記事＋写真2枚を提出します。MIRAIZ運営の事前承認後、業務委託料が支払われます。記事は公式サイト・SNSへ転載される場合があります。',
  },
  {
    title: '個人情報の取扱い',
    body: 'パートナー登録時の個人情報（氏名・連絡先・銀行口座等）は税務処理・報酬支払いのために5年間保管されます。',
  },
  {
    title: '禁止事項',
    body: '虚偽の紹介・スパム的勧誘・誤認誘導は契約解除事由となります。報酬の不正取得が発覚した場合は法的措置を取ります。',
  },
  {
    title: '解除と義務',
    body: 'パートナーは1ヶ月前の通知でいつでも契約解除できます。既に発生した報酬請求権は契約解除後も有効です。',
  },
];

export type ReferralPartnerStatus = 'pending' | 'active' | 'suspended';

export interface ReferralPartner {
  id: string;
  user_id: string | null;       // MIRAIZ会員ならuser_id・非会員ならnull
  name: string;
  email: string;
  phone: string;
  profile_note: string;          // 自己紹介・職業など
  agreement_signed_at: string;
  agreement_version: string;
  status: ReferralPartnerStatus;
  referral_link: string;
  registered_at: string;
  total_referrals: number;
  this_month_referrals: number;
  total_earned: number;
}

export interface ReferralRecord {
  id: string;
  partner_id: string;
  referred_user_name: string;
  referred_plan: 'ume' | 'take' | 'matsu';
  referred_at: string;
  status: 'pending_cooling_off' | 'pending_article' | 'pending_review' | 'completed' | 'invalid';
  cooling_off_clears_at: string;  // 14日後
  article_submitted_at: string | null;
  reward_amount: number;
  reward_paid_at: string | null;
}

export const DEMO_REFERRAL_PARTNERS: ReferralPartner[] = [
  {
    id: 'rp-001',
    user_id: 'demo-me',
    name: '本人（あなた）',
    email: 'me@example.com',
    phone: '08011112222',
    profile_note: 'MIRAIZ会員・美容好き',
    agreement_signed_at: '2026-05-01T10:00:00+09:00',
    agreement_version: REFERRAL_PARTNER_AGREEMENT_VERSION,
    status: 'active',
    referral_link: 'https://miraiz.jp/r/abc123',
    registered_at: '2026-05-01T10:00:00+09:00',
    total_referrals: 2,
    this_month_referrals: 1,
    total_earned: 15000,
  },
];

export const DEMO_REFERRAL_RECORDS: ReferralRecord[] = [
  {
    id: 'rr-001',
    partner_id: 'rp-001',
    referred_user_name: '田中 さん',
    referred_plan: 'ume',
    referred_at: '2026-04-20T15:30:00+09:00',
    status: 'completed',
    cooling_off_clears_at: '2026-05-04T15:30:00+09:00',
    article_submitted_at: '2026-05-06T20:00:00+09:00',
    reward_amount: 5000,
    reward_paid_at: '2026-05-08T10:00:00+09:00',
  },
  {
    id: 'rr-002',
    partner_id: 'rp-001',
    referred_user_name: '佐藤 さん',
    referred_plan: 'take',
    referred_at: '2026-05-05T11:00:00+09:00',
    status: 'pending_article',
    cooling_off_clears_at: '2026-05-19T11:00:00+09:00',
    article_submitted_at: null,
    reward_amount: 10000,
    reward_paid_at: null,
  },
];

export const REFERRAL_REWARD_TABLE: Record<'ume' | 'take' | 'matsu', { beauty: number; cash: number; total_value: number }> = {
  ume: { beauty: 5000, cash: 0, total_value: 5000 },
  take: { beauty: 10000, cash: 0, total_value: 10000 },
  matsu: { beauty: 30000, cash: 10000, total_value: 40000 },
};

export const REFERRAL_MONTHLY_CAP = 3;

// ========== プロ撮影：加盟スタジオ予約システム ==========

export interface PhotoStudio {
  id: string;
  name: string;
  area: string;
  address: string;
  photographer_name: string;
  photographer_bio: string;
  rating: number;
  review_count: number;
  sample_emoji: string;        // 仮表現
  features: string[];
  price_normal: number;        // 通常料金
  price_member: number;        // MIRAIZ会員価格
  price_matsu: number;         // 松会員（無料 or 割引）
  delivery_days: number;       // 納品までの日数
  available_slots: PhotoSlot[];
}

export interface PhotoSlot {
  id: string;
  date: string;                // YYYY-MM-DD
  time: string;                // HH:mm
  capacity: number;
  remaining: number;
}

export interface PhotoBooking {
  id: string;
  user_id: string;
  studio_id: string;
  slot_id: string;
  slot_at: string;
  status: 'reserved' | 'completed' | 'cancelled' | 'delivered';
  consent_signed_at: string | null;
  consent_version: string;
  booked_at: string;
  amount_paid: number;
  photos_delivered_at: string | null;
  photos_count: number | null;
}

export const DEMO_PHOTO_STUDIOS: PhotoStudio[] = [
  {
    id: 'studio-001',
    name: 'Studio Aile（エール）',
    area: '徳島市中心部',
    address: '徳島県徳島市秋田町2-19',
    photographer_name: '高橋 香織',
    photographer_bio: '婚活専門ポートレート歴12年。これまで2,800名以上の撮影実績。自然な表情を引き出すヘアメイク込み。',
    rating: 4.9,
    review_count: 187,
    sample_emoji: '📸',
    features: ['ヘアメイク込み', 'スタイリスト相談可', '徒歩でJR徳島駅5分'],
    price_normal: 18000,
    price_member: 6000,
    price_matsu: 0,
    delivery_days: 7,
    available_slots: [
      { id: 'sl-001-1', date: '2026-05-17', time: '10:00', capacity: 1, remaining: 1 },
      { id: 'sl-001-2', date: '2026-05-17', time: '11:30', capacity: 1, remaining: 1 },
      { id: 'sl-001-3', date: '2026-05-17', time: '13:00', capacity: 1, remaining: 0 },
      { id: 'sl-001-4', date: '2026-05-17', time: '14:30', capacity: 1, remaining: 1 },
      { id: 'sl-001-5', date: '2026-05-18', time: '10:00', capacity: 1, remaining: 1 },
      { id: 'sl-001-6', date: '2026-05-18', time: '13:00', capacity: 1, remaining: 1 },
      { id: 'sl-001-7', date: '2026-05-24', time: '11:00', capacity: 1, remaining: 1 },
      { id: 'sl-001-8', date: '2026-05-25', time: '14:00', capacity: 1, remaining: 1 },
    ],
  },
  {
    id: 'studio-002',
    name: 'Photographique 阿波',
    area: '徳島市・南内町',
    address: '徳島県徳島市南内町2-5',
    photographer_name: '森山 隆司',
    photographer_bio: '広告・ファッション撮影歴15年。ポートレートでは「写真詐欺」と言われないナチュラル仕上げを得意とする。',
    rating: 4.8,
    review_count: 132,
    sample_emoji: '📷',
    features: ['屋外ロケ撮影可', '徳島中央公園コラボ', '雨天時は屋内スタジオ'],
    price_normal: 22000,
    price_member: 6000,
    price_matsu: 0,
    delivery_days: 5,
    available_slots: [
      { id: 'sl-002-1', date: '2026-05-16', time: '10:00', capacity: 1, remaining: 1 },
      { id: 'sl-002-2', date: '2026-05-16', time: '13:00', capacity: 1, remaining: 1 },
      { id: 'sl-002-3', date: '2026-05-19', time: '11:00', capacity: 1, remaining: 0 },
      { id: 'sl-002-4', date: '2026-05-20', time: '14:00', capacity: 1, remaining: 1 },
      { id: 'sl-002-5', date: '2026-05-22', time: '10:30', capacity: 1, remaining: 1 },
      { id: 'sl-002-6', date: '2026-05-23', time: '13:30', capacity: 1, remaining: 1 },
    ],
  },
  {
    id: 'studio-003',
    name: 'Studio Bloom 鳴門',
    area: '鳴門市',
    address: '徳島県鳴門市撫養町黒崎',
    photographer_name: '田村 美咲',
    photographer_bio: '結婚式・婚活ポートレート専門。女性が安心して撮影に挑めるよう、女性カメラマン＋女性スタイリスト体制。',
    rating: 4.9,
    review_count: 96,
    sample_emoji: '🌸',
    features: ['女性スタッフのみ', 'プライバシー個室', 'ヘアメイク2回直し対応'],
    price_normal: 16000,
    price_member: 6000,
    price_matsu: 0,
    delivery_days: 10,
    available_slots: [
      { id: 'sl-003-1', date: '2026-05-21', time: '10:00', capacity: 1, remaining: 1 },
      { id: 'sl-003-2', date: '2026-05-21', time: '14:00', capacity: 1, remaining: 1 },
      { id: 'sl-003-3', date: '2026-05-28', time: '11:00', capacity: 1, remaining: 1 },
      { id: 'sl-003-4', date: '2026-05-29', time: '13:00', capacity: 1, remaining: 1 },
    ],
  },
];

// 既存予約（本人のデモ）
export const DEMO_PHOTO_BOOKINGS: PhotoBooking[] = [
  {
    id: 'pb-001',
    user_id: 'demo-me',
    studio_id: 'studio-001',
    slot_id: 'sl-001-3',
    slot_at: '2026-05-17T13:00:00+09:00',
    status: 'reserved',
    consent_signed_at: '2026-05-10T22:30:00+09:00',
    consent_version: 'v1.0',
    booked_at: '2026-05-10T22:30:00+09:00',
    amount_paid: 6000,
    photos_delivered_at: null,
    photos_count: null,
  },
];

// 撮影同意書 v1.0
export const PHOTO_CONSENT_VERSION = 'v1.0';

export const PHOTO_CONSENT_ITEMS = [
  {
    title: '撮影の目的',
    body: '撮影された写真は、MIRAIZ アプリ内のプロフィール掲載のためにのみ使用されます。広告・PR等の二次利用は別途同意取得後に限ります。',
  },
  {
    title: '肖像権・著作権',
    body: '写真の著作権は撮影スタジオ及びカメラマンに帰属しますが、利用者は MIRAIZ プロフィール掲載に必要な範囲で利用権を取得します。第三者への提供は禁止します。',
  },
  {
    title: '画像の保管',
    body: '撮影データは暗号化された専用ストレージで5年間保管されます（個人情報保護法・本人確認書類と同等の取扱い）。',
  },
  {
    title: '退会時の削除',
    body: 'MIRAIZ を退会された場合、退会から30日以内に写真データを完全削除します（バックアップを含む）。削除完了後に通知メールをお送りします。',
  },
  {
    title: 'スクリーンショット・転載の禁止',
    body: '提供される写真には透かし（ウォーターマーク）が含まれます。他SNS等への転載は規約違反であり、強制退会の対象となります。',
  },
  {
    title: '20歳未満の取扱い',
    body: 'MIRAIZ は20歳以上限定のサービスです。本撮影サービスも20歳以上の本人確認済み会員のみが対象です。',
  },
  {
    title: 'キャンセル・変更',
    body: '撮影日3日前まで無料でキャンセル・変更可能です。それ以降のキャンセルは料金の50%、当日のno-showは100%を申し受けます。',
  },
  {
    title: '本人撮影の確認',
    body: '撮影当日にスタジオで本人確認書類を確認します。本人以外による撮影は受け付けません。',
  },
];

export function findPhotoStudio(id: string): PhotoStudio | null {
  return DEMO_PHOTO_STUDIOS.find((s) => s.id === id) ?? null;
}

// ========== オペレーター操作ログ（監査） ==========

export type AuditAction =
  | 'application_approve'
  | 'application_reject'
  | 'cancellation_approve'
  | 'cancellation_reject'
  | 'report_resolve'
  | 'report_dismiss'
  | 'booking_complete'
  | 'booking_no_show'
  | 'email_resend'
  | 'refund_issued'
  | 'member_suspended'
  | 'member_reactivated'
  | 'note_added'
  | 'role_changed'
  | 'compliance_doc_uploaded'
  | 'data_exported';

export const AUDIT_ACTION_LABEL: Record<AuditAction, string> = {
  application_approve: '申込承認',
  application_reject: '申込却下',
  cancellation_approve: '解約承認・返金',
  cancellation_reject: '解約拒否',
  report_resolve: '通報・違反確認',
  report_dismiss: '通報却下',
  booking_complete: '予約完了処理',
  booking_no_show: 'no-show記録',
  email_resend: 'メール再送',
  refund_issued: '返金処理',
  member_suspended: '会員停止',
  member_reactivated: '会員復帰',
  note_added: 'メモ追加',
  role_changed: '権限変更',
  compliance_doc_uploaded: '法令書類アップロード',
  data_exported: 'CSVエクスポート',
};

export interface AuditLogEntry {
  id: string;
  action: AuditAction;
  operator_id: string;
  operator_name: string;
  target_type: 'application' | 'member' | 'cancellation' | 'report' | 'booking' | 'email' | 'staff' | 'compliance' | 'data';
  target_id: string;
  target_label: string;
  detail: string | null;
  ip_address: string;
  occurred_at: string;
}

export const DEMO_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: 'audit-001',
    action: 'application_approve',
    operator_id: 'staff-001',
    operator_name: '山下 純也',
    target_type: 'application',
    target_id: 'app-202',
    target_label: '田中 美咲（梅プラン）',
    detail: '振込確認済・¥2,390・即時アクティベート',
    ip_address: '210.165.93.221',
    occurred_at: '2026-05-06T10:23:00+09:00',
  },
  {
    id: 'audit-002',
    action: 'cancellation_approve',
    operator_id: 'staff-001',
    operator_name: '山下 純也',
    target_type: 'cancellation',
    target_id: 'canc-007',
    target_label: '佐藤 麗奈（クーリングオフ）',
    detail: '受領後3日・全額返金¥9,800',
    ip_address: '210.165.93.221',
    occurred_at: '2026-05-04T11:05:00+09:00',
  },
  {
    id: 'audit-003',
    action: 'report_resolve',
    operator_id: 'staff-002',
    operator_name: '事務 田村',
    target_type: 'report',
    target_id: 'rep-012',
    target_label: '加藤 雄一に対する通報',
    detail: '違反確認・退会処理実施',
    ip_address: '210.165.93.221',
    occurred_at: '2026-05-03T16:42:00+09:00',
  },
  {
    id: 'audit-004',
    action: 'refund_issued',
    operator_id: 'staff-001',
    operator_name: '山下 純也',
    target_type: 'member',
    target_id: 'user-088',
    target_label: '加藤 雄一',
    detail: '違反退会に伴う日割り返金¥3,200',
    ip_address: '210.165.93.221',
    occurred_at: '2026-05-03T16:48:00+09:00',
  },
  {
    id: 'audit-005',
    action: 'email_resend',
    operator_id: 'staff-002',
    operator_name: '事務 田村',
    target_type: 'email',
    target_id: 'mail-011',
    target_label: '加藤 雄一・領収書（バウンス）',
    detail: '正しいアドレスyuichi.k@gmail.comへ再送',
    ip_address: '210.165.93.221',
    occurred_at: '2026-05-04T09:18:00+09:00',
  },
  {
    id: 'audit-006',
    action: 'data_exported',
    operator_id: 'staff-001',
    operator_name: '山下 純也',
    target_type: 'data',
    target_id: 'members-csv',
    target_label: '会員一覧CSV（168件）',
    detail: '税理士提出用',
    ip_address: '210.165.93.221',
    occurred_at: '2026-05-02T14:30:00+09:00',
  },
  {
    id: 'audit-007',
    action: 'booking_complete',
    operator_id: 'staff-001',
    operator_name: '山下 純也',
    target_type: 'booking',
    target_id: 'book-021',
    target_label: '高橋 さくら・対面相談',
    detail: '60分・お悩み相談1回消費',
    ip_address: '210.165.93.221',
    occurred_at: '2026-05-05T15:30:00+09:00',
  },
  {
    id: 'audit-008',
    action: 'note_added',
    operator_id: 'staff-001',
    operator_name: '山下 純也',
    target_type: 'member',
    target_id: 'user-005',
    target_label: '高橋 さくら',
    detail: '電話メモ：6月のVol.5で具体的な進展を希望。優先紹介する。',
    ip_address: '210.165.93.221',
    occurred_at: '2026-05-05T16:08:00+09:00',
  },
  {
    id: 'audit-009',
    action: 'compliance_doc_uploaded',
    operator_id: 'staff-001',
    operator_name: '山下 純也',
    target_type: 'compliance',
    target_id: 'doc-001',
    target_label: '異性紹介事業届出書',
    detail: '徳島中央警察署受理印あり・PDF保管',
    ip_address: '210.165.93.221',
    occurred_at: '2026-04-15T11:30:00+09:00',
  },
  {
    id: 'audit-010',
    action: 'member_suspended',
    operator_id: 'staff-001',
    operator_name: '山下 純也',
    target_type: 'member',
    target_id: 'user-088',
    target_label: '加藤 雄一',
    detail: '通報3件・MID評価平均2.7・利用規約違反で永久停止',
    ip_address: '210.165.93.221',
    occurred_at: '2026-05-03T16:45:00+09:00',
  },
  {
    id: 'audit-011',
    action: 'role_changed',
    operator_id: 'staff-001',
    operator_name: '山下 純也',
    target_type: 'staff',
    target_id: 'staff-002',
    target_label: '事務 田村',
    detail: 'viewer → operator に昇格',
    ip_address: '210.165.93.221',
    occurred_at: '2026-04-28T13:00:00+09:00',
  },
];

// ========== スタッフ・権限管理 ==========

export type StaffRole = 'owner' | 'admin' | 'operator' | 'viewer';

export const STAFF_ROLE_LABEL: Record<StaffRole, string> = {
  owner: 'オーナー',
  admin: '管理者',
  operator: '運営担当',
  viewer: '閲覧のみ',
};

export const STAFF_ROLE_DESC: Record<StaffRole, string> = {
  owner: '全機能・権限管理・財務・法令書類',
  admin: '全機能・財務閲覧（権限管理は不可）',
  operator: '申込承認/予約処理/通報対応/メール送信',
  viewer: '一覧閲覧のみ・操作不可',
};

export interface StaffPermission {
  view_members: boolean;
  manage_applications: boolean;
  manage_cancellations: boolean;
  manage_reports: boolean;
  manage_bookings: boolean;
  view_billing: boolean;
  export_data: boolean;
  manage_compliance: boolean;
  manage_staff: boolean;
}

export const ROLE_PERMISSIONS: Record<StaffRole, StaffPermission> = {
  owner: {
    view_members: true,
    manage_applications: true,
    manage_cancellations: true,
    manage_reports: true,
    manage_bookings: true,
    view_billing: true,
    export_data: true,
    manage_compliance: true,
    manage_staff: true,
  },
  admin: {
    view_members: true,
    manage_applications: true,
    manage_cancellations: true,
    manage_reports: true,
    manage_bookings: true,
    view_billing: true,
    export_data: true,
    manage_compliance: true,
    manage_staff: false,
  },
  operator: {
    view_members: true,
    manage_applications: true,
    manage_cancellations: false,
    manage_reports: true,
    manage_bookings: true,
    view_billing: false,
    export_data: false,
    manage_compliance: false,
    manage_staff: false,
  },
  viewer: {
    view_members: true,
    manage_applications: false,
    manage_cancellations: false,
    manage_reports: false,
    manage_bookings: false,
    view_billing: false,
    export_data: false,
    manage_compliance: false,
    manage_staff: false,
  },
};

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  active: boolean;
  last_login_at: string | null;
  created_at: string;
  two_factor_enabled: boolean;
}

export const DEMO_STAFF_USERS: StaffUser[] = [
  {
    id: 'staff-001',
    name: '山下 純也',
    email: 'azuto0330@gmail.com',
    role: 'owner',
    active: true,
    last_login_at: '2026-05-06T08:30:00+09:00',
    created_at: '2025-09-01T00:00:00+09:00',
    two_factor_enabled: true,
  },
  {
    id: 'staff-002',
    name: '事務 田村',
    email: 'tamura@miraiz.co.jp',
    role: 'operator',
    active: true,
    last_login_at: '2026-05-06T09:15:00+09:00',
    created_at: '2026-04-01T00:00:00+09:00',
    two_factor_enabled: true,
  },
  {
    id: 'staff-003',
    name: '副業仲人 加奈',
    email: 'kana@miraiz.co.jp',
    role: 'operator',
    active: true,
    last_login_at: '2026-05-05T20:45:00+09:00',
    created_at: '2026-04-15T00:00:00+09:00',
    two_factor_enabled: false,
  },
  {
    id: 'staff-004',
    name: '税理士 久保',
    email: 'kubo@kubotax.jp',
    role: 'viewer',
    active: true,
    last_login_at: '2026-05-01T10:00:00+09:00',
    created_at: '2026-03-01T00:00:00+09:00',
    two_factor_enabled: true,
  },
];

// ========== Stripe 決済失敗（サブスク監視） ==========

export type PaymentFailureReason =
  | 'card_expired'
  | 'insufficient_funds'
  | 'card_declined'
  | 'authentication_required'
  | 'incorrect_cvc'
  | 'processing_error';

export const PAYMENT_FAILURE_REASON_LABEL: Record<PaymentFailureReason, string> = {
  card_expired: 'カード有効期限切れ',
  insufficient_funds: '残高不足',
  card_declined: 'カード会社による拒否',
  authentication_required: '3Dセキュア認証必要',
  incorrect_cvc: 'CVC不一致',
  processing_error: '処理エラー',
};

export interface PaymentFailure {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  plan: 'ume' | 'take';
  amount: number;
  reason: PaymentFailureReason;
  attempts: number;
  next_retry_at: string | null;
  status: 'retrying' | 'pending_action' | 'resolved' | 'churned';
  failed_at: string;
  resolved_at: string | null;
  stripe_payment_intent_id: string;
}

export const DEMO_PAYMENT_FAILURES: PaymentFailure[] = [
  {
    id: 'pf-001',
    user_id: 'user-022',
    user_name: '田中 美咲',
    user_email: 'misaki.t@example.jp',
    plan: 'ume',
    amount: 2390,
    reason: 'card_expired',
    attempts: 3,
    next_retry_at: null,
    status: 'pending_action',
    failed_at: '2026-05-04T03:00:00+09:00',
    resolved_at: null,
    stripe_payment_intent_id: 'pi_3QkW2pK8aB9c',
  },
  {
    id: 'pf-002',
    user_id: 'user-045',
    user_name: '渡辺 真由',
    user_email: 'mayu@example.jp',
    plan: 'take',
    amount: 9800,
    reason: 'insufficient_funds',
    attempts: 2,
    next_retry_at: '2026-05-08T03:00:00+09:00',
    status: 'retrying',
    failed_at: '2026-05-05T03:00:00+09:00',
    resolved_at: null,
    stripe_payment_intent_id: 'pi_3QkX5qL9bC0d',
  },
  {
    id: 'pf-003',
    user_id: 'user-067',
    user_name: '伊藤 大輔',
    user_email: 'daisuke.i@example.jp',
    plan: 'ume',
    amount: 2390,
    reason: 'card_declined',
    attempts: 4,
    next_retry_at: null,
    status: 'churned',
    failed_at: '2026-04-28T03:00:00+09:00',
    resolved_at: '2026-05-05T00:00:00+09:00',
    stripe_payment_intent_id: 'pi_3QkY8rM0cD1e',
  },
  {
    id: 'pf-004',
    user_id: 'user-091',
    user_name: '小林 由美',
    user_email: 'yumi.k@example.jp',
    plan: 'take',
    amount: 9800,
    reason: 'authentication_required',
    attempts: 1,
    next_retry_at: null,
    status: 'pending_action',
    failed_at: '2026-05-06T03:00:00+09:00',
    resolved_at: null,
    stripe_payment_intent_id: 'pi_3QkZ1sN1dE2f',
  },
  {
    id: 'pf-005',
    user_id: 'user-103',
    user_name: '吉田 香織',
    user_email: 'kaori.y@example.jp',
    plan: 'ume',
    amount: 2390,
    reason: 'card_expired',
    attempts: 2,
    next_retry_at: null,
    status: 'resolved',
    failed_at: '2026-05-02T03:00:00+09:00',
    resolved_at: '2026-05-03T11:24:00+09:00',
    stripe_payment_intent_id: 'pi_3Qka3tO2eF3g',
  },
];

// ========== 法令証跡ホルダー ==========

export type ComplianceDocCategory =
  | 'business_license'      // 異性紹介事業届出
  | 'invoice_registration'  // 適格請求書発行事業者
  | 'tokutei_disclosure'    // 特商法表示
  | 'gaiyou_document'       // 概要書面ひな型
  | 'contract_document'     // 契約書面ひな型
  | 'privacy_policy'        // プライバシーポリシー
  | 'terms_of_service'      // 利用規約
  | 'photo_consent'         // 撮影同意書
  | 'identity_log'          // 本人確認書類アクセスログ
  | 'audit_archive'         // 監査ログアーカイブ
  | 'tax_certificate';      // 確定申告書類

export const COMPLIANCE_DOC_CATEGORY_LABEL: Record<ComplianceDocCategory, string> = {
  business_license: 'インターネット異性紹介事業届出',
  invoice_registration: '適格請求書発行事業者登録',
  tokutei_disclosure: '特定商取引法表示',
  gaiyou_document: '概要書面ひな型',
  contract_document: '契約書面ひな型',
  privacy_policy: 'プライバシーポリシー',
  terms_of_service: '利用規約',
  photo_consent: 'プロフィール写真撮影同意書',
  identity_log: '本人確認書類アクセスログ',
  audit_archive: '監査ログアーカイブ',
  tax_certificate: '確定申告書類',
};

export interface ComplianceDoc {
  id: string;
  category: ComplianceDocCategory;
  title: string;
  status: 'active' | 'expiring_soon' | 'expired' | 'pending';
  issued_at: string | null;
  expires_at: string | null;
  authority: string | null;
  reference_number: string | null;
  uploaded_by: string | null;
  uploaded_at: string | null;
  file_name: string | null;
  notes: string | null;
}

export const DEMO_COMPLIANCE_DOCS: ComplianceDoc[] = [
  {
    id: 'doc-001',
    category: 'business_license',
    title: 'インターネット異性紹介事業届出受理書',
    status: 'active',
    issued_at: '2026-04-15',
    expires_at: null,
    authority: '徳島県警察本部・徳島中央警察署',
    reference_number: '受理No.徳島中央2026-0142',
    uploaded_by: '山下 純也',
    uploaded_at: '2026-04-15T11:30:00+09:00',
    file_name: 'business_license_2026-04-15.pdf',
    notes: '6ヶ月ごとのサーバーログ保管義務あり。本人確認書類は別途暗号化保管。',
  },
  {
    id: 'doc-002',
    category: 'invoice_registration',
    title: '適格請求書発行事業者登録通知書',
    status: 'active',
    issued_at: '2025-09-30',
    expires_at: null,
    authority: '徳島税務署',
    reference_number: 'T-1234567890123',
    uploaded_by: '山下 純也',
    uploaded_at: '2025-09-30T14:00:00+09:00',
    file_name: 'invoice_registration_2025.pdf',
    notes: 'Stripe領収書テンプレートに登録番号反映済み。',
  },
  {
    id: 'doc-003',
    category: 'tokutei_disclosure',
    title: '特定商取引法に基づく表示',
    status: 'active',
    issued_at: '2026-04-20',
    expires_at: null,
    authority: '社内整備（行政書士監修）',
    reference_number: null,
    uploaded_by: '山下 純也',
    uploaded_at: '2026-04-20T16:00:00+09:00',
    file_name: 'tokutei_2026-04-20.pdf',
    notes: '価格改定時に毎回更新。HP /legal/tokutei に公開中。',
  },
  {
    id: 'doc-004',
    category: 'gaiyou_document',
    title: '概要書面ひな型（梅・竹・松）',
    status: 'active',
    issued_at: '2026-04-22',
    expires_at: null,
    authority: '社内整備（弁護士監修）',
    reference_number: null,
    uploaded_by: '山下 純也',
    uploaded_at: '2026-04-22T17:00:00+09:00',
    file_name: 'gaiyou_template_v2.pdf',
    notes: '特定継続的役務提供準拠。クーリングオフ8日起算点の根拠。',
  },
  {
    id: 'doc-005',
    category: 'contract_document',
    title: '契約書面ひな型（梅・竹・松）',
    status: 'active',
    issued_at: '2026-04-22',
    expires_at: null,
    authority: '社内整備（弁護士監修）',
    reference_number: null,
    uploaded_by: '山下 純也',
    uploaded_at: '2026-04-22T17:05:00+09:00',
    file_name: 'contract_template_v2.pdf',
    notes: '署名済みPDFは会員別に保管。',
  },
  {
    id: 'doc-006',
    category: 'privacy_policy',
    title: 'プライバシーポリシー v3',
    status: 'active',
    issued_at: '2026-04-20',
    expires_at: null,
    authority: '社内整備',
    reference_number: null,
    uploaded_by: '山下 純也',
    uploaded_at: '2026-04-20T16:30:00+09:00',
    file_name: 'privacy_policy_v3.pdf',
    notes: 'GDPR・個人情報保護法準拠。HP /legal/privacy 公開中。',
  },
  {
    id: 'doc-007',
    category: 'terms_of_service',
    title: '利用規約 v3',
    status: 'active',
    issued_at: '2026-04-20',
    expires_at: null,
    authority: '社内整備',
    reference_number: null,
    uploaded_by: '山下 純也',
    uploaded_at: '2026-04-20T16:35:00+09:00',
    file_name: 'terms_v3.pdf',
    notes: '異性紹介事業届出の認可条件に準拠。',
  },
  {
    id: 'doc-008',
    category: 'identity_log',
    title: '本人確認書類アクセスログ（4月）',
    status: 'active',
    issued_at: '2026-05-01',
    expires_at: '2031-05-01',
    authority: '内部監査用',
    reference_number: null,
    uploaded_by: 'システム自動',
    uploaded_at: '2026-05-01T00:00:00+09:00',
    file_name: 'identity_access_log_2026-04.csv',
    notes: '5年保管義務。誰がいつどの書類を閲覧したかの記録。',
  },
  {
    id: 'doc-009',
    category: 'audit_archive',
    title: '監査ログアーカイブ（2026Q1）',
    status: 'active',
    issued_at: '2026-04-01',
    expires_at: '2033-04-01',
    authority: '内部監査用',
    reference_number: null,
    uploaded_by: 'システム自動',
    uploaded_at: '2026-04-01T00:00:00+09:00',
    file_name: 'audit_archive_2026Q1.zip',
    notes: '7年保管。スタッフの全操作記録。',
  },
  {
    id: 'doc-010',
    category: 'tax_certificate',
    title: '令和7年分 確定申告書',
    status: 'expiring_soon',
    issued_at: '2026-03-15',
    expires_at: '2033-03-15',
    authority: '徳島税務署',
    reference_number: '受付No.2026-tk-08821',
    uploaded_by: '税理士 久保',
    uploaded_at: '2026-03-15T18:00:00+09:00',
    file_name: 'kakutei_2025.pdf',
    notes: '消費税確定申告は別途。',
  },
  {
    id: 'doc-011',
    category: 'photo_consent',
    title: 'プロフィール写真撮影同意書 v1.0',
    status: 'active',
    issued_at: '2026-05-12',
    expires_at: null,
    authority: '社内整備（弁護士監修）',
    reference_number: null,
    uploaded_by: '山下 純也',
    uploaded_at: '2026-05-12T10:00:00+09:00',
    file_name: 'photo_consent_v1.0.pdf',
    notes: '撮影同意8項目・電子署名必須・5年保管・退会時30日削除フロー。/legal/photo-consent でユーザー閲覧可能。',
  },
  {
    id: 'doc-012',
    category: 'audit_archive',
    title: '撮影予約・同意ログ',
    status: 'active',
    issued_at: '2026-05-12',
    expires_at: '2031-05-12',
    authority: '内部監査用',
    reference_number: null,
    uploaded_by: 'システム自動',
    uploaded_at: '2026-05-12T10:00:00+09:00',
    file_name: 'photo_booking_consent_log.csv',
    notes: '撮影同意書バージョン・電子署名日時・予約ID・ユーザーIDを記録。5年保管。',
  },
];

// ========== 拡張モック ==========

// MIRAIZ プラン階層（松竹梅）
export type MembershipPlan = 'free' | 'ume' | 'take' | 'matsu';

export const PLAN_LABEL: Record<MembershipPlan, string> = {
  free: '無料',
  ume: '🌸 梅',
  take: '🎍 竹',
  matsu: '🌲 松',
};

export const PLAN_PRICE_LABEL: Record<MembershipPlan, string> = {
  free: '¥0',
  ume: '¥2,980/月（女性無料）',
  take: '¥12,000/月',
  matsu: '¥298,000/年（月¥24,833相当）',
};

// プラン別の機能制限
export const PLAN_LIMITS = {
  free: {
    daily_swipe: 1,
    swipe_tsuchihyo_view: 0,
    can_view_self_tsuchihyo: false,
    has_read_receipt: false,
    monthly_mindset_meetings_free: 0,
  },
  ume: {
    daily_swipe: 3,
    swipe_tsuchihyo_view: 5,
    can_view_self_tsuchihyo: true,
    has_read_receipt: true,
    monthly_mindset_meetings_free: 1, // 初回のみ
  },
  take: {
    daily_swipe: 3,
    swipe_tsuchihyo_view: 15,
    can_view_self_tsuchihyo: true,
    has_read_receipt: true,
    monthly_mindset_meetings_free: 1, // 月1回
    matchmaker_zoom_per_month: 1,
    partner_visit_half_per_month: 1,
  },
  matsu: {
    daily_swipe: 3,
    swipe_tsuchihyo_view: 30,
    can_view_self_tsuchihyo: true,
    has_read_receipt: true,
    monthly_mindset_meetings_free: 999, // 無制限
    individual_feedback_free: true,
    matchmaker_zoom_per_month: 2,
    partner_visit_free_per_month: 1,
    in_person_session_per_month: 1,
    large_event_free: true,
    success_bonus: 30000,
  },
};

export const DEMO_USER_STATE = {
  plan: 'ume' as MembershipPlan, // デモ：梅会員（必要に応じて変更）
  points: 600,
  premium: false,
  verified: true,
  inviteCode: 'YAMA2026',
  invitedCount: 2,
  rewardYen: 2000,
  ticketStatus: 'none' as 'none' | 'paid' | 'checked-in',
  tsuchihyoOrdered: true, // デモ：購入済みとして履歴・統計セクションを即表示
  // 保有しているイベントチケット（tokenベース）
  // 参加者プロフィール閲覧・MID評価入力・結果閲覧の権限ゲート
  event_tickets: ['vol5-pm', 'vol4'] as string[],
  // 3段階の認証状態（本人確認＝年齢確認込み）
  verifications: {
    identity: { status: 'verified', verifiedAt: '2026-04-15' } as VerificationState,
    single: { status: 'pending', verifiedAt: null } as VerificationState,
    income: { status: 'unverified', verifiedAt: null } as VerificationState,
  },
};

export type VerificationKey = 'identity' | 'single' | 'income';

export interface VerificationState {
  status: 'unverified' | 'pending' | 'verified' | 'rejected';
  verifiedAt: string | null;
}

export const VERIFICATION_DEFS: {
  key: VerificationKey;
  label: string;
  shortLabel: string;
  description: string;
  required: boolean;
  premium: boolean;
  documents: string[];
}[] = [
  {
    key: 'identity',
    label: '本人確認・年齢確認',
    shortLabel: '本人',
    description:
      '身分証の写真と本人セルフィーを1回で照合（AI判定）。20歳以上であることと本人であることを同時に確認します。本サービスは20歳以上限定です。',
    required: true,
    premium: false,
    documents: ['運転免許証＋セルフィー', 'マイナンバーカード＋セルフィー', 'パスポート＋セルフィー'],
  },
  {
    key: 'single',
    label: '独身証明',
    shortLabel: '独身',
    description:
      '市区町村発行の「独身証明書」または「戸籍抄本」で婚姻歴がないこと（または現在独身であること）を確認します。',
    required: false,
    premium: true,
    documents: ['独身証明書', '戸籍抄本'],
  },
  {
    key: 'income',
    label: '年収証明',
    shortLabel: '年収',
    description:
      '源泉徴収票または所得証明書で年収帯を確認します。証明済の方は通帳マークが付与されます。',
    required: false,
    premium: true,
    documents: ['源泉徴収票', '所得証明書（市区町村発行）', '確定申告書'],
  },
];

// 運営側の認証・届出情報（フッター・法的情報ページで使用）
export const KOIFES_LEGAL_INFO = {
  companyName: '株式会社FUSHIME',
  ceo: '山下 拓海',
  address: '徳島県徳島市〇〇町X-Y-Z',
  internetDatingRegistrationNumber: '徳島県公安委員会届出 第75200000号',
  registrationDate: '2026-04-01',
  privacyMarkNumber: 'JIS Q 15001:2017 取得予定',
  ismsCertNumber: 'ISO/IEC 27001:2022 取得予定',
  reportingMethods: [
    'アプリ内通報機能',
    'support@koifes.app（24時間受付）',
    '電話：088-XXX-XXXX（平日9:00-18:00）',
  ],
};

export const DEMO_NEXT_EVENT = {
  id: 'vol5',
  title: '恋フェスジャパン Vol.5',
  date: '2026-06-14',
  dateLabel: '2026年6月14日（日）',
  venue: 'ゆめタウン徳島 6F イベントホール',
  address: '徳島県板野郡藍住町奥野字応神山30-1',
  capacity: 300,
  remaining: 87,
  price: 6000,
  parts: ['第1部 13:00〜15:30', '第2部 16:30〜19:00'],
  highlights: [
    '2部制300名・徳島最大級',
    'AI相性診断で席順が決まる',
    'スピードデート＋フリータイム',
    '恋の通知表データ後日配信',
  ],
  // YouTube動画（イベント告知・過去回ダイジェスト）
  videoId: 'dQw4w9WgXcQ', // 仮: 実際の恋フェス動画IDに差し替え
  videoTitle: '恋フェス Vol.4 ダイジェスト',
  videoDuration: '2:48',
};

// アプリ内 協賛・加盟店プロモ枠（広告）
export type SponsorPlacement = 'home' | 'events' | 'event_detail' | 'mypage';
export type SponsorStatus = 'active' | 'scheduled' | 'ended';

export interface SponsorAd {
  id: string;
  name: string;
  category: string;
  tagline: string;
  cta: string;
  accent: string; // アクセントカラー（hex）
  placements: SponsorPlacement[];
  period_start: string;
  period_end: string;
  monthly_fee: number; // 月額出稿料（円）
  impressions: number;
  clicks: number;
  status: SponsorStatus;
  url: string;
}

export const DEMO_SPONSORS: SponsorAd[] = [
  {
    id: 'sp1',
    name: 'IBJ徳島支店',
    category: '結婚相談所',
    tagline: '本気の方へ。専門カウンセラーが無料でご相談に乗ります。',
    cta: '無料カウンセリング予約',
    accent: '#b45309',
    placements: ['mypage'],
    period_start: '2026-05-01',
    period_end: '2026-07-31',
    monthly_fee: 30000,
    impressions: 4820,
    clicks: 186,
    status: 'active',
    url: 'https://example.com/ibj-tokushima',
  },
  {
    id: 'sp2',
    name: 'BRIDAL J 徳島',
    category: 'ジュエリー',
    tagline: '婚約指輪・結婚指輪 県内最大級の品揃え。来店予約で特典あり。',
    cta: 'カタログを見る',
    accent: '#9333ea',
    placements: ['mypage'],
    period_start: '2026-05-01',
    period_end: '2026-06-30',
    monthly_fee: 25000,
    impressions: 3110,
    clicks: 94,
    status: 'active',
    url: 'https://example.com/bridal-j',
  },
  {
    id: 'sp3',
    name: 'HOTEL CLEMENT TOKUSHIMA',
    category: 'ホテル・デート',
    tagline: '初デートは徳島駅前の名門ホテルで。ランチ＆アフタヌーンティー。',
    cta: 'デートプランを見る',
    accent: '#0e7490',
    placements: ['mypage'],
    period_start: '2026-05-10',
    period_end: '2026-08-31',
    monthly_fee: 28000,
    impressions: 2640,
    clicks: 132,
    status: 'active',
    url: 'https://example.com/clement',
  },
  {
    id: 'sp4',
    name: 'le BENKEI',
    category: 'レストラン',
    tagline: '2人のための隠れ家フレンチ。記念日コースをご用意。',
    cta: '空席を確認する',
    accent: '#be123c',
    placements: ['mypage'],
    period_start: '2026-05-15',
    period_end: '2026-06-30',
    monthly_fee: 18000,
    impressions: 1280,
    clicks: 71,
    status: 'active',
    url: 'https://example.com/le-benkei',
  },
  {
    id: 'sp5',
    name: '美意識 サロン徳島',
    category: '美容・脱毛',
    tagline: 'デート前の自分磨きに。フェイシャル＆脱毛 体験プラン受付中。',
    cta: '体験を予約する',
    accent: '#db2777',
    placements: ['mypage'],
    period_start: '2026-06-01',
    period_end: '2026-08-31',
    monthly_fee: 22000,
    impressions: 0,
    clicks: 0,
    status: 'scheduled',
    url: 'https://example.com/miishiki',
  },
  {
    id: 'sp6',
    name: 'スタジオ アンジュ',
    category: 'フォトスタジオ',
    tagline: 'プロフィール写真を魅力的に。婚活フォトプラン。',
    cta: '撮影プランを見る',
    accent: '#475569',
    placements: ['mypage'],
    period_start: '2026-03-01',
    period_end: '2026-04-30',
    monthly_fee: 15000,
    impressions: 5390,
    clicks: 241,
    status: 'ended',
    url: 'https://example.com/studio-ange',
  },
];

// 指定の掲載枠で表示すべき協賛広告を取得
export function getSponsorsFor(placement: SponsorPlacement): SponsorAd[] {
  return DEMO_SPONSORS.filter(
    (s) => s.status === 'active' && s.placements.includes(placement)
  );
}

export const SPONSOR_STATUS_LABEL: Record<SponsorStatus, string> = {
  active: '掲載中',
  scheduled: '掲載予定',
  ended: '掲載終了',
};

export const DEMO_GRADUATES = [
  {
    id: 'gr1',
    coupleName: 'T.Kさん × M.Nさん',
    metEvent: '恋フェス Vol.2（2024-09）',
    marriedDate: '2026-03-12',
    photoEmoji: '💐',
    message: 'まさかイベントで人生のパートナーに出会えるとは思いませんでした。本当に感謝しています。',
  },
  {
    id: 'gr2',
    coupleName: 'S.Yさん × R.Tさん',
    metEvent: '恋フェス Vol.3（2025-03）',
    marriedDate: '2026-01-20',
    photoEmoji: '🎊',
    message: '価値観が合う人とこんなに自然に話せたのは初めてでした。次回は紹介する側として参加します！',
  },
  {
    id: 'gr3',
    coupleName: 'K.Hさん × A.Mさん',
    metEvent: '恋フェス Vol.1（2024-04）',
    marriedDate: '2025-11-03',
    photoEmoji: '✨',
    message: '徳島は出会いがないと思っていたのが嘘みたい。第1子も来年誕生予定です。',
  },
];

export type ScoreDimension =
  | 'appearance'
  | 'talkability'
  | 'gottman'
  | 'comfort'
  | 'timeless'
  | 'safety';

export const SCORE_DIMENSION_LABEL: Record<ScoreDimension, string> = {
  appearance: '見た目印象',
  talkability: '話しやすさ',
  gottman: 'また会いたい度',
  comfort: '居心地',
  timeless: '時間忘却度',
  safety: '心理的安全性',
};

export const SCORE_DIMENSION_DESC: Record<ScoreDimension, string> = {
  appearance: '清潔感・髪型・服装の印象',
  talkability: '会話のテンポ・聞き上手さ',
  gottman: 'もう一度会いたいと思わせる魅力',
  comfort: '一緒にいて落ち着けるか',
  timeless: '時間を忘れて話せた度合い',
  safety: '安心して話を聞いてもらえた感覚',
};

export const SCORE_DIMENSION_REFERENCE: Record<ScoreDimension, string> = {
  appearance: '第一印象研究（UCLA）',
  talkability: '対人魅力研究（社会心理学）',
  gottman: 'ゴットマン研究（婚姻継続予測）',
  comfort: 'ハーバード幸福研究',
  timeless: 'アロン理論（自己拡張理論）',
  safety: '心理的安全性（Google Re:Work）',
};

// 改善カテゴリへのマッピング
export const SCORE_TO_PARTNER_CATEGORY: Record<ScoreDimension, PartnerCategory[]> = {
  appearance: ['facial', 'hair_salon', 'eyebrow', 'fashion'],
  talkability: ['communication'],
  gottman: ['communication', 'fashion'],
  comfort: ['communication'],
  timeless: ['communication'],
  safety: ['communication'],
};

// ========== 自分の通知表履歴（過去イベント・スワイプ・自己肯定感の推移） ==========

export interface MyEventHistoryEntry {
  event_token: string;
  event_name: string;
  date: string;            // ISO
  scores: {
    appearance: number;     // 1-100
    talkability: number;
    comfort: number;        // 居心地
    timeless: number;       // 時間を忘れて話せた
    safety: number;         // 否定されなかった（心理的安全性）
  };
  yes_received: number;     // 自分に⚪︎をくれた人数
  yes_given: number;        // 自分が⚪︎を付けた人数
  mutual_count: number;     // 両想い人数
  participants_total: number; // 同部の参加者数
  self_esteem_pre: number;  // 開始前 1-10
  self_esteem_post: number; // 終了直後 1-10
  self_esteem_1month: number | null; // 1ヶ月後（未到来ならnull）
  self_esteem_6month: number | null;
  top_keyword: string | null; // 印象キーワードで最頻出
}

export const DEMO_MY_EVENT_HISTORY: MyEventHistoryEntry[] = [
  {
    event_token: 'vol4',
    event_name: '恋フェスジャパン Vol.4',
    date: '2026-03-15',
    scores: {
      appearance: 65,
      talkability: 68,
      comfort: 70,
      timeless: 60,
      safety: 72,
    },
    yes_received: 3,
    yes_given: 4,
    mutual_count: 1,
    participants_total: 60,
    self_esteem_pre: 5,
    self_esteem_post: 6,
    self_esteem_1month: 6,
    self_esteem_6month: null,
    top_keyword: '真面目',
  },
  {
    event_token: 'vol5-pm',
    event_name: '恋フェス Vol.5・第二部',
    date: '2026-06-13',
    scores: {
      appearance: 78,
      talkability: 84,
      comfort: 82,
      timeless: 72,
      safety: 80,
    },
    yes_received: 5,
    yes_given: 3,
    mutual_count: 2,
    participants_total: 70,
    self_esteem_pre: 6,
    self_esteem_post: 7,
    self_esteem_1month: null,
    self_esteem_6month: null,
    top_keyword: '自然体で素敵',
  },
];

// 累計スワイプ統計（アプリ内）
export const DEMO_MY_SWIPE_STATS = {
  total_likes_given: 14,
  total_passes_given: 6,
  total_likes_received: 11,
  mutual_count: 5,
  current_streak_days: 7, // 連続ログイン日数
};

export const DEMO_TSUCHIHYO_SAMPLE = {
  participantName: '山下 様',
  eventTitle: '恋フェスジャパン Vol.4',
  date: '2025-11-23',
  scores: {
    appearance: 78,
    talkability: 84,
    gottman: 71,
    comfort: 82,
    timeless: 68,
    safety: 88,
  } as Record<ScoreDimension, number>,
  // 同イベント参加者の平均スコア
  averageScores: {
    appearance: 72,
    talkability: 75,
    gottman: 70,
    comfort: 73,
    timeless: 71,
    safety: 76,
  } as Record<ScoreDimension, number>,
  positiveCount: 5,
  negativeReasons: [
    { reason: '会話のテンポが合わなかった', count: 2 },
    { reason: '希望年齢が合わなかった', count: 1 },
  ],
  improvements: [
    '第一印象は良好。笑顔の頻度をあと少し増やすと印象が10%向上します。',
    '質問よりも自己開示の量を増やすと話しやすさスコアが上がる傾向。',
    '希望タイプ「価値観共有」と相性が高い相手は次回6名参加予定です。',
  ],
  // 前々回スコア（成長グラフ用）
  previousScores: {
    appearance: 70,
    talkability: 78,
    gottman: 65,
    comfort: 76,
    timeless: 62,
    safety: 80,
  } as Record<ScoreDimension, number>,
  previousEventTitle: '恋フェスジャパン Vol.3',
  previousDate: '2025-07-12',
  // 順位（無料プレビューで見せる部分）
  totalParticipants: 54,        // このイベントの参加者数
  rank: 9,                       // 総合順位
  percentile: 17,                // 上位何%か（rank/total）
};

// ========== 通知表 詳細フィードバック ==========

export interface DimensionDetail {
  positives: { tag: string; count: number; comments?: string[] }[];
  improvements: { tag: string; count: number; tip: string; partnerCategory?: PartnerCategory; comments?: string[] }[];
}

export const DEMO_DIMENSION_DETAILS: Record<ScoreDimension, DimensionDetail> = {
  appearance: {
    positives: [
      {
        tag: '清潔感がある',
        count: 7,
        comments: [
          '清潔感があって好印象でした',
          '初対面で安心感のある身だしなみでした',
        ],
      },
      {
        tag: '服装が場面に合っている',
        count: 5,
        comments: [
          'ジャケットがサイズ感ぴったりで素敵',
          'シンプルで派手すぎず落ち着いた印象',
        ],
      },
      { tag: '爽やかな表情', count: 4 },
    ],
    improvements: [
      {
        tag: '眉毛を整えると印象UP',
        count: 3,
        tip: '骨格に合わせた眉毛デザインで、顔の印象が一段引き締まります。',
        partnerCategory: 'eyebrow',
        comments: [
          'もう少し眉が整っていたら、より爽やかに見えそう',
          '眉毛が左右でバランスが違って気になりました',
        ],
      },
      {
        tag: '髪型のセットが甘い',
        count: 2,
        tip: '前髪のセット時間をあと2分増やすだけで第一印象が変わります。',
        partnerCategory: 'hair_salon',
        comments: ['髪のセットがもう少しできていると◎'],
      },
      {
        tag: '靴をもう少し綺麗に',
        count: 2,
        tip: '靴は意外と見られています。月1メンテで印象底上げ。',
        partnerCategory: 'fashion',
      },
    ],
  },
  talkability: {
    positives: [
      { tag: '聞き上手', count: 6, comments: ['話を遮らず聞いてくれた', 'うなずきが自然で安心した'] },
      { tag: '質問が的確', count: 4 },
    ],
    improvements: [
      {
        tag: '自己開示がやや少ない',
        count: 4,
        tip: '相手2に対して自分1の比率で話すと、距離が一段近づきます。',
        partnerCategory: 'communication',
        comments: ['もっと自分のことを話してくれても嬉しかった'],
      },
      {
        tag: '会話のテンポ',
        count: 2,
        tip: '相手のリズムに半拍合わせるだけで「話しやすい」が劇的に上がります。',
        partnerCategory: 'communication',
      },
    ],
  },
  gottman: {
    positives: [
      { tag: '安心感がある', count: 5 },
      { tag: 'ユーモアがある', count: 3 },
    ],
    improvements: [
      {
        tag: 'もう少し感情表現を',
        count: 3,
        tip: '感想を言葉にすると「また会いたい」スコアが大きく上がります。',
        partnerCategory: 'communication',
      },
    ],
  },
  comfort: {
    positives: [
      { tag: '穏やかな雰囲気', count: 6 },
      { tag: 'リラックスできる', count: 4 },
    ],
    improvements: [
      {
        tag: '初対面の緊張が見えた',
        count: 2,
        tip: '最初の30秒の自己紹介テンプレートを用意しておくと、自然に入れます。',
        partnerCategory: 'communication',
      },
    ],
  },
  timeless: {
    positives: [
      { tag: '話が深く面白い', count: 4 },
    ],
    improvements: [
      {
        tag: '話題のバリエーション',
        count: 5,
        tip: '趣味＋仕事＋未来の話の3軸を持つと「もっと話していたい」と思わせやすい。',
        partnerCategory: 'communication',
        comments: ['最初の話題が続くと話のテンポが落ちました'],
      },
      {
        tag: '質問が一方的になる時間',
        count: 2,
        tip: '7分で1度、自分の話を5秒挟むと会話の停滞を防げます。',
        partnerCategory: 'communication',
      },
    ],
  },
  safety: {
    positives: [
      { tag: '受け入れてくれる感じ', count: 6 },
      { tag: '否定しない', count: 5 },
    ],
    improvements: [
      {
        tag: '本音が見えづらい',
        count: 2,
        tip: '同意だけでなく「自分はこう思う」を1文添えると一段深い信頼が生まれます。',
        partnerCategory: 'communication',
      },
    ],
  },
};

// ========== イベント後アンケートのコメント（匿名） ==========

export interface EventComment {
  id: string;
  type: 'positive' | 'constructive';
  text: string;
  fromGender: 'male' | 'female';
  fromAgeRange: string;
  dimension?: ScoreDimension;
  postedAt: string;
}

export const DEMO_EVENT_COMMENTS: EventComment[] = [
  {
    id: 'c-001',
    type: 'positive',
    text: '清潔感があって最初から話しやすかったです。声のトーンも落ち着いていて安心しました。',
    fromGender: 'female',
    fromAgeRange: '20代後半',
    dimension: 'appearance',
    postedAt: '2025-11-24T10:14:00Z',
  },
  {
    id: 'c-002',
    type: 'positive',
    text: '私の話を遮らずに最後まで聞いてくれて、とても嬉しかったです。',
    fromGender: 'female',
    fromAgeRange: '30代前半',
    dimension: 'talkability',
    postedAt: '2025-11-24T10:22:00Z',
  },
  {
    id: 'c-003',
    type: 'positive',
    text: '一緒にいて時間を忘れる感覚がありました。会話のテンポも心地よかった。',
    fromGender: 'female',
    fromAgeRange: '20代後半',
    dimension: 'timeless',
    postedAt: '2025-11-24T11:03:00Z',
  },
  {
    id: 'c-004',
    type: 'constructive',
    text: 'もう少し自分のことを話してくれたら、もっと早く距離が縮んだと思います。',
    fromGender: 'female',
    fromAgeRange: '20代後半',
    dimension: 'talkability',
    postedAt: '2025-11-24T11:48:00Z',
  },
  {
    id: 'c-005',
    type: 'positive',
    text: 'ユーモアがあって自然に笑えました。一緒にいて楽しかったです。',
    fromGender: 'female',
    fromAgeRange: '30代前半',
    dimension: 'gottman',
    postedAt: '2025-11-24T13:11:00Z',
  },
  {
    id: 'c-006',
    type: 'constructive',
    text: '眉毛が左右でバランスが違うのが気になりました。整えるとさらに爽やかな印象になりそう。',
    fromGender: 'female',
    fromAgeRange: '20代前半',
    dimension: 'appearance',
    postedAt: '2025-11-24T14:02:00Z',
  },
  {
    id: 'c-007',
    type: 'positive',
    text: '質問が的確で、私が話したいテーマをうまく引き出してくれました。',
    fromGender: 'female',
    fromAgeRange: '30代後半',
    dimension: 'talkability',
    postedAt: '2025-11-24T14:38:00Z',
  },
  {
    id: 'c-008',
    type: 'constructive',
    text: '最初の30秒で少し緊張が伝わりました。自己紹介テンプレを持つともっと自然に入れそう。',
    fromGender: 'female',
    fromAgeRange: '20代後半',
    dimension: 'comfort',
    postedAt: '2025-11-24T15:20:00Z',
  },
  {
    id: 'c-009',
    type: 'positive',
    text: 'シンプルで派手すぎず落ち着いた服装が好みでした。サイズ感もぴったりで素敵。',
    fromGender: 'female',
    fromAgeRange: '30代前半',
    dimension: 'appearance',
    postedAt: '2025-11-24T16:05:00Z',
  },
  {
    id: 'c-010',
    type: 'constructive',
    text: '話題のバリエーションがもう少し広いと、もっと長く話していたいと思いました。',
    fromGender: 'female',
    fromAgeRange: '20代後半',
    dimension: 'timeless',
    postedAt: '2025-11-24T16:42:00Z',
  },
  {
    id: 'c-011',
    type: 'positive',
    text: '否定せず受け入れてくれる雰囲気で、自分の本音を話せました。',
    fromGender: 'female',
    fromAgeRange: '30代前半',
    dimension: 'safety',
    postedAt: '2025-11-24T17:30:00Z',
  },
  {
    id: 'c-012',
    type: 'positive',
    text: '次もまた会ってみたいと思える人でした。',
    fromGender: 'female',
    fromAgeRange: '20代後半',
    dimension: 'gottman',
    postedAt: '2025-11-24T18:15:00Z',
  },
];

// ========== お知らせ（運営からのアナウンス） ==========

export type AnnouncementCategory = 'event' | 'feature' | 'campaign' | 'maintenance' | 'important';

export const ANNOUNCEMENT_CATEGORY_LABEL: Record<AnnouncementCategory, string> = {
  event: 'イベント',
  feature: '新機能',
  campaign: 'キャンペーン',
  maintenance: 'メンテナンス',
  important: '重要',
};

export interface Announcement {
  id: string;
  category: AnnouncementCategory;
  title: string;
  body: string;
  published_at: string;
  pinned?: boolean;
}

export const DEMO_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a-008',
    category: 'event',
    title: '恋フェスジャパン Vol.5 チケット受付中',
    body: '2026年6月14日（日）ゆめタウン徳島にて、恋フェスジャパン Vol.5 を開催します。2部制・各150名・参加費¥6,000。AI相性診断で席順が決まる新方式を導入。残席わずかのためお早めにお申し込みください。',
    published_at: '2026-05-14T10:00:00+09:00',
    pinned: true,
  },
  {
    id: 'a-007',
    category: 'feature',
    title: '恋の通知表に「印象マップ」を追加しました',
    body: '見た目フィードバックを人型図で可視化する「印象マップ」機能を追加。眉毛・髪型・服装など、参加者からの評価が一目で分かるようになりました。各項目は点数化され、磨きどころが明確になります。',
    published_at: '2026-05-13T15:00:00+09:00',
  },
  {
    id: 'a-006',
    category: 'campaign',
    title: '友達紹介キャンペーン｜美容券プレゼント',
    body: 'お友達を紹介すると、紹介者・被紹介者の双方に美容券をプレゼント。梅プラン¥5,000、竹プラン¥10,000、松プラン¥40,000相当。マイページの「友達紹介」から専用リンクを発行できます。',
    published_at: '2026-05-10T12:00:00+09:00',
  },
  {
    id: 'a-005',
    category: 'feature',
    title: '加盟店マップを公開しました',
    body: '「磨く」ページに徳島市内の加盟店マップを追加。お近くのサロンを地図から探せます。来店QRをスキャンすると会員価格が適用されます。',
    published_at: '2026-05-08T11:00:00+09:00',
  },
  {
    id: 'a-004',
    category: 'important',
    title: '本人確認・年齢確認の運用について',
    body: '安心・安全なご利用のため、本人確認（年齢確認を含む）を必須としています。マイページの「本人確認」より、身分証のアップロードをお願いします。確認完了後、すべての機能がご利用いただけます。',
    published_at: '2026-05-05T09:00:00+09:00',
  },
  {
    id: 'a-003',
    category: 'maintenance',
    title: 'システムメンテナンス完了のお知らせ',
    body: '2026年5月3日 深夜に実施したシステムメンテナンスは予定通り完了しました。ご協力ありがとうございました。',
    published_at: '2026-05-03T06:00:00+09:00',
  },
  {
    id: 'a-002',
    category: 'feature',
    title: '12タイプ恋愛診断「12恋神」リリース',
    body: '愛着スタイルと恋愛動機を掛け合わせた12タイプの恋愛診断をリリースしました。24問・所要3分。あなたの恋愛の傾向と相性の良いタイプが分かります。',
    published_at: '2026-04-28T14:00:00+09:00',
  },
  {
    id: 'a-001',
    category: 'important',
    title: 'MIRAIZ（ミライズ）へのサービス名称変更',
    body: 'KOIFES よりサービス名称を「MIRAIZ（ミライズ）」へ変更しました。「未来（mirai）」を「磨く（izu）」——出会う前に自分を整え、リアルとアプリで継続的に磨いていく、というコンセプトを込めています。',
    published_at: '2026-04-20T10:00:00+09:00',
  },
];

// ========== Magazine（恋愛コラムCMS） ==========

export const DEMO_ARTICLES: MagazineArticle[] = [
  {
    slug: 'first-impression-7s',
    title: '第一印象は7秒で決まる──徳島の婚活で勝てる人の共通点',
    excerpt: '人は出会って7秒以内に相手の印象を決定するという研究があります。婚活イベントで好印象を残すための実践テクニックを解説。',
    category: 'マインド',
    author: '恋フェス編集部',
    publishedAt: '2026-04-22',
    readingTime: 5,
    cover: 'gradient-1',
    body: `## 7秒で印象は固まる\n\nUCLAの研究によれば、人が初対面の相手を判断する時間はわずか7秒。その間にあなたの第一印象は固まり、その後の会話の解釈すべてに影響します。\n\n## 勝てる人の3つの共通点\n\n1. **姿勢が真っ直ぐ** — 自信は背中で語る\n2. **目線が動かない** — 相手の話を聞く姿勢\n3. **声のトーンが安定している** — 焦りが声に出ない\n\n## 徳島婚活で特に効くポイント\n\n地方都市の婚活では「派手さ」より「安心感」が評価されます。ブランド服より清潔感、トーク力より誠実さ。\n\n次回の恋フェスではぜひ意識してみてください。`,
  },
  {
    slug: 'tokushima-date-spots-2026',
    title: '徳島デートスポット2026──両想い後の初デートで失敗しない場所',
    excerpt: '恋フェスで両想いになった後、最初のデートでどこに行くか。徳島市内＋日帰り県内ドライブの厳選15スポットをご紹介。',
    category: 'デート',
    author: '恋フェス編集部',
    publishedAt: '2026-04-15',
    readingTime: 8,
    cover: 'gradient-2',
    body: `## 初デートの正解は「お互いが緊張しすぎない場所」\n\n初デートで失敗する典型は、気合いを入れすぎて高級レストランを予約してしまうこと。\n\n## おすすめ15選\n\n- 眉山ロープウェイ（夜景）\n- 阿波踊り会館（昼間でも盛り上がる）\n- ひょうたん島クルーズ\n- 大塚国際美術館（鳴門・アート好きに）\n- 祖谷渓谷ドライブ\n\n…(本文略)`,
  },
  {
    slug: 'rejection-recovery',
    title: 'NOをもらった時にやるべき3つのこと',
    excerpt: '恋の通知表でNOが多かった時、落ち込まずに次に活かすための整理術。著者の実体験ベース。',
    category: 'マインド',
    author: '恋フェス編集部',
    publishedAt: '2026-04-08',
    readingTime: 4,
    cover: 'gradient-3',
    body: `## NOは情報、否定ではない\n\n恋の通知表で「NOの理由」を見ると傷つきます。でもこれは「あなたの人格」ではなく「次に改善できる情報」です。\n\n## やるべき3つ\n\n1. NOの理由をスプレッドシートに集約\n2. 共通項を3つ抽出\n3. 1つだけ次回までに改善する\n\n…(本文略)`,
  },
  {
    slug: 'profile-photo-tips',
    title: 'プロフィール写真で「気になる」が3倍増えた撮り方',
    excerpt: 'スマホで自分撮りでもOK。光・角度・背景の3要素だけで印象が劇的に変わる撮影テクニック。',
    category: 'プロフィール',
    author: '恋フェス編集部',
    publishedAt: '2026-04-01',
    readingTime: 6,
    cover: 'gradient-4',
    body: '本文略',
  },
  {
    slug: 'koifes-vol4-report',
    title: '恋フェス Vol.4 開催レポート──112名の本気が交差した一日',
    excerpt: '2025年11月開催のVol.4を振り返ります。当日の様子・成立カップル数・参加者アンケート結果まで全公開。',
    category: 'イベントレポート',
    author: '恋フェス編集部',
    publishedAt: '2025-12-01',
    readingTime: 7,
    cover: 'gradient-5',
    body: '本文略',
  },
  {
    slug: 'why-koifes',
    title: '徳島で恋フェスを始めた理由──地方の出会い格差を変える',
    excerpt: '創業者・山下があえて地方発でマッチングサービスを始めた背景と、3年で見えてきたこと。',
    category: '想い',
    author: '山下 拓海',
    publishedAt: '2025-09-12',
    readingTime: 10,
    cover: 'gradient-6',
    body: '本文略',
  },
];

export const findDemoArticle = (slug: string): MagazineArticle | null =>
  DEMO_ARTICLES.find((a) => a.slug === slug) ?? null;

export const ARTICLE_CATEGORIES = [
  'すべて',
  'マインド',
  'デート',
  'プロフィール',
  'イベントレポート',
  '想い',
];

// ========== 通報・ブロック・違反検知 ==========

export const REPORT_REASONS: { value: import('./types').ReportReason; label: string; desc: string }[] = [
  { value: 'married', label: '既婚者の疑い', desc: '結婚指輪の跡・SNSで家族あり等' },
  { value: 'commercial', label: '営業・勧誘', desc: 'ビジネス・宗教・ネットワーク勧誘' },
  { value: 'fake', label: 'なりすまし・写真詐欺', desc: '別人の写真・虚偽プロフィール' },
  { value: 'inappropriate', label: '不適切なメッセージ', desc: '性的・攻撃的・誹謗中傷' },
  { value: 'other', label: 'その他', desc: '上記以外の違反' },
];

export const REPORT_REASON_LABEL: Record<import('./types').ReportReason, string> = {
  married: '既婚者の疑い',
  commercial: '営業・勧誘',
  fake: 'なりすまし・写真詐欺',
  inappropriate: '不適切なメッセージ',
  other: 'その他',
};

export const DEMO_BLOCKED_USERS: { id: string; name: string; blockedAt: string }[] = [
  { id: 'blocked-1', name: 'りく（28）', blockedAt: '2026-04-20' },
];

export const DEMO_REPORTS: Report[] = [
  {
    id: 'rp-001',
    from_user_id: 'demo-7',
    to_user_id: 'unknown-user-x',
    reason: 'married',
    detail: 'プロフィール写真の薬指に指輪の跡があります。',
    status: 'reviewing',
    created_at: '2026-04-26T09:14:00Z',
  },
  {
    id: 'rp-002',
    from_user_id: 'demo-3',
    to_user_id: 'unknown-user-y',
    reason: 'commercial',
    detail: '初回メッセージで投資勧誘がありました。',
    status: 'pending',
    created_at: '2026-04-25T18:42:00Z',
  },
  {
    id: 'rp-003',
    from_user_id: 'demo-5',
    to_user_id: 'unknown-user-z',
    reason: 'inappropriate',
    status: 'resolved',
    created_at: '2026-04-22T11:03:00Z',
  },
  {
    id: 'rp-004',
    from_user_id: 'demo-1',
    to_user_id: 'unknown-user-a',
    reason: 'fake',
    detail: '実際にお会いしたら写真と全く別人でした。',
    status: 'reviewing',
    created_at: '2026-04-21T14:20:00Z',
  },
  {
    id: 'rp-005',
    from_user_id: 'demo-2',
    to_user_id: 'unknown-user-b',
    reason: 'other',
    status: 'dismissed',
    created_at: '2026-04-18T08:55:00Z',
  },
];

export const REPORT_STATUS_LABEL: Record<Report['status'], string> = {
  pending: '未対応',
  reviewing: '確認中',
  resolved: '対応完了',
  dismissed: '却下',
};

// ========== 詳細プロフィール用ラベル ==========

export const SMOKING_LABEL: Record<NonNullable<UserProfile['smoking']>, string> = {
  no: '吸わない',
  sometimes: '時々',
  yes: '吸う',
};

export const DRINKING_LABEL: Record<NonNullable<UserProfile['drinking']>, string> = {
  no: '飲まない',
  sometimes: '時々',
  yes: '飲む',
};

// 100万円単位（200万〜2,000万）+ 答えない
export const INCOME_OPTIONS = [
  '〜200万円',
  '200〜300万円',
  '300〜400万円',
  '400〜500万円',
  '500〜600万円',
  '600〜700万円',
  '700〜800万円',
  '800〜900万円',
  '900〜1,000万円',
  '1,000〜1,100万円',
  '1,100〜1,200万円',
  '1,200〜1,300万円',
  '1,300〜1,400万円',
  '1,400〜1,500万円',
  '1,500〜1,600万円',
  '1,600〜1,700万円',
  '1,700〜1,800万円',
  '1,800〜1,900万円',
  '1,900〜2,000万円',
  '2,000万円〜',
  '答えない',
];

export const EDUCATION_OPTIONS = [
  '高校卒',
  '専門学校卒',
  '短大卒',
  '大学卒',
  '大学院卒',
  '答えない',
];

export const HOBBY_SUGGESTIONS = [
  'カフェ巡り', '映画', '読書', '旅行', '料理', '音楽',
  'スポーツ', 'ヨガ', 'ジム', 'ランニング', 'マラソン',
  'カメラ', 'アート鑑賞', '美術館', 'お笑い鑑賞',
  'キャンプ', '登山', 'ドライブ', '温泉', '釣り',
  'ゲーム', 'アニメ', 'ファッション', 'お酒', 'ワイン',
];

// 各趣味カテゴリのプレースホルダー（詳細入力時のヒント）
export const HOBBY_DETAIL_PLACEHOLDERS: Record<string, string> = {
  'カフェ巡り': '徳島ではmolt・東京ではブルーボトル など',
  '映画': '好きな監督・俳優・最近観た作品 など',
  '読書': '好きな作家・ジャンル・最近読んだ本 など',
  '旅行': '行った国・行きたい場所 など',
  '料理': '得意ジャンル・好きな料理 など',
  '音楽': '好きなアーティスト・ジャンル・ライブ参戦歴 など',
  'スポーツ': 'やる/観るスポーツ・推しチーム など',
  'ヨガ': '通っているスタジオ・好きなポーズ など',
  'ジム': '通うジム名・週何回・トレーニング歴 など',
  'ランニング': 'ベストタイム・出場大会・好きなコース など',
  'マラソン': '完走大会・ベスト・目標 など',
  'カメラ': '使用機材・好きな被写体・SNS など',
  'アート鑑賞': '好きな作家・最近行った展示 など',
  '美術館': '好きな美術館・最近行った展示 など',
  'お笑い鑑賞': '好きな芸人・コンビ・最近笑った番組 など',
  'キャンプ': 'ソロ/グループ・好きなキャンプ場 など',
  '登山': '登った山・目標の山 など',
  'ドライブ': '好きなコース・愛車・音楽 など',
  '温泉': 'おすすめの温泉地・好きな泉質 など',
  '釣り': '釣り方・狙う魚・釣り場 など',
  'ゲーム': '好きなタイトル・ジャンル・プラットフォーム など',
  'アニメ': '好きな作品・声優 など',
  'ファッション': '好きなブランド・系統 など',
  'お酒': '好きな種類・行きつけのお店 など',
  'ワイン': '好きな品種・産地・行きつけのワインバー など',
};

// 初デートに行きたい場所（複数選択可）
export const FIRST_DATE_LOCATIONS = [
  'おしゃれなカフェ',
  '雰囲気の良いレストラン',
  '映画館',
  '水族館',
  '動物園',
  '美術館・博物館',
  '公園で散歩',
  '夜景スポット',
  'ドライブ',
  'お祭り・花火大会',
  '居酒屋・バー',
  'ボウリング・カラオケ',
  '温泉・スパ',
  'ショッピングモール',
  '本屋巡り',
  '家でゆっくり',
];

// 何にお金を使っているか（複数選択可）
export const SPEND_CATEGORIES = [
  '服・ファッション',
  'コスメ・美容',
  '旅行',
  '外食・グルメ',
  '趣味',
  'ジム・健康',
  '習い事・自己投資',
  '推し活',
  '貯金',
  '投資・資産運用',
  '実家への仕送り',
  'ペット',
  '車・バイク',
  'サブスク',
  '本・学び',
  'プレゼント',
];

// ========== 拡張プロフィール用ラベル ==========

export const BODY_TYPE_LABEL: Record<NonNullable<UserProfile['body_type']>, string> = {
  slim: 'スレンダー',
  standard: '普通',
  athletic: '筋肉質',
  glamorous: 'グラマー',
  plus: 'ぽっちゃり',
};

export const BLOOD_TYPE_LABEL: Record<NonNullable<UserProfile['blood_type']>, string> = {
  A: 'A型',
  B: 'B型',
  O: 'O型',
  AB: 'AB型',
};

export const HOLIDAY_TYPE_LABEL: Record<NonNullable<UserProfile['holiday_type']>, string> = {
  weekend: '土日休み',
  weekday: '平日休み',
  shift: 'シフト制',
  irregular: '不規則',
};

export const WANT_CHILDREN_LABEL: Record<NonNullable<UserProfile['want_children']>, string> = {
  yes: 'ほしい',
  maybe: 'どちらかと言うとほしい',
  no: '希望しない',
  decline: '答えない',
};

export const WORK_AFTER_MARRIAGE_LABEL: Record<NonNullable<UserProfile['work_after_marriage']>, string> = {
  dual: '共働き希望',
  full: '専業を希望',
  flexible: 'パート・時短も検討',
  undecided: '相手と相談して決める',
};

export const LIVING_ARRANGEMENT_LABEL: Record<NonNullable<UserProfile['living_arrangement']>, string> = {
  separate: '別居（2人で住む）',
  with_parents: '親と同居も可',
  undecided: '相手と相談して決める',
};

// 結婚意思の5段階（戦略：温度感を段階化して入口を広げる。遊び目的は規約で排除）
export const MARRIAGE_INTENT_LABEL: Record<NonNullable<UserProfile['marriage_intent']>, string> = {
  1: 'まずは誠実な人と知り合いたい',
  2: '将来観が合う人と出会いたい',
  3: '良い人がいれば前向き',
  4: '2〜3年以内に結婚を考えたい',
  5: '1年以内に結婚したい',
};

export const MARRIAGE_INTENT_DESC: Record<NonNullable<UserProfile['marriage_intent']>, string> = {
  1: '結婚は急がないが、遊び目的ではない',
  2: '将来の暮らし方や価値観を確認しながら',
  3: '相性が合えば結婚も視野に',
  4: '結婚に向けて関係を深めたい',
  5: '具体的に結婚を意識して相手を探したい',
};

export const MBTI_TYPES: NonNullable<UserProfile['mbti']>[] = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

export const PERSONALITY_SUGGESTIONS = [
  '穏やか', '明るい', '誠実', '真面目', 'マイペース',
  '社交的', '内向的', '優しい', '気配り上手', '聞き上手',
  '行動派', '計画的', 'ユーモアがある', '甘えん坊',
  '一途', '前向き', 'おっとり', 'しっかり者',
];

export const LANGUAGE_OPTIONS = [
  '日本語', '英語', '中国語', '韓国語', 'スペイン語', 'フランス語', 'ドイツ語',
];

// ========== 結婚生活プラン用ラベル ==========

export const DATE_FREQUENCY_LABEL: Record<NonNullable<UserProfile['date_frequency']>, string> = {
  weekly: '週1回会いたい',
  biweekly: '2週に1回',
  monthly: '月1〜2回',
  flexible: 'お互いのペースで',
};

export const CONTACT_FREQUENCY_LABEL: Record<NonNullable<UserProfile['contact_frequency']>, string> = {
  multiple_daily: '1日に何度も',
  daily: '毎日少しずつ',
  few_per_week: '週に数回',
  weekly: '週1〜2回',
  flexible: '相手のペースに合わせる',
};

export const HOUSEHOLD_DIVISION_LABEL: Record<NonNullable<UserProfile['household_division']>, string> = {
  equal: 'きっちり折半',
  good_at: '得意な方が担当',
  depends: '状況に応じて柔軟に',
  undecided: '相談して決めたい',
};

export const TRANSFER_POSSIBILITY_LABEL: Record<NonNullable<UserProfile['transfer_possibility']>, string> = {
  no: '転勤の可能性なし',
  maybe: '可能性あり',
  yes: '転勤族',
};

export const WEDDING_STYLE_LABEL: Record<NonNullable<UserProfile['wedding_style']>, string> = {
  large: '大規模に挙げたい',
  medium: '中規模で親しい人と',
  small: '少人数で',
  family_only: '家族だけ',
  none: '挙げない・フォトのみ',
  undecided: '相談して決めたい',
};

export const HOUSING_PREFERENCE_LABEL: Record<NonNullable<UserProfile['housing_preference']>, string> = {
  owned: '持ち家を希望',
  rent: '賃貸でOK',
  undecided: '相談して決めたい',
};

export const MONEY_STYLE_LABEL: Record<NonNullable<UserProfile['money_style']>, string> = {
  saver: '貯金重視',
  balanced: 'バランス型',
  spender: '使うことも大事',
  undecided: '答えない',
};

export const WEEKEND_STYLE_LABEL: Record<NonNullable<UserProfile['weekend_style']>, string> = {
  outdoor: 'アウトドア派',
  indoor: 'インドア派',
  mixed: '気分次第',
};

export const RELIGION_LABEL: Record<NonNullable<UserProfile['religion']>, string> = {
  none: '特になし',
  has: 'あり',
  decline: '答えない',
};

// ========== 相互評価（ポジティブバッジ） ==========
// ネガティブ評価ではなく「良かった点」を選ぶ式。報復評価防止のため両者提出まで結果非開示。

export type ReviewBadgeId =
  | 'fun_conversation'
  | 'punctual'
  | 'polite'
  | 'natural'
  | 'shared_values'
  | 'good_manners'
  | 'thoughtful'
  | 'humor'
  | 'sincere'
  | 'calm'
  | 'good_listener'
  | 'nice_smile'
  | 'clean'
  | 'genuine_interest';

export interface ReviewBadge {
  id: ReviewBadgeId;
  label: string;
  emoji?: never; // 絵文字は使わない方針
}

export const REVIEW_BADGES: ReviewBadge[] = [
  { id: 'fun_conversation', label: '会話が楽しかった' },
  { id: 'punctual', label: '時間を守ってくれた' },
  { id: 'polite', label: '礼儀正しかった' },
  { id: 'natural', label: '自然体で接してくれた' },
  { id: 'shared_values', label: '価値観が近かった' },
  { id: 'good_manners', label: '食事のマナーが良かった' },
  { id: 'thoughtful', label: '気配りが上手' },
  { id: 'humor', label: 'ユーモアがあった' },
  { id: 'sincere', label: '真剣に向き合ってくれた' },
  { id: 'calm', label: '落ち着いた雰囲気' },
  { id: 'good_listener', label: '聞き上手' },
  { id: 'nice_smile', label: '笑顔が素敵' },
  { id: 'clean', label: '清潔感があった' },
  { id: 'genuine_interest', label: '私のことに興味を持ってくれた' },
];

export const REVIEW_BADGE_LABEL: Record<ReviewBadgeId, string> =
  REVIEW_BADGES.reduce((acc, b) => ({ ...acc, [b.id]: b.label }), {} as Record<ReviewBadgeId, string>);

// 1度の評価で選べる最小・最大数
export const REVIEW_MIN_BADGES = 3;
export const REVIEW_MAX_BADGES = 5;

// 自分が過去に他者から受け取ったバッジ集計（プロフィール表示用）
export const DEMO_RECEIVED_BADGES: Record<ReviewBadgeId, number> = {
  fun_conversation: 4,
  punctual: 6,
  polite: 5,
  natural: 3,
  shared_values: 2,
  good_manners: 3,
  thoughtful: 4,
  humor: 2,
  sincere: 5,
  calm: 3,
  good_listener: 4,
  nice_smile: 3,
  clean: 4,
  genuine_interest: 2,
};

// 各スレッドの評価提出状態（demo）
export interface ThreadReviewState {
  date_completed: boolean;        // デートが完了したか
  date_completed_at: string | null;
  my_review_submitted: boolean;   // 自分が評価提出済か
  partner_review_submitted: boolean; // 相手が評価提出済か（demoでは固定）
  badges_received_from_partner: ReviewBadgeId[]; // 相手から自分への評価（両者提出後に開示）
}

export const DEMO_THREAD_REVIEW_STATE: Record<string, ThreadReviewState> = {
  'thread-demo-1': {
    date_completed: true, // 既にデート済（評価フェーズ）
    date_completed_at: '2026-04-29T19:00:00Z',
    my_review_submitted: false,
    partner_review_submitted: true, // 相手は提出済→自分の提出を待っている状態
    badges_received_from_partner: ['fun_conversation', 'punctual', 'natural', 'sincere'],
  },
  'thread-demo-3': {
    date_completed: false,
    date_completed_at: null,
    my_review_submitted: false,
    partner_review_submitted: false,
    badges_received_from_partner: [],
  },
};

// ========== デート設定（Lv1ソフト強制） ==========
// メッセージ6通キャップ／14日マッチ失効／常時デート候補日UI／¥500で3往復追加（逃げ道）

export const MATCH_EXPIRY_DAYS = 14;
// メール解放（3往復追加）の男女別単価
export const DELAY_PURCHASE_PRICE_FEMALE = 500;
export const DELAY_PURCHASE_PRICE_MALE = 1000;
export const DELAY_PURCHASE_ROUNDTRIPS = 3;
// 後方互換用（自分の性別に応じた単価を返すヘルパー）
export const DELAY_PURCHASE_PRICE = DELAY_PURCHASE_PRICE_FEMALE; // 旧定数（参照箇所が残っている場合の暫定）
export function getDelayPurchasePrice(gender: 'male' | 'female'): number {
  return gender === 'male' ? DELAY_PURCHASE_PRICE_MALE : DELAY_PURCHASE_PRICE_FEMALE;
}

export interface DateCandidate {
  datetime: string; // ISO
  location: string;
}

export type ProposalStatus =
  | 'none'              // 未提案
  | 'awaiting_partner'  // 自分が提案 → 相手の返答待ち
  | 'awaiting_me'       // 相手が提案 → 自分の返答待ち
  | 'confirmed'         // 確定
  | 'declined';         // 双方が合意できず

export interface DateProposal {
  proposed_by: string;        // ユーザーID
  candidates: DateCandidate[]; // 候補3つ
  partner_picks: number[];    // 相手が承諾した候補のindex
  confirmed_index: number | null;
  status: ProposalStatus;
}

export interface ThreadDateState {
  matched_at: string;
  expires_at: string;       // matched_at + 14日
  proposal: DateProposal | null;
  delay_purchases: number;  // ¥500購入回数
}

const now = new Date();
const daysFromNow = (d: number) => new Date(now.getTime() + d * 24 * 60 * 60 * 1000).toISOString();
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

export const DEMO_THREAD_DATE_STATE: Record<string, ThreadDateState> = {
  'thread-demo-1': {
    matched_at: daysAgo(6),
    expires_at: daysFromNow(8), // 残8日
    proposal: {
      proposed_by: 'demo-1',
      candidates: [
        { datetime: daysAgo(3), location: 'スターバックス 徳島藍住店' },
      ],
      partner_picks: [0],
      confirmed_index: 0,
      status: 'confirmed',
    },
    delay_purchases: 0,
  },
  'thread-demo-3': {
    matched_at: daysAgo(1),
    expires_at: daysFromNow(13), // 残13日
    proposal: null,
    delay_purchases: 0,
  },
};

// ========== チャット ==========

export const DEMO_THREADS: ChatThread[] = [
  {
    id: 'thread-demo-1',
    participants: ['demo-me', 'demo-1'],
    last_message_at: '2026-04-28T09:32:00Z',
    unread_count: 1,
    unlocked: false, // 3往復後は課金ロック（両者¥1,000）
  },
  {
    id: 'thread-demo-3',
    participants: ['demo-me', 'demo-3'],
    last_message_at: '2026-04-26T20:14:00Z',
    unread_count: 0,
    unlocked: false,
  },
];

// チャット解放料金（両者から徴収）— 3往復無料後のpaywall単価
export const CHAT_UNLOCK_PRICE_PER_USER = 1000;

// ========== 両想い直後の感情ヒアリング（仲人サポート・事前アドバイス） ==========

export type FeelingTag =
  | 'excited'      // 楽しみ
  | 'nervous'      // 緊張
  | 'anxious'      // 不安
  | 'hopeful'      // 期待
  | 'unsure'       // 迷い
  | 'low_confidence' // 自信ない
  | 'happy'        // 嬉しい
  | 'cautious';    // 慎重

export const FEELING_TAGS: { value: FeelingTag; label: string }[] = [
  { value: 'excited', label: '楽しみ' },
  { value: 'nervous', label: '緊張' },
  { value: 'anxious', label: '不安' },
  { value: 'hopeful', label: '期待' },
  { value: 'unsure', label: '迷い' },
  { value: 'low_confidence', label: '自信ない' },
  { value: 'happy', label: '嬉しい' },
  { value: 'cautious', label: '慎重に進めたい' },
];

export interface ThreadSupportState {
  submitted: boolean;
  want_matchmaker: boolean | null;       // 仲人サポート希望
  want_pre_advice: boolean | null;       // 事前アドバイス希望
  feelings: FeelingTag[];                // 今の気持ち（複数選択）
  free_note: string | null;              // 一言（任意）
  submitted_at: string | null;
}

export const DEMO_THREAD_SUPPORT_STATE: Record<string, ThreadSupportState> = {
  'thread-demo-1': {
    submitted: true, // 既に送信済（古いマッチ）
    want_matchmaker: false,
    want_pre_advice: true,
    feelings: ['excited', 'cautious'],
    free_note: null,
    submitted_at: '2026-04-26T10:00:00Z',
  },
  'thread-demo-3': {
    submitted: false, // 未送信（新しいマッチ・カードを表示）
    want_matchmaker: null,
    want_pre_advice: null,
    feelings: [],
    free_note: null,
    submitted_at: null,
  },
};

export const DEMO_MESSAGES: Record<string, ChatMessage[]> = {
  'thread-demo-1': [
    {
      id: 'm-1-1',
      thread_id: 'thread-demo-1',
      from_user_id: 'demo-1',
      text: 'はじめまして！両想いになれて嬉しいです🌸',
      sent_at: '2026-04-27T18:30:00Z',
      read_at: '2026-04-27T18:35:00Z',
    },
    {
      id: 'm-1-2',
      thread_id: 'thread-demo-1',
      from_user_id: 'demo-me',
      text: 'こちらこそ嬉しいです！プロフィールのカフェ巡り、僕も大好きです☕️',
      sent_at: '2026-04-27T18:45:00Z',
      read_at: '2026-04-27T18:50:00Z',
    },
    {
      id: 'm-1-3',
      thread_id: 'thread-demo-1',
      from_user_id: 'demo-1',
      text: '本当ですか！おすすめのお店ありますか？最近徳島市内に新しくオープンしたお店があって気になっていて。',
      sent_at: '2026-04-27T19:02:00Z',
      read_at: '2026-04-27T19:10:00Z',
    },
    {
      id: 'm-1-4',
      thread_id: 'thread-demo-1',
      from_user_id: 'demo-me',
      text: '佐古の方にある小さなロースタリーが最近のお気に入りです。\nそこのフラットホワイトが絶品でした！',
      sent_at: '2026-04-27T19:20:00Z',
      read_at: '2026-04-27T19:25:00Z',
    },
    {
      id: 'm-1-5',
      thread_id: 'thread-demo-1',
      from_user_id: 'demo-1',
      text: 'わ、行ってみたい！もしよかったら今度一緒にどうですか？☕',
      sent_at: '2026-04-28T09:32:00Z',
      read_at: null,
    },
  ],
  'thread-demo-3': [
    {
      id: 'm-3-1',
      thread_id: 'thread-demo-3',
      from_user_id: 'demo-3',
      text: 'こんにちは！プロフィール拝見しました、登山好きなんですね🏔',
      sent_at: '2026-04-26T19:50:00Z',
      read_at: '2026-04-26T19:55:00Z',
    },
    {
      id: 'm-3-2',
      thread_id: 'thread-demo-3',
      from_user_id: 'demo-me',
      text: 'はい、最近は剣山に登りました！ゆいさんはどんな山がお好きですか？',
      sent_at: '2026-04-26T20:14:00Z',
      read_at: null,
    },
  ],
};

export const findDemoThread = (id: string): ChatThread | null =>
  DEMO_THREADS.find((t) => t.id === id) ?? null;

export const findDemoThreadByPartner = (partnerId: string): ChatThread | null =>
  DEMO_THREADS.find((t) => t.participants.includes(partnerId) && t.participants.includes('demo-me')) ?? null;

export const DEMO_TOTAL_UNREAD = DEMO_THREADS.reduce((sum, t) => sum + t.unread_count, 0);

// 未読のイベント告知数（Vol.5新着分など）
export const DEMO_NEW_EVENT_COUNT = 1;

// ========== 加盟店プログラム（恋フェス スコアアップ加盟店） ==========

export type PartnerCategory =
  | 'eyelash' | 'eyebrow' | 'bodymake' | 'facial'
  | 'hair_removal' | 'hair_salon' | 'fashion' | 'communication';

export const PARTNER_CATEGORY_LABEL: Record<PartnerCategory, string> = {
  eyelash: 'まつ毛',
  eyebrow: '眉毛',
  bodymake: 'ボディメイク',
  facial: 'フェイシャル',
  hair_removal: '脱毛',
  hair_salon: '美容室',
  fashion: 'ファッション',
  communication: 'コミュニケーション',
};

export const PARTNER_CATEGORY_DESC: Record<PartnerCategory, string> = {
  eyelash: '目元の印象を底上げ',
  eyebrow: '顔の輪郭を整える',
  bodymake: '体のラインを美しく',
  facial: '肌を整えて第一印象UP',
  hair_removal: '清潔感の決定打',
  hair_salon: '髪型で印象を変える',
  fashion: '服装の似合わせ診断',
  communication: '話し方・自己肯定感',
};

// スコア低い項目→推奨カテゴリ
export const SCORE_TO_CATEGORY: Record<string, PartnerCategory> = {
  appearance: 'facial',
  talkability: 'communication',
};

export interface PartnerMenu {
  id: string;
  name: string;
  duration_min: number;
  regular_price: number;
  member_price: number;
  description?: string;
}

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  tagline: string;
  description: string;
  address: string;
  hours: string;
  closed: string;
  member_offer: string;
  base_price: number;
  rating: number;
  review_count: number;
  bookable: boolean;
  is_owned?: boolean;
  menus?: PartnerMenu[];
  // 営業日における時間枠の例（曜日×開始時刻）
  weekly_slots?: { weekday: number; times: string[] }[];
  // マップ表示用の座標（オンライン店舗は null）
  lat?: number | null;
  lng?: number | null;
}

// 各加盟店の座標（徳島市内・マップ表示用）
export const PARTNER_COORDS: Record<string, { lat: number; lng: number } | null> = {
  'p-bii': { lat: 34.0688, lng: 134.5535 },          // 秋田町
  'p-challengym': { lat: 34.0722, lng: 134.5512 },    // 寺島本町東
  'p-eyelash-1': { lat: 34.0735, lng: 134.5562 },     // 東船場町
  'p-eyebrow-1': { lat: 34.0711, lng: 134.5544 },     // 籠屋町
  'p-hair-removal-1': { lat: 34.0701, lng: 134.5523 },// 藍場町
  'p-hair-salon-1': { lat: 34.0752, lng: 134.5483 },  // 新蔵町
  'p-fashion-1': { lat: 34.0743, lng: 134.5401 },     // 佐古一番町
  'p-comm-1': null,                                    // オンライン
};

export const DEMO_PARTNERS: Partner[] = [
  {
    id: 'p-bii',
    name: '美意識サロン徳島',
    category: 'facial',
    tagline: 'フェイシャル × 脱毛 専門サロン',
    description: '恋フェス公式パートナー（自社運営）。会員価格でフェイシャル＋脱毛の両方を受けられます。',
    address: '徳島市秋田町1-25',
    hours: '10:00 - 21:00',
    closed: '水曜',
    member_offer: '初回 ¥3,300（通常¥6,600 / 50% OFF）',
    base_price: 6600,
    rating: 4.8,
    review_count: 127,
    bookable: true,
    is_owned: true,
    menus: [
      {
        id: 'm-1',
        name: '初回お試し フェイシャル',
        duration_min: 60,
        regular_price: 6600,
        member_price: 3300,
        description: 'カウンセリング込み・恋フェス会員様初回限定',
      },
      {
        id: 'm-2',
        name: 'フェイシャル スタンダード',
        duration_min: 90,
        regular_price: 9900,
        member_price: 7900,
        description: '毛穴ケア+トリートメント',
      },
      {
        id: 'm-3',
        name: '部分脱毛（VIO以外1部位）',
        duration_min: 30,
        regular_price: 5500,
        member_price: 4400,
      },
      {
        id: 'm-4',
        name: 'フェイシャル＋脱毛セット',
        duration_min: 120,
        regular_price: 14300,
        member_price: 10900,
        description: '通知表「見た目印象」を最短で底上げ',
      },
    ],
    weekly_slots: [
      { weekday: 1, times: ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'] },
      { weekday: 2, times: ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'] },
      { weekday: 4, times: ['11:00', '13:00', '15:00', '17:00', '19:00'] },
      { weekday: 5, times: ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'] },
      { weekday: 6, times: ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'] },
      { weekday: 0, times: ['10:00', '11:30', '13:00', '14:30', '16:00'] },
    ],
  },
  {
    id: 'p-challengym',
    name: 'challengym',
    category: 'bodymake',
    tagline: 'パーソナルトレーニング徳島',
    description: '恋フェス公式パートナー（自社運営）。結婚前ボディメイク3ヶ月集中プランあり。',
    address: '徳島市寺島本町東',
    hours: '7:00 - 23:00',
    closed: '日曜',
    member_offer: '体験¥3,000（通常¥6,000）＋恋フェス会員 月額20% OFF',
    base_price: 30000,
    rating: 4.9,
    review_count: 41,
    bookable: true,
    is_owned: true,
    menus: [
      {
        id: 'cg-1',
        name: 'パーソナル体験トレーニング',
        duration_min: 60,
        regular_price: 6000,
        member_price: 3000,
        description: '恋フェス会員様限定・初回50% OFF',
      },
      {
        id: 'cg-2',
        name: '結婚前ボディメイク3ヶ月集中（月8回）',
        duration_min: 60,
        regular_price: 50000,
        member_price: 40000,
        description: '月額・継続プラン',
      },
      {
        id: 'cg-3',
        name: 'ペアトレーニング（両想い特典）',
        duration_min: 60,
        regular_price: 8000,
        member_price: 3000,
        description: 'お二人で1回・初回限定',
      },
    ],
    weekly_slots: [
      { weekday: 1, times: ['07:00', '09:00', '11:00', '13:00', '17:00', '19:00', '21:00'] },
      { weekday: 2, times: ['07:00', '09:00', '11:00', '13:00', '17:00', '19:00', '21:00'] },
      { weekday: 3, times: ['07:00', '09:00', '11:00', '13:00', '17:00', '19:00', '21:00'] },
      { weekday: 4, times: ['07:00', '09:00', '11:00', '13:00', '17:00', '19:00', '21:00'] },
      { weekday: 5, times: ['07:00', '09:00', '11:00', '13:00', '17:00', '19:00', '21:00'] },
      { weekday: 6, times: ['09:00', '11:00', '13:00', '15:00'] },
    ],
  },
  {
    id: 'p-eyelash-1',
    name: 'ANELA Eyelash',
    category: 'eyelash',
    tagline: '徳島駅前のマツエク専門店',
    description: '創業応援加盟店。恋フェス会員様限定で初回オフ無料＋20%OFF。',
    address: '徳島市東船場町',
    hours: '10:00 - 19:00',
    closed: '火曜',
    member_offer: '初回オフ無料＋施術料20% OFF',
    base_price: 5500,
    rating: 4.6,
    review_count: 89,
    bookable: true,
  },
  {
    id: 'p-eyebrow-1',
    name: 'EYEBROW STUDIO TOKUSHIMA',
    category: 'eyebrow',
    tagline: '眉毛の似合わせデザイン',
    description: '創業応援加盟店。骨格分析と顔タイプ別の似合わせデザインで印象を底上げ。',
    address: '徳島市籠屋町',
    hours: '11:00 - 20:00',
    closed: '月曜',
    member_offer: '初回 ¥4,400（通常¥6,600）',
    base_price: 6600,
    rating: 4.7,
    review_count: 52,
    bookable: true,
  },
  {
    id: 'p-hair-removal-1',
    name: 'Smooth 徳島',
    category: 'hair_removal',
    tagline: '医療脱毛クリニック',
    description: '創業応援加盟店。VIO含む全身脱毛が恋フェス会員価格で。',
    address: '徳島市藍場町',
    hours: '10:00 - 19:00',
    closed: '日曜',
    member_offer: '全身脱毛コース 30,000円OFF',
    base_price: 198000,
    rating: 4.5,
    review_count: 73,
    bookable: true,
  },
  {
    id: 'p-hair-salon-1',
    name: 'CICCA hair design',
    category: 'hair_salon',
    tagline: '徳島の隠れ家美容室',
    description: '創業応援加盟店。婚活向けの似合わせカット＆カラー。',
    address: '徳島市新蔵町',
    hours: '10:00 - 20:00',
    closed: '火曜',
    member_offer: 'カット＆カラー ¥9,800（通常¥13,200）',
    base_price: 13200,
    rating: 4.8,
    review_count: 64,
    bookable: true,
  },
  {
    id: 'p-fashion-1',
    name: 'STYLE LAB',
    category: 'fashion',
    tagline: 'パーソナルスタイリングサロン',
    description: '創業応援加盟店。骨格・顔タイプ診断＋婚活向けコーディネート提案。',
    address: '徳島市佐古一番町',
    hours: '完全予約制',
    closed: '不定休',
    member_offer: '骨格診断＋スタイリング 90分 ¥9,800（通常¥16,500）',
    base_price: 16500,
    rating: 4.9,
    review_count: 28,
    bookable: true,
  },
  {
    id: 'p-comm-1',
    name: '恋フェス婚活コミュ力スクール',
    category: 'communication',
    tagline: '会話力・自己肯定感トレーニング',
    description: '創業応援加盟店。婚活で結果が出ない方向けのコミュ力強化セッション。',
    address: 'オンライン＋徳島市内',
    hours: '完全予約制',
    closed: '不定休',
    member_offer: '初回90分セッション ¥0（通常¥9,800）',
    base_price: 9800,
    rating: 4.9,
    review_count: 19,
    bookable: true,
  },
];

export const findDemoPartner = (id: string) =>
  DEMO_PARTNERS.find((p) => p.id === id) ?? null;

// ========== 予約モック ==========

export interface BookingRecord {
  id: string;
  partner_id: string;
  menu_id: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  customer_name: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'visited';
  created_at: string;
}

export const DEMO_PARTNER_BOOKINGS: BookingRecord[] = [
  {
    id: 'bk-001',
    partner_id: 'p-bii',
    menu_id: 'm-1',
    date: '2026-04-30',
    start_time: '11:30',
    customer_name: 'Y. K. 様',
    status: 'confirmed',
    created_at: '2026-04-28T10:14:00Z',
  },
  {
    id: 'bk-002',
    partner_id: 'p-bii',
    menu_id: 'm-2',
    date: '2026-04-30',
    start_time: '14:30',
    customer_name: 'A. M. 様',
    status: 'pending',
    created_at: '2026-04-29T09:30:00Z',
  },
  {
    id: 'bk-003',
    partner_id: 'p-bii',
    menu_id: 'm-4',
    date: '2026-05-01',
    start_time: '13:00',
    customer_name: 'S. T. 様',
    status: 'confirmed',
    created_at: '2026-04-26T15:50:00Z',
  },
  {
    id: 'bk-004',
    partner_id: 'p-bii',
    menu_id: 'm-1',
    date: '2026-05-02',
    start_time: '17:30',
    customer_name: 'M. N. 様',
    status: 'pending',
    created_at: '2026-04-29T08:12:00Z',
  },
  {
    id: 'bk-005',
    partner_id: 'p-challengym',
    menu_id: 'cg-1',
    date: '2026-04-30',
    start_time: '19:00',
    customer_name: 'R. T. 様',
    status: 'confirmed',
    created_at: '2026-04-27T20:00:00Z',
  },
];

// 予約済み（既にブロック中）の枠を取得
export function getBookedSlots(partnerId: string): { date: string; time: string }[] {
  return DEMO_PARTNER_BOOKINGS
    .filter((b) => b.partner_id === partnerId && (b.status === 'confirmed' || b.status === 'pending'))
    .map((b) => ({ date: b.date, time: b.start_time }));
}

// ========== 来店QR / 手数料モデル ==========

export interface VisitRecord {
  id: string;
  partner_id: string;
  user_id: string;
  user_name: string;
  visited_at: string;
  reported_amount: number;
  commission_rate: number;
  commission_yen: number;
  customer_reward_points?: number; // 顧客への還元ポイント（来店金額×5%）
  score_dimension_uplift: { dimension: ScoreDimension; delta: number }[];
}

export const calcCustomerReward = (amount: number) => Math.floor(amount * 0.05);

// ========== イベント一覧（公開情報） ==========

export interface EventSummary {
  id: string;
  token: string;
  name: string;
  date: string;
  end_date: string;
  venue: string;
  address: string;
  capacity: number;
  ticket_price: number;
  status: 'upcoming' | 'live' | 'past';
  description: string;
  thumbnail?: string;
  highlights: string[];
  schedule: { time: string; content: string }[];
  notes: string[];
}

export const DEMO_EVENTS_LIST: EventSummary[] = [
  {
    id: 'vol5-2',
    token: 'vol5-pm',
    name: '恋フェス Vol.5・第二部',
    date: '2026-06-13T14:00:00+09:00',
    end_date: '2026-06-13T17:00:00+09:00',
    venue: 'ゆめタウン徳島',
    address: '徳島県徳島市末広4-1-80',
    capacity: 70,
    ticket_price: 6000,
    status: 'live',
    description: '徳島で出逢って、徳島で結婚する。恋フェスは「会う前に温度感が分かる」リアル婚活イベント。3部制70名×3＝210名規模。',
    highlights: [
      '価値観グループトーク（4人1組×2回・メンバー入替）',
      'ゆめタウン徳島内モール回遊（30分×2回）',
      '会話直後にアプリで即時評価入力',
      '当日終了後にアプリで両想い結果発表',
      '翌朝10時に「恋の通知表」LINE配信',
    ],
    schedule: [
      { time: '14:00-14:20', content: '受付・アプリ起動確認' },
      { time: '14:20-14:30', content: 'オープニング' },
      { time: '14:30-15:00', content: '価値観グループトーク①' },
      { time: '15:00-15:30', content: 'モール回遊①' },
      { time: '15:30-16:15', content: '価値観グループトーク②（メンバー入替）' },
      { time: '16:15-16:45', content: 'モール回遊②' },
      { time: '16:45-17:00', content: 'クロージング・両想い発表' },
    ],
    notes: [
      '会場での連絡先・LINE・SNS交換は禁止です',
      '気になった相手とは両想いになった場合のみアプリで繋がれます',
      'スマホ持参必須・アプリ事前DLでスムーズに参加できます',
    ],
  },
  {
    id: 'vol6',
    token: 'vol6',
    name: '恋フェス Vol.6',
    date: '2026-09-12T14:00:00+09:00',
    end_date: '2026-09-12T17:00:00+09:00',
    venue: 'ゆめタウン徳島',
    address: '徳島県徳島市末広4-1-80',
    capacity: 70,
    ticket_price: 6000,
    status: 'upcoming',
    description: 'Vol.5の好評を受けた第6回開催。Vol.5参加者の早割あり。',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=400&fit=crop&auto=format&q=80',
    highlights: [
      '価値観グループトーク',
      'モール回遊',
      'リアルタイム評価＋翌朝通知表',
      'Vol.5参加者は¥1,000割引',
    ],
    schedule: [
      { time: '14:00-14:20', content: '受付' },
      { time: '14:20-17:00', content: 'グループトーク+モール回遊' },
    ],
    notes: [
      '会場での連絡先交換禁止',
      '事前PRE登録（45項目）が必要です',
    ],
  },
  {
    id: 'mini-7',
    token: 'mini-7',
    name: 'タイプ別ミニ会・徳島駅カフェ',
    date: '2026-07-12T19:00:00+09:00',
    end_date: '2026-07-12T21:00:00+09:00',
    venue: 'カフェ La Brisa',
    address: '徳島県徳島市寺島本町西',
    capacity: 30,
    ticket_price: 3000,
    status: 'upcoming',
    description: '少人数限定のタイプ別マッチング。価値観共有タイプ・居心地タイプ・成長志向タイプ別に分けて深い会話を。',
    highlights: [
      '同じタイプ同士で30名限定',
      '深い会話・少人数',
      '徳島駅から徒歩3分',
    ],
    schedule: [
      { time: '19:00-19:15', content: '受付・自己紹介' },
      { time: '19:15-20:45', content: 'グループトーク' },
      { time: '20:45-21:00', content: '相互評価・解散' },
    ],
    notes: [
      'タイプ判定は事前アプリ内で完了させてください',
      'カフェ利用料はチケットに含まれます',
    ],
  },
  {
    id: 'vol4',
    token: 'vol4',
    name: '恋フェス Vol.4',
    date: '2026-03-15T14:00:00+09:00',
    end_date: '2026-03-15T17:00:00+09:00',
    venue: 'ゆめタウン徳島',
    address: '徳島県徳島市末広4-1-80',
    capacity: 60,
    ticket_price: 6000,
    status: 'past',
    description: '過去開催の恋フェス。',
    highlights: [],
    schedule: [],
    notes: [],
  },
];

export const findDemoEvent = (token: string): EventSummary | null =>
  DEMO_EVENTS_LIST.find((e) => e.token === token) ?? null;

// ローカルストレージで購入したチケットを保持（デモ用）
const TICKET_STORAGE_KEY = 'koifes_demo_extra_tickets';

export const hasEventTicket = (token: string): boolean => {
  const base = DEMO_USER_STATE.event_tickets.includes(token);
  if (base) return true;
  if (typeof window !== 'undefined') {
    try {
      const extra = JSON.parse(localStorage.getItem(TICKET_STORAGE_KEY) || '[]') as string[];
      return extra.includes(token);
    } catch {
      return false;
    }
  }
  return false;
};

export const grantEventTicket = (token: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = JSON.parse(localStorage.getItem(TICKET_STORAGE_KEY) || '[]') as string[];
    if (!current.includes(token)) {
      localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify([...current, token]));
    }
  } catch {
    // ignore
  }
};

// ========== 今回のイベントでの試み（成長目標・MIRAIZブランド） ==========

export type IntentionTag =
  | 'listen_more'        // 聞き上手になる
  | 'ask_questions'      // 自分から質問する
  | 'draw_out'           // 相手の話を引き出す
  | 'smile_more'         // 笑顔を意識する
  | 'good_posture'       // 姿勢を正す
  | 'self_disclose'      // 自分の弱みを話す
  | 'share_hobbies'      // 趣味を素直に語る
  | 'talk_future'        // 将来の話をする
  | 'no_quick_judge'     // 第一印象で判断を急がない
  | 'embrace_nervous'    // 緊張を受け入れる
  | 'enjoy'              // とにかく楽しむ
  | 'speak_first'        // 気になった人に自分から話しかける
  | 'finish_strong'      // 最後まで完走する
  // 見た目（イベント前に準備）
  | 'fresh_hairstyle'    // 髪型を整えて参加する
  | 'tidy_eyebrows'      // 眉毛を整えて参加する
  | 'new_outfit'         // 服装を新調・見直す
  | 'clean_impression'   // 清潔感を意識する
  | 'fit_clothing';      // サイズの合った服を着る

export const INTENTION_TAGS: { value: IntentionTag; label: string; category: string }[] = [
  // 見た目（イベント前に準備）
  { value: 'fresh_hairstyle', label: '髪型を整えて参加する', category: '見た目' },
  { value: 'tidy_eyebrows', label: '眉毛を整えて参加する', category: '見た目' },
  { value: 'new_outfit', label: '服装を新調・見直す', category: '見た目' },
  { value: 'clean_impression', label: '清潔感を意識する', category: '見た目' },
  { value: 'fit_clothing', label: 'サイズの合った服を着る', category: '見た目' },
  // 会話力
  { value: 'listen_more', label: '聞き上手になる', category: '会話力' },
  { value: 'ask_questions', label: '自分から質問する', category: '会話力' },
  { value: 'draw_out', label: '相手の話を引き出す', category: '会話力' },
  // 第一印象
  { value: 'smile_more', label: '笑顔を意識する', category: '第一印象' },
  { value: 'good_posture', label: '姿勢を正す', category: '第一印象' },
  // 自己開示
  { value: 'self_disclose', label: '自分の弱みも話す', category: '自己開示' },
  { value: 'share_hobbies', label: '趣味を素直に語る', category: '自己開示' },
  { value: 'talk_future', label: '将来の話をする', category: '自己開示' },
  // マインド
  { value: 'no_quick_judge', label: '第一印象で判断を急がない', category: 'マインド' },
  { value: 'embrace_nervous', label: '緊張を受け入れる', category: 'マインド' },
  { value: 'enjoy', label: 'とにかく楽しむ', category: 'マインド' },
  // 行動
  { value: 'speak_first', label: '自分から話しかける', category: '行動' },
  { value: 'finish_strong', label: '最後まで完走する', category: '行動' },
];

export const INTENTION_TAG_LABEL: Record<IntentionTag, string> =
  INTENTION_TAGS.reduce((acc, t) => ({ ...acc, [t.value]: t.label }), {} as Record<IntentionTag, string>);

export const INTENTION_MIN_TAGS = 1;
export const INTENTION_MAX_TAGS = 3;

export interface EventIntention {
  event_token: string;
  tags: IntentionTag[];           // 1-3個
  free_note: string | null;       // 自由記述（任意）
  set_at: string | null;
  reviewed_at: string | null;     // 事後振り返り日時
  achieved_tags: IntentionTag[];  // 達成できたタグ（事後）
}

// イベント別の試み状態
export const DEMO_EVENT_INTENTIONS: Record<string, EventIntention> = {
  'vol5-pm': {
    event_token: 'vol5-pm',
    tags: ['listen_more', 'enjoy'],
    free_note: '相手の話に集中して、自分の話は3割に抑える',
    set_at: '2026-06-12T22:00:00+09:00',
    reviewed_at: null,
    achieved_tags: [],
  },
  'vol4': {
    event_token: 'vol4',
    tags: ['speak_first'],
    free_note: null,
    set_at: '2026-03-14T20:00:00+09:00',
    reviewed_at: '2026-03-15T22:00:00+09:00',
    achieved_tags: ['speak_first'],
  },
};

// ========== イベント中MID評価（会話直後サンクスプッシュ） ==========

export type MIDLikeReason =
  | 'looks_my_type'      // 見た目がタイプ
  | 'more_talk'          // もっと話してみたい
  | 'shared_values'      // 価値観が合いそう
  | 'nice_smile'         // 笑顔が素敵だった
  | 'comfortable'        // 落ち着く感じがした
  | 'no_reason';         // 特に理由はない

export type MIDPassReason =
  | 'looks_not_my_type'  // 見た目がタイプではなかった
  | 'no_chemistry'       // あまり話が合わなかった
  | 'values_mismatch'    // 価値観が合わなかった
  | 'too_nervous'        // 緊張して話せなかった
  | 'need_more_time'     // もう少し時間が欲しかった
  | 'economic_concern'   // 経済面で不安があった
  | 'lifestyle_mismatch' // 生活スタイルが合わなさそう
  | 'no_reason';         // 特に理由はない

export const MID_LIKE_REASONS: { value: MIDLikeReason; label: string }[] = [
  { value: 'looks_my_type', label: '見た目がタイプ' },
  { value: 'more_talk', label: 'もっと話してみたい' },
  { value: 'shared_values', label: '価値観が合いそう' },
  { value: 'nice_smile', label: '笑顔が素敵だった' },
  { value: 'comfortable', label: '落ち着く感じがした' },
  { value: 'no_reason', label: '特に理由はない' },
];

export const MID_PASS_REASONS: { value: MIDPassReason; label: string }[] = [
  { value: 'looks_not_my_type', label: '見た目がタイプではなかった' },
  { value: 'no_chemistry', label: 'あまり話が合わなかった' },
  { value: 'values_mismatch', label: '価値観が合わなかった' },
  { value: 'too_nervous', label: '緊張して話せなかった' },
  { value: 'need_more_time', label: 'もう少し時間が欲しかった' },
  { value: 'economic_concern', label: '経済面で不安があった' },
  { value: 'lifestyle_mismatch', label: '生活スタイルが合わなさそう' },
  { value: 'no_reason', label: '特に理由はない' },
];

// 見た目フィードバックタグ（魅力的 / 磨きどころ 共通）
export type LookTag =
  | 'smile'
  | 'hairstyle'
  | 'eyebrows'
  | 'cleanliness'
  | 'clothing_size'
  | 'clothing_color'
  | 'posture'
  | 'atmosphere';

// LookTag を PartnerCategory にマップ（指摘された箇所→おすすめ加盟店カテゴリ）
export const LOOK_TAG_TO_PARTNER_CATEGORY: Partial<Record<LookTag, PartnerCategory>> = {
  hairstyle: 'hair_salon',
  eyebrows: 'eyebrow',
  cleanliness: 'hair_removal',
  clothing_size: 'fashion',
  clothing_color: 'fashion',
  posture: 'bodymake',
};

export const LOOK_TAGS: { value: LookTag; label: string; partnerCategory?: string }[] = [
  { value: 'smile', label: '笑顔' },
  { value: 'hairstyle', label: '髪型', partnerCategory: '美容室' },
  { value: 'eyebrows', label: '眉毛', partnerCategory: '眉毛サロン' },
  { value: 'cleanliness', label: '清潔感', partnerCategory: '美容室・脱毛' },
  { value: 'clothing_size', label: '服装のサイズ感', partnerCategory: 'スタイリスト' },
  { value: 'clothing_color', label: '服装の色合い', partnerCategory: 'カラー診断' },
  { value: 'posture', label: '姿勢', partnerCategory: 'ジム・姿勢矯正' },
  { value: 'atmosphere', label: '雰囲気' },
];

export const LOOK_TAG_LABEL: Record<LookTag, string> =
  LOOK_TAGS.reduce((acc, t) => ({ ...acc, [t.value]: t.label }), {} as Record<LookTag, string>);

export const LOOK_FEEDBACK_MAX = 3; // 各リスト最大3つ選択

export interface LookFeedback {
  attractive: LookTag[];  // 魅力的なポイント
  improve: LookTag[];     // 磨きどころ
}

export interface MIDEvaluation {
  partner_id: string;
  appearance_score: number;     // 見た目 1-10
  talkability_score: number;    // 話しやすさ 1-10
  want_contact: boolean;        // 連絡先交換したい
  reasons: (MIDLikeReason | MIDPassReason)[]; // 複数選択可
  comfortable: boolean;         // 居心地が良かった（ハーバード成人発達研究）
  was_listened: boolean;        // 自分の話を聞いてもらえた（心理的安全性）
  not_judged: boolean;          // 否定・批判された感覚はなかった（心理的安全性）
  shared_topics: boolean;       // 共通の話題があった（親密性）
  look_feedback: LookFeedback | null; // 見た目詳細フィードバック（任意）
  impression_keyword: string | null; // 印象キーワード（任意）
  submitted_at: string;
}

// 通知表用：見た目詳細フィードバックの集計（自分が他参加者から受けた集計値）
export interface LookFeedbackAggregate {
  total_evaluators: number;
  attractive_counts: Partial<Record<LookTag, number>>;
  improve_counts: Partial<Record<LookTag, number>>;
}

export const DEMO_LOOK_FEEDBACK_AGGREGATE: LookFeedbackAggregate = {
  total_evaluators: 7,
  attractive_counts: {
    smile: 6,
    atmosphere: 4,
    cleanliness: 3,
    posture: 2,
  },
  improve_counts: {
    eyebrows: 5,
    clothing_size: 4,
    hairstyle: 3,
    clothing_color: 2,
  },
};

export interface EventConversation {
  turn: number;                 // 1〜7
  partner_id: string;
  scheduled_start: string;      // ISO
  duration_minutes: number;
  status: 'upcoming' | 'in_progress' | 'completed';
  evaluation: MIDEvaluation | null;
}

// Vol.5 第二部（午後）の会話スケジュール（demo-meの視点）
export const DEMO_EVENT_CONVERSATIONS: EventConversation[] = [
  {
    turn: 1,
    partner_id: 'demo-1',
    scheduled_start: '2026-06-13T14:30:00+09:00',
    duration_minutes: 7,
    status: 'completed',
    evaluation: {
      partner_id: 'demo-1',
      appearance_score: 8,
      talkability_score: 9,
      want_contact: true,
      reasons: ['more_talk', 'looks_my_type'],
      comfortable: true,
      was_listened: true,
      not_judged: true,
      shared_topics: true,
      look_feedback: {
        attractive: ['smile', 'atmosphere', 'cleanliness'],
        improve: ['hairstyle'],
      },
      impression_keyword: '自然体で素敵',
      submitted_at: '2026-06-13T14:38:00+09:00',
    },
  },
  {
    turn: 2,
    partner_id: 'demo-2',
    scheduled_start: '2026-06-13T14:38:00+09:00',
    duration_minutes: 7,
    status: 'completed',
    evaluation: {
      partner_id: 'demo-2',
      appearance_score: 7,
      talkability_score: 6,
      want_contact: false,
      reasons: ['looks_not_my_type'],
      comfortable: false,
      was_listened: true,
      not_judged: true,
      shared_topics: false,
      look_feedback: null,
      impression_keyword: null,
      submitted_at: '2026-06-13T14:46:00+09:00',
    },
  },
  {
    turn: 3,
    partner_id: 'demo-3',
    scheduled_start: '2026-06-13T14:46:00+09:00',
    duration_minutes: 7,
    status: 'in_progress', // 現在進行中（評価待ち）
    evaluation: null,
  },
  {
    turn: 4,
    partner_id: 'demo-4',
    scheduled_start: '2026-06-13T14:54:00+09:00',
    duration_minutes: 7,
    status: 'upcoming',
    evaluation: null,
  },
  {
    turn: 5,
    partner_id: 'demo-5',
    scheduled_start: '2026-06-13T15:02:00+09:00',
    duration_minutes: 7,
    status: 'upcoming',
    evaluation: null,
  },
  {
    turn: 6,
    partner_id: 'demo-6',
    scheduled_start: '2026-06-13T15:10:00+09:00',
    duration_minutes: 7,
    status: 'upcoming',
    evaluation: null,
  },
  {
    turn: 7,
    partner_id: 'demo-7',
    scheduled_start: '2026-06-13T15:18:00+09:00',
    duration_minutes: 7,
    status: 'upcoming',
    evaluation: null,
  },
];

// 両想い結果（当日終了後・demo-1とdemo-3が両想い）
export const DEMO_MUTUAL_MATCHES: string[] = ['demo-1', 'demo-3'];

// ========== スワイプ判断理由（MID 8項目仕様準拠） ==========

export type LikeReason =
  | 'first_impression'
  | 'values'
  | 'marriage_view'
  | 'hobbies'
  | 'personality'
  | 'bio'
  | 'mbti'
  | 'other';

export type PassReason =
  | 'photo'
  | 'age'
  | 'distance'
  | 'values'
  | 'marriage_view'
  | 'hobbies'
  | 'profile_thin'
  | 'other';

export const LIKE_REASONS: { value: LikeReason; label: string }[] = [
  { value: 'first_impression', label: '第一印象が良かった' },
  { value: 'values', label: '価値観が合いそう' },
  { value: 'marriage_view', label: '結婚観が一致' },
  { value: 'hobbies', label: '趣味が共通' },
  { value: 'personality', label: '性格が魅力的' },
  { value: 'bio', label: '自己紹介が刺さった' },
  { value: 'mbti', label: 'MBTI・タイプが合う' },
  { value: 'other', label: 'その他' },
];

export const PASS_REASONS: { value: PassReason; label: string }[] = [
  { value: 'photo', label: '写真の印象が合わない' },
  { value: 'age', label: '年齢が合わない' },
  { value: 'distance', label: '距離が遠い' },
  { value: 'values', label: '価値観が違う' },
  { value: 'marriage_view', label: '結婚観が違う' },
  { value: 'hobbies', label: '趣味が合わない' },
  { value: 'profile_thin', label: 'プロフィールが薄い' },
  { value: 'other', label: 'その他' },
];

// 1日のスワイプ上限
export const DAILY_SWIPE_LIMIT = 3;

// 自分のマッチ分析データ（モック）
export interface MatchAnalysis {
  weeksData: { weekLabel: string; sentLikes: number; receivedLikes: number; matched: number };
  // 自分が受けたパス理由（相手→自分）TOP
  receivedPassReasons: { reason: PassReason; count: number }[];
  // 自分が選んでも両想いになる率
  mutualRate: number; // 0..1
  // 改善のヒント
  improvementTips: { title: string; description: string; href?: string }[];
}

export const DEMO_MATCH_ANALYSIS: MatchAnalysis = {
  weeksData: {
    weekLabel: '今週',
    sentLikes: 7,
    receivedLikes: 4,
    matched: 1,
  },
  receivedPassReasons: [
    { reason: 'photo', count: 5 },
    { reason: 'profile_thin', count: 3 },
    { reason: 'distance', count: 2 },
  ],
  mutualRate: 0.14, // 14%
  improvementTips: [
    {
      title: '写真の印象を磨く',
      description: '相手の半数があなたの第一印象でパス。プロ撮影や加盟店利用で印象は確実に変わります。',
      href: '/akanuke',
    },
    {
      title: 'プロフィールの厚みを増やす',
      description: '結婚観・趣味・自由記述が薄いと「真剣度が伝わりにくい」と感じられます。',
      href: '/mypage/edit',
    },
    {
      title: '通知表で具体的な改善点を見る',
      description: '前回イベントで実際に受けた評価をもとに、何を変えれば良いかを確認できます。',
      href: '/tsuchihyo',
    },
  ],
};

export const CUSTOMER_REWARD_RATE = 0.05; // 5% → ¥10,000来店で¥500キャッシュバック

// QRコードのトークン（partner_idと1対1だが、本番では別IDで保護）
export const partnerQrToken = (partnerId: string) => `KOIFES-VISIT-${partnerId.toUpperCase()}`;
export const parsePartnerQr = (token: string): string | null => {
  const m = token.match(/^KOIFES-VISIT-([\w-]+)$/i);
  return m ? m[1].toLowerCase() : null;
};

// カテゴリ別のスコア改善寄与
export const VISIT_SCORE_UPLIFT: Record<PartnerCategory, { dimension: ScoreDimension; delta: number }[]> = {
  facial: [{ dimension: 'appearance', delta: 4 }],
  hair_removal: [{ dimension: 'appearance', delta: 3 }],
  hair_salon: [{ dimension: 'appearance', delta: 4 }],
  eyelash: [{ dimension: 'appearance', delta: 2 }],
  eyebrow: [{ dimension: 'appearance', delta: 2 }],
  fashion: [{ dimension: 'appearance', delta: 3 }],
  bodymake: [{ dimension: 'appearance', delta: 5 }, { dimension: 'gottman', delta: 2 }],
  communication: [{ dimension: 'talkability', delta: 4 }, { dimension: 'safety', delta: 2 }],
};

// モック：今月の来店記録
export const DEMO_VISITS: VisitRecord[] = [
  {
    id: 'v-001',
    partner_id: 'p-bii',
    user_id: 'demo-1',
    user_name: 'みお（27）',
    visited_at: '2026-04-12T11:30:00Z',
    reported_amount: 7900,
    commission_rate: 0.10,
    commission_yen: 790,
    score_dimension_uplift: [{ dimension: 'appearance', delta: 4 }],
  },
  {
    id: 'v-002',
    partner_id: 'p-bii',
    user_id: 'demo-3',
    user_name: 'ゆい（24）',
    visited_at: '2026-04-15T14:30:00Z',
    reported_amount: 10900,
    commission_rate: 0.10,
    commission_yen: 1090,
    score_dimension_uplift: [{ dimension: 'appearance', delta: 4 }],
  },
  {
    id: 'v-003',
    partner_id: 'p-bii',
    user_id: 'demo-5',
    user_name: 'あや（33）',
    visited_at: '2026-04-18T16:00:00Z',
    reported_amount: 7900,
    commission_rate: 0.10,
    commission_yen: 790,
    score_dimension_uplift: [{ dimension: 'appearance', delta: 4 }],
  },
  {
    id: 'v-004',
    partner_id: 'p-challengym',
    user_id: 'demo-me',
    user_name: 'あなた',
    visited_at: '2026-04-20T19:00:00Z',
    reported_amount: 40000,
    commission_rate: 0.10,
    commission_yen: 4000,
    score_dimension_uplift: [{ dimension: 'appearance', delta: 5 }, { dimension: 'gottman', delta: 2 }],
  },
  {
    id: 'v-005',
    partner_id: 'p-eyelash-1',
    user_id: 'demo-2',
    user_name: 'さくら（29）',
    visited_at: '2026-04-21T13:00:00Z',
    reported_amount: 5500,
    commission_rate: 0.10,
    commission_yen: 550,
    score_dimension_uplift: [{ dimension: 'appearance', delta: 2 }],
  },
  {
    id: 'v-006',
    partner_id: 'p-comm-1',
    user_id: 'demo-7',
    user_name: 'ことね（26）',
    visited_at: '2026-04-22T20:00:00Z',
    reported_amount: 9800,
    commission_rate: 0.10,
    commission_yen: 980,
    score_dimension_uplift: [{ dimension: 'talkability', delta: 4 }, { dimension: 'safety', delta: 2 }],
  },
  {
    id: 'v-007',
    partner_id: 'p-bii',
    user_id: 'demo-6',
    user_name: 'なな（28）',
    visited_at: '2026-04-25T11:00:00Z',
    reported_amount: 9900,
    commission_rate: 0.10,
    commission_yen: 990,
    score_dimension_uplift: [{ dimension: 'appearance', delta: 4 }],
  },
  {
    id: 'v-008',
    partner_id: 'p-hair-salon-1',
    user_id: 'demo-4',
    user_name: 'りん（30）',
    visited_at: '2026-04-26T15:00:00Z',
    reported_amount: 9800,
    commission_rate: 0.10,
    commission_yen: 980,
    score_dimension_uplift: [{ dimension: 'appearance', delta: 4 }],
  },
  {
    id: 'v-009',
    partner_id: 'p-fashion-1',
    user_id: 'demo-8',
    user_name: 'ひかり（30）',
    visited_at: '2026-04-27T13:00:00Z',
    reported_amount: 9800,
    commission_rate: 0.10,
    commission_yen: 980,
    score_dimension_uplift: [{ dimension: 'appearance', delta: 3 }],
  },
  {
    id: 'v-010',
    partner_id: 'p-bii',
    user_id: 'demo-7',
    user_name: 'ことね（26）',
    visited_at: '2026-04-28T17:00:00Z',
    reported_amount: 7900,
    commission_rate: 0.10,
    commission_yen: 790,
    score_dimension_uplift: [{ dimension: 'appearance', delta: 4 }],
  },
];

// 加盟店ごとの月次サマリー
export function partnerVisitsSummary(partnerId: string, monthYM?: string) {
  const ym = monthYM ?? new Date().toISOString().slice(0, 7);
  const visits = DEMO_VISITS.filter(
    (v) => v.partner_id === partnerId && v.visited_at.startsWith(ym)
  );
  const grossRevenue = visits.reduce((s, v) => s + v.reported_amount, 0);
  const commissionTotal = visits.reduce((s, v) => s + v.commission_yen, 0);
  return {
    visits,
    visitCount: visits.length,
    grossRevenue,
    commissionTotal,
  };
}

// 全加盟店の月次サマリー（admin用）
export function allPartnersVisitsSummary(monthYM?: string) {
  return DEMO_PARTNERS.map((p) => ({
    partner: p,
    ...partnerVisitsSummary(p.id, monthYM),
  })).sort((a, b) => b.commissionTotal - a.commissionTotal);
}

// ========== ABCパッケージ（個別相談ベース） ==========

export interface PackagePlan {
  id: 'A' | 'B' | 'C';
  name: string;
  duration: string;
  priceLabel: string; // 価格は前面に出さない表記
  forPeople: string;
  outcomes: string[];
  inclusions: string[];
}

export const DEMO_PACKAGES: PackagePlan[] = [
  {
    id: 'A',
    name: 'スターター',
    duration: '2ヶ月集中',
    priceLabel: '¥200,000〜',
    forPeople: '婚活が初めて／自分のタイプを知りたい方',
    outcomes: [
      '6タイプ診断＋通知表をもとに自分の現在地を言語化',
      '初対面で印象を底上げする3つの型を体得',
      '次回イベントまでに「気になる」が3倍に',
    ],
    inclusions: [
      '個別カウンセリング 月2回（オンライン）',
      '通知表 読み放題（月1回フィードバック）',
      '加盟店優待（フェイシャル＋脱毛セット）',
      'イベント参加権 1回分',
    ],
  },
  {
    id: 'B',
    name: 'スタンダード',
    duration: '3ヶ月集中',
    priceLabel: '¥400,000〜',
    forPeople: '結果にコミットしたい／本気で1年以内に決めたい方',
    outcomes: [
      '6タイプ別マッチング戦略を設計',
      '見た目／話し方／結婚観の3軸を統合改善',
      '3ヶ月で「両想い → 交際」までの再現可能なパターン化',
    ],
    inclusions: [
      '個別カウンセリング 月4回（オンライン+対面）',
      '通知表 読み放題＋月次レポート',
      '加盟店優待（全カテゴリー無料体験）',
      'イベント参加権 2回分＋優先席指定',
      'プロフィール写真・動画撮影（プロカメラマン）',
    ],
  },
  {
    id: 'C',
    name: 'プレミアム',
    duration: '4ヶ月集中',
    priceLabel: '¥600,000〜',
    forPeople: '結婚を前提に半年以内に決断したい方',
    outcomes: [
      '婚活戦略の完全パーソナライズ',
      '個別マッチング（紹介＆お見合いセッティング）',
      '4ヶ月でパートナー候補を確実に見つける',
    ],
    inclusions: [
      '個別カウンセリング 月8回（対面メイン）',
      '通知表 読み放題＋週次フィードバック',
      '加盟店優待＋同行コーディネート',
      'イベント参加権 3回分＋VIP席',
      'プロフィール撮影＋動画自己紹介編集',
      '個別お見合いセッティング 月2件',
      'パートナー（成婚相手）への結婚式・住居サポート',
    ],
  },
];

export interface CoachingTestimonial {
  id: string;
  pseudonym: string;
  age: number;
  occupation: string;
  package: 'A' | 'B' | 'C';
  result: string;
  quote: string;
}

export const DEMO_COACHING_TESTIMONIALS: CoachingTestimonial[] = [
  {
    id: 't-1',
    pseudonym: 'T.K. さん',
    age: 31,
    occupation: '会社員',
    package: 'B',
    result: '3ヶ月で交際スタート → 6ヶ月で婚約',
    quote:
      '通知表で「話しやすさ」が低いと気づいてから、対話の練習だけで両想い率が4倍になりました。コーチがいると本気度が変わります。',
  },
  {
    id: 't-2',
    pseudonym: 'M.N. さん',
    age: 29,
    occupation: '看護師',
    package: 'A',
    result: '2ヶ月で「気になる」が3名→11名',
    quote:
      'プロフィール写真を撮り直しただけで反応が変わって驚きました。自分の見た目を客観視できる仕組みがあって良かった。',
  },
  {
    id: 't-3',
    pseudonym: 'S.Y. さん',
    age: 34,
    occupation: 'IT企画',
    package: 'C',
    result: '4ヶ月で婚約',
    quote:
      '結婚相談所も並行してたけど、こっちは「変わるための仕組み」があった。点数で進歩が見えるから続けられました。',
  },
];
