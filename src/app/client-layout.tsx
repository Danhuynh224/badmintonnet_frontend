// app/client-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideHeaderRoutes = ["/login", "/signup", "/forgot-password"];
  const shouldShowHeader = !hideHeaderRoutes.includes(pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
}
