import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from './lib/utils';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  // Kiểm tra nếu đường dẫn bắt đầu bằng /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Lấy token từ cookie
    const accessToken = request.cookies.get('accessToken')?.value;

    // Nếu không có token hoặc không phải là admin, chuyển hướng về trang login
    if (!accessToken || !isAdmin(accessToken)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};