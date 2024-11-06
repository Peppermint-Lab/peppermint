import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peppermint",
  description: "Peppermint is a self-hosted issue tracker for your projects or help desk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
