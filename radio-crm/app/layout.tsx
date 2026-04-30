import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "GCE Radio CRM",
  description: "Galaxy Class Entertainment — Radio Outreach",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-ink min-h-screen font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
