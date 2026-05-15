'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

interface Props {
  url: string;
  eventName: string;
}

export function QRDisplay({ url, eventName }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = wrapRef.current?.querySelector('canvas');
    if (!canvas) return;
    const pngUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = `koifes_qr_${eventName.replace(/\s/g, '_')}.png`;
    a.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={wrapRef} className="bg-white p-4 border-2 border-base-gray rounded-xl">
        <QRCodeCanvas value={url} size={200} level="M" includeMargin />
      </div>
      <button
        onClick={handleDownload}
        className="mt-3 text-sm text-pink font-bold underline"
        aria-label="QRコードをダウンロード"
      >
        PNGダウンロード
      </button>
    </div>
  );
}
