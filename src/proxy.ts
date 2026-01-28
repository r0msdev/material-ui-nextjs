import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  
  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  
  // Parse the Accept-Language header to get the primary locale
  // Format: "es-ES,es;q=0.9,en;q=0.8" -> "es-ES"
  let locale = 'en-US'; // Default fallback
  
  if (acceptLanguage) {
    // Extract the first locale (highest priority)
    const match = acceptLanguage.match(/^([a-z]{2}-[A-Z]{2}|[a-z]{2})/);
    if (match) {
      locale = match[1];
    }
  }
  
  // Set locale cookie if it doesn't exist or is different
  const existingLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (existingLocale !== locale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      sameSite: 'lax',
      // Cookie expires in 1 year
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  
  return response;
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
