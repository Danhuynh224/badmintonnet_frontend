"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  PencilIcon,
  CameraIcon,
  XMarkIcon,
  EnvelopeIcon,
  EllipsisVerticalIcon,
  UserMinusIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { AccountResType } from "@/schemaValidations/account.schema";
import friendApiRequest from "@/apiRequest/friend";
import { FriendShipSchemaType } from "@/schemaValidations/friend.schema";
import { clientSessionToken } from "@/lib/http";

type Profile = AccountResType["data"];

interface ProfileHeaderProps {
  profile: Profile;
  onEditToggle: () => void;
  isEditing: boolean;
  canEdit: boolean;
  relationship?: FriendShipSchemaType | null;
  currentUserId?: string;
}

export default function ProfileHeader({
  profile,
  onEditToggle,
  isEditing,
  canEdit = true,
  relationship,
  currentUserId,
}: ProfileHeaderProps) {
  const router = useRouter();

  const accessToken = clientSessionToken.value;

  const isMe = !canEdit;
  const isRequester =
    relationship && currentUserId
      ? relationship.requester.id === currentUserId
      : false;

  const isFriend = relationship?.status === "ACCEPTED";
  const isPending = relationship?.status === "PENDING";

  const statusLabel = (() => {
    if (!relationship) return "Thêm bạn bè";
    switch (relationship.status) {
      case "PENDING":
        return isRequester ? "Đã gửi lời mời" : "Phản hồi";
      case "ACCEPTED":
        return "Bạn bè";
      case "REJECTED":
        return "Thêm bạn bè";
      case "BLOCKED":
        return "Đã chặn";
      default:
        return "Thêm bạn bè";
    }
  })();

  const handleSendRequest = async () => {
    if (!accessToken) {
      toast.error("Vui lòng đăng nhập để kết bạn.");
      return;
    }
    try {
      const res = await friendApiRequest.sendFriendRequest(
        { receiverId: profile.id },
        accessToken
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("Đã gửi lời mời kết bạn");
        router.refresh();
      } else {
        toast.error("Gửi lời mời thất bại");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  };

  const handleAccept = async () => {
    if (!accessToken || !relationship) return;
    try {
      const requesterId = relationship.requester.id;
      const res = await friendApiRequest.acceptFriendRequest(
        requesterId,
        accessToken
      );
      if (res.status === 200) {
        toast.success("Đã chấp nhận kết bạn");
        router.refresh();
      } else {
        toast.error("Chấp nhận thất bại");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  };

  const handleReject = async () => {
    if (!accessToken || !relationship) return;
    try {
      const requesterId = relationship.requester.id;
      const res = await friendApiRequest.rejectFriendRequest(
        requesterId,
        accessToken
      );
      if (res.status === 200) {
        toast.success("Đã từ chối lời mời");
        router.refresh();
      } else {
        toast.error("Từ chối thất bại");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  };

  const handleUnfriend = async () => {
    if (!accessToken || !relationship) return;
    try {
      console.log("Hủy kết bạn với:", profile.id);
      // Gọi API hủy kết bạn ở đây
      // await friendApiRequest.unfriend(profile.id, accessToken);
      toast.success("Đã hủy kết bạn");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  };

  const handleBlock = async () => {
    if (!accessToken) return;
    try {
      console.log("Chặn người dùng:", profile.id);
      // Gọi API chặn người dùng ở đây
      // await friendApiRequest.blockUser(profile.id, accessToken);
      toast.success("Đã chặn người dùng");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 text-white">
      <div className="absolute inset-0 bg-black opacity-20 rounded-2xl"></div>

      <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image
              src={profile.avatarUrl ? profile.avatarUrl : "/user.png"}
              alt="Avatar"
              priority
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Thông tin cơ bản */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {profile.fullName}
              </h1>
              <p className="text-white/80 flex items-center justify-center sm:justify-start">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                {profile.email}
              </p>
            </div>

            {/* Các nút hành động */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {canEdit && (
                <Button
                  onClick={onEditToggle}
                  variant={isEditing ? "secondary" : "outline"}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                >
                  {isEditing ? (
                    <>
                      <XMarkIcon className="h-4 w-4 mr-2" />
                      Hủy
                    </>
                  ) : (
                    <>
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Chỉnh sửa
                    </>
                  )}
                </Button>
              )}

              {!canEdit && (
                <>
                  {/* Trạng thái chờ kết bạn */}
                  {isPending && !isRequester && (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        onClick={handleAccept}
                        variant="secondary"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-1 sm:flex-none"
                      >
                        Chấp nhận
                      </Button>
                      <Button
                        onClick={handleReject}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-1 sm:flex-none"
                      >
                        Từ chối
                      </Button>
                    </div>
                  )}

                  {/* Đã là bạn bè - Hiển thị dropdown */}
                  {isFriend && (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        disabled
                        variant="secondary"
                        className="bg-white/10 text-white flex-1 sm:flex-none"
                      >
                        ✓ Bạn bè
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            <EllipsisVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={handleUnfriend}
                            className="text-red-600 cursor-pointer"
                          >
                            <UserMinusIcon className="h-4 w-4 mr-2" />
                            Hủy kết bạn
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={handleBlock}
                            className="text-red-600 cursor-pointer"
                          >
                            <ShieldExclamationIcon className="h-4 w-4 mr-2" />
                            Chặn
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                  {/* Các trạng thái khác */}
                  {!isFriend && !isPending && (
                    <Button
                      onClick={handleSendRequest}
                      variant="secondary"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                    >
                      {statusLabel}
                    </Button>
                  )}

                  {/* Đã gửi lời mời - Chờ phản hồi */}
                  {isPending && isRequester && (
                    <Button
                      disabled
                      variant="secondary"
                      className="bg-white/10 border-white/20 text-white w-full sm:w-auto"
                    >
                      ⌛ Đã gửi lời mời
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
