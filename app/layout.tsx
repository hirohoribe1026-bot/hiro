import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://soul-mission.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ソウルミッション診断 | 穴口恵子",
  description:
    "5つの問いで、あなたの魂の使命を12タイプから読み解く。穴口恵子が贈るソウルミッション診断。",
  openGraph: {
    title: "ソウルミッション診断 | 穴口恵子",
    description:
      "5つの問いで、あなたの魂の使命を12タイプから読み解く。",
    url: SITE_URL,
    siteName: "ソウルミッション診断",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ソウルミッション診断",
    description: "5つの問いで、あなたの魂の使命を12タイプから読み解く。",
  },
};

export const viewport = {
  themeColor: "#1E1B4B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
