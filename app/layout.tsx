import { Mona_Sans } from "next/font/google";

import "./globals.css";
import { Metadata } from "next";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContradizAI",
  description: "Web app para chat com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}
      </body>
    </html>
  );
}