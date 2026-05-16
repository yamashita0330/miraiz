// ============= 人型ビジュアル（マネキンアウトライン全身） =============
// 連続した1本のアウトラインで全身を描き、各ゾーンを薄い色で塗り分ける
// 通知表（/tsuchihyo）と加盟店おすすめ（/partners）で共用

export type BodyPartStatus = 'attractive' | 'improve' | 'neutral';

export function BodyDiagram({ partStatus }: { partStatus: Record<string, BodyPartStatus> }) {
  const colorFor = (status: BodyPartStatus | undefined) => {
    if (status === 'attractive') return '#22c55e';
    if (status === 'improve') return '#f43f5e';
    return 'currentColor';
  };
  const opacityFor = (status: BodyPartStatus | undefined) => {
    if (status === 'neutral' || !status) return 0.15;
    return 0.7;
  };

  // 全身アウトライン1本（時計回り：頭頂→右側→足→左側→頭頂）
  const bodyOutline =
    'M 160 30 ' +
    'C 184 30, 200 50, 200 75 ' +
    'C 200 90, 192 100, 184 106 ' +
    'C 184 114, 184 118, 184 124 ' +
    'C 198 126, 215 134, 222 150 ' +
    'L 232 230 ' +
    'C 234 245, 230 252, 220 254 ' +
    'C 212 254, 208 248, 208 240 ' +
    'L 200 150 ' +
    'L 196 250 ' +
    'L 192 410 ' +
    'C 195 422, 195 426, 188 428 ' +
    'L 170 428 ' +
    'C 165 428, 162 425, 162 420 ' +
    'L 162 270 ' +
    'L 158 270 ' +
    'L 158 420 ' +
    'C 158 425, 155 428, 150 428 ' +
    'L 132 428 ' +
    'C 125 426, 125 422, 128 410 ' +
    'L 124 250 ' +
    'L 120 150 ' +
    'L 112 240 ' +
    'C 112 248, 108 254, 100 254 ' +
    'C 90 252, 86 245, 88 230 ' +
    'L 98 150 ' +
    'C 105 134, 122 126, 136 124 ' +
    'C 136 118, 136 114, 136 106 ' +
    'C 128 100, 120 90, 120 75 ' +
    'C 120 50, 136 30, 160 30 Z';

  return (
    <svg viewBox="0 0 320 460" className="w-full text-muted-foreground" role="img" aria-label="印象マップ">
      <defs>
        <filter id="aura-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <clipPath id="body-clip">
          <path d={bodyOutline} />
        </clipPath>
      </defs>

      {/* 雰囲気（外周点線） */}
      <ellipse
        cx="160"
        cy="240"
        rx="140"
        ry="215"
        fill="none"
        stroke={colorFor(partStatus.atmosphere)}
        strokeOpacity={opacityFor(partStatus.atmosphere) * 0.6}
        strokeWidth="2"
        strokeDasharray="3 5"
      />

      {/* 清潔感（全身ぼかしオーラ） */}
      {partStatus.cleanliness && partStatus.cleanliness !== 'neutral' && (
        <path
          d={bodyOutline}
          fill={colorFor(partStatus.cleanliness)}
          fillOpacity={0.18}
          filter="url(#aura-soft)"
        />
      )}

      {/* ==== ゾーンハイライト（人型の中だけに着色） ==== */}
      <g clipPath="url(#body-clip)">
        <ellipse
          cx="160"
          cy="55"
          rx="50"
          ry="32"
          fill={colorFor(partStatus.hairstyle)}
          fillOpacity={opacityFor(partStatus.hairstyle) * 0.6}
        />
        <rect
          x="80"
          y="120"
          width="80"
          height="120"
          fill={colorFor(partStatus.clothing_color)}
          fillOpacity={opacityFor(partStatus.clothing_color) * 0.55}
        />
        <rect
          x="160"
          y="120"
          width="80"
          height="120"
          fill={colorFor(partStatus.clothing_size)}
          fillOpacity={opacityFor(partStatus.clothing_size) * 0.55}
        />
      </g>

      {/* 顔の中（眉・笑顔の小マーク） */}
      <line
        x1="148"
        y1="68"
        x2="155"
        y2="68"
        stroke={colorFor(partStatus.eyebrows)}
        strokeOpacity={opacityFor(partStatus.eyebrows) * 1.4}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="165"
        y1="68"
        x2="172"
        y2="68"
        stroke={colorFor(partStatus.eyebrows)}
        strokeOpacity={opacityFor(partStatus.eyebrows) * 1.4}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 152 82 Q 160 88 168 82"
        stroke={colorFor(partStatus.smile)}
        strokeOpacity={opacityFor(partStatus.smile) * 1.4}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 姿勢：背骨ライン */}
      <line
        x1="160"
        y1="115"
        x2="160"
        y2="420"
        stroke={colorFor(partStatus.posture)}
        strokeOpacity={opacityFor(partStatus.posture) * 1.4}
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* 人型のアウトライン */}
      <path
        d={bodyOutline}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* ラベル（引き出し線） */}
      <BodyLabel x1={200} y1={45} x2={264} y2={45} label="髪型" status={partStatus.hairstyle} />
      <BodyLabel x1={120} y1={68} x2={56} y2={62} label="眉毛" status={partStatus.eyebrows} alignRight />
      <BodyLabel x1={200} y1={82} x2={264} y2={88} label="笑顔" status={partStatus.smile} />
      <BodyLabel x1={120} y1={106} x2={56} y2={120} label="清潔感" status={partStatus.cleanliness} alignRight />
      <BodyLabel x1={120} y1={170} x2={56} y2={170} label="服の色" status={partStatus.clothing_color} alignRight />
      <BodyLabel x1={200} y1={170} x2={264} y2={170} label="服のサイズ" status={partStatus.clothing_size} />
      <BodyLabel x1={196} y1={320} x2={264} y2={320} label="姿勢" status={partStatus.posture} />
      <BodyLabel x1={120} y1={320} x2={56} y2={320} label="雰囲気" status={partStatus.atmosphere} alignRight />
    </svg>
  );
}

function BodyLabel({
  x1,
  y1,
  x2,
  y2,
  label,
  status,
  alignRight = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  status: BodyPartStatus | undefined;
  alignRight?: boolean;
}) {
  const color =
    status === 'attractive'
      ? '#22c55e'
      : status === 'improve'
      ? '#f43f5e'
      : 'currentColor';
  const opacity = !status || status === 'neutral' ? 0.4 : 1;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeOpacity={opacity * 0.6} strokeWidth="0.8" />
      <circle cx={x1} cy={y1} r="3" fill={color} fillOpacity={opacity} />
      <text
        x={alignRight ? x2 - 4 : x2 + 4}
        y={y2}
        fontSize="11"
        fontWeight="600"
        fill={color}
        fillOpacity={opacity}
        textAnchor={alignRight ? 'end' : 'start'}
        dominantBaseline="middle"
      >
        {label}
      </text>
    </g>
  );
}
