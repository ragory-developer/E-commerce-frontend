// src/middleware.js
import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // If the URL is exactly "localhost:3000/"
  if (pathname === '/') {
    // Physically move the user to "localhost:3000/en"
    return NextResponse.redirect(new URL('/en', request.url));
  }
}

export const config = {
  // matcher ensures this logic only hits the root and not your images/icons
  matcher: ['/'],
};