import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/provider/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "todo do",
  description: "remember YOLO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={inter.className}>
          <Provider>
            <Providers>{children}</Providers>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
