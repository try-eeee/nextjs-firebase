import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PortFolio Nextjs with Firebase App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={``}>{children}</body>
    </html>
  );
}
