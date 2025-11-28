"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { TournamentPartnerInvitationResponse } from "@/schemaValidations/tournament.schema";
import tournamentApiRequest from "@/apiRequest/tournament";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function InviterListModal({
  inviterList,
}: {
  inviterList: TournamentPartnerInvitationResponse[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  if (!inviterList || inviterList.length === 0) return null;
  const onApprove = (invitationId: string) => {
    tournamentApiRequest.updateInvitationStatus({
      id: invitationId,
      status: "ACCEPTED",
    });
    router.refresh();
    setOpen(false);
    toast.success("Đã chấp nhận lời mời ghép đôi");
  };
  const onReject = (invitationId: string) => {
    tournamentApiRequest.updateInvitationStatus({
      id: invitationId,
      status: "REJECTED",
    });
    router.refresh();
    setOpen(false);
    toast.success("Đã từ chối lời mời ghép đôi");
  };
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          icon: <Clock className="w-3 h-3" />,
          label: "Đang chờ",
          class:
            "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
        };
      case "ACCEPTED":
        return {
          icon: <CheckCircle2 className="w-3 h-3" />,
          label: "Đã chấp nhận",
          class:
            "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
        };
      case "REJECTED":
        return {
          icon: <XCircle className="w-3 h-3" />,
          label: "Đã từ chối",
          class:
            "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
        };
      default:
        return {
          icon: null,
          label: status,
          class:
            "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
        };
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Những người đã mời bạn ({inviterList.length})
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-lg">
            Những lời mời ghép đôi
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          {inviterList.map((item) => {
            const inviter = item.inviter;
            const s = getStatusConfig(item.status);

            return (
              <Card
                key={item.id}
                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Image
                    src={inviter?.avatarUrl || "/default-avatar.png"}
                    alt="avatar"
                    width={55}
                    height={55}
                    className="rounded-xl object-cover shadow-sm"
                    unoptimized
                  />

                  {/* Nội dung */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      {/* Tên */}
                      <a
                        href={`/profile/${inviter?.slug}`}
                        className="text-sm font-semibold hover:text-yellow-600 dark:hover:text-yellow-300"
                      >
                        {inviter?.fullName}
                      </a>

                      {/* Badge trạng thái */}
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 text-xs border ${s.class}`}
                      >
                        {s.icon}
                        {s.label}
                      </Badge>
                    </div>

                    {/* Thời gian */}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.createdAt).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    {/* Message */}
                    {item.message && (
                      <p className="text-xs italic mt-2 text-gray-600 dark:text-gray-300 border-l-2 pl-2 border-yellow-300 dark:border-yellow-700">
                        “{item.message}”
                      </p>
                    )}

                    {/* Nút hành động */}
                    {item.status === "PENDING" && (
                      <div className="flex justify-end gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onReject(item.id)}
                        >
                          Từ chối
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => onApprove(item.id)}
                        >
                          Chấp nhận
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
