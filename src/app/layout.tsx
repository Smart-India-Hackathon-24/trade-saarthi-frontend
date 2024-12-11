import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Common/Navbar";

export const metadata: Metadata = {
  title: "Trade Mark Saarthi",
  description: "Get verification for your title for news paper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
