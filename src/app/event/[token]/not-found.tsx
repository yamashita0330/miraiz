import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">イベントが見つかりません</h1>
        <p className="text-text-mid mb-6">QRコードをもう一度お試しください</p>
        <Link href="/" className="text-pink font-bold underline">トップへ</Link>
      </div>
    </main>
  );
}
