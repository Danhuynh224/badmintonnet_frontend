"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import tournamentApiRequest from "@/apiRequest/tournament";
import { clientSessionToken } from "@/lib/http";

interface JoinCategoryButtonProps {
  categoryId: string;
  isDisabled?: boolean;
  className?: string;
}

export default function JoinCategoryButton({
  categoryId,
  isDisabled = false,
  className = "",
}: JoinCategoryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = clientSessionToken.value;
  const router = useRouter();

  const handleJoin = async () => {
    if (!accessToken) {
      toast.error("Vui lòng đăng nhập để tham gia giải đấu.");
      return;
    }

    setIsLoading(true);
    try {
      await tournamentApiRequest.joinSingleTournament(categoryId, accessToken);
      toast.success("Đăng ký tham gia thành công!");
      router.refresh();
    } catch (error: unknown) {
      toast.error("Có lỗi xảy ra khi đăng ký tham gia.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleJoin}
      disabled={isDisabled || isLoading}
      className={`flex items-center gap-2 ${className}`}
      variant="default"
    >
      <UserPlus className="h-4 w-4" />
      {isLoading ? "Đang xử lý..." : "Tham gia"}
    </Button>
  );
}
