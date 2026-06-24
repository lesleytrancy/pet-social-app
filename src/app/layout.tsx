import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "我的宠物也没有那么没用 - 属于宠物的社交媒体",
  description: "让你的毛孩子成为会聊天、会成长、会社交的 AI 小伙伴",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFF8F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-neutral-100">
        <div className="mx-auto max-w-[430px] min-h-screen bg-[#FFF8F0] shadow-2xl relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
