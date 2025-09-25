"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import absentReasonRequest from "@/apiRequest/absent-reason";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AbsentReasonType } from "@/schemaValidations/absent-reason";
import { Loader2 } from "lucide-react";

interface ReasonDialogProps {
  idPart: string;
}

export default function ReasonDialog({ idPart }: ReasonDialogProps) {
  const router = useRouter();
  const [reason, setReason] = useState<AbsentReasonType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await absentReasonRequest.getAbsentReason(idPart);
        setReason(res.payload.data);
      } catch {
        setError("Không thể tải lý do vắng mặt");
        toast.error("Không thể tải lý do vắng mặt");
      } finally {
        setIsLoading(false);
      }
    };
    if (isOpen) fetchData();
  }, [idPart, isOpen]);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await absentReasonRequest.approvedReason(reason?.id || "");
      toast.success("Đã chấp nhận lý do vắng mặt");
      setIsOpen(false);
      router.refresh();
    } catch {
      toast.error("Có lỗi xảy ra khi chấp nhận");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await absentReasonRequest.rejectReason(reason?.id || "");
      toast.success("Đã từ chối lý do vắng mặt");
      setIsOpen(false);
      router.refresh();
    } catch {
      toast.error("Có lỗi xảy ra khi từ chối");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border-red-300 rounded-md hover:bg-red-100 hover:text-red-700 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-900 dark:hover:text-red-400 transition-colors duration-200"
        >
          Xem lý do
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Lý do vắng mặt
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Xem xét lý do vắng mặt. Nếu chấp nhận, điểm uy tín của người chơi sẽ
            được khôi phục.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500 dark:text-gray-400" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Lý do:
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {reason?.reason || "Không có thông tin"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Thời gian gửi:
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {reason?.createdAt
                  ? new Date(reason.createdAt).toLocaleString("vi-VN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Không có thông tin"}
              </p>
            </div>
            {reason?.status !== "PENDING" && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Trạng thái:
                </span>
                <p
                  className={`text-sm ${
                    reason?.status === "APPROVED"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {reason?.status === "APPROVED"
                    ? "Đã chấp nhận"
                    : "Đã từ chối"}
                </p>
              </div>
            )}
            {reason?.reviewedAt && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Thời gian duyệt:
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date(reason.reviewedAt).toLocaleString("vi-VN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 border-gray-300 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Đóng
          </Button>
          {reason?.status === "PENDING" && (
            <>
              <Button
                onClick={handleReject}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Từ chối"
                )}
              </Button>
              <Button
                onClick={handleApprove}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors duration-200"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Chấp nhận"
                )}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
