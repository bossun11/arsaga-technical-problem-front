import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import { AuthProvider } from "./context/AuthContext";
import AuthWrapper from "@/components/AuthWrapper";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            <AuthWrapper>
              <Header />
              {children}
            </AuthWrapper>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
