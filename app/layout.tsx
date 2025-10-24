import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/website-navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Vieru — Developer & Designer",
  description:
    "Full-stack developer and creative designer crafting modern digital experiences with Next.js, Framer Motion, and Medusa.js.",
  keywords: [
    "Alex Vieru",
    "alexvieru.dev",
    "Web Developer",
    "UI/UX Designer",
    "Next.js Portfolio",
    "Creative Developer",
    "Framer Motion",
    "Medusa.js",
    "Full Stack Developer",
  ],
  authors: [{ name: "Alex Vieru", url: "https://alexvieru.dev" }],
  creator: "Alex Vieru",
  metadataBase: new URL("https://alexvieru.dev"),
  openGraph: {
    title: "Alex Vieru — Developer & Designer",
    description:
      "Full-stack developer and creative designer crafting modern digital experiences with Next.js, Framer Motion, and Medusa.js.",
    url: "https://alexvieru.dev",
    siteName: "Alex Vieru",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Alex Vieru — Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Vieru — Developer & Designer",
    description:
      "Building smooth, aesthetic, and performant web experiences with Next.js and creative direction.",
    images: ["/og-image.webp"],
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarDemo />
        {children}
      </body>
    </html>
  );
}
