import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Galaxy Class Entertainment | Artist Management & Music Promotion",
  description:
    "Full-service artist management, radio promotion, music publishing, and career consulting. Based in Orlando, FL and Nashville, TN.",
  keywords: "artist management, radio promotion, music publishing, Nashville, Orlando, music career",
  openGraph: {
    title: "Galaxy Class Entertainment",
    description: "Dedicated to the production and promotion of creations in the entertainment industry.",
    url: "https://galaxyclassent.com",
    siteName: "Galaxy Class Entertainment",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0A0A0F] text-[#E8E8F0] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
