'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#fafafa' }}>
          <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.4em', color: '#999', textTransform: 'uppercase', marginBottom: '8px' }}>Critical Error</p>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>システムエラー</h1>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>
              アプリケーションで重大なエラーが発生しました。
            </p>
            {error.digest && (
              <p style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace', marginBottom: '24px' }}>
                ID: {error.digest}
              </p>
            )}
            <button
              onClick={() => reset()}
              style={{ background: '#111', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer' }}
            >
              再読み込み
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
