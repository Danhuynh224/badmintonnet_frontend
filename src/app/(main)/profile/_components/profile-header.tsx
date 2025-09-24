"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  PencilIcon,
  XMarkIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { AccountResType } from "@/schemaValidations/account.schema";

type Profile = AccountResType["data"];

interface ProfileHeaderProps {
  profile: Profile;
  onEditToggle: () => void;
  isEditing: boolean;
  canEdit: boolean;
}

export default function ProfileHeader({
  profile,
  onEditToggle,
  isEditing,
  canEdit = true,
}: ProfileHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
      <div className="absolute inset-0 bg-black opacity-20 rounded-2xl"></div>
      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
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

        {/* Thông tin cơ bản và stats */}
        <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
            {/* Tên và email */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                {profile.fullName}
              </h1>
              <p className="text-white/80 flex items-center justify-center sm:justify-start gap-2">
                <EnvelopeIcon className="h-4 w-4" />
                {profile.email}
              </p>
            </div>

            {/* Stats (Top-right) */}
            <div className="flex flex-row gap-3 sm:gap-4">
              <div className="bg-white/10 rounded-lg p-2 sm:p-3 text-center min-w-[100px] sm:min-w-[120px]">
                <p className="text-base sm:text-lg font-semibold">
                  {profile.reputationScore ?? 0}
                </p>
                <p className="text-xs sm:text-sm text-white/80">Điểm uy tín</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2 sm:p-3 text-center min-w-[100px] sm:min-w-[120px]">
                <p className="text-base sm:text-lg font-semibold">
                  {profile.totalParticipatedEvents ?? 0}
                </p>
                <p className="text-xs sm:text-sm text-white/80">
                  Sự kiện tham gia
                </p>
              </div>
            </div>
          </div>

          {/* Nút chỉnh sửa (Bottom-left) */}
          {canEdit && (
            <div className="mt-4 sm:mt-6 flex justify-center sm:justify-start w-full">
              <Button
                onClick={onEditToggle}
                variant={isEditing ? "secondary" : "outline"}
                className="w-full sm:w-auto px-4 py-2 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
