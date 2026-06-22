import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Une Invitation à Paris",
  description: "Un voyage spécial pour un anniversaire inoubliable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
