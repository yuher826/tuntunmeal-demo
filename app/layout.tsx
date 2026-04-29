import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "튼튼밀 TUNTUNMEAL",
  description: "건강한 한 끼, 매일 제시간에",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, background: '#f5f5f5', fontFamily: 'Apple SD Gothic Neo, Malgun Gothic, sans-serif', overflowY: 'scroll' }}>
        <div style={{ maxWidth: 390, margin: '0 auto', minHeight: '100vh', background: '#F0F4EC', position: 'relative' }}>
          {children}
        </div>
      </body>
    </html>
  );
}