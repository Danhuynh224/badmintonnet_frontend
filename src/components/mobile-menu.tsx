// src/components/layout/MobileMenu.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LogoutButton from "@/components/button-logout";

type NavItem = { name: string; href: string };

export default function MobileMenu({
  navItems,
  accessToken,
}: {
  navItems: NavItem[];
  accessToken: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 bg-white dark:bg-gray-900">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Mobile Menu</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>

        <div className=" flex flex-col space-y-3 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
            >
              {item.name}
            </Link>
          ))}

          {!accessToken ? (
            <div className="pt-6 space-y-3">
              <Link
                href="/login"
                className="text-blue-600 hover:underline py-2 block"
              >
                Đăng nhập
              </Link>
              <Link
                href="/signup"
                className="text-green-600 hover:underline py-2 block"
              >
                Đăng ký
              </Link>
            </div>
          ) : (
            <div className="pt-6 space-y-3 border-t">
              <Link href="/profile" className="hover:text-blue-500 py-2 block">
                Thông tin cá nhân
              </Link>
              <Link href="/my-clubs" className="hover:text-blue-500 py-2 block">
                CLB của tôi
              </Link>
              <LogoutButton />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
