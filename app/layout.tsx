import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TypesProvider from "./utils/TypesProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Consumption Analytics",
  description: "Personal Consumption report in my on-site work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TypesProvider>{children}</TypesProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
