import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['en', 'es', 'en-US', 'es-ES'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only redirect from root path
  if (pathname !== '/') {
    return NextResponse.next();
  }
  
  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  let locale = 'en'; // Default fallback
  
  if (acceptLanguage) {
    // Extract the first locale (highest priority)
    const match = acceptLanguage.match(/^([a-z]{2}-[A-Z]{2}|[a-z]{2})/);
    if (match) {
      const detectedLocale = match[1];
      // Normalize es-ES to es, en-US to en for cleaner URLs
      locale = detectedLocale.split('-')[0];
    }
  }
  
  // Redirect root to locale-specific path
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

// Run middleware on all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
