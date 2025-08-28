// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import AppProvider from "@/app/app-provider";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BadmintonNet",
  description: "Ứng dụng kết nối người hâm mộ thể thao",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const refreshToken = cookieStore.get("refreshToken")?.value || "";
  const deviceId = cookieStore.get("deviceId")?.value || "";
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased  `}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider
            inititalAccessToken={accessToken}
            inititalRefreshToken={refreshToken}
            inititalDeviceId={deviceId}
          >
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
