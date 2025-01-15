import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { MainComp } from "@/layouts";
import { Toaster } from "sonner";

const roboto = Nunito_Sans({
  variable: "--font-roboto", // Custom CSS variable for the font
  subsets: ["cyrillic"],
  weight: ['400', '500', '700', '900']
});
export const metadata: Metadata = {
  title: "Lust Lounge",
  description: "Adult Dating - Post Classified Ads in India - Lust Longe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body
        className={`${roboto.variable}  antialiased`}
      >
        <MainComp>
          {children}
          <Toaster position="top-right" />
        </MainComp>
      </body>
    </html>
  );
}
