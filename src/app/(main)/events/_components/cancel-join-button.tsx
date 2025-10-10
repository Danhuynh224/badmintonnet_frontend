"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { UserMinus, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import eventClubApiRequest from "@/apiRequest/club.event";
import { toast } from "sonner";

interface CancelJoinEventButtonProps {
  eventId: string;
  token: string;
}

export function CancelJoinEventButton({
  eventId,
  token,
}: CancelJoinEventButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCancelJoinEvent = async () => {
    try {
      setIsLoading(true);
      await eventClubApiRequest.cancelJoinEventClub(eventId, token);
      toast.success("Hủy tham gia hoạt động thành công!");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi hủy sự kiện");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="destructive"
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <UserMinus className="w-4 h-4 mr-2" />
          Hủy tham gia
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="p-4">
          <h4 className="font-semibold text-lg mb-2">
            Xác nhận hủy tham gia hoạt động
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Bạn có chắc chắn muốn hủy tham gia hoạt động này? Hành động này
            không thể hoàn tác.
          </p>
          <div className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleCancelJoinEvent}
              disabled={isLoading}
            >
              {isLoading ? "Đang hủy..." : "Xác nhận"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
