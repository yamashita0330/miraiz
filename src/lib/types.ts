import type { HopeType } from './constants';

export type Gender = 'male' | 'female';
export type Smoking = 'no' | 'sometimes' | 'yes';
export type Drinking = 'no' | 'sometimes' | 'yes';
export type BodyType = 'slim' | 'standard' | 'athletic' | 'glamorous' | 'plus';
export type BloodType = 'A' | 'B' | 'O' | 'AB';
export type HolidayType = 'weekend' | 'weekday' | 'shift' | 'irregular';
export type WantChildren = 'yes' | 'maybe' | 'no' | 'decline';
export type WorkAfterMarriage = 'dual' | 'full' | 'undecided' | 'flexible';
export type LivingArrangement = 'separate' | 'with_parents' | 'undecided';
export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type DateFrequency = 'weekly' | 'biweekly' | 'monthly' | 'flexible';
export type ContactFrequency = 'multiple_daily' | 'daily' | 'few_per_week' | 'weekly' | 'flexible';
export type HouseholdDivision = 'equal' | 'good_at' | 'depends' | 'undecided';
export type TransferPossibility = 'no' | 'maybe' | 'yes';
export type WeddingStyle = 'large' | 'medium' | 'small' | 'family_only' | 'none' | 'undecided';
export type HousingPreference = 'owned' | 'rent' | 'undecided';
export type MoneyStyle = 'saver' | 'balanced' | 'spender' | 'undecided';
export type WeekendStyle = 'outdoor' | 'indoor' | 'mixed';
export type ReligionStatus = 'none' | 'has' | 'decline';

export interface UserProfile {
  id: string;
  email: string | null;
  name: string;
  gender: Gender;
  birthdate: string;
  age: number;
  prefecture: string;
  bio: string;
  photo_url: string | null;
  hope_type: HopeType;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;

  // 詳細プロフィール（個人）
  occupation?: string;
  education?: string;
  income?: string;
  height?: number;
  smoking?: Smoking;
  drinking?: Drinking;
  hobbies?: string[];
  photos?: string[];
  video_intro_url?: string | null;

  // 拡張：個人属性
  hometown?: string;
  body_type?: BodyType;
  blood_type?: BloodType;
  siblings?: string;
  holiday_type?: HolidayType;
  languages?: string[];
  pets?: string;

  // 拡張：結婚観
  marriage_intent?: 1 | 2 | 3 | 4 | 5;
  want_children?: WantChildren;
  work_after_marriage?: WorkAfterMarriage;
  living_arrangement?: LivingArrangement;

  // 拡張：パーソナリティ
  mbti?: MBTIType;
  personality_tags?: string[];

  // 拡張：結婚生活プラン
  date_frequency?: DateFrequency;
  contact_frequency?: ContactFrequency;
  household_division?: HouseholdDivision;
  transfer_possibility?: TransferPossibility;
  wedding_style?: WeddingStyle;
  housing_preference?: HousingPreference;
  money_style?: MoneyStyle;
  weekend_style?: WeekendStyle;
  religion?: ReligionStatus;
  marriage_dream?: string;        // 自由記述：理想の結婚生活
  must_have?: string;             // 自由記述：譲れない条件

  // 拡張: 自己紹介を深める質問
  first_date_locations?: string[];      // 初デートに行きたい場所（複数選択可）
  first_date_note?: string;             // 初デート補足（自由記述）
  spend_categories?: string[];          // 何にお金を使っているか（複数選択可）
  spend_note?: string;                  // お金の使い道 補足（自由記述）
  hobby_details?: Record<string, string>; // 趣味カテゴリ → 詳細（例: お笑い鑑賞 → "ナインティナイン、マヂカルラブリー"）
}

export interface ChatMessage {
  id: string;
  thread_id: string;
  from_user_id: string;
  text: string;
  sent_at: string;
  read_at: string | null;
}

export interface ChatThread {
  id: string;
  participants: string[];
  last_message_at: string;
  unread_count: number;
  /** 両者支払い済 = チャット無制限解放 */
  unlocked: boolean;
}

export interface EventRow {
  id: string;
  name: string;
  event_date: string;
  qr_token: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  from_user_id: string;
  to_user_id: string;
  created_at: string;
}

export type ReportReason =
  | 'married'
  | 'commercial'
  | 'fake'
  | 'inappropriate'
  | 'other';

export interface Report {
  id: string;
  from_user_id: string;
  to_user_id: string;
  reason: ReportReason;
  detail?: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  created_at: string;
}

export interface MagazineArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  cover: string;
  body: string;
}
