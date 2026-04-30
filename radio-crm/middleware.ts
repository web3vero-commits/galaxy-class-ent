export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // Protect everything except auth, login page, and static assets
    "/((?!api/auth|login|_next/static|_next/image|favicon.ico).*)",
  ],
};
