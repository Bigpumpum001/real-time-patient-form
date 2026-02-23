import type { Metadata } from "next";
import {
  DM_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Real-time Patient Form",
  description: "Real-time patient form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmMono.className} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-stone-50">
          <main className="">{children}</main>
        </div>
      </body>
    </html>
  );
}
