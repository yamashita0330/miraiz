'use client';

import { useEffect, useRef, useState } from 'react';
import { Video, X, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const MAX_BYTES = 60 * 1024 * 1024; // 60MB
const MAX_DURATION_SEC = 60;

interface Props {
  initialUrl?: string | null;
  onChange?: (file: File | null, previewUrl: string | null) => void;
  className?: string;
}

export function VideoUpload({ initialUrl, onChange, className }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl ?? null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFile = async (file: File) => {
    setError('');
    if (!file.type.startsWith('video/')) {
      setError('動画ファイルを選択してください');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('60MB以下のファイルを選んでください');
      return;
    }

    setUploading(true);

    const url = URL.createObjectURL(file);

    // 動画の長さチェック
    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.src = url;
    await new Promise<void>((resolve) => {
      tempVideo.onloadedmetadata = () => resolve();
      tempVideo.onerror = () => resolve();
    });
    const dur = isFinite(tempVideo.duration) ? tempVideo.duration : 0;

    if (dur > MAX_DURATION_SEC) {
      URL.revokeObjectURL(url);
      setError(`${MAX_DURATION_SEC}秒以内の動画にしてください（現在 ${Math.round(dur)}秒）`);
      setUploading(false);
      return;
    }

    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);

    setPreviewUrl(url);
    setDuration(dur);
    setSize(file.size);
    setUploading(false);
    onChange?.(file, url);
  };

  const handleRemove = () => {
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setDuration(null);
    setSize(null);
    setError('');
    onChange?.(null, null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const onPick = () => inputRef.current?.click();
  const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  const formatDuration = (sec: number) => `${Math.round(sec)} 秒`;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Label>動画自己紹介（任意・最大60秒）</Label>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {previewUrl ? (
        <div className="flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-black">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={previewUrl}
              controls
              playsInline
              className="aspect-video w-full bg-black object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-background"
              aria-label="動画を削除"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              {duration !== null && <span>{formatDuration(duration)}</span>}
              {size !== null && <span>· {formatSize(size)}</span>}
            </div>
            <button
              type="button"
              onClick={onPick}
              className="font-medium underline-offset-4 hover:underline"
            >
              差し替える
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onPick}
          disabled={uploading}
          className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-12 text-center transition-colors hover:bg-muted/30 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium">読み込み中…</p>
            </>
          ) : (
            <>
              <Video className="h-8 w-8 text-muted-foreground" strokeWidth={1.4} aria-hidden />
              <p className="text-sm font-medium">動画を選択</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                MP4 / MOV / WebM・60秒以内・60MBまで
              </p>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="rounded-lg border border-border bg-muted px-3 py-2 text-xs">
          {error}
        </p>
      )}

      <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
          <Upload className="h-3 w-3" aria-hidden />
          動画自己紹介のコツ
        </span>
        <ul className="mt-2 space-y-1">
          <li>— 明るい場所で正面を向いて</li>
          <li>— 「ニックネーム＋今ハマっていること」を一言</li>
          <li>— 笑顔で15〜30秒が反応率◎</li>
        </ul>
      </div>
    </div>
  );
}
