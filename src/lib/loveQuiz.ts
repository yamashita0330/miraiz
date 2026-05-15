import type { HopeType } from './constants';

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; weights: Partial<Record<HopeType, number>> }[];
}

export const LOVE_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: '初対面の人と話すとき、最も気になるのは？',
    options: [
      { label: '相手の職業や経歴', weights: { hispec: 3, family: 1 } },
      { label: '価値観や考え方', weights: { value: 3, growth: 1 } },
      { label: '一緒にいて落ち着けるかどうか', weights: { comfort: 3, family: 1 } },
      { label: '会話のテンポや笑いのツボ', weights: { active: 3, comfort: 1 } },
    ],
  },
  {
    id: 'q2',
    question: '理想のデートはどっち？',
    options: [
      { label: '高級レストランで特別な時間', weights: { hispec: 3, family: 1 } },
      { label: 'カフェでお互いをじっくり知る会話', weights: { value: 3, comfort: 2 } },
      { label: '家でまったり映画', weights: { comfort: 3 } },
      { label: 'アクティビティで一緒に楽しむ', weights: { active: 3, growth: 1 } },
    ],
  },
  {
    id: 'q3',
    question: '結婚相手に最も求めるものは？',
    options: [
      { label: '安定した経済力', weights: { hispec: 3, family: 2 } },
      { label: '深い精神的なつながり', weights: { value: 3 } },
      { label: '無理なく一緒にいられること', weights: { comfort: 3 } },
      { label: '一緒に成長していけること', weights: { growth: 3, active: 1 } },
    ],
  },
  {
    id: 'q4',
    question: '休日は2人でどう過ごしたい？',
    options: [
      { label: '少し贅沢なお店巡り', weights: { hispec: 2, comfort: 1 } },
      { label: '美術館やイベントで知的刺激', weights: { value: 2, growth: 2 } },
      { label: '家で何もせずダラダラ', weights: { comfort: 3 } },
      { label: 'アウトドアやスポーツ', weights: { active: 3 } },
    ],
  },
  {
    id: 'q5',
    question: 'パートナーと意見が違ったとき、どうする？',
    options: [
      { label: 'お互いの立場を冷静に分析', weights: { value: 2, growth: 2 } },
      { label: '感情的にならず妥協点を探る', weights: { comfort: 3, family: 1 } },
      { label: '思いっきり議論してスッキリ', weights: { active: 2, growth: 2 } },
      { label: '時間を置いて落ち着くのを待つ', weights: { comfort: 2, family: 1 } },
    ],
  },
  {
    id: 'q6',
    question: 'パートナーから受けたい愛情表現は？',
    options: [
      { label: '記念日にサプライズや贈り物', weights: { hispec: 2, family: 2 } },
      { label: '深い会話と理解', weights: { value: 3 } },
      { label: '日々の小さな気遣いや言葉', weights: { comfort: 3, family: 1 } },
      { label: '一緒に新しいことに挑戦', weights: { active: 2, growth: 2 } },
    ],
  },
  {
    id: 'q7',
    question: '将来の家族像で最も大切なものは？',
    options: [
      { label: '安定した暮らしと教育', weights: { family: 3, hispec: 1 } },
      { label: 'お互い尊重し合える関係', weights: { value: 3, comfort: 1 } },
      { label: '笑顔の絶えない温かい家', weights: { comfort: 2, family: 2 } },
      { label: 'お互い成長し続ける関係', weights: { growth: 3 } },
    ],
  },
  {
    id: 'q8',
    question: '自分の長所として近いのは？',
    options: [
      { label: '責任感と計画性', weights: { hispec: 2, family: 2 } },
      { label: '聞き上手で共感力がある', weights: { value: 2, comfort: 2 } },
      { label: '人を癒す穏やかさ', weights: { comfort: 3 } },
      { label: '行動力とエネルギー', weights: { active: 3, growth: 1 } },
    ],
  },
  {
    id: 'q9',
    question: 'パートナーの「これは絶対NG」は？',
    options: [
      { label: '経済観念が緩い', weights: { hispec: 3, family: 1 } },
      { label: '価値観の対話を避ける', weights: { value: 3 } },
      { label: '一緒にいて気を使う', weights: { comfort: 3 } },
      { label: '何にも興味を示さない', weights: { active: 2, growth: 2 } },
    ],
  },
  {
    id: 'q10',
    question: '5年後の自分と相手の関係は？',
    options: [
      { label: '安定した家庭を築いている', weights: { family: 3, hispec: 1 } },
      { label: 'お互いを深く理解できている', weights: { value: 3, comfort: 1 } },
      { label: '無理なく自然体でいられる', weights: { comfort: 3 } },
      { label: '一緒に何かを成し遂げている', weights: { active: 2, growth: 3 } },
    ],
  },
  {
    id: 'q11',
    question: 'お金の使い方で最も近いのは？',
    options: [
      { label: '将来のために計画的に貯金', weights: { hispec: 2, family: 2 } },
      { label: '自分・相手の成長への投資優先', weights: { growth: 3, value: 1 } },
      { label: '無理なく心地よく使う', weights: { comfort: 3 } },
      { label: '体験や思い出に惜しまず使う', weights: { active: 3 } },
    ],
  },
  {
    id: 'q12',
    question: '理想の結婚生活は？',
    options: [
      { label: '生活が豊かで安定している', weights: { hispec: 2, family: 2 } },
      { label: '対話があり成長を感じる', weights: { value: 2, growth: 2 } },
      { label: '穏やかで温かい毎日', weights: { comfort: 3, family: 1 } },
      { label: '刺激的で飽きない毎日', weights: { active: 3 } },
    ],
  },
];

export interface QuizResult {
  primary: HopeType;
  secondary: HopeType;
  scores: Record<HopeType, number>;
  description: string;
  matchHints: string;
}

const TYPE_DESCRIPTIONS: Record<HopeType, { description: string; matchHints: string }> = {
  hispec: {
    description:
      'パートナーに安定や経済力を求めるタイプ。計画性があり、将来を見据えた選択を大切にします。条件と感情のバランスを意識すると関係が深まります。',
    matchHints: '相性が良いのは「家族・安定」「価値観共有」タイプ。条件で測るだけでなく相手の人柄も見るとマッチングの幅が広がります。',
  },
  value: {
    description:
      '価値観や対話を重視するタイプ。深い精神的なつながりがあって初めて安心できます。表面的な条件より、相手の考え方や哲学に共鳴することを大切にします。',
    matchHints: '相性が良いのは「成長志向」「居心地・安心」タイプ。話が深まる相手を選ぶと長続きします。',
  },
  comfort: {
    description:
      '一緒にいて自然体でいられることを最も大切にするタイプ。穏やかで安心できる関係を育てるのが得意。激しさより継続性を選びます。',
    matchHints: '相性が良いのは「価値観共有」「家族・安定」タイプ。一緒にいて疲れない人を選ぶことが正解。',
  },
  active: {
    description:
      '一緒に体験を共有することで関係を育てるタイプ。アクティブで好奇心旺盛、新しいことへの挑戦を一緒に楽しめる相手と相性が良いです。',
    matchHints: '相性が良いのは「成長志向」「居心地・安心」タイプ。同じ趣味や挑戦したいことを一緒にできる相手を選びましょう。',
  },
  family: {
    description:
      '結婚や家族を真剣に考えるタイプ。安定と継続を重視し、将来像が明確。子供や家族との時間を大切にできる相手を求めます。',
    matchHints: '相性が良いのは「居心地・安心」「ハイスペ志向」タイプ。結婚意欲が同じレベルの相手を選びましょう。',
  },
  growth: {
    description:
      'お互いに高め合える関係を求めるタイプ。一緒に学び、挑戦し、変化していくことを楽しめます。停滞より進化を選びます。',
    matchHints: '相性が良いのは「価値観共有」「アクティブ刺激」タイプ。同じ目標やビジョンを語り合える相手を選びましょう。',
  },
};

export function calculateQuizResult(answers: Record<string, number>): QuizResult {
  const scores: Record<HopeType, number> = {
    hispec: 0, value: 0, comfort: 0, active: 0, family: 0, growth: 0,
  };

  Object.entries(answers).forEach(([qid, optIdx]) => {
    const q = LOVE_QUIZ.find((q) => q.id === qid);
    if (!q) return;
    const option = q.options[optIdx];
    if (!option) return;
    Object.entries(option.weights).forEach(([type, w]) => {
      scores[type as HopeType] = (scores[type as HopeType] ?? 0) + (w ?? 0);
    });
  });

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t as HopeType);

  const primary = sorted[0];
  const secondary = sorted[1];
  const desc = TYPE_DESCRIPTIONS[primary];

  return {
    primary,
    secondary,
    scores,
    description: desc.description,
    matchHints: desc.matchHints,
  };
}
