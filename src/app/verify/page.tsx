'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Check, FileText, Wallet, HeartHandshake, ArrowRight, Upload, Camera, X, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEMO_USER_STATE, VERIFICATION_DEFS, type VerificationKey } from '@/lib/demo';

const ICONS: Record<VerificationKey, typeof ShieldCheck> = {
  identity: Lock,
  single: HeartHandshake,
  income: Wallet,
};

const DOC_TYPES = [
  { value: 'driver_license', label: '運転免許証' },
  { value: 'my_number', label: 'マイナンバーカード（顔写真側）' },
  { value: 'passport', label: 'パスポート' },
] as const;

type DocType = (typeof DOC_TYPES)[number]['value'];
type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export default function VerifyPage() {
  const verifications = DEMO_USER_STATE.verifications;
  const [activeKey, setActiveKey] = useState<VerificationKey | null>(null);

  const completedCount = Object.values(verifications).filter((v) => v.status === 'verified').length;
  const totalCount = VERIFICATION_DEFS.length;
  const completionPct = Math.round((completedCount / totalCount) * 100);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Verification
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              本人確認
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              身分証1枚で「本人確認」と「20歳以上の年齢確認」を同時に行います。<br />
              インターネット異性紹介事業届出に基づく必須認証です。
            </p>
          </header>

          {/* 進捗サマリー */}
          <section className="mt-10 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                認証達成度
              </span>
              <span className="font-mont text-2xl font-medium">
                {completedCount}<span className="ml-1 text-sm text-muted-foreground">/ {totalCount}</span>
              </span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-success transition-all"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
              本人確認は必須。独身証明・年収証明はプレミアム会員向けの任意認証です。
            </p>
          </section>

          {/* 認証一覧 */}
          <section className="mt-10 flex flex-col gap-4">
            {VERIFICATION_DEFS.map((def) => {
              const state = verifications[def.key];
              const Icon = ICONS[def.key];
              return (
                <article
                  key={def.key}
                  className={cn(
                    'rounded-2xl border bg-card overflow-hidden',
                    state.status === 'verified' && 'border-success'
                  )}
                >
                  <div className="flex items-start gap-4 p-6">
                    <div
                      className={cn(
                        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                        state.status === 'verified'
                          ? 'bg-success text-success-foreground'
                          : state.status === 'pending'
                          ? 'bg-warn text-warn-foreground'
                          : 'border border-border bg-muted text-muted-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h3 className="text-base font-semibold">{def.label}</h3>
                        {def.required && (
                          <Badge variant="outline" className="text-[9px]">必須</Badge>
                        )}
                        {def.premium && (
                          <Badge variant="goldSoft" className="text-[9px]">プレミアム</Badge>
                        )}
                        <StatusBadge status={state.status} />
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {def.description}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {def.documents.map((doc) => (
                          <Badge key={doc} variant="soft" className="text-[9px]">
                            <FileText className="mr-1 h-2.5 w-2.5" aria-hidden />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                      {state.verifiedAt && (
                        <p className="text-[10px] text-success">
                          ✓ {state.verifiedAt} に承認済み
                        </p>
                      )}
                    </div>
                  </div>

                  {state.status !== 'verified' && (
                    <div className="border-t border-border bg-muted/30 px-6 py-4">
                      <Button
                        size="sm"
                        variant={state.status === 'pending' ? 'outline' : 'default'}
                        className="gap-2"
                        onClick={() => state.status !== 'pending' && setActiveKey(def.key)}
                      >
                        {state.status === 'pending' ? (
                          <>確認中（残り 1〜2日）</>
                        ) : (
                          <>提出する <ArrowRight className="h-3 w-3" aria-hidden /></>
                        )}
                      </Button>
                    </div>
                  )}

                  {state.status === 'verified' && def.key === 'identity' && (
                    <div className="border-t border-border bg-muted/30 px-6 py-3">
                      <button
                        onClick={() => setActiveKey(def.key)}
                        className="text-[11px] text-rose hover:underline"
                      >
                        書類を再提出する →
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </section>

          {/* 法的情報への動線 */}
          <Link
            href="/legal"
            className="mt-10 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:border-foreground/30"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">運営の法的情報・認証</span>
              <span className="text-[10px] text-muted-foreground">
                インターネット異性紹介事業届出・プライバシーマーク・ISMS
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
          </Link>

          {/* 注意事項 */}
          <section className="mt-8 rounded-2xl border border-border bg-muted/30 p-6 text-[10px] leading-relaxed text-muted-foreground">
            <p className="mb-2 font-medium text-foreground">提出書類の取り扱い</p>
            <ul className="flex flex-col gap-1">
              <li>— 提出書類は暗号化して保管し、認証完了後に運営側から削除します</li>
              <li>— 第三者への提供・他用途での利用は一切ありません</li>
              <li>— 個人情報保護法・プライバシーマーク基準に準拠</li>
              <li>— 既婚者の利用が判明した場合は即時アカウント停止＋通報</li>
            </ul>
          </section>
        </div>
      </main>
      <BottomNav />

      {/* アップロードモーダル */}
      {activeKey && (
        <UploadModal
          verificationKey={activeKey}
          onClose={() => setActiveKey(null)}
        />
      )}
    </>
  );
}

function UploadModal({ verificationKey, onClose }: { verificationKey: VerificationKey; onClose: () => void }) {
  const [step, setStep] = useState<'doc_type' | 'upload' | 'selfie' | 'review' | 'done'>('doc_type');
  const [docType, setDocType] = useState<DocType | null>(null);
  const [docImage, setDocImage] = useState<string | null>(null);
  const [docImageBack, setDocImageBack] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);

  const def = VERIFICATION_DEFS.find((d) => d.key === verificationKey);
  const isIdentity = verificationKey === 'identity';

  const docInputRef = useRef<HTMLInputElement>(null);
  const docBackInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = () => {
    setStep('done');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-3xl bg-card p-6 shadow-xl sm:rounded-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <p className="font-mont text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Step {step === 'doc_type' ? '1' : step === 'upload' ? '2' : step === 'selfie' ? '3' : step === 'review' ? '4' : '✓'} / {isIdentity ? '4' : '3'}
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              {def?.label}
            </h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {/* プログレスバー */}
        <div className="mb-5 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-rose transition-all"
            style={{
              width: step === 'doc_type' ? '20%' :
                     step === 'upload' ? '45%' :
                     step === 'selfie' ? '70%' :
                     step === 'review' ? '90%' : '100%'
            }}
          />
        </div>

        {/* Step 1: 書類種別選択 */}
        {step === 'doc_type' && (
          <div className="space-y-3">
            <p className="text-[12px] text-muted-foreground mb-2">
              {isIdentity ? '提出する身分証を選んでください。' : '提出する書類の種類を選んでください。'}
            </p>
            {(isIdentity ? DOC_TYPES : [
              { value: 'tax_certificate' as const, label: def?.documents[0] ?? '書類' },
              { value: 'second' as const, label: def?.documents[1] ?? '書類2' },
            ]).map((d) => (
              <button
                key={d.value}
                onClick={() => {
                  setDocType(d.value as DocType);
                  setStep('upload');
                }}
                className="w-full rounded-2xl border-2 border-border bg-background p-4 text-left hover:border-foreground transition-colors flex items-baseline gap-3"
              >
                <FileText className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span className="text-sm font-medium">{d.label}</span>
                <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground" aria-hidden />
              </button>
            ))}
            {isIdentity && (
              <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                ※ 健康保険証は単体不可（顔写真がないため）。運転免許証・マイナンバーカード・パスポートのいずれかをご用意ください。
              </p>
            )}
          </div>
        )}

        {/* Step 2: 書類アップロード */}
        {step === 'upload' && (
          <div className="space-y-3">
            <p className="text-[12px] text-muted-foreground mb-2">
              書類の<strong className="text-foreground">表面</strong>を撮影またはアップロードしてください。氏名・生年月日・顔写真がはっきり写るように。
            </p>

            <UploadBox
              imageData={docImage}
              onSelect={() => docInputRef.current?.click()}
              onRemove={() => setDocImage(null)}
              hint="表面"
            />
            <input
              ref={docInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFileChange(e, setDocImage)}
            />

            {docType === 'driver_license' && (
              <>
                <p className="text-[12px] text-muted-foreground mt-4 mb-2">
                  続いて<strong className="text-foreground">裏面</strong>もアップロード（現住所が記載されている方）。
                </p>
                <UploadBox
                  imageData={docImageBack}
                  onSelect={() => docBackInputRef.current?.click()}
                  onRemove={() => setDocImageBack(null)}
                  hint="裏面"
                />
                <input
                  ref={docBackInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setDocImageBack)}
                />
              </>
            )}

            <Tips />

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setStep('doc_type')} className="flex-1">
                戻る
              </Button>
              <Button
                size="sm"
                disabled={!docImage || (docType === 'driver_license' && !docImageBack)}
                onClick={() => setStep(isIdentity ? 'selfie' : 'review')}
                className="flex-1 gap-1"
              >
                次へ <ArrowRight className="h-3 w-3" aria-hidden />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: セルフィー（本人確認のみ） */}
        {step === 'selfie' && isIdentity && (
          <div className="space-y-3">
            <p className="text-[12px] text-muted-foreground mb-2">
              本人セルフィーを撮影してください。<strong className="text-foreground">身分証と同一人物</strong>であることをAI判定します。
            </p>

            <UploadBox
              imageData={selfieImage}
              onSelect={() => selfieInputRef.current?.click()}
              onRemove={() => setSelfieImage(null)}
              hint="セルフィー"
              icon={<Camera className="h-6 w-6" aria-hidden />}
            />
            <input
              ref={selfieInputRef}
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={(e) => handleFileChange(e, setSelfieImage)}
            />

            <ul className="rounded-xl bg-muted/30 p-3 text-[10px] space-y-1 text-muted-foreground">
              <li>— 明るい場所で正面から撮影</li>
              <li>— 帽子・サングラス・マスクは外す</li>
              <li>— 加工アプリは使用不可</li>
            </ul>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setStep('upload')} className="flex-1">
                戻る
              </Button>
              <Button
                size="sm"
                disabled={!selfieImage}
                onClick={() => setStep('review')}
                className="flex-1 gap-1"
              >
                次へ <ArrowRight className="h-3 w-3" aria-hidden />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: 確認 */}
        {step === 'review' && (
          <div className="space-y-4">
            <p className="text-[12px] text-muted-foreground">
              提出内容を確認してください。
            </p>

            <div className="rounded-xl border border-border bg-background p-4 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] text-muted-foreground">書類種別</span>
                <span className="text-[12px] font-medium">
                  {DOC_TYPES.find((d) => d.value === docType)?.label ?? '書類'}
                </span>
              </div>
              {docImage && (
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1.5">提出書類</p>
                  <div className="flex gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={docImage} alt="" className="h-20 w-full rounded-lg object-cover border border-border" />
                    {docImageBack && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={docImageBack} alt="" className="h-20 w-full rounded-lg object-cover border border-border" />
                    )}
                  </div>
                </div>
              )}
              {selfieImage && (
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1.5">本人セルフィー</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selfieImage} alt="" className="h-20 w-20 rounded-lg object-cover border border-border" />
                </div>
              )}
            </div>

            <label className="flex items-baseline gap-2 text-[11px] leading-relaxed">
              <input type="checkbox" className="mt-0.5" defaultChecked />
              <span className="text-muted-foreground">
                提出書類は本人のものであり、虚偽の申告はないこと、運営による本人確認・年齢確認に同意することを確認しました。
              </span>
            </label>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setStep(isIdentity ? 'selfie' : 'upload')} className="flex-1">
                戻る
              </Button>
              <Button
                size="sm"
                onClick={submit}
                className="flex-1 gap-1"
              >
                提出する <Upload className="h-3 w-3" aria-hidden />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: 完了 */}
        {step === 'done' && (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
              <Check className="h-7 w-7" strokeWidth={2.4} aria-hidden />
            </div>
            <h3 className="text-lg font-semibold mb-2">提出完了</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed mb-6">
              審査結果は1〜2営業日以内にメール通知でお知らせします。<br />
              承認されると本人確認・年齢確認が同時に完了します。
            </p>
            <Button onClick={onClose} className="w-full">
              閉じる
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadBox({ imageData, onSelect, onRemove, hint, icon }: { imageData: string | null; onSelect: () => void; onRemove: () => void; hint: string; icon?: React.ReactNode }) {
  if (imageData) {
    return (
      <div className="relative rounded-2xl border-2 border-success/40 bg-success/5 p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageData} alt="" className="w-full h-44 rounded-lg object-cover" />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground/80 text-background hover:bg-foreground"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
        <p className="mt-2 text-[10px] text-center text-success font-medium inline-flex items-baseline gap-1 w-full justify-center">
          <Check className="h-3 w-3" aria-hidden /> {hint} アップロード済
        </p>
      </div>
    );
  }
  return (
    <button
      onClick={onSelect}
      className="w-full rounded-2xl border-2 border-dashed border-border bg-muted/20 p-8 hover:border-foreground hover:bg-muted/40 transition-colors flex flex-col items-center gap-2"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-muted-foreground">
        {icon ?? <ImageIcon className="h-6 w-6" aria-hidden />}
      </span>
      <p className="text-sm font-medium">{hint}を撮影 / 選択</p>
      <p className="text-[10px] text-muted-foreground">タップでカメラまたはギャラリーを開く</p>
    </button>
  );
}

function Tips() {
  return (
    <div className="rounded-xl bg-muted/30 p-3 text-[10px] space-y-1 text-muted-foreground">
      <p className="font-medium text-foreground inline-flex items-baseline gap-1 mb-1">
        <AlertCircle className="h-3 w-3 text-warn" aria-hidden /> 撮影のコツ
      </p>
      <ul className="space-y-0.5">
        <li>— 文字・顔写真がはっきり読める明るさ</li>
        <li>— 反射・影で隠れないように</li>
        <li>— 四隅すべてがフレームに収まるように</li>
      </ul>
    </div>
  );
}

function StatusBadge({ status }: { status: VerificationStatus }) {
  if (status === 'verified') {
    return (
      <Badge variant="successSoft" className="gap-1 text-[9px]">
        <Check className="h-2.5 w-2.5" aria-hidden /> 認証済
      </Badge>
    );
  }
  if (status === 'pending') {
    return <Badge variant="warnSoft" className="text-[9px]">確認中</Badge>;
  }
  if (status === 'rejected') {
    return <Badge variant="warnSoft" className="text-[9px]">差戻し</Badge>;
  }
  return <Badge variant="soft" className="text-[9px]">未提出</Badge>;
}
