import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bob 360 — The AI Tech Lead that never sleeps",
  description:
    "From the first line of code, to the 3 AM crash — Bob 360 is the AI-powered guardian of your entire software lifecycle. Powered by IBM Bob.",
  keywords: [
    "IBM Bob",
    "AI Tech Lead",
    "Code Analysis",
    "Repository Intelligence",
    "Developer Tools",
    "Hackathon",
  ],
  openGraph: {
    title: "Bob 360 — The AI Tech Lead that never sleeps",
    description:
      "From the first line of code, to the 3 AM crash — we've got your repo covered.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-mesh" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
