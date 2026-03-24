import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Korea Parcel Marketplace",
    template: "%s · Korea Parcel Marketplace",
  },
  description:
    "Connect parcel senders with travelers and local couriers across Korea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} min-h-screen font-sans`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
