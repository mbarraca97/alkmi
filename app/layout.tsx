import type { Metadata } from "next";
import { Aboreto, Lexend } from "next/font/google";
import "./globals.css";
import PageLoader from "./components/PageLoader";

const aboreto = Aboreto({
  weight: "400",
  variable: "--font-aboreto",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alkmi",
  description: "Alkmi website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden md:overflow-x-visible">
      <body
        className={`${aboreto.variable} ${lexend.variable} antialiased overflow-x-hidden md:overflow-x-visible`}
      >
        <PageLoader>{children}</PageLoader>
      </body>
    </html>
  );
}
