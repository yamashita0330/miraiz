import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === '1';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  if (DEMO_MODE) return response;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    // 静的アセット・画像・PWA関連を除外
    '/((?!_next/static|_next/image|favicon.ico|icon-192.png|icon-512.png|manifest.json|sw.js|workbox-.*\\.js).*)',
  ],
};
