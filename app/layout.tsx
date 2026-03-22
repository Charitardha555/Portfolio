import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";

import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display"
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.vercel.app"),
  title: {
    default: "Your Name | Portfolio",
    template: "%s | Your Name"
  },
  description:
    "A cinematic, Vercel-ready portfolio with blog publishing and a protected Google admin dashboard.",
  openGraph: {
    title: "Your Name | Portfolio",
    description:
      "A cinematic, Vercel-ready portfolio with blog publishing and a protected Google admin dashboard.",
    url: "/",
    siteName: "Your Name Portfolio",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name | Portfolio",
    description:
      "A cinematic, Vercel-ready portfolio with blog publishing and a protected Google admin dashboard."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
