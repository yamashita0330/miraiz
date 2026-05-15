interface RadarChartProps {
  axes: { key: string; label: string }[];
  series: { name: string; values: number[]; color: 'foreground' | 'muted' }[];
  size?: number;
  max?: number;
}

export function RadarChart({ axes, series, size = 280, max = 100 }: RadarChartProps) {
  const center = size / 2;
  const radius = size / 2 - 36;
  const n = axes.length;
  const angleStep = (Math.PI * 2) / n;

  const point = (axisIndex: number, value: number) => {
    const angle = -Math.PI / 2 + axisIndex * angleStep;
    const r = (value / max) * radius;
    return [center + Math.cos(angle) * r, center + Math.sin(angle) * r] as const;
  };

  const polygonPoints = (values: number[]) =>
    values.map((v, i) => point(i, v).join(',')).join(' ');

  // グリッド（25, 50, 75, 100）
  const gridLevels = [25, 50, 75, 100];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      role="img"
      aria-label="6項目のスコアレーダーチャート"
      className="select-none"
    >
      {/* 同心多角形グリッド */}
      {gridLevels.map((level) => {
        const pts = axes.map((_, i) => point(i, level).join(',')).join(' ');
        return (
          <polygon
            key={level}
            points={pts}
            fill="none"
            className="stroke-border"
            strokeWidth={0.6}
          />
        );
      })}

      {/* 軸線 */}
      {axes.map((_, i) => {
        const [x, y] = point(i, max);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            className="stroke-border"
            strokeWidth={0.4}
          />
        );
      })}

      {/* シリーズ（後から描いたものが上） */}
      {series.map((s) => {
        const fill = s.color === 'foreground'
          ? 'hsl(var(--foreground) / 0.18)'
          : 'hsl(var(--muted-foreground) / 0.10)';
        const stroke = s.color === 'foreground'
          ? 'hsl(var(--foreground))'
          : 'hsl(var(--muted-foreground))';
        const strokeWidth = s.color === 'foreground' ? 1.6 : 0.8;
        const dash = s.color === 'foreground' ? undefined : '3,3';
        return (
          <g key={s.name}>
            <polygon
              points={polygonPoints(s.values)}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={dash}
              strokeLinejoin="round"
            />
            {s.color === 'foreground' &&
              s.values.map((v, i) => {
                const [x, y] = point(i, v);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={3}
                    fill="hsl(var(--foreground))"
                  />
                );
              })}
          </g>
        );
      })}

      {/* ラベル */}
      {axes.map((axis, i) => {
        const [x, y] = point(i, max + 14);
        const isTop = i === 0;
        const isBottom = i === Math.floor(n / 2);
        return (
          <text
            key={axis.key}
            x={x}
            y={y + (isTop ? 0 : isBottom ? 4 : 0)}
            fontSize={10}
            textAnchor="middle"
            dominantBaseline={isTop ? 'alphabetic' : isBottom ? 'hanging' : 'middle'}
            className="fill-muted-foreground"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}
