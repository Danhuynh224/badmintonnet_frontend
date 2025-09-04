"use client";

import authApiRequest from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await authApiRequest.logout();
      window.location.href = "/"; // ép redirect về trang chủ hoặc login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="w-full justify-start gap-3 px-0 py-2.5 h-auto text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-md transition-colors duration-150"
    >
      <LogOut className="h-4 w-4" />
      <span>Đăng xuất</span>
    </Button>
  );
}
