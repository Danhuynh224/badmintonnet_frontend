"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import eventClubApiRequest from "@/apiRequest/club.event";
import { toast } from "sonner";

interface CancelEventDialogProps {
  eventId: string;
  token: string;
}

export function CancelEventDialog({ eventId, token }: CancelEventDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCancelEvent = async () => {
    try {
      setIsLoading(true);
      const res = await eventClubApiRequest.cancelEventClub(eventId, token);
      toast.success("Hủy hoạt động thành công!");
      router.refresh();
      setIsOpen(false);
      console.log(res);
    } catch (error) {
      console.error(error);
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
          <X className="w-4 h-4 mr-2" />
          Hủy sự kiện
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="p-4">
          <h4 className="font-semibold text-lg mb-2">Xác nhận hủy sự kiện</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Bạn có chắc chắn muốn hủy sự kiện này? Hành động này không thể hoàn
            tác.
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
              onClick={handleCancelEvent}
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
