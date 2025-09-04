"use client";

import clubServiceApi from "@/apiRequest/club";
import { clientSessionToken } from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface JoinClubButtonProps {
  clubId: string;
  clubName: string;
  isRefresh: boolean;
}

export const JoinClubButton = ({
  clubId,
  clubName,
  isRefresh = true,
}: JoinClubButtonProps) => {
  const accessToken = clientSessionToken.value;
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const handleJoinClub = async () => {
    if (!accessToken) {
      toast.error("Vui lòng đăng nhập để tham gia câu lạc bộ.");
      return;
    }

    try {
      const res = await clubServiceApi.joinClub(clubId, accessToken);
      if (res.status === 200) {
        toast.success(
          `Bạn đã gửi yêu cầu tham gia câu lạc bộ ${clubName}. Vui lòng chờ phê duyệt.`
        );
        if (isRefresh) {
          router.refresh();
        } else {
          setJoined(true);
        }
      } else {
        toast.error(`Tham gia câu lạc bộ ${clubName} thất bại.`);
      }
    } catch (error) {
      toast.error(
        `Tham gia câu lạc bộ ${clubName} thất bại. Vui lòng thử lại.`
      );
      console.error("Error joining club:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleJoinClub}
        disabled={joined} // disable nếu đã bấm
        className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 ${
          joined
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
        }`}
      >
        {joined ? "Vui lòng chờ phê duyệt" : "Tham gia"}
      </button>
    </>
  );
};
