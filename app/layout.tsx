import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYSTEM://PORTFOLIO | Cyber Security Head",
  description: "Elite Cybersecurity Professional — Penetration Tester, Threat Hunter, Government Collaborator",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&family=Orbitron:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-cyber-green font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
