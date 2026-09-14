import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/desk/") && pathname !== "/desk") {
    if (!request.cookies.get("meridian_desk")) {
      const url = request.nextUrl.clone();
      url.pathname = "/desk";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/desk/:path*"] };
