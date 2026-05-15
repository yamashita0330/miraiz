/**
 * CSV エクスポートユーティリティ
 * BOM 付き UTF-8 で Excel 互換、改行・カンマ・ダブルクォート escape 対応
 */

type CsvRow = Record<string, string | number | boolean | null | undefined>;

const escape = (val: unknown): string => {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (/[",\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
};

export function toCsv<T extends CsvRow>(rows: T[], columns?: { key: keyof T; label: string }[]): string {
  if (rows.length === 0) return '';
  const cols = columns ?? Object.keys(rows[0]).map((k) => ({ key: k as keyof T, label: k }));
  const header = cols.map((c) => escape(c.label)).join(',');
  const body = rows.map((r) => cols.map((c) => escape(r[c.key])).join(',')).join('\r\n');
  return header + '\r\n' + body;
}

export function downloadCsv(filename: string, csv: string): void {
  if (typeof window === 'undefined') return;
  // BOM 付きで Excel 文字化け回避
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportRowsAsCsv<T extends CsvRow>(
  filename: string,
  rows: T[],
  columns?: { key: keyof T; label: string }[],
): void {
  downloadCsv(filename, toCsv(rows, columns));
}

export function todayStamp(): string {
  const d = new Date();
  return `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`;
}
